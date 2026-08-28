/* =========================================================
   apps.js — Galería, notas, navegador, cámaras, finales y
   ajustes.
   ---------------------------------------------------------
   Todo lo que no es conversación. Al principio son adornos
   bonitos de una app de citas; a partir de la fase 3 son
   herramientas de investigación.
   ========================================================= */

import {
  S, settings, updateSettings, fill, setPlayer, reset, save,
  markInspected, unlockPage, unlockCam, bus
} from '../engine/state.js';
import { photo as photoArt, camera, chibi, icon } from '../engine/art.js';
import { CHARS, CAST } from '../../data/characters.js';
import { PHOTOS } from '../../data/photos.js';
import { NOTES } from '../../data/notes.js';
import { PAGES, PAGE_BY_URL } from '../../data/browser.js';
import { ENDINGS, ENDING_ORDER } from '../../data/endings.js';
import { go, back, h, confirmBox, toast, refreshCurrent, shake } from './shell.js';
import { sfx, setMood, setPrefs } from '../engine/audio.js';
import * as story from '../engine/story.js';

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* =========================================================
   GALERÍA
   ========================================================= */
export function gallery() {
  const ids = Object.keys(PHOTOS);
  const node = h('<div class="view"><div class="gal-grid" id="grid"></div></div>');
  const grid = node.querySelector('#grid');

  let have = 0;
  ids.forEach((pid) => {
    const def = PHOTOS[pid];
    const owned = S.photos.includes(pid);
    if (owned) have++;
    if (!owned) {
      grid.appendChild(h('<div class="gal-cell locked">🔒</div>'));
      return;
    }
    const corrupt = S.photosCorrupt.includes(pid);
    const cell = h(`
      <button class="gal-cell">
        ${photoArt({ ...def, spec: CHARS[def.of] }, { corrupt })}
        ${corrupt ? '<span class="flag">!</span>' : ''}
      </button>`);
    cell.addEventListener('click', () => { sfx.tap(); go('photo', { id: pid }); });
    grid.appendChild(cell);
  });

  return {
    node,
    chrome: { visible: true, title: 'Galería', sub: `${have} de ${ids.length} imágenes` }
  };
}

/* ---------------------------------------------------------
   Visor de una foto: aquí es donde una foto bonita se
   convierte en prueba.
   --------------------------------------------------------- */
export function photoView({ id }) {
  const def = PHOTOS[id];
  if (!def || !S.photos.includes(id)) {
    return { node: h('<div class="empty"><div class="ic">🔒</div><div class="t">No tienes esta imagen.</div></div>') };
  }
  const corrupt = S.photosCorrupt.includes(id);
  const exif = corrupt && def.corruptExif ? def.corruptExif : def.exif || {};
  const inspected = S.photosInspected.includes(id);

  const node = h(`
    <div class="view viewer">
      <div class="viewer-img">${photoArt({ ...def, spec: CHARS[def.of] }, { corrupt })}</div>
      ${def.caption ? `<p class="muted" style="margin-top:12px;font-style:italic">"${fill(def.caption)}"</p>` : ''}
      <div class="card" style="margin-top:14px">
        <h3>Datos del archivo</h3>
        <div class="exif" id="exif"></div>
      </div>
      <div id="extra"></div>
    </div>`);

  const ex = node.querySelector('#exif');
  const LABELS = { fecha: 'Fecha', lugar: 'Lugar', disp: 'Dispositivo', tam: 'Tamaño', extra: '' };
  Object.entries(exif).forEach(([k, v]) => {
    const bad = corrupt && (k === 'extra' || String(v).includes('——') || String(v).includes('ASSIST'));
    ex.appendChild(h(`<div><span class="k">${LABELS[k] ?? k}</span> <span class="${bad ? 'bad' : ''}">${esc(v)}</span></div>`));
  });

  const extra = node.querySelector('#extra');
  if (corrupt && def.corruptNote) {
    extra.appendChild(h(`
      <div class="card" style="border-color:rgba(255,90,110,.3);margin-top:12px">
        <h3 style="color:var(--danger)">Lo que ves cuando amplías</h3>
        <p class="bio">${fill(def.corruptNote)}</p>
      </div>`));
  } else if (!corrupt && def.anomaly) {
    // Analizar es una acción del jugador: revela la versión corrupta.
    const b = h('<button class="btn btn-block" style="margin-top:14px" data-scan>Ampliar y analizar</button>');
    b.addEventListener('click', () => {
      sfx.camera();
      if (!inspected) markInspected(id);
      // Sólo se puede revelar la anomalía si la historia ya la ha destapado.
      if (S.glitch >= 2) {
        S.photosCorrupt.push(id);
        save();
        shake();
        toast({ title: 'La imagen ha cambiado', body: 'Hay algo que antes no estaba.', kind: 'alert' });
        refreshCurrent();
      } else {
        toast({ title: 'No ves nada raro', body: 'Es sólo una foto.', ms: 2600 });
      }
    });
    extra.appendChild(b);
  }

  const owner = def.of && CHARS[def.of];
  return {
    node,
    chrome: { visible: true, title: def.title, sub: owner ? owner.name : 'Archivo del sistema' }
  };
}

