/* =========================================================
   chat.js — Motor de conversación.
   ---------------------------------------------------------
   Recorre el guion de una sesión nodo a nodo, con retardos y
   "escribiendo…", para que se sienta una conversación y no
   un volcado de texto. Todos los efectos narrativos (afinidad,
   banderas, fotos, corrupción, llamadas, finales) se declaran
   como nodos en los datos.
   ========================================================= */

import {
  S, settings, fill, applyFx, setFlag, unlockPhoto, corruptPhoto, unlockNote,
  reviseNote, unlockPage, addEvidence, unlockCam, unlockProfileBit, setGlitch,
  complete, recordEnding, advanceTime, bus, save, markCall, reopen
} from './state.js';
import { meets } from './conditions.js';
import { chibi, photo as photoArt } from './art.js';
import { sfx, setMood, duckMusic } from './audio.js';
import { CHARS, GROUP } from '../../data/characters.js';
import { PHOTOS } from '../../data/photos.js';
import * as story from './story.js';

/* Velocidad de lectura */
const SPEED = { slow: 1.5, normal: 1, fast: 0.55, instant: 0 };

function speedMul() { return SPEED[settings.textSpeed] ?? 1; }

/** Retardo antes de un mensaje: proporcional a lo que "cuesta escribirlo". */
function typeTime(text = '', override) {
  const mul = speedMul();
  if (mul === 0) return 0;
  if (override != null) return override * mul;
  const base = 340 + Math.min(1700, String(text).length * 26);
  return base * mul;
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------------------------------------------------
   Runner
   --------------------------------------------------------- */
export class ChatRunner {
  /**
   * @param {object} session  definición de la sesión
   * @param {HTMLElement} stream  contenedor de mensajes
   * @param {object} hooks  { onChoices, onEnd, onCall, onEnding, onPuzzle, onEffect, scroll }
   */
  constructor(session, stream, hooks = {}) {
    this.session = session;
    this.stream = stream;
    this.hooks = hooks;
    this.queue = (session.script || []).slice();
    this.lastSpeaker = null;
    this.rewards = [];
    this.stopped = false;
    this.paused = false;
    this.replay = false;
  }

  stop() { this.stopped = true; }

  /* --------- utilidades de render --------- */
  scroll() {
    if (this.hooks.scroll) this.hooks.scroll();
  }

  el(html) {
    const d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }

  add(node) {
    this.stream.appendChild(node);
    this.scroll();
    return node;
  }

  charOf(id) {
    return CHARS[id] || GROUP;
  }

  avatar(cid, expr) {
    const spec = CHARS[cid];
    if (!spec) return '';
    return chibi(spec, expr || 'neutral', { glitch: S.glitch >= 3 ? S.glitch : 0 });
  }

  /* --------- burbuja de personaje --------- */
  async say(node) {
    const cid = node.s;
    const spec = CHARS[cid];
    const same = this.lastSpeaker === cid;
    const text = fill(node.t ?? '');

    // "escribiendo…"
    let bubbleWrap = null;
    const t = typeTime(text, node.delay);
    if (t > 0 && !this.replay) {
      bubbleWrap = this.add(this.el(`
        <div class="msg ${same ? 'same' : ''}">
          <div class="msg-av ${same ? 'hidden' : ''}">${same ? '' : this.avatar(cid, node.expr)}</div>
          <div class="msg-col">
            ${same ? '' : `<div class="msg-who">${spec?.name || cid}</div>`}
            <div class="bubble typing-host"><span class="typing"><i></i><i></i><i></i></span></div>
          </div>
        </div>`));
      if (Math.random() < .5) sfx.typing();
      await wait(t);
      if (this.stopped) return;
    }

    const cls = [
      'bubble',
      node.broken ? 'broken' : '',
      node.ghost ? 'ghost' : ''
    ].filter(Boolean).join(' ');
    const inner = node.corrupt
      ? `<span class="corrupt glitchtext">${text}</span>`
      : text;

    const html = `
      <div class="msg ${same ? 'same' : ''}">
        <div class="msg-av ${same ? 'hidden' : ''}">${same ? '' : this.avatar(cid, node.expr)}</div>
        <div class="msg-col">
          ${same ? '' : `<div class="msg-who">${spec?.name || cid}</div>`}
          <div class="${cls}" data-c="${cid}">${inner}</div>
        </div>
      </div>`;

    if (bubbleWrap) {
      const fresh = this.el(html);
      bubbleWrap.replaceWith(fresh);
      this.scroll();
    } else {
      this.add(this.el(html));
    }
    if (!this.replay) sfx.message();
    this.lastSpeaker = cid;
  }

  /* --------- burbuja del jugador --------- */
  async me(text, instant = false) {
    if (!instant) await wait(180 * speedMul());
    this.add(this.el(`
      <div class="msg me">
        <div class="msg-col"><div class="bubble">${fill(text)}</div></div>
      </div>`));
    sfx.mine();
    this.lastSpeaker = '__me';
  }

  /* --------- foto --------- */
  async sendPhoto(node) {
    const def = PHOTOS[node.photo];
    if (!def) { console.warn('[chat] foto desconocida:', node.photo); return; }
    unlockPhoto(node.photo);
    if (node.corruptNow) corruptPhoto(node.photo);
    const cid = node.s;
    const same = this.lastSpeaker === cid;
    const spec = CHARS[cid];
    const isCorrupt = S.photosCorrupt.includes(node.photo);
    const svg = photoArt({ ...def, spec: CHARS[def.of] }, { corrupt: isCorrupt });

    if (!this.replay) { await wait(typeTime('', 620)); if (this.stopped) return; }

    const el = this.add(this.el(`
      <div class="msg ${same ? 'same' : ''}">
        <div class="msg-av ${same ? 'hidden' : ''}">${same ? '' : this.avatar(cid, node.expr)}</div>
        <div class="msg-col">
          ${same ? '' : `<div class="msg-who">${spec?.name || cid}</div>`}
          <div class="photo-msg clickable" data-photo="${node.photo}">
            ${svg}
            ${def.caption ? `<div class="cap">${fill(def.caption)}</div>` : ''}
            <div class="tap">Toca para ampliar</div>
          </div>
        </div>
      </div>`));
    el.querySelector('[data-photo]')?.addEventListener('click', () => {
      this.hooks.onPhoto?.(node.photo);
    });
    sfx.camera();
    this.lastSpeaker = cid;
  }

  async sticker(node) {
    const cid = node.s;
    const same = this.lastSpeaker === cid;
    if (!this.replay) await wait(typeTime('', 420));
    this.add(this.el(`
      <div class="msg ${cid === '__me' ? 'me' : ''} ${same ? 'same' : ''}">
        ${cid === '__me' ? '' : `<div class="msg-av ${same ? 'hidden' : ''}">${same ? '' : this.avatar(cid, node.expr)}</div>`}
        <div class="msg-col"><div class="sticker">${node.sticker}</div></div>
      </div>`));
    sfx.tap();
    this.lastSpeaker = cid;
  }

  /* --------- sistema --------- */
  async system(node) {
    if (!this.replay) await wait(typeTime('', node.delay ?? 500));
    const kind = node.kind || '';
    this.add(this.el(`<div class="sysmsg ${kind}">${fill(node.sys)}</div>`));
    this.lastSpeaker = null;
    if (kind === 'core') { sfx.glitch(); duckMusic(900); }
    else if (kind === 'alert') sfx.error();
    else sfx.notify();
  }

  daybreak(text) {
    this.add(this.el(`<div class="daybreak">${fill(text)}</div>`));
    this.lastSpeaker = null;
  }

  reward(icon, text) {
    this.rewards.push({ icon, text });
  }

  /* --------- efectos de datos --------- */
  effects(node) {
    if (node.fx) {
      const ch = applyFx(node.fx);
      if (ch.some((c) => c.stat === 'affinity' && c.delta > 0)) sfx.heart();
    }
    if (node.flag) setFlag(node.flag);
    if (node.flags) [].concat(node.flags).forEach((f) => setFlag(f));
    if (node.unflag) [].concat(node.unflag).forEach((f) => setFlag(f, false));

    if (node.photoUnlock) [].concat(node.photoUnlock).forEach((p) => {
      if (unlockPhoto(p)) this.reward('🖼', `Nueva imagen en la galería: ${PHOTOS[p]?.title || p}`);
    });
    if (node.corrupt) [].concat(node.corrupt).forEach((p) => {
      corruptPhoto(p);
      this.reward('⚠️', `Una imagen de tu galería ha cambiado.`);
    });
    if (node.note) [].concat(node.note).forEach((n) => {
      if (unlockNote(n)) this.reward('📝', 'Nueva nota guardada.');
    });
    if (node.reviseNote) [].concat(node.reviseNote).forEach((n) => {
      reviseNote(n); this.reward('📝', 'Una de tus notas ya no dice lo mismo.');
    });
    if (node.page) [].concat(node.page).forEach((p) => {
      if (unlockPage(p)) this.reward('🌐', 'Nueva dirección en el navegador.');
    });
    if (node.evidence) [].concat(node.evidence).forEach((e) => {
      if (addEvidence(e)) this.reward('🔎', 'Prueba archivada.');
    });
    if (node.cam) [].concat(node.cam).forEach((c) => {
      if (unlockCam(c)) this.reward('📹', 'Acceso a una cámara nueva.');
    });
    if (node.bit) {
      const bits = Array.isArray(node.bit[0]) ? node.bit : [node.bit];
      bits.forEach(([cid, b]) => {
        if (unlockProfileBit(cid, b)) this.reward('💠', `Has aprendido algo sobre ${CHARS[cid]?.name || cid}.`);
      });
    }
    if (node.glitchLevel != null) {
      setGlitch(node.glitchLevel);
      this.hooks.onEffect?.({ type: 'glitch', level: node.glitchLevel });
    }
    if (node.route) { S.focusRoute = node.route; save(); }
    if (node.mood) setMood(node.mood);
    if (node.open) [].concat(node.open).forEach((id) => story.forceOpen(id));
    if (node.reopen) [].concat(node.reopen).forEach((id) => reopen(id));
    if (node.shake) this.hooks.onEffect?.({ type: 'shake' });
    if (node.flash) this.hooks.onEffect?.({ type: 'flash' });
    if (node.time) advanceTime(node.time);
  }

  /* --------- elecciones --------- */
  choices(list) {
    return new Promise((resolve) => {
      const usable = list.filter((c) => !c.requires || meets(c.requires));
      this.hooks.onChoices?.(usable, (choice) => {
        this.hooks.onChoices?.(null);
        resolve(choice);
      });
    });
  }

  /* --------- bucle principal --------- */
  async run() {
    if (this.session.mood) setMood(this.session.mood);

    while (this.queue.length && !this.stopped) {
      const node = this.queue.shift();
      if (!node) continue;

      // Condición envolvente
      if (node.if) {
        const branch = meets(node.if) ? node.then : node.else;
        if (branch) this.queue.unshift(...branch);
        continue;
      }

      // Efectos puros (sin render)
      const isPureFx = !node.s && !node.sys && !node.choice && !node.me &&
        !node.day && !node.call && !node.ending && !node.puzzle && !node.photo && !node.sticker;
      this.effects(node);
      if (isPureFx) {
        if (node.wait) await wait(node.wait * speedMul());
        continue;
      }

      if (node.day) { this.daybreak(node.day); continue; }
      if (node.sys) { await this.system(node); continue; }
      if (node.photo) { await this.sendPhoto(node); continue; }
      if (node.sticker) { await this.sticker(node); continue; }
      if (node.me) { await this.me(node.me); continue; }

      if (node.s) { await this.say(node); if (node.wait) await wait(node.wait * speedMul()); continue; }

      if (node.choice) {
        const picked = await this.choices(node.choice);
        if (!picked || this.stopped) break;
        S.stats.choices++;
        if (picked.say !== false) await this.me(picked.echo || picked.t);
        this.effects(picked);
        if (picked.then) this.queue.unshift(...picked.then);
        continue;
      }

      if (node.puzzle) {
        const solved = await new Promise((res) => this.hooks.onPuzzle?.(node.puzzle, res));
        if (this.stopped) break;
        const branch = solved ? node.puzzle.onSolve : node.puzzle.onFail;
        if (branch) this.queue.unshift(...branch);
        continue;
      }

      if (node.call) {
        await new Promise((res) => this.hooks.onCall?.(node.call, res));
        markCall(node.call);
        continue;
      }

      if (node.ending) {
        const e = node.ending;
        recordEnding(e.id, e.char, e.kind);
        this.finishSession();
        this.hooks.onEnding?.(e);
        return;
      }
    }

    if (!this.stopped) {
      this.finishSession();
      this.hooks.onEnd?.(this.rewards);
    }
  }

  finishSession() {
    if (this.replay) return;
    complete(this.session.id);
    if (this.session.after) this.effects(this.session.after);
    if (this.session.advance) advanceTime(this.session.advance);
    story.refresh();
    bus.emit('session:done', this.session);
  }

  /* --------- repetición sin retardos (historial) --------- */
  async replayAll() {
    this.replay = true;
    while (this.queue.length) {
      const node = this.queue.shift();
      if (!node) continue;
      if (node.if) { const b = meets(node.if) ? node.then : node.else; if (b) this.queue.unshift(...b); continue; }
      if (node.day) { this.daybreak(node.day); continue; }
      if (node.sys) { await this.system(node); continue; }
      if (node.photo) { await this.sendPhoto(node); continue; }
      if (node.sticker) { await this.sticker(node); continue; }
      if (node.me) { await this.me(node.me, true); continue; }
      if (node.s) { await this.say(node); continue; }
      if (node.choice) {
        // En el historial se muestra la conversación por la rama principal.
        const first = node.choice.find((c) => !c.requires || meets(c.requires)) || node.choice[0];
        if (first) { await this.me(first.echo || first.t, true); if (first.then) this.queue.unshift(...first.then); }
        continue;
      }
      if (node.puzzle) { if (node.puzzle.onSolve) this.queue.unshift(...node.puzzle.onSolve); continue; }
      if (node.ending || node.call) continue;
    }
  }
}
