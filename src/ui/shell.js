/* =========================================================
   shell.js — El armazón de la aplicación.
   ---------------------------------------------------------
   Navegación, cabecera, barra inferior, avisos emergentes,
   modal y — lo más importante — el sistema de FASES.

   La fase la marca el avance de la historia y se escribe en
   <body data-phase>. Toda la hoja de estilo cuelga de ahí,
   así que la aplicación se va apagando sola conforme la
   trama avanza. No hay un "modo terror": es la misma app,
   enfermando.
   ========================================================= */

import { S, settings, bus, clockText, fill } from '../engine/state.js';
import { avatar } from '../engine/portraits.js';
import { CHARS } from '../../data/characters.js';
import { sfx, unlock as unlockAudio } from '../engine/audio.js';
import { icon } from '../engine/art.js';

const $ = (s) => document.querySelector(s);
const el = {};

const screens = new Map();
let stack = [];
let current = null;
let onLeave = null;

/* --------- barra inferior --------- */
const TABS = [
  { id: 'home', label: 'Inicio', ico: 'home', screen: 'home' },
  { id: 'msg', label: 'Mensajes', ico: 'chat', screen: 'inbox' },
  { id: 'ppl', label: 'Contactos', ico: 'people', screen: 'contacts' },
  { id: 'alb', label: 'Álbum', ico: 'gallery', screen: 'album' },
  { id: 'web', label: 'Red', ico: 'globe', screen: 'browser', needs: () => S.pages.length > 0 }
];

export function initShell() {
  el.device = $('#device');
  el.appbar = $('#appbar');
  el.screen = $('#screen');
  el.back = $('#btn-back');
  el.name = $('#ab-name');
  el.sub = $('#ab-sub');
  el.right = $('#ab-right');
  el.tabbar = $('#tabbar');
  el.toasts = $('#toasts');
  el.modal = $('#modal');
  el.modalBody = $('#modal-body');

  el.back.addEventListener('click', () => { sfx.back(); back(); });

  el.modal.addEventListener('click', (e) => {
    if (e.target.dataset.close !== undefined) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (!el.modal.hidden) closeModal(); else if (stack.length) back(); }
  });

  const kick = () => { unlockAudio(); document.removeEventListener('pointerdown', kick); };
  document.addEventListener('pointerdown', kick);

  bus.on('glitch', applyPhase);
  bus.on('completed', applyPhase);
  applyPhase();
  buildTabs();
}

/* =========================================================
   FASES — la interfaz envejece con la historia
   ========================================================= */
export function applyPhase() {
  // La corrupción narrativa (0-4) manda; si el jugador ha pedido menos
  // efectos, se limita a 2 para que la historia siga leyéndose igual.
  let ph = 1;
  if (S.glitch >= 3) ph = 4;
  else if (S.glitch === 2) ph = 3;
  else if (S.glitch === 1) ph = 2;
  if (settings.reduceGlitch) ph = Math.min(ph, 2);
  document.body.dataset.phase = String(ph);
}

/* =========================================================
   NAVEGACIÓN
   ========================================================= */
export function register(name, factory) { screens.set(name, factory); }

/**
 * @param {string} name    pantalla registrada
 * @param {object} params
 * @param {object} opts    { replace, anim: 'push'|'fade'|'up' }
 */
export function go(name, params = {}, opts = {}) {
  const factory = screens.get(name);
  if (!factory) { console.error('[shell] pantalla desconocida:', name); return; }

  if (onLeave) { try { onLeave(); } catch (e) { /* limpieza best-effort */ } onLeave = null; }

  const replace = opts.replace === true;
  if (current && !replace) stack.push(current);
  if (replace) stack = [];
  current = { name, params };

  el.screen.innerHTML = '';
  el.screen.scrollTop = 0;

  const out = factory(params) || {};
  const node = out.node || out;
  onLeave = out.leave || null;

  if (node instanceof Node) {
    node.classList.add('view', 'in-' + (opts.anim || out.anim || 'push'));
    el.screen.appendChild(node);
  }

  chrome(out.chrome || {});
  paintTabs(out.tab ?? name);
}