/* =========================================================
   NOTAS
   ========================================================= */
export function notes() {
  const node = h('<div class="view" style="padding:14px 0 28px"><div id="list"></div></div>');
  const list = node.querySelector('#list');

  if (!S.notes.length) {
    list.appendChild(h('<div class="empty"><div class="ic">📝</div><div class="t">Todavía no has anotado nada.</div></div>'));
  }

  S.notes.forEach((nid) => {
    const n = NOTES[nid];
    if (!n) return;
    const revised = S.notesRevised.includes(nid) && n.revised;
    list.appendChild(h(`
      <div class="note-item ${n.kind === 'evidence' ? 'evidence' : n.kind === 'core' ? 'core' : ''}">
        <div class="note-h">
          <span class="note-t">${esc(n.title)}</span>
          <span class="note-d">${esc(n.date)}</span>
        </div>
        <div class="note-b">${fill(n.body)}</div>
        ${revised ? `<div class="note-rev">${fill(n.revised)}</div>` : ''}
      </div>`));
  });

  const ev = S.evidence.length;
  return {
    node,
    chrome: { visible: true, title: 'Notas', sub: `${S.notes.length} notas · ${ev} prueba${ev === 1 ? '' : 's'}` }
  };
}

/* =========================================================
   NAVEGADOR
   ========================================================= */
let lastUrl = '';

