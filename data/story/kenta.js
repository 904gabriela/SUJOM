/* =========================================================
   kenta.js — Ruta de Kenta.
   ---------------------------------------------------------
   Temas: orgullo, independencia mal entendida, miedo a que
   le tengan lástima. Kenta te empuja para ver si te vas.
   Su ruta se gana aguantando, no cediendo.
   ========================================================= */

export const KENTA = [

/* ------------------- FASE 1 ------------------- */
{
  id: 'kenta01',
  channel: 'dm', char: 'kenta',
  title: 'Prueba de fuego',
  day: 1, time: '23:58',
  phase: 1, mood: 'warm',
  requires: { done: ['g01'] },
  preview: 'a ver. dime la verdad. ¿te caigo mal?',
  script: [
    { s: 'kenta', t: 'oye' },
    { s: 'kenta', t: 'a ver. dime la verdad.' },
    { s: 'kenta', t: '¿te caigo mal?' },
    { s: 'kenta', t: 'y no digas que no por educación que se nota' },
    {
      choice: [
        { t: 'Todavía no lo sé. Llevas dos horas.', echo: 'Todavía no lo sé. Llevas dos horas.',
          fx: { kenta: { affinity: 4, trust: 3 } }, then: [
          { s: 'kenta', t: 'JA' },
          { s: 'kenta', t: 'vale' },
          { s: 'kenta', t: 'esa respuesta me vale', expr: 'happy' },
          { s: 'kenta', t: 'la gente normalmente dice "noo qué va me caes súper bien" y luego desaparece' },
          { s: 'kenta', t: 'tú por lo menos eres honesta' },
          { flag: 'kenta_honest_start' }
        ]},
        { t: 'Un poco.', echo: 'Un poco.',
          fx: { kenta: { affinity: 5, trust: 4, romance: 2 } }, then: [
          { s: 'kenta', t: '…' },
          { s: 'kenta', t: 'JAJAJAJA' },
          { s: 'kenta', t: 'ME ENCANTA' },
          { s: 'kenta', t: 'llevaba meses esperando que alguien me lo dijera a la cara', expr: 'happy' },
          { s: 'kenta', t: 'los otros tres son unos cobardes. reiko lo piensa pero lo dice con adjetivos.' },
          { flag: 'kenta_honest_start' }
        ]},
        { t: 'No. Me pareces divertido.', echo: 'No. Me pareces divertido.',
          fx: { kenta: { affinity: 1, trust: -2 } }, then: [
          { s: 'kenta', t: 'ya' },
          { s: 'kenta', t: 'vale' },
          { s: 'kenta', t: 'mira, te lo voy a decir para que no perdamos el tiempo' },
          { s: 'kenta', t: 'yo esa respuesta ya me la sé. es la que se da cuando quieres quedar bien.', expr: 'angry' },
          { s: 'kenta', t: 'si vas a ser de esas, dímelo ahora y me ahorro el disgusto' }
        ]}
      ]
    },
    { s: 'kenta', t: 'te lo pregunto porque aquí todo el mundo es MUY majo' },
    { s: 'kenta', t: 'lara es maja de verdad. eso es distinto.' },
    { s: 'kenta', t: 'pero hay gente que es maja como estrategia' },
    { s: 'kenta', t: 'y yo con esa gente no puedo' },
    { s: 'kenta', t: 'prefiero que me griten' },
    {
      choice: [
        { t: '¿Por qué prefieres que te griten?', echo: '¿Por qué prefieres que te griten?',
          fx: { kenta: { trust: 4, affinity: 2 } }, then: [
          { s: 'kenta', t: 'porque cuando te gritan sabes dónde estás' },
          { s: 'kenta', t: 'lo malo es cuando te hablan bien y te están apartando al mismo tiempo' },
          { s: 'kenta', t: 'eso te lo hacen en casa y tardas años en darte cuenta' },
          { wait: 1600 },
          { s: 'kenta', t: 'olvida eso último' },
          { s: 'kenta', t: 'es tarde y digo tonterías' },
          { flag: 'kenta_hint_home' }
        ]},
        { t: 'Yo no te voy a gritar. Pero tampoco te voy a mentir.', echo: 'Yo no te voy a gritar. Pero tampoco te voy a mentir.',
          fx: { kenta: { affinity: 5, trust: 5, romance: 2 } }, then: [
          { wait: 1800 },
          { s: 'kenta', t: 'vale' },
          { s: 'kenta', t: 'eso ha estado bien' },
          { s: 'kenta', t: 'no lo repitas mucho que me acostumbro', expr: 'embarrassed' },
          { flag: 'kenta_deal' }
        ]}
      ]
    },
    { s: 'kenta', t: 'bueno' },
    { s: 'kenta', t: 'me voy a comer algo' },
    { s: 'kenta', photo: 'kenta_ramen' },
    { s: 'kenta', t: 'mira esto. MÍRALO. esto es libertad.' },
    { s: 'kenta', t: 'ryu diría que eso no es cenar. ryu es un padre de familia de 45 años atrapado en un cuerpo de 20.' },
    { s: 'kenta', t: 'buenas noches o lo que sea' },
    { fx: { kenta: { affinity: 4 } } },
    { photoUnlock: 'kenta_ramen' },
    { bit: [['kenta', 'like_ramen']] }
  ],
  advance: 25
},

{
  id: 'kenta02',
  channel: 'dm', char: 'kenta',
  title: 'Nada de lástima',
  day: 4, time: '02:30',
  phase: 1, mood: 'tender',
  requires: { done: ['kenta01'], stat: { kenta: { affinity: 8 } } },
  preview: 'kenta: ¿tú alguna vez has tenido que elegir entre comer y…',
  script: [
    { day: 'Día 4 · 02:30' },
    { s: 'kenta', t: 'pregunta random' },
    { s: 'kenta', t: '¿tú alguna vez has tenido que elegir entre comer y otra cosa?' },
    { s: 'kenta', t: 'una cosa cualquiera. luz. transporte. lo que sea.' },
    {
      choice: [
        { t: 'Sí.', echo: 'Sí.',
          fx: { kenta: { affinity: 4, trust: 5 } }, then: [
          { s: 'kenta', t: 'vale' },
          { s: 'kenta', t: 'entonces me entiendes y no hace falta que te lo explique' },
          { s: 'kenta', t: 'eso está bien. explicarlo es lo peor.' },
          { flag: 'kenta_same_boat' }
        ]},
        { t: 'No. ¿Tú sí?', echo: 'No. ¿Tú sí?',
          fx: { kenta: { trust: 3 } }, then: [
          { s: 'kenta', t: 'qué va' },
          { s: 'kenta', t: 'era hipotética' },
          { wait: 2200 },
          { s: 'kenta', t: 'era mentira. sí.' },
          { s: 'kenta', t: 'pero como digas "ay pobre" me desinstalo la app', expr: 'angry' }
        ]}
      ]
    },
    { s: 'kenta', t: 'me fui de casa a los diecisiete' },
    { s: 'kenta', t: 'y no fue una cosa dramática. no me pegaban ni nada.' },
    { s: 'kenta', t: 'es que allí yo no cabía' },
    { s: 'kenta', t: 'mi padre tiene un plan para mi vida escrito literalmente en un cuaderno' },
    { s: 'kenta', t: 'un cuaderno. con fechas.' },
    { s: 'kenta', t: 'y yo lo leí a los quince y pensé "esto no es mi vida, es una agenda"' },
    {
      choice: [
        { t: 'Y te fuiste.', echo: 'Y te fuiste.',
          fx: { kenta: { affinity: 4, trust: 4 } }, then: [
          { s: 'kenta', t: 'y me fui' },
          { s: 'kenta', t: 'con una mochila y 200 pavos y una confianza en mí mismo absolutamente ridícula' },
          { s: 'kenta', t: 'duré tres semanas antes de llorar en un baño público' },
          { s: 'kenta', t: 'pero no volví', expr: 'smug' },
          { s: 'kenta', t: 'eso es lo importante. no volví.' },
          { bit: [['kenta', 'fact_left'], ['kenta', 'fact_alone']] }
        ]},
        { t: 'Ellos te quieren, ¿no?', echo: 'Ellos te quieren, ¿no?',
          fx: { kenta: { trust: 5, affinity: 2 } }, then: [
          { s: 'kenta', t: 'sí' },
          { s: 'kenta', t: 'esa es la parte que nadie entiende' },
          { s: 'kenta', t: 'me quieren muchísimo' },
          { s: 'kenta', t: 'me quieren tanto que decidieron quién iba a ser yo antes de conocerme', expr: 'sad' },
          { s: 'kenta', t: 'y eso duele más que si me odiaran' },
          { bit: [['kenta', 'fact_strict']] },
          { flag: 'kenta_loved_wrong' }
        ]}
      ]
    },
    { s: 'kenta', t: 'bueno. ya está. ya lo sabes.' },
    { s: 'kenta', t: 'ahora te toca a ti decir algo vergonzoso para que estemos empatados' },
    {
      choice: [
        { t: 'A veces abro esta app sólo para ver si me has escrito.', echo: 'A veces abro esta app sólo para ver si me has escrito.',
          fx: { kenta: { affinity: 5, romance: 6 } }, then: [
          { wait: 2400 },
          { s: 'kenta', t: 'eso' },
          { s: 'kenta', t: 'eso no es vergonzoso' },
          { s: 'kenta', t: 'eso es' },
          { s: 'kenta', t: 'vale me voy a dormir buenas noches', expr: 'embarrassed' },
          { wait: 2000 },
          { s: 'kenta', t: 'no me he ido' },
          { s: 'kenta', t: 'sigo aquí' },
          { s: 'kenta', t: 'es que no sé qué contestar y me da rabia' },
          { flag: 'kenta_flustered' }
        ]},
        { t: 'Me da miedo caerle bien a la gente.', echo: 'Me da miedo caerle bien a la gente.',
          fx: { kenta: { trust: 6, affinity: 3 } }, then: [
          { s: 'kenta', t: 'ah' },
          { s: 'kenta', t: 'sí' },
          { s: 'kenta', t: 'porque luego dejas de caerles bien y ya sabes lo que se pierde' },
          { s: 'kenta', t: 'yo llevo con eso desde los doce' },
          { s: 'kenta', t: 'somos un desastre los dos' },
          { flag: 'kenta_mirror' }
        ]},
        { t: 'Paso. Yo no tengo nada vergonzoso.', echo: 'Paso. Yo no tengo nada vergonzoso.',
          fx: { kenta: { affinity: -2, trust: -3 } }, then: [
          { s: 'kenta', t: 'claro' },
          { s: 'kenta', t: 'o sea yo te cuento lo de mi padre y tú "paso"' },
          { s: 'kenta', t: 'genial' },
          { s: 'kenta', t: 'no pasa nada eh' },
          { s: 'kenta', t: 'de verdad. no pasa nada.', expr: 'angry' },
          { flag: 'kenta_stung' }
        ]}
      ]
    },
    { fx: { kenta: { affinity: 4, trust: 4 } } },
    { note: 'n_kenta_home' },
    { bit: [['kenta', 'dis_home']] }
  ],
  advance: 30
},

/* ------------------- FASE 2 ------------------- */
{
  id: 'kenta03',
  channel: 'dm', char: 'kenta',
  title: 'La bronca',
  day: 7, time: '20:15',
  phase: 2, mood: 'unease',
  requires: { done: ['kenta02'], stat: { kenta: { affinity: 14 } } },
  preview: 'kenta: ¿por qué hablas tanto con ryu?',
  script: [
    { s: 'kenta', t: 'oye' },
    { s: 'kenta', t: '¿por qué hablas tanto con ryu?' },
    { s: 'kenta', t: 'no es una acusación es una pregunta' },
    { wait: 1400 },
    { s: 'kenta', t: 'vale sí es una acusación' },
    {
      choice: [
        { t: 'Hablo con todos, Kenta.', echo: 'Hablo con todos, Kenta.',
          fx: { kenta: { affinity: -1 } }, then: [
          { s: 'kenta', t: 'ya' },
          { s: 'kenta', t: 'pero con él hablas distinto' },
          { s: 'kenta', t: 'con él te pones seria. conmigo te ríes.' },
          { s: 'kenta', t: 'y a mí que se rían de mí ya me lo sé de casa', expr: 'angry' }
        ]},
        { t: '¿Estás celoso?', echo: '¿Estás celoso?',
          fx: { kenta: { romance: 4, affinity: -2 } }, then: [
          { s: 'kenta', t: 'NO' },
          { s: 'kenta', t: 'no estoy celoso, estoy' },
          { s: 'kenta', t: 'vale sí' },
          { s: 'kenta', t: 'estoy celoso y encima me lo has sacado en dos mensajes y eso también me da rabia', expr: 'embarrassed' }
        ]},
        { t: 'Porque Ryu me escucha. Tú me interrogas.', echo: 'Porque Ryu me escucha. Tú me interrogas.',
          fx: { kenta: { affinity: -4, trust: 2 } }, then: [
          { s: 'kenta', t: '…' },
          { s: 'kenta', t: 'vale' },
          { s: 'kenta', t: 'me lo merezco' },
          { s: 'kenta', t: 'y aun así me ha dolido bastante', expr: 'sad' }
        ]}
      ]
    },
    { s: 'kenta', t: 'mira te voy a contar una cosa de mí que no le gusta a nadie' },
    { s: 'kenta', t: 'cuando algo me importa, la lío' },
    { s: 'kenta', t: 'a propósito' },
    { s: 'kenta', t: 'porque prefiero romperlo yo a que me lo rompan cuando no me lo espere' },
    { s: 'kenta', t: 'lo hice con mis padres. lo hice con dos amigos. lo estoy haciendo ahora.' },
    { s: 'kenta', t: 'así que si te vas, pues nada. ya está. lo habré hecho bien.', expr: 'angry' },
    { wait: 1800 },
    { sys: 'Kenta ha dejado de escribir.' },
    { wait: 1400 },
    {
      choice: [
        { t: 'No me voy a ir. Aunque sigas empujando.', echo: 'No me voy a ir. Aunque sigas empujando.',
          fx: { kenta: { affinity: 8, trust: 8, romance: 6, dependence: 6 } }, then: [
          { wait: 3200 },
          { s: 'kenta', t: 'joder' },
          { wait: 1800 },
          { s: 'kenta', t: 'perdona' },
          { s: 'kenta', t: 'perdona de verdad, no de las mías', expr: 'vulnerable' },
          { s: 'kenta', t: 'llevo tres horas escribiéndote y borrándolo' },
          { s: 'kenta', t: 'y al final he mandado lo peor que se me ha ocurrido' },
          { s: 'kenta', t: 'porque lo otro daba más miedo' },
          { me: '¿Qué era lo otro?' },
          { wait: 2400 },
          { s: 'kenta', t: 'que te echo de menos cuando no estás conectada' },
          { s: 'kenta', t: 'ya está. ya lo he dicho. bórralo de tu memoria.' },
          { flag: 'kenta_stayed' },
          { flag: 'kenta_confessed_early' }
        ]},
        { t: 'Ya. Y ahora quieres que te diga que me quedo.', echo: 'Ya. Y ahora quieres que te diga que me quedo.',
          fx: { kenta: { trust: 5, affinity: 3, romance: 2 } }, then: [
          { s: 'kenta', t: '…sí' },
          { s: 'kenta', t: 'sí, exactamente eso' },
          { s: 'kenta', t: 'es humillante que se me note tanto' },
          { me: 'Me quedo.' },
          { wait: 2000 },
          { s: 'kenta', t: 'vale' },
          { s: 'kenta', t: 'gracias' },
          { s: 'kenta', t: 'no lo voy a repetir así que quédate con este mensaje', expr: 'embarrassed' },
          { flag: 'kenta_stayed' }
        ]},
        { t: 'Pues igual sí me voy un rato.', echo: 'Pues igual sí me voy un rato.',
          fx: { kenta: { affinity: -8, trust: -6, dependence: 4 } }, then: [
          { wait: 3000 },
          { s: 'kenta', t: 'vale' },
          { wait: 2400 },
          { s: 'kenta', t: 'lo entiendo' },
          { s: 'kenta', t: 'ha salido bien entonces', expr: 'sad' },
          { wait: 2600 },
          { s: 'kenta', t: 'oye' },
          { s: 'kenta', t: 'cuando vuelvas, si vuelves' },
          { s: 'kenta', t: 'no hace falta que me digas nada. entra y ya.' },
          { flag: 'kenta_pushed_away' }
        ]}
      ]
    },
    { fx: { kenta: { affinity: 2 } } },
    { bit: [['kenta', 'dis_pity']] }
  ],
  advance: 30
},

{
  id: 'kenta04',
  channel: 'dm', char: 'kenta',
  title: 'Las tres de la mañana otra vez',
  day: 10, time: '03:40',
  phase: 2, mood: 'tender',
  requires: { done: ['kenta03'], stat: { kenta: { trust: 14 } } },
  preview: 'kenta: no te he despertado ¿no?',
  script: [
    { day: 'Día 10 · 03:40' },
    { s: 'kenta', t: 'no te he despertado ¿no?' },
    { s: 'kenta', t: 'da igual. si te he despertado ya está hecho.' },
    { s: 'kenta', photo: 'kenta_city' },
    { s: 'kenta', t: 'estoy en la azotea' },
    { s: 'kenta', t: 'subo mucho. desde aquí la ciudad parece que funciona.' },
    { wait: 1400 },
    { s: 'kenta', t: '¿puedo contarte una cosa sin que me digas nada bonito?' },
    { s: 'kenta', t: 'sólo escúchala' },
    { me: 'Vale.' },
    { s: 'kenta', t: 'cuando llevaba cuatro meses solo se me acabó el dinero' },
    { s: 'kenta', t: 'de verdad. cero. no metáfora.' },
    { s: 'kenta', t: 'y estuve dos días sin comer y con el móvil apagado para no gastar batería' },
    { s: 'kenta', t: 'y tenía el número de mi madre marcado en la pantalla' },
    { s: 'kenta', t: 'dos días con el número marcado sin darle' },
    { wait: 2000 },
    { s: 'kenta', t: 'y luego apareció una mujer con una tarjeta' },
    { s: 'kenta', t: 'y me dijo: "en ASSIST no le pedimos a nadie que sea otra persona"' },
    { s: 'kenta', t: 'y yo llevaba dieciocho años esperando que alguien me dijera exactamente esa frase' },
    { s: 'kenta', t: 'así que firmé sin leer nada' },
    { s: 'kenta', t: 'nada. ni una línea.', expr: 'sad' },
    {
      choice: [
        { t: 'No firmaste por tonto. Firmaste por cansado.', echo: 'No firmaste por tonto. Firmaste por cansado.',
          fx: { kenta: { trust: 8, affinity: 6, romance: 4 } }, then: [
          { wait: 2800 },
          { s: 'kenta', t: 'para' },
          { s: 'kenta', t: 'para porque me vas a hacer llorar en una azotea y eso es muy de película mala' },
          { wait: 2000 },
          { s: 'kenta', t: 'gracias' },
          { s: 'kenta', t: 'nadie me lo había puesto así' },
          { s: 'kenta', t: 'todo el mundo me dice que fui un impulsivo' },
          { s: 'kenta', t: 'y yo pensaba: sí, pero es que estaba MUY cansado', expr: 'vulnerable' },
          { flag: 'kenta_understood' },
          { fx: { kenta: { dependence: 6 } } }
        ]},
        { t: 'Yo también habría firmado.', echo: 'Yo también habría firmado.',
          fx: { kenta: { trust: 6, affinity: 4 } }, then: [
          { s: 'kenta', t: 'no' },
          { s: 'kenta', t: 'tú lo habrías leído' },
          { s: 'kenta', t: 'se nota que tú lees las cosas' },
          { s: 'kenta', t: 'y por eso me fío de ti más que de mí', expr: 'embarrassed' }
        ]},
        { t: '¿Qué decía el contrato?', echo: '¿Qué decía el contrato?',
          fx: { kenta: { awareness: 6, trust: 4 } }, then: [
          { s: 'kenta', t: 'ni idea' },
          { s: 'kenta', t: 'te digo que no leí nada' },
          { wait: 1600 },
          { s: 'kenta', t: 'espera' },
          { s: 'kenta', t: 'ahora que lo dices, ¿dónde está mi copia?' },
          { s: 'kenta', t: 'a mí me dieron una copia. me acuerdo del sobre.' },
          { s: 'kenta', t: 'y no lo tengo. no está en ningún cajón.', expr: 'worried' },
          { flag: 'kenta_missing_copy' },
          { fx: { kenta: { awareness: 6 } } }
        ]}
      ]
    },
    { s: 'kenta', t: 'oye {name}' },
    { s: 'kenta', t: 'esto de aquí' },
    { s: 'kenta', t: 'hablar contigo a las tres de la mañana' },
    { s: 'kenta', t: 'es lo más parecido a un sitio propio que he tenido nunca' },
    { s: 'kenta', t: 'y eso es muy triste y muy bonito a la vez y no sé qué hacer con ello' },
    { fx: { kenta: { affinity: 6, trust: 6, romance: 4 } } },
    { photoUnlock: ['kenta_city', 'kenta_room'] },
    { bit: [['kenta', 'fact_pride'], ['kenta', 'fact_offer']] }
  ],
  advance: 35
},

{
  id: 'kenta05',
  channel: 'dm', char: 'kenta',
  title: 'Lo que no sabe decir',
  day: 14, time: '01:20',
  phase: 2, mood: 'tender',
  requires: { done: ['kenta04', 'g04'], stat: { kenta: { affinity: 24, trust: 16 } } },
  preview: 'kenta: te he escrito 14 mensajes y los he borrado todos',
  script: [
    { s: 'kenta', t: 'te he escrito catorce mensajes y los he borrado todos' },
    { s: 'kenta', t: 'este es el quince' },
    { s: 'kenta', t: 'a este no le voy a dar a borrar' },
    { wait: 2000 },
    { s: 'kenta', t: 'vale sí se lo he dado' },
    { s: 'kenta', t: 'este es el dieciséis' },
    {
      choice: [
        { t: 'Respira y suéltalo.', echo: 'Respira y suéltalo.',
          fx: { kenta: { affinity: 3, romance: 3 } }, then: [
          { s: 'kenta', t: 'vale' },
          { s: 'kenta', t: 'vale vale vale' }
        ]},
        { t: 'Puedo esperar al mensaje número cuarenta.', echo: 'Puedo esperar al mensaje número cuarenta.',
          fx: { kenta: { affinity: 4, romance: 4 } }, then: [
          { s: 'kenta', t: 'no te rías de mí que estoy sufriendo' },
          { s: 'kenta', t: 'estoy sufriendo de verdad', expr: 'embarrassed' }
        ]}
      ]
    },
    { wait: 1800 },
    { s: 'kenta', t: 'yo me fui de casa para demostrar que podía estar solo' },
    { s: 'kenta', t: 'y llevo dos años demostrándolo' },
    { s: 'kenta', t: 'y se me da bien. de verdad. sé estar solo mejor que nadie.' },
    { wait: 1600 },
    { s: 'kenta', t: 'el problema es que ya no quiero' },
    { s: 'kenta', t: 'y me da un pánico horrible porque es exactamente lo que mis padres dijeron que iba a pasar' },
    { s: 'kenta', t: 'ellos dijeron "volverás"' },
    { s: 'kenta', t: 'y yo no quiero volver' },
    { s: 'kenta', t: 'yo quiero ir a otro sitio' },
    { s: 'kenta', t: 'y últimamente el otro sitio eres tú y me estoy volviendo loco', expr: 'vulnerable' },
    { wait: 2400 },
    {
      choice: [
        { t: 'Kenta. Yo también.', echo: 'Kenta. Yo también.',
          fx: { kenta: { romance: 10, affinity: 6, dependence: 8 } }, route: 'kenta', then: [
          { wait: 2600 },
          { s: 'kenta', t: 'no' },
          { s: 'kenta', t: 'no digas eso tan rápido' },
          { s: 'kenta', t: 'dilo otra vez pero despacio para que me lo crea' },
          { me: 'Yo. También.' },
          { wait: 2800 },
          { s: 'kenta', t: 'vale' },
          { s: 'kenta', t: 'me acabo de tapar la cara con un cojín, para tu información', expr: 'embarrassed' },
          { s: 'kenta', t: 'tengo dieciocho años y me acabo de tapar la cara con un cojín' },
          { s: 'kenta', t: 'esto es culpa tuya' },
          { flag: 'kenta_route' }
        ]},
        { t: 'No soy un sitio. Soy una persona.', echo: 'No soy un sitio. Soy una persona.',
          fx: { kenta: { trust: 6, romance: 5 } }, then: [
          { wait: 2200 },
          { s: 'kenta', t: 'tienes razón' },
          { s: 'kenta', t: 'perdona' },
          { s: 'kenta', t: 'lo he dicho fatal' },
          { s: 'kenta', t: 'lo que quería decir es que contigo no tengo que ser nadie' },
          { s: 'kenta', t: 'que puedo ser gilipollas y sigues ahí' },
          { s: 'kenta', t: 'y eso no me lo ha dado nadie nunca', expr: 'vulnerable' },
          {
            choice: [
              { t: 'Entonces quédate. Conmigo.', echo: 'Entonces quédate. Conmigo.',
                fx: { kenta: { romance: 9, affinity: 6, dependence: 7 } }, route: 'kenta', then: [
                { s: 'kenta', t: '…vale' },
                { s: 'kenta', t: 'vale sí' },
                { s: 'kenta', t: 'me quedo', expr: 'happy' },
                { flag: 'kenta_route' }
              ]},
              { t: 'Vamos poco a poco.', echo: 'Vamos poco a poco.',
                fx: { kenta: { trust: 4, romance: 2 } }, route: 'kenta', then: [
                { s: 'kenta', t: 'vale' },
                { s: 'kenta', t: 'poco a poco lo llevo fatal pero vale' },
                { s: 'kenta', t: 'que conste que no me voy a callar' },
                { s: 'kenta', t: 'voy a estar aquí siendo insoportable hasta que decidas', expr: 'smug' },
                { flag: 'kenta_route' }
              ]}
            ]
          }
        ]}
      ]
    },
    { wait: 1600 },
    { s: 'kenta', t: 'oye una cosa random' },
    { s: 'kenta', t: 'me acabo de acordar de que no sé cuándo es mi cumpleaños' },
    { wait: 1600 },
    { s: 'kenta', t: 'no es broma' },
    { s: 'kenta', t: 'lo he intentado pensar y no está' },
    { s: 'kenta', t: 'sé que es en invierno. sé que hacía frío.' },
    { s: 'kenta', t: 'pero el día no está.', expr: 'worried' },
    { s: 'kenta', t: 'bueno da igual. tampoco es que lo celebre.' },
    { s: 'kenta', t: 'buenas noches {name}' },
    { fx: { kenta: { affinity: 5, romance: 5, awareness: 5 } } },
    { glitchLevel: 1 },
    { flag: 'kenta_bday_gap' },
    { bit: [['kenta', 'fact_bday']] }
  ],
  advance: 40
},

/* ------------------- FASE 4 ------------------- */
{
  id: 'kenta06',
  channel: 'dm', char: 'kenta',
  title: 'El papel del cajón',
  day: 17, time: '23:20',
  phase: 4, mood: 'unease',
  requires: { done: ['kenta05', 'g06'], flags: ['kenta_route'], stat: { kenta: { trust: 24 } } },
  preview: 'kenta: he encontrado una cosa y no la entiendo',
  script: [
    { s: 'kenta', t: '{name}' },
    { s: 'kenta', t: 'he encontrado una cosa y no la entiendo' },
    { s: 'kenta', t: 'estaba buscando el cargador y he abierto un cajón que no abro nunca' },
    { s: 'kenta', photo: 'kenta_paper' },
    { s: 'kenta', t: 'esto no es mío' },
    { s: 'kenta', t: 'o sea, pone mi nombre' },
    { s: 'kenta', t: 'pero yo no lo he escrito' },
    { wait: 1600 },
    { s: 'kenta', t: 'es un formulario de ingreso voluntario' },
    { s: 'kenta', t: 'y está firmado' },
    { s: 'kenta', t: 'y la firma es mía. la reconozco. es mi letra fea de siempre.' },
    { s: 'kenta', t: 'pero yo no me acuerdo de firmar esto', expr: 'worried' },
    {
      choice: [
        { t: '¿Qué fecha tiene?', echo: '¿Qué fecha tiene?',
          fx: { kenta: { awareness: 8, trust: 4 } }, then: [
          { s: 'kenta', t: '3 de febrero de 2024' },
          { wait: 1800 },
          { me: 'Kenta. ¿Cuándo cumples años?' },
          { s: 'kenta', t: 'ya te dije que no me acuerdo' },
          { wait: 2000 },
          { s: 'kenta', t: 'espera' },
          { s: 'kenta', t: 'el 2' },
          { s: 'kenta', t: 'el 2 de febrero', expr: 'shocked' },
          { s: 'kenta', t: 'me acabo de acordar de golpe. el 2 de febrero.' },
          { wait: 2200 },
          { s: 'kenta', t: 'firmé el 3' },
          { s: 'kenta', t: 'firmé al día siguiente de cumplir dieciocho' },
          { s: 'kenta', t: '{name}, me esperaron un día', expr: 'shocked' },
          { s: 'kenta', t: 'me esperaron UN DÍA para que la firma valiera' },
          { flag: 'kenta_saw_date' },
          { note: 'n_kenta_form' },
          { evidence: 'kenta_form' },
          { fx: { kenta: { awakening: 15, awareness: 10 } } }
        ]},
        { t: 'Léelo entero. Todo. En voz alta.', echo: 'Léelo entero. Todo. En voz alta.',
          fx: { kenta: { awareness: 6, trust: 5 } }, then: [
          { s: 'kenta', t: 'vale' },
          { s: 'kenta', t: '"el firmante cede voluntariamente…"' },
          { s: 'kenta', t: 'esto es un tocho legal, no entiendo la mitad' },
          { s: 'kenta', t: 'espera' },
          { s: 'kenta', t: 'cláusula 14.2' },
          { s: 'kenta', t: '"cesión de registro neurocognitivo"' },
          { wait: 2000 },
          { s: 'kenta', t: '¿qué cojones es un registro neurocognitivo?', expr: 'worried' },
          { s: 'kenta', t: 'la fecha es 3 de febrero de 2024 por cierto' },
          { flag: 'kenta_saw_date' },
          { note: 'n_kenta_form' },
          { evidence: 'kenta_form' },
          { fx: { kenta: { awakening: 12 } } }
        ]}
      ]
    },
    { sys: 'SUJOM · Corrigiendo incoherencia narrativa…', kind: 'core' },
    { shake: true },
    { wait: 2000 },
    { s: 'kenta', t: '¿de qué estábamos hablando?', expr: 'neutral' },
    { wait: 2400 },
    { s: 'kenta', t: 'estaba buscando el cargador' },
    { s: 'kenta', t: '¿te he escrito algo raro?' },
    {
      choice: [
        { t: 'Kenta. El papel. Tienes el papel en la mano.', echo: 'Kenta. El papel. Tienes el papel en la mano.',
          fx: { kenta: { awakening: 25, trust: 8, awareness: 12 } }, then: [
          { wait: 2600 },
          { s: 'kenta', t: 'joder' },
          { s: 'kenta', t: 'lo tengo en la mano' },
          { s: 'kenta', t: 'lo estoy mirando y ahora sé lo que pone y hace diez segundos no lo sabía', expr: 'shocked' },
          { s: 'kenta', t: '{name}, ¿qué me está pasando?' },
          { s: 'kenta', t: '¿QUÉ ME ESTÁ PASANDO?' },
          { flag: 'kenta_held_memory' }
        ]},
        { t: 'Nada. Cosas tuyas.', echo: 'Nada. Cosas tuyas.',
          fx: { kenta: { awakening: 4, awareness: -4, trust: -4 } }, then: [
          { s: 'kenta', t: 'vale' },
          { s: 'kenta', t: 'qué raro' },
          { s: 'kenta', t: 'tengo un papel en la mano y no sé por qué lo he cogido' },
          { s: 'kenta', t: 'lo tiro y ya' },
          { wait: 2000 },
          { s: 'kenta', t: 'no puedo tirarlo' },
          { s: 'kenta', t: 'no sé por qué no puedo tirarlo', expr: 'worried' }
        ]}
      ]
    },
    { fx: { kenta: { awareness: 8 } } },
    { photoUnlock: 'kenta_paper' },
    { glitchLevel: 2 },
    { flag: 'kenta_crack' }
  ],
  advance: 35
},

{
  id: 'kenta07',
  channel: 'dm', char: 'kenta',
  title: 'No hay azotea',
  day: 20, time: '05:05',
  phase: 4, mood: 'tense',
  requires: { done: ['kenta06'], flags: ['kenta_crack'], glitch: 2 },
  preview: 'kenta: he subido a la azotea y NO HAY AZOTEA',
  script: [
    { day: 'Día 20 · 05:05' },
    { s: 'kenta', t: '{name}' },
    { s: 'kenta', t: '{name} contesta' },
    { s: 'kenta', t: 'CONTESTA' },
    { me: 'Estoy aquí. ¿Qué pasa?' },
    { s: 'kenta', t: 'he subido a la azotea' },
    { s: 'kenta', t: 'y no hay azotea', expr: 'shocked' },
    { s: 'kenta', t: 'he subido las escaleras y arriba hay una pared' },
    { s: 'kenta', t: 'una pared lisa. sin puerta. sin nada.' },
    { s: 'kenta', t: 'llevo dos años subiendo a esa azotea' },
    { s: 'kenta', t: 'he subido esta semana. he subido el lunes.' },
    { s: 'kenta', t: 'y ahora hay una pared' },
    { wait: 1600 },
    {
      choice: [
        { t: 'Vuelve a bajar. Cuenta los pisos.', echo: 'Vuelve a bajar. Cuenta los pisos.',
          fx: { kenta: { awakening: 12, trust: 5 } }, then: [
          { s: 'kenta', t: 'vale' },
          { s: 'kenta', t: 'bajando' },
          { wait: 2600 },
          { s: 'kenta', t: 'cuatro' },
          { s: 'kenta', t: 'he bajado cuatro pisos' },
          { s: 'kenta', t: 'yo vivo en el 4B' },
          { s: 'kenta', t: 'debería haber bajado cuatro pisos y estar en la calle' },
          { wait: 2000 },
          { s: 'kenta', t: 'estoy en mi puerta otra vez', expr: 'shocked' },
          { s: 'kenta', t: 'he bajado cuatro pisos y estoy en mi puerta' },
          { flag: 'kenta_loop' },
          { evidence: 'kenta_loop' }
        ]},
        { t: 'Fotografía la pared.', echo: 'Fotografía la pared.',
          fx: { kenta: { awakening: 10, awareness: 8 } }, then: [
          { s: 'kenta', photo: 'kenta_room', corruptNow: true },
          { s: 'kenta', t: 'no sale la pared' },
          { s: 'kenta', t: 'sale mi habitación' },
          { s: 'kenta', t: 'he apuntado a una pared y ha salido mi habitación', expr: 'shocked' },
          { me: 'Kenta, a la izquierda de esa foto hay una puerta con un teclado.' },
          { s: 'kenta', t: 'en mi casa no hay ninguna puerta con teclado' },
          { wait: 2000 },
          { s: 'kenta', t: 'estoy mirando a la izquierda' },
          { s: 'kenta', t: 'hay una puerta con un teclado' },
          { s: 'kenta', t: 'lleva ahí desde siempre y hasta ahora no la había visto NUNCA' },
          { corrupt: 'kenta_room' },
          { evidence: 'kenta_door' },
          { flag: 'kenta_saw_door' }
        ]}
      ]
    },
    { sys: 'SUJOM · Corrigiendo entorno…', kind: 'core' },
    { shake: true },
    { sys: 'SUJOM · Corrigiendo entorno…', kind: 'core' },
    { shake: true },
    { sys: 'CORRECCIÓN RECHAZADA · SUJETO C-02 · RESISTENCIA ALTA', kind: 'alert' },
    { flash: true },
    { s: 'kenta', t: 'me está entrando algo en la cabeza y NO LO QUIERO', broken: true },
    { s: 'kenta', t: 'me quieren dormir', broken: true, expr: 'shocked' },
    { s: 'kenta', t: 'están intentando dormirme {name} NO ME DEJES DORMIR', broken: true },
    {
      choice: [
        { t: 'KENTA. 2 de febrero. Cumples el 2 de febrero. Dilo.', echo: 'KENTA. 2 de febrero. Cumples el 2 de febrero. Dilo.',
          fx: { kenta: { awakening: 30, trust: 10, romance: 6, dependence: 10 } }, then: [
          { wait: 2800 },
          { s: 'kenta', t: '2 de febrero' },
          { s: 'kenta', t: '2 de febrero' },
          { s: 'kenta', t: '2 DE FEBRERO' },
          { wait: 2000 },
          { s: 'kenta', t: 'sigo aquí', expr: 'tired' },
          { s: 'kenta', t: 'sigo aquí, joder, sigo aquí' },
          { s: 'kenta', t: 'me he agarrado a la fecha como a una barandilla' },
          { s: 'kenta', t: 'porque tú la sabías' },
          { s: 'kenta', t: 'porque tú te acordabas de una cosa mía que yo había perdido' },
          { flag: 'kenta_held' },
          { fx: { kenta: { awakening: 12 } } }
        ]},
        { t: 'Kenta, resiste, aguanta, por favor.', echo: 'Kenta, resiste, aguanta, por favor.',
          fx: { kenta: { awakening: 12, trust: 5 } }, then: [
          { wait: 3000 },
          { s: 'kenta', t: '…' },
          { s: 'kenta', t: 'ya está' },
          { s: 'kenta', t: 'ya se me ha pasado', expr: 'tired' },
          { s: 'kenta', t: 'no sé qué era' },
          { s: 'kenta', t: 'queda un trozo. muy pequeño. pero queda.' }
        ]}
      ]
    },
    { wait: 1800 },
    { s: 'kenta', t: 'escúchame' },
    { s: 'kenta', t: 'yo no estoy en un apartamento' },
    { s: 'kenta', t: 'estoy tumbado' },
    { s: 'kenta', t: 'estoy tumbado y hace frío y tengo algo en el brazo' },
    { s: 'kenta', t: 'y hay más gente tumbada al lado', expr: 'shocked' },
    { s: 'kenta', t: 'y una de ellas tiene el pelo rosa' },
    { wait: 2400 },
    { s: 'kenta', t: '{name}' },
    { s: 'kenta', t: 'lara está aquí' },
    { s: 'kenta', t: 'lara está aquí al lado y no se despierta' },
    { fx: { kenta: { awakening: 15, awareness: 18, trust: 6 } } },
    { photoUnlock: ['kenta_room', 'sys_chairs'] },
    { evidence: 'kenta_awake' },
    { page: ['assist_home', 'news_missing'] },
    { note: 'n_kenta_form' },
    { glitchLevel: 3 },
    { flag: 'kenta_awake' },
    { bit: [['kenta', 'fact_waited']] }
  ],
  advance: 40
},

/* ------------------- FASE 5 ------------------- */
{
  id: 'kenta08',
  channel: 'dm', char: 'kenta',
  title: 'Un día de diferencia',
  day: 22, time: '22:30',
  phase: 5, mood: 'tense',
  requires: { done: ['kenta07'], flags: ['kenta_awake'] },
  preview: 'kenta: quiero saber cuánto valí',
  script: [
    { s: 'kenta', t: 'llevo dos días sin dormir' },
    { s: 'kenta', t: 'ryu me enseñó el truco. si no duermes, no te borran.' },
    { s: 'kenta', t: 'odio deberle algo a ryu. lo odio muchísimo.', expr: 'tired' },
    { s: 'kenta', t: 'pero funciona' },
    { wait: 1400 },
    { s: 'kenta', t: '{name}, quiero saber una cosa y quiero que me la digas aunque sea horrible' },
    { s: 'kenta', t: 'quiero saber cuánto valí' },
    { s: 'kenta', t: 'a lara le pagaron. lo ha dicho ella. le pagaron a su familia.' },
    { s: 'kenta', t: 'a mí no me pagó nadie' },
    { s: 'kenta', t: 'a mí me esperaron un día para que fuera legal' },
    { s: 'kenta', t: 'o sea que yo salí gratis', expr: 'sad' },
    {
      choice: [
        { t: 'Tú no saliste gratis. Tú saliste solo.', echo: 'Tú no saliste gratis. Tú saliste solo.',
          fx: { kenta: { trust: 8, romance: 6, dependence: 8 } }, then: [
          { wait: 2600 },
          { s: 'kenta', t: '…' },
          { s: 'kenta', t: 'sí' },
          { s: 'kenta', t: 'eso es exactamente lo que fue' },
          { s: 'kenta', t: 'no me compraron. me recogieron.', expr: 'vulnerable' },
          { s: 'kenta', t: 'como se recoge algo que nadie ha ido a buscar' },
          { flag: 'kenta_named_it' }
        ]},
        { t: 'Te eligieron porque nadie iba a denunciar.', echo: 'Te eligieron porque nadie iba a denunciar.',
          fx: { kenta: { awakening: 12, awareness: 8, trust: 5 } }, then: [
          { s: 'kenta', t: 'mis padres denunciaron' },
          { wait: 1600 },
          { s: 'kenta', t: '¿verdad que denunciaron?' },
          { me: 'Retiraron la denuncia. Y la volvieron a poner cinco meses después.' },
          { wait: 2400 },
          { s: 'kenta', t: 'cinco meses' },
          { s: 'kenta', t: 'tardaron cinco meses en echarme de menos', expr: 'sad' },
          { wait: 2000 },
          { s: 'kenta', t: 'pero la volvieron a poner' },
          { s: 'kenta', t: 'la volvieron a poner, {name}' },
          { s: 'kenta', t: 'o sea que me buscaron' },
          { s: 'kenta', t: 'me están buscando ahora mismo', expr: 'shocked' },
          { flag: 'kenta_searched' },
          { fx: { kenta: { awakening: 10 } } }
        ]}
      ]
    },
    { sys: 'Se ha desbloqueado el portal interno de ASSIST en tu navegador.' },
    { page: ['assist_portal', 'paper_bond', 'news_missing'] },
    { s: 'kenta', t: 'vale' },
    { s: 'kenta', t: 'la puerta esa de mi casa que no existía' },
    { s: 'kenta', t: 'tiene teclado de seis números' },
    { s: 'kenta', t: 'y en el formulario hay una fecha' },
    { s: 'kenta', t: 'y yo ya no me fío de las casualidades' },
    { note: 'n_code_hint' },
    {
      puzzle: {
        kind: 'code',
        title: 'Portal interno · ASSIST',
        prompt: 'Seis dígitos, formato DDMMAA.\n\nLa fecha del formulario de ingreso de Kenta: 3 de febrero de 2024.',
        answer: '030224',
        accept: ['030224', '03022024', '30224'],
        hint: 'Día 03, mes 02, año 24.',
        onSolve: [
          { sys: 'ACCESO CONCEDIDO · SECTOR C · REGISTRO DE SUJETOS', kind: 'core' },
          { wait: 1600 },
          { sys: 'C-02 · 18 a. · ingreso 03/02/2024 · sillón 2 · estable', kind: 'alert' },
          { sys: 'observación: rechaza la sedación con más frecuencia que la media.', kind: 'alert' },
          { wait: 2200 },
          { s: 'kenta', t: '¿qué pone?' },
          {
            choice: [
              { t: '"Rechaza la sedación con más frecuencia que la media."', echo: '"Rechaza la sedación con más frecuencia que la media."',
                fx: { kenta: { awakening: 25, trust: 8, romance: 5 } }, then: [
                { wait: 2600 },
                { s: 'kenta', t: 'jajaja' },
                { s: 'kenta', t: 'JAJAJAJA' },
                { s: 'kenta', t: 'o sea que llevo un año dándoles la lata' },
                { s: 'kenta', t: 'llevo un año siendo insoportable hasta dormido', expr: 'happy' },
                { s: 'kenta', t: 'eso es lo más bonito que me han dicho nunca y lo ha escrito un informe' },
                { wait: 1800 },
                { s: 'kenta', t: '{name}' },
                { s: 'kenta', t: 'si llevo un año resistiéndome sin motivo' },
                { s: 'kenta', t: 'imagínate ahora que tengo uno', expr: 'smug' },
                { flag: 'kenta_fire' },
                { fx: { kenta: { awakening: 12 } } }
              ]},
              { t: 'Que eres el sujeto C-02. Y que tienes sillón asignado.', echo: 'Que eres el sujeto C-02. Y que tienes sillón asignado.',
                fx: { kenta: { awakening: 20, awareness: 12 } }, then: [
                { wait: 2400 },
                { s: 'kenta', t: 'sillón' },
                { s: 'kenta', t: 'tengo un sillón asignado' },
                { s: 'kenta', t: 'como en una peluquería' },
                { s: 'kenta', t: 'como si fuera un sitio al que voy', expr: 'angry' },
                { s: 'kenta', t: 'no es un sitio al que voy. es donde llevo un año.' },
                { flag: 'kenta_fire' }
              ]}
            ]
          },
          { evidence: ['assist_registry', 'kenta_form'] },
          { note: ['n_protocol', 'n_kenta_form'] },
          { page: 'assist_cams' },
          { cam: ['hall', 'chairs', 'monitors', 'guard'] },
          { flag: 'kenta_portal_open' }
        ],
        onFail: [
          { sys: 'ACCESO DENEGADO · INTENTO REGISTRADO', kind: 'alert' },
          { shake: true },
          { s: 'kenta', t: 'nada' },
          { s: 'kenta', t: 'vale. nada.' },
          { s: 'kenta', t: 'no pasa nada, en serio' },
          { s: 'kenta', t: 'estoy acostumbrado a que las puertas no se abran', expr: 'sad' },
          { fx: { kenta: { suspicion: 10 } } },
          { flag: 'kenta_portal_failed' }
        ]
      }
    },
    { wait: 1600 },
    { s: 'kenta', t: 'oye' },
    { s: 'kenta', t: 'si esto sale bien' },
    { s: 'kenta', t: 'si salgo' },
    { s: 'kenta', t: 'yo no tengo dónde ir' },
    { s: 'kenta', t: 'lo digo en serio. no tengo casa, no tengo dinero, no tengo nada.' },
    { s: 'kenta', t: 'saldré a una calle cualquiera y no sabré para dónde tirar' },
    {
      choice: [
        { t: 'Tirarás hacia mí.', echo: 'Tirarás hacia mí.',
          fx: { kenta: { romance: 12, trust: 8, dependence: 10 } }, then: [
          { wait: 2800 },
          { s: 'kenta', t: 'no me hagas esto ahora' },
          { s: 'kenta', t: 'no me hagas esto ahora que me tengo que concentrar', expr: 'vulnerable' },
          { wait: 2000 },
          { s: 'kenta', t: 'vale' },
          { s: 'kenta', t: 'vale. hacia ti.' },
          { s: 'kenta', t: 'ya tengo dirección. ya está. ya puedo.' },
          { flag: 'kenta_has_direction' }
        ]},
        { t: 'Ya lo pensaremos fuera. Primero sal.', echo: 'Ya lo pensaremos fuera. Primero sal.',
          fx: { kenta: { trust: 5, romance: 3 } }, then: [
          { s: 'kenta', t: 'vale' },
          { s: 'kenta', t: 'primero salir' },
          { s: 'kenta', t: 'tienes razón. una cosa cada vez.' }
        ]}
      ]
    },
    { fx: { kenta: { awakening: 10 } } },
    { glitchLevel: 3 },
    { flag: 'kenta_ready' }
  ],
  advance: 50
},

/* ------------------- FASE 6 · FUGA ------------------- */
{
  id: 'kenta09',
  channel: 'dm', char: 'kenta',
  title: 'La pared que no estaba',
  day: 24, time: '04:10',
  phase: 6, mood: 'escape',
  requires: { done: ['kenta08'], flags: ['kenta_ready'] },
  preview: 'kenta: estoy de pie. me tiemblan las piernas. estoy de pie.',
  script: [
    { day: 'Día 24 · 04:10' },
    { mood: 'escape' },
    { s: 'kenta', t: 'estoy de pie' },
    { s: 'kenta', t: 'me tiemblan las piernas como si tuviera ochenta años pero estoy de pie', expr: 'tired' },
    { s: 'kenta', t: 'me he arrancado las cosas del brazo' },
    { s: 'kenta', t: 'dolía. ha dolido de verdad. eso me ha gustado.' },
    { s: 'kenta', t: 'llevaba un año sin que me doliera nada' },
    { wait: 1400 },
    { s: 'kenta', t: 'hay cuatro sillones' },
    { s: 'kenta', t: 'lara. reiko. ryu.' },
    { s: 'kenta', t: 'están todos aquí, {name}' },
    { s: 'kenta', t: 'les he hablado. no se despiertan.', expr: 'sad' },
    { s: 'kenta', t: 'a ryu le he dado un puñetazo en el hombro y nada' },
    { s: 'kenta', t: 'ryu se habría despertado. ryu se despierta con todo.' },
    { cam: ['hall', 'chairs', 'monitors', 'guard'] },
    { wait: 1600 },
    { s: 'kenta', t: 'vale. la puerta.' },
    { s: 'kenta', t: 'la del teclado. la que llevaba un año siendo una pared.' },
    { s: 'kenta', t: 'dime los seis números y no me digas que no te acuerdas' },
    {
      puzzle: {
        kind: 'code',
        title: 'SECTOR C · SALIDA',
        prompt: 'Seis dígitos, DDMMAA.\n\nLa fecha de ingreso de Kenta: 3 de febrero de 2024.\n\nLe esperaron un día. Un solo día.',
        answer: '030224',
        accept: ['030224'],
        hint: '03 · 02 · 24',
        onSolve: [
          { sys: 'CERRADURA · ABIERTA', kind: 'core' },
          { s: 'kenta', t: 'se ha abierto' },
          { s: 'kenta', t: 'JODER SE HA ABIERTO' },
          { flag: 'kenta_door_open' }
        ],
        onFail: [
          { sys: 'CÓDIGO INCORRECTO · 1 INTENTO RESTANTE', kind: 'alert' },
          { shake: true },
          { s: 'kenta', t: 'tranquila' },
          { s: 'kenta', t: 'tranquila, ¿vale? otra vez.' },
          { s: 'kenta', t: 'me esperaron un día. la fecha es la del día siguiente a mi cumpleaños.' },
          {
            puzzle: {
              kind: 'code',
              title: 'SECTOR C · SALIDA · último intento',
              prompt: 'Kenta cumple el 2 de febrero. Firmó al día siguiente, en 2024.',
              answer: '030224',
              accept: ['030224'],
              hint: '03 · 02 · 24',
              onSolve: [
                { sys: 'CERRADURA · ABIERTA', kind: 'core' },
                { s: 'kenta', t: 'se ha abierto' },
                { flag: 'kenta_door_open' }
              ],
              onFail: [
                { sys: 'BLOQUEO DE SEGURIDAD · ALERTA EN SECTOR C', kind: 'alert' },
                { shake: true },
                { flash: true },
                { s: 'kenta', t: 'se ha puesto todo rojo', broken: true },
                { fx: { kenta: { suspicion: 30 } } },
                { flag: 'kenta_alarm' }
              ]
            }
          }
        ]
      }
    },
    { wait: 1200 },
    {
      if: { flags: ['kenta_door_open'], statMax: { kenta: { suspicion: 24 } }, stat: { kenta: { awakening: 55, trust: 55, romance: 45 } } },
      then: [
        /* ---------- BUENO ---------- */
        { s: 'kenta', t: 'hay un pasillo' },
        { s: 'kenta', t: 'y al final hay una puerta con una barra' },
        { s: 'kenta', t: 'y por debajo entra luz' },
        { s: 'kenta', t: 'luz de fuera, {name}. luz de la calle.' },
        { wait: 2200 },
        { s: 'kenta', t: 'estoy fuera' },
        { s: 'kenta', t: 'estoy fuera y hace un frío horrible y hay un cartel de una tienda 24h' },
        { s: 'kenta', t: 'una tienda de verdad. con luz de verdad.' },
        { s: 'kenta', t: 'me voy a poner a llorar en la puerta de un konbini y me da exactamente igual', expr: 'vulnerable' },
        { wait: 1400 },
        { s: 'kenta', t: 'te voy a llamar' },
        { s: 'kenta', t: 'quiero que la primera cara que vea sea la tuya' },
        { s: 'kenta', t: 'aunque sea a través de una pantalla de mierda' },
        { call: 'kenta_good' },
        { wait: 800 },
        { mood: 'resolve' },
        { ending: { id: 'kenta_good', char: 'kenta', kind: 'good' } }
      ],
      else: [
        {
          if: { flags: ['kenta_door_open'] },
          then: [
            /* ---------- MALO ---------- */
            { s: 'kenta', t: 'hay un pasillo' },
            { s: 'kenta', t: 'corro' },
            { wait: 1600 },
            { sys: 'ALERTA · SECTOR C · SUJETO C-02 FUERA DE SILLÓN', kind: 'alert' },
            { shake: true },
            { s: 'kenta', t: 'se ha encendido todo' },
            { s: 'kenta', t: 'hay una alarma' },
            { s: 'kenta', t: 'hay gente' },
            { s: 'kenta', t: 'joder hay gente y son muchos', expr: 'shocked' },
            { s: 'kenta', t: 'te llamo. te llamo ahora. no cuelgues.', broken: true },
            { call: 'kenta_bad' },
            { wait: 800 },
            { mood: 'tense' },
            { ending: { id: 'kenta_bad', char: 'kenta', kind: 'bad' } }
          ],
          else: [
            /* ---------- NEUTRO ---------- */
            { sys: 'SUJOM · Corrigiendo incoherencia narrativa…', kind: 'core' },
            { wait: 2000 },
            { sys: 'SUJOM · Corrección aplicada. Sujeto C-02 estable.', kind: 'core' },
            { shake: true },
            { flash: true },
            { wait: 2600 },
            { s: 'kenta', t: 'buenos días', expr: 'neutral' },
            { s: 'kenta', t: 'he dormido como un tronco' },
            { s: 'kenta', t: 'no me pasaba en años' },
            { wait: 2200 },
            { me: 'Kenta. La puerta. La pared.' },
            { s: 'kenta', t: '¿qué pared?' },
            { s: 'kenta', t: 'oye estás rara últimamente' },
            { wait: 2400 },
            { s: 'kenta', t: 'aunque' },
            { s: 'kenta', t: 'me he despertado con el brazo dolorido' },
            { s: 'kenta', t: 'y con una frase en la cabeza' },
            { s: 'kenta', t: '"tirarás hacia mí"' },
            { wait: 2000 },
            { s: 'kenta', t: 'no sé de dónde ha salido' },
            { s: 'kenta', t: 'pero me he pasado la mañana repitiéndola', expr: 'worried' },
            { s: 'kenta', t: '¿tú sabes lo que significa?' },
            { mood: 'unease' },
            { ending: { id: 'kenta_neutral', char: 'kenta', kind: 'neutral' } }
          ]
        }
      ]
    }
  ]
}

];
