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
  /* El arte pintado NO se pide aquí, se pide dentro de `photo()`, con
     los campos `img` / `imgCorrupt` de `data/photos.js`.

     Aquí hubo un camino que metía un `<img src="${def.file}">` suelto
     con respaldo por `onerror`. Se ha quitado porque **se saltaba
     `photo()` entero**: la foto pintada salía sin anomalía, sin el
     filtro de corrupción y sin las bandas de glitch. En una foto
     corrupta eso se lleva por delante justo la prueba que el jugador
     tiene que encontrar — la pulsera, la puerta con teclado, el
     reflejo. No lo usaba ninguna foto, así que no rompe nada. */
  return photoArt(
    { ...def, spec: CHARS[def.of] },
    { corrupt: S.photosCorrupt.includes(pid) }
  );
}
