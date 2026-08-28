/* =========================================================
   story.js — Registro narrativo y línea temporal.
   ---------------------------------------------------------
   CÓDIGO define cómo funciona el juego.
   DATOS definen qué pasa.
   Este módulo es la bisagra: recoge las sesiones declaradas
   en /data, decide cuáles están disponibles y en qué orden
   llegan las notificaciones.
   ========================================================= */

import { S, bus, makeAvailable, isDone, isAvailable, setClock, save } from './state.js';
import { meets, lockHint } from './conditions.js';

const registry = new Map();
const order = [];

/** Registra un lote de sesiones. Se puede llamar varias veces. */
export function register(sessions) {
  for (const s of sessions) {
    if (!s || !s.id) { console.warn('[story] sesión sin id', s); continue; }
    if (registry.has(s.id)) { console.warn('[story] id duplicado:', s.id); continue; }
    registry.set(s.id, s);
    order.push(s.id);
  }
}

export function get(id) { return registry.get(id); }
export function all() { return order.map((id) => registry.get(id)); }

export function byChannel(channel) {
  return all().filter((s) => s.channel === channel);
}

/* ---------------------------------------------------------
   Disponibilidad
   --------------------------------------------------------- */

/**
 * Recalcula qué sesiones están disponibles.
 * Devuelve las que acaban de abrirse (para notificar).
 */
export function refresh() {
  const opened = [];
  for (const id of order) {
    if (isDone(id) || isAvailable(id)) continue;
    const s = registry.get(id);
    if (!s || s.manual) continue;      // `manual` = sólo se abre por guion
    if (meets(s.requires)) {
      makeAvailable(id);
      opened.push(s);
    }
  }
  if (opened.length) bus.emit('story:opened', opened);
  return opened;
}

/** Abre una sesión ignorando sus requisitos (la usa el guion con `open:`). */
export function forceOpen(id) {
  const s = registry.get(id);
  if (!s || isDone(id)) return null;
  if (makeAvailable(id)) { bus.emit('story:opened', [s]); return s; }
  return null;
}

/* ---------------------------------------------------------
   Consultas para la interfaz
   --------------------------------------------------------- */

/** Sesiones disponibles ordenadas por su hora ficticia. */
export function pending() {
  return S.available
    .map((id) => registry.get(id))
    .filter(Boolean)
    .sort((a, b) => (a.day - b.day) || (toMin(a.time) - toMin(b.time)));
}

export function pendingFor(channel) {
  return pending().filter((s) => s.channel === channel);
}

export function unreadCount(channel) {
  return channel ? pendingFor(channel).length : pending().length;
}

/**
 * Lista completa de un canal para la vista de conversaciones:
 * completadas (rejugables), disponibles y las siguientes bloqueadas
 * (mostradas atenuadas, con una pista).
 */
export function channelList(channel, names) {
  const out = [];
  for (const id of order) {
    const s = registry.get(id);
    if (!s || s.channel !== channel || s.hidden) continue;
    if (isDone(id)) out.push({ s, state: 'done' });
    else if (isAvailable(id)) out.push({ s, state: 'new' });
    else if (!s.manual && !s.secret) out.push({ s, state: 'locked', hint: lockHint(s.requires, names) });
  }
  // Las nuevas arriba, luego bloqueadas, luego el historial invertido.
  const nw = out.filter((o) => o.state === 'new');
  const dn = out.filter((o) => o.state === 'done').reverse();

  // De lo bloqueado sólo se enseña lo siguiente de cada personaje: tres filas
  // seguidas del mismo nombre no dicen nada y ensucian la lista.
  const seen = new Set();
  const lk = out.filter((o) => {
    if (o.state !== 'locked') return false;
    const key = o.s.char || o.s.channel;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 4);

  return { nw, lk, dn };
}

/* ---------------------------------------------------------
   Reloj
   --------------------------------------------------------- */
export function toMin(t) {
  if (!t) return 0;
  const [h, m] = String(t).split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

/** Al abrir una sesión, el reloj de la simulación salta a su hora. */
export function syncClock(session) {
  if (!session) return;
  const d = session.day ?? S.day;
  const t = session.time || null;
  if (d > S.day || (d === S.day && toMin(t) >= S.minutes)) {
    setClock(d, t);
  }
}

/** Texto relativo para la lista ("Hoy 18:45", "Día 3 · 09:20"). */
export function stamp(session) {
  if (!session) return '';
  if (session.day === S.day) return session.time || '';
  if (session.day === S.day - 1) return `Ayer ${session.time || ''}`.trim();
  return `D${session.day} ${session.time || ''}`.trim();
}

/* ---------------------------------------------------------
   Progreso de ruta (para la ficha de personaje)
   --------------------------------------------------------- */
export function routeProgress(cid) {
  const total = all().filter((s) => s.char === cid && s.channel === 'dm' && !s.secret).length;
  if (!total) return { done: 0, total: 0, pct: 0 };
  const done = all().filter((s) => s.char === cid && s.channel === 'dm' && !s.secret && isDone(s.id)).length;
  return { done, total, pct: Math.round((done / total) * 100) };
}

/** Fase narrativa actual, derivada del contenido jugado. */
export function phase() {
  const played = S.completed.map((id) => registry.get(id)).filter(Boolean);
  return played.reduce((mx, s) => Math.max(mx, s.phase || 1), 1);
}

/* ---------------------------------------------------------
   Estado de depuración (útil al añadir contenido nuevo)
   --------------------------------------------------------- */
export function audit() {
  const problems = [];
  for (const s of all()) {
    if (!s.channel) problems.push(`${s.id}: sin canal`);
    if (!s.script || !s.script.length) problems.push(`${s.id}: guion vacío`);
    for (const dep of [].concat(s.requires?.done || [])) {
      if (!registry.has(dep)) problems.push(`${s.id}: depende de "${dep}" que no existe`);
    }
  }
  return problems;
}

export function stats() {
  return { total: registry.size, done: S.completed.length, available: S.available.length };
}
