/* =========================================================
   apps.js — Álbum, notas, archivos, red, llamadas,
             notificaciones, finales y ajustes.
   ---------------------------------------------------------
   Todo lo que no es conversación. Al principio son adornos
   de una app de citas; a partir de la mitad son las
   herramientas con las que el jugador destapa ASSIST.
   ========================================================= */

import {
  S, settings, updateSettings, fill, setPlayer, reset, save,
  markInspected, unlockPage, clearNotifs
} from '../engine/state.js';
import { photo as photoArt, icon, camera } from '../engine/art.js';
import { avatar, playerFace, PLAYER_HAIR, PLAYER_SKIN, PLAYER_STYLE } from '../engine/portraits.js';
import { CHARS, CAST } from '../../data/characters.js';
import { PHOTOS } from '../../data/photos.js';
import { NOTES } from '../../data/notes.js';
import { FILES } from '../../data/files.js';
import { PAGES, PAGE_BY_URL } from '../../data/browser.js';
import { ENDINGS, ENDING_ORDER } from '../../data/endings.js';
import { CALLS } from '../../data/calls.js';
import { meets } from '../engine/conditions.js';
import { go, back, h, esc, confirmBox, toast, refreshCurrent, shake, applyPhase } from './shell.js';
import { sfx, setMood, setPrefs } from '../engine/audio.js';
import { photoThumb } from './album-util.js';
import * as story from '../engine/story.js';

/* =========================================================
   ÁLBUM
   ========================================================= */
export function album() {
  const ids = Object.keys(PHOTOS);
  const node = h('<div><div class="gal" id="g"></div></div>');
  const g = node.querySelector('#g');
  let have = 0;

  ids.forEach((pid) => {
    const def = PHOTOS[pid];
    if (!S.photos.includes(pid)) { g.appendChild(h('<div class="cell locked">🔒</div>')); return; }
    have++;
    const corrupt = S.photosCorrupt.includes(pid);
    const cell = h(`<button class="cell">${photoThumb(pid, def)}${corrupt ? '<span class="flag">!</span>' : ''}</button>`);
    cell.addEventListener('click', () => { sfx.tap(); go('photo', { id: pid }); });
    g.appendChild(cell);
  });

  return { node, tab: 'album', chrome: { visible: true, back: false, title: 'Álbum', sub: `${have} de ${ids.length} recuerdos`, actions: [] } };
}

export function photoView({ id }) {
  const def = PHOTOS[id];
  if (!def || !S.photos.includes(id)) {
    return { node: h('<div class="empty"><div class="ic">🔒</div><div class="t">No tienes esta imagen.</div></div>') };
  }
  const corrupt = S.photosCorrupt.includes(id);
  const exif = corrupt && def.corruptExif ? def.corruptExif : def.exif || {};
  const owner = def.of && CHARS[def.of];

  const node = h(`
    <div class="viewer">
      <div class="viewer-img">${photoThumb(id, def)}</div>
      ${def.caption ? `<p class="muted" style="margin-top:13px;font-style:italic;color:var(--ink-2)">"${fill(def.caption)}"</p>` : ''}
      <div class="viewer-acts">
        <button data-like aria-label="Me gusta">${icon('heart')}</button>
        <button data-save aria-label="Guardar">${icon('download')}</button>
        <button data-share aria-label="Compartir">${icon('share')}</button>
      </div>
      <div class="card"><h3>Datos del archivo</h3><div class="exif" id="ex"></div></div>
      <div id="extra"></div>
    </div>`);

  const LBL = { fecha: 'Fecha', lugar: 'Lugar', disp: 'Dispositivo', tam: 'Tamaño', extra: '' };
  const ex = node.querySelector('#ex');
  Object.entries(exif).forEach(([k, v]) => {
    const bad = corrupt && (k === 'extra' || String(v).includes('——') || String(v).includes('ASSIST'));
    ex.appendChild(h(`<div><span class="k">${LBL[k] ?? k}</span> <span class="${bad ? 'bad' : ''}">${esc(v)}</span></div>`));
  });

  node.querySelector('[data-like]').addEventListener('click', (e) => {
    sfx.heart(); e.currentTarget.style.color = 'var(--pink)';
  });
  node.querySelector('[data-save]').addEventListener('click', () => toast({ title: 'Guardada en tu álbum', ms: 2000 }));
  node.querySelector('[data-share]').addEventListener('click', () => toast({ title: 'ASSIST no permite compartir fuera de la app.', ms: 2600 }));

  const extra = node.querySelector('#extra');
  if (corrupt && def.corruptNote) {
    extra.appendChild(h(`
      <div class="card" style="border-color:rgba(255,95,126,.35);margin-top:12px">
        <h3 style="color:var(--bad)">Lo que ves al ampliar</h3>
        <p class="muted" style="color:var(--ink-2)">${fill(def.corruptNote)}</p>
      </div>`));
  } else if (!corrupt && def.anomaly) {
    const b = h('<button class="btn btn-block" style="margin-top:14px">Ampliar y analizar</button>');
    b.addEventListener('click', () => {
      sfx.camera();
      markInspected(id);
      if (S.glitch >= 2) {
        S.photosCorrupt.push(id); save(); shake();
        toast({ title: 'La imagen ha cambiado', body: 'Hay algo que antes no estaba.', kind: 'alert' });
        refreshCurrent();
      } else {
        toast({ title: 'No ves nada raro', body: 'Es sólo una foto bonita.', ms: 2400 });
      }
    });
    extra.appendChild(b);
  }

  return { node, tab: 'photo', chrome: { visible: true, title: def.title, sub: owner ? owner.name : 'Archivo del sistema', actions: [] } };
}

