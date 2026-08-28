/* =========================================================
   chat-view.js — Bandeja, conversación, puzles y llamadas.
   ---------------------------------------------------------
   Aquí ocurre el juego. Todo lo demás lo rodea.

   El motor de conversación (src/engine/chat.js) no ha
   cambiado: esta pantalla sólo le dice DÓNDE pintar y CÓMO
   se ven las cosas. Los guiones, las elecciones y los
   efectos siguen viniendo de data/story/.
   ========================================================= */

import { S, fill, isDone, clockText } from '../engine/state.js';
import { avatar, realFace, playerFace } from '../engine/portraits.js';
import { icon } from '../engine/art.js';
import { CHARS, CAST, charName } from '../../data/characters.js';
import { CALLS } from '../../data/calls.js';
import { ChatRunner } from '../engine/chat.js';
import * as story from '../engine/story.js';
import { go, back, h, esc, shake, flash, scrollBottom, toast, deviceEl } from './shell.js';
import { sfx, duckMusic } from '../engine/audio.js';
import { moodOf } from './hub.js';

const NAMES = Object.fromEntries(CAST.map((id) => [id, CHARS[id].name]));

/* =========================================================
   BANDEJA
   ========================================================= */
export function inbox({ channel = null, focus = null } = {}) {
  const node = h('<div><div class="list" id="l"></div></div>');
  const list = node.querySelector('#l');

  // Sin canal concreto se mezcla todo, como una bandeja de verdad.
  const channels = channel ? [channel] : ['dm', 'group', 'system'];
  const nw = [], lk = [], dn = [];
  channels.forEach((ch) => {
    const r = story.channelList(ch, NAMES);
    nw.push(...r.nw); lk.push(...r.lk); dn.push(...r.dn);
  });

  const f = (arr) => focus ? arr.filter((o) => o.s.char === focus) : arr;
  const NW = f(nw), LK = f(lk).slice(0, 4), DN = f(dn);

  if (NW.length) { list.appendChild(h('<div class="sec">Sin leer</div>')); NW.forEach((o) => list.appendChild(row(o, true))); }
  if (LK.length) { list.appendChild(h('<div class="sec">Todavía no</div>')); LK.forEach((o) => list.appendChild(row(o, false))); }
  if (DN.length) { list.appendChild(h('<div class="sec">Historial</div>')); DN.forEach((o) => list.appendChild(row(o, false))); }

  if (!NW.length && !LK.length && !DN.length) {
    list.appendChild(h(`
      <div class="empty">
        <div class="ic">💌</div>
        <div class="t">Aquí no hay nada todavía.<br>Te avisamos cuando alguien escriba.</div>
      </div>`));
  }

  function row({ s, state, hint }, unread) {
    const c = s.char && CHARS[s.char];
    const who = s.channel === 'group' ? 'Sala común'
      : s.channel === 'system' ? 'ASSIST'
        : c?.name || '';
    const av = s.channel === 'group'
      ? `<span class="row-av group">${CAST.map((id) => avatar(id, 'happy')).join('')}</span>`
      : c
        ? `<span class="row-av" style="border-color:${c.accent}">${avatar(s.char, moodOf(s.char))}${state !== 'locked' ? '<span class="on-dot"></span>' : ''}</span>`
        : `<span class="row-av" style="display:grid;place-items:center;color:var(--core);border-color:var(--core)">${icon('core')}</span>`;

    const prev = state === 'locked' ? (hint || 'Aún no disponible.') : fill(s.preview || s.title);
    const r = h(`
      <button class="row ${unread ? 'unread' : ''} ${state === 'locked' ? 'locked' : ''}">
        ${av}
        <span class="row-main">
          <span class="row-top">
            <span class="row-name">${esc(who)}</span>
            <span class="row-time">${state === 'locked' ? '' : story.stamp(s)}</span>
          </span>
          <span class="row-prev">${state !== 'locked' && !unread ? '<span style="color:var(--core)">✓✓</span>' : ''}${prev}</span>
        </span>
        ${unread ? '<span class="row-pill">1</span>' : ''}
      </button>`);
    if (state !== 'locked') r.addEventListener('click', () => { sfx.open(); go('chat', { id: s.id }); });
    else r.addEventListener('click', () => sfx.error());
    return r;
  }

  const title = channel === 'group' ? 'Sala común' : channel === 'system' ? 'ASSIST' : 'Mensajes';
  const n = story.unreadCount(channel);
  return {
    node, tab: channel === 'system' ? 'system' : 'inbox',
    chrome: { visible: true, back: !!channel || !!focus, title, sub: n ? `${n} sin leer` : 'Al día', actions: [] }
  };
}

/* =========================================================
   CONVERSACIÓN
   ========================================================= */
