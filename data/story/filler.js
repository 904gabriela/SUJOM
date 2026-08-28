/* =========================================================
   filler.js — "Hablar un rato".
   ---------------------------------------------------------
   Una conversación corta y repetible por personaje.
   Cumple dos funciones:

   1. Narrativa: es una app de citas. Siempre puedes escribir
      a alguien porque sí. Sin drama, sin trama, sin pistas.
   2. De diseño: impide que la partida se atasque. Si al
      jugador le faltan tres puntos de confianza para la
      siguiente conversación importante, puede ganárselos
      hablando, que es exactamente lo que haría una persona.

   El contenido cambia según lo cerca que estéis, y se calla
   cuando la ruta ya ha terminado.
   ========================================================= */

const repeatable = (id) => ({ reopen: id });

export const FILLER = [

/* ------------------------------------------------ RYU --- */
{
  id: 'ryu_talk',
  channel: 'dm', char: 'ryu',
  title: 'Hablar un rato',
  day: 1, time: '23:00',
  phase: 1, mood: 'tender',
  requires: { done: ['ryu01'], notDone: ['ryu09'] },
  preview: '¿Estás despierta?',
  script: [
    {
      if: { stat: { ryu: { affinity: 30 } } },
      then: [
        { s: 'ryu', t: 'No quería nada.' },
        { s: 'ryu', t: 'Eso es mentira. Quería hablar contigo.' },
        { s: 'ryu', t: 'Me está costando menos decirlo. No sé si eso es bueno.', expr: 'embarrassed' }
      ],
      else: [
        { s: 'ryu', t: '¿Estás despierta?' },
        { s: 'ryu', t: 'No pasa nada si no. Yo escribo igual.' }
      ]
    },
    {
      choice: [
        { t: '¿Qué estás haciendo?', echo: '¿Qué estás haciendo?',
          fx: { ryu: { affinity: 2, trust: 2 } }, then: [
          { s: 'ryu', t: 'Mirar el techo.' },
          { s: 'ryu', t: 'Llevo cuarenta minutos. Es más entretenido de lo que parece.' },
          { s: 'ryu', t: 'Mentira. Es horrible. Por eso te he escrito.' }
        ]},
        { t: 'Cuéntame algo que no sepa de ti.', echo: 'Cuéntame algo que no sepa de ti.',
          fx: { ryu: { trust: 3, affinity: 1 } }, then: [
          { s: 'ryu', t: 'No sé silbar.' },
          { s: 'ryu', t: 'Lo he intentado toda mi vida. Nada.' },
          { s: 'ryu', t: 'Es lo único que tengo. Te lo he dado. Ya no me queda nada.', expr: 'happy' }
        ]},
        { t: 'Nada. Sólo quería saludarte.', echo: 'Nada. Sólo quería saludarte.',
          fx: { ryu: { affinity: 2 } }, then: [
          { wait: 1400 },
          { s: 'ryu', t: 'Vale.' },
          { s: 'ryu', t: 'Eso ha estado bien.' },
          { s: 'ryu', t: 'Nadie me saluda porque sí.', expr: 'vulnerable' }
        ]}
      ]
    },
    { s: 'ryu', t: 'Duerme algo. Va en serio.' },
    { fx: { ryu: { affinity: 1, trust: 1 } } },
    repeatable('ryu_talk')
  ],
  advance: 15
},

/* ---------------------------------------------- KENTA --- */
{
  id: 'kenta_talk',
  channel: 'dm', char: 'kenta',
  title: 'Hablar un rato',
  day: 1, time: '23:30',
  phase: 1, mood: 'warm',
  requires: { done: ['kenta01'], notDone: ['kenta09'] },
  preview: 'oye. estoy aburrido. entretenme.',
  script: [
    {
      if: { stat: { kenta: { affinity: 30 } } },
      then: [
        { s: 'kenta', t: 'no te he escrito porque te echara de menos' },
        { s: 'kenta', t: 'te he escrito porque estoy aburrido' },
        { wait: 1200 },
        { s: 'kenta', t: 'vale las dos cosas', expr: 'embarrassed' }
      ],
      else: [
        { s: 'kenta', t: 'oye' },
        { s: 'kenta', t: 'estoy aburrido. entretenme.' }
      ]
    },
    {
      choice: [
        { t: 'Entretente tú.', echo: 'Entretente tú.',
          fx: { kenta: { affinity: 3 } }, then: [
          { s: 'kenta', t: 'JA' },
          { s: 'kenta', t: 'por eso me caes bien' },
          { s: 'kenta', t: 'los demás me siguen la corriente y es insoportable' }
        ]},
        { t: 'Dime una cosa que odies.', echo: 'Dime una cosa que odies.',
          fx: { kenta: { trust: 3, affinity: 1 } }, then: [
          { s: 'kenta', t: 'la gente que dice "es lo que hay"' },
          { s: 'kenta', t: 'no. no es lo que hay. es lo que os habéis conformado con que haya.' },
          { s: 'kenta', t: 'perdón. me he puesto intenso por una frase hecha.' }
        ]},
        { t: '¿Has comido algo hoy?', echo: '¿Has comido algo hoy?',
          fx: { kenta: { affinity: 2, trust: 3 } }, then: [
          { wait: 1400 },
          { s: 'kenta', t: 'sí' },
          { s: 'kenta', t: '…hace rato' },
          { s: 'kenta', t: 'vale voy a comer algo. deja de mirarme así.' },
          { s: 'kenta', t: 'sé que no me estás mirando. me da igual. lo noto.', expr: 'embarrassed' }
        ]}
      ]
    },
    { s: 'kenta', t: 'bueno. me voy. no te acostumbres a esto.' },
    { fx: { kenta: { affinity: 1, trust: 1 } } },
    repeatable('kenta_talk')
  ],
  advance: 15
},

/* ----------------------------------------------- LARA --- */
{
  id: 'lara_talk',
  channel: 'dm', char: 'lara',
  title: 'Hablar un rato',
  day: 1, time: '22:00',
  phase: 1, mood: 'warm',
  requires: { done: ['lara01'], notDone: ['lara09'] },
  preview: '¡¡tres cosas buenas de hoy!! te toca',
  script: [
    {
      if: { stat: { lara: { affinity: 30 } } },
      then: [
        { s: 'lara', t: 'hola 💗' },
        { s: 'lara', t: 'no quiero nada' },
        { s: 'lara', t: 'bueno sí. quiero hablar contigo. eso es querer algo.' }
      ],
      else: [
        { s: 'lara', t: '¡¡tres cosas buenas de hoy!!' },
        { s: 'lara', t: 'es un juego. lo hago todos los días. te toca.' }
      ]
    },
    {
      choice: [
        { t: 'Empieza tú.', echo: 'Empieza tú.',
          fx: { lara: { affinity: 3 } }, then: [
          { s: 'lara', t: 'UNO: el sol de las cinco' },
          { s: 'lara', t: 'DOS: momo ha estornudado y se ha asustado de sí mismo' },
          { s: 'lara', t: 'TRES: tú', expr: 'happy' },
          { s: 'lara', t: 'no te lo tomes a mal. la tres es siempre alguien.' },
          { s: 'lara', t: 'hoy has sido tú. ya está. sigo.' }
        ]},
        { t: 'Hoy no ha habido tres cosas buenas.', echo: 'Hoy no ha habido tres cosas buenas.',
          fx: { lara: { trust: 4, affinity: 1 } }, then: [
          { wait: 1600 },
          { s: 'lara', t: 'vale' },
          { s: 'lara', t: 'entonces una' },
          { s: 'lara', t: 'una vale. una cuenta igual.' },
          { s: 'lara', t: 'y si tampoco hay una, me lo dices y ya está.' },
          { s: 'lara', t: 'no hace falta que estés bien para hablar conmigo.', expr: 'vulnerable' }
        ]},
        { t: 'Tú, Momo y el sol de las cinco.', echo: 'Tú, Momo y el sol de las cinco.',
          fx: { lara: { affinity: 2 } }, then: [
          { s: 'lara', t: 'AY' },
          { s: 'lara', t: 'me has copiado la lista y me ha hecho una ilusión tremenda' },
          { s: 'lara', t: 'estoy sonriendo sola. otra vez.', expr: 'shy' }
        ]}
      ]
    },
    { s: 'lara', sticker: '💗' },
    { fx: { lara: { affinity: 1, trust: 1 } } },
    repeatable('lara_talk')
  ],
  advance: 15
},

/* ---------------------------------------------- REIKO --- */
{
  id: 'reiko_talk',
  channel: 'dm', char: 'reiko',
  title: 'Hablar un rato',
  day: 2, time: '06:30',
  phase: 1, mood: 'tender',
  requires: { done: ['reiko01'], notDone: ['reiko09'] },
  preview: 'Tengo café y treinta minutos. Aprovéchalos.',
  script: [
    {
      if: { stat: { reiko: { affinity: 30 } } },
      then: [
        { s: 'reiko', t: 'Te he escrito sin tener nada que decirte.' },
        { s: 'reiko', t: 'Es la tercera vez esta semana. Lo he contado.' },
        { s: 'reiko', t: 'Cuento cosas cuando estoy nerviosa.', expr: 'embarrassed' }
      ],
      else: [
        { s: 'reiko', t: 'Tengo café y treinta minutos.' },
        { s: 'reiko', t: 'Aprovéchalos.' }
      ]
    },
    {
      choice: [
        { t: '¿Qué harías si pudieras hacer cualquier cosa hoy?', echo: '¿Qué harías si pudieras hacer cualquier cosa hoy?',
          fx: { reiko: { affinity: 2, trust: 2 } }, then: [
          { s: 'reiko', t: 'Ir a una ferretería.' },
          { wait: 1200 },
          { s: 'reiko', t: 'No es una broma. Me encantan las ferreterías.' },
          { s: 'reiko', t: 'Todo tiene una función exacta y un nombre exacto. Es descansadísimo.' }
        ]},
        { t: 'Discúteme algo. Lo que sea.', echo: 'Discúteme algo. Lo que sea.',
          fx: { reiko: { affinity: 3 } }, then: [
          { s: 'reiko', t: 'Con mucho gusto.' },
          { s: 'reiko', t: 'La gente que dice que no tiene tiempo para leer sí tiene tiempo. Tiene prioridades.' },
          { s: 'reiko', t: 'Y no pasa nada por tener otras prioridades. Lo que me irrita es la coartada.', expr: 'smug' },
          { s: 'reiko', t: 'Ya está. Me he quedado a gusto. Gracias.' }
        ]},
        { t: '¿Has dormido?', echo: '¿Has dormido?',
          fx: { reiko: { trust: 4 } }, then: [
          { wait: 1400 },
          { s: 'reiko', t: 'Esa pregunta es desleal.' },
          { s: 'reiko', t: 'No. No he dormido.' },
          { s: 'reiko', t: 'Y no me apetece hablar de por qué, así que te lo dejo aquí y cambiamos de tema.', expr: 'tired' }
        ]}
      ]
    },
    { s: 'reiko', t: 'Se me han acabado los treinta minutos.' },
    { s: 'reiko', t: 'Miento. Me quedan doce. Pero prefiero irme con margen.' },
    { fx: { reiko: { affinity: 1, trust: 1 } } },
    repeatable('reiko_talk')
  ],
  advance: 15
}

];
