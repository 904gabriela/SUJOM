/* =========================================================
   hub.js — Pantalla principal y fichas de personaje.
   ---------------------------------------------------------
   Es lo primero que ve el jugador al abrir SUJOM, y tiene que
   contestar en dos segundos a la única pregunta que importa:
   "¿me ha escrito alguien?"
   ========================================================= */

import {
  S, bondLevel, bondPct, BOND_NAMES, fill, goodEndings
} from '../engine/state.js';
import { chibi, portrait, icon, photo as photoArt } from '../engine/art.js';
import { CHARS, CAST, GROUP, profileBits } from '../../data/characters.js';
import { PHOTOS } from '../../data/photos.js';
import * as story from '../engine/story.js';
import { go, h } from './shell.js';
import { sfx, setMood } from '../engine/audio.js';

/* Estado de ánimo del icono en el hub, derivado de la historia. */
function moodOf(cid) {
  const c = S.chars[cid];
  if (!c) return 'neutral';
  if (c.mood && c.mood !== 'neutral') return c.mood;
  if (c.route === 'ended') return S.endings[`${cid}_good`] ? 'happy' : 'sad';
  if (c.awakening > 40) return 'worried';
  if (c.awareness > 45) return 'worried';
  if (c.romance > 40) return 'shy';
  if (c.affinity > 30) return 'happy';
  return 'neutral';
}

const MOOD_ICON = {
  happy: '☺', shy: '♡', worried: '…', sad: '·', angry: '!', neutral: ''
};

export function hub() {
  const phase = story.phase();
  setMood(S.glitch >= 3 ? 'tense' : S.glitch >= 2 ? 'unease' : phase >= 2 ? 'tender' : 'warm');

  const pendingAll = story.pending();
  const byChar = {};
  pendingAll.forEach((s) => {
    if (s.channel === 'dm' && s.char) byChar[s.char] = (byChar[s.char] || 0) + 1;
  });
  const groupNew = story.unreadCount('group');
  const sysNew = story.unreadCount('system');
  const next = pendingAll[0];

  const greeting = greet();

  const node = h(`
    <div class="view hub">
      <div class="hub-head">
        <div>
          <div class="hub-greet">${greeting},<br><span>${esc(S.player.name)}</span></div>
        </div>
        <div class="hub-date">DÍA ${S.day}</div>
      </div>

      <div class="cast" id="cast"></div>

      <div id="spot"></div>

      <div class="apps" id="apps"></div>

      <div class="card">
        <h3>Vínculos</h3>
        <div class="bonds" id="bonds"></div>
      </div>

      <div class="center" style="padding:10px 0 4px">
        <span class="mono dim">${S.completed.length} conversaciones · ${S.photos.length} imágenes · ${Object.keys(S.endings).length} finales</span>
      </div>
    </div>`);

  /* ---------- fila de personajes ---------- */
  const cast = node.querySelector('#cast');
  CAST.forEach((id) => {
    const c = CHARS[id];
    const st = S.chars[id];
    const unread = byChar[id] || 0;
    const mood = moodOf(id);
    // Los cuatro se presentan durante el alta, así que están disponibles desde
    // el primer minuto. Un personaje futuro puede declarar `debutFlag` para
    // aparecer atenuado hasta que la historia lo introduzca.
    const known = !c.debutFlag || S.flags[c.debutFlag];
    const item = h(`
      <button class="cast-item ${known ? '' : 'locked'}" style="--accent:${c.accent}">
        <div class="cast-ring">
          <div class="cast-av ${S.glitch >= 3 ? 'av-glitch' : ''}">${chibi(c, mood, { glitch: S.glitch >= 3 ? S.glitch : 0 })}</div>
        </div>
        ${unread ? `<span class="cast-badge">${unread}</span>` : ''}
        ${MOOD_ICON[mood] ? `<span class="cast-mood">${MOOD_ICON[mood]}</span>` : ''}
        <span class="cast-name">${c.name}</span>
      </button>`);
    item.addEventListener('click', () => { sfx.open(); go('profile', { id }); });
    cast.appendChild(item);
  });

  /* ---------- tarjeta destacada ---------- */
  const spot = node.querySelector('#spot');
  if (next) {
    const c = next.char && CHARS[next.char];
    const accent = c ? c.accent : (next.channel === 'system' ? '#5fe3ff' : '#f0c674');
    const who = next.channel === 'group' ? 'Sala común'
      : next.channel === 'system' ? 'SUJOM'
        : (c?.name || '');
    const card = h(`
      <div class="spotlight" style="--accent-soft:${c ? c.accentSoft : 'rgba(240,198,116,.14)'}">
        <div class="spotlight-label" style="color:${accent}">${who} · ${story.stamp(next)}</div>
        <div class="spotlight-title">${esc(next.title)}</div>
        <div class="spotlight-desc">${fill(next.preview || 'Te están esperando.')}</div>
        <button class="btn btn-primary btn-sm" data-open>Abrir conversación</button>
      </div>`);
    card.querySelector('[data-open]').addEventListener('click', () => {
      sfx.open();
      go('chat', { id: next.id });
    });
    spot.appendChild(card);
  } else {
    spot.appendChild(h(`
      <div class="spotlight">
        <div class="spotlight-label">Al día</div>
        <div class="spotlight-title">No hay nada nuevo</div>
        <div class="spotlight-desc">Nadie te ha escrito todavía. Puedes releer conversaciones antiguas o mirar la galería.</div>
      </div>`));
  }

  /* ---------- rejilla de apps ---------- */
  const apps = node.querySelector('#apps');
  const tiles = [
    { id: 'group', label: 'Sala', ico: 'chat', dot: groupNew, screen: 'list', params: { channel: 'group' } },
    { id: 'dm', label: 'Privados', ico: 'dm', dot: Object.values(byChar).reduce((a, b) => a + b, 0), screen: 'list', params: { channel: 'dm' } },
    { id: 'gallery', label: 'Galería', ico: 'gallery', dot: 0, screen: 'gallery' },
    { id: 'notes', label: 'Notas', ico: 'notes', dot: 0, screen: 'notes', locked: !S.notes.length },
    { id: 'browser', label: 'Red', ico: 'browser', dot: 0, screen: 'browser', locked: !S.pages.length },
    { id: 'cams', label: 'Cámaras', ico: 'cam', dot: 0, screen: 'cams', locked: !S.cams.length, accent: 'accent-core' },
    { id: 'endings', label: 'Finales', ico: 'end', dot: 0, screen: 'endings', locked: !Object.keys(S.endings).length },
    { id: 'system', label: 'Sistema', ico: 'core', dot: sysNew, screen: 'list', params: { channel: 'system' }, locked: !sysNew && !S.completed.some((i) => story.get(i)?.channel === 'system'), accent: 'accent-core' },
    { id: 'settings', label: 'Ajustes', ico: 'profile', dot: 0, screen: 'settings' }
  ];
  tiles.forEach((t) => {
    const tile = h(`
      <button class="app-tile ${t.locked ? 'locked' : ''} ${t.accent || ''}">
        ${t.dot ? '<span class="dot"></span>' : ''}
        ${icon(t.ico)}
        <span class="lbl">${t.label}</span>
      </button>`);
    if (!t.locked) tile.addEventListener('click', () => { sfx.open(); go(t.screen, t.params || {}); });
    apps.appendChild(tile);
  });

  /* ---------- barras de vínculo ---------- */
  const bonds = node.querySelector('#bonds');
  CAST.forEach((id) => {
    const c = CHARS[id];
    const pct = bondPct(id);
    const lvl = bondLevel(id);
    bonds.appendChild(h(`
      <div class="bond" style="--accent:${c.accent}">
        <span class="bond-name">${c.name}</span>
        <span class="bond-track"><span class="bond-fill" style="width:${pct}%"></span></span>
        <span class="bond-hearts">${'♥'.repeat(lvl)}${'<span class="off">♥</span>'.repeat(5 - lvl)}</span>
      </div>`));
  });

  return {
    node,
    chrome: { visible: true, title: 'SUJOM', sub: subtitle(), back: false }
  };
}

