/* =========================================================
   state.js — Estado del juego, guardado y eventos.
   ---------------------------------------------------------
   Todo lo que el jugador consigue vive aquí. Los módulos de
   UI nunca escriben en el estado directamente: usan estas
   funciones para que el guardado y los eventos se disparen
   siempre.
   ========================================================= */

const KEY = 'sujom.save.v1';
const SETTINGS_KEY = 'sujom.settings.v1';
export const SAVE_VERSION = 1;

/* ---------------------------------------------------------
   Bus de eventos mínimo
   --------------------------------------------------------- */
const listeners = new Map();
export const bus = {
  on(ev, fn) {
    if (!listeners.has(ev)) listeners.set(ev, new Set());
    listeners.get(ev).add(fn);
    return () => listeners.get(ev)?.delete(fn);
  },
  emit(ev, data) {
    listeners.get(ev)?.forEach((fn) => {
      try { fn(data); } catch (e) { console.error('[bus]', ev, e); }
    });
  }
};

/* ---------------------------------------------------------
   Estado inicial
   --------------------------------------------------------- */
export const CHAR_IDS = ['ryu', 'kenta', 'lara', 'reiko'];

function blankChar() {
  return {
    affinity: 0,      // cercanía general (visible como corazones)
    trust: 0,         // confianza — abre confesiones
    romance: 0,       // interés romántico — abre la ruta
    awareness: 0,     // cuánto sospecha el personaje de su propia realidad (oculto)
    suspicion: 0,     // cuánto sospecha ASSIST-CORE del jugador (oculto)
    dependence: 0,    // dependencia emocional (oculto)
    awakening: 0,     // progreso de despertar 0-100 (oculto)
    mood: 'neutral',  // expresión actual en el hub
    route: null,      // null | 'active' | 'ended'
    profileBits: [],  // ids de datos de ficha desbloqueados
    lastSeen: null
  };
}

function freshState() {
  const chars = {};
  CHAR_IDS.forEach((id) => { chars[id] = blankChar(); });
  return {
    v: SAVE_VERSION,
    createdAt: Date.now(),
    player: { name: '', pronouns: 'elle/le', pronounKey: 'neutral', color: '#f0c674', onboarded: false },
    day: 1,
    minutes: 8 * 60,       // reloj ficticio, en minutos desde medianoche
    chars,
    flags: {},
    completed: [],
    available: [],         // sesiones desbloqueadas y sin jugar
    photos: [],
    photosCorrupt: [],
    photosInspected: [],
    notes: [],
    notesRevised: [],
    pages: [],             // páginas del navegador descubiertas
    evidence: [],
    cams: [],
    endings: {},
    calls: [],
    glitch: 0,
    focusRoute: null,      // personaje cuya ruta se está siguiendo
    secretUnlocked: false,
    stats: { choices: 0, sessions: 0 }
  };
}

export let S = freshState();

/* Ajustes: viven aparte del guardado para sobrevivir a un borrado de partida */
export let settings = {
  sfx: true,
  music: true,
  textSpeed: 'normal',   // slow | normal | fast | instant
  reduceGlitch: false,
  skipRead: false
};

/* ---------------------------------------------------------
   Persistencia
   --------------------------------------------------------- */
let saveTimer = null;

export function save(immediate = false) {
  const write = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(S));
    } catch (e) {
      console.warn('[save] no se pudo guardar', e);
    }
  };
  if (immediate) { clearTimeout(saveTimer); write(); return; }
  clearTimeout(saveTimer);
  saveTimer = setTimeout(write, 220);
}

export function saveSettings() {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) { /* modo privado */ }
}

export function hasSave() {
  try { return !!localStorage.getItem(KEY); } catch (e) { return false; }
}

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data || data.v !== SAVE_VERSION) return false;
    // Fusión defensiva: si una versión futura añade campos, no se pierden.
    S = Object.assign(freshState(), data);
    CHAR_IDS.forEach((id) => { S.chars[id] = Object.assign(blankChar(), S.chars[id] || {}); });
    return true;
  } catch (e) {
    console.warn('[load] guardado corrupto', e);
    return false;
  }
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) Object.assign(settings, JSON.parse(raw));
  } catch (e) { /* ignorar */ }
  return settings;
}

