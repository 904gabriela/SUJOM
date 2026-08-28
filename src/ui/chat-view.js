/* =========================================================
   chat-view.js — Lista de conversaciones, chat, puzles y
   videollamadas.
   ---------------------------------------------------------
   Aquí ocurre casi todo el juego.
   ========================================================= */

import {
  S, fill, isDone, markCall, bus
} from '../engine/state.js';
import { chibi, realPortrait } from '../engine/art.js';
import { CHARS, GROUP, CAST, charName } from '../../data/characters.js';
import { CALLS } from '../../data/calls.js';
import { ChatRunner } from '../engine/chat.js';
import * as story from '../engine/story.js';
import { go, back, h, shake, flash, scrollBottom, toast, refreshCurrent } from './shell.js';
import { sfx, setMood, duckMusic } from '../engine/audio.js';

const NAMES = Object.fromEntries(CAST.map((id) => [id, CHARS[id].name]));

/* =========================================================
   LISTA DE CONVERSACIONES
   ========================================================= */
export function chatList({ channel = 'dm', focus = null } = {}) {
  const { nw, lk, dn } = story.channelList(channel, NAMES);
  const node = h('<div class="view"><div class="list" id="rows"></div></div>');
  const rows = node.querySelector('#rows');

  const title = channel === 'group' ? 'Sala común' : channel === 'system' ? 'Sistema' : 'Mensajes privados';
  const sub = channel === 'group' ? GROUP.tagline
    : channel === 'system' ? 'Avisos de la aplicación'
      : 'Uno a uno';

  const add = (label) => rows.appendChild(h(`<div class="section-label">${label}</div>`));

  const filt = (arr) => focus ? arr.filter((o) => o.s.char === focus) : arr;
  const nwF = filt(nw), lkF = filt(lk), dnF = filt(dn);

  if (nwF.length) { add('Sin leer'); nwF.forEach((o) => rows.appendChild(row(o, true))); }
  if (lkF.length) { add('Todavía no'); lkF.forEach((o) => rows.appendChild(row(o, false))); }
  if (dnF.length) { add('Historial'); dnF.forEach((o) => rows.appendChild(row(o, false))); }

  if (!nwF.length && !lkF.length && !dnF.length) {
    rows.appendChild(h(`
      <div class="empty">
        <div class="ic">✉</div>
        <div class="t">Aquí no hay nada todavía.<br>Vuelve más tarde.</div>
      </div>`));
  }

  function row({ s, state, hint }, unread) {
    const c = s.char && CHARS[s.char];
    const who = s.channel === 'group' ? 'Sala común'
      : s.channel === 'system' ? 'SUJOM'
        : (c?.name || s.char || '');
    const av = s.channel === 'group'
      ? `<div class="row-av group">${CAST.map((id) => chibi(CHARS[id], 'neutral')).join('')}</div>`
      : c
        ? `<div class="row-av">${chibi(c, S.chars[s.char]?.mood || 'neutral', { glitch: S.glitch >= 3 ? S.glitch : 0 })}</div>`
        : `<div class="row-av" style="display:grid;place-items:center;color:var(--c-core);font-family:var(--font-mono);font-size:10px">CORE</div>`;

    const prev = state === 'locked' ? (hint || 'Aún no está disponible.') : fill(s.preview || s.title);
    const r = h(`
      <button class="row ${unread ? 'unread' : ''} ${state === 'locked' ? 'locked' : ''}">
        ${av}
        <div class="row-main">
          <div class="row-top">
            <span class="row-name">${esc(who)}${state === 'locked' ? '' : ` · ${esc(s.title)}`}</span>
            <span class="row-time">${state === 'locked' ? '' : story.stamp(s)}</span>
          </div>
          <div class="row-prev">${prev}</div>
        </div>
        ${unread ? '<span class="row-pill">1</span>' : ''}
      </button>`);

    if (state !== 'locked') {
      r.addEventListener('click', () => { sfx.open(); go('chat', { id: s.id }); });
    } else {
      r.addEventListener('click', () => sfx.error());
    }
    return r;
  }

  return { node, chrome: { visible: true, title, sub } };
}

/* =========================================================
   VISTA DE CHAT
   ========================================================= */
