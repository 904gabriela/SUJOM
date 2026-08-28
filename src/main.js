/* =========================================================
   main.js — Arranque.
   ---------------------------------------------------------
   Registra el contenido narrativo, monta las pantallas y
   pone en marcha el sistema de notificaciones — que es lo
   que hace que el jugador quiera volver a abrir la app.
   ========================================================= */

import {
  S, bus, load, loadSettings, settings, hasSave, fill, save
} from './engine/state.js';
import * as story from './engine/story.js';
import { setPrefs, setMood, sfx } from './engine/audio.js';
import { initShell, register, go, toast, currentScreen, shake } from './ui/shell.js';

import { titleScreen, onboarding } from './ui/onboarding.js';
import { hub, profile } from './ui/hub.js';
import { chatList, chatView } from './ui/chat-view.js';
import { gallery, photoView, notes, browser, cams, endingView, endingsList, settingsView } from './ui/apps.js';

import { CHARS } from '../data/characters.js';
import { COMMON } from '../data/story/common.js';
import { RYU } from '../data/story/ryu.js';
import { KENTA } from '../data/story/kenta.js';
import { LARA } from '../data/story/lara.js';
import { REIKO } from '../data/story/reiko.js';
import { FILLER } from '../data/story/filler.js';
import { SECRET } from '../data/story/secret.js';

/* ---------------------------------------------------------
   1. Contenido
   --------------------------------------------------------- */
story.register(COMMON);
story.register(RYU);
story.register(KENTA);
story.register(LARA);
story.register(REIKO);
story.register(FILLER);
story.register(SECRET);

/* ---------------------------------------------------------
   2. Pantallas
   --------------------------------------------------------- */
register('title', titleScreen);
register('onboarding', onboarding);
register('hub', hub);
register('profile', profile);
register('list', chatList);
register('chat', chatView);
register('gallery', gallery);
register('photo', photoView);
register('notes', notes);
register('browser', browser);
register('cams', cams);
register('ending', endingView);
register('endings', endingsList);
register('settings', settingsView);

/* ---------------------------------------------------------
   3. Arranque
   --------------------------------------------------------- */
loadSettings();
setPrefs(settings);
initShell();

const restored = load();
if (restored) story.refresh();

if (restored && S.player.onboarded) go('hub', {}, true);
else go('title', {}, true);

/* ---------------------------------------------------------
   4. Notificaciones
   ---------------------------------------------------------
   Cuando se abre contenido nuevo, aparece un aviso. Es el
   corazón del bucle: "Ryu te ha enviado un mensaje".
   Más adelante, algunos de estos avisos mienten.
   --------------------------------------------------------- */
bus.on('story:opened', (sessions) => {
  sessions.forEach((s, i) => {
    setTimeout(() => {
      if (currentScreen() === 'chat') return;      // no interrumpir una conversación
      const c = s.char && CHARS[s.char];
      const title = s.channel === 'group' ? 'Sala común'
        : s.channel === 'system' ? 'SUJOM'
          : `${c?.name || ''} te ha escrito`;
      toast({
        char: s.char,
        title,
        body: fill(s.preview || s.title),
        kind: s.channel === 'system' ? 'core' : '',
        ms: 5200,
        onClick: () => go('chat', { id: s.id })
      });
    }, 700 + i * 1500);
  });
});

/* Aviso cuando una relación sube de nivel */
let bondCache = {};
bus.on('relationship', (changes) => {
  changes.forEach((ch) => {
    if (ch.stat !== 'affinity' || ch.delta <= 0) return;
    const lvl = Math.floor((S.chars[ch.char].affinity * 0.5 + S.chars[ch.char].trust * 0.25 + S.chars[ch.char].romance * 0.25) / 17);
    if (bondCache[ch.char] == null) { bondCache[ch.char] = lvl; return; }
    if (lvl > bondCache[ch.char]) {
      bondCache[ch.char] = lvl;
      const c = CHARS[ch.char];
      setTimeout(() => toast({
        char: ch.char,
        title: `Tu vínculo con ${c.name} ha crecido`,
        body: 'Puede que ahora te cuente cosas nuevas.',
        ms: 3600,
        onClick: () => go('profile', { id: ch.char })
      }), 900);
    } else {
      bondCache[ch.char] = lvl;
    }
  });
});