/* =========================================================
   NOTAS
   ========================================================= */
export function notes() {
  const node = h('<div style="padding:14px 0 26px"><div id="l"></div></div>');
  const l = node.querySelector('#l');

  if (!S.notes.length) {
    l.appendChild(h('<div class="empty"><div class="ic">📝</div><div class="t">Todavía no has anotado nada.</div></div>'));
  }
  S.notes.forEach((nid) => {
    const n = NOTES[nid];
    if (!n) return;
    const revised = S.notesRevised.includes(nid) && n.revised;
    l.appendChild(h(`
      <div class="note-item ${n.kind === 'evidence' ? 'evidence' : n.kind === 'core' ? 'core' : ''}">
        <div class="note-h"><span class="note-t">${esc(n.title)}</span><span class="note-d">${esc(n.date)}</span></div>
        <div class="note-b">${fill(n.body)}</div>
        ${revised ? `<div class="note-rev">${fill(n.revised)}</div>` : ''}
      </div>`));
  });

  return { node, tab: 'notes', chrome: { visible: true, title: 'Notas', sub: `${S.notes.length} notas · ${S.evidence.length} pruebas`, actions: [] } };
}

/* =========================================================
   ARCHIVOS
   ========================================================= */
export function files() {
  const open = FILES.filter((f) => meets(f.requires));
  const node = h('<div><div class="list" id="l"></div></div>');
  const l = node.querySelector('#l');

  if (!open.length) {
    l.appendChild(h('<div class="empty"><div class="ic">📁</div><div class="t">No hay archivos todavía.</div></div>'));
  }

  const groups = [
    ['Documentos', open.filter((f) => f.kind === 'doc')],
    ['Sin clasificar', open.filter((f) => f.kind === 'med')],
    ['Cifrados', open.filter((f) => f.kind === 'lock')]
  ];
  groups.forEach(([label, arr]) => {
    if (!arr.length) return;
    l.appendChild(h(`<div class="sec">${label}</div>`));
    arr.forEach((f) => {
      const unlocked = !f.password || S.flags['file_' + f.id];
      const row = h(`
        <button class="file-row ${unlocked ? '' : 'locked'}">
          <span class="file-ic ${f.kind}">${f.kind === 'lock' && !unlocked ? icon('lock') : icon('doc')}</span>
          <span class="file-main">
            <span class="file-name">${esc(f.name)}</span>
            <span class="file-meta">${f.size} · ${f.date}</span>
          </span>
        </button>`);
      row.addEventListener('click', () => { sfx.open(); go('file', { id: f.id }); });
      l.appendChild(row);
    });
  });

  return { node, tab: 'files', chrome: { visible: true, title: 'Archivos', sub: `${open.length} elementos`, actions: [] } };
}

