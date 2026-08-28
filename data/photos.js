/* =========================================================
   photos.js — Fotografías.
   ---------------------------------------------------------
   Al principio son lo que parecen: comida, un perro, una
   ventana. Más tarde, la misma imagen se abre en la galería
   y no es la misma. La anomalía y los metadatos rotos son
   lo que convierte una foto bonita en una prueba.
   ========================================================= */

export const PHOTOS = {
  /* ---------------- RYU ---------------- */
  ryu_fw: {
    of: 'ryu', scene: 'fireworks',
    title: 'Fuegos desde el puente',
    caption: 'Todavía quedan diez minutos. Mira.',
    exif: { fecha: '12/07 · 22:41', lugar: 'Puente Kanade', disp: 'SUJOM Cam', tam: '2.1 MB' },
    anomaly: 'reflection',
    corruptExif: { fecha: '12/07 · 22:41', lugar: '—— sin datos ——', disp: 'ASSIST-CAM 04', tam: '2.1 MB', extra: 'ORIGEN: SIM/EXT-04' },
    corruptNote: 'En el cristal de la derecha hay un reflejo. No es el puente.'
  },
  ryu_window: {
    of: 'ryu', scene: 'window',
    title: 'Desde su ventana',
    caption: 'Esto es todo lo que se ve desde aquí. No es gran cosa.',
    exif: { fecha: '15/07 · 02:14', lugar: 'Distrito 6', disp: 'SUJOM Cam', tam: '1.4 MB' },
    anomaly: 'nosun',
    corruptExif: { fecha: '15/07 · 02:14', lugar: 'Distrito 6', disp: 'SUJOM Cam', tam: '1.4 MB', extra: 'CAPA DE CIELO: PRESET_NOCHE_03 (bucle)' },
    corruptNote: 'La luna está en el mismo sitio que hace tres semanas. Exactamente el mismo.'
  },
  ryu_ramen: {
    of: 'ryu', scene: 'ramen',
    title: 'Cena a las tres',
    caption: 'Kenta dice que esto no es cenar. Kenta se equivoca.',
    exif: { fecha: '19/07 · 03:02', lugar: 'Konbini Aoi', disp: 'SUJOM Cam', tam: '0.9 MB' }
  },
  ryu_cross: {
    of: 'ryu', scene: 'gift',
    title: 'Lo único que traje',
    caption: 'Era de mi padre. Es lo único que traje conmigo.',
    exif: { fecha: '24/07 · 23:50', lugar: '—', disp: 'SUJOM Cam', tam: '1.1 MB' }
  },
  ryu_hosp: {
    of: 'ryu', scene: 'hospital',
    title: 'Pasillo blanco',
    caption: 'No sé por qué tengo esto en la galería. Yo no he estado aquí.',
    exif: { fecha: '—— ——', lugar: 'Centro Médico Sanwa · Ala C', disp: 'DESCONOCIDO', tam: '3.8 MB' },
    anomaly: 'band',
    corruptDefault: true,
    corruptExif: { fecha: '14/11/2023 · 04:20', lugar: 'Centro Médico Sanwa · Ala C', disp: 'ASSIST/REG', tam: '3.8 MB', extra: 'PACIENTE: MEI —— · FACTURA: LIQUIDADA' },
    corruptNote: 'En la muñeca de la cama del fondo hay una pulsera. Pone C-02.'
  },
  ryu_lab: {
    of: 'ryu', scene: 'lab',
    title: 'No sé qué es esto',
    caption: 'Me ha llegado a mí. Yo no la he hecho.',
    exif: { fecha: '—— ——', lugar: 'INSTALACIÓN — SECTOR C', disp: 'ASSIST-CAM 11', tam: '5.2 MB', extra: 'SUJETO EN SILLÓN: C-04' },
    corruptDefault: true,
    anomaly: 'wires'
  },

  /* ---------------- KENTA ---------------- */
  kenta_ramen: {
    of: 'kenta', scene: 'ramen',
    title: 'Cena de campeones',
    caption: 'mira esto. MÍRALO. esto es libertad',
    exif: { fecha: '13/07 · 01:30', lugar: 'Su cocina', disp: 'SUJOM Cam', tam: '0.7 MB' }
  },
  kenta_city: {
    of: 'kenta', scene: 'city',
    title: 'A las tres de la mañana',
    caption: 'no puedo dormir. la ciudad tampoco',
    exif: { fecha: '17/07 · 03:11', lugar: 'Azotea', disp: 'SUJOM Cam', tam: '2.4 MB' },
    anomaly: 'dup',
    corruptExif: { fecha: '17/07 · 03:11', lugar: 'Azotea', disp: 'SUJOM Cam', tam: '2.4 MB', extra: 'BLOQUE 4 = BLOQUE 7 (copia exacta)' },
    corruptNote: 'Dos edificios distintos tienen las mismas ventanas encendidas. Píxel por píxel.'
  },
  kenta_cat: {
    of: 'kenta', scene: 'cat',
    title: 'El gato del callejón',
    caption: 'viene cuando le da la gana. como yo',
    exif: { fecha: '21/07 · 23:08', lugar: 'Callejón sin nombre', disp: 'SUJOM Cam', tam: '1.8 MB' }
  },
  kenta_room: {
    of: 'kenta', scene: 'window',
    title: 'Mi sitio',
    caption: 'no es gran cosa pero es MÍO',
    exif: { fecha: '26/07 · 19:44', lugar: 'Apartamento 4B', disp: 'SUJOM Cam', tam: '1.2 MB' },
    anomaly: 'door',
    corruptExif: { fecha: '26/07 · 19:44', lugar: 'APT-4B (plantilla)', disp: 'SUJOM Cam', tam: '1.2 MB', extra: 'GEOMETRÍA: SECTOR C / CELDA 02' },
    corruptNote: 'A la izquierda hay una puerta que no da a ningún sitio. Tiene un teclado.'
  },
  kenta_paper: {
    of: 'kenta', scene: 'paper',
    title: 'Lo encontré en un cajón',
    caption: 'esto no es mío. no lo he escrito yo.',
    exif: { fecha: '—— ——', lugar: '—', disp: 'ASSIST/REG', tam: '2.9 MB', extra: 'FORM. INGRESO VOLUNTARIO · FIRMA: K—— (menor)' },
    corruptDefault: true
  },

  /* ---------------- LARA ---------------- */
  lara_momo: {
    of: 'lara', scene: 'dog',
    title: 'MOMO',
    caption: '¡¡se ha sentado solo!! nadie se lo ha pedido!!',
    exif: { fecha: '12/07 · 17:20', lugar: 'Parque Higashi', disp: 'SUJOM Cam', tam: '2.2 MB' }
  },
  lara_momo2: {
    of: 'lara', scene: 'dog',
    title: 'Momo otra vez',
    caption: 'perdón. otra. la última. mentira.',
    exif: { fecha: '16/07 · 18:02', lugar: 'Parque Higashi', disp: 'SUJOM Cam', tam: '2.0 MB' },
    anomaly: 'dup',
    corruptExif: { fecha: '16/07 · 18:02', lugar: 'Parque Higashi', disp: 'SUJOM Cam', tam: '2.0 MB', extra: 'HASH IDÉNTICO A lara_momo' },
    corruptNote: 'Es la misma foto. La misma. Cambia el pie, no la imagen.'
  },
  lara_outfit: {
    of: 'lara', scene: 'outfit',
    title: '¿Este o el otro?',
    caption: 'dime la verdad. LA VERDAD.',
    exif: { fecha: '18/07 · 09:40', lugar: 'Su cuarto', disp: 'SUJOM Cam', tam: '1.6 MB' }
  },
  lara_coffee: {
    of: 'lara', scene: 'coffee',
    title: 'Desayuno de campeona',
    caption: 'me he levantado a las 6. voluntariamente. estoy creciendo',
    exif: { fecha: '22/07 · 06:31', lugar: 'Cafetería Nube', disp: 'SUJOM Cam', tam: '1.3 MB' }
  },
  lara_fest: {
    of: 'lara', scene: 'fest',
    title: 'El festival',
    caption: 'los cuatro. tú también, aunque no salgas.',
    exif: { fecha: '29/07 · 21:15', lugar: 'Festival de verano', disp: 'SUJOM Cam', tam: '3.1 MB' }
  },
  lara_empty: {
    of: 'lara', scene: 'empty',
    title: '(sin título)',
    caption: 'yo no he mandado esto',
    exif: { fecha: '—— ——', lugar: '—— ——', disp: '—— ——', tam: '0 KB', extra: 'ARCHIVO VACÍO · GENERADO POR: CORE' },
    corruptDefault: true
  },
  lara_paper: {
    of: 'lara', scene: 'paper',
    title: 'Lo que firmaron',
    caption: '',
    exif: { fecha: '21/06/2024', lugar: '—', disp: 'ASSIST/LEGAL', tam: '4.1 MB', extra: 'CESIÓN DE TUTELA TEMPORAL · CONTRAPRESTACIÓN: 41.000.000' },
    corruptDefault: true
  },

  /* ---------------- REIKO ---------------- */
  reiko_office: {
    of: 'reiko', scene: 'office',
    title: 'Mi antigua mesa',
    caption: 'La conservo porque me recuerda que existió.',
    exif: { fecha: '14/07 · 08:00', lugar: 'Torre Ainsel, planta 9', disp: 'SUJOM Cam', tam: '1.9 MB' }
  },
  reiko_coffee: {
    of: 'reiko', scene: 'coffee',
    title: 'Las seis de la mañana',
    caption: 'La única hora del día que sigue siendo mía.',
    exif: { fecha: '20/07 · 06:00', lugar: 'Su casa', disp: 'SUJOM Cam', tam: '1.1 MB' }
  },
  reiko_city: {
    of: 'reiko', scene: 'city',
    title: 'Desde arriba',
    caption: 'Antes esto me parecía una promesa.',
    exif: { fecha: '25/07 · 23:30', lugar: 'Torre Ainsel', disp: 'SUJOM Cam', tam: '2.6 MB' },
    anomaly: 'nosun',
    corruptExif: { fecha: '25/07 · 23:30', lugar: 'Torre Ainsel', disp: 'SUJOM Cam', tam: '2.6 MB', extra: 'HORIZONTE: MALLA CERRADA — SIN EXTERIOR' },
    corruptNote: 'La ciudad se acaba. Detrás de la última torre no hay nada dibujado.'
  },
  reiko_paper: {
    of: 'reiko', scene: 'paper',
    title: 'El contrato',
    caption: 'Lo leí dos veces. Dos.',
    exif: { fecha: '09/09/2024', lugar: '—', disp: 'ASSIST/LEGAL', tam: '5.5 MB', extra: 'CLÁUSULA 14.2: CESIÓN DE REGISTRO NEUROCOGNITIVO' },
    corruptDefault: true
  },
  reiko_door: {
    of: 'reiko', scene: 'door',
    title: 'La puerta del pasillo',
    caption: 'Llevo tres días viendo esta puerta. Hoy tenía teclado.',
    exif: { fecha: '—— ——', lugar: 'SECTOR C', disp: 'ASSIST-CAM 07', tam: '2.2 MB', extra: 'ACCESO: 6 DÍGITOS' },
    corruptDefault: true
  },

  /* ---------------- GRUPO / SISTEMA ---------------- */
  group_fest: {
    of: 'lara', scene: 'fest',
    title: 'Los cuatro',
    caption: 'La primera foto de todos juntos.',
    exif: { fecha: '29/07 · 21:20', lugar: 'Festival de verano', disp: 'SUJOM Cam', tam: '3.4 MB' }
  },
  sys_chairs: {
    of: null, scene: 'lab',
    title: 'ARCHIVO NO CATALOGADO',
    caption: '',
    exif: { fecha: '—— ——', lugar: 'SECTOR C · SALA 2', disp: 'ASSIST-CAM 02', tam: '8.8 MB', extra: 'OCUPACIÓN: 4/4 · PROTOCOLO: LAZO DORADO' },
    corruptDefault: true,
    anomaly: 'figure'
  },
  sys_door: {
    of: null, scene: 'door',
    title: 'SALIDA C',
    caption: '',
    exif: { fecha: '—— ——', lugar: 'SECTOR C · SALIDA', disp: 'ASSIST-CAM 09', tam: '1.7 MB', extra: 'CIERRE: TECLADO 6 DÍG.' },
    corruptDefault: true
  }
};

export const PHOTO_IDS = Object.keys(PHOTOS);