export function back() {
  if (!stack.length) { go('home', {}, { replace: true, anim: 'fade' }); return; }
  const prev = stack.pop();
  const keep = stack.slice();
  current = null;
  go(prev.name, prev.params, { replace: true, anim: 'fade' });
  stack = keep;
  el.back.hidden = stack.length === 0;
}

export function refreshCurrent() {
  if (!current) return;
  const keep = stack.slice();
  const cur = current;
  current = null;
  go(cur.name, cur.params, { replace: true, anim: 'fade' });
  stack = keep;
  el.back.hidden = stack.length === 0;
}

export function currentScreen() { return current?.name; }

/* --------- cabecera --------- */
function chrome(c) {
  const visible = c.visible !== false;
  el.appbar.hidden = !visible;
  el.appbar.classList.toggle('hero', !!c.hero);
  if (c.accentWash) el.appbar.style.setProperty('--accent-wash', c.accentWash);
  else el.appbar.style.removeProperty('--accent-wash');

  el.name.textContent = fill(c.title || 'ASSIST');
  el.sub.textContent = fill(c.sub || '');
  el.sub.hidden = !c.sub;
  el.sub.className = 'ab-sub' + (c.online ? ' online' : '');
  el.back.hidden = c.back === false || stack.length === 0;

  // Acciones a la derecha (campana, ajustes, lo que pida la pantalla)
  el.right.innerHTML = '';
  const actions = c.actions || defaultActions();
  actions.forEach((a) => {
    if (a.type === 'clock') {
      el.right.appendChild(clockChip());
      return;
    }
    const b = h(`<button class="ab-icon" aria-label="${a.label}">${icon(a.ico)}${a.n ? `<span class="n">${a.n}</span>` : ''}</button>`);
    b.addEventListener('click', () => { sfx.tap(); a.on(); });
    el.right.appendChild(b);
  });
}

function defaultActions() {
  return [
    { ico: 'bell', label: 'Notificaciones', n: 0, on: () => go('notifications') },
    { ico: 'gear', label: 'Ajustes', on: () => go('settings') }
  ];
}

function clockChip() {
  const wrong = S.glitch >= 3 && Math.random() < 0.2;
  const node = h(`<div class="clock ${wrong ? 'glitched' : ''}"><b>D${S.day}</b><span>${wrong ? '88:88' : clockText()}</span></div>`);
  if (wrong) setTimeout(() => { node.classList.remove('glitched'); node.lastElementChild.textContent = clockText(); }, 1700);
  return node;
}

/* =========================================================
   BARRA INFERIOR
   ========================================================= */
function buildTabs() {
  el.tabbar.innerHTML = '';
  TABS.forEach((t) => {
    const b = h(`<button class="tab" data-tab="${t.id}">${icon(t.ico)}<span class="t">${t.label}</span></button>`);
    b.addEventListener('click', () => {
      if (t.needs && !t.needs()) { sfx.error(); return; }
      sfx.tap();
      go(t.screen, {}, { replace: true, anim: 'fade' });
    });
    el.tabbar.appendChild(b);
  });
}

/** Marca la pestaña activa y refresca los contadores. */
export function paintTabs(screenName) {
  // Pantallas que ocultan la barra: son "modos" a pantalla completa.
  const hidden = ['boot', 'onboarding', 'chat', 'ending', 'call'];
  el.tabbar.hidden = hidden.includes(screenName);
  if (el.tabbar.hidden) return;

  const counts = tabCounts();
  el.tabbar.querySelectorAll('.tab').forEach((b) => {
    const t = TABS.find((x) => x.id === b.dataset.tab);
    const active = t && (t.screen === screenName ||
      (t.id === 'msg' && ['inbox', 'chat'].includes(screenName)) ||
      (t.id === 'ppl' && ['contacts', 'profile'].includes(screenName)) ||
      (t.id === 'alb' && ['album', 'photo'].includes(screenName)));
    b.classList.toggle('on', !!active);
    b.querySelector('.n')?.remove();
    const n = counts[t?.id] || 0;
    if (n) b.insertAdjacentHTML('beforeend', `<span class="n">${n}</span>`);
    if (t?.needs && !t.needs()) b.style.opacity = '.35'; else b.style.opacity = '';
  });
}