export function fileView({ id }) {
  const f = FILES.find((x) => x.id === id);
  if (!f) return { node: h('<div class="empty">Archivo no encontrado.</div>') };
  const unlocked = !f.password || S.flags['file_' + f.id];

  const node = h('<div></div>');

  if (!unlocked) {
    const box = h(`
      <div class="pad">
        <div class="lockbox">
          <div class="ic">🔒</div>
          <p class="muted">Este archivo está cifrado.</p>
          <input class="code-in" id="pw" autocomplete="off" spellcheck="false" placeholder="CLAVE" style="margin:16px 0 0">
          <div class="fb" id="fb"></div>
          <button class="btn btn-primary btn-block" data-try>Descifrar</button>
          <button class="btn btn-ghost btn-block btn-sm" data-hint style="margin-top:8px">Pista</button>
          <div class="hintbox" id="hint" hidden style="margin-top:10px">${esc(f.hint || '')}</div>
        </div>
      </div>`);
    node.appendChild(box);
    const pw = box.querySelector('#pw');
    const fb = box.querySelector('#fb');
    const tryIt = () => {
      const v = pw.value.trim().toUpperCase().replace(/[\s/.-]/g, '');
      if (String(f.password).toUpperCase().replace(/[\s/.-]/g, '') === v) {
        fb.className = 'fb ok'; fb.textContent = 'DESCIFRADO';
        sfx.unlock(); S.flags['file_' + f.id] = true; save();
        setTimeout(refreshCurrent, 700);
      } else {
        fb.className = 'fb no'; fb.textContent = 'CLAVE INCORRECTA';
        sfx.error(); shake(); pw.value = '';
      }
    };
    box.querySelector('[data-try]').addEventListener('click', tryIt);
    pw.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryIt(); });
    box.querySelector('[data-hint]').addEventListener('click', () => { sfx.tap(); box.querySelector('#hint').hidden = false; });
  } else if (f.camera) {
    node.appendChild(h(`
      <div class="pad">
        <div class="cam-frame">${camera(f.camera)}<span class="cam-rec"></span><span class="cam-scan"></span></div>
        <div class="file-body">${fill(f.body)}</div>
      </div>`));
  } else if (f.paper) {
    node.appendChild(h(`<div class="file-paper">${fill(f.body)}${f.stamp ? `\n<span class="stamp">${esc(f.stamp)}</span>` : ''}</div>`));
  } else {
    node.appendChild(h(`<div class="file-body">${fill(f.body)}</div>`));
  }

  return { node, tab: 'files', chrome: { visible: true, title: f.name, sub: `${f.size} · ${f.date}`, actions: [] } };
}

/* =========================================================
   RED (navegador)
   ========================================================= */
let lastPage = null;

