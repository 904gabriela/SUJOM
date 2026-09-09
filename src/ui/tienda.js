/* =========================================================
   tienda.js — La tienda.
   ---------------------------------------------------------
   Tres secciones y ningún truco: se ve lo que cuesta cada
   cosa antes de comprarla, no hay sobres sorpresa, y nada de
   lo que se vende aquí es la única forma de ver una escena.

   Los paquetes de gemas se enseñan pero NO se pueden comprar:
   no hay ninguna pasarela de pago conectada, y prefiero que
   se vea dicho a que un botón muerto parezca roto.
   ========================================================= */

import { S, bus } from '../engine/state.js';
import { gemas, compraRegalo, tengo } from '../engine/tienda.js';
import { REGALOS, PAQUETES } from '../../data/tienda.js';
import { CHARS } from '../../data/characters.js';
import { h, esc, toast } from './shell.js';
import { sfx } from '../engine/audio.js';

export function shop() {
  const node = h(`
    <div class="tienda">
      <div class="cartera">
        <span class="gema">◆</span>
        <span class="saldo" id="saldo">${gemas()}</span>
        <span class="cartera-t">gemas</span>
      </div>

      <p class="tienda-nota">
        Las gemas se ganan jugando. No caducan y no se pierde nada por
        no entrar: el tiempo de ASSIST solo corre cuando estás dentro.
      </p>

      <h3 class="tienda-h">Regalos</h3>
      <p class="tienda-sub">Suben el afecto de quien los recibe. Uno por persona.</p>
      <div class="regalos" id="regalos"></div>

      <h3 class="tienda-h">Gemas</h3>
      <div class="paquetes" id="paquetes"></div>
      <p class="tienda-aviso">
        Todavía no se pueden comprar: falta conectar el pago.
      </p>
    </div>`);

  const saldo = node.querySelector('#saldo');
  // Todo lo que se suscribe al bus se apunta aquí y se suelta al salir:
  // si no, cada visita a la tienda deja atrás una copia escuchando.
  const sueltas = [];
  sueltas.push(bus.on('gemas', () => { saldo.textContent = gemas(); }));

  /* ---------- regalos ---------- */
  const lista = node.querySelector('#regalos');
  Object.entries(REGALOS).forEach(([id, g]) => {
    const quien = (g.para || []).map((c) => CHARS[c]?.name).filter(Boolean).join(', ');
    const item = h(`
      <div class="regalo">
        <span class="regalo-ic">${g.icono}</span>
        <span class="regalo-m">
          <span class="regalo-n">${esc(g.nombre)}</span>
          <span class="regalo-d">${esc(g.desc)}</span>
          ${quien ? `<span class="regalo-p">Le pega a ${esc(quien)}</span>` : ''}
        </span>
        <span class="regalo-r">
          <button class="btn btn-sm" data-c>◆ ${g.precio}</button>
          <span class="regalo-t" data-t hidden></span>
        </span>
      </div>`);

    const boton = item.querySelector('[data-c]');
    const tienes = item.querySelector('[data-t]');
    const refresca = () => {
      const n = tengo(id);
      tienes.hidden = n < 1;
      tienes.textContent = n > 1 ? `tienes ${n}` : 'tienes 1';
      boton.disabled = gemas() < g.precio;
    };

    boton.addEventListener('click', () => {
      if (compraRegalo(id)) {
        sfx.open();
        toast({ title: g.nombre, body: 'Guardado. Se lo das desde el chat.' });
      } else {
        sfx.tap();
        toast({ title: 'No te llegan las gemas', body: `${g.nombre} cuesta ${g.precio}.` });
      }
      refresca();
    });

    refresca();
    sueltas.push(bus.on('gemas', refresca));
    lista.appendChild(item);
  });

  /* ---------- paquetes ---------- */
  const packs = node.querySelector('#paquetes');
  PAQUETES.forEach((p) => {
    packs.appendChild(h(`
      <div class="paquete">
        <span class="paquete-g">◆ ${p.gemas}</span>
        ${p.extra ? `<span class="paquete-x">${esc(p.extra)}</span>` : ''}
        <span class="paquete-p">${esc(p.precio)}</span>
      </div>`));
  });

  return {
    node,
    leave: () => sueltas.forEach((soltar) => soltar()),
    chrome: { visible: true, title: 'Tienda', sub: `${gemas()} gemas`, actions: [] }
  };
}
