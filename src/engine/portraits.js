/* =========================================================
   portraits.js — Capa de resolución de arte.
   ---------------------------------------------------------
   TÚ YA TIENES EL ARTE DE LOS PERSONAJES.

   Todo el juego pide los retratos a través de este archivo,
   nunca directamente al generador de SVG. Eso permite una
   cosa importante: para meter tu arte real no hay que tocar
   ni una línea de código de interfaz.

   Basta con añadir un bloque `art` al personaje en
   data/characters.js:

     ryu: {
       ...
       art: {
         avatar:  'assets/characters/ryu/avatar.png',
         portrait:'assets/characters/ryu/portrait.png',
         real:    'assets/characters/ryu/real.png',
         expressions: {
           happy:  'assets/characters/ryu/happy.png',
           sad:    'assets/characters/ryu/sad.png'
         }
       }
     }

   Lo que declares se usa. Lo que falte cae automáticamente
   en el retrato generado por código, así que puedes ir
   añadiendo arte poco a poco sin romper nada.

   Tamaños recomendados:
     avatar    cuadrado, 256×256   (chat, listas, avisos)
     portrait  vertical, 900×1000  (ficha de personaje)
     real      vertical, 800×1040  (la videollamada final)
   ========================================================= */

import { CHARS } from '../../data/characters.js';
import { chibi, portrait as genPortrait, realPortrait as genReal } from './art.js';
import { S } from './state.js';

/* Cachea qué imágenes existen de verdad para no pedirlas dos veces. */
const imgOk = new Map();

function probe(url) {
  if (!url) return false;
  if (imgOk.has(url)) return imgOk.get(url);
  imgOk.set(url, true);          // optimista: `onerror` en el <img> hace el respaldo
  return true;
}

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/**
 * Si la imagen declarada falla al cargar, el <img> se reemplaza solo por el
 * SVG generado. Así un `assets/` incompleto nunca deja un hueco en la interfaz.
 */
