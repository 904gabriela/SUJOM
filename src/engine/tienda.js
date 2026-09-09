/* =========================================================
   tienda.js — La cartera.
   ---------------------------------------------------------
   Todo lo que entra o sale de las gemas pasa por aquí, y todo
   queda anotado en el libro (S.ledger). No hay ninguna otra
   forma de sumar o restar gemas: si mañana algo cuadra mal,
   el libro dice quién lo hizo.
   ========================================================= */

import { S, save, bus, applyFx } from './state.js';
import { RECOMPENSAS, REGALOS, FACTOR_GENERICO } from '../../data/tienda.js';

const LIBRO_MAX = 60;

function anota(delta, concepto) {
  S.ledger.unshift({ delta, concepto, day: S.day, at: Date.now() });
  if (S.ledger.length > LIBRO_MAX) S.ledger.length = LIBRO_MAX;
}

export function gemas() {
  return S.gems || 0;
}

/** Cobra una recompensa. Las no repetibles solo se cobran una vez. */
export function premia(id, extra = '') {
  const r = RECOMPENSAS[id];
  if (!r) return 0;
  const clave = r.repetible ? `${id}:${extra || S.day}` : id;
  if (S.earned.includes(clave)) return 0;

  S.earned.push(clave);
  S.gems += r.gemas;
  anota(+r.gemas, r.texto);
  save();
  bus.emit('gemas', { delta: r.gemas, total: S.gems, texto: r.texto });
  return r.gemas;
}

/** Resta gemas. Devuelve false y no toca nada si no llegan. */
export function gasta(cantidad, concepto) {
  if (cantidad <= 0 || (S.gems || 0) < cantidad) return false;
  S.gems -= cantidad;
  anota(-cantidad, concepto);
  save();
  bus.emit('gemas', { delta: -cantidad, total: S.gems, texto: concepto });
  return true;
}

/* ---------------------------------------------------------
   Regalos
   --------------------------------------------------------- */

export function compraRegalo(id) {
  const g = REGALOS[id];
  if (!g) return false;
  if (!gasta(g.precio, `Regalo: ${g.nombre}`)) return false;
  S.inventory[id] = (S.inventory[id] || 0) + 1;
  save();
  return true;
}

/** Cuántos tienes de ese regalo sin dar. */
export function tengo(id) {
  return S.inventory[id] || 0;
}

/** Si ya se lo diste a esa persona. Uno por persona, a propósito. */
export function yaRegalado(cid, id) {
  return (S.given[cid] || []).includes(id);
}

/**
 * Da un regalo. Devuelve lo que ha movido, o null si no se puede.
 * A quien no le pega el regalo, le sube menos: se agradece, pero
 * no es lo mismo que acertar.
 */
export function regala(cid, id) {
  const g = REGALOS[id];
  if (!g || tengo(id) < 1 || yaRegalado(cid, id)) return null;

  const acierta = !g.para || g.para.includes(cid);
  const fx = {};
  for (const [k, v] of Object.entries(g.fx)) {
    fx[k] = acierta ? v : Math.max(1, Math.round(v * FACTOR_GENERICO));
  }

  S.inventory[id] -= 1;
  if (S.inventory[id] <= 0) delete S.inventory[id];
  (S.given[cid] = S.given[cid] || []).push(id);

  const cambios = applyFx({ [cid]: fx });
  save();
  bus.emit('regalo', { char: cid, gift: id, acierta, cambios });
  return { acierta, fx, cambios };
}

/* ---------------------------------------------------------
   Cosas que se quedan (ropa, extras)
   --------------------------------------------------------- */

export function tienes(id) {
  return S.owned.includes(id);
}

export function compra(id, precio, concepto) {
  if (tienes(id)) return false;
  if (!gasta(precio, concepto)) return false;
  S.owned.push(id);
  save();
  return true;
}

/* ---------------------------------------------------------
   Enganche
   ---------------------------------------------------------
   La economía se cuelga del bus y no toca el motor: el juego
   ya avisa cuando guardas una nota, terminas una conversación
   o cierras un final. Aquí solo se escucha y se paga.

   Todo lo que paga es algo que HICISTE. No hay ninguna
   recompensa por pasar la noche ni por volver al día
   siguiente: si mañana alguien añade una, que sea a sabiendas.
   --------------------------------------------------------- */
export function arranca() {
  premia('primer_dia');

  bus.on('note', (id) => premia('nota_nueva', id));
  bus.on('photo', (id) => premia('foto_nueva', id));
  bus.on('page', (id) => premia('pagina_nueva', id));
  bus.on('completed', (id) => premia('sesion', id));
  bus.on('ending', ({ id, char, kind }) => {
    premia('final_nuevo', id);
    if (kind === 'good' && char) premia('ruta_cerrada', char);
  });

  // Un día se cierra cuando el reloj de ficción pasa de medianoche, y ese
  // reloj solo lo mueve jugar.
  let ultimoDia = S.day;
  bus.on('clock', () => {
    if (S.day > ultimoDia) { ultimoDia = S.day; premia('dia_cerrado', S.day); }
  });
}