export function browser({ page = null } = {}) {
  const startId = page || lastPage || S.pages[0] || 'assist_home';
  const node = h(`
    <div>
      <div class="brw-bar">
        <div class="brw-search">
          ${icon('search')}
          <input id="q" spellcheck="false" autocomplete="off" placeholder="Buscar o escribir dirección">
          <button class="go" id="go" aria-label="Buscar">${icon('search')}</button>
        </div>
      </div>
      <div class="brw-tabs" id="tabs"></div>
      <div class="brw-page" id="page"></div>
    </div>`);

  const q = node.querySelector('#q');
  const pageEl = node.querySelector('#page');
  const tabsEl = node.querySelector('#tabs');
  ['Todo', 'Noticias', 'Documentos', 'Guardado'].forEach((t, i) => {
    const b = h(`<button class="brw-tab ${i === 0 ? 'on' : ''}">${t}</button>`);
    b.addEventListener('click', () => {
      tabsEl.querySelectorAll('.brw-tab').forEach((x) => x.classList.remove('on'));
      b.classList.add('on'); sfx.tap();
      if (i === 3) renderSaved();
    });
    tabsEl.appendChild(b);
  });

  function open(id) {
    const p = PAGES[id];
    if (!p) return notFound();
    if (!S.pages.includes(id)) return unknown();
    lastPage = id;
    q.value = p.url;
    if (p.locked && !S.flags['page_open_' + id]) return renderLocked(id, p);
    renderPage(id, p);
  }

  function renderPage(id, p) {
    pageEl.innerHTML = '';
    pageEl.appendChild(h(`
      <div class="web ${p.kind === 'dark' ? 'dark' : p.kind === 'news' ? 'news' : ''}">
        <div class="web-head">
          <div class="web-logo">${esc(p.logo2 || p.logo)}</div>
          ${p.slogan ? `<div class="web-slogan">${esc(p.slogan)}</div>` : ''}
        </div>
        <div class="web-body">${p.body}</div>
      </div>`));

    pageEl.querySelectorAll('[data-go]').forEach((a) => {
      a.addEventListener('click', () => { unlockPage(a.dataset.go); sfx.tap(); open(a.dataset.go); });
    });
    if (p.grantsCams) { /* compatibilidad: las cámaras viven ahora en Archivos */ }

    const links = (p.links || []).filter((l) => PAGES[l]);
    if (links.length) {
      const box = h('<div style="display:flex;flex-wrap:wrap;gap:7px;margin-top:14px"></div>');
      links.forEach((l) => {
        const b = h(`<button class="tag" style="font-family:var(--f-mono)">${esc(PAGES[l].url)}</button>`);
        b.addEventListener('click', () => { unlockPage(l); sfx.tap(); open(l); });
        box.appendChild(b);
      });
      pageEl.appendChild(box);
    }
  }

  function renderLocked(id, p) {
    pageEl.innerHTML = '';
    const box = h(`
      <div class="web dark">
        <div class="web-head"><div class="web-logo">${esc(p.logo)}</div><div class="web-slogan">acceso restringido</div></div>
        <div class="web-body lockbox">
          <div class="ic">🔒</div>
          <p>Esta página pide una clave.</p>
          <input class="code-in" id="pw" autocomplete="off" spellcheck="false" placeholder="CLAVE" style="margin:14px 0 0">
          <div class="fb" id="fb"></div>
          <button class="btn btn-primary btn-block" id="try">Entrar</button>
          <button class="btn btn-ghost btn-block btn-sm" id="hb" style="margin-top:8px">Pista</button>
          <div class="hintbox" id="hint" hidden style="margin-top:10px">${esc(p.hint || '')}</div>
        </div>
      </div>`);
    pageEl.appendChild(box);
    const pw = box.querySelector('#pw'), fb = box.querySelector('#fb');
    const tryIt = () => {
      const v = pw.value.trim().toUpperCase().replace(/[\s/.-]/g, '');
      if (String(p.password).toUpperCase().replace(/[\s/.-]/g, '') === v) {
        fb.className = 'fb ok'; fb.textContent = 'ACCESO CONCEDIDO';
        sfx.unlock(); S.flags['page_open_' + id] = true; save();
        setTimeout(() => renderPage(id, p), 700);
      } else {
        fb.className = 'fb no'; fb.textContent = 'CLAVE INCORRECTA';
        sfx.error(); shake(); pw.value = '';
      }
    };
    box.querySelector('#try').addEventListener('click', tryIt);
    pw.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryIt(); });
    box.querySelector('#hb').addEventListener('click', () => { sfx.tap(); box.querySelector('#hint').hidden = false; });
    setTimeout(() => pw.focus(), 150);
  }

  function notFound() {
    pageEl.innerHTML = '';
    pageEl.appendChild(h('<div class="empty"><div class="ic">🌐</div><div class="t">No se encuentra esa dirección.</div></div>'));
    sfx.error();
  }
  function unknown() {
    pageEl.innerHTML = '';
    pageEl.appendChild(h('<div class="empty"><div class="ic">🔎</div><div class="t">Todavía no has encontrado la forma de llegar aquí.</div></div>'));
    sfx.error();
  }

  /* Búsqueda: por nombre de personaje devuelve resultados con cara. */
  function search(term) {
    const t = term.toLowerCase().trim();
    if (!t) return;
    const url = PAGE_BY_URL[t.replace(/^https?:\/\//, '').replace(/\/$/, '')];
    if (url) { unlockPage(url); return open(url); }

    pageEl.innerHTML = '';
    const hits = [];
    const who = CAST.find((id) => CHARS[id].name.toLowerCase() === t);

    if (who && S.pages.includes('news_missing')) {
      const c = CHARS[who];
      hits.push({
        kind: 'PERSONA DESAPARECIDA', bad: true, face: who,
        title: `${c.name} ——`, sub: `${c.age} años · Denuncia abierta · Sin contacto desde ${c.hidden.admitted}`,
        go: 'news_missing', fresh: true
      });
    }
    S.pages.forEach((pid) => {
      const p = PAGES[pid];
      if (!p) return;
      const hay = (p.title + ' ' + p.url + ' ' + p.body).toLowerCase();
      if (hay.includes(t)) hits.push({ kind: p.kind === 'news' ? 'NOTICIA' : 'PÁGINA', title: p.title, sub: p.url, go: pid });
    });

    if (!hits.length) {
      pageEl.appendChild(h(`<div class="empty"><div class="ic">🔎</div><div class="t">Sin resultados para "${esc(term)}".</div></div>`));
      sfx.error();
      return;
    }
    hits.forEach((r) => {
      const b = h(`
        <button class="result">
          ${r.face ? `<span class="result-thumb">${avatar(r.face, 'neutral')}</span>` : ''}
          <span class="result-main">
            <span class="result-kind ${r.bad ? '' : 'info'}">${r.kind}${r.fresh ? '<span class="new">NUEVO</span>' : ''}</span>
            <span class="result-title">${esc(r.title)}</span>
            <span class="result-sub">${esc(r.sub)}</span>
          </span>
        </button>`);
      b.addEventListener('click', () => { unlockPage(r.go); sfx.tap(); open(r.go); });
      pageEl.appendChild(b);
    });
  }

  function renderSaved() {
    pageEl.innerHTML = '';
    if (!S.pages.length) { pageEl.appendChild(h('<div class="empty"><div class="t">Nada guardado.</div></div>')); return; }
    S.pages.forEach((pid) => {
      const p = PAGES[pid]; if (!p) return;
      const b = h(`<button class="result"><span class="result-main">
        <span class="result-kind info">${p.kind === 'news' ? 'NOTICIA' : 'PÁGINA'}</span>
        <span class="result-title">${esc(p.title)}</span>
        <span class="result-sub">${esc(p.url)}</span></span></button>`);
      b.addEventListener('click', () => { sfx.tap(); open(pid); });
      pageEl.appendChild(b);
    });
  }

  node.querySelector('#go').addEventListener('click', () => search(q.value));
  q.addEventListener('keydown', (e) => { if (e.key === 'Enter') search(q.value); });

  open(startId);
  return { node, tab: 'browser', chrome: { visible: true, back: false, title: 'Red', sub: `${S.pages.length} direcciones`, actions: [] } };
}

/* =========================================================
   LLAMADAS
   ========================================================= */
export function calls() {
  const done = S.calls || [];
  const node = h('<div><div class="list" id="l"></div></div>');
  const l = node.querySelector('#l');

  l.appendChild(h('<div class="sec">Historial</div>'));
  if (!done.length) {
    l.appendChild(h(`
      <div class="calls-empty">
        <div class="empty">
          <div class="ic">📞</div>
          <div class="t">Todavía no has hablado con nadie por voz.<br><br>
          Las videollamadas consumen muchos datos, así que ASSIST sólo las
          activa cuando la otra persona las necesita de verdad.</div>
        </div>
      </div>`));
  } else {
    done.forEach((cid) => {
      const def = CALLS[cid];
      if (!def) return;
      const c = CHARS[def.char];
      const row = h(`
        <div class="call-log ${def.kind === 'bad' ? 'missed' : ''}">
          <span class="row-av" style="width:44px;height:44px;border-color:${c.accent}">${avatar(def.char, 'tired')}</span>
          <span class="row-main">
            <span class="row-name">${c.name}</span>
            <span class="row-prev">${def.kind === 'bad' ? 'Llamada interrumpida' : 'Videollamada · 15 s'}</span>
          </span>
          <span class="ic">${icon(def.kind === 'bad' ? 'missed' : 'phone')}</span>
        </div>`);
      l.appendChild(row);
    });
  }

  l.appendChild(h('<div class="sec">Contactos</div>'));
  CAST.forEach((id) => {
    const c = CHARS[id];
    const row = h(`
      <button class="row" style="--accent:${c.accent}">
        <span class="row-av">${avatar(id, 'neutral')}</span>
        <span class="row-main">
          <span class="row-top"><span class="row-name">${c.name}</span></span>
          <span class="row-prev">Llamada no disponible</span>
        </span>
        <span style="color:var(--ink-4)">${icon('lock')}</span>
      </button>`);
    row.addEventListener('click', () => {
      sfx.error();
      toast({ char: id, title: `No puedes llamar a ${c.name}`, body: 'Todavía no.', ms: 2600 });
    });
    l.appendChild(row);
  });

  return { node, tab: 'calls', chrome: { visible: true, title: 'Llamadas', sub: `${done.length} en el historial`, actions: [] } };
}

/* =========================================================
   NOTIFICACIONES
   ========================================================= */
export function notifications() {
  const node = h('<div><div class="list" id="l"></div></div>');
  const l = node.querySelector('#l');
  const log = S.notifLog || [];

  if (!log.length) {
    l.appendChild(h('<div class="empty"><div class="ic">🔔</div><div class="t">No tienes notificaciones.</div></div>'));
  }

  log.forEach((n) => {
    const c = n.char && CHARS[n.char];
    const row = h(`
      <button class="notif-row" style="--accent:${c ? c.accent : 'var(--core)'}">
        <span class="av">${c ? avatar(n.char, 'happy') : `<span style="display:grid;place-items:center;height:100%;color:var(--core)">${icon('core')}</span>`}</span>
        <span class="row-main">
          <span class="who">${esc(c ? c.name : 'ASSIST')}</span>
          <span class="txt">${fill(n.title)}</span>
        </span>
        <span class="when">${esc(n.time || '')}</span>
      </button>`);
    row.addEventListener('click', () => {
      sfx.tap();
      if (n.phantom) {
        // El corazón del terror: el aviso existe, el mensaje no.
        toast({ title: 'No hay ningún mensaje nuevo.', kind: 'alert', ms: 3200 });
        if (S.glitch >= 3) shake();
        return;
      }
      if (n.session && story.get(n.session)) go('chat', { id: n.session });
      else if (n.char) go('profile', { id: n.char });
    });
    l.appendChild(row);
  });

  if (log.length) {
    const clr = h('<div class="pad"><button class="btn btn-ghost btn-block">Borrar todo</button></div>');
    clr.querySelector('button').addEventListener('click', () => { sfx.tap(); clearNotifs(); refreshCurrent(); });
    node.appendChild(clr);
  }

  S.notifLog.forEach((n) => { n.seen = true; });
  save();

  return { node, tab: 'notifications', chrome: { visible: true, title: 'Notificaciones', sub: `${log.length} recientes`, actions: [] } };
}

/* =========================================================
   FINALES
   ========================================================= */
export function endingView({ id }) {
  const e = ENDINGS[id];
  if (!e) return { node: h('<div class="empty">Final desconocido.</div>') };
  setMood(e.kind === 'good' ? 'resolve' : e.kind === 'bad' ? 'tense' : 'unease');

  const c = e.char && CHARS[e.char];
  const label = { good: 'Final feliz', bad: 'Final malo', neutral: 'Final neutro' }[e.kind];

  const node = h(`
    <div class="ending" style="--accent:${c ? c.accent : 'var(--pink)'}">
      <div class="ending-kind ${e.kind}">${label} · ${e.num}</div>
      ${c ? `<div class="ending-face">${avatar(e.char, e.kind === 'good' ? 'happy' : e.kind === 'bad' ? 'sad' : 'neutral')}</div>` : ''}
      <div class="ending-title">${esc(e.title)}</div>
      <div class="ending-text">${fill(e.text)}</div>
      <div class="ending-epi">${fill(e.epilogue)}</div>
      <div class="stack" style="margin-top:6px">
        <button class="btn btn-primary btn-block" data-cont>Continuar</button>
        <button class="btn btn-ghost btn-block" data-all>Ver todos los finales</button>
      </div>
    </div>`);

  node.querySelector('[data-cont]').addEventListener('click', () => {
    sfx.tap();
    S.focusRoute = null; save();
    story.refresh();
    go('home', {}, { replace: true, anim: 'fade' });
    const good = Object.values(S.endings).filter((x) => x.kind === 'good').length;
    if (good === 2 && !S.secretUnlocked) {
      S.secretUnlocked = true; save();
      setTimeout(() => toast({
        title: 'La sala común está vacía',
        body: 'Algo ha cambiado en ASSIST.', kind: 'core', ms: 6000,
        onClick: () => go('inbox', { channel: 'system' })
      }), 1500);
    }
  });
  node.querySelector('[data-all]').addEventListener('click', () => { sfx.tap(); go('endings'); });

  return { node, tab: 'ending', anim: 'up', chrome: { visible: false } };
}

export function endingsList() {
  const node = h('<div><div class="end-grid" id="g"></div></div>');
  const g = node.querySelector('#g');
  let got = 0;

  ENDING_ORDER.forEach((eid) => {
    const e = ENDINGS[eid];
    const has = !!S.endings[eid];
    if (has) got++;
    const c = e.char && CHARS[e.char];
    const card = h(`
      <button class="end-card ${has ? 'got' : ''}">
        <span style="width:46px;height:46px;border-radius:50%;overflow:hidden;flex:0 0 auto;background:var(--card-2);${c ? `border:2px solid ${c.accent}` : ''}">
          ${has && c ? avatar(e.char, e.kind === 'good' ? 'happy' : 'sad') : '<span style="display:grid;place-items:center;height:100%;color:var(--ink-4)">?</span>'}
        </span>
        <span style="flex:1;min-width:0">
          <span class="num">${e.num} · ${c ? c.name : 'ASSIST'}</span>
          <span style="display:block;font-weight:700;font-size:14px;margin:2px 0">${has ? esc(e.title) : '— — — — —'}</span>
          <span style="display:block;font-size:11px;color:var(--ink-4)">${{ good: 'Final feliz', bad: 'Final malo', neutral: 'Final neutro' }[e.kind]}</span>
        </span>
      </button>`);
    if (has) card.addEventListener('click', () => { sfx.tap(); go('ending', { id: eid }); });
    g.appendChild(card);
  });

  return { node, tab: 'endings', chrome: { visible: true, title: 'Finales', sub: `${got} de ${ENDING_ORDER.length}`, actions: [] } };
}

/* =========================================================
   AJUSTES
   ========================================================= */
export function settingsView() {
  const node = h(`
    <div>
      <div class="pad" style="text-align:center">
        <div class="avatar-stage" style="width:104px;height:104px;margin:0 auto;border-color:${S.player.color}">
          ${playerFace()}
        </div>
        <div style="font-family:var(--f-head);font-size:21px;font-weight:800;margin-top:12px">${esc(S.player.name)}</div>
        <div class="muted">${esc(S.player.pronouns)}</div>
      </div>

      <div class="sec">Tu perfil</div>
      <div class="pad" style="padding-top:0">
        <div class="field" style="margin-top:0">
          <label for="s-name">Nombre</label>
          <input class="input" id="s-name" maxlength="18" value="${esc(S.player.name)}">
        </div>
        <div class="field">
          <label>Pronombres</label>
          <div class="chips" id="s-pron">
            <button class="chip" data-p="she">ella / la</button>
            <button class="chip" data-p="he">él / lo</button>
            <button class="chip" data-p="neutral">elle / le</button>
          </div>
        </div>
        <div class="field">
          <label>Aspecto</label>
          <div class="avatar-rows">
            <div class="avatar-row"><span class="lbl">Pelo</span><div class="swatches" id="s-hair"></div></div>
            <div class="avatar-row"><span class="lbl">Piel</span><div class="swatches" id="s-skin"></div></div>
            <div class="avatar-row"><span class="lbl">Corte</span><div class="chips" id="s-style"></div></div>
          </div>
        </div>
      </div>

      <div class="sec">Sonido</div><div id="s-snd"></div>
      <div class="sec">Lectura</div>
      <div class="pad" style="padding-top:0">
        <div class="field" style="margin-top:0">
          <label>Velocidad de los mensajes</label>
          <div class="chips" id="s-speed">
            <button class="chip" data-v="slow">Lenta</button>
            <button class="chip" data-v="normal">Normal</button>
            <button class="chip" data-v="fast">Rápida</button>
            <button class="chip" data-v="instant">Instantánea</button>
          </div>
          <div class="hint">ASSIST está pensado para leerse a velocidad normal: los silencios forman parte de la conversación.</div>
        </div>
      </div>

      <div class="sec">Accesibilidad</div><div id="s-a11y"></div>

      <div class="sec">Partida</div>
      <div class="pad">
        <div class="card">
          <h3>Progreso</h3>
          <p class="mono" style="line-height:1.9;color:var(--ink-2)">
            Día ${S.day}<br>
            Conversaciones: ${S.completed.length}<br>
            Decisiones: ${S.stats.choices}<br>
            Fotos: ${S.photos.length} · Notas: ${S.notes.length}<br>
            Pruebas: ${S.evidence.length} · Finales: ${Object.keys(S.endings).length}
          </p>
        </div>
        <button class="btn btn-block" style="margin-top:12px" data-boot>Cerrar sesión</button>
        <button class="btn btn-ghost btn-block" style="margin-top:8px;color:var(--bad)" data-reset>Borrar mi cuenta</button>
      </div>

      <div class="pad center" style="padding-top:0">
        <p class="mono dim" style="line-height:1.8">
          ASSIST: Connected Hearts · v1.0.4<br>
          ASSIST Global Solutions, S.A.<br>
          Los personajes son ficticios.
        </p>
      </div>
    </div>`);

  const nameIn = node.querySelector('#s-name');
  nameIn.addEventListener('change', () => {
    const v = nameIn.value.trim();
    if (v) { setPlayer({ name: v }); toast({ title: 'Nombre actualizado', ms: 1800 }); }
  });

  const pchips = node.querySelectorAll('#s-pron .chip');
  const paintP = () => pchips.forEach((c) => c.classList.toggle('on', c.dataset.p === S.player.pronounKey));
  pchips.forEach((c) => c.onclick = () => { setPlayer({ pronounKey: c.dataset.p }); sfx.tap(); paintP(); });
  paintP();

  /* aspecto */
  const look = Object.assign({}, S.player.look);
  const stage = node.querySelector('.avatar-stage');
  const redraw = () => { stage.innerHTML = playerFace(look); };
  const bank = (sel, list, key) => {
    const box = node.querySelector(sel);
    list.forEach((v) => {
      const b = h(`<button class="swatch" data-v="${v}" style="background:${v}"></button>`);
      b.onclick = () => { look[key] = v; setPlayer({ look }); sfx.tap(); paintLook(); redraw(); };
      box.appendChild(b);
    });
  };
  bank('#s-hair', PLAYER_HAIR, 'hair');
  bank('#s-skin', PLAYER_SKIN, 'skin');
  const styleBox = node.querySelector('#s-style');
  PLAYER_STYLE.forEach((v) => {
    const b = h(`<button class="chip" data-s="${v}">${v}</button>`);
    b.onclick = () => { look.style = v; setPlayer({ look }); sfx.tap(); paintLook(); redraw(); };
    styleBox.appendChild(b);
  });
  function paintLook() {
    node.querySelectorAll('#s-hair .swatch').forEach((s) => s.classList.toggle('on', s.dataset.v === look.hair));
    node.querySelectorAll('#s-skin .swatch').forEach((s) => s.classList.toggle('on', s.dataset.v === look.skin));
    node.querySelectorAll('#s-style .chip').forEach((s) => s.classList.toggle('on', s.dataset.s === look.style));
  }
  paintLook();

  const schips = node.querySelectorAll('#s-speed .chip');
  const paintS = () => schips.forEach((c) => c.classList.toggle('on', c.dataset.v === settings.textSpeed));
  schips.forEach((c) => c.onclick = () => { updateSettings({ textSpeed: c.dataset.v }); sfx.tap(); paintS(); });
  paintS();

  const toggle = (host, key, title, desc, after) => {
    const row = h(`
      <div class="setting">
        <div><div class="setting-t">${title}</div><div class="setting-d">${desc}</div></div>
        <button class="switch ${settings[key] ? 'on' : ''}"></button>
      </div>`);
    const sw = row.querySelector('.switch');
    sw.addEventListener('click', () => {
      updateSettings({ [key]: !settings[key] });
      sw.classList.toggle('on', settings[key]);
      sfx.tap(); after?.();
    });
    node.querySelector(host).appendChild(row);
  };
  toggle('#s-snd', 'music', 'Música', 'Ambiente que cambia con la historia.', () => setPrefs(settings));
  toggle('#s-snd', 'sfx', 'Efectos', 'Mensajes, avisos, interferencias.', () => setPrefs(settings));
  toggle('#s-a11y', 'reduceGlitch', 'Reducir efectos visuales', 'Menos parpadeos y distorsión. La historia no cambia.', applyPhase);

  node.querySelector('[data-boot]').addEventListener('click', () => { sfx.back(); go('boot', {}, { replace: true, anim: 'fade' }); });
  node.querySelector('[data-reset]').addEventListener('click', async () => {
    const ok = await confirmBox({
      title: '¿Borrar tu cuenta?',
      body: 'Se pierde todo: tu perfil, tus conversaciones, tus fotos y los finales conseguidos. No se puede deshacer.',
      ok: 'Borrar todo', cancel: 'No', danger: true
    });
    if (ok) { reset(); go('boot', {}, { replace: true, anim: 'fade' }); }
  });

  return { node, tab: 'settings', chrome: { visible: true, title: 'Ajustes', actions: [] } };
}
