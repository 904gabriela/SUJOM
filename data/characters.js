/* =========================================================
   characters.js — El reparto.
   ---------------------------------------------------------
   Cada personaje declara cuatro cosas:

   1. FICHA        nombre, edad, ocupación, gustos, bio.
   2. ARTE         cómo se dibuja. Si añades `art` con rutas
                   a tus imágenes, se usan las tuyas; si no,
                   se genera un retrato por código.
   3. ETAPAS       cómo describe la app vuestra relación
                   según lo cerca que estéis. Nada de "82% de
                   amor": una frase que cambia.
   4. BITS         trozos de ficha que se desbloquean al
                   conocerle. Algunos, más tarde, se
                   contradicen.

   Los identificadores de los `bits` los usa el guion. NO
   los renombres o el contenido dejará de encontrarlos.
   Todo lo demás se puede editar con total libertad.
   ========================================================= */

export const CHARS = {

  /* ===================================================== */
  ryu: {
    id: 'ryu',
    name: 'Ryu',
    age: 20,
    occupation: 'Trabajos temporales',
    handle: '@ryu',
    accent: '#7fd8e8',
    accentWash: 'rgba(127,216,232,.2)',
    tagline: 'Contesta tarde. Contesta siempre.',
    bio: 'No habla mucho de su pasado. Pero cuando confía en ti, se abre.',

    /* --- arte --- */
    hair: '#1c1a26', hairStyle: 'ryu', eyes: '#8fc7d4', skin: '#f2d3b6',
    clothes: '#232a38', acc: 'cross', blush: '#e8798f',
    // art: { avatar:'assets/characters/ryu/avatar.png',
    //        portrait:'assets/characters/ryu/portrait.png',
    //        real:'assets/characters/ryu/real.png' },

    /* --- cómo describe la app vuestra relación --- */
    stages: [
      'Apenas os conocéis.',
      'Contesta cuando le escribes. Ya es algo.',
      'Ha empezado a escribir él primero.',
      'Te cuenta cosas que no le cuenta a nadie.',
      'Espera despierto a que te conectes.',
      'Hay cosas que sólo existen porque tú te acuerdas de ellas.'
    ],

    likes: ['Los fuegos artificiales', 'Los días de lluvia'],
    dislikes: ['Los hospitales', 'Los sitios con mucha gente'],
    bits: [
      { id: 'like_quiet', type: 'like', text: 'Los sitios vacíos a las cuatro de la mañana' },
      { id: 'like_sister', type: 'like', text: 'Alguien de quien no habla' },
      { id: 'dis_hosp', type: 'dislike', text: 'Los hospitales' },
      { id: 'fact_cross', type: 'fact', text: 'Lleva una cruz al cuello. Era de su padre.' },
      { id: 'fact_jobs', type: 'fact', text: 'Antes de ASSIST aceptaba cualquier trabajo que le dieran.' },
      { id: 'fact_sister', type: 'fact', text: 'Tiene una hermana menor. Se llama Mei.' },
      { id: 'fact_smile', type: 'fact', text: 'Delante de ella siempre estaba de buen humor. Siempre.' },
      { id: 'fact_promise', type: 'fact', text: 'ASSIST le prometió que ella estaría bien.' },
      { id: 'wrong_sister', type: 'fact', text: 'Tiene una hermana menor. Se llama Mei.', wrong: true, replaces: 'fact_sister' },
      { id: 'fact_bills', type: 'fact', text: 'Alguien pagó facturas de hospital a su nombre en 2023.' }
    ],
    hidden: { subject: 'C-04', admitted: '14/11/2023' }
  },

  /* ===================================================== */
  kenta: {
    id: 'kenta',
    name: 'Kenta',
    age: 18,
    occupation: 'Vive solo. No pregunta de qué.',
    handle: '@kntx',
    accent: '#ff8a5c',
    accentWash: 'rgba(255,138,92,.2)',
    tagline: 'Te va a picar. Aguanta.',
    bio: 'Grosero, intenso y con una lengua rapidísima. Te va a gustar cómo te provoca.',

    hair: '#e9e4ef', hairStyle: 'kenta', streak: '#ffb37a', eyes: '#ff9a5e', skin: '#f4cfae',
    clothes: '#2b2233', acc: 'choker', blush: '#ff7a5e',
    // art: { avatar:'assets/characters/kenta/avatar.png', ... },

    stages: [
      'Te ha escrito para picarte. Es su forma de saludar.',
      'Discute contigo por deporte.',
      'Te escribe a las tres de la mañana y dice que es casualidad.',
      'Ha dejado de fingir que no le importas.',
      'Se pone nervioso cuando tardas en contestar.',
      'Eres el único sitio donde no tiene que ser nadie.'
    ],

    likes: ['Discutir', 'Las tiendas abiertas de madrugada'],
    dislikes: ['Que le digan lo que tiene que hacer', 'Que le tengan lástima'],
    bits: [
      { id: 'like_night', type: 'like', text: 'Las tiendas abiertas de madrugada' },
      { id: 'like_ramen', type: 'like', text: 'El ramen instantáneo de la esquina' },
      { id: 'dis_pity', type: 'dislike', text: 'Que le tengan lástima' },
      { id: 'dis_home', type: 'dislike', text: 'La palabra "casa"' },
      { id: 'fact_left', type: 'fact', text: 'Se fue de casa a los diecisiete.' },
      { id: 'fact_strict', type: 'fact', text: 'Su familia le quiere. Y no le deja respirar.' },
      { id: 'fact_alone', type: 'fact', text: 'Vivir solo le salió mucho más caro de lo que pensaba.' },
      { id: 'fact_pride', type: 'fact', text: 'No vuelve porque volver sería darles la razón.' },
      { id: 'fact_offer', type: 'fact', text: 'ASSIST le ofreció un sitio donde nadie le juzgaría.' },
      { id: 'fact_bday', type: 'fact', text: 'Cumple años el 2 de febrero. No se lo ha dicho a nadie.' },
      { id: 'fact_waited', type: 'fact', text: 'Firmó el 3 de febrero. Le esperaron un día exacto para que la firma valiera.' }
    ],
    hidden: { subject: 'C-02', admitted: '03/02/2024' }
  },

  /* ===================================================== */
  lara: {
    id: 'lara',
    name: 'Lara',
    age: 21,
    occupation: 'Entre trabajos. Otra vez.',
    handle: '@laralala',
    accent: '#ffd166',
    accentWash: 'rgba(255,209,102,.2)',
    tagline: 'Te va a mandar demasiadas fotos del perro.',
    bio: 'Luminosa y con demasiada energía. Hace que cualquier día sea mejor.',

    hair: '#f2dca4', hairStyle: 'lara', eyes: '#7fd88f', skin: '#f8dcc6',
    clothes: '#2a2233', acc: 'bow', blush: '#ff6f9e',
    // art: { avatar:'assets/characters/lara/avatar.png', ... },

    stages: [
      'Te ha dado la bienvenida ella sola.',
      'Te escribe todos los días, contestes o no.',
      'Te cuenta los días malos, no sólo los buenos.',
      'Se calla contigo. Y ella nunca se calla.',
      'Te guarda las cosas buenas del día para contártelas.',
      'Ya no finge estar bien cuando no lo está.'
    ],

    likes: ['Su perro, Momo', 'Bailar en la cocina'],
    dislikes: ['El silencio', 'Comer sola'],
    bits: [
      { id: 'like_dance', type: 'like', text: 'Bailar en la cocina' },
      { id: 'like_sun', type: 'like', text: 'Las cinco de la tarde en verano' },
      { id: 'dis_alone', type: 'dislike', text: 'Comer sola' },
      { id: 'fact_momo', type: 'fact', text: 'Momo tiene siete años y una oreja rota.' },
      { id: 'fact_money', type: 'fact', text: 'Sus padres llevaban dos años sin dormir por las deudas.' },
      { id: 'fact_signed', type: 'fact', text: 'No firmó nada. Firmaron por ella.' },
      { id: 'fact_smile', type: 'fact', text: 'Se ríe más fuerte cuando algo le duele.' },
      { id: 'fact_chose', type: 'fact', text: 'Sabe exactamente cuánto valía. Vio la cifra.' },
      { id: 'wrong_momo', type: 'fact', text: 'Momo tiene siete años y una oreja rota.', wrong: true, replaces: 'fact_momo' }
    ],
    hidden: { subject: 'C-03', admitted: '21/06/2024' }
  },

  /* ===================================================== */
  reiko: {
    id: 'reiko',
    name: 'Reiko',
    age: 25,
    occupation: 'Fundadora. En pasado.',
    handle: '@reiko.a',
    accent: '#c9a9ff',
    accentWash: 'rgba(201,169,255,.2)',
    tagline: 'Sabe exactamente lo que hace. Casi siempre.',
    bio: 'Elegante, brillante y con una seguridad que da un poco de envidia.',

    hair: '#ece8f5', hairStyle: 'reiko', eyes: '#c7a4ff', skin: '#f3d8c8',
    clothes: '#241d3d', acc: 'earrings', blush: '#d986b4',
    // art: { avatar:'assets/characters/reiko/avatar.png', ... },

    stages: [
      'Te trata de usted sin darse cuenta.',
      'Te ha propuesto un trato para no hablar de nada personal.',
      'Ha roto ella misma el trato.',
      'Te escribe a las seis de la mañana sin motivo.',
      'Te ha confiado la parte de su memoria que no controla.',
      'Se apoya en ti, y lleva un año sin apoyarse en nadie.'
    ],

    likes: ['El café a las seis de la mañana', 'Los edificios sin reformar'],
    dislikes: ['Las promesas vagas', 'Que la traten como a un apellido'],
    bits: [
      { id: 'like_rain', type: 'like', text: 'Las reuniones que se cancelan por lluvia' },
      { id: 'like_old', type: 'like', text: 'Los edificios que nadie ha reformado' },
      { id: 'dis_pity2', type: 'dislike', text: 'Que la traten como a un apellido' },
      { id: 'fact_company', type: 'fact', text: 'Montó su empresa a los veintidós, sin dinero de su familia.' },
      { id: 'fact_fraud', type: 'fact', text: 'Tres personas de su equipo la vaciaron en once meses.' },
      { id: 'fact_name', type: 'fact', text: 'Su nombre salió en la prensa antes que el de ellos.' },
      { id: 'fact_offer', type: 'fact', text: 'ASSIST se ofreció a "reparar su imagen pública".' },
      { id: 'fact_read', type: 'fact', text: 'Leyó el contrato entero. Dos veces. Aun así lo firmó.' },
      { id: 'fact_gap', type: 'fact', text: 'Hay once meses de su vida que no puede reconstruir.' }
    ],
    hidden: { subject: 'C-05', admitted: '09/09/2024' }
  }
};