let countProvider = () => ({});
export function setTabCounts(fn) { countProvider = fn; }
function tabCounts() { try { return countProvider() || {}; } catch (e) { return {}; } }

/* =========================================================
   AVISOS EMERGENTES
   ========================================================= */
export function toast({ char, title, body, kind = '', ms = 4600, onClick }) {
  const node = document.createElement('div');
  node.className = 'toast ' + kind;
  const c = CHARS[char];
  node.style.setProperty('--accent', c ? c.accent : 'var(--pink)');
  node.innerHTML = `
    <div class="toast-av">${c ? avatar(char, S.chars[char]?.mood || 'happy') : (kind === 'core' ? 'CORE' : icon('bell'))}</div>
    <div class="toast-txt">
      <div class="toast-t">${fill(title)}</div>
      ${body ? `<div class="toast-b">${fill(body)}</div>` : ''}
    </div>`;
  if (onClick) node.addEventListener('click', () => { dismiss(); onClick(); });
  el.toasts.appendChild(node);
  if (kind === 'core') sfx.glitch(); else sfx.notify();

  const t = setTimeout(dismiss, ms);
  function dismiss() {
    clearTimeout(t);
    node.classList.add('out');
    setTimeout(() => node.remove(), 320);
  }
  return dismiss;
}

/* =========================================================
   MODAL
   ========================================================= */
export function modal(html) {
  el.modalBody.innerHTML = '';
  if (html instanceof Node) el.modalBody.appendChild(html);
  else el.modalBody.innerHTML = html;
  el.modal.hidden = false;
  return el.modalBody;
}
export function closeModal() { el.modal.hidden = true; el.modalBody.innerHTML = ''; }

export function confirmBox({ title, body, ok = 'Aceptar', cancel = 'Cancelar', danger }) {
  return new Promise((resolve) => {
    const b = modal(`
      <div class="h2">${title}</div>
      <p class="muted" style="margin:10px 0 20px">${body}</p>
      <div class="stack">
        <button class="btn ${danger ? '' : 'btn-primary'} btn-block" data-yes>${ok}</button>
        <button class="btn btn-ghost btn-block" data-no>${cancel}</button>
      </div>`);
    b.querySelector('[data-yes]').onclick = () => { closeModal(); resolve(true); };
    b.querySelector('[data-no]').onclick = () => { closeModal(); resolve(false); };
  });
}

/* =========================================================
   EFECTOS
   ========================================================= */
export function shake() {
  if (settings.reduceGlitch) return;
  el.device.classList.remove('shake');
  void el.device.offsetWidth;
  el.device.classList.add('shake');
  sfx.glitch();
  setTimeout(() => el.device.classList.remove('shake'), 520);
}

export function flash() {
  if (settings.reduceGlitch) return;
  el.device.classList.remove('flashing');
  void el.device.offsetWidth;
  el.device.classList.add('flashing');
  setTimeout(() => el.device.classList.remove('flashing'), 620);
}

export function scrollBottom(smooth = true) {
  el.screen.scrollTo({ top: el.screen.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
}

export function deviceEl() { return el.device; }

/* Construye un nodo a partir de HTML. */
export function h(html) {
  const d = document.createElement('div');
  d.innerHTML = html.trim();
  return d.children.length === 1 ? d.firstElementChild : d;
}

export function esc(s) {
  return String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
