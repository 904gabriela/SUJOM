/* =========================================================
   conditions.js — Evaluador de requisitos.
   ---------------------------------------------------------
   Los datos narrativos declaran condiciones; el motor decide
   si se cumplen. Añadir contenido nuevo nunca debería exigir
   tocar este archivo.

   Forma de una condición:
   {
     flags:      ['x','y'],          // todas presentes
     notFlags:   ['z'],              // ninguna presente
     anyFlags:   ['a','b'],          // al menos una
     done:       ['ryu_01'],         // sesiones completadas
     notDone:    ['ryu_09'],
     stat:       { ryu:{affinity:20, trust:10} },   // mínimos
     statMax:    { ryu:{suspicion:40} },            // máximos
     day:        3,                  // día mínimo
     glitch:     2,                  // nivel mínimo de corrupción
     evidence:   ['med_bill'],
     notes:      ['n_sister'],
     pages:      ['assist_home'],
     photos:     ['ryu_fw'],
     endingsGood: 2,
     route:      'ryu',              // ruta enfocada
     noRoute:    true                // sólo si no hay ruta enfocada
   }
   ========================================================= */

import { S, flag, isDone } from './state.js';

const arr = (v) => (Array.isArray(v) ? v : v == null ? [] : [v]);

export function meets(req) {
  if (!req) return true;

  if (req.flags && !arr(req.flags).every(flag)) return false;
  if (req.notFlags && arr(req.notFlags).some(flag)) return false;
  if (req.anyFlags && !arr(req.anyFlags).some(flag)) return false;

  if (req.done && !arr(req.done).every(isDone)) return false;
  if (req.notDone && arr(req.notDone).some(isDone)) return false;
  if (req.anyDone && !arr(req.anyDone).some(isDone)) return false;

  if (req.stat) {
    for (const [cid, mins] of Object.entries(req.stat)) {
      const c = S.chars[cid];
      if (!c) return false;
      for (const [k, v] of Object.entries(mins)) if ((c[k] ?? 0) < v) return false;
    }
  }
  if (req.statMax) {
    for (const [cid, maxs] of Object.entries(req.statMax)) {
      const c = S.chars[cid];
      if (!c) return false;
      for (const [k, v] of Object.entries(maxs)) if ((c[k] ?? 0) > v) return false;
    }
  }

  if (req.day != null && S.day < req.day) return false;
  if (req.glitch != null && S.glitch < req.glitch) return false;

  if (req.evidence && !arr(req.evidence).every((e) => S.evidence.includes(e))) return false;
  if (req.notes && !arr(req.notes).every((n) => S.notes.includes(n))) return false;
  if (req.pages && !arr(req.pages).every((p) => S.pages.includes(p))) return false;
  if (req.photos && !arr(req.photos).every((p) => S.photos.includes(p))) return false;
  if (req.cams && !arr(req.cams).every((c) => S.cams.includes(c))) return false;

  if (req.endingsGood != null) {
    const n = Object.values(S.endings).filter((e) => e.kind === 'good').length;
    if (n < req.endingsGood) return false;
  }
  if (req.endings != null && Object.keys(S.endings).length < req.endings) return false;

  if (req.route && S.focusRoute !== req.route) return false;
  if (req.noRoute && S.focusRoute) return false;

  if (typeof req.custom === 'function' && !req.custom(S)) return false;

  return true;
}

/**
 * Explica en lenguaje humano por qué algo sigue bloqueado.
 * Se usa en las filas atenuadas de la lista de chats: el jugador
 * ve una pista, nunca la condición cruda.
 */
export function lockHint(req, names = {}) {
  if (!req) return '';
  if (req.stat) {
    for (const [cid, mins] of Object.entries(req.stat)) {
      const c = S.chars[cid];
      if (!c) continue;
      for (const [k, v] of Object.entries(mins)) {
        if ((c[k] ?? 0) < v) {
          const who = names[cid] || cid;
          if (k === 'trust') return `${who} todavía no confía lo suficiente.`;
          if (k === 'romance') return `Aún no hay suficiente entre ${who} y tú.`;
          if (k === 'awakening') return `${who} todavía no está listo para verlo.`;
          return `Necesitas estar más cerca de ${who}.`;
        }
      }
    }
  }
  if (req.evidence) return 'Te falta alguna prueba.';
  if (req.notes) return 'Hay algo que todavía no has anotado.';
  if (req.pages) return 'Hay algo que aún no has encontrado en la red.';
  if (req.day != null && S.day < req.day) return 'Todavía no es el momento.';
  if (req.endingsGood) return `Completa ${req.endingsGood} rutas con final feliz.`;
  if (req.done || req.notDone) return 'Hay una conversación pendiente antes de esta.';
  return 'Aún no está disponible.';
}
