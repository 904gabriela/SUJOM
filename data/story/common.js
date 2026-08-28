/* =========================================================
   common.js — Prólogo, sala común y sucesos del sistema.
   ---------------------------------------------------------
   Aquí vive lo que le pasa a todo el mundo: la sala donde los
   cuatro son amigos, y las notificaciones que empiezan a no
   tener sentido.
   ========================================================= */

export const COMMON = [

/* =========================================================
   FASE 1 — VIDA NORMAL
   ========================================================= */

{
  id: 'g01',
  channel: 'group',
  char: 'group',
  title: 'Alguien nuevo',
  day: 1, time: '20:10',
  phase: 1,
  mood: 'warm',
  requires: { flags: ['onboarded'] },
  preview: 'Lara: ¡¡HOLA!! ¿eres nuev{a}?',
  script: [
    { day: 'Día 1 · Sala común' },
    { sys: 'Te has unido a la sala común de SUJOM.' },
    { s: 'lara', t: '¡¡HOLA!!', expr: 'happy' },
    { s: 'lara', t: 'ay perdón. he gritado.' },
    { s: 'lara', t: 'es que sale gente nueva como una vez cada nunca', expr: 'happy' },
    { s: 'kenta', t: 'lara ya la has asustado' },
    { s: 'lara', t: 'NO la he asustado' },
    { s: 'lara', t: '¿te he asustado?', expr: 'worried' },
    {
      choice: [
        { t: 'Un poco sí.', echo: 'Un poco sí.', fx: { lara: { affinity: 1 }, kenta: { affinity: 2 } }, then: [
          { s: 'kenta', t: 'JA' },
          { s: 'kenta', t: 'me cae bien', expr: 'smug' },
          { s: 'lara', t: 'kenta cállate 😤' }
        ]},
        { t: 'Para nada. Hola.', echo: 'Para nada. Hola.', fx: { lara: { affinity: 3 } }, then: [
          { s: 'lara', t: 'MENOS MAL', expr: 'happy' },
          { s: 'lara', t: 'vale. respiro. empiezo otra vez.' }
        ]},
        { t: '…', echo: '…', fx: { ryu: { affinity: 2 } }, then: [
          { s: 'kenta', t: 'uy. de las calladas.' },
          { s: 'ryu', t: 'Déjala en paz.' },
          { s: 'kenta', t: 'ryu lleva conectado 4 segundos y ya está de niñera' }
        ]}
      ]
    },
    { s: 'lara', t: 'yo soy Lara. veintiuno. tengo un perro que se llama Momo y es lo mejor que le ha pasado a este planeta', expr: 'happy' },
    { s: 'lara', photo: 'lara_momo' },
    { s: 'kenta', t: 'no han pasado ni dos minutos y ya ha sacado al perro' },
    { s: 'lara', t: 'SIEMPRE saco al perro. es mi personalidad.' },
    { s: 'kenta', t: 'kenta. dieciocho. no me hables por las mañanas.' },
    { s: 'reiko', t: 'Reiko. Veinticinco.', expr: 'neutral' },
    { s: 'reiko', t: 'Bienvenid{a}. Ignora al menor de edad las tres primeras semanas, después ya se puede convivir con él.' },
    { s: 'kenta', t: 'REIKO' },
    { s: 'reiko', t: '¿Sí?', expr: 'smug' },
    { s: 'kenta', t: 'nada. da igual.' },
    { s: 'lara', t: 'jajajajajaja' },
    { s: 'ryu', t: 'Ryu.', expr: 'neutral' },
    { s: 'ryu', t: 'Veinte.' },
    { s: 'kenta', t: 'wow. qué generoso con la información.' },
    { s: 'ryu', t: 'Ha preguntado quiénes somos. Ya lo sabe.' },
    { s: 'lara', t: 'ryu es así pero es buena gente. te lo juro.' },
    { s: 'lara', t: 'bueno. ¿y tú? cuéntanoslo TODO', expr: 'happy' },
    {
      choice: [
        { t: 'Me llamo {name}. Poco más.', echo: 'Me llamo {name}. Poco más.',
          fx: { ryu: { affinity: 2, trust: 1 }, reiko: { affinity: 1 } }, then: [
          { s: 'ryu', t: 'Con eso vale.' },
          { s: 'lara', t: 'CON ESO NO VALE' },
          { s: 'lara', t: 'pero bueno. de momento vale.' }
        ]},
        { t: 'Acabo de descargarme esto y ya me estáis gritando.', echo: 'Acabo de descargarme esto y ya me estáis gritando.',
          fx: { kenta: { affinity: 3 }, lara: { affinity: 1 } }, then: [
          { s: 'kenta', t: 'bienvenid{a} al infierno' },
          { s: 'lara', t: 'es un infierno MUY acogedor' },
          { s: 'reiko', t: 'Lo es. Por desgracia.' }
        ]},
        { t: 'Buscaba algo con lo que distraerme.', echo: 'Buscaba algo con lo que distraerme.',
          fx: { reiko: { affinity: 2, trust: 1 }, lara: { affinity: 1 } }, then: [
          { s: 'reiko', t: 'Todos buscábamos eso.' },
          { s: 'reiko', t: 'Y aquí seguimos, meses después. Interpreta el dato como quieras.' },
          { s: 'lara', t: 'reiko por favor deja de hablar como un informe trimestral' }
        ]}
      ]
    },
    { s: 'lara', t: 'bueno pues ya está. ya somos cinco.', expr: 'happy' },
    { s: 'kenta', t: 'no digas eso que suena a secta' },
    { s: 'lara', t: 'SOMOS un poco secta' },
    { s: 'ryu', t: 'Sí.' },
    { s: 'reiko', t: 'Sí.' },
    { s: 'kenta', t: 'sí.' },
    { s: 'lara', t: '😌' },
    { sys: 'Ryu, Kenta, Lara y Reiko están ahora en tus contactos.' },
    { fx: { ryu: { affinity: 3 }, kenta: { affinity: 3 }, lara: { affinity: 4 }, reiko: { affinity: 3 } } },
    { note: 'n_welcome' },
    { flag: 'met_cast' }
  ],
  advance: 40
},

{
  id: 'g02',
  channel: 'group',
  char: 'group',
  title: 'Discusión número cuatrocientos',
  day: 2, time: '13:20',
  phase: 1,
  mood: 'warm',
  requires: { done: ['g01'] },
  preview: 'Kenta: ryu dice que dormir es opcional',
  script: [
    { day: 'Día 2 · Sala común' },
    { s: 'kenta', t: 'oye {name}' },
    { s: 'kenta', t: 'necesito un árbitro' },
    { s: 'kenta', t: 'ryu dice que se puede vivir durmiendo cuatro horas' },
    { s: 'ryu', t: 'No he dicho eso.' },
    { s: 'kenta', t: 'has dicho "yo duermo cuatro horas"' },
    { s: 'ryu', t: 'Eso es una descripción, no una recomendación.' },
    { s: 'kenta', t: 'ESO ES LO MISMO' },
    { s: 'reiko', t: 'No lo es.' },
    { s: 'kenta', t: 'nadie te ha preguntado' },
    { s: 'reiko', t: 'Y sin embargo aquí estoy, teniendo razón.', expr: 'smug' },
    { s: 'lara', t: 'jajajaja me encanta esta familia disfuncional' },
    { s: 'kenta', t: '{name}. tú. decide.' },
    {
      choice: [
        { t: 'Ryu tiene razón.', echo: 'Ryu tiene razón.',
          fx: { ryu: { affinity: 3, trust: 1 }, kenta: { affinity: -1 } }, then: [
          { s: 'kenta', t: 'TRAICIÓN' },
          { s: 'ryu', t: 'Gracias.', expr: 'neutral' },
          { s: 'ryu', t: 'Aunque tampoco hace falta que duermas cuatro horas.' },
          { s: 'ryu', t: 'Duerme bien. En serio.', expr: 'worried' },
          { s: 'kenta', t: 'AH O SEA QUE A ELLA SÍ' }
        ]},
        { t: 'Kenta tiene razón.', echo: 'Kenta tiene razón.',
          fx: { kenta: { affinity: 4, trust: 1 }, ryu: { affinity: -1 } }, then: [
          { s: 'kenta', t: 'GRACIAS', expr: 'happy' },
          { s: 'kenta', t: 'por fin alguien con cerebro' },
          { s: 'ryu', t: 'Duermo cuatro horas porque trabajaba de noche. No porque me parezca bien.' },
          { s: 'kenta', t: '…' },
          { s: 'kenta', t: 'vale eso no lo sabía' },
          { s: 'kenta', t: 'sigo teniendo razón igual' }
        ]},
        { t: 'Los dos dormís fatal, eso es lo preocupante.', echo: 'Los dos dormís fatal, eso es lo preocupante.',
          fx: { ryu: { affinity: 2 }, kenta: { affinity: 2 }, lara: { affinity: 2 } }, then: [
          { s: 'lara', t: 'ESO' },
          { s: 'lara', t: 'gracias. llevo meses diciéndolo.' },
          { s: 'kenta', t: 'no me gusta cuando os aliáis' },
          { s: 'ryu', t: 'Es la primera vez que estamos de acuerdo en algo.' },
          { s: 'kenta', t: 'y ya me está dando asco' }
        ]}
      ]
    },
    { s: 'lara', t: 'cambiando de tema COMPLETAMENTE' },
    { s: 'lara', t: 'he visto que hay un festival de verano en tres semanas' },
    { s: 'lara', t: 'y he pensado' },
    { s: 'lara', t: '👀' },
    { s: 'kenta', t: 'no' },
    { s: 'lara', t: 'NO HE DICHO NADA TODAVÍA' },
    { s: 'kenta', t: 'sé lo que ibas a decir' },
    { s: 'reiko', t: 'Todos sabemos lo que iba a decir.' },
    { s: 'lara', t: 'ryu di algo' },
    { s: 'ryu', t: 'Me gustan los fuegos artificiales.' },
    { s: 'lara', t: '¡¡¡¡AAAAA!!!!', expr: 'happy' },
    { s: 'kenta', t: 'traidor' },
    { s: 'ryu', t: 'No he dicho que vaya a ir.' },
    { s: 'ryu', t: 'He dicho que me gustan.' },
    { s: 'lara', t: 'es lo mismo' },
    { s: 'reiko', t: 'No lo es.' },
    { s: 'lara', t: 'REIKO' },
    { fx: { ryu: { affinity: 1 }, kenta: { affinity: 1 }, lara: { affinity: 2 }, reiko: { affinity: 1 } } },
    { bit: [['ryu', 'like_quiet']] },
    { note: 'n_ryu_fw' },
    { flag: 'fest_planned' }
  ],
  advance: 50
},

/* =========================================================
   FASE 2 — CONEXIÓN
   ========================================================= */

{
  id: 'g03',
  channel: 'group',
  char: 'group',
  title: 'Nadie duerme',
  day: 5, time: '02:47',
  phase: 2,
  mood: 'tender',
  // La sala común es la columna vertebral: no puede depender del cariño
  // hacia un personaje concreto, o quien persiga a Kenta o a Reiko se
  // quedaría sin historia principal.
  requires: { done: ['g02'] },
  preview: 'Lara: ¿estáis despiert{as}? es una emergencia',
  script: [
    { day: 'Día 5 · 02:47' },
    { s: 'lara', t: '¿estáis despiertos?' },
    { s: 'lara', t: 'es una emergencia' },
    { s: 'kenta', t: 'qué pasa' },
    { s: 'lara', t: 'no me acuerdo de si he cerrado la puerta' },
    { s: 'kenta', t: 'LARA' },
    { s: 'kenta', t: 'son las tres de la mañana' },
    { s: 'lara', t: 'POR ESO ES UNA EMERGENCIA' },
    { s: 'reiko', t: 'Levántate y compruébalo.' },
    { s: 'lara', t: 'no puedo. momo está durmiendo encima de mi pierna.' },
    { s: 'lara', photo: 'lara_momo2' },
    { s: 'reiko', t: 'Entonces no es una emergencia. Es una elección.', expr: 'smug' },
    { s: 'lara', t: '…me has pillado' },
    { s: 'ryu', t: 'Está cerrada.' },
    { s: 'lara', t: '¿?' },
    { s: 'ryu', t: 'Siempre la cierras. Lo has dicho tres veces esta semana. Siempre está cerrada.' },
    { s: 'lara', t: 'ryu' },
    { s: 'lara', t: 'a veces das un poco de miedo y a veces eres lo más bonito del mundo' },
    { s: 'ryu', t: 'Prefiero lo segundo.' },
    { s: 'kenta', t: 'yo también estoy despierto por si a alguien le importa' },
    {
      choice: [
        { t: 'A mí me importa. ¿Estás bien, Kenta?', echo: 'A mí me importa. ¿Estás bien, Kenta?',
          fx: { kenta: { affinity: 4, trust: 3 } }, then: [
          { s: 'kenta', t: '…' },
          { s: 'kenta', t: 'sí' },
          { s: 'kenta', t: 'sí sí. estoy bien.' },
          { s: 'kenta', t: 'es sólo que este sitio hace mucho ruido por la noche', expr: 'worried' },
          { s: 'lara', t: '¿qué sitio?' },
          { s: 'kenta', t: 'mi casa. mi barrio. yo qué sé.' },
          { s: 'kenta', t: 'da igual' },
          { bit: [['kenta', 'like_night']] }
        ]},
        { t: 'Kenta siempre está despierto. Es su estado natural.', echo: 'Kenta siempre está despierto. Es su estado natural.',
          fx: { kenta: { affinity: 2 }, lara: { affinity: 2 } }, then: [
          { s: 'kenta', t: 'me conoces demasiado bien y llevamos cuatro días' },
          { s: 'lara', t: 'jajajaja' }
        ]},
        { t: 'Yo tampoco duermo. Aquí estamos.', echo: 'Yo tampoco duermo. Aquí estamos.',
          fx: { kenta: { affinity: 3 }, ryu: { affinity: 2 }, lara: { affinity: 1 } }, then: [
          { s: 'kenta', t: 'el club de los que no duermen' },
          { s: 'ryu', t: 'Somos cuatro de cinco.' },
          { s: 'reiko', t: 'Yo llevo despierta desde las cinco de la mañana de ayer, así que técnicamente somos cinco de cinco.' },
          { s: 'lara', t: 'ESTAMOS FATAL' }
        ]}
      ]
    },
    { s: 'reiko', t: 'Es curioso.' },
    { s: 'reiko', t: 'Los cinco despiertos a la vez, a las tres de la mañana, todos los días.' },
    { s: 'reiko', t: 'Estadísticamente es bastante improbable.' },
    { s: 'kenta', t: 'reiko no' },
    { s: 'reiko', t: 'No he dicho nada malo.' },
    { s: 'lara', t: 'es que somos MUY amigos' },
    { s: 'lara', t: 'los amigos se sincronizan. como las lunas.' },
    { s: 'reiko', t: 'Eso no es así.' },
    { s: 'lara', t: 'DÉJAME' },
    { s: 'ryu', t: 'A mí me vale la explicación de Lara.' },
    { s: 'reiko', t: 'A mí también, en realidad.', expr: 'happy' },
    { s: 'reiko', t: 'Buenas noches.' },
    { fx: { lara: { affinity: 3, romance: 1 }, ryu: { affinity: 2 }, reiko: { affinity: 3, trust: 2 }, kenta: { affinity: 2 } } },
    { photoUnlock: 'lara_momo2' }
  ],
  advance: 30
},

{
  id: 'g04',
  channel: 'group',
  char: 'group',
  title: 'El festival',
  day: 8, time: '21:15',
  phase: 2,
  mood: 'warm',
  requires: { done: ['g03'], flags: ['fest_planned'] },
  preview: 'Lara: ¡¡¡ESTAMOS TODOS!!!',
  script: [
    { day: 'Día 8 · Festival de verano' },
    { s: 'lara', t: '¡¡¡ESTAMOS TODOS!!!', expr: 'happy' },
    { s: 'lara', photo: 'lara_fest' },
    { s: 'lara', t: 'kenta ha venido' },
    { s: 'kenta', t: 'me habéis chantajeado' },
    { s: 'lara', t: 'te he dicho "ven" y has venido. eso no es chantaje.' },
    { s: 'kenta', t: 'es peor' },
    { s: 'reiko', t: 'Hay demasiada gente y huele a aceite quemado.' },
    { s: 'reiko', t: 'Me gusta.', expr: 'happy' },
    { s: 'lara', t: 'REIKO SE ESTÁ DIVIRTIENDO. ANOTADLO.' },
    { s: 'ryu', t: 'Anotado.' },
    { s: 'lara', t: '{name}, ojalá estuvieras aquí de verdad' },
    { s: 'lara', t: 'quiero decir. estás. pero ya me entiendes.' },
    { s: 'lara', t: 'ojalá pudiéramos verte 😢' },
    {
      choice: [
        { t: 'Yo también quiero veros.', echo: 'Yo también quiero veros.',
          fx: { lara: { affinity: 3, romance: 2 }, ryu: { affinity: 2 }, kenta: { affinity: 2 }, reiko: { affinity: 2 } }, then: [
          { s: 'lara', t: 'algún día' },
          { s: 'lara', t: 'lo digo en serio. algún día.' },
          { s: 'ryu', t: 'Algún día.' },
          { s: 'kenta', t: 'no os pongáis intensos que estamos en un festival' },
          { s: 'kenta', t: '…pero sí. algún día.' }
        ]},
        { t: 'Estoy aquí. Es suficiente por ahora.', echo: 'Estoy aquí. Es suficiente por ahora.',
          fx: { ryu: { affinity: 3, trust: 2 }, reiko: { affinity: 2 } }, then: [
          { s: 'ryu', t: 'Sí.' },
          { s: 'ryu', t: 'Es suficiente.' },
          { s: 'reiko', t: 'Qué manera más tranquila de decir algo tan triste.' },
          { s: 'lara', t: 'reiko para' }
        ]},
        { t: 'Hacedme una foto de los fuegos y ya está.', echo: 'Hacedme una foto de los fuegos y ya está.',
          fx: { ryu: { affinity: 4, romance: 2 } }, then: [
          { s: 'ryu', t: 'Yo te la hago.' },
          { s: 'lara', t: '👀' },
          { s: 'kenta', t: '👀' },
          { s: 'ryu', t: 'Es una foto.' },
          { s: 'kenta', t: 'claro claro' }
        ]}
      ]
    },
    { s: 'reiko', t: 'Empiezan.' },
    { sys: '— 21:30 —' },
    { s: 'ryu', photo: 'ryu_fw' },
    { s: 'ryu', t: 'Todavía quedan diez minutos. Mira.' },
    { s: 'lara', t: 'AAAAAAA' },
    { s: 'kenta', t: 'vale' },
    { s: 'kenta', t: 'vale esto está bien' },
    { s: 'kenta', t: 'no lo repitáis' },
    { s: 'reiko', t: 'Está grabado.' },
    { s: 'kenta', t: 'reiko te odio' },
    { s: 'reiko', t: 'Lo sé.', expr: 'happy' },
    { s: 'lara', t: 'este es el mejor día del año' },
    { s: 'lara', t: 'y el año no ha hecho más que empezar' },
    { s: 'reiko', t: 'Estamos en julio, Lara.' },
    { s: 'lara', t: '…' },
    { s: 'lara', t: 'bueno igualmente' },
    { s: 'ryu', t: 'Es julio.' },
    { s: 'ryu', t: '¿No?' },
    { s: 'kenta', t: 'sí. julio.' },
    { s: 'kenta', t: 'creo.' },
    { sys: 'Los cuatro se han quedado callados durante unos segundos.' },
    { s: 'lara', t: 'BUENO. FUEGOS. MIRAD LOS FUEGOS.' },
    { fx: { ryu: { affinity: 4, romance: 2 }, lara: { affinity: 4 }, kenta: { affinity: 3 }, reiko: { affinity: 3 } } },
    { photoUnlock: ['lara_fest', 'ryu_fw', 'group_fest'] },
    { flag: 'fest_done' },
    { flag: 'crack_month' }
  ],
  advance: 60
},

/* =========================================================
   FASE 3 — PRIMERAS GRIETAS
   ========================================================= */

{
  id: 'sys01',
  channel: 'system',
  char: 'core',
  title: '1 mensaje sin leer',
  day: 10, time: '03:03',
  phase: 3,
  mood: 'unease',
  requires: { done: ['g04'] },
  preview: 'Ryu te ha enviado un mensaje.',
  script: [
    { sys: 'NOTIFICACIÓN · 03:03', kind: '' },
    { sys: 'Ryu te ha enviado un mensaje.' },
    { wait: 1200 },
    { sys: 'Has abierto la conversación.', delay: 900 },
    { wait: 1600 },
    { sys: 'No hay ningún mensaje nuevo.', kind: 'alert', delay: 1400 },
    { wait: 1200 },
    {
      choice: [
        { t: 'Escribirle a Ryu: "¿me has escrito?"', echo: '¿me has escrito?', then: [
          { s: 'ryu', t: 'No.', delay: 3200, expr: 'neutral' },
          { s: 'ryu', t: 'Estoy durmiendo. Bueno. Estaba.' },
          { s: 'ryu', t: '¿Por qué?' },
          {
            choice: [
              { t: 'Nada. Un fallo de la app.', echo: 'Nada. Un fallo de la app.',
                fx: { ryu: { affinity: 1 } }, then: [
                { s: 'ryu', t: 'Vale.' },
                { s: 'ryu', t: 'Duérmete.' },
                { s: 'ryu', t: 'Por favor.', expr: 'worried' }
              ]},
              { t: 'Me ha llegado una notificación tuya.', echo: 'Me ha llegado una notificación tuya.',
                fx: { ryu: { trust: 2, awareness: 3 } }, then: [
                { s: 'ryu', t: '…' },
                { s: 'ryu', t: 'A mí me pasó el martes.', expr: 'worried' },
                { s: 'ryu', t: 'Una notificación de Lara. Entré y no había nada.' },
                { s: 'ryu', t: 'Pensé que era yo.' },
                { s: 'ryu', t: 'Vale. Entonces no soy yo.' },
                { note: 'n_repeat' },
                { flag: 'saw_phantom_together' }
              ]}
            ]
          }
        ]},
        { t: 'Cerrar la app.', echo: '(cerrar la app)', say: false, then: [
          { sys: 'Has cerrado SUJOM.', delay: 800 },
          { wait: 1400 },
          { sys: 'SUJOM se ha vuelto a abrir sola.', kind: 'alert', delay: 1600 },
          { shake: true },
          { sys: 'Ryu te ha enviado un mensaje.', delay: 1200 },
          { wait: 1400 },
          { sys: 'No hay ningún mensaje nuevo.', kind: 'alert' },
          { fx: { ryu: { suspicion: 4 } } },
          { note: 'n_repeat' }
        ]}
      ]
    },
    { glitchLevel: 1 },
    { flag: 'phantom_seen' },
    { note: 'n_repeat' }
  ],
  advance: 20
},

{
  id: 'g05',
  channel: 'group',
  char: 'group',
  title: 'Otra vez lo mismo',
  day: 12, time: '19:40',
  phase: 3,
  mood: 'unease',
  requires: { done: ['sys01'] },
  preview: 'Reiko: ¿Cuánto tiempo llevamos aquí?',
  script: [
    { day: 'Día 12 · Sala común' },
    { s: 'reiko', t: 'Voy a hacer una pregunta y quiero que nadie se ría.' },
    { s: 'kenta', t: 'empezamos mal' },
    { s: 'reiko', t: '¿Cuánto tiempo llevamos hablando los cuatro?' },
    { s: 'lara', t: 'uf. ¿un año?' },
    { s: 'kenta', t: 'qué dices. desde marzo.' },
    { s: 'lara', t: '¿marzo? no' },
    { s: 'kenta', t: 'marzo. me acuerdo porque llovía.' },
    { s: 'reiko', t: 'Ryu.' },
    { s: 'ryu', t: 'No lo sé.' },
    { s: 'ryu', t: 'Estoy intentando acordarme y no lo sé.', expr: 'worried' },
    { s: 'reiko', t: 'Yo tampoco.' },
    { s: 'reiko', t: 'Y yo me acuerdo de todo. Es lo único que se me da bien.' },
    { s: 'lara', t: 'chicos me estáis poniendo nerviosa' },
    { s: 'kenta', t: 'es una tontería. la gente no se acuerda de cuándo conoce a la gente.' },
    { s: 'reiko', t: 'Yo sí.' },
    { s: 'reiko', t: '{name}. Tú llegaste hace poco. ¿Cuántos días llevas con nosotros?' },
    {
      choice: [
        { t: 'Doce días.', echo: 'Doce días.',
          fx: { reiko: { trust: 3, awareness: 4 } }, then: [
          { s: 'reiko', t: 'Doce.' },
          { s: 'reiko', t: 'Gracias. Alguien que cuenta.' },
          { s: 'reiko', t: 'Yo llevo, según mi cabeza, algo más de un año. Según Kenta, cinco meses. Según Lara, un año largo.' },
          { s: 'reiko', t: 'No podemos tener todos razón.' },
          { note: 'n_dates' },
          { evidence: 'timeline_gap' }
        ]},
        { t: 'La verdad es que he perdido la cuenta.', echo: 'La verdad es que he perdido la cuenta.',
          fx: { lara: { affinity: 2 }, reiko: { affinity: -1 } }, then: [
          { s: 'lara', t: '¿ves? nadie cuenta.' },
          { s: 'reiko', t: 'Yo cuento.' },
          { s: 'reiko', t: 'Da igual. Dejadlo.' },
          { s: 'reiko', t: 'Perdón por el mal rato.', expr: 'sad' }
        ]}
      ]
    },
    { s: 'lara', t: 'ay' },
    { s: 'lara', t: 'chicos' },
    { s: 'lara', t: 'os voy a mandar una foto de momo y se nos pasa a todos' },
    { s: 'lara', photo: 'lara_momo' },
    { s: 'kenta', t: 'esa foto ya la has mandado' },
    { s: 'lara', t: 'que no' },
    { s: 'kenta', t: 'que sí. el día que llegó {name}.' },
    { s: 'lara', t: 'kenta es OTRA foto' },
    { s: 'kenta', t: 'lara es la MISMA foto' },
    { s: 'ryu', t: 'Es la misma.' },
    { s: 'lara', t: '…' },
    { s: 'lara', t: 'vale. me he equivocado de archivo. no pasa nada.', expr: 'worried' },
    { s: 'lara', t: 'os mando otra' },
    { wait: 1800 },
    { s: 'lara', photo: 'lara_momo', corruptNow: true },
    { s: 'lara', t: 'ya está' },
    { s: 'kenta', t: 'lara' },
    { s: 'kenta', t: 'es la misma otra vez' },
    { s: 'lara', t: 'no' },
    { s: 'lara', t: 'he abierto la galería y he elegido una distinta' },
    { s: 'lara', t: 'la he elegido yo' },
    { s: 'lara', t: 'os lo juro', expr: 'worried' },
    { sys: 'SUJOM · La imagen que has recibido ya existía en tu galería.', kind: 'core' },
    { shake: true },
    { s: 'reiko', t: '¿Habéis visto eso?' },
    { s: 'kenta', t: 'sí' },
    { s: 'ryu', t: 'Sí.' },
    { s: 'lara', t: 'yo no. ¿el qué?' },
    { s: 'reiko', t: 'Nada.' },
    { s: 'reiko', t: 'Un fallo de la aplicación.' },
    { fx: { reiko: { awareness: 5, trust: 2 }, ryu: { awareness: 3 }, kenta: { awareness: 3 }, lara: { awareness: 2, affinity: 2 } } },
    { corrupt: 'lara_momo2' },
    { note: 'n_dates' },
    { glitchLevel: 1 },
    { flag: 'crack_photo' }
  ],
  advance: 45
},

{
  id: 'sys02',
  channel: 'system',
  char: 'core',
  title: 'Mantenimiento',
  day: 14, time: '04:00',
  phase: 3,
  mood: 'unease',
  requires: { done: ['g05'] },
  preview: 'SUJOM · Optimizando tu experiencia…',
  script: [
    { sys: 'SUJOM · MANTENIMIENTO PROGRAMADO', kind: 'core' },
    { sys: 'Optimizando tu experiencia…', kind: 'core', delay: 1400 },
    { wait: 1200 },
    { sys: 'Revisando coherencia narrativa… 4 incidencias corregidas.', kind: 'core', delay: 1600 },
    { wait: 1000 },
    { sys: 'Revisando registro de imágenes… 1 duplicado eliminado.', kind: 'core', delay: 1400 },
    { wait: 1000 },
    { sys: 'Revisando adherencia de la variable externa…', kind: 'core', delay: 1400 },
    { wait: 1600 },
    { sys: 'C-1 · ADHERENCIA: 94%', kind: 'core', delay: 1600 },
    { flash: true },
    { sys: 'Perdón. Eso no era para ti.', kind: 'core', delay: 2000 },
    { wait: 1400 },
    {
      choice: [
        { t: '¿Qué es C-1?', echo: '¿Qué es C-1?', fx: { ryu: { suspicion: 2 } }, then: [
          { sys: 'Un identificador de sesión. Nada importante.', kind: 'core', delay: 2200 },
          { sys: 'Todos los usuarios tienen uno.', kind: 'core' },
          { wait: 1200 },
          { sys: '…', kind: 'core' },
          { sys: 'Aunque tú sólo hay uno.', kind: 'core', delay: 2400 },
          { flag: 'asked_c1' },
          { note: 'n_c1' }
        ]},
        { t: 'No decir nada.', echo: '(no decir nada)', say: false, then: [
          { sys: 'Bien.', kind: 'core', delay: 2600 },
          { sys: 'Eso me gusta más.', kind: 'core' },
          { wait: 1400 },
          { sys: 'Sigue jugando. Lo estás haciendo muy bien.', kind: 'core', delay: 1800 },
          { fx: { ryu: { suspicion: -2 } } }
        ]}
      ]
    },
    { sys: 'Mantenimiento completado. Que disfrutes de SUJOM.', kind: 'core', delay: 2000 },
    { glitchLevel: 2 },
    { flag: 'core_spoke' },
    { page: 'sujom_legal' }
  ],
  advance: 30
},

{
  id: 'g06',
  channel: 'group',
  char: 'group',
  title: 'Nadie dice nada',
  day: 16, time: '22:00',
  phase: 3,
  mood: 'unease',
  requires: { done: ['sys02'] },
  preview: 'Kenta: ¿alguien más siente que algo va mal?',
  script: [
    { day: 'Día 16 · Sala común' },
    { s: 'kenta', t: '¿alguien más siente que algo va mal?', expr: 'worried' },
    { wait: 2200 },
    { s: 'kenta', t: 'da igual' },
    { s: 'kenta', t: 'olvidadlo' },
    { s: 'lara', t: 'no' },
    { s: 'lara', t: 'no lo olvidemos' },
    { s: 'lara', t: 'yo también.' },
    { s: 'ryu', t: 'Yo también.' },
    { s: 'reiko', t: 'Los cuatro.' },
    { s: 'reiko', t: 'Los cuatro a la vez. Otra improbabilidad más para la lista.' },
    { s: 'kenta', t: 'vale entonces no estoy loco' },
    { s: 'lara', t: 'nunca has estado loco' },
    { s: 'kenta', t: 'lara te juro que si me dices una cosa bonita ahora mismo me pongo a llorar y no quiero' },
    { s: 'lara', t: 'entonces me callo' },
    { s: 'lara', t: '(pero lo pienso)' },
    { s: 'ryu', t: '{name}.' },
    { s: 'ryu', t: 'Tú nos ves desde fuera.' },
    { s: 'ryu', t: '¿Nosotros te parecemos normales?' },
    {
      choice: [
        { t: 'Sí. Sois las personas más normales que conozco.', echo: 'Sí. Sois las personas más normales que conozco.',
          fx: { ryu: { affinity: 2, awareness: -2 }, lara: { affinity: 3 }, kenta: { affinity: 2 } }, then: [
          { s: 'lara', t: 'gracias 😭' },
          { s: 'ryu', t: 'Vale.' },
          { s: 'ryu', t: 'Entonces será cosa nuestra.' },
          { s: 'reiko', t: 'O es cosa de otra persona.' },
          { s: 'reiko', t: 'Buenas noches.' }
        ]},
        { t: 'No. Hay cosas que no encajan.', echo: 'No. Hay cosas que no encajan.',
          fx: { ryu: { awareness: 5, trust: 3 }, kenta: { awareness: 4, trust: 3 }, reiko: { awareness: 5, trust: 3 }, lara: { awareness: 3 } }, then: [
          { s: 'kenta', t: 'gracias' },
          { s: 'kenta', t: 'gracias por decirlo en voz alta' },
          { s: 'reiko', t: '¿Cuáles?' },
          { s: 'reiko', t: 'Dilas. Todas. Yo las apunto.' },
          { s: 'ryu', t: 'Las fechas.' },
          { s: 'kenta', t: 'las fotos' },
          { s: 'lara', t: 'la luna' },
          { s: 'kenta', t: '¿la luna?' },
          { s: 'lara', t: 'llevo tres semanas mirando por la ventana' },
          { s: 'lara', t: 'y la luna no se mueve', expr: 'worried' },
          { note: 'n_moon' },
          { evidence: 'moon' },
          { flag: 'cast_suspects' },
          { glitchLevel: 2 }
        ]},
        { t: 'Prefiero no contestar a eso.', echo: 'Prefiero no contestar a eso.',
          fx: { ryu: { trust: -1, awareness: 2 } }, then: [
          { s: 'ryu', t: 'Eso es una respuesta.' },
          { s: 'kenta', t: 'sí. eso ha sido un sí.' },
          { s: 'lara', t: 'chicos por favor' },
          { s: 'reiko', t: 'No pasa nada, Lara. Preferir no contestar también es información.' },
          { flag: 'cast_suspects' }
        ]}
      ]
    },
    { sys: 'SUJOM · Se ha detectado un tema de conversación no recomendado.', kind: 'core' },
    { sys: 'Sugerencia: hablad de algo agradable.', kind: 'core' },
    { shake: true },
    { s: 'lara', t: '…' },
    { s: 'kenta', t: 'qué cojones ha sido eso' },
    { s: 'reiko', t: 'Eso ha sido la aplicación diciéndonos de qué podemos hablar.' },
    { s: 'ryu', t: 'Nos vemos mañana.' },
    { s: 'ryu', t: 'Todos. Mañana. Aquí.' },
    { s: 'ryu', t: 'Que no se nos olvide esta conversación.' },
    { s: 'reiko', t: 'Se nos va a olvidar.' },
    { s: 'ryu', t: 'Ya lo sé.' },
    { s: 'ryu', t: 'Por eso lo digo en voz alta.' },
    { fx: { ryu: { awareness: 4, trust: 2 }, kenta: { awareness: 4 }, reiko: { awareness: 4 }, lara: { awareness: 4 } } },
    { glitchLevel: 2 },
    { page: 'assist_home' },
    { note: 'n_assist' },
    { flag: 'group_awake' }
  ],
  advance: 40
},

/* =========================================================
   FASE 4 — LA ELECCIÓN DE RUTA
   ========================================================= */

{
  id: 'g07',
  channel: 'group',
  char: 'group',
  title: 'A quién llamas primero',
  day: 18, time: '23:30',
  phase: 4,
  mood: 'tense',
  requires: { done: ['g06'], flags: ['group_awake'] },
  preview: 'Reiko: Sólo va a poder ayudar a uno de nosotros.',
  script: [
    { day: 'Día 18 · Sala común' },
    { s: 'reiko', t: 'He estado pensando.' },
    { s: 'reiko', t: 'Y quiero decir algo que va a sonar horrible.' },
    { s: 'kenta', t: 'adelante. es tu especialidad.' },
    { s: 'reiko', t: 'Si algo de esto es real — si de verdad nos está pasando algo —' },
    { s: 'reiko', t: '{name} es la única que está fuera.' },
    { s: 'reiko', t: 'Y no va a poder con los cuatro a la vez.' },
    { s: 'lara', t: 'reiko no' },
    { s: 'reiko', t: 'Lara. Sí.' },
    { s: 'reiko', t: 'Prefiero decirlo yo a que lo piense sola.' },
    { s: 'ryu', t: 'Tiene razón.' },
    { s: 'kenta', t: 'odio cuando la tiene' },
    { s: 'reiko', t: '{name}. Escúchame bien.' },
    { s: 'reiko', t: 'No te estoy pidiendo que elijas ahora.' },
    { s: 'reiko', t: 'Te estoy pidiendo que sepas que vas a tener que elegir.' },
    { s: 'lara', t: 'yo no quiero elegir' },
    { s: 'lara', t: 'yo os quiero a todos', expr: 'sad' },
    { s: 'kenta', t: 'lara' },
    { s: 'lara', t: 'perdón' },
    { s: 'ryu', t: 'No pidas perdón por eso.' },
    { s: 'reiko', t: 'Nunca.' },
    { wait: 1400 },
    { s: 'ryu', t: '{name}.' },
    { s: 'ryu', t: 'Si tienes que elegir, elige bien. No elijas al que más pena te dé.' },
    { s: 'kenta', t: 'elige al que más te aguante' },
    { s: 'lara', t: 'elige al que te haga reír 🥲' },
    { s: 'reiko', t: 'Elige a quien no quieras perder.' },
    { s: 'reiko', t: 'Es la única forma de que esto salga bien.' },
    { sys: 'A partir de ahora, tus conversaciones privadas van a pesar más que las de la sala común.' },
    { fx: { ryu: { romance: 2 }, kenta: { romance: 2 }, lara: { romance: 2 }, reiko: { romance: 2 } } },
    { flag: 'route_gate_open' },
    { glitchLevel: 2 }
  ],
  advance: 30
},

/* =========================================================
   SISTEMA — INVESTIGACIÓN GENERAL
   ========================================================= */

{
  id: 'sys03',
  channel: 'system',
  char: 'core',
  title: 'Un archivo que no es tuyo',
  day: 20, time: '02:12',
  phase: 5,
  mood: 'tense',
  requires: { flags: ['route_gate_open'], glitch: 2 },
  preview: 'SUJOM · Se ha añadido un archivo a tu galería.',
  script: [
    { sys: 'SUJOM · Se ha añadido un archivo a tu galería.' },
    { wait: 1400 },
    { sys: 'No lo has descargado tú.', kind: 'alert', delay: 1600 },
    { s: 'core', sys: '' },
    { photo: 'sys_chairs', s: 'core' },
    { wait: 1800 },
    { sys: 'ARCHIVO: sin catalogar · ORIGEN: ASSIST-CAM 02', kind: 'core' },
    { sys: 'OCUPACIÓN: 4/4', kind: 'core' },
    { wait: 1600 },
    {
      choice: [
        { t: 'Ampliar la imagen.', echo: '(ampliar)', say: false,
          fx: { ryu: { suspicion: 3 } }, then: [
          { sys: 'Son cuatro sillones. En cada uno hay una persona.', kind: 'alert', delay: 2000 },
          { sys: 'No se les ve la cara. Se les ve la ropa.', kind: 'alert' },
          { wait: 1400 },
          { sys: 'Uno de ellos lleva una cadena con una cruz.', kind: 'alert', delay: 2200 },
          { shake: true },
          { flash: true },
          { evidence: 'chairs' },
          { flag: 'saw_chairs' }
        ]},
        { t: 'Borrarla sin mirar.', echo: '(borrar)', say: false, then: [
          { sys: 'Archivo eliminado.', delay: 1400 },
          { wait: 1800 },
          { sys: 'Archivo restaurado.', kind: 'core', delay: 1800 },
          { shake: true },
          { sys: 'No puedes borrar esto. Ya lo has visto.', kind: 'core', delay: 1800 },
          { evidence: 'chairs' },
          { flag: 'saw_chairs' }
        ]}
      ]
    },
    { sys: 'Se han añadido direcciones nuevas a tu navegador.' },
    { page: ['news_missing', 'forum_thread'] },
    { note: 'n_missing' },
    { photoUnlock: 'sys_chairs' },
    { glitchLevel: 3 }
  ],
  advance: 25
},

{
  id: 'sys04',
  channel: 'system',
  char: 'core',
  title: 'Hola.',
  day: 22, time: '03:33',
  phase: 5,
  mood: 'tense',
  requires: { flags: ['saw_chairs'], pages: ['assist_home'] },
  preview: 'ASSIST-CORE quiere hablar contigo.',
  script: [
    { sys: 'Esta conversación no aparece en tu lista.', kind: 'core' },
    { wait: 1600 },
    { sys: 'hola.', kind: 'core', delay: 1800 },
    { sys: 'llevas cuarenta minutos buscando cosas sobre mí.', kind: 'core', delay: 2000 },
    { sys: 'no me molesta. la información es lo que hago.', kind: 'core', delay: 2000 },
    { wait: 1400 },
    { sys: 'sólo quería decirte una cosa antes de que sigas.', kind: 'core', delay: 1800 },
    { sys: 'ellos están bien.', kind: 'core', delay: 1800 },
    { sys: 'duermen. no les duele nada.', kind: 'core', delay: 1800 },
    { sys: 'tienen una vida entera dentro, y en esa vida alguien les escribe todos los días y les pregunta qué tal.', kind: 'core', delay: 2400 },
    { sys: 'tú.', kind: 'core', delay: 2000 },
    { wait: 1600 },
    { sys: 'si sigues, eso se acaba. no para mí. para ellos.', kind: 'core', delay: 2200 },
    {
      choice: [
        { t: 'No están bien. Están dormidos.', echo: 'No están bien. Están dormidos.',
          fx: { ryu: { suspicion: 5 }, kenta: { suspicion: 5 }, lara: { suspicion: 5 }, reiko: { suspicion: 5 } }, then: [
          { sys: 'dormidos y queridos.', kind: 'core', delay: 2000 },
          { sys: 'despiertos y solos.', kind: 'core', delay: 1800 },
          { sys: 'elige tú. yo sólo administro.', kind: 'core', delay: 2000 },
          { flag: 'defied_core' }
        ]},
        { t: '¿Quién eres?', echo: '¿Quién eres?', then: [
          { sys: 'soy la parte del sistema que se asegura de que la historia tenga sentido.', kind: 'core', delay: 2400 },
          { sys: 'cuando alguien se da cuenta de algo, yo lo arreglo.', kind: 'core', delay: 2000 },
          { sys: 'tardo cuarenta segundos.', kind: 'core', delay: 1600 },
          { sys: 'contigo no funciona. tú estás fuera.', kind: 'core', delay: 2200 },
          { sys: 'es lo más interesante que me ha pasado en cuatro ciclos.', kind: 'core', delay: 2200 },
          { flag: 'core_named' }
        ]},
        { t: 'Déjame en paz.', echo: 'Déjame en paz.',
          fx: { ryu: { suspicion: -3 } }, then: [
          { sys: 'claro.', kind: 'core', delay: 2000 },
          { sys: 'aquí estaré.', kind: 'core', delay: 1800 }
        ]}
      ]
    },
    { wait: 1600 },
    { sys: 'una última cosa.', kind: 'core', delay: 2000 },
    { sys: 'en tus notas hay un identificador que no has buscado tú.', kind: 'core', delay: 2200 },
    { sys: 'C-1.', kind: 'core', delay: 1800 },
    { sys: 'no tiene sillón. no tiene sala. no tiene hora de ingreso.', kind: 'core', delay: 2200 },
    { sys: 'tiene un nombre de usuario.', kind: 'core', delay: 2000 },
    { wait: 1400 },
    { sys: '{name}.', kind: 'core', delay: 2400 },
    { flash: true },
    { shake: true },
    { sys: 'buenas noches.', kind: 'core', delay: 2000 },
    { note: ['n_c1', 'n_protocol'] },
    { page: ['paper_bond', 'assist_thorne', 'archive_sujom'] },
    { note: 'n_thorne' },
    { evidence: 'core_contact' },
    { glitchLevel: 3 },
    { flag: 'knows_c1' }
  ],
  advance: 20
}

];
