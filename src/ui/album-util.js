/* =========================================================
   album-util.js — Miniatura de foto.
   ---------------------------------------------------------
   Vive aparte para que la ficha de personaje y el álbum
   la compartan sin importarse la una a la otra.
   ========================================================= */

import { S } from '../engine/state.js';
import { photo as photoArt } from '../engine/art.js';
import { CHARS } from '../../data/characters.js';

/**
 * Una foto se dibuja distinta según si el jugador ya sabe
 * que hay algo raro en ella. Esa es toda la lógica.
 */
export function photoThumb(pid, def) {
  if (def.file) {
    return `<img src="${def.file}" alt="${def.title || ''}" loading="lazy"
      onerror="this.outerHTML=this.getAttribute('data-fb')"
      data-fb="${photoArt({ ...def, spec: CHARS[def.of] }, { corrupt: S.photosCorrupt.includes(pid) }).replace(/"/g, '&quot;')}">`;
  }
  return photoArt(
    { ...def, spec: CHARS[def.of] },
    { corrupt: S.photosCorrupt.includes(pid) }
  );
}