export function browser({ page = null } = {}) {
  const startId = page || PAGE_BY_URL[lastUrl] || S.pages[0] || 'assist_home';

  const node = h(`
    <div class="view">
      <div class="brw-bar">
        <input class="brw-url" id="url" spellcheck="false" autocomplete="off" placeholder="escribe una dirección…">
        <button class="brw-go" id="go">IR</button>
      </div>
      <div class="brw-page" id="page"></div>
    </div>`);

  const urlIn = node.querySelector('#url');
  const pageEl = node.querySelector('#page');

  function open(id) {
    const p = PAGES[id];
    if (!p) { render404(); return; }
    if (!S.pages.includes(id) && !p.alwaysOpen) { renderUnknown(); return; }
    lastUrl = p.url.toLowerCase();
    urlIn.value = p.url;

    if (p.locked && !S.flags['page_open_' + id]) { renderLocked(id, p); return; }
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

    // Enlaces internos
    pageEl.querySelectorAll('[data-go]').forEach((a) => {
      a.addEventListener('click', () => {
        const target = a.dataset.go;
        unlockPage(target);
        sfx.tap();
        open(target);
      });
    });

    // Concesión de cámaras
    if (p.grantsCams) {
      p.grantsCams.forEach((c) => unlockCam(c));
    }

    // Enlaces descubiertos
    const links = (p.links || []).filter((l) => S.pages.includes(l) || PAGES[l]);
    if (links.length) {
      const box = h('<div class="brw-links"></div>');
      links.forEach((l) => {
        const b = h(`<button class="brw-link">${esc(PAGES[l]?.url || l)}</button>`);
        b.addEventListener('click', () => { unlockPage(l); sfx.tap(); open(l); });
        box.appendChild(b);
      });
      pageEl.appendChild(box);
    }
    pageEl.scrollIntoView({ block: 'start' });
  }

  function renderLocked(id, p) {
    pageEl.innerHTML = '';
    const box = h(`
      <div class="web dark">
        <div class="web-head"><div class="web-logo">${esc(p.logo)}</div><div class="web-slogan">acceso restringido</div></div>
        <div class="web-body lockbox">
          <div class="ic">🔒</div>
          <p>Esta página pide una clave.</p>
          <input class="code-in" id="pw" autocomplete="off" spellcheck="false" placeholder="CLAVE" style="margin:14px 0">
          <div class="puzzle-fb" id="fb"></div>
          <button class="btn btn-primary btn-block" id="try">Entrar</button>
          <button class="btn btn-ghost btn-sm" id="hintb" style="margin-top:8px">Pista</button>
          <div class="hintbox" id="hint" hidden style="margin-top:10px">${esc(p.hint || '—')}</div>
        </div>
      </div>`);
    pageEl.appendChild(box);

    const pw = box.querySelector('#pw');
    const fb = box.querySelector('#fb');
    const attempt = () => {
      const v = pw.value.trim().toUpperCase().replace(/[\s/.-]/g, '');
      const ok = String(p.password).toUpperCase().replace(/[\s/.-]/g, '') === v;
      if (ok) {
        fb.className = 'puzzle-fb ok'; fb.textContent = 'ACCESO CONCEDIDO';
        sfx.unlock();
        S.flags['page_open_' + id] = true;
        save();
        setTimeout(() => renderPage(id, p), 700);
      } else {
        fb.className = 'puzzle-fb no'; fb.textContent = 'CLAVE INCORRECTA';
        sfx.error(); shake(); pw.value = '';
      }
    };
    box.querySelector('#try').addEventListener('click', attempt);
    pw.addEventListener('keydown', (e) => { if (e.key === 'Enter') attempt(); });
    box.querySelector('#hintb').addEventListener('click', () => { sfx.tap(); box.querySelector('#hint').hidden = false; });
    setTimeout(() => pw.focus(), 150);
  }

  function render404() {
    pageEl.innerHTML = '';
    pageEl.appendChild(h('<div class="web dark"><div class="web-body web-404">404 · esa dirección no existe</div></div>'));
    sfx.error();
  }

  function renderUnknown() {
    pageEl.innerHTML = '';
    pageEl.appendChild(h('<div class="web dark"><div class="web-body web-404">No has encontrado todavía ninguna forma de llegar aquí.</div></div>'));
    sfx.error();
  }

  node.querySelector('#go').addEventListener('click', () => {
    const v = urlIn.value.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
    const id = PAGE_BY_URL[v];
    if (id) { unlockPage(id); open(id); } else render404();
  });
  urlIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') node.querySelector('#go').click(); });

  // Índice de páginas descubiertas
  const known = h('<div class="brw-links" style="padding:0 16px 24px"></div>');
  S.pages.forEach((pid) => {
    const p = PAGES[pid];
    if (!p) return;
    const b = h(`<button class="brw-link">${esc(p.url)}</button>`);
    b.addEventListener('click', () => { sfx.tap(); open(pid); });
    known.appendChild(b);
  });
  node.appendChild(known);

  open(startId);

  return { node, chrome: { visible: true, title: 'Red', sub: `${S.pages.length} direcciones conocidas` } };
}

/* =========================================================
   CÁMARAS
   ========================================================= */
const CAM_LABELS = {
  hall: 'SECTOR C · PASILLO',
  chairs: 'SECTOR C · SALA 2',
  monitors: 'SECTOR C · CONTROL',
  guard: 'SECTOR C · ACCESO'
};

export function cams() {
  setMood('tense');
  const all = ['hall', 'chairs', 'monitors', 'guard'];
  const node = h(`
    <div class="view">
      <div class="cams" id="cams"></div>
      <div class="pad">
        <div class="card">
          <h3>Registro</h3>
          <p class="bio mono" style="font-size:11.5px;line-height:1.9">
            SECTOR C · CICLO 4<br>
            SILLONES OCUPADOS: 4 / 4<br>
            PROTOCOLO: LAZO DORADO<br>
            CAMBIO DE TURNO: 04:40 (11 min. con dotación reducida)
          </p>
        </div>
      </div>
    </div>`);
  const grid = node.querySelector('#cams');

  all.forEach((c) => {
    if (!S.cams.includes(c)) {
      grid.appendChild(h('<div class="cam locked">SIN ACCESO</div>'));
      return;
    }
    const cell = h(`
      <div class="cam">
        ${camera(c)}
        <div class="cam-scan"></div>
        <span class="lbl">${CAM_LABELS[c]}</span>
        <span class="rec"></span>
      </div>`);
    cell.addEventListener('click', () => sfx.camera());
    grid.appendChild(cell);
  });

  return { node, chrome: { visible: true, title: 'Cámaras', sub: `${S.cams.length} de ${all.length} señales` } };
}