export function updateSettings(patch) {
  Object.assign(settings, patch);
  saveSettings();
  bus.emit('settings', settings);
}

export function reset() {
  S = freshState();
  try { localStorage.removeItem(KEY); } catch (e) { /* ignorar */ }
  bus.emit('reset');
}

/* ---------------------------------------------------------
   Jugador
   --------------------------------------------------------- */
const PRONOUNS = {
  she: { key: 'she', label: 'ella/la', subj: 'ella', adj: 'a', adjPl: 'as', art: 'la', dear: 'querida' },
  he: { key: 'he', label: 'él/lo', subj: 'él', adj: 'o', adjPl: 'os', art: 'el', dear: 'querido' },
  neutral: { key: 'neutral', label: 'elle/le', subj: 'elle', adj: 'e', adjPl: 'es', art: 'le', dear: 'queride' }
};

export function pron() { return PRONOUNS[S.player.pronounKey] || PRONOUNS.neutral; }

/**
 * Sustituye marcadores en el texto narrativo.
 *   {name}  → nombre del jugador
 *   {a}     → vocal de género (o/a/e)
 *   {as}    → plural de la vocal
 *   {they}  → pronombre sujeto
 *   {dear}  → querido/querida/queride
 */
export function fill(text) {
  if (typeof text !== 'string') return text;
  const p = pron();
  return text
    .replace(/\{name\}/g, S.player.name || 'tú')
    .replace(/\{a\}/g, p.adj)
    .replace(/\{as\}/g, p.adjPl)
    .replace(/\{they\}/g, p.subj)
    .replace(/\{art\}/g, p.art)
    .replace(/\{dear\}/g, p.dear);
}

export function setPlayer(patch) {
  Object.assign(S.player, patch);
  if (patch.pronounKey) S.player.pronouns = PRONOUNS[patch.pronounKey].label;
  save();
  bus.emit('player', S.player);
}

/* ---------------------------------------------------------
   Relación
   --------------------------------------------------------- */
const CLAMP = { affinity: [0, 100], trust: [0, 100], romance: [0, 100], awareness: [0, 100], suspicion: [0, 100], dependence: [0, 100], awakening: [0, 100] };

export function applyFx(fx) {
  if (!fx) return [];
  const changes = [];
  for (const [cid, delta] of Object.entries(fx)) {
    const c = S.chars[cid];
    if (!c) continue;
    for (const [k, v] of Object.entries(delta)) {
      if (k === 'mood') { c.mood = v; continue; }
      if (!(k in c)) continue;
      const before = c[k];
      const range = CLAMP[k] || [0, 100];
      c[k] = Math.max(range[0], Math.min(range[1], before + v));
      if (c[k] !== before) changes.push({ char: cid, stat: k, delta: c[k] - before, value: c[k] });
    }
  }
  if (changes.length) { save(); bus.emit('relationship', changes); }
  return changes;
}

/** Nivel de vínculo 0-5, derivado de afinidad + confianza + romance. */
export function bondLevel(cid) {
  const c = S.chars[cid];
  if (!c) return 0;
  const score = c.affinity * 0.5 + c.trust * 0.25 + c.romance * 0.25;
  return Math.max(0, Math.min(5, Math.floor(score / 17)));
}

export function bondPct(cid) {
  const c = S.chars[cid];
  if (!c) return 0;
  return Math.min(100, Math.round(c.affinity * 0.5 + c.trust * 0.25 + c.romance * 0.25));
}

export const BOND_NAMES = [
  'Desconocid{a}s',
  'Conocid{a}s',
  'Amig{a}s',
  'Cercan{a}s',
  'Algo más',
  'Lazo'
];