export function chatView({ id }) {
  const session = story.get(id);
  if (!session) return { node: h('<div class="empty">Esta conversación ya no existe.</div>') };

  const replay = isDone(id);
  if (!replay) story.syncClock(session);

  const isGroup = session.channel === 'group';
  const isSys = session.channel === 'system';
  const c = session.char && CHARS[session.char];

  const node = h(`
    <div class="chat">
      <div class="stream" id="stream"></div>
      <div id="foot"></div>
    </div>`);
  const stream = node.querySelector('#stream');
  const foot = node.querySelector('#foot');
  const scroll = () => requestAnimationFrame(() => scrollBottom(true));

  /* --- barra de escritura inerte: en ASSIST se elige, no se teclea --- */
  function composer() {
    foot.innerHTML = '';
    foot.appendChild(h(`
      <div class="composer">
        <span class="gift">${icon('gift')}</span>
        <span class="fake">Elige una respuesta…</span>
        <span class="send">${icon('send')}</span>
      </div>`));
  }

  function showChoices(list, pick) {
    foot.innerHTML = '';
    if (!list) { composer(); return; }
    const box = h('<div class="choices"></div>');
    list.forEach((ch) => {
      const b = h(`<button class="choice">${fill(ch.t)}</button>`);
      b.addEventListener('click', () => { sfx.tap(); pick(ch); });
      box.appendChild(b);
    });
    foot.appendChild(box);
    scroll();
  }

  /* --- puzle --- */
  function showPuzzle(def, done) {
    foot.innerHTML = '';
    const box = h(`
      <div class="pad">
        <div class="kicker">${esc(def.title || 'Acceso restringido')}</div>
        <div class="card" style="margin-bottom:12px">
          <p class="muted" style="color:var(--ink-2);white-space:pre-wrap">${fill(def.prompt || '')}</p>
        </div>
        <input class="code-in" id="pz" maxlength="16" autocomplete="off" spellcheck="false"
          placeholder="${def.kind === 'word' ? 'PALABRA' : '••••••'}">
        <div class="fb" id="fb"></div>
        <button class="btn btn-primary btn-block" data-try>Comprobar</button>
        <button class="btn btn-ghost btn-block btn-sm" data-hint style="margin-top:8px">Necesito una pista</button>
        <div class="hintbox" id="hint" hidden style="margin-top:10px">${fill(def.hint || '')}</div>
      </div>`);
    foot.appendChild(box);
    scroll();

    const input = box.querySelector('#pz');
    const fb = box.querySelector('#fb');
    setTimeout(() => input.focus(), 160);
    const accept = (def.accept || [def.answer]).map((a) => String(a).toUpperCase().replace(/[\s/.-]/g, ''));

    const attempt = () => {
      const v = input.value.toUpperCase().replace(/[\s/.-]/g, '');
      if (!v) return;
      if (accept.includes(v)) {
        fb.className = 'fb ok'; fb.textContent = 'ACCESO CONCEDIDO';
        sfx.unlock(); input.disabled = true;
        setTimeout(() => { composer(); done(true); }, 900);
      } else {
        fb.className = 'fb no'; fb.textContent = 'CÓDIGO INCORRECTO';
        sfx.error(); shake(); input.value = '';
        if (!box.querySelector('[data-give]')) {
          const g = h('<button class="btn btn-ghost btn-block btn-sm" data-give style="margin-top:8px">Dejarlo por ahora</button>');
          g.addEventListener('click', () => { composer(); done(false); });
          box.appendChild(g);
        }
      }
    };
    box.querySelector('[data-try]').addEventListener('click', attempt);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') attempt(); });
    box.querySelector('[data-hint]').addEventListener('click', () => { sfx.tap(); box.querySelector('#hint').hidden = false; });
  }

  /* --- cierre --- */
  function endFoot(rewards) {
    foot.innerHTML = '';
    const box = h('<div class="chat-end"></div>');
    (rewards || []).forEach((r, i) => {
      box.appendChild(h(`<div class="reward" style="animation-delay:${i * 90}ms"><span class="ic">${r.icon}</span><span>${fill(r.text)}</span></div>`));
    });
    const nxt = story.pending()[0];
    if (nxt && nxt.id !== session.id) {
      const b = h(`<button class="btn btn-primary btn-block">Siguiente · ${esc(nxt.title)}</button>`);
      b.addEventListener('click', () => { sfx.open(); go('chat', { id: nxt.id }, { replace: true }); });
      box.appendChild(b);
    }
    const home = h('<button class="btn btn-block">Volver a ASSIST</button>');
    home.addEventListener('click', () => { sfx.back(); go('home', {}, { replace: true, anim: 'fade' }); });
    box.appendChild(home);
    foot.appendChild(box);
    scroll();
  }

  composer();

  const runner = new ChatRunner(session, stream, {
    scroll,
    onChoices: (l, pick) => showChoices(l, pick),
    onPuzzle: (d, done) => showPuzzle(d, done),
    onPhoto: (pid) => go('photo', { id: pid }),
    onEnd: (r) => endFoot(r),
    onEnding: (e) => go('ending', { id: e.id }, { replace: true, anim: 'up' }),
    onCall: (cid, done) => runCall(cid, done),
    onEffect: (fx) => {
      if (fx.type === 'shake') shake();
      if (fx.type === 'flash') flash();
      if (fx.type === 'glitch') {
        shake();
        toast({ title: 'ASSIST', body: 'Error de representación.', kind: 'core', ms: 3000 });
      }
    }
  });

  if (replay) {
    stream.appendChild(h('<div class="sysmsg">Estás releyendo. Tus decisiones ya están tomadas.</div>'));
    runner.replayAll().then(() => {
      foot.innerHTML = '';
      const b = h('<div class="chat-end"><button class="btn btn-block">Volver</button></div>');
      b.querySelector('button').addEventListener('click', () => { sfx.back(); back(); });
      foot.appendChild(b);
    });
  } else {
    runner.run();
  }

  /* =========================================================
     VIDEOLLAMADA
     ---------------------------------------------------------
     El único momento en que la aplicación deja de parecer una
     aplicación. Pantalla completa, sin barras, sin salida.
     ========================================================= */
  function runCall(callId, done) {
    const def = CALLS[callId];
    if (!def) { done(); return; }
    const who = CHARS[def.char] || CHARS.ryu;

    duckMusic(def.duration + 3200);
    sfx.callIn();

    const ov = h(`
      <div class="callscreen">
        <div class="call-frame">
          <div class="call-ring" id="ring">
            <div class="pulse"><div style="width:100%;height:100%;border-radius:50%;overflow:hidden">${avatar(def.char, 'worried')}</div></div>
          </div>
          <div id="video" style="width:100%;height:100%"></div>
          <div class="vig"></div>
        </div>
        <div class="call-name">${who.name}</div>
        <div class="call-state" id="state">${esc(def.status)}</div>
        <div class="call-sub" id="sub"></div>
        <div class="call-timer" id="timer"></div>
        <div class="call-btns" id="btns">
          <button class="call-btn ans" data-ans aria-label="Contestar">${icon('phone')}</button>
        </div>
      </div>`);
    deviceEl().appendChild(ov);

    const timers = [];
    ov.querySelector('[data-ans]').addEventListener('click', () => {
      sfx.tap();
      ov.querySelector('#btns').remove();
      ov.querySelector('#ring').remove();
      ov.querySelector('#video').innerHTML = realFace(def.char, def.mood);
      ov.querySelector('#state').textContent = def.kind === 'bad' ? 'Señal inestable' : 'En llamada';

      const sub = ov.querySelector('#sub');
      const timer = ov.querySelector('#timer');
      const t0 = Date.now();
      const tick = setInterval(() => {
        const s = Math.floor((Date.now() - t0) / 1000);
        timer.textContent = `00:${String(s).padStart(2, '0')}`;
      }, 500);
      timers.push(tick);
      if (def.sounds) def.sounds.forEach((s, i) => timers.push(setTimeout(() => sfx[s]?.(), i * 3000 + 1200)));

      def.lines.forEach((ln) => timers.push(setTimeout(() => {
        sub.innerHTML = ln.glitch ? `<span class="corrupt glitchtext">${fill(ln.t)}</span>` : fill(ln.t);
        if (ln.glitch) { shake(); sfx.glitch(); }
      }, ln.at)));

      timers.push(setTimeout(() => {
        clearInterval(tick);
        sfx.callEnd();
        if (def.kind === 'bad') { flash(); shake(); }
        ov.querySelector('#video').innerHTML = '';
        ov.querySelector('#state').textContent = 'Llamada finalizada';
        timer.textContent = '';
        sub.innerHTML = `<span class="muted">${fill(def.after).replace(/\n/g, '<br>')}</span>`;
        const close = h('<div class="call-btns"><button class="call-btn end" aria-label="Cerrar">✕</button></div>');
        close.querySelector('button').addEventListener('click', () => {
          timers.forEach(clearTimeout); ov.remove(); done();
        });
        ov.appendChild(close);
      }, def.duration));
    });
  }

  const title = isGroup ? 'Sala común' : isSys ? 'ASSIST' : charName(session.char);
  return {
    node, tab: 'chat',
    chrome: {
      visible: true, title,
      sub: isSys ? 'Sistema' : replay ? session.title : 'En línea',
      online: !isSys && !replay,
      accentWash: c?.accentWash,
      actions: [{ ico: 'people', label: 'Ver perfil', on: () => { if (c) go('profile', { id: session.char }); } }]
    },
    leave: () => runner.stop()
  };
}