export function chatView({ id }) {
  const session = story.get(id);
  if (!session) return { node: h('<div class="empty">Esta conversación ya no existe.</div>') };

  const replay = isDone(id);
  if (!replay) story.syncClock(session);

  const node = h(`
    <div class="view chat">
      <div class="chat-stream" id="stream"></div>
      <div id="foot"></div>
    </div>`);
  const stream = node.querySelector('#stream');
  const foot = node.querySelector('#foot');

  let runner = null;
  let choiceBox = null;

  const scroll = () => requestAnimationFrame(() => scrollBottom(true));

  /* --- pie: teclado inerte (no se escribe libremente en SUJOM) --- */
  function idleFoot() {
    foot.innerHTML = '';
    foot.appendChild(h(`
      <div class="chat-foot">
        <div class="fake-input">Elige una respuesta…</div>
        <div class="send">➤</div>
      </div>`));
  }

  /* --- zona de elecciones --- */
  function showChoices(list, pick) {
    foot.innerHTML = '';
    if (!list) { idleFoot(); return; }
    choiceBox = h('<div class="choices"></div>');
    list.forEach((c) => {
      const b = h(`<button class="choice ${c.risky ? 'risky' : ''}">${c.tag ? `<span class="choice-tag">${c.tag}</span>` : ''}${fill(c.t)}</button>`);
      b.addEventListener('click', () => { sfx.tap(); pick(c); });
      choiceBox.appendChild(b);
    });
    foot.appendChild(choiceBox);
    scroll();
  }

  /* --- puzle en línea --- */
  function showPuzzle(def, done) {
    foot.innerHTML = '';
    const box = h(`
      <div class="puzzle">
        <div class="eyebrow">${esc(def.title || 'Acceso restringido')}</div>
        <div class="puzzle-prompt">${fill(def.prompt || '')}</div>
        <input class="code-in" id="pz" maxlength="16" autocomplete="off" spellcheck="false"
          placeholder="${def.kind === 'word' ? 'PALABRA' : '••••••'}">
        <div class="puzzle-fb" id="fb"></div>
        <button class="btn btn-primary btn-block" data-try>Comprobar</button>
        <button class="btn btn-ghost btn-sm" data-hint>Necesito una pista</button>
        <div class="hintbox" id="hint" hidden>${fill(def.hint || 'No hay más pistas.')}</div>
      </div>`);
    foot.appendChild(box);
    scroll();

    const input = box.querySelector('#pz');
    const fb = box.querySelector('#fb');
    setTimeout(() => input.focus(), 150);

    const accept = (def.accept || [def.answer]).map((a) => String(a).toUpperCase().replace(/[\s/.-]/g, ''));

    const attempt = () => {
      const v = input.value.toUpperCase().replace(/[\s/.-]/g, '');
      if (!v) return;
      if (accept.includes(v)) {
        fb.className = 'puzzle-fb ok';
        fb.textContent = 'ACCESO CONCEDIDO';
        sfx.unlock();
        input.disabled = true;
        setTimeout(() => { idleFoot(); done(true); }, 900);
      } else {
        fb.className = 'puzzle-fb no';
        fb.textContent = 'CÓDIGO INCORRECTO';
        sfx.error();
        shake();
        input.value = '';
        // Un fallo no bloquea: se puede seguir intentando hasta rendirse.
        box.querySelector('[data-give]')?.remove();
        const give = h('<button class="btn btn-ghost btn-sm" data-give>Rendirse por ahora</button>');
        give.addEventListener('click', () => { idleFoot(); done(false); });
        box.appendChild(give);
      }
    };

    box.querySelector('[data-try]').addEventListener('click', attempt);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') attempt(); });
    box.querySelector('[data-hint]').addEventListener('click', () => {
      sfx.tap();
      box.querySelector('#hint').hidden = false;
    });
  }

  /* --- final de sesión --- */
  function endFoot(rewards) {
    foot.innerHTML = '';
    const box = h('<div class="chat-end"></div>');
    (rewards || []).forEach((r, i) => {
      const n = h(`<div class="reward" style="animation-delay:${i * 90}ms"><span class="ic">${r.icon}</span><span>${fill(r.text)}</span></div>`);
      box.appendChild(n);
    });
    const nxt = story.pending()[0];
    if (nxt && nxt.id !== session.id) {
      const b = h(`<button class="btn btn-primary btn-block" data-next>Siguiente: ${esc(nxt.title)}</button>`);
      b.addEventListener('click', () => { sfx.open(); go('chat', { id: nxt.id }, true); });
      box.appendChild(b);
    }
    const home = h('<button class="btn btn-block" data-home>Volver a SUJOM</button>');
    home.addEventListener('click', () => { sfx.back(); go('hub', {}, true); });
    box.appendChild(home);
    if (!rewards?.length && !nxt) box.appendChild(h('<div class="note">Se acabó por hoy.</div>'));
    foot.appendChild(box);
    scroll();
  }

  /* --- arranque --- */
  idleFoot();
  runner = new ChatRunner(session, stream, {
    scroll,
    onChoices: (list, pick) => showChoices(list, pick),
    onPuzzle: (def, done) => showPuzzle(def, done),
    onPhoto: (pid) => go('photo', { id: pid }),
    onEnd: (rewards) => endFoot(rewards),
    onEnding: (e) => go('ending', { id: e.id }, true),
    onCall: (callId, done) => runCall(callId, done),
    onEffect: (fx) => {
      if (fx.type === 'shake') shake();
      if (fx.type === 'flash') flash();
      if (fx.type === 'glitch') {
        shake();
        toast({ title: 'SUJOM', body: 'Se ha detectado un error de representación.', kind: 'core', ms: 3200 });
      }
    }
  });

  if (replay) {
    stream.appendChild(h('<div class="sysmsg">Estás releyendo una conversación. Tus decisiones ya están tomadas.</div>'));
    runner.replayAll().then(() => {
      foot.innerHTML = '';
      const b = h('<div class="chat-end"><button class="btn btn-block" data-home>Volver</button></div>');
      b.querySelector('[data-home]').addEventListener('click', () => { sfx.back(); back(); });
      foot.appendChild(b);
    });
  } else {
    runner.run();
  }

  /* --- videollamada superpuesta --- */
  function runCall(callId, done) {
    const def = CALLS[callId];
    if (!def) { done(); return; }
    const c = CHARS[def.char] || CHARS.ryu;

    duckMusic(def.duration + 3000);
    sfx.callIn();

    const overlay = h(`
      <div class="call">
        <div class="call-frame">
          <div class="call-ring" id="ring">
            <div class="pulse">
              <div style="width:74px;height:74px;border-radius:50%;overflow:hidden">${chibi(c, 'neutral')}</div>
            </div>
          </div>
          <div id="video"></div>
          <div class="vignette"></div>
        </div>
        <div class="call-name">${c.name}</div>
        <div class="call-status" id="status">${esc(def.status)}</div>
        <div class="call-sub" id="sub"></div>
        <div class="call-timer" id="timer"></div>
        <div style="margin-top:20px" id="answer">
          <button class="btn btn-primary" data-ans>Contestar</button>
        </div>
      </div>`);
    document.getElementById('device').appendChild(overlay);

    const timers = [];
    overlay.querySelector('[data-ans]').addEventListener('click', () => {
      sfx.tap();
      overlay.querySelector('#answer').remove();
      overlay.querySelector('#ring').remove();
      overlay.querySelector('#video').innerHTML = realPortrait(c, def.mood);
      overlay.querySelector('#status').textContent = def.kind === 'bad' ? 'Señal inestable' : 'En llamada';
      if (def.sounds) def.sounds.forEach((s, i) => timers.push(setTimeout(() => sfx[s]?.(), i * 3000 + 1200)));

      const sub = overlay.querySelector('#sub');
      const timer = overlay.querySelector('#timer');
      const started = Date.now();
      const tick = setInterval(() => {
        const s = Math.floor((Date.now() - started) / 1000);
        timer.textContent = `00:${String(s).padStart(2, '0')}`;
      }, 500);
      timers.push(tick);

      def.lines.forEach((ln) => {
        timers.push(setTimeout(() => {
          sub.innerHTML = ln.glitch ? `<span class="corrupt glitchtext">${fill(ln.t)}</span>` : fill(ln.t);
          if (ln.glitch) { shake(); sfx.glitch(); }
        }, ln.at));
      });

      timers.push(setTimeout(() => {
        clearInterval(tick);
        sfx.callEnd();
        if (def.kind === 'bad') { flash(); shake(); }
        overlay.querySelector('#video').innerHTML = '';
        overlay.querySelector('#status').textContent = 'Llamada finalizada';
        sub.innerHTML = `<span class="muted">${fill(def.after).replace(/\n/g, '<br>')}</span>`;
        timer.textContent = '';
        const close = h('<div style="margin-top:22px"><button class="btn btn-block" data-close>Cerrar</button></div>');
        close.querySelector('[data-close]').addEventListener('click', () => {
          timers.forEach(clearTimeout);
          overlay.remove();
          done();
        });
        overlay.appendChild(close);
      }, def.duration));
    });
  }

  const title = session.channel === 'group' ? 'Sala común'
    : session.channel === 'system' ? 'SUJOM'
      : charName(session.char);

  return {
    node,
    chrome: { visible: true, title, sub: session.title },
    leave: () => { runner?.stop(); }
  };
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