/* ---------------------------------------------------------
   Banderas y colecciones
   --------------------------------------------------------- */
export function setFlag(name, value = true) {
  if (S.flags[name] === value) return;
  S.flags[name] = value;
  save();
  bus.emit('flag', { name, value });
}

export function flag(name) { return !!S.flags[name]; }

function addTo(list, id, event) {
  if (!id || S[list].includes(id)) return false;
  S[list].push(id);
  save();
  bus.emit(event || list, id);
  return true;
}

export const unlockPhoto = (id) => addTo('photos', id, 'photo');
export const corruptPhoto = (id) => addTo('photosCorrupt', id, 'photoCorrupt');
export const markInspected = (id) => addTo('photosInspected', id, 'photoInspected');
export const unlockNote = (id) => addTo('notes', id, 'note');
export const reviseNote = (id) => addTo('notesRevised', id, 'noteRevised');
export const unlockPage = (id) => addTo('pages', id, 'page');
export const unlockCam = (id) => addTo('cams', id, 'cam');
export const addEvidence = (id) => addTo('evidence', id, 'evidence');
export const markCall = (id) => addTo('calls', id, 'call');

export function unlockProfileBit(cid, bit) {
  const c = S.chars[cid];
  if (!c || c.profileBits.includes(bit)) return false;
  c.profileBits.push(bit);
  save();
  bus.emit('profileBit', { char: cid, bit });
  return true;
}

export function recordEnding(id, char, kind) {
  if (S.endings[id]) return false;
  S.endings[id] = { char, kind, at: Date.now(), day: S.day };
  if (char && S.chars[char]) S.chars[char].route = 'ended';
  save(true);
  bus.emit('ending', { id, char, kind });
  return true;
}

/** Cuenta finales buenos: condición del desbloqueo de la ruta secreta. */
export function goodEndings() {
  return Object.values(S.endings).filter((e) => e.kind === 'good').length;
}

/* ---------------------------------------------------------
   Reloj ficticio
   --------------------------------------------------------- */
export function clockText() {
  const m = ((S.minutes % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60), mm = m % 60;
  return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

export function setClock(day, timeStr) {
  if (typeof day === 'number') S.day = day;
  if (timeStr) {
    const [h, m] = String(timeStr).split(':').map(Number);
    S.minutes = (h || 0) * 60 + (m || 0);
  }
  save();
  bus.emit('clock');
}

export function advanceTime(mins) {
  S.minutes += mins;
  while (S.minutes >= 1440) { S.minutes -= 1440; S.day += 1; }
  save();
  bus.emit('clock');
}

/* ---------------------------------------------------------
   Corrupción
   --------------------------------------------------------- */
export function setGlitch(level) {
  const lv = Math.max(0, Math.min(4, level));
  if (lv <= S.glitch) return;
  S.glitch = lv;
  save();
  bus.emit('glitch', lv);
}

/* ---------------------------------------------------------
   Sesiones jugadas / disponibles
   --------------------------------------------------------- */
export function isDone(id) { return S.completed.includes(id); }
export function isAvailable(id) { return S.available.includes(id); }

export function makeAvailable(id) {
  if (S.completed.includes(id) || S.available.includes(id)) return false;
  S.available.push(id);
  save();
  bus.emit('available', id);
  return true;
}

export function complete(id) {
  const i = S.available.indexOf(id);
  if (i >= 0) S.available.splice(i, 1);
  if (!S.completed.includes(id)) S.completed.push(id);
  S.stats.sessions++;
  save(true);
  bus.emit('completed', id);
}

/**
 * Devuelve una sesión al estado "pendiente".
 * Lo usa la ruta secreta: si el asalto a la planta -2 falla,
 * el grupo vuelve a intentarlo al día siguiente.
 */
export function reopen(id) {
  const i = S.completed.indexOf(id);
  if (i >= 0) S.completed.splice(i, 1);
  if (!S.available.includes(id)) S.available.push(id);
  save();
  bus.emit('available', id);
}