function subtitle() {
  const n = story.unreadCount();
  if (S.glitch >= 4) return 'algo va mal';
  if (n === 0) return 'Todo al día';
  return `${n} conversación${n === 1 ? '' : 'es'} sin abrir`;
}

function greet() {
  const h24 = Math.floor(((S.minutes % 1440) + 1440) % 1440 / 60);
  if (S.glitch >= 4) return 'Sigues aquí';
  if (h24 < 5) return 'Es muy tarde';
  if (h24 < 12) return 'Buenos días';
  if (h24 < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

/* =========================================================
   FICHA DE PERSONAJE
   ========================================================= */
export function profile({ id }) {
  const c = CHARS[id];
  if (!c) return { node: h('<div class="empty">Personaje desconocido.</div>') };
  const st = S.chars[id];
  const bits = profileBits(id, st.profileBits);
  const likes = [...c.likes.map((t) => ({ text: t })), ...bits.filter((b) => b.type === 'like')];
  const dislikes = [...c.dislikes.map((t) => ({ text: t })), ...bits.filter((b) => b.type === 'dislike')];
  const facts = bits.filter((b) => b.type === 'fact');
  const lvl = bondLevel(id);
  const pct = bondPct(id);
  const prog = story.routeProgress(id);
  const pend = story.pendingFor('dm').filter((s) => s.char === id);
  const ended = st.route === 'ended';
  const mood = moodOf(id);

  const photos = Object.entries(PHOTOS)
    .filter(([pid, p]) => p.of === id && S.photos.includes(pid));

  const node = h(`
    <div class="view profile">
      <div class="profile-hero" style="--accent:${c.accent};--accent-soft:${c.accentSoft}">
        <div class="profile-art ${S.glitch >= 3 ? 'av-glitch' : ''}">
          ${portrait(c, mood, { glitch: S.glitch >= 3 ? S.glitch : 0 })}
        </div>
        <div class="profile-id">
          <div class="profile-name">${c.name}</div>
          <div class="profile-meta">${c.age} años · ${c.handle}</div>
          <div class="profile-status">
            <span class="led" style="background:${ended ? '#7d7699' : pend.length ? '#ff5a6e' : '#5fe3b0'}"></span>
            ${ended ? 'Ruta terminada' : pend.length ? `${pend.length} sin leer` : 'En línea'}
          </div>
        </div>
      </div>

      <div class="profile-body">
        <div class="card" style="--accent:${c.accent}">
          <h3>Vínculo</h3>
          <div class="meter">
            <div class="meter-top">
              <span class="meter-lvl" style="color:${c.accent}">${fill(BOND_NAMES[lvl])}</span>
              <span class="hearts">${'♥'.repeat(lvl)}${'<span class="off">♥</span>'.repeat(5 - lvl)}</span>
            </div>
            <div class="meter-track"><div class="meter-fill" style="width:${pct}%;background:linear-gradient(90deg,${c.accent},var(--rose))"></div></div>
            <div class="meter-top" style="margin-top:4px">
              <span>${prog.done} de ${prog.total} conversaciones</span>
              <span>${prog.pct}%</span>
            </div>
          </div>
        </div>

        <div class="card">
          <h3>Perfil</h3>
          <p class="bio">${c.bio}</p>
          <div class="divider"></div>
          <dl style="margin:0">
            <div class="kv"><dt>Le gusta</dt><dd class="taglist" id="likes"></dd></div>
            <div class="kv"><dt>No le gusta</dt><dd class="taglist" id="dislikes"></dd></div>
          </dl>
        </div>

        <div class="card">
          <h3>Lo que sabes de ${c.name}</h3>
          <div class="stack" id="facts"></div>
        </div>

        ${photos.length ? `<div class="card"><h3>Sus imágenes</h3><div class="gal-grid" style="padding:0" id="pf-photos"></div></div>` : ''}

        <div class="stack">
          <button class="btn ${pend.length ? 'btn-primary' : ''} btn-block" data-dm>
            ${pend.length ? `Abrir mensaje de ${c.name}` : `Ver conversaciones con ${c.name}`}
          </button>
        </div>
      </div>
    </div>`);

  const tag = (t, cls = '') => `<span class="tag ${cls}">${fill(t)}</span>`;
  node.querySelector('#likes').innerHTML = likes.map((l, i) => tag(l.text, i >= c.likes.length ? 'new' : '')).join('') || '<span class="dim">—</span>';
  node.querySelector('#dislikes').innerHTML = dislikes.map((l, i) => tag(l.text, i >= c.dislikes.length ? 'new' : '')).join('') || '<span class="dim">—</span>';

  const factsEl = node.querySelector('#facts');
  if (!facts.length) {
    factsEl.appendChild(h('<div class="locked-slot">Todavía no te ha contado nada personal.</div>'));
  } else {
    facts.forEach((f) => {
      factsEl.appendChild(h(`<div class="tag ${f.wrong ? 'wrong' : ''}" style="display:block;text-align:left;border-radius:10px">${fill(f.text)}</div>`));
    });
    // Cuando una información se contradice, se deja constancia.
    if (facts.some((f) => f.wrong)) {
      factsEl.appendChild(h(`<div class="note-rev" style="margin-top:2px">Este dato ya no coincide con lo que ${c.name} recuerda.</div>`));
    }
  }
  const hiddenSlots = c.bits.length - facts.length - likes.length + c.likes.length - dislikes.length + c.dislikes.length;
  if (hiddenSlots > 0) {
    factsEl.appendChild(h(`<div class="locked-slot">${'█'.repeat(14)} · ${hiddenSlots} dato${hiddenSlots === 1 ? '' : 's'} por descubrir</div>`));
  }

  const pf = node.querySelector('#pf-photos');
  if (pf) {
    photos.forEach(([pid, p]) => {
      const cell = h(`<button class="gal-cell">${photoThumb(pid, p)}</button>`);
      cell.addEventListener('click', () => { sfx.tap(); go('photo', { id: pid }); });
      pf.appendChild(cell);
    });
  }

  node.querySelector('[data-dm]').addEventListener('click', () => {
    sfx.open();
    if (pend.length) go('chat', { id: pend[0].id });
    else go('list', { channel: 'dm', focus: id });
  });

  return { node, chrome: { visible: true, title: c.name, sub: c.tagline } };
}

/* Miniatura de galería reutilizable */
export function photoThumb(pid, def) {
  return photoArt(
    { ...def, spec: CHARS[def.of] },
    { corrupt: S.photosCorrupt.includes(pid) }
  );
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
