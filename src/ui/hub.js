/* =========================================================
   hub.js — Inicio, contactos y fichas de personaje.
   ---------------------------------------------------------
   La pantalla de inicio tiene que contestar en dos segundos
   a la única pregunta que le importa al jugador:

       "¿me ha escrito alguien?"

   Todo lo demás es secundario.
   ========================================================= */

import { S, bondLevel, bondPct, fill, setFlag, flag } from '../engine/state.js';
import { pixelHeart, icon } from '../engine/art.js';
import { avatar, portrait, playerFace } from '../engine/portraits.js';
import { CHARS, CAST, stageText, profileBits } from '../../data/characters.js';
import { PHOTOS } from '../../data/photos.js';
import { FILES } from '../../data/files.js';
import { meets } from '../engine/conditions.js';
import * as story from '../engine/story.js';
import { go, h, esc } from './shell.js';
import { sfx, setMood } from '../engine/audio.js';
import { photoThumb } from './album-util.js';

/* Expresión del retrato según cómo va la relación y la trama. */
export function moodOf(cid) {
  const c = S.chars[cid];
  if (!c) return 'neutral';
  if (c.mood && c.mood !== 'neutral') return c.mood;
  if (c.route === 'ended') return S.endings[`${cid}_good`] ? 'happy' : 'sad';
  if (c.awakening > 40) return 'worried';
  if (c.awareness > 45) return 'worried';
  if (c.romance > 40) return 'shy';
  if (c.affinity > 24) return 'happy';
  return 'neutral';
}

function hearts(n) {
  return '♥'.repeat(n) + `<span class="off">${'♥'.repeat(5 - n)}</span>`;
}

/* =========================================================
   INICIO
   ========================================================= */