/* Sala común: se comporta como un contacto más en la interfaz. */
export const GROUP = {
  id: 'group',
  name: 'Sala común',
  accent: '#ff87bd',
  accentWash: 'rgba(255,135,189,.2)',
  tagline: 'Los cuatro a la vez. Suerte.'
};

/* La voz del sistema. Se hace pasar por la propia aplicación. */
export const CORE = { id: 'core', name: 'ASSIST', accent: '#5fd8ff' };

export const CAST = ['ryu', 'kenta', 'lara', 'reiko'];

export function charName(id) {
  return CHARS[id]?.name || (id === 'group' ? GROUP.name : id);
}

/** Bits visibles de una ficha, aplicando las sustituciones. */
export function profileBits(id, unlocked) {
  const c = CHARS[id];
  if (!c) return [];
  const has = new Set(unlocked || []);
  const replaced = new Set();
  c.bits.forEach((b) => { if (has.has(b.id) && b.replaces) replaced.add(b.replaces); });
  return c.bits.filter((b) => has.has(b.id) && !replaced.has(b.id));
}

/** Frase de relación según el nivel de vínculo (0-5). */
export function stageText(id, level) {
  const c = CHARS[id];
  if (!c?.stages) return '';
  return c.stages[Math.max(0, Math.min(c.stages.length - 1, level))];
}