/* =========================================================
   FINALES
   ========================================================= */
export function endingView({ id }) {
  const e = ENDINGS[id];
  if (!e) return { node: h('<div class="empty">Final desconocido.</div>') };
  setMood(e.kind === 'good' ? 'resolve' : e.kind === 'bad' ? 'tense' : 'unease');

  const c = e.char && CHARS[e.char];
  const kindLabel = { good: 'Final feliz', bad: 'Final malo', neutral: 'Final neutro' }[e.kind];

  const node = h(`
    <div class="view ending">
      <div class="ending-kind ${e.kind}">${kindLabel} · ${e.num}</div>
      ${c ? `<div style="width:88px;height:88px;margin:0 auto;border-radius:24px;overflow:hidden;border:2px solid ${c.accent}">
        ${chibi(c, e.kind === 'good' ? 'happy' : e.kind === 'bad' ? 'sad' : 'neutral')}</div>` : ''}
      <div class="ending-title">${esc(e.title)}</div>
      <div class="ending-text">${fill(e.text)}</div>
      <div class="ending-epi">${fill(e.epilogue)}</div>
      <div class="stack" style="margin-top:8px">
        <button class="btn btn-primary btn-block" data-cont>Continuar</button>
        <button class="btn btn-ghost btn-block" data-all>Ver todos los finales</button>
      </div>
    </div>`);

  node.querySelector('[data-cont]').addEventListener('click', () => {
    sfx.tap();
    // Terminar una ruta libera al jugador para seguir otra.
    S.focusRoute = null;
    save();
    story.refresh();
    go('hub', {}, true);
    const good = Object.values(S.endings).filter((x) => x.kind === 'good').length;
    if (good === 2 && !S.secretUnlocked) {
      S.secretUnlocked = true; save();
      setTimeout(() => toast({
        title: 'La sala común está vacía',
        body: 'Algo ha cambiado en SUJOM.', kind: 'core', ms: 6000,
        onClick: () => go('list', { channel: 'system' })
      }), 1400);
    }
  });
  node.querySelector('[data-all]').addEventListener('click', () => { sfx.tap(); go('endings'); });

  return { node, chrome: { visible: true, title: e.title, sub: kindLabel, back: false } };
}

export function endingsList() {
  const node = h('<div class="view"><div class="end-grid" id="g"></div></div>');
  const g = node.querySelector('#g');
  let got = 0;

  ENDING_ORDER.forEach((eid) => {
    const e = ENDINGS[eid];
    const has = !!S.endings[eid];
    if (has) got++;
    const c = e.char && CHARS[e.char];
    const card = h(`
      <button class="end-card ${has ? 'got' : ''}">
        <div style="width:44px;height:44px;border-radius:14px;overflow:hidden;flex:0 0 auto;background:var(--bg-panel-2);${c ? `border:1.5px solid ${c.accent}` : ''}">
          ${has && c ? chibi(c, e.kind === 'good' ? 'happy' : 'sad') : '<div style="display:grid;place-items:center;height:100%;color:var(--ink-4)">?</div>'}
        </div>
        <div style="flex:1;min-width:0;text-align:left">
          <div class="num">${e.num} · ${c ? c.name : 'SUJOM'}</div>
          <div style="font-weight:650;font-size:14px">${has ? esc(e.title) : '— — — — —'}</div>
          <div style="font-size:11px;color:var(--ink-4)">${{ good: 'Final feliz', bad: 'Final malo', neutral: 'Final neutro' }[e.kind]}</div>
        </div>
      </button>`);
    if (has) card.addEventListener('click', () => { sfx.tap(); go('ending', { id: eid }); });
    g.appendChild(card);
  });

  return { node, chrome: { visible: true, title: 'Finales', sub: `${got} de ${ENDING_ORDER.length}` } };
}

/* =========================================================
   AJUSTES
   ========================================================= */
