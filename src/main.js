/* =========================================================
   main.js — Arranque de ASSIST: Connected Hearts.
   ---------------------------------------------------------
   Registra el contenido narrativo, monta las pantallas y
   pone en marcha los avisos, que son lo que hace que el
   jugador quiera volver a abrir la aplicación.
   ========================================================= */

import {
  S, bus, load, loadSettings, settings, fill, save, pushNotif
} from './engine/state.js';
import * as story from './engine/story.js';
import { setPrefs, setMood } from './engine/audio.js';
import {
  initShell, register, go, toast, currentScreen, shake,
  setTabCounts, paintTabs, applyPhase
} from './ui/shell.js';

import { boot, onboarding } from './ui/onboarding.js';
import { home, contacts, profile } from './ui/hub.js';
import { inbox, chatView } from './ui/chat-view.js';
import {
  album, photoView, notes, files, fileView, browser, calls,
  notifications, endingView, endingsList, settingsView
} from './ui/apps.js';

import { CHARS } from '../data/characters.js';
import { arrivalLine, PHANTOM } from '../data/notifications.js';

import { COMMON } from '../data/story/common.js';
import { RYU } from '../data/story/ryu.js';
import { KENTA } from '../data/story/kenta.js';
import { LARA } from '../data/story/lara.js';
import { REIKO } from '../data/story/reiko.js';
import { FILLER } from '../data/story/filler.js';
import { SECRET } from '../data/story/secret.js';

/* ---------------------------------------------------------
   1. Contenido narrativo
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
register('boot', boot);
register('onboarding', onboarding);
register('home', home);
register('contacts', contacts);
register('profile', profile);
register('inbox', inbox);
register('system', (p) => inbox({ ...p, channel: 'system' }));
register('chat', chatView);
register('album', album);
register('photo', photoView);
register('notes', notes);
register('files', files);
register('file', fileView);
register('browser', browser);
register('calls', calls);
register('notifications', notifications);
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
applyPhase();

setTabCounts(() => ({
  msg: story.unreadCount('dm') + story.unreadCount('group'),
  ppl: story.pendingFor('dm').length
}));

if (restored && S.player.onboarded) go('home', {}, { replace: true, anim: 'fade' });
else go('boot', {}, { replace: true, anim: 'fade' });

/* ---------------------------------------------------------
   4. Avisos de contenido nuevo
   ---------------------------------------------------------
   Cada personaje avisa a su manera (data/notifications.js).
   Es el bucle del juego: "Ryu te ha escrito".
   --------------------------------------------------------- */
bus.on('story:opened', (sessions) => {
  sessions.forEach((s, i) => {
    const c = s.char && CHARS[s.char];
    const title = s.channel === 'group' ? 'Sala común'
      : s.channel === 'system' ? 'ASSIST'
        : `${c?.name || ''} te ha escrito`;
    const body = s.channel === 'dm' && s.char
      ? arrivalLine(s.char, s.preview)
      : fill(s.preview || s.title);

    pushNotif({ char: s.char, title, body, session: s.id, kind: s.channel === 'system' ? 'core' : '' });

    setTimeout(() => {
      if (currentScreen() === 'chat') return;       // no interrumpir una conversación
      toast({
        char: s.char, title, body,
        kind: s.channel === 'system' ? 'core' : '',
        ms: 5000,
        onClick: () => go('chat', { id: s.id })
      });
      paintTabs(currentScreen());
    }, 700 + i * 1500);
  });
});

/* Aviso al subir de nivel de relación. */
const bondCache = {};
bus.on('relationship', (changes) => {
  changes.forEach((ch) => {
    if (ch.stat !== 'affinity' || ch.delta <= 0) return;
    const c = S.chars[ch.char];
    const lvl = Math.floor((c.affinity * 0.5 + c.trust * 0.25 + c.romance * 0.25) / 17);
    if (bondCache[ch.char] == null) { bondCache[ch.char] = lvl; return; }
    if (lvl > bondCache[ch.char]) {
      setTimeout(() => toast({
        char: ch.char,
        title: `Estás más cerca de ${CHARS[ch.char].name}`,
        body: 'Su perfil tiene algo nuevo.',
        ms: 3600,
        onClick: () => go('profile', { id: ch.char })
      }), 950);
    }
    bondCache[ch.char] = lvl;
  });
});

/* ---------------------------------------------------------
   5. Avisos fantasma
   ---------------------------------------------------------
   A partir de la fase 3, ASSIST avisa de mensajes que no
   existen. Se guardan en el centro de notificaciones, así
   que el jugador puede volver a mirarlos y comprobar que
   no se lo ha imaginado.
   --------------------------------------------------------- */
let phantomTimer = null;
function schedulePhantom() {
  clearTimeout(phantomTimer);
  if (S.glitch < 2) { phantomTimer = setTimeout(schedulePhantom, 40000); return; }
  phantomTimer = setTimeout(() => {
    const pool = PHANTOM.filter((p) => S.glitch >= p.minGlitch);
    if (pool.length && currentScreen() !== 'chat' && !document.hidden) {
      const p = pool[Math.floor(Math.random() * pool.length)];
      pushNotif({ char: p.char, title: p.title, kind: p.kind || '', phantom: true });
      toast({
        char: p.char, title: p.title, kind: p.kind || '', ms: 4600,
        onClick: () => {
          toast({ title: 'No hay ningún mensaje nuevo.', kind: 'alert', ms: 3400 });
          if (S.glitch >= 3) shake();
        }
      });
    }
    schedulePhantom();
  }, 70000 + Math.random() * 90000);
}
schedulePhantom();

/* Ambiente según la fase de la historia. */
bus.on('glitch', (lv) => {
  if (currentScreen() === 'chat') return;
  setMood(lv >= 3 ? 'tense' : lv >= 2 ? 'unease' : 'warm');
});

/* Repintar contadores cuando cambie algo. */
['completed', 'available', 'notif'].forEach((ev) => {
  bus.on(ev, () => paintTabs(currentScreen()));
});

/* ---------------------------------------------------------
   6. Herramientas de desarrollo
   ---------------------------------------------------------
   Para que puedas añadir contenido sin leerte el motor.
   --------------------------------------------------------- */
window.assist = {
  state: () => S,
  story,
  /** Revisa que el contenido nuevo no tenga referencias rotas. */
  audit() {
    const p = story.audit();
    if (!p.length) console.log('%c[ASSIST] contenido correcto', 'color:#5fe0b0');
    else console.warn('[ASSIST] problemas:\n' + p.join('\n'));
    return p;
  },
  /** Salta a una conversación concreta para probarla. */
  skipTo(id) {
    const t = story.get(id);
    if (!t) { console.warn('sesión desconocida:', id); return; }
    for (const s of story.all()) {
      if (s.id === id) break;
      if (!S.completed.includes(s.id)) S.completed.push(s.id);
    }
    Object.keys(S.chars).forEach((c) => Object.assign(S.chars[c], {
      affinity: 70, trust: 70, romance: 60, awakening: 70, awareness: 60
    }));
    save(true); story.refresh(); go('chat', { id });
  },
  /** Fuerza una fase visual para revisar el diseño. */
  phase(n) { S.glitch = Math.max(0, Math.min(4, n)); save(); applyPhase(); }
};
window.sujom = window.assist;   // compatibilidad con la consola antigua

console.log('%cASSIST: Connected Hearts', 'font-size:20px;font-weight:800;color:#ff4d94');
console.log('%cassist.audit() revisa el contenido · assist.phase(0-4) prueba el aspecto', 'color:#9c82b8');
