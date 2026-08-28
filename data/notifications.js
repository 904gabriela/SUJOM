/* =========================================================
   notifications.js — Cómo avisa cada personaje.
   ---------------------------------------------------------
   Un aviso no es sólo "tienes un mensaje". La forma de
   avisar es parte del personaje: Ryu pregunta si estás
   despierta, Kenta te acusa de ignorarle, Lara grita y
   Reiko es correctísima.

   Y más adelante, algunos de estos avisos son mentira.
   Abres la conversación y no hay nada dentro. Esos llevan
   `phantom: true` y son el primer momento en que la
   aplicación deja de ser de fiar.
   ========================================================= */

/** Cómo anuncia la app un mensaje nuevo de cada personaje. */
export const ARRIVAL = {
  ryu: ['¿Estás despierta?', 'Te he escrito.', 'Cuando puedas.', 'No es urgente.'],
  kenta: ['no me ignores', 'oye.', 'contéstame', 'sé que lo has leído'],
  lara: ['¡¡MIRA LO QUE HE VISTO!!', '¡te he escrito!', '¡¡holaaa!!', 'necesito tu opinión YA'],
  reiko: ['Quería preguntarte una cosa.', 'Cuando tengas un momento.', 'Te he escrito.', '¿Tienes cinco minutos?'],
  group: ['Nueva actividad en la sala común', 'Están hablando de ti', 'La sala se ha animado'],
  core: ['Tienes una notificación de ASSIST', 'ASSIST · aviso del sistema']
};

/**
 * Avisos fantasma. Se disparan solos a partir de la fase 3.
 * Al abrirlos no hay nada. Ese es todo el contenido.
 */
export const PHANTOM = [
  { char: 'ryu', title: 'Ryu te ha enviado un mensaje.', minGlitch: 2 },
  { char: 'lara', title: 'Lara te ha enviado una foto.', minGlitch: 2 },
  { char: 'kenta', title: 'Kenta está esperando tu respuesta.', minGlitch: 2 },
  { char: 'reiko', title: 'Reiko ha abierto una conversación.', minGlitch: 2 },
  { char: null, title: '1 mensaje sin leer', kind: 'core', minGlitch: 3 },
  { char: 'ryu', title: 'Ryu: "No recuerdo haber enviado esto."', kind: 'core', minGlitch: 3 },
  { char: null, title: 'Conexión interrumpida', kind: 'core', minGlitch: 3 },
  { char: 'lara', title: 'Lara: "yo no he mandado eso"', kind: 'core', minGlitch: 4 },
  { char: null, title: 'Error al entregar el mensaje', kind: 'core', minGlitch: 4 }
];

export function arrivalLine(char, fallback) {
  const pool = ARRIVAL[char] || ARRIVAL.core;
  return pool[Math.floor(Math.random() * pool.length)] || fallback;
}
