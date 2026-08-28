/* =========================================================
   lara.js — Ruta de Lara.
   ---------------------------------------------------------
   Temas: familia, valor, alegría como armadura.
   Es la ruta más dulce. Por eso duele más.
   La herida de Lara no es que se la llevaran.
   Es que la vendieron los suyos.
   ========================================================= */

export const LARA = [

/* ------------------- FASE 1 ------------------- */
{
  id: 'lara01',
  channel: 'dm', char: 'lara',
  title: 'Bienvenida oficial',
  day: 1, time: '21:05',
  phase: 1, mood: 'warm',
  requires: { done: ['g01'] },
  preview: '¡¡hola otra vez!! esto es el comité de bienvenida',
  script: [
    { s: 'lara', t: '¡¡hola otra vez!!', expr: 'happy' },
    { s: 'lara', t: 'esto es el comité de bienvenida' },
    { s: 'lara', t: 'el comité soy yo. los demás no saben que existe.' },
    { s: 'lara', t: 'te voy a hacer tres preguntas y luego te dejo en paz' },
    { s: 'lara', t: 'mentira. no te voy a dejar en paz nunca. pero las tres preguntas sí.' },
    { s: 'lara', t: 'UNO: ¿perro o gato?' },
    {
      choice: [
        { t: 'Perro.', echo: 'Perro.',
          fx: { lara: { affinity: 5, romance: 2 } }, then: [
          { s: 'lara', t: 'RESPUESTA CORRECTA', expr: 'happy' },
          { s: 'lara', t: 'ya somos amigas. no hay marcha atrás. lo siento mucho.' },
          { s: 'lara', photo: 'lara_momo' },
          { s: 'lara', t: 'este es momo. siete años. una oreja rota. mejor persona que yo.' },
          { bit: [['lara', 'fact_momo']] }
        ]},
        { t: 'Gato.', echo: 'Gato.',
          fx: { lara: { affinity: 3 } }, then: [
          { s: 'lara', t: 'vale' },
          { s: 'lara', t: 'vale respeto tu decisión aunque sea incorrecta' },
          { s: 'lara', t: 'kenta también dice gato. y mira cómo le va.' },
          { s: 'lara', photo: 'lara_momo' },
          { s: 'lara', t: 'te presento a momo igualmente. te va a convertir.' },
          { bit: [['lara', 'fact_momo']] }
        ]},
        { t: 'Los dos.', echo: 'Los dos.',
          fx: { lara: { affinity: 4, trust: 2 } }, then: [
          { s: 'lara', t: 'diplomática' },
          { s: 'lara', t: 'me gusta. reiko va a estar encantada.' },
          { s: 'lara', photo: 'lara_momo' },
          { s: 'lara', t: 'este es momo. es la mitad perro que te corresponde.' },
          { bit: [['lara', 'fact_momo']] }
        ]}
      ]
    },
    { s: 'lara', t: 'DOS: ¿tú de qué te ríes?' },
    { s: 'lara', t: 'es importante. es lo primero que pregunto siempre.' },
    {
      choice: [
        { t: 'De las cosas absurdas.', echo: 'De las cosas absurdas.',
          fx: { lara: { affinity: 4, romance: 2 } }, then: [
          { s: 'lara', t: 'PERFECTO' },
          { s: 'lara', t: 'esta sala es absurda al 100%. te vas a reír muchísimo.' }
        ]},
        { t: 'Últimamente de poco.', echo: 'Últimamente de poco.',
          fx: { lara: { affinity: 3, trust: 5 } }, then: [
          { wait: 1800 },
          { s: 'lara', t: 'ay' },
          { s: 'lara', t: 'vale' },
          { s: 'lara', t: 'entonces ese es mi trabajo a partir de ahora', expr: 'happy' },
          { s: 'lara', t: 'te lo digo en serio. me lo tomo muy en serio.' },
          { flag: 'lara_mission' }
        ]},
        { t: 'De Kenta, principalmente.', echo: 'De Kenta, principalmente.',
          fx: { lara: { affinity: 4 }, kenta: { affinity: 1 } }, then: [
          { s: 'lara', t: 'JAJAJAJA' },
          { s: 'lara', t: 'lo voy a captura y se lo voy a mandar' },
          { s: 'lara', t: '*captura' },
          { s: 'lara', t: 'da igual ya lo he mandado' }
        ]}
      ]
    },
    { s: 'lara', t: 'TRES, y esta es la de verdad' },
    { s: 'lara', t: '¿tú estás bien?' },
    { s: 'lara', t: 'no de "hola qué tal". de verdad.' },
    { s: 'lara', t: 'porque la gente que se descarga estas cosas a las nueve de la noche un martes suele estar un poco sola' },
    { s: 'lara', t: 'y no pasa nada. yo también.' },
    {
      choice: [
        { t: 'Un poco sola sí.', echo: 'Un poco sola sí.',
          fx: { lara: { affinity: 5, trust: 6, romance: 3 } }, then: [
          { s: 'lara', t: 'vale' },
          { s: 'lara', t: 'pues ya no' },
          { s: 'lara', t: 'no es una frase bonita, es una cosa práctica: a partir de ahora te escribo yo.' },
          { s: 'lara', t: 'aunque no contestes. me da igual. yo escribo.', expr: 'happy' },
          { flag: 'lara_promise_write' }
        ]},
        { t: 'Estoy bien. ¿Y tú?', echo: 'Estoy bien. ¿Y tú?',
          fx: { lara: { affinity: 3, trust: 3 } }, then: [
          { s: 'lara', t: 'yo GENIAL' },
          { s: 'lara', t: 'yo siempre genial' },
          { wait: 1600 },
          { s: 'lara', t: 'bueno' },
          { s: 'lara', t: 'yo casi siempre genial' },
          { s: 'lara', t: 'que es distinto pero no se lo digas a nadie', expr: 'worried' },
          { flag: 'lara_crack_tiny' }
        ]}
      ]
    },
    { s: 'lara', t: 'bueno ya está. examen superado.' },
    { s: 'lara', t: 'bienvenida oficialmente' },
    { s: 'lara', t: '🎉🎉🎉' },
    { s: 'lara', sticker: '🐕' },
    { fx: { lara: { affinity: 5, trust: 2 } } },
    { photoUnlock: 'lara_momo' },
    { note: 'n_lara_momo' }
  ],
  advance: 30
},

{
  id: 'lara02',
  channel: 'dm', char: 'lara',
  title: '¿Este o el otro?',
  day: 3, time: '18:20',
  phase: 1, mood: 'warm',
  requires: { done: ['lara01'], stat: { lara: { affinity: 8 } } },
  preview: 'emergencia estética. necesito una opinión honesta.',
  script: [
    { s: 'lara', t: 'EMERGENCIA' },
    { s: 'lara', t: 'emergencia estética' },
    { s: 'lara', photo: 'lara_outfit' },
    { s: 'lara', t: '¿este o el otro?' },
    { me: '¿Qué otro?' },
    { s: 'lara', t: 'ay es verdad' },
    { s: 'lara', t: 'sólo tengo este' },
    { s: 'lara', t: 'entonces la pregunta es: ¿este o me quedo en casa?' },
    {
      choice: [
        { t: 'Ese. Estás guapísima.', echo: 'Ese. Estás guapísima.',
          fx: { lara: { affinity: 4, romance: 4 } }, then: [
          { s: 'lara', t: '…' },
          { s: 'lara', t: 'a ver' },
          { s: 'lara', t: 'no me digas esas cosas tan de repente que me pongo tonta', expr: 'embarrassed' },
          { s: 'lara', t: 'me he puesto roja. estoy sola en mi cuarto y me he puesto roja.' },
          { s: 'lara', t: 'MOMO SE ESTÁ RIENDO DE MÍ' },
          { flag: 'lara_blushed' }
        ]},
        { t: '¿Adónde vas?', echo: '¿Adónde vas?',
          fx: { lara: { trust: 4, affinity: 2 } }, then: [
          { s: 'lara', t: 'a ningún sitio' },
          { s: 'lara', t: 'me visto para ir a ningún sitio' },
          { s: 'lara', t: 'lo hago mucho. me arreglo, doy una vuelta a la manzana y vuelvo.' },
          { s: 'lara', t: 'suena patético dicho así jajaja' },
          { s: 'lara', t: 'pero es que si no salgo un rato la casa se me hace muy grande', expr: 'worried' },
          { flag: 'lara_walks' }
        ]},
        { t: 'Quédate en casa. Hace frío.', echo: 'Quédate en casa. Hace frío.',
          fx: { lara: { affinity: 3, trust: 3 } }, then: [
          { s: 'lara', t: 'estamos en julio' },
          { s: 'lara', t: 'pero me ha gustado que te preocuparas jaja' },
          { s: 'lara', t: 'vale me quedo. me quedo y hablamos.' }
        ]}
      ]
    },
    { s: 'lara', t: 'oye ¿puedo contarte una tontería?' },
    { s: 'lara', t: 'yo antes tenía muchísimos amigos' },
    { s: 'lara', t: 'muchísimos. de los de veinte personas en un cumpleaños.' },
    { s: 'lara', t: 'y ahora tengo cuatro. y tres de ellos están en una app.' },
    { s: 'lara', t: 'no sé cómo ha pasado eso', expr: 'sad' },
    { wait: 1600 },
    { s: 'lara', t: 'perdón. qué bajón he metido de golpe.' },
    { s: 'lara', t: 'BORRA ESO' },
    { s: 'lara', t: 'mira, momo con una calceta:' },
    { s: 'lara', sticker: '🧦' },
    {
      choice: [
        { t: 'No lo borro. Cuéntame más.', echo: 'No lo borro. Cuéntame más.',
          fx: { lara: { trust: 7, affinity: 4, romance: 2 } }, then: [
          { wait: 2200 },
          { s: 'lara', t: 'jo' },
          { s: 'lara', t: 'nadie hace eso' },
          { s: 'lara', t: 'todo el mundo se agarra a la calceta', expr: 'vulnerable' },
          { s: 'lara', t: 'yo pongo el bajón y luego pongo algo gracioso y todo el mundo se agarra a lo gracioso' },
          { s: 'lara', t: 'y yo me quedo con el bajón dentro' },
          { s: 'lara', t: 'gracias por no agarrarte a la calceta' },
          { flag: 'lara_seen' },
          { bit: [['lara', 'fact_smile']] }
        ]},
        { t: '😂 Esa calceta es más grande que él.', echo: '😂 Esa calceta es más grande que él.',
          fx: { lara: { affinity: 3 } }, then: [
          { s: 'lara', t: 'JAJAJA ES SUYA' },
          { s: 'lara', t: 'se la pone él solo. no sé cómo.' },
          { s: 'lara', t: 'gracias por reírte 🥺' }
        ]}
      ]
    },
    { fx: { lara: { affinity: 4, trust: 3 } } },
    { photoUnlock: ['lara_outfit', 'lara_coffee'] },
    { bit: [['lara', 'dis_alone'], ['lara', 'like_dance']] }
  ],
  advance: 25
},

/* ------------------- FASE 2 ------------------- */
{
  id: 'lara03',
  channel: 'dm', char: 'lara',
  title: 'Hoy no',
  day: 6, time: '09:15',
  phase: 2, mood: 'tender',
  requires: { done: ['lara02'], stat: { lara: { affinity: 14, trust: 8 } } },
  preview: 'hola. hoy no tengo mucha batería social. perdona.',
  script: [
    { s: 'lara', t: 'hola' },
    { s: 'lara', t: 'hoy no tengo mucha batería social. perdona.', expr: 'sad' },
    { s: 'lara', t: 'no te he escrito en la sala porque si escribo tengo que ser la graciosa y hoy no me sale' },
    { s: 'lara', t: 'pero a ti sí quería escribirte' },
    { s: 'lara', t: 'no sé por qué. quería que alguien supiera que hoy estoy así.' },
    {
      choice: [
        { t: 'Aquí no tienes que ser graciosa.', echo: 'Aquí no tienes que ser graciosa.',
          fx: { lara: { trust: 8, affinity: 5, romance: 3 } }, then: [
          { wait: 2400 },
          { s: 'lara', t: 'vale' },
          { s: 'lara', t: 'me acabo de poner a llorar un poco pero de las buenas', expr: 'vulnerable' },
          { s: 'lara', t: 'de las que sientan bien' },
          { flag: 'lara_relief' },
          { fx: { lara: { dependence: 6 } } }
        ]},
        { t: '¿Qué ha pasado?', echo: '¿Qué ha pasado?',
          fx: { lara: { trust: 6, affinity: 3 } }, then: [
          { s: 'lara', t: 'nada' },
          { s: 'lara', t: 'literalmente nada. eso es lo raro.' },
          { s: 'lara', t: 'me he despertado y ya estaba así.' }
        ]}
      ]
    },
    { wait: 1600 },
    { s: 'lara', t: 'he soñado con mis padres' },
    { s: 'lara', t: 'y me he despertado con esa cosa de "¿por qué no me llaman?"' },
    { s: 'lara', t: 'llevo… uf. no sé cuánto llevo sin hablar con ellos.' },
    { s: 'lara', t: 'y lo raro es que no me acuerdo de haberme enfadado' },
    { s: 'lara', t: 'yo no me enfado con la gente. se me da fatal.' },
    { s: 'lara', t: 'así que si no me enfadé, ¿por qué no hablamos?', expr: 'worried' },
    {
      choice: [
        { t: '¿Ellos cómo son?', echo: '¿Ellos cómo son?',
          fx: { lara: { trust: 5 } }, then: [
          { s: 'lara', t: 'buenos' },
          { s: 'lara', t: 'buenos de verdad. cansados, pero buenos.' },
          { s: 'lara', t: 'llevaban dos años sin dormir por dinero' },
          { s: 'lara', t: 'yo lo sabía. yo oía las conversaciones desde mi cuarto.' },
          { s: 'lara', t: 'y ponía música más alta para no oírlas' },
          { s: 'lara', t: 'y luego me sentía fatal por poner música', expr: 'sad' },
          { bit: [['lara', 'fact_money']] }
        ]},
        { t: 'A lo mejor no fue culpa tuya.', echo: 'A lo mejor no fue culpa tuya.',
          fx: { lara: { trust: 6, awareness: 4 } }, then: [
          { s: 'lara', t: 'ya' },
          { s: 'lara', t: 'ya pero es que si no fue culpa mía' },
          { s: 'lara', t: 'entonces fue culpa de ellos' },
          { s: 'lara', t: 'y esa opción me gusta todavía menos', expr: 'sad' },
          { flag: 'lara_doubt' }
        ]}
      ]
    },
    { s: 'lara', t: 'lo último que recuerdo bien es una conversación en la cocina' },
    { s: 'lara', t: 'mi madre llorando y mi padre diciendo "es la única forma"' },
    { s: 'lara', t: 'y yo entrando y los dos callándose de golpe' },
    { s: 'lara', t: 'y sonriéndome' },
    { s: 'lara', t: 'sonriéndome MUCHO' },
    { wait: 2000 },
    { s: 'lara', t: 'nunca me habían sonreído tanto', expr: 'worried' },
    { wait: 1600 },
    { s: 'lara', t: 'ay perdón otra vez' },
    { s: 'lara', t: 'te he vuelto a meter un bajón' },
    { s: 'lara', t: 'te compenso: mira, café' },
    { s: 'lara', photo: 'lara_coffee' },
    { s: 'lara', t: 'me he levantado a las seis. voluntariamente. estoy creciendo.' },
    { fx: { lara: { affinity: 4, trust: 5, awareness: 4 } } },
    { bit: [['lara', 'fact_money']] },
    { flag: 'lara_kitchen' }
  ],
  advance: 35
},

{
  id: 'lara04',
  channel: 'dm', char: 'lara',
  title: 'La única forma',
  day: 9, time: '22:40',
  phase: 2, mood: 'tender',
  requires: { done: ['lara03'], stat: { lara: { trust: 14, affinity: 20 } } },
  preview: 'creo que ya sé qué era "la única forma"',
  script: [
    { s: 'lara', t: 'te he estado dando vueltas todo el día' },
    { s: 'lara', t: 'a la conversación de la cocina' },
    { s: 'lara', t: 'y creo que ya sé qué era "la única forma"' },
    { wait: 1800 },
    { s: 'lara', t: 'vino una señora a casa' },
    { s: 'lara', t: 'muy amable. con una carpeta.' },
    { s: 'lara', t: 'y me dijo que había un programa de colaboración voluntaria' },
    { s: 'lara', t: 'y que si yo participaba, mis padres estarían tranquilos' },
    { s: 'lara', t: 'y yo dije que sí' },
    { s: 'lara', t: 'yo dije que sí sin preguntar nada' },
    { s: 'lara', t: 'porque llevaba dos años queriendo hacer algo y no sabía qué', expr: 'sad' },
    {
      choice: [
        { t: '¿Qué firmaste exactamente?', echo: '¿Qué firmaste exactamente?',
          fx: { lara: { awareness: 8, trust: 5 } }, then: [
          { wait: 2000 },
          { s: 'lara', t: 'nada' },
          { wait: 1600 },
          { s: 'lara', t: 'espera' },
          { s: 'lara', t: 'yo no firmé nada' },
          { s: 'lara', t: 'me acabo de dar cuenta ahora mismo. yo dije que sí de palabra.' },
          { s: 'lara', t: 'firmaron ellos', expr: 'shocked' },
          { s: 'lara', t: 'firmaron ellos por mí. yo tenía veintiuno. no hacía falta que firmaran por mí.' },
          { flag: 'lara_no_signature' },
          { bit: [['lara', 'fact_signed']] },
          { fx: { lara: { awareness: 8 } } }
        ]},
        { t: 'Lara, tú no tenías que arreglar nada.', echo: 'Lara, tú no tenías que arreglar nada.',
          fx: { lara: { trust: 8, romance: 4, affinity: 4 } }, then: [
          { wait: 2400 },
          { s: 'lara', t: 'sí tenía' },
          { s: 'lara', t: 'yo era el problema. yo era la que comía y la que iba a clase y la que costaba dinero.' },
          { s: 'lara', t: 'perdón. sé que eso no se dice.' },
          { s: 'lara', t: 'pero lo pensaba todos los días desde los diecisiete', expr: 'sad' },
          { wait: 1800 },
          { s: 'lara', t: 'nadie me había dicho nunca que no tenía que arreglarlo' },
          { s: 'lara', t: 'gracias' },
          { flag: 'lara_absolved' },
          { fx: { lara: { dependence: 8 } } }
        ]}
      ]
    },
    { s: 'lara', t: 'y hay una cosa más' },
    { s: 'lara', t: 'y esta no se la he contado a nadie. ni a reiko.' },
    { wait: 2000 },
    { s: 'lara', t: 'yo vi la cifra' },
    { s: 'lara', t: 'estaba en la carpeta de la señora, boca arriba, en la mesa de la cocina' },
    { s: 'lara', t: 'y la vi' },
    { s: 'lara', t: 'y desde entonces me sé exactamente cuánto valgo' },
    { s: 'lara', t: 'y es un número muy concreto', expr: 'sad' },
    {
      choice: [
        { t: 'Ese número no era tu precio. Era su miedo.', echo: 'Ese número no era tu precio. Era su miedo.',
          fx: { lara: { trust: 10, romance: 6, affinity: 5, dependence: 8 } }, then: [
          { wait: 3000 },
          { s: 'lara', t: '…' },
          { s: 'lara', t: 'espera' },
          { s: 'lara', t: 'espera que estoy llorando otra vez y esta vez de las gordas', expr: 'vulnerable' },
          { wait: 2600 },
          { s: 'lara', t: 'llevo un año con ese número en la cabeza' },
          { s: 'lara', t: 'un año pensando "valgo eso"' },
          { s: 'lara', t: 'y tú lo has dado la vuelta en una frase' },
          { s: 'lara', t: '{name}, ¿tú sabes lo que acabas de hacer?' },
          { flag: 'lara_reframed' }
        ]},
        { t: 'No me digas la cifra. No quiero saberla.', echo: 'No me digas la cifra. No quiero saberla.',
          fx: { lara: { trust: 6, affinity: 3 } }, then: [
          { s: 'lara', t: 'vale' },
          { s: 'lara', t: 'gracias' },
          { s: 'lara', t: 'creo que si la dijera en voz alta se haría más real' },
          { s: 'lara', t: 'y ya es bastante real' }
        ]},
        { t: '¿Cuánto?', echo: '¿Cuánto?',
          fx: { lara: { trust: -2, awareness: 6 } }, then: [
          { wait: 2400 },
          { s: 'lara', t: 'cuarenta y un millones' },
          { wait: 2000 },
          { s: 'lara', t: 'ya está. ya lo he dicho.' },
          { s: 'lara', t: 'no me ha sentado bien decirlo pero ya está dicho.', expr: 'sad' },
          { flag: 'lara_said_number' },
          { bit: [['lara', 'fact_chose']] }
        ]}
      ]
    },
    { fx: { lara: { affinity: 5, trust: 6 } } },
    { bit: [['lara', 'fact_signed'], ['lara', 'fact_chose']] },
    { flag: 'lara_knows_price' }
  ],
  advance: 40
},

{
  id: 'lara05',
  channel: 'dm', char: 'lara',
  title: 'Bailar en la cocina',
  day: 13, time: '17:40',
  phase: 2, mood: 'tender',
  requires: { done: ['lara04', 'g04'], stat: { lara: { affinity: 24, trust: 16 } } },
  preview: 'ponte una canción. la que sea. te espero.',
  script: [
    { s: 'lara', t: 'vale escúchame' },
    { s: 'lara', t: 'vamos a hacer una cosa y no me digas que no' },
    { s: 'lara', t: 'ponte una canción' },
    { s: 'lara', t: 'la que sea. te espero.' },
    {
      choice: [
        { t: 'Puesta.', echo: 'Puesta.',
          fx: { lara: { affinity: 4, romance: 4 } }, then: [
          { s: 'lara', t: '¡¡BIEN!!', expr: 'happy' },
          { s: 'lara', t: 'ahora levántate' },
          { s: 'lara', t: 'sí. levántate de verdad. te estoy viendo. mentira. pero levántate.' }
        ]},
        { t: 'Lara, son las seis de la tarde.', echo: 'Lara, son las seis de la tarde.',
          fx: { lara: { affinity: 3 } }, then: [
          { s: 'lara', t: 'las seis de la tarde es la MEJOR hora' },
          { s: 'lara', t: 'la luz de las seis de la tarde en verano es lo mejor que ha hecho el universo' },
          { s: 'lara', t: 'ponte la canción. confía en mí.' },
          { bit: [['lara', 'like_sun']] }
        ]}
      ]
    },
    { s: 'lara', t: 'yo bailo en la cocina todos los días' },
    { s: 'lara', t: 'desde los ocho años' },
    { s: 'lara', t: 'cuando en casa había gritos yo me iba a la cocina y bailaba' },
    { s: 'lara', t: 'y no era huir. era como… ponerle otra banda sonora a la casa.' },
    { s: 'lara', t: 'y si le pones otra banda sonora, la casa se convierte en otra cosa' },
    { wait: 1800 },
    { s: 'lara', t: 'lo he hecho toda mi vida' },
    { s: 'lara', t: 'y funcionaba' },
    { s: 'lara', t: 'y últimamente no funciona y no sé qué hacer', expr: 'sad' },
    {
      choice: [
        { t: 'Entonces bailamos los dos y ya está.', echo: 'Entonces bailamos los dos y ya está.',
          fx: { lara: { romance: 8, affinity: 6 } }, then: [
          { wait: 2200 },
          { s: 'lara', t: 'jajajaja' },
          { s: 'lara', t: 'estoy bailando' },
          { s: 'lara', t: 'estoy bailando sola en mi cocina con el móvil en la mano como una loca' },
          { s: 'lara', t: 'y momo me está mirando como si me hubiera vuelto loca' },
          { s: 'lara', t: 'y no me había reído así en semanas', expr: 'happy' }
        ]},
        { t: 'Puede que ya no necesites otra banda sonora.', echo: 'Puede que ya no necesites otra banda sonora.',
          fx: { lara: { trust: 8, romance: 6 } }, then: [
          { wait: 2400 },
          { s: 'lara', t: 'ay' },
          { s: 'lara', t: 'ay {name}' },
          { s: 'lara', t: 'eso ha sido muy bonito y muy triste a la vez y me has descolocado', expr: 'vulnerable' }
        ]}
      ]
    },
    { wait: 2000 },
    { s: 'lara', t: 'oye' },
    { s: 'lara', t: 'te voy a decir una cosa y me voy a morir de vergüenza' },
    { s: 'lara', t: 'yo hablo mucho con todo el mundo' },
    { s: 'lara', t: 'con todos. siempre. es lo mío.' },
    { s: 'lara', t: 'pero contigo no hablo igual' },
    { s: 'lara', t: 'contigo me quedo callada a veces' },
    { s: 'lara', t: 'y no me pasa NUNCA. yo no me callo nunca.' },
    { s: 'lara', t: 'y me he dado cuenta de que me callo porque contigo no tengo que llenar el silencio' },
    { s: 'lara', t: 'y eso me da un poco de miedo porque significa que me importas mucho', expr: 'embarrassed' },
    {
      choice: [
        { t: 'Tú también me importas. Mucho.', echo: 'Tú también me importas. Mucho.',
          fx: { lara: { romance: 10, affinity: 6, dependence: 8 } }, route: 'lara', then: [
          { wait: 2400 },
          { s: 'lara', t: 'AAAAAAAA' },
          { s: 'lara', t: 'perdón' },
          { s: 'lara', t: 'perdón he gritado otra vez' },
          { s: 'lara', t: 'es que llevo tres días ensayando cómo decirte eso y tú lo has dicho en cinco palabras', expr: 'happy' },
          { s: 'lara', t: 'qué injusto' },
          { s: 'lara', t: 'vale. bueno. entonces esto es algo.' },
          { s: 'lara', t: 'esto es algo, ¿no?' },
          { me: 'Es algo.' },
          { s: 'lara', t: '💗' },
          { flag: 'lara_route' }
        ]},
        { t: 'A mí también me da miedo.', echo: 'A mí también me da miedo.',
          fx: { lara: { romance: 7, trust: 6 } }, then: [
          { s: 'lara', t: 'vale' },
          { s: 'lara', t: 'vale entonces tenemos miedo las dos y eso ya es hacerlo juntas' },
          { s: 'lara', t: 'que es mi definición favorita de casi todo', expr: 'happy' },
          {
            choice: [
              { t: 'Entonces hagámoslo juntas.', echo: 'Entonces hagámoslo juntas.',
                fx: { lara: { romance: 8, dependence: 7 } }, route: 'lara', then: [
                { s: 'lara', t: '💗💗💗' },
                { s: 'lara', t: 'vale. vale. me voy a quedar mirando el techo un rato.' },
                { flag: 'lara_route' }
              ]},
              { t: 'Vamos despacio.', echo: 'Vamos despacio.',
                fx: { lara: { trust: 4, romance: 2 } }, route: 'lara', then: [
                { s: 'lara', t: 'despacio vale' },
                { s: 'lara', t: 'yo despacio no sé pero lo aprendo' },
                { s: 'lara', t: 'eso sí: te sigo escribiendo todos los días' },
                { s: 'lara', t: 'eso no es negociable 💗', expr: 'happy' },
                { flag: 'lara_route' }
              ]}
            ]
          }
        ]}
      ]
    },
    { wait: 1600 },
    { s: 'lara', t: 'te mando una foto de momo para bajar la intensidad' },
    { s: 'lara', photo: 'lara_momo2', corruptNow: true },
    { wait: 2000 },
    { s: 'lara', t: 'anda' },
    { s: 'lara', t: 'esa foto es de hace dos semanas' },
    { s: 'lara', t: 'yo he abierto la cámara. acabo de abrir la cámara.', expr: 'worried' },
    { s: 'lara', t: 'qué raro' },
    { s: 'lara', t: 'bueno. da igual. buenas noches 💗' },
    { fx: { lara: { affinity: 5, romance: 5, awareness: 4 } } },
    { photoUnlock: 'lara_momo2' },
    { corrupt: 'lara_momo2' },
    { glitchLevel: 1 },
    { bit: [['lara', 'like_dance']] }
  ],
  advance: 40
},

/* ------------------- FASE 4 ------------------- */
{
  id: 'lara06',
  channel: 'dm', char: 'lara',
  title: 'Momo',
  day: 17, time: '12:30',
  phase: 4, mood: 'unease',
  requires: { done: ['lara05', 'g06'], flags: ['lara_route'], stat: { lara: { trust: 24 } } },
  preview: 'lara: no encuentro a momo',
  script: [
    { s: 'lara', t: '{name}' },
    { s: 'lara', t: 'no encuentro a momo', expr: 'worried' },
    { s: 'lara', t: 'llevo toda la mañana buscándolo' },
    { s: 'lara', t: 'he mirado en toda la casa dos veces' },
    { s: 'lara', t: 'y la puerta está cerrada' },
    { s: 'lara', t: 'la puerta está cerrada y no está' },
    {
      choice: [
        { t: 'Tranquila. Mándame una foto de su cama.', echo: 'Tranquila. Mándame una foto de su cama.',
          fx: { lara: { awareness: 8, trust: 4 } }, then: [
          { wait: 2400 },
          { s: 'lara', t: 'no tiene cama' },
          { wait: 2000 },
          { s: 'lara', t: 'espera' },
          { s: 'lara', t: 'momo no tiene cama' },
          { s: 'lara', t: 'ni comedero' },
          { s: 'lara', t: 'ni correa' },
          { s: 'lara', t: 'no hay NADA de momo en esta casa', expr: 'shocked' },
          { s: 'lara', t: 'tengo un perro desde hace siete años y no hay nada suyo en mi casa' },
          { flag: 'lara_no_traces' },
          { fx: { lara: { awakening: 12 } } }
        ]},
        { t: 'Lara, mira las fotos de Momo que me has mandado.', echo: 'Lara, mira las fotos de Momo que me has mandado.',
          fx: { lara: { awareness: 10 } }, then: [
          { wait: 2600 },
          { s: 'lara', t: 'son cuatro' },
          { s: 'lara', t: 'te he mandado cuatro fotos' },
          { s: 'lara', t: 'y son la misma' },
          { s: 'lara', t: 'las cuatro son la misma foto', expr: 'shocked' },
          { s: 'lara', t: 'yo le hago fotos todos los días' },
          { s: 'lara', t: 'TODOS LOS DÍAS' },
          { s: 'lara', t: '¿dónde están las demás?' },
          { corrupt: ['lara_momo', 'lara_momo2'] },
          { evidence: 'lara_dupes' },
          { fx: { lara: { awakening: 12 } } }
        ]}
      ]
    },
    { wait: 1800 },
    { s: 'lara', t: 'vale' },
    { s: 'lara', t: 'vale voy a preguntarte una cosa y quiero que me digas la verdad' },
    { s: 'lara', t: 'aunque sea horrible' },
    { s: 'lara', t: 'yo te he hablado de momo, ¿no?' },
    { s: 'lara', t: 'te he hablado de él. existe. lo he tenido.' },
    {
      choice: [
        { t: 'Sí. Siete años. Una oreja rota.', echo: 'Sí. Siete años. Una oreja rota.',
          fx: { lara: { awakening: 20, trust: 8, dependence: 8 } }, then: [
          { wait: 2600 },
          { s: 'lara', t: 'la oreja' },
          { s: 'lara', t: 'la oreja rota', expr: 'shocked' },
          { s: 'lara', t: 'se la rompió con una verja cuando era cachorro y yo me pasé la noche entera despierta con él' },
          { s: 'lara', t: 'ME ACUERDO' },
          { s: 'lara', t: 'me acuerdo perfectamente, {name}, existe, existe de verdad' },
          { wait: 2000 },
          { s: 'lara', t: 'entonces si él existe' },
          { s: 'lara', t: 'lo que no existe es esta casa', expr: 'shocked' },
          { flag: 'lara_held_momo' },
          { fx: { lara: { awakening: 15 } } }
        ]},
        { t: 'Lara, no sé si contestarte a eso.', echo: 'Lara, no sé si contestarte a eso.',
          fx: { lara: { awakening: 6, trust: -3 } }, then: [
          { wait: 2400 },
          { s: 'lara', t: 'o sea que no' },
          { s: 'lara', t: 'o sea que a lo mejor me lo he inventado' },
          { s: 'lara', t: 'vale' },
          { s: 'lara', t: 'vale vale vale', expr: 'sad' },
          { s: 'lara', t: 'entonces estoy fatal de la cabeza y punto' },
          { s: 'lara', t: 'casi mejor' }
        ]}
      ]
    },
    { sys: 'ASSIST · Corrigiendo incoherencia narrativa…', kind: 'core' },
    { shake: true },
    { wait: 2400 },
    { s: 'lara', t: 'jajaja perdón', expr: 'happy' },
    { s: 'lara', t: 'estaba debajo del sofá todo el rato' },
    { s: 'lara', t: 'qué tonta soy' },
    { s: 'lara', photo: 'lara_momo' },
    { wait: 2000 },
    { me: 'Lara, esa foto es de hace tres semanas.' },
    { wait: 2600 },
    { s: 'lara', t: 'ya' },
    { s: 'lara', t: 'ya lo sé', expr: 'worried' },
    { s: 'lara', t: 'lo sé y la he mandado igual' },
    { s: 'lara', t: 'porque cuando la he mandado creía que era de ahora' },
    { s: 'lara', t: 'y ahora que la miro sé que no' },
    { s: 'lara', t: '{name}, ¿me están cambiando lo que pienso?' },
    { fx: { lara: { awareness: 12, trust: 5 } } },
    { bit: [['lara', 'wrong_momo']] },
    { corrupt: 'lara_momo' },
    { glitchLevel: 2 },
    { flag: 'lara_crack' }
  ],
  advance: 35
},

{
  id: 'lara07',
  channel: 'dm', char: 'lara',
  title: 'La cifra otra vez',
  day: 20, time: '03:20',
  phase: 4, mood: 'tense',
  requires: { done: ['lara06'], flags: ['lara_crack'], glitch: 2 },
  preview: 'lara: me ha llegado un archivo. no lo he abierto todavía.',
  script: [
    { day: 'Día 20 · 03:20' },
    { s: 'lara', t: 'no he dormido' },
    { s: 'lara', t: 'me ha llegado un archivo a la galería y no lo he abierto todavía' },
    { s: 'lara', t: 'lo voy a abrir contigo. sola no puedo.', expr: 'worried' },
    { me: 'Ábrelo.' },
    { s: 'lara', photo: 'lara_paper' },
    { wait: 2400 },
    { s: 'lara', t: 'es un contrato' },
    { s: 'lara', t: 'y arriba pone mi nombre' },
    { s: 'lara', t: 'y abajo hay dos firmas' },
    { s: 'lara', t: 'y ninguna es mía', expr: 'shocked' },
    { wait: 2000 },
    { s: 'lara', t: '"cesión de tutela temporal"' },
    { s: 'lara', t: 'yo tenía veintiún años' },
    { s: 'lara', t: 'a los veintiún años nadie te cede a nadie' },
    { wait: 2200 },
    { s: 'lara', t: 'y aquí abajo está la cifra' },
    { s: 'lara', t: 'está aquí escrita' },
    { s: 'lara', t: 'cuarenta y un millones' },
    { s: 'lara', t: 'no me lo inventé. lo vi porque estaba escrito.', expr: 'shocked' },
    {
      choice: [
        { t: 'Lara. Esto es una venta.', echo: 'Lara. Esto es una venta.',
          fx: { lara: { awakening: 25, awareness: 15, trust: 6 } }, then: [
          { wait: 3000 },
          { s: 'lara', t: 'no lo digas' },
          { wait: 2000 },
          { s: 'lara', t: 'no lo digas porque si lo dices ya no puedo hacer como que no' },
          { wait: 2400 },
          { s: 'lara', t: 'me vendieron' },
          { s: 'lara', t: 'me vendieron y me sonrieron mientras lo hacían', expr: 'sad' },
          { s: 'lara', t: 'me sonrieron MUCHO' },
          { s: 'lara', t: 'ahora ya sé por qué me sonreían tanto' },
          { flag: 'lara_named_it' },
          { fx: { lara: { awakening: 10 } } }
        ]},
        { t: 'Tus padres estaban desesperados. Eso no lo justifica.', echo: 'Tus padres estaban desesperados. Eso no lo justifica.',
          fx: { lara: { awakening: 18, trust: 8 } }, then: [
          { wait: 2600 },
          { s: 'lara', t: 'ya' },
          { s: 'lara', t: 'llevo toda la noche buscándoles una excusa' },
          { s: 'lara', t: 'y me salen como quince' },
          { s: 'lara', t: 'y todas empiezan por "es que ellos"' },
          { s: 'lara', t: 'y ninguna termina en "y por eso está bien"', expr: 'sad' },
          { flag: 'lara_named_it' }
        ]}
      ]
    },
    { sys: 'ASSIST · Corrigiendo estado emocional del sujeto…', kind: 'core' },
    { shake: true },
    { sys: 'ASSIST · Corrigiendo estado emocional del sujeto…', kind: 'core' },
    { shake: true },
    { sys: 'CORRECCIÓN PARCIAL · SUJETO C-03 · CARGA AFECTIVA ELEVADA', kind: 'alert' },
    { flash: true },
    { s: 'lara', t: 'me están poniendo contenta', broken: true },
    { s: 'lara', t: 'me están poniendo contenta A LA FUERZA', broken: true, expr: 'shocked' },
    { s: 'lara', t: 'me quiero enfadar y no me dejan', broken: true },
    { s: 'lara', t: 'llevo toda la vida sin poder enfadarme {name} y ahora sé por qué', broken: true },
    {
      choice: [
        { t: 'LARA. Enfádate. Tienes derecho. Grita si quieres.', echo: 'LARA. Enfádate. Tienes derecho. Grita si quieres.',
          fx: { lara: { awakening: 30, trust: 10, romance: 6, dependence: 10 } }, then: [
          { wait: 3200 },
          { s: 'lara', t: 'ESTOY GRITANDO' },
          { s: 'lara', t: 'estoy gritando en mi cocina y no se me va la sonrisa de la cara y es HORRIBLE' },
          { s: 'lara', t: 'pero estoy gritando' },
          { wait: 2000 },
          { s: 'lara', t: 'ha parado' },
          { s: 'lara', t: 'ha parado, {name}', expr: 'tired' },
          { s: 'lara', t: 'estoy enfadada' },
          { s: 'lara', t: 'estoy enfadadísima y es lo mejor que me ha pasado en un año' },
          { flag: 'lara_angry' },
          { fx: { lara: { awakening: 12 } } }
        ]},
        { t: 'Lara, respira, ya pasa, ya pasa.', echo: 'Lara, respira, ya pasa, ya pasa.',
          fx: { lara: { awakening: 12, trust: 5 } }, then: [
          { wait: 2800 },
          { s: 'lara', t: 'ya' },
          { s: 'lara', t: 'ya está' },
          { s: 'lara', t: 'estoy bien 😊', expr: 'happy' },
          { wait: 2000 },
          { s: 'lara', t: 'estoy bien' },
          { s: 'lara', t: 'estoy bien' },
          { s: 'lara', t: '{name}, no quiero estar bien', expr: 'sad' }
        ]}
      ]
    },
    { wait: 1800 },
    { s: 'lara', t: 'escúchame' },
    { s: 'lara', t: 'yo no estoy en mi casa' },
    { s: 'lara', t: 'estoy tumbada y hay una luz encima que no se apaga nunca' },
    { s: 'lara', t: 'y a mi izquierda hay un chico dormido' },
    { s: 'lara', t: 'y tiene una cadena con una cruz', expr: 'shocked' },
    { s: 'lara', t: '{name}, es ryu' },
    { s: 'lara', t: 'están todos aquí' },
    { s: 'lara', t: 'llevamos todo este tiempo en la misma habitación' },
    { fx: { lara: { awakening: 15, awareness: 18, trust: 6 } } },
    { photoUnlock: ['lara_paper', 'sys_chairs'] },
    { evidence: ['lara_contract', 'lara_awake'] },
    { note: 'n_lara_price' },
    { page: ['assist_home', 'news_missing'] },
    { glitchLevel: 3 },
    { flag: 'lara_awake' }
  ],
  advance: 40
},

/* ------------------- FASE 5 ------------------- */
{
  id: 'lara08',
  channel: 'dm', char: 'lara',
  title: 'Veintiuno de junio',
  day: 22, time: '20:50',
  phase: 5, mood: 'tense',
  requires: { done: ['lara07'], flags: ['lara_awake'] },
  preview: 'lara: quiero salir. no quiero que me rescaten. quiero SALIR.',
  script: [
    { s: 'lara', t: 'llevo dos días despierta' },
    { s: 'lara', t: 'kenta me enseñó el truco' },
    { s: 'lara', t: 'kenta ha resultado ser el más útil de los cuatro y no se lo digas nunca', expr: 'tired' },
    { wait: 1400 },
    { s: 'lara', t: '{name} quiero decirte una cosa' },
    { s: 'lara', t: 'yo llevo toda la vida esperando que alguien viniera a arreglarme la vida' },
    { s: 'lara', t: 'primero mis padres. luego mis amigos. luego una señora con una carpeta.' },
    { s: 'lara', t: 'y ahora no' },
    { s: 'lara', t: 'ahora quiero salir yo' },
    { s: 'lara', t: 'no quiero que me rescaten. quiero SALIR.', expr: 'angry' },
    {
      choice: [
        { t: 'Entonces yo no te rescato. Te acompaño.', echo: 'Entonces yo no te rescato. Te acompaño.',
          fx: { lara: { trust: 10, romance: 8, dependence: 6 } }, then: [
          { wait: 2400 },
          { s: 'lara', t: '💗' },
          { s: 'lara', t: 'esa es la frase' },
          { s: 'lara', t: 'esa es exactamente la frase que llevaba un año necesitando', expr: 'vulnerable' },
          { flag: 'lara_accompanied' }
        ]},
        { t: 'Pues salgamos. Dime qué necesitas.', echo: 'Pues salgamos. Dime qué necesitas.',
          fx: { lara: { trust: 7, romance: 5 } }, then: [
          { s: 'lara', t: 'vale' },
          { s: 'lara', t: 'a lo práctico. me gusta.' }
        ]}
      ]
    },
    { s: 'lara', t: 'hay una puerta al final de la sala' },
    { s: 'lara', t: 'con un teclado de seis números' },
    { s: 'lara', t: 'la miro desde el sillón. está justo enfrente.' },
    { s: 'lara', t: 'reiko dice que ASSIST usa fechas para todo' },
    { s: 'lara', t: 'que es una empresa de gente muy lista que hace cosas muy tontas' },
    { note: 'n_code_hint' },
    { sys: 'Se ha desbloqueado el portal interno de ASSIST en tu navegador.' },
    { page: ['assist_portal', 'paper_bond', 'news_missing'] },
    { s: 'lara', t: 'en mi contrato hay una fecha' },
    { s: 'lara', t: '21 de junio de 2024' },
    { s: 'lara', t: 'el día que mis padres firmaron' },
    { s: 'lara', t: 'me sé esa fecha de memoria. me la sé como quien se sabe un cumpleaños.' },
    {
      puzzle: {
        kind: 'code',
        title: 'Portal interno · ASSIST',
        prompt: 'Seis dígitos, formato DDMMAA.\n\nLa fecha del contrato de Lara: 21 de junio de 2024.',
        answer: '210624',
        accept: ['210624', '21062024'],
        hint: 'Día 21, mes 06, año 24.',
        onSolve: [
          { sys: 'ACCESO CONCEDIDO · SECTOR C · REGISTRO DE SUJETOS', kind: 'core' },
          { wait: 1600 },
          { sys: 'C-03 · 21 a. · ingreso 21/06/2024 · sillón 3 · estable', kind: 'alert' },
          { sys: 'observación: contraprestación abonada al núcleo familiar. Sin reclamaciones.', kind: 'alert' },
          { wait: 2400 },
          { s: 'lara', t: '¿qué pone?' },
          {
            choice: [
              { t: '"Sin reclamaciones."', echo: '"Sin reclamaciones."',
                fx: { lara: { awakening: 25, trust: 6 } }, then: [
                { wait: 2800 },
                { s: 'lara', t: 'sin reclamaciones' },
                { wait: 2000 },
                { s: 'lara', t: 'o sea que no me han buscado' },
                { s: 'lara', t: 'no ha venido nadie a preguntar por mí en un año', expr: 'sad' },
                { wait: 2400 },
                { s: 'lara', t: 'vale' },
                { s: 'lara', t: 'entonces esto se acaba aquí' },
                { s: 'lara', t: 'si no me van a buscar, salgo yo', expr: 'angry' },
                { flag: 'lara_alone_out' }
              ]},
              { t: 'Nada que no supieras. Céntrate en la puerta.', echo: 'Nada que no supieras. Céntrate en la puerta.',
                fx: { lara: { trust: 8, awakening: 18 } }, then: [
                { s: 'lara', t: 'me lo estás ocultando' },
                { wait: 1800 },
                { s: 'lara', t: 'y te lo agradezco' },
                { s: 'lara', t: 'de verdad. hoy te lo agradezco.', expr: 'sad' },
                { s: 'lara', t: 'mañana te lo preguntaré otra vez y me lo tendrás que decir' },
                { s: 'lara', t: 'pero hoy no. hoy vale.' },
                { flag: 'lara_spared' }
              ]}
            ]
          },
          { evidence: ['assist_registry', 'lara_contract'] },
          { note: ['n_protocol', 'n_lara_price'] },
          { page: 'assist_cams' },
          { cam: ['hall', 'chairs', 'monitors', 'guard'] },
          { flag: 'lara_portal_open' }
        ],
        onFail: [
          { sys: 'ACCESO DENEGADO · INTENTO REGISTRADO', kind: 'alert' },
          { shake: true },
          { s: 'lara', t: 'no pasa nada' },
          { s: 'lara', t: 'no pasa nada de verdad 😊' },
          { wait: 1800 },
          { s: 'lara', t: 'odio que me salga la sonrisa cuando estoy asustada', expr: 'sad' },
          { fx: { lara: { suspicion: 10 } } },
          { flag: 'lara_portal_failed' }
        ]
      }
    },
    { wait: 1600 },
    { s: 'lara', t: '{name}' },
    { s: 'lara', t: 'si salgo' },
    { s: 'lara', t: 'no quiero ir a casa de mis padres' },
    { s: 'lara', t: 'y no tengo otro sitio' },
    {
      choice: [
        { t: 'Ven conmigo.', echo: 'Ven conmigo.',
          fx: { lara: { romance: 12, trust: 8, dependence: 10 } }, then: [
          { wait: 2600 },
          { s: 'lara', t: 'jajaja' },
          { s: 'lara', t: 'perdón me río porque si no lloro' },
          { s: 'lara', t: 'vale' },
          { s: 'lara', t: 'voy contigo', expr: 'vulnerable' },
          { s: 'lara', t: 'y llevo a momo' },
          { s: 'lara', t: 'porque momo existe. lo hemos decidido. existe.' },
          { flag: 'lara_has_home' }
        ]},
        { t: 'Buscaremos uno. Juntas.', echo: 'Buscaremos uno. Juntas.',
          fx: { lara: { romance: 8, trust: 6 } }, then: [
          { s: 'lara', t: 'juntas' },
          { s: 'lara', t: 'me gusta esa palabra' },
          { s: 'lara', t: 'la voy a usar mucho a partir de ahora, aviso' }
        ]}
      ]
    },
    { fx: { lara: { awakening: 10 } } },
    { glitchLevel: 3 },
    { flag: 'lara_ready' }
  ],
  advance: 50
},

/* ------------------- FASE 6 · FUGA ------------------- */
{
  id: 'lara09',
  channel: 'dm', char: 'lara',
  title: 'Otra banda sonora',
  day: 24, time: '03:50',
  phase: 6, mood: 'escape',
  requires: { done: ['lara08'], flags: ['lara_ready'] },
  preview: 'lara: me he levantado. estoy de pie. estoy MUY de pie.',
  script: [
    { day: 'Día 24 · 03:50' },
    { mood: 'escape' },
    { s: 'lara', t: 'me he levantado' },
    { s: 'lara', t: 'estoy de pie' },
    { s: 'lara', t: 'estoy MUY de pie', expr: 'tired' },
    { s: 'lara', t: 'llevo un año tumbada y ahora estoy de pie y me da un poco de risa' },
    { wait: 1400 },
    { s: 'lara', t: 'están todos aquí' },
    { s: 'lara', t: 'los tres' },
    { s: 'lara', t: 'les he puesto bien las mantas' },
    { s: 'lara', t: 'sé que es una tontería. tienen mantas de hospital y se las he puesto bien igual.', expr: 'sad' },
    { s: 'lara', t: 'a kenta le he dado un beso en la frente. no se lo digas nunca.' },
    { cam: ['hall', 'chairs', 'monitors', 'guard'] },
    { wait: 1600 },
    { s: 'lara', t: 'vale. la puerta.' },
    { s: 'lara', t: 'dime los números y no me tiemble la voz' },
    { s: 'lara', t: '*que no me tiemble la voz' },
    { s: 'lara', t: 'ya me tiembla' },
    {
      puzzle: {
        kind: 'code',
        title: 'SECTOR C · SALIDA',
        prompt: 'Seis dígitos, DDMMAA.\n\nEl día que sus padres firmaron: 21 de junio de 2024.',
        answer: '210624',
        accept: ['210624'],
        hint: '21 · 06 · 24',
        onSolve: [
          { sys: 'CERRADURA · ABIERTA', kind: 'core' },
          { s: 'lara', t: 'se ha abierto' },
          { s: 'lara', t: '{name} se ha abierto' },
          { flag: 'lara_door_open' }
        ],
        onFail: [
          { sys: 'CÓDIGO INCORRECTO · 1 INTENTO RESTANTE', kind: 'alert' },
          { shake: true },
          { s: 'lara', t: 'tranquila' },
          { s: 'lara', t: 'te lo digo a ti y me lo digo a mí' },
          { s: 'lara', t: 'la fecha del contrato. la que me sé de memoria.' },
          {
            puzzle: {
              kind: 'code',
              title: 'SECTOR C · SALIDA · último intento',
              prompt: 'El día que firmaron por ella: 21 de junio de 2024.',
              answer: '210624',
              accept: ['210624'],
              hint: '21 · 06 · 24',
              onSolve: [
                { sys: 'CERRADURA · ABIERTA', kind: 'core' },
                { s: 'lara', t: 'se ha abierto' },
                { flag: 'lara_door_open' }
              ],
              onFail: [
                { sys: 'BLOQUEO DE SEGURIDAD · ALERTA EN SECTOR C', kind: 'alert' },
                { shake: true },
                { flash: true },
                { s: 'lara', t: 'ay', broken: true },
                { fx: { lara: { suspicion: 30 } } },
                { flag: 'lara_alarm' }
              ]
            }
          }
        ]
      }
    },
    { wait: 1200 },
    {
      if: { flags: ['lara_door_open'], statMax: { lara: { suspicion: 24 } }, stat: { lara: { awakening: 55, trust: 55, romance: 45 } } },
      then: [
        /* ---------- BUENO ---------- */
        { s: 'lara', t: 'hay un pasillo larguísimo' },
        { s: 'lara', t: 'y al final una puerta con una barra roja' },
        { s: 'lara', t: 'voy a empujarla' },
        { wait: 2200 },
        { s: 'lara', t: 'AIRE' },
        { s: 'lara', t: 'hay aire y hay ruido y hay un coche pasando' },
        { s: 'lara', t: 'un coche de verdad con una persona dentro que no sabe nada de esto', expr: 'vulnerable' },
        { wait: 1600 },
        { s: 'lara', t: '{name} hay una farola' },
        { s: 'lara', t: 'y debajo de la farola hay un perro' },
        { s: 'lara', t: 'hay un perro y le falta media oreja' },
        { s: 'lara', t: 'no puede ser' },
        { s: 'lara', t: 'no puede ser, no puede ser, no puede' },
        { wait: 2200 },
        { s: 'lara', t: 'me ha conocido' },
        { s: 'lara', t: 'me ha conocido, {name}' },
        { s: 'lara', t: 'te voy a llamar. TE VOY A LLAMAR AHORA MISMO.' },
        { call: 'lara_good' },
        { wait: 800 },
        { mood: 'resolve' },
        { ending: { id: 'lara_good', char: 'lara', kind: 'good' } }
      ],
      else: [
        {
          if: { flags: ['lara_door_open'] },
          then: [
            /* ---------- MALO ---------- */
            { s: 'lara', t: 'hay un pasillo' },
            { s: 'lara', t: 'voy corriendo' },
            { wait: 1600 },
            { sys: 'ALERTA · SECTOR C · SUJETO C-03 FUERA DE SILLÓN', kind: 'alert' },
            { shake: true },
            { s: 'lara', t: 'se ha puesto todo rojo' },
            { s: 'lara', t: 'hay una sirena' },
            { s: 'lara', t: 'hay gente al final del pasillo y no me da tiempo', expr: 'shocked' },
            { s: 'lara', t: 'te llamo. quiero verte la cara antes.', broken: true },
            { call: 'lara_bad' },
            { wait: 800 },
            { mood: 'tense' },
            { ending: { id: 'lara_bad', char: 'lara', kind: 'bad' } }
          ],
          else: [
            /* ---------- NEUTRO ---------- */
            { sys: 'ASSIST · Corrigiendo incoherencia narrativa…', kind: 'core' },
            { wait: 2000 },
            { sys: 'ASSIST · Corrección aplicada. Sujeto C-03 estable.', kind: 'core' },
            { shake: true },
            { flash: true },
            { wait: 2600 },
            { s: 'lara', t: '¡¡buenos días!!', expr: 'happy' },
            { s: 'lara', t: 'he dormido genial' },
            { s: 'lara', t: 'mira, momo:' },
            { s: 'lara', photo: 'lara_momo' },
            { wait: 2400 },
            { me: 'Lara. El contrato. La puerta.' },
            { s: 'lara', t: '¿qué contrato?' },
            { s: 'lara', t: 'jajaja qué cosas dices' },
            { wait: 2400 },
            { s: 'lara', t: 'oye' },
            { s: 'lara', t: 'esto es una tontería' },
            { s: 'lara', t: 'pero me he despertado con muchísima rabia' },
            { s: 'lara', t: 'y yo nunca tengo rabia' },
            { s: 'lara', t: 'me he despertado con los puños cerrados y sin saber por qué', expr: 'worried' },
            { wait: 2000 },
            { s: 'lara', t: 'y con una canción en la cabeza' },
            { s: 'lara', t: 'una que no conozco' },
            { s: 'lara', t: 'me he pasado la mañana bailándola en la cocina 😊' },
            { mood: 'unease' },
            { ending: { id: 'lara_neutral', char: 'lara', kind: 'neutral' } }
          ]
        }
      ]
    }
  ]
}

];
