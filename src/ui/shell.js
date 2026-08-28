/* =========================================================
   shell.js — Marco de la aplicación.
   ---------------------------------------------------------
   Navegación, barra superior, notificaciones emergentes,
   ventana modal y capa de corrupción. Las pantallas sólo
   tienen que devolver un elemento; de todo lo demás se
   encarga esto.
   ========================================================= */

import { S, settings, bus, clockText, fill } from '../engine/state.js';
import { chibi, icon } from '../engine/art.js';
import { CHARS } from '../../data/characters.js';
import { sfx, unlock as unlockAudio } from '../engine/audio.js';

const $ = (s) => document.querySelector(s);

const el = {
  device: null, appbar: null, screen: null, back: null,
  title: null, sub: null, clock: null, clockDay: null, clockTime: null,
  toasts: null, modal: null, modalBody: null, settingsBtn: null
};

const screens = new Map();
let stack = [];
let current = null;
let onLeave = null;

export function initShell() {
  el.device = $('#device');
  el.appbar = $('#appbar');
  el.screen = $('#screen');
  el.back = $('#btn-back');
  el.title = $('#appbar-title');
  el.sub = $('#appbar-sub');
  el.clock = $('#clock');
  el.clockDay = $('#clock-day');
  el.clockTime = $('#clock-time');
  el.toasts = $('#toasts');
  el.modal = $('#modal');
  el.modalBody = $('#modal-body');
  el.settingsBtn = $('#btn-settings');

  el.back.addEventListener('click', () => { sfx.back(); back(); });
  el.settingsBtn.addEventListener('click', () => { sfx.tap(); go('settings'); });

  el.modal.addEventListener('click', (e) => {
    if (e.target.dataset.close !== undefined) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (!el.modal.hidden) closeModal(); else if (stack.length) back(); }
  });

  // El audio necesita un gesto del usuario antes de sonar.
  const kick = () => { unlockAudio(); document.removeEventListener('pointerdown', kick); };
  document.addEventListener('pointerdown', kick);

  bus.on('clock', updateClock);
  bus.on('glitch', applyGlitchClass);
  applyGlitchClass(S.glitch);
  updateClock();
}

/* ---------------------------------------------------------
   Registro y navegación
   --------------------------------------------------------- */
export function register(name, factory) { screens.set(name, factory); }

/**
 * @param {string} name
 * @param {object} params
 * @param {boolean} replace  no apila (para pantallas raíz)
 */
export function go(name, params = {}, replace = false) {
  const factory = screens.get(name);
  if (!factory) { console.error('[shell] pantalla desconocida:', name); return; }

  if (onLeave) { try { onLeave(); } catch (e) { /* limpieza best-effort */ } onLeave = null; }

  if (current && !replace) stack.push(current);
  if (replace) stack = [];
  current = { name, params };

  el.screen.innerHTML = '';
  el.screen.scrollTop = 0;

  const out = factory(params) || {};
  const node = out.node || out;
  onLeave = out.leave || null;

  if (node instanceof Node) el.screen.appendChild(node);

  setChrome(out.chrome ?? {
    visible: name !== 'title' && name !== 'onboarding',
    title: 'SUJOM',
    sub: ''
  });
  updateClock();
}

export function back() {
  if (!stack.length) { go('hub', {}, true); return; }
  const prev = stack.pop();
  const keep = stack.slice();
  current = null;
  go(prev.name, prev.params, true);
  stack = keep;
  setBackVisible(stack.length > 0 || prev.name !== 'hub');
}

export function refreshCurrent() {
  if (!current) return;
  const keep = stack.slice();
  const cur = current;
  current = null;
  go(cur.name, cur.params, true);
  stack = keep;
  setBackVisible(stack.length > 0);
}

export function currentScreen() { return current?.name; }

function setChrome({ visible = true, title = 'SUJOM', sub = '', back: showBack = true }) {
  el.appbar.hidden = !visible;
  el.title.textContent = fill(title);
  el.sub.textContent = fill(sub);
  el.sub.hidden = !sub;
  setBackVisible(showBack && stack.length > 0);
}

