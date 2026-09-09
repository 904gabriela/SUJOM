/* =========================================================
   tienda.js — Gemas, regalos y lo que se compra.
   ---------------------------------------------------------
   La regla de la casa: aquí no se vende no perderse nada.
   El reloj de ASSIST solo avanza cuando juegas, así que
   cerrar la app y dormir no te cuesta ninguna escena. Lo que
   se vende es querer, no temer.

   De ahí salen las tres reglas que gobiernan este archivo:

   1. Ninguna gema caduca ni se pierde por no entrar.
   2. Nada que compres con dinero puede ser la única forma de
      ver una escena. Los regalos aceleran el afecto; jugar
      bien también lo sube.
   3. Nada de sobres sorpresa: se ve lo que compras antes de
      comprarlo, y cuánto cuesta.
   ========================================================= */

/* ---------------------------------------------------------
   De dónde salen las gemas
   ---------------------------------------------------------
   Todas se ganan HACIENDO algo, ninguna por calendario. Si
   algún día quieres el goteo diario de los demás juegos, se
   añade aquí una entrada con `cada: 'dia'` y se implementa en
   engine/tienda.js — pero léete el comentario de arriba antes.
   --------------------------------------------------------- */
export const RECOMPENSAS = {
  primer_dia:   { gemas: 30, texto: 'Por empezar' },
  sesion:       { gemas: 5,  texto: 'Conversación terminada', repetible: true },
  dia_cerrado:  { gemas: 15, texto: 'Un día más en ASSIST', repetible: true },
  nota_nueva:   { gemas: 3,  texto: 'Nota guardada', repetible: true },
  foto_nueva:   { gemas: 4,  texto: 'Foto guardada', repetible: true },
  pagina_nueva: { gemas: 6,  texto: 'Página encontrada', repetible: true },
  ruta_cerrada: { gemas: 80, texto: 'Ruta terminada', repetible: true },
  final_nuevo:  { gemas: 40, texto: 'Final desbloqueado', repetible: true }
};

/* ---------------------------------------------------------
   Regalos
   ---------------------------------------------------------
   `fx` es lo que le mueve al personaje al dárselo, con la
   misma forma que usa la historia. `para` limita a quién le
   pega el regalo: a quien no le pega, sube menos.

   Un regalo se puede dar una sola vez a cada persona. No es
   una restricción técnica, es de diseño: si pudieras regalar
   veinte veces lo mismo, el afecto se compraría entero y las
   conversaciones dejarían de importar.
   --------------------------------------------------------- */
export const REGALOS = {
  cafe: {
    nombre: 'Café de máquina',
    icono: '☕',
    precio: 20,
    desc: 'De los malos, de los de las tres de la mañana.',
    para: ['kenta', 'ryu'],
    fx: { affinity: 4, trust: 2 }
  },
  bufanda: {
    nombre: 'Bufanda de punto',
    icono: '🧣',
    precio: 45,
    desc: 'Hecha a mano, con un fallo en la tercera vuelta.',
    para: ['reiko', 'kenta'],
    fx: { affinity: 6, trust: 3 }
  },
  pelota: {
    nombre: 'Pelota para Momo',
    icono: '🎾',
    precio: 35,
    desc: 'Chirría. Lara va a odiarte y a quererte a partes iguales.',
    para: ['lara'],
    fx: { affinity: 8, trust: 3 }
  },
  bengala: {
    nombre: 'Bengala',
    icono: '🎆',
    precio: 60,
    desc: 'Un fuego artificial de bolsillo. Dura once segundos.',
    para: ['ryu'],
    fx: { affinity: 9, romance: 4 }
  },
  libreta: {
    nombre: 'Libreta en blanco',
    icono: '📓',
    precio: 40,
    desc: 'Para que escriba algo que no tenga que borrar después.',
    para: ['reiko'],
    fx: { affinity: 7, trust: 5 }
  },
  cinta: {
    nombre: 'Cinta de casete',
    icono: '📼',
    precio: 55,
    desc: 'Grabada por ti. No dice de quién es ninguna canción.',
    para: ['ryu', 'kenta', 'lara', 'reiko'],
    fx: { affinity: 6, romance: 5 }
  }
};

/* Lo que sube un regalo cuando no va dirigido a esa persona.
   Se agradece, pero no es lo mismo. */
export const FACTOR_GENERICO = 0.4;

/* ---------------------------------------------------------
   Gemas de pago
   ---------------------------------------------------------
   OJO: no hay ninguna pasarela de pago conectada. Estos
   paquetes están descritos pero NO se pueden comprar todavía;
   la tienda los enseña marcados como tales. Cuando haya una
   pasarela de verdad, se conecta aquí y en engine/tienda.js.
   --------------------------------------------------------- */
export const PAQUETES = [
  { id: 'p1', gemas: 100,  precio: '0,99 €' },
  { id: 'p2', gemas: 550,  precio: '4,99 €', extra: '+10%' },
  { id: 'p3', gemas: 1200, precio: '9,99 €', extra: '+20%' }
];