export function home() {
  setMood(S.glitch >= 3 ? 'tense' : S.glitch >= 2 ? 'unease' : story.phase() >= 2 ? 'tender' : 'warm');

  const pending = story.pending();
  const perChar = {};
  pending.forEach((s) => {
    if (s.channel === 'dm' && s.char) perChar[s.char] = (perChar[s.char] || 0) + 1;
  });
  const next = pending[0];

  const node = h(`
    <div class="home">
      <div class="home-brand">
        <div class="wm">ASSIST</div>
        <div class="wm-sub">Connected Hearts</div>
        <div class="mini-heart">${pixelHeart(34)}</div>
      </div>
      <div id="notice"></div>
      <div class="strip" id="strip"></div>
      <div class="grid" id="grid"></div>
      <div class="bonds"><div class="bond-card"><h3>Tus vínculos</h3><div id="bonds"></div></div></div>
    </div>`);

  /* ---------- aviso destacado ---------- */
  const notice = node.querySelector('#notice');
  if (next) {
    const c = next.char && CHARS[next.char];
    const who = next.channel === 'group' ? 'la sala común'
      : next.channel === 'system' ? 'ASSIST'
        : c?.name || '';
    const n = pending.length;
    const card = h(`
      <div class="notice">
        <div class="notice-h">
          <span>✦</span><span>Aviso</span>
          <button class="x" data-x aria-label="Descartar">✕</button>
        </div>
        <div class="notice-b">
          ${n > 1
            ? `Tienes <b>${n} conversaciones</b> sin abrir.<br>La última es de <b>${esc(who)}</b>.`
            : `Tienes <b>un mensaje nuevo</b> de <b>${esc(who)}</b>.`}
        </div>
        <button class="notice-go" data-go>Abrir · ${esc(next.title)}</button>
      </div>`);
    card.querySelector('[data-go]').addEventListener('click', () => { sfx.open(); go('chat', { id: next.id }); });
    card.querySelector('[data-x]').addEventListener('click', () => { sfx.tap(); card.remove(); });
    notice.appendChild(card);
  }

  /* ---------- fila de contactos ---------- */
  const strip = node.querySelector('#strip');
  CAST.forEach((id) => {
    const c = CHARS[id];
    const unread = perChar[id] || 0;
    const item = h(`
      <button class="strip-item" style="--accent:${c.accent}">
        <span class="strip-ring ${unread ? '' : 'quiet'}">
          <span class="strip-av ${S.glitch >= 3 ? 'av-glitch' : ''}">${avatar(id, moodOf(id))}</span>
        </span>
        ${unread ? `<span class="badge">${unread}</span>` : '<span class="dot-on"></span>'}
        <span class="strip-name">${c.name}</span>
      </button>`);
    item.addEventListener('click', () => { sfx.open(); go('profile', { id }); });
    strip.appendChild(item);
  });
  // El jugador también está en su propia app.
  const me = h(`
    <button class="strip-item">
      <span class="strip-ring quiet"><span class="strip-av">${playerFace()}</span></span>
      <span class="strip-name">Tú</span>
    </button>`);
  me.addEventListener('click', () => { sfx.tap(); go('settings'); });
  strip.appendChild(me);

  /* ---------- rejilla de aplicaciones ---------- */
  const grid = node.querySelector('#grid');
  const sysNew = story.unreadCount('system');
  const dmNew = Object.values(perChar).reduce((a, b) => a + b, 0) + story.unreadCount('group');

  const tiles = [
    { label: 'Mensajes', ico: 'chat', tint: '#ff4d94', n: dmNew, to: 'inbox' },
    { label: 'Contactos', ico: 'people', tint: '#a78bfa', to: 'contacts' },
    { label: 'Álbum', ico: 'gallery', tint: '#ff8a5c', to: 'album' },
    { label: 'Red', ico: 'globe', tint: '#7fd8e8', to: 'browser', locked: !S.pages.length },
    { label: 'Notas', ico: 'notes', tint: '#ffd166', to: 'notes', locked: !S.notes.length },
    { label: 'Archivos', ico: 'files', tint: '#7fd88f', to: 'files', locked: !FILES.some((f) => meets(f.requires)) },
    { label: 'Llamadas', ico: 'phone', tint: '#5fd8ff', to: 'calls' },
    { label: 'Finales', ico: 'end', tint: '#ff87bd', to: 'endings', locked: !Object.keys(S.endings).length },
    { label: 'Ajustes', ico: 'gear', tint: '#9c82b8', to: 'settings' }
  ];
  if (sysNew) tiles.splice(6, 0, { label: 'Sistema', ico: 'core', tint: '#5fd8ff', n: sysNew, to: 'system' });

  tiles.forEach((t) => {
    const tile = h(`
      <button class="tile ${t.locked ? 'locked' : ''}" style="--tint:${t.tint}">
        ${t.n ? `<span class="n">${t.n}</span>` : ''}
        ${t.locked ? '<span class="lockic">🔒</span>' : ''}
        <span class="glyph">${icon(t.ico)}</span>
        <span class="lbl">${t.label}</span>
      </button>`);
    if (!t.locked) tile.addEventListener('click', () => { sfx.open(); go(t.to); });
    grid.appendChild(tile);
  });

  /* ---------- vínculos ---------- */
  const bonds = node.querySelector('#bonds');
  CAST.forEach((id) => {
    const c = CHARS[id];
    const lvl = bondLevel(id);
    bonds.appendChild(h(`
      <div class="bond" style="--accent:${c.accent}">
        <span class="bond-face">${avatar(id, 'happy')}</span>
        <span class="bond-mid">
          <span class="bond-name">${c.name}</span>
          <span class="bond-track"><span class="bond-fill" style="width:${bondPct(id)}%"></span></span>
        </span>
        <span class="hearts">${hearts(lvl)}</span>
      </div>`));
  });

  const unread = story.unreadCount();
  return {
    node,
    tab: 'home',
    anim: 'fade',
    chrome: {
      visible: true, back: false,
      title: greeting() + ', ' + (S.player.name || 'tú'),
      sub: unread ? `${unread} sin leer` : 'Todo al día',
      actions: [
        { type: 'clock' },
        { ico: 'bell', label: 'Notificaciones', n: S.notifLog.filter((x) => !x.seen).length || 0, on: () => go('notifications') }
      ]
    }
  };
}