function setBackVisible(v) { el.back.hidden = !v; }

/* ---------------------------------------------------------
   Reloj
   --------------------------------------------------------- */
function updateClock() {
  if (!el.clockTime) return;
  el.clockDay.textContent = 'D' + S.day;
  // A partir del nivel 3 de corrupción el reloj miente de vez en cuando.
  if (S.glitch >= 3 && Math.random() < 0.18) {
    el.clock.classList.add('is-wrong');
    el.clockTime.textContent = ['88:88', '--:--', '00:00', clockText()][Math.floor(Math.random() * 4)];
    setTimeout(() => {
      el.clock.classList.remove('is-wrong');
      el.clockTime.textContent = clockText();
    }, 1600);
  } else {
    el.clock.classList.remove('is-wrong');
    el.clockTime.textContent = clockText();
  }
}

/* ---------------------------------------------------------
   Notificaciones emergentes
   --------------------------------------------------------- */
export function toast({ char, title, body, kind = '', ms = 4200, onClick }) {
  const node = document.createElement('div');
  node.className = 'toast ' + kind;
  const spec = CHARS[char];
  node.innerHTML = `
    <div class="toast-av">${spec ? chibi(spec, S.chars[char]?.mood || 'neutral', { glitch: S.glitch >= 3 ? S.glitch : 0 }) : (kind === 'core' ? 'CORE' : icon('bell'))}</div>
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

/* ---------------------------------------------------------
   Modal
   --------------------------------------------------------- */
export function modal(html, opts = {}) {
  el.modalBody.innerHTML = '';
  if (html instanceof Node) el.modalBody.appendChild(html);
  else el.modalBody.innerHTML = html;
  el.modal.hidden = false;
  if (opts.onOpen) opts.onOpen(el.modalBody);
  return el.modalBody;
}

export function closeModal() { el.modal.hidden = true; el.modalBody.innerHTML = ''; }

export function confirmBox({ title, body, ok = 'Aceptar', cancel = 'Cancelar', danger }) {
  return new Promise((resolve) => {
    const b = modal(`
      <div class="h2">${title}</div>
      <p class="muted" style="margin:8px 0 18px;line-height:1.6">${body}</p>
      <div class="stack">
        <button class="btn ${danger ? '' : 'btn-primary'} btn-block" data-yes>${ok}</button>
        <button class="btn btn-ghost btn-block" data-no>${cancel}</button>
      </div>`);
    b.querySelector('[data-yes]').onclick = () => { closeModal(); resolve(true); };
    b.querySelector('[data-no]').onclick = () => { closeModal(); resolve(false); };
  });
}

/* ---------------------------------------------------------
   Efectos
   --------------------------------------------------------- */
function applyGlitchClass(level) {
  const b = document.body;
  b.classList.remove('g1', 'g2', 'g3', 'g4');
  const lv = settings.reduceGlitch ? Math.min(1, level) : level;
  if (lv > 0) b.classList.add('g' + lv);
}

export function shake() {
  if (settings.reduceGlitch) return;
  el.device.classList.remove('shake');
  void el.device.offsetWidth;
  el.device.classList.add('shake');
  sfx.glitch();
  setTimeout(() => el.device.classList.remove('shake'), 500);
}

export function flash() {
  if (settings.reduceGlitch) return;
  el.device.classList.remove('flashbang');
  void el.device.offsetWidth;
  el.device.classList.add('flashbang');
  setTimeout(() => el.device.classList.remove('flashbang'), 600);
}

export function scrollBottom(smooth = true) {
  el.screen.scrollTo({ top: el.screen.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
}

export function screenEl() { return el.screen; }

/* Utilidad compartida: construye nodos desde HTML */
export function h(html) {
  const d = document.createElement('div');
  d.innerHTML = html.trim();
  return d.children.length === 1 ? d.firstElementChild : d;
}
