/* =========================================================
   calls.js — Videollamadas.
   ---------------------------------------------------------
   Quince segundos. Una por ruta. El jugador no puede
   iniciarlas: llegan cuando el personaje ya no aguanta más.
   Aquí es donde la persona pulida a la que llevas semanas
   escribiendo se cae, y debajo hay alguien de verdad.
   ========================================================= */

export const CALLS = {

  /* ------------------- RYU ------------------- */
  ryu_good: {
    char: 'ryu',
    mood: 'relief',
    kind: 'good',
    status: 'Llamada entrante',
    duration: 15200,
    lines: [
      { at: 400, t: '…¿me ves?' },
      { at: 2400, t: 'Perdona. La cámara va fatal. Y yo también.' },
      { at: 5000, t: 'Estoy en la calle, {name}. Estoy en la calle de verdad.' },
      { at: 8000, t: 'Llevo un año hablando contigo y no te había visto la cara nunca.' },
      { at: 11000, t: 'Te quiero. Ya está. Lo he dicho antes de que se corte.' },
      { at: 13600, t: 'Voy a buscar a Mei. Y luego voy a buscarte a ti.' }
    ],
    after: 'La llamada se corta. No por interferencia. Se ha quedado sin batería.'
  },

  ryu_bad: {
    char: 'ryu',
    mood: 'scared',
    kind: 'bad',
    status: 'Señal inestable',
    duration: 15400,
    lines: [
      { at: 300, t: '{name}. {name}, escúchame.' },
      { at: 2200, t: 'No he llegado. Estaban esperando en la escalera.', glitch: true },
      { at: 5000, t: 'Da igual. Da igual, escúchame, es importante.' },
      { at: 7400, t: 'Mei está bien. Eso era lo único que necesitaba saber.', glitch: true },
      { at: 10200, t: 'No fue culpa tuya. ¿Me oyes? No fue culpa tuya.' },
      { at: 12600, t: 'Búscame. Aunque no me acuerde de ti. Bús—', glitch: true }
    ],
    after: 'La llamada se ha cortado.\n\nRyu ya no aparece en tu lista de contactos.',
    sounds: ['machine', 'alarm']
  },

  /* ------------------- KENTA ------------------- */
  kenta_good: {
    char: 'kenta',
    mood: 'relief',
    kind: 'good',
    status: 'Llamada entrante',
    duration: 15200,
    lines: [
      { at: 300, t: 'no me mires, estoy horrible' },
      { at: 2000, t: 'es coña. mírame. mírame todo lo que quieras.' },
      { at: 4600, t: 'estoy en la puerta de un konbini a las cinco de la mañana' },
      { at: 7400, t: 'y hay un tío dentro mirándome raro y me da IGUAL' },
      { at: 10200, t: '{name}. lo he hecho. he salido.' },
      { at: 12800, t: 'ahora dime hacia dónde tiro. lo dijiste. dilo otra vez.' }
    ],
    after: 'La llamada se corta cuando alguien, fuera de plano, le pregunta si está bien.'
  },

  kenta_bad: {
    char: 'kenta',
    mood: 'scared',
    kind: 'bad',
    status: 'Señal inestable',
    duration: 15400,
    lines: [
      { at: 300, t: 'no cuelgues. no cuelgues, ¿vale?' },
      { at: 2400, t: 'me han cogido en el pasillo. son cuatro.', glitch: true },
      { at: 5200, t: 'oye. oye, mírame.' },
      { at: 7000, t: 'yo nunca le he dicho a nadie que le necesitaba.' },
      { at: 9600, t: 'te lo digo a ti. te necesito. ya está. ya lo he dicho.', glitch: true },
      { at: 12400, t: 'y si me borran esto, tú acuérdate por mí. ACUÉRDATE POR—', glitch: true }
    ],
    after: 'La llamada se ha cortado.\n\nEl chat de Kenta sigue ahí. Su último mensaje es de hace once minutos.',
    sounds: ['alarm', 'machine']
  },

  /* ------------------- LARA ------------------- */
  lara_good: {
    char: 'lara',
    mood: 'relief',
    kind: 'good',
    status: 'Llamada entrante',
    duration: 15400,
    lines: [
      { at: 300, t: '¡¡hola!! ¡¡hola, hola!!' },
      { at: 2000, t: 'perdona que esté llorando, es que no puedo parar' },
      { at: 4400, t: 'mira. MIRA.' },
      { at: 6200, t: '(gira la cámara: un perro con media oreja, sentado en la acera)' },
      { at: 9400, t: 'estaba esperándome. no sé cómo. estaba esperándome.' },
      { at: 12400, t: '{name}, gracias por no agarrarte a la calceta.' }
    ],
    after: 'La llamada se corta sola.\n\nLa última imagen es Lara abrazada a un perro, en una acera, de madrugada.'
  },

  lara_bad: {
    char: 'lara',
    mood: 'scared',
    kind: 'bad',
    status: 'Señal inestable',
    duration: 15400,
    lines: [
      { at: 300, t: 'hola 😊' },
      { at: 1800, t: 'perdona. me sale la sonrisa. no puedo quitármela.', glitch: true },
      { at: 4400, t: 'están aquí. ya están aquí, están al lado.' },
      { at: 6800, t: 'escúchame rápido: yo no me lo inventé. momo existe.' },
      { at: 9600, t: 'y tú tampoco te lo has inventado. esto era de verdad.', glitch: true },
      { at: 12600, t: 'acuérdate de mí enfadada. no de mí conte—', glitch: true }
    ],
    after: 'La llamada se ha cortado.\n\nEn tu galería, todas las fotos de Momo son ahora la misma foto.',
    sounds: ['machine', 'alarm']
  },

  /* ------------------- REIKO ------------------- */
  reiko_good: {
    char: 'reiko',
    mood: 'relief',
    kind: 'good',
    status: 'Llamada entrante',
    duration: 15400,
    lines: [
      { at: 300, t: 'Estoy espantosa. No comentes nada.' },
      { at: 2400, t: 'Llevo cuarenta páginas debajo del brazo y un año sin lavarme el pelo.' },
      { at: 5400, t: 'Hay una carretera detrás de mí. ¿La ves? Sigue.' },
      { at: 8200, t: 'Sigue hasta un sitio que no ha diseñado nadie.' },
      { at: 10800, t: '{name}. Te lo digo ahora porque después seré cobarde:' },
      { at: 13000, t: 'me has hecho ser alguien concreto. Gracias.' }
    ],
    after: 'La llamada se corta cuando aparecen unas luces azules al fondo de la carretera.\n\nEsta vez son de los buenos.'
  },

  reiko_bad: {
    char: 'reiko',
    mood: 'scared',
    kind: 'bad',
    status: 'Señal inestable',
    duration: 15600,
    lines: [
      { at: 300, t: 'Escucha. Sin interrupciones. Tengo poco tiempo.' },
      { at: 2600, t: 'Cuarenta páginas, sillón tres, debajo del asiento.', glitch: true },
      { at: 5200, t: 'Si alguna vez alguien entra aquí, están ahí.' },
      { at: 7600, t: 'Fechas, horas, nombres. Todo verificable.' },
      { at: 10000, t: 'Y una última página que no es prueba de nada.', glitch: true },
      { at: 12600, t: 'Es para ti. Léela cuando yo ya no sepa quién er—', glitch: true }
    ],
    after: 'La llamada se ha cortado.\n\nEl perfil de Reiko marca: SUJETO ESTABLE.',
    sounds: ['machine', 'alarm']
  },

  /* ------------------- RUTA SECRETA ------------------- */
  secret_all: {
    char: 'ryu',
    mood: 'relief',
    kind: 'good',
    status: 'Llamada grupal',
    duration: 17000,
    lines: [
      { at: 300, t: '(Ryu) Estamos los cuatro. Todos fuera.' },
      { at: 3000, t: '(Kenta) hay como veinte coches de policía. VEINTE.' },
      { at: 5800, t: '(Lara) ¡¡y una ambulancia!! ¡¡y nos han dado mantas!!' },
      { at: 8600, t: '(Reiko) He entregado las cuarenta páginas. Las han fotocopiado dos veces.' },
      { at: 11400, t: '(Ryu) {name}. Diles dónde estás.' },
      { at: 13800, t: '(Reiko) Vamos a ir a buscarte. Los cuatro.' },
      { at: 15600, t: '(Kenta) no te muevas de donde estés. es una orden.' }
    ],
    after: 'La llamada no se corta.\n\nSe queda ahí, con los cuatro hablando a la vez, hasta que la cierras tú.'
  }
};
