/* =========================================================
   characters.js — Datos del reparto.
   ---------------------------------------------------------
   Cada personaje declara:
     · su especificación de arte (el SVG se genera con esto)
     · su ficha inicial (lo que SUJOM te enseña el primer día)
     · sus "bits": trozos de ficha que se desbloquean al
       conocerle mejor. Algunos, más tarde, se contradicen.
   Añadir un quinto personaje es añadir una entrada aquí.
   ========================================================= */

export const CHARS = {
  /* ----------------------------------------------------- */
  ryu: {
    id: 'ryu',
    name: 'Ryu',
    age: 20,
    accent: '#4fd1c5',
    accentSoft: 'rgba(79,209,197,.16)',
    tagline: 'Contesta tarde. Contesta siempre.',
    // arte
    hair: '#20202c', hairStyle: 'ryu', eyes: '#4fd1c5', skin: '#f2d3b6',
    clothes: '#1f3d44', acc: 'cross', blush: '#e8798f',
    // ficha
    handle: '@ryu',
    role: 'Reparto',
    bio: 'Habla poco. Cuando habla, se le nota que lo ha pensado antes.',
    likes: ['Los fuegos artificiales'],
    dislikes: ['El ruido de la gente'],
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
    hidden: {
      subject: 'C-04',
      admitted: '14/11/2023'
    }
  },

  /* ----------------------------------------------------- */
  kenta: {
    id: 'kenta',
    name: 'Kenta',
    age: 18,
    accent: '#ff7a45',
    accentSoft: 'rgba(255,122,69,.16)',
    tagline: 'Te va a picar. Aguanta.',
    hair: '#3a2a24', hairStyle: 'kenta', streak: '#f5d98a', eyes: '#ffab5e', skin: '#f4cfae',
    clothes: '#3a2233', acc: 'studs', blush: '#ff7a5e',
    handle: '@kntx',
    role: 'Reparto',
    bio: 'Dice que no necesita a nadie. Escribe primero cada vez.',
    likes: ['Discutir'],
    dislikes: ['Que le digan lo que tiene que hacer'],
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

  /* ----------------------------------------------------- */
  lara: {
    id: 'lara',
    name: 'Lara',
    age: 21,
    accent: '#ff7fb6',
    accentSoft: 'rgba(255,127,182,.16)',
    tagline: 'Te va a mandar demasiadas fotos del perro.',
    hair: '#ff8fc0', hairStyle: 'lara', eyes: '#7fd88f', skin: '#f8dcc6',
    clothes: '#5a2a48', acc: 'clip', blush: '#ff6f9e',
    handle: '@laralala',
    role: 'Reparto',
    bio: 'Empieza todas las frases con una exclamación y las termina con una foto.',
    likes: ['Su perro, Momo'],
    dislikes: ['El silencio'],
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

  /* ----------------------------------------------------- */
  reiko: {
    id: 'reiko',
    name: 'Reiko',
    age: 25,
    accent: '#b28cff',
    accentSoft: 'rgba(178,140,255,.16)',
    tagline: 'Sabe exactamente lo que está haciendo. Casi siempre.',
    hair: '#ece8f5', hairStyle: 'reiko', eyes: '#c7a4ff', skin: '#f3d8c8',
    clothes: '#241d3d', acc: 'earrings', blush: '#d986b4',
    handle: '@reiko.a',
    role: 'Reparto',
    bio: 'Contesta con frases completas y puntuación correcta. Da un poco de miedo.',
    likes: ['El café a las seis de la mañana'],
    dislikes: ['Las promesas vagas'],
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

/* Pseudo-personaje para el chat grupal */
export const GROUP = {
  id: 'group',
  name: 'SUJOM · Sala común',
  accent: '#f0c674',
  accentSoft: 'rgba(240,198,116,.16)',
  tagline: 'Los cuatro. A la vez. Que la suerte te acompañe.'
};

/* Voz del sistema — ASSIST-CORE se hace pasar por la app */
export const CORE = {
  id: 'core',
  name: 'SUJOM',
  accent: '#5fe3ff'
};

export const CAST = ['ryu', 'kenta', 'lara', 'reiko'];

export function charName(id) {
  return CHARS[id]?.name || (id === 'group' ? GROUP.name : id);
}

/** Devuelve los bits visibles de una ficha, aplicando sustituciones. */
export function profileBits(id, unlocked) {
  const c = CHARS[id];
  if (!c) return [];
  const has = new Set(unlocked || []);
  const replaced = new Set();
  c.bits.forEach((b) => { if (has.has(b.id) && b.replaces) replaced.add(b.replaces); });
  return c.bits.filter((b) => has.has(b.id) && !replaced.has(b.id));
}