function imgTag(url, alt, fallbackSvg) {
  const id = 'im' + Math.random().toString(36).slice(2, 9);
  const fb = fallbackSvg.replace(/"/g, '&quot;');
  return `<img id="${id}" src="${esc(url)}" alt="${esc(alt)}" loading="lazy"
    onerror="this.outerHTML=this.getAttribute('data-fb')" data-fb="${fb}">`;
}

function glitchLevel() {
  return S.glitch >= 3 ? S.glitch : 0;
}

/* ---------------------------------------------------------
   Avatar redondo — chat, listas, avisos, contactos
   --------------------------------------------------------- */
export function avatar(charId, expr = 'neutral') {
  const c = CHARS[charId];
  if (!c) return '';
  const art = c.art || {};
  const url = art.expressions?.[expr] || art.avatar;
  const svg = chibi(c, expr, { glitch: glitchLevel() });
  return probe(url) && url ? imgTag(url, c.name, svg) : svg;
}

/* ---------------------------------------------------------
   Retrato grande — ficha de personaje, tarjetas
   --------------------------------------------------------- */
export function portrait(charId, expr = 'neutral') {
  const c = CHARS[charId];
  if (!c) return '';
  const art = c.art || {};
  const url = art.expressions?.[expr] || art.portrait || art.avatar;
  const svg = genPortrait(c, expr, { glitch: glitchLevel() });
  return probe(url) && url ? imgTag(url, c.name, svg) : svg;
}

/* ---------------------------------------------------------
   Retrato "real" — sólo la videollamada.
   Aquí la persona pulida de la app se cae y debajo hay
   alguien agotado. Si tienes arte propio para este momento,
   declara `art.real`.
   --------------------------------------------------------- */
export function realFace(charId, mood = 'tired') {
  const c = CHARS[charId];
  if (!c) return '';
  const url = c.art?.real;
  const svg = genReal(c, mood);
  return probe(url) && url ? imgTag(url, c.name, svg) : svg;
}

/* ---------------------------------------------------------
   Avatar del jugador
   ---------------------------------------------------------
   Deliberadamente sencillo: pelo, piel y color. No es un
   creador de personajes de rol; sólo sirve para que el
   jugador se reconozca en su propio perfil.
   --------------------------------------------------------- */
export const PLAYER_HAIR = ['#2a2233', '#5b3a2a', '#c98b3f', '#f0e0c0', '#ff7fb6', '#8f7ad4', '#7fd8e8', '#e0574f'];
export const PLAYER_SKIN = ['#f8ddc8', '#f2cdaa', '#dda87c', '#b97f52', '#8a5a37', '#5f3a24'];
export const PLAYER_STYLE = ['corto', 'medio', 'largo', 'recogido'];

export function playerFace(spec = null) {
  const p = spec || S.player.look || {};
  const hair = p.hair || PLAYER_HAIR[0];
  const skin = p.skin || PLAYER_SKIN[0];
  const style = p.style || 'medio';
  const accent = S.player.color || '#ff4d94';
  const uid = 'pf' + Math.random().toString(36).slice(2, 8);

  const dark = (hex, amt = -26) => {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.max(0, ((n >> 16) & 255) + amt);
    const g = Math.max(0, ((n >> 8) & 255) + amt);
    const b = Math.max(0, (n & 255) + amt);
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  };

  const HAIR = {
    corto: `<path d="M23 48 Q22 20 50 18 Q78 20 77 48 Q73 30 62 28 Q50 34 38 28 Q27 30 23 48 Z" fill="${hair}"/>`,
    medio: `<path d="M20 54 Q19 20 50 17 Q81 20 80 54 L79 72 Q74 54 72 42 L28 42 Q26 54 21 72 Z" fill="${dark(hair, -14)}"/>
            <path d="M23 48 Q22 20 50 18 Q78 20 77 48 Q74 31 66 29 Q57 38 47 32 Q36 40 28 32 Q25 38 23 48 Z" fill="${hair}"/>`,
    largo: `<path d="M17 56 Q14 22 50 18 Q86 22 83 56 L85 92 Q71 82 73 50 L27 50 Q29 82 15 92 Z" fill="${dark(hair, -16)}"/>
            <path d="M22 48 Q21 19 50 17 Q79 19 78 48 Q75 30 67 27 Q58 36 50 30 Q42 36 33 27 Q25 30 22 48 Z" fill="${hair}"/>`,
    recogido: `<circle cx="50" cy="16" r="13" fill="${dark(hair, -12)}"/>
            <path d="M23 48 Q22 20 50 18 Q78 20 77 48 Q73 30 62 27 Q50 33 38 27 Q27 30 23 48 Z" fill="${hair}"/>`
  };

  return `<svg viewBox="0 0 100 112" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tu avatar">
    <defs>
      <linearGradient id="bg${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${accent}" stop-opacity=".32"/>
        <stop offset="100%" stop-color="#1a0f2e"/>
      </linearGradient>
    </defs>
    <rect width="100" height="112" fill="url(#bg${uid})"/>
    ${HAIR[style] || HAIR.medio}
    <path d="M50 88 C31 88 18 96 14 112 L86 112 C82 96 69 88 50 88 Z" fill="${accent}"/>
    <path d="M42 76 L42 90 Q50 95 58 90 L58 76 Z" fill="${dark(skin, -22)}"/>
    <path d="M50 26 C67 26 74 39 74 52 C74 68 64 82 50 82 C36 82 26 68 26 52 C26 39 33 26 50 26 Z" fill="${skin}"/>
    <ellipse cx="25.6" cy="57" rx="3.2" ry="5" fill="${skin}"/>
    <ellipse cx="74.4" cy="57" rx="3.2" ry="5" fill="${skin}"/>
    <ellipse cx="33" cy="63" rx="6" ry="3.4" fill="#ff8fa8" opacity=".45"/>
    <ellipse cx="67" cy="63" rx="6" ry="3.4" fill="#ff8fa8" opacity=".45"/>
    <path d="M31 50 Q37 45 43 50" stroke="#2a2233" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M57 50 Q63 45 69 50" stroke="#2a2233" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M46 69 Q50 73 54 69" stroke="#8a3f52" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${(HAIR[style] || HAIR.medio).includes('circle') ? '' : ''}
  </svg>`;
}

/* Nombre visible de un personaje, para no importar CHARS por todas partes. */
export function nameOf(id) {
  return CHARS[id]?.name || id;
}

export function accentOf(id) {
  return CHARS[id]?.accent || 'var(--pink)';
}