export function settingsView() {
  const node = h(`
    <div class="view">
      <div class="section-label">Tu perfil</div>
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
      </div>

      <div class="section-label">Sonido</div>
      <div id="s-sound"></div>

      <div class="section-label">Lectura</div>
      <div class="pad" style="padding-top:0">
        <div class="field" style="margin-top:0">
          <label>Velocidad de los mensajes</label>
          <div class="chips" id="s-speed">
            <button class="chip" data-v="slow">Lenta</button>
            <button class="chip" data-v="normal">Normal</button>
            <button class="chip" data-v="fast">Rápida</button>
            <button class="chip" data-v="instant">Instantánea</button>
          </div>
          <div class="hint">SUJOM está pensado para leerse a velocidad normal: los silencios forman parte de la conversación.</div>
        </div>
      </div>

      <div class="section-label">Accesibilidad</div>
      <div id="s-a11y"></div>

      <div class="section-label">Partida</div>
      <div class="pad">
        <div class="card">
          <h3>Progreso</h3>
          <p class="bio mono" style="font-size:12px;line-height:1.9">
            Día ${S.day}<br>
            Conversaciones: ${S.completed.length}<br>
            Decisiones tomadas: ${S.stats.choices}<br>
            Imágenes: ${S.photos.length} · Notas: ${S.notes.length}<br>
            Pruebas: ${S.evidence.length} · Finales: ${Object.keys(S.endings).length}
          </p>
        </div>
        <button class="btn btn-block" style="margin-top:12px" data-title>Volver a la portada</button>
        <button class="btn btn-ghost btn-block" style="margin-top:8px;color:var(--danger)" data-reset>Borrar partida</button>
      </div>

      <div class="pad center" style="padding-top:0">
        <p class="mono dim" style="font-size:10px;line-height:1.8">
          SUJOM by ASSIST · v1.0.4<br>
          Los personajes de SUJOM son ficticios.
        </p>
      </div>
    </div>`);

  /* nombre */
  const nameIn = node.querySelector('#s-name');
  nameIn.addEventListener('change', () => {
    const v = nameIn.value.trim();
    if (v) { setPlayer({ name: v }); toast({ title: 'Nombre actualizado', ms: 2000 }); }
  });

  /* pronombres */
  const pchips = node.querySelectorAll('#s-pron .chip');
  const paintP = () => pchips.forEach((c) => c.classList.toggle('on', c.dataset.p === S.player.pronounKey));
  pchips.forEach((c) => c.onclick = () => { setPlayer({ pronounKey: c.dataset.p }); sfx.tap(); paintP(); });
  paintP();

  /* velocidad */
  const schips = node.querySelectorAll('#s-speed .chip');
  const paintS = () => schips.forEach((c) => c.classList.toggle('on', c.dataset.v === settings.textSpeed));
  schips.forEach((c) => c.onclick = () => { updateSettings({ textSpeed: c.dataset.v }); sfx.tap(); paintS(); });
  paintS();

  /* interruptores */
  const toggle = (host, key, title, desc, after) => {
    const row = h(`
      <div class="setting">
        <div class="setting-l"><div class="setting-t">${title}</div><div class="setting-d">${desc}</div></div>
        <button class="switch ${settings[key] ? 'on' : ''}"></button>
      </div>`);
    const sw = row.querySelector('.switch');
    sw.addEventListener('click', () => {
      updateSettings({ [key]: !settings[key] });
      sw.classList.toggle('on', settings[key]);
      sfx.tap();
      after?.();
    });
    host.appendChild(row);
  };

  const sound = node.querySelector('#s-sound');
  toggle(sound, 'music', 'Música', 'Ambiente que cambia con la historia.', () => setPrefs(settings));
  toggle(sound, 'sfx', 'Efectos', 'Mensajes, notificaciones, interferencias.', () => setPrefs(settings));

  const a11y = node.querySelector('#s-a11y');
  toggle(a11y, 'reduceGlitch', 'Reducir efectos visuales', 'Menos parpadeos, sacudidas y distorsión. La historia no cambia.', () => {
    document.body.classList.remove('g1', 'g2', 'g3', 'g4');
    const lv = settings.reduceGlitch ? Math.min(1, S.glitch) : S.glitch;
    if (lv > 0) document.body.classList.add('g' + lv);
  });

  node.querySelector('[data-title]').addEventListener('click', () => { sfx.back(); go('title', {}, true); });

  node.querySelector('[data-reset]').addEventListener('click', async () => {
    const ok = await confirmBox({
      title: '¿Borrar la partida?',
      body: 'Se pierde todo: tu nombre, tus conversaciones, tus fotos y los finales conseguidos. No se puede deshacer.',
      ok: 'Borrar todo', cancel: 'No', danger: true
    });
    if (ok) { reset(); go('title', {}, true); }
  });

  return { node, chrome: { visible: true, title: 'Ajustes', sub: '' } };
}