/* ---------------------------------------------------------
   5. Notificaciones fantasma
   ---------------------------------------------------------
   A partir del nivel 2 de corrupción, SUJOM avisa de mensajes
   que no existen. No hacen nada. Ése es el punto.
   --------------------------------------------------------- */
const PHANTOMS = [
  { char: 'ryu', title: 'Ryu te ha enviado un mensaje.', body: '' },
  { char: 'lara', title: 'Lara te ha enviado una foto.', body: '' },
  { char: 'kenta', title: 'Kenta está esperando tu respuesta.', body: '' },
  { char: 'reiko', title: 'Reiko ha abierto una sala.', body: '' },
  { char: null, title: '1 mensaje sin leer', body: '', kind: 'core' },
  { char: 'ryu', title: 'Ryu', body: 'No recuerdo haber enviado esto.', kind: 'core' }
];

let phantomTimer = null;
function schedulePhantom() {
  clearTimeout(phantomTimer);
  if (S.glitch < 2) { phantomTimer = setTimeout(schedulePhantom, 45000); return; }
  const delay = 70000 + Math.random() * 90000;
  phantomTimer = setTimeout(() => {
    if (currentScreen() !== 'chat' && !document.hidden) {
      const pool = S.glitch >= 3 ? PHANTOMS : PHANTOMS.slice(0, 4);
      const p = pool[Math.floor(Math.random() * pool.length)];
      toast({
        char: p.char, title: p.title, body: p.body, kind: p.kind || '',
        ms: 4600,
        onClick: () => {
          // El jugador abre… y no hay nada.
          toast({ title: 'No hay ningún mensaje nuevo.', kind: 'alert', ms: 3400 });
          if (S.glitch >= 3) shake();
        }
      });
    }
    schedulePhantom();
  }, delay);
}
schedulePhantom();

/* ---------------------------------------------------------
   6. Ambiente según la fase
   --------------------------------------------------------- */
bus.on('glitch', (lv) => {
  if (currentScreen() === 'chat') return;
  setMood(lv >= 3 ? 'tense' : lv >= 2 ? 'unease' : 'warm');
});

/* ---------------------------------------------------------
   7. Herramientas de desarrollo
   ---------------------------------------------------------
   Añadir contenido nuevo no debería requerir leer el motor:
   `sujom.audit()` avisa de sesiones rotas o dependencias que
   no existen.
   --------------------------------------------------------- */
window.sujom = {
  state: () => S,
  story,
  audit: () => {
    const p = story.audit();
    if (!p.length) console.log('%c[SUJOM] contenido correcto', 'color:#5fe3b0');
    else console.warn('[SUJOM] problemas encontrados:\n' + p.join('\n'));
    return p;
  },
  stats: () => story.stats(),
  /** Avanza la historia sin jugar (sólo para pruebas). */
  skipTo(id) {
    const target = story.get(id);
    if (!target) { console.warn('sesión desconocida'); return; }
    for (const s of story.all()) {
      if (s.id === id) break;
      if (!S.completed.includes(s.id)) S.completed.push(s.id);
    }
    Object.keys(S.chars).forEach((c) => {
      Object.assign(S.chars[c], { affinity: 70, trust: 70, romance: 60, awakening: 70, awareness: 60 });
    });
    save(true); story.refresh(); go('chat', { id });
  }
};

console.log('%cSUJOM', 'font-size:22px;font-weight:800;color:#f0c674');
console.log('%cby ASSIST · sujom.audit() para revisar el contenido', 'color:#7d7699');