function greeting() {
  const hr = Math.floor((((S.minutes % 1440) + 1440) % 1440) / 60);
  if (S.glitch >= 3) return 'Sigues aquí';
  if (hr < 5) return 'Es muy tarde';
  if (hr < 12) return 'Buenos días';
  if (hr < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

/* =========================================================
   CONTACTOS
   ========================================================= */
export function contacts() {
  const node = h('<div><div class="list" id="l"></div></div>');
  const list = node.querySelector('#l');
  list.appendChild(h('<div class="sec">Tus conexiones</div>'));

  CAST.forEach((id) => {
    const c = CHARS[id];
    const st = S.chars[id];
    const lvl = bondLevel(id);
    const pend = story.pendingFor('dm').filter((s) => s.char === id).length;
    const row = h(`
      <button class="row ${pend ? 'unread' : ''}" style="--accent:${c.accent}">
        <span class="row-av">${avatar(id, moodOf(id))}${st.route === 'ended' ? '' : '<span class="on-dot"></span>'}</span>
        <span class="row-main">
          <span class="row-top">
            <span class="row-name">${c.name}<span style="font-weight:400;color:var(--ink-4);font-size:12px"> · ${c.age}</span></span>
            <span class="hearts" style="font-size:11px">${hearts(lvl)}</span>
          </span>
          <span class="row-prev">${fill(stageText(id, lvl))}</span>
        </span>
        ${pend ? `<span class="row-pill">${pend}</span>` : ''}
      </button>`);
    row.addEventListener('click', () => { sfx.open(); go('profile', { id }); });
    list.appendChild(row);
  });

  list.appendChild(h('<div class="sec">Grupos</div>'));
  const gpend = story.unreadCount('group');
  const grow = h(`
    <button class="row ${gpend ? 'unread' : ''}">
      <span class="row-av group">${CAST.map((id) => avatar(id, 'happy')).join('')}</span>
      <span class="row-main">
        <span class="row-top"><span class="row-name">Sala común</span></span>
        <span class="row-prev">Los cuatro a la vez. Suerte.</span>
      </span>
      ${gpend ? `<span class="row-pill">${gpend}</span>` : ''}
    </button>`);
  grow.addEventListener('click', () => { sfx.open(); go('inbox', { channel: 'group' }); });
  list.appendChild(grow);

  return { node, tab: 'contacts', chrome: { visible: true, back: false, title: 'Contactos', sub: `${CAST.length} conexiones`, actions: [] } };
}

/* =========================================================
   FICHA DE PERSONAJE
   ========================================================= */
export function profile({ id }) {
  const c = CHARS[id];
  if (!c) return { node: h('<div class="empty">Contacto desconocido.</div>') };

  const st = S.chars[id];
  const lvl = bondLevel(id);
  const bits = profileBits(id, st.profileBits);
  const likes = [...c.likes.map((t) => ({ text: t })), ...bits.filter((b) => b.type === 'like')];
  const dislikes = [...c.dislikes.map((t) => ({ text: t })), ...bits.filter((b) => b.type === 'dislike')];
  const facts = bits.filter((b) => b.type === 'fact');
  const pend = story.pendingFor('dm').filter((s) => s.char === id);
  const prog = story.routeProgress(id);
  const ended = st.route === 'ended';
  const photos = Object.entries(PHOTOS).filter(([pid, p]) => p.of === id && S.photos.includes(pid));

  const node = h(`
    <div style="--accent:${c.accent};--accent-wash:${c.accentWash}">
      <div class="prof-hero">
        <div class="prof-art ${S.glitch >= 3 ? 'av-glitch' : ''}">${portrait(id, moodOf(id))}</div>
        <div class="prof-id">
          <div class="prof-name">${c.name}</div>
          <div class="prof-tag">${esc(c.tagline)}</div>
          <div class="prof-status">
            ${ended ? 'Historia terminada' : pend.length ? `${pend.length} sin leer` : 'En línea'}
          </div>
        </div>
      </div>

      <div class="prof-body">
        <div class="card">
          <h3>Vuestra relación</h3>
          <div class="heartmeter">
            <div class="lv">
              <div class="lv-name">${fill(stageText(id, lvl))}</div>
              <div class="lv-note">${prog.done} de ${prog.total} conversaciones</div>
            </div>
            <div class="hs">${hearts(lvl)}</div>
          </div>
          <div class="meter-track"><div class="meter-fill" style="width:${bondPct(id)}%"></div></div>
        </div>

        <div class="card">
          <h3>Perfil</h3>
          <dl style="margin:0">
            <div class="kv"><dt>Edad</dt><dd>${c.age}</dd></div>
            <div class="kv"><dt>Ocupación</dt><dd>${esc(c.occupation)}</dd></div>
            <div class="kv"><dt>Le gusta</dt><dd class="taglist" id="lk"></dd></div>
            <div class="kv"><dt>No le gusta</dt><dd class="taglist" id="dk"></dd></div>
            <div class="kv"><dt>Sobre</dt><dd>${esc(c.bio)}</dd></div>
          </dl>
        </div>

        <div class="card">
          <h3>Lo que sabes de ${c.name}</h3>
          <div class="stack" id="facts"></div>
        </div>

        ${photos.length ? '<div class="card"><h3>Sus fotos</h3><div class="gal" style="padding:0" id="ph"></div></div>' : ''}

        <button class="btn ${pend.length ? 'btn-primary' : ''} btn-block" data-msg>
          ${pend.length ? `Leer mensaje de ${c.name}` : `Ver conversaciones`}
        </button>
      </div>
    </div>`);

  const tag = (t, fresh) => `<span class="tag ${fresh ? 'fresh' : ''}">${fill(t)}</span>`;
  node.querySelector('#lk').innerHTML = likes.map((l, i) => tag(l.text, i >= c.likes.length)).join('');
  node.querySelector('#dk').innerHTML = dislikes.map((l, i) => tag(l.text, i >= c.dislikes.length)).join('');

  const fx = node.querySelector('#facts');
  if (!facts.length) {
    fx.appendChild(h('<div class="locked-slot">Todavía no te ha contado nada personal.</div>'));
  } else {
    facts.forEach((f) => fx.appendChild(h(
      `<div class="tag ${f.wrong ? 'wrong' : ''}" style="display:block;text-align:left;border-radius:12px">${fill(f.text)}</div>`)));
    if (facts.some((f) => f.wrong)) {
      fx.appendChild(h(`<div class="note-rev">Este dato ya no coincide con lo que ${c.name} recuerda.</div>`));
    }
  }
  const hiddenCount = c.bits.length - bits.length;
  if (hiddenCount > 0) {
    fx.appendChild(h(`<div class="locked-slot">${'▓'.repeat(12)} · ${hiddenCount} por descubrir</div>`));
  }

  const ph = node.querySelector('#ph');
  if (ph) photos.forEach(([pid, p]) => {
    const cell = h(`<button class="cell">${photoThumb(pid, p)}</button>`);
    cell.addEventListener('click', () => { sfx.tap(); go('photo', { id: pid }); });
    ph.appendChild(cell);
  });

  node.querySelector('[data-msg]').addEventListener('click', () => {
    sfx.open();
    if (pend.length) go('chat', { id: pend[0].id });
    else go('inbox', { channel: 'dm', focus: id });
  });

  return {
    node, tab: 'profile',
    chrome: {
      visible: true, hero: true, title: c.name, sub: c.handle,
      accentWash: c.accentWash, actions: []
    }
  };
}
