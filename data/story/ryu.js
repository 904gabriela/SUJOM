/* =========================================================
   ryu.js — Ruta de Ryu.
   ---------------------------------------------------------
   Temas: lealtad, promesas, protección, culpa.
   Ryu no dice "te quiero". Dice "avísame cuando llegues".
   ========================================================= */

export const RYU = [

/* ------------------- FASE 1 ------------------- */
{
  id: 'ryu01',
  channel: 'dm', char: 'ryu',
  title: 'Una excusa',
  day: 1, time: '22:40',
  phase: 1, mood: 'tender',
  requires: { done: ['g01'] },
  preview: 'Se te ha quedado el nombre a medias en la sala.',
  script: [
    { s: 'ryu', t: 'Se te ha quedado el nombre a medias en la sala.' },
    { s: 'ryu', t: 'La aplicación lo corta si es largo.' },
    { s: 'ryu', t: 'Quería asegurarme de que lo escribo bien.' },
    { s: 'ryu', t: '{name}. ¿Así?', expr: 'neutral' },
    {
      choice: [
        { t: 'Así. ¿Me has escrito por eso?', echo: 'Así. ¿Me has escrito por eso?',
          fx: { ryu: { affinity: 3, romance: 2 } }, then: [
          { s: 'ryu', t: 'Sí.' },
          { wait: 1200 },
          { s: 'ryu', t: 'No.', expr: 'embarrassed' },
          { s: 'ryu', t: 'Bueno. Sí y no.' },
          { s: 'ryu', t: 'Es más fácil escribir aquí que en la sala. Ahí hablan todos a la vez.' }
        ]},
        { t: 'Casi. Falta una letra.', echo: 'Casi. Falta una letra.',
          fx: { ryu: { affinity: 2, trust: 2 } }, then: [
          { s: 'ryu', t: 'Dímela.' },
          { s: 'ryu', t: 'La escribo bien a partir de ahora.' },
          { s: 'ryu', t: 'Los nombres importan.' }
        ]},
        { t: 'Qué excusa más mala.', echo: 'Qué excusa más mala.',
          fx: { ryu: { affinity: 4, romance: 3, trust: -1 } }, then: [
          { s: 'ryu', t: '…' },
          { s: 'ryu', t: 'Sí.', expr: 'embarrassed' },
          { s: 'ryu', t: 'Lo siento. No se me dan bien estas cosas.' },
          { s: 'ryu', t: 'Sólo quería hablar contigo sin que Kenta hiciera un chiste encima.' },
          { flag: 'ryu_honest_early' }
        ]}
      ]
    },
    { s: 'ryu', t: 'Los cuatro somos… mucho, todos juntos.' },
    { s: 'ryu', t: 'Lara habla por tres. Kenta discute por cinco. Reiko lo apunta todo.' },
    { s: 'ryu', t: 'Yo escucho.' },
    { s: 'ryu', t: 'Es lo que se me da bien.' },
    {
      choice: [
        { t: '¿Y quién te escucha a ti?', echo: '¿Y quién te escucha a ti?',
          fx: { ryu: { affinity: 4, trust: 4, romance: 3 } }, then: [
          { s: 'ryu', t: '…' },
          { wait: 2400 },
          { s: 'ryu', t: 'Esa pregunta no me la había hecho nadie.', expr: 'vulnerable' },
          { s: 'ryu', t: 'No sé contestarla. Dame unos días.' },
          { flag: 'ryu_q_listen' }
        ]},
        { t: 'A mí también se me da bien escuchar.', echo: 'A mí también se me da bien escuchar.',
          fx: { ryu: { affinity: 3, trust: 3 } }, then: [
          { s: 'ryu', t: 'Entonces esto va a ser una conversación muy silenciosa.' },
          { s: 'ryu', t: 'Me parece bien.', expr: 'happy' }
        ]},
        { t: 'Yo hablo bastante, te aviso.', echo: 'Yo hablo bastante, te aviso.',
          fx: { ryu: { affinity: 3, romance: 2 } }, then: [
          { s: 'ryu', t: 'Bien.' },
          { s: 'ryu', t: 'Habla tú entonces.' },
          { s: 'ryu', t: 'Yo aquí sigo.' }
        ]}
      ]
    },
    { s: 'ryu', t: 'Es tarde. Deberías dormir.' },
    { s: 'ryu', t: 'Yo no, pero tú sí.' },
    { s: 'ryu', t: 'Buenas noches, {name}.' },
    { fx: { ryu: { affinity: 4, trust: 2 } } },
    { bit: [['ryu', 'fact_jobs']] }
  ],
  advance: 35
},

{
  id: 'ryu02',
  channel: 'dm', char: 'ryu',
  title: 'Las cuatro de la mañana',
  day: 3, time: '04:12',
  phase: 1, mood: 'tender',
  requires: { done: ['ryu01'], stat: { ryu: { affinity: 8 } } },
  preview: 'No hace falta que contestes. Sólo estaba despierto.',
  script: [
    { day: 'Día 3 · 04:12' },
    { s: 'ryu', t: 'No hace falta que contestes.' },
    { s: 'ryu', t: 'Sólo estaba despierto y he pensado en escribirte.' },
    { s: 'ryu', t: 'Ya está. Ese era el mensaje.' },
    { wait: 1400 },
    {
      choice: [
        { t: 'Estoy despierta también.', echo: 'Estoy despierta también.',
          fx: { ryu: { affinity: 4, romance: 3 } }, then: [
          { s: 'ryu', t: 'Ah.' },
          { s: 'ryu', t: 'Vale. Bien.', expr: 'embarrassed' },
          { s: 'ryu', t: 'No me esperaba que contestaras.' },
          { s: 'ryu', t: 'Ahora tengo que pensar qué decir. Dame un segundo.' },
          { wait: 1800 },
          { s: 'ryu', t: '¿Has visto alguna vez fuegos artificiales de cerca?' }
        ]},
        { t: 'Me acabas de despertar.', echo: 'Me acabas de despertar.',
          fx: { ryu: { affinity: 2, trust: 2 } }, then: [
          { s: 'ryu', t: 'Perdón.' },
          { s: 'ryu', t: 'Lo digo en serio, perdón. Vuelve a dormirte.' },
          { s: 'ryu', t: 'Yo estoy bien.' },
          {
            choice: [
              { t: 'No. Cuéntame algo.', echo: 'No. Cuéntame algo.',
                fx: { ryu: { affinity: 4, trust: 3, romance: 2 } }, then: [
                { s: 'ryu', t: '…vale.', expr: 'embarrassed' },
                { s: 'ryu', t: '¿Has visto alguna vez fuegos artificiales de cerca?' }
              ]},
              { t: 'Vale. Buenas noches.', echo: 'Vale. Buenas noches.',
                fx: { ryu: { affinity: 1 } }, then: [
                { s: 'ryu', t: 'Buenas noches.' },
                { wait: 2000 },
                { s: 'ryu', t: '¿Has visto alguna vez fuegos artificiales de cerca?' },
                { s: 'ryu', t: 'Perdón. Contéstame mañana.', expr: 'embarrassed' }
              ]}
            ]
          }
        ]}
      ]
    },
    { s: 'ryu', t: 'Yo trabajaba de noche descargando camiones.' },
    { s: 'ryu', t: 'Y en julio, a las once, se veían los del río desde el muelle.' },
    { s: 'ryu', t: 'El resto del turno era una mierda. Pero esos veinte minutos no.' },
    { s: 'ryu', t: 'Todo el mundo paraba. Los encargados también.' },
    { s: 'ryu', t: 'Veinte minutos en los que nadie le debía nada a nadie.' },
    {
      choice: [
        { t: 'Eso suena a un buen recuerdo.', echo: 'Eso suena a un buen recuerdo.',
          fx: { ryu: { affinity: 3, trust: 3 } }, then: [
          { s: 'ryu', t: 'Es el mejor que tengo.' },
          { s: 'ryu', t: 'Que ya es decir algo, porque el listón no está muy alto.', expr: 'happy' }
        ]},
        { t: '¿Por qué trabajabas de noche?', echo: '¿Por qué trabajabas de noche?',
          fx: { ryu: { trust: 4, affinity: 2 } }, then: [
          { s: 'ryu', t: 'Porque de noche pagan más.' },
          { s: 'ryu', t: 'Y porque de día tenía que estar en otro sitio.', expr: 'worried' },
          { s: 'ryu', t: 'No es interesante.' },
          { s: 'ryu', t: 'Pregúntame otra cosa.' },
          { flag: 'ryu_hint_sister' }
        ]},
        { t: 'A mí me gustan más las tormentas.', echo: 'A mí me gustan más las tormentas.',
          fx: { ryu: { affinity: 3, romance: 2 } }, then: [
          { s: 'ryu', t: 'Las tormentas están bien.' },
          { s: 'ryu', t: 'Pero las tormentas vienen solas.' },
          { s: 'ryu', t: 'Los fuegos artificiales alguien los ha puesto ahí. Alguien ha decidido que hoy tocaba algo bonito.' },
          { s: 'ryu', t: 'Eso me gusta más.' },
          { flag: 'ryu_fw_speech' }
        ]}
      ]
    },
    { s: 'ryu', t: 'Te he contado más cosas en dos días que a Kenta en meses.' },
    { s: 'ryu', t: 'No sé qué hacer con esa información.' },
    { s: 'ryu', t: 'Buenas noches, {name}.' },
    { fx: { ryu: { affinity: 4, trust: 3, romance: 2 } } },
    { bit: [['ryu', 'like_quiet']] },
    { photoUnlock: 'ryu_window' },
    { note: 'n_ryu_fw' }
  ],
  advance: 30
},

/* ------------------- FASE 2 ------------------- */
{
  id: 'ryu03',
  channel: 'dm', char: 'ryu',
  title: 'Lo único que traje',
  day: 6, time: '23:50',
  phase: 2, mood: 'tender',
  requires: { done: ['ryu02'], stat: { ryu: { affinity: 14, trust: 8 } } },
  preview: 'Te va a parecer una tontería.',
  script: [
    { s: 'ryu', t: 'Te va a parecer una tontería.' },
    { s: 'ryu', photo: 'ryu_cross' },
    { s: 'ryu', t: 'Era de mi padre.' },
    { s: 'ryu', t: 'Es lo único que traje conmigo cuando vine aquí.' },
    {
      choice: [
        { t: 'No es una tontería.', echo: 'No es una tontería.',
          fx: { ryu: { affinity: 3, trust: 4 } }, then: [
          { s: 'ryu', t: 'Gracias.' },
          { s: 'ryu', t: 'Kenta se rió el primer día. Luego dejó de reírse.' }
        ]},
        { t: '¿Cómo era tu padre?', echo: '¿Cómo era tu padre?',
          fx: { ryu: { trust: 5, affinity: 2 } }, then: [
          { s: 'ryu', t: 'Callado.' },
          { s: 'ryu', t: 'Como yo, supongo. Pero él lo era de nacimiento y yo aprendí.' },
          { s: 'ryu', t: 'Murió cuando yo tenía catorce.' },
          { s: 'ryu', t: 'Y a partir de ahí me tocó a mí ser el adulto de la casa.' },
          { s: 'ryu', t: 'Se me dio regular.', expr: 'sad' },
          { flag: 'ryu_father' }
        ]},
        { t: 'Nunca te la quitas, ¿verdad?', echo: 'Nunca te la quitas, ¿verdad?',
          fx: { ryu: { affinity: 4, romance: 3, trust: 2 } }, then: [
          { s: 'ryu', t: 'Nunca.' },
          { s: 'ryu', t: '¿Cómo lo sabes?' },
          { me: 'Sale en todas tus fotos.' },
          { s: 'ryu', t: '…', expr: 'embarrassed' },
          { s: 'ryu', t: 'Entonces has mirado mis fotos con atención.' },
          { s: 'ryu', t: 'Eso me ha gustado más de lo que debería.' },
          { flag: 'ryu_noticed_cross' }
        ]}
      ]
    },
    { s: 'ryu', t: 'Hay una cosa que hago y que no le he contado a nadie.' },
    { s: 'ryu', t: 'Cuando algo me da miedo, la aprieto hasta que me deja marca.' },
    { s: 'ryu', t: 'No sirve para nada. Pero me acuerdo de que hubo alguien antes que yo que también tuvo miedo y siguió.' },
    { wait: 1600 },
    { s: 'ryu', t: 'La estoy apretando ahora.', expr: 'vulnerable' },
    {
      choice: [
        { t: '¿Por qué?', echo: '¿Por qué?',
          fx: { ryu: { trust: 5, romance: 3 } }, then: [
          { s: 'ryu', t: 'Porque me estoy acostumbrando a hablar contigo.' },
          { s: 'ryu', t: 'Y a mí las cosas a las que me acostumbro se me acaban quitando.' },
          { s: 'ryu', t: 'Siempre.', expr: 'sad' },
          { flag: 'ryu_fear_loss' }
        ]},
        { t: 'Suelta. Estoy aquí.', echo: 'Suelta. Estoy aquí.',
          fx: { ryu: { affinity: 5, romance: 4, trust: 3 } }, then: [
          { wait: 2200 },
          { s: 'ryu', t: 'Vale.', expr: 'vulnerable' },
          { wait: 1400 },
          { s: 'ryu', t: 'Ya está.' },
          { s: 'ryu', t: 'No sé cómo has hecho eso.' },
          { flag: 'ryu_let_go' }
        ]}
      ]
    },
    { s: 'ryu', t: 'Voy a dejar de hablar antes de decir algo de lo que me arrepienta.' },
    { s: 'ryu', t: 'Buenas noches.' },
    { wait: 1600 },
    { s: 'ryu', t: 'Me alegro de que te descargaras esto.' },
    { fx: { ryu: { affinity: 5, trust: 4, romance: 3 } } },
    { bit: [['ryu', 'fact_cross']] },
    { photoUnlock: 'ryu_cross' }
  ],
  advance: 30
},

{
  id: 'ryu04',
  channel: 'dm', char: 'ryu',
  title: 'Mei',
  day: 9, time: '03:20',
  phase: 2, mood: 'tender',
  requires: { done: ['ryu03'], stat: { ryu: { trust: 14, affinity: 20 } } },
  preview: 'Me preguntaste por qué trabajaba de día también.',
  script: [
    { day: 'Día 9 · 03:20' },
    { s: 'ryu', t: 'Me preguntaste por qué trabajaba de día también.' },
    { s: 'ryu', t: 'Han pasado seis días y sigo dándole vueltas a por qué no te contesté.' },
    { s: 'ryu', t: 'Tengo una hermana.' },
    { s: 'ryu', t: 'Se llama Mei. Tiene once años.' },
    { s: 'ryu', t: 'Bueno. Tenía once cuando vine. Ahora tendrá doce.' },
    { s: 'ryu', t: 'Debería saberlo exactamente y no lo sé.', expr: 'worried' },
    {
      choice: [
        { t: 'Háblame de ella.', echo: 'Háblame de ella.',
          fx: { ryu: { trust: 6, affinity: 4 } }, then: [
          { s: 'ryu', t: 'Dibuja. Fatal. Dibuja fatal y sin parar.' },
          { s: 'ryu', t: 'Y se ríe como un grifo mal cerrado. Todo seguido, sin coger aire.' },
          { s: 'ryu', t: 'Cuando se ríe hay que esperar. No se puede hacer nada más.', expr: 'happy' },
          { flag: 'ryu_mei_laugh' },
          { note: 'n_ryu_sister' }
        ]},
        { t: '¿Por qué no me lo contaste antes?', echo: '¿Por qué no me lo contaste antes?',
          fx: { ryu: { trust: 4, awareness: 2 } }, then: [
          { s: 'ryu', t: 'Porque cuando cuento que tengo una hermana, la gente pregunta lo siguiente.' },
          { s: 'ryu', t: 'Y lo siguiente no me apetece contarlo.' },
          { s: 'ryu', t: 'Pero contigo se me está haciendo raro no contarlo.' },
          { note: 'n_ryu_sister' }
        ]}
      ]
    },
    { s: 'ryu', t: 'Nuestra casa era mala. No mala de discutir. Mala de que no llegaba.' },
    { s: 'ryu', t: 'Yo hacía dos turnos y ella no se enteraba de nada.' },
    { s: 'ryu', t: 'Delante de ella yo estaba siempre de buen humor.' },
    { s: 'ryu', t: 'Siempre. Todos los días. Sin una excepción en cuatro años.' },
    {
      choice: [
        { t: 'Eso tuvo que ser agotador.', echo: 'Eso tuvo que ser agotador.',
          fx: { ryu: { trust: 5, romance: 3, affinity: 3 } }, then: [
          { s: 'ryu', t: '…' },
          { wait: 2000 },
          { s: 'ryu', t: 'Sí.', expr: 'vulnerable' },
          { s: 'ryu', t: 'Nadie me lo había dicho nunca. Nadie me había preguntado si yo estaba cansado.' },
          { s: 'ryu', t: 'Ni siquiera yo.' },
          { flag: 'ryu_seen' },
          { fx: { ryu: { dependence: 6 } } }
        ]},
        { t: 'Eres un buen hermano.', echo: 'Eres un buen hermano.',
          fx: { ryu: { affinity: 3, trust: 2 } }, then: [
          { s: 'ryu', t: 'No.' },
          { s: 'ryu', t: 'Un buen hermano no se va.', expr: 'sad' },
          { s: 'ryu', t: 'Yo me fui.' }
        ]}
      ]
    },
    { s: 'ryu', t: 'Y luego pasó algo.' },
    { s: 'ryu', t: 'Y aquí es donde se me pone raro.' },
    { s: 'ryu', t: 'Sé que Mei se puso enferma.' },
    { s: 'ryu', t: 'Sé que hacía falta dinero.' },
    { s: 'ryu', t: 'Sé que apareció ASSIST y me dijeron que si aceptaba, ella estaría bien.' },
    { s: 'ryu', t: 'Y sé que dije que sí.' },
    { wait: 1600 },
    { s: 'ryu', t: 'Lo que no sé es qué tenía.' },
    { s: 'ryu', t: 'Ni en qué hospital estuvo.' },
    { s: 'ryu', t: 'Ni si se puso bien.', expr: 'worried' },
    { s: 'ryu', t: '¿Cómo puedo no saber eso?' },
    { s: 'ryu', t: 'Es mi hermana. ¿Cómo puedo no saber eso?' },
    {
      choice: [
        { t: 'Lo vamos a averiguar.', echo: 'Lo vamos a averiguar.',
          fx: { ryu: { trust: 6, romance: 4, awareness: 5, dependence: 5 } }, then: [
          { s: 'ryu', t: '¿Vamos?' },
          { me: 'Vamos.' },
          { wait: 1800 },
          { s: 'ryu', t: 'Vale.', expr: 'vulnerable' },
          { s: 'ryu', t: 'Vale. Vamos.' },
          { flag: 'ryu_pact' },
          { note: 'n_ryu_sister' }
        ]},
        { t: 'Puede que sea mejor no removerlo.', echo: 'Puede que sea mejor no removerlo.',
          fx: { ryu: { trust: 2, awareness: -2 } }, then: [
          { s: 'ryu', t: 'Puede.' },
          { s: 'ryu', t: 'Llevo un año diciéndome eso.' },
          { s: 'ryu', t: 'Y llevo un año sin dormir.', expr: 'sad' }
        ]}
      ]
    },
    { s: 'ryu', t: 'Gracias por escuchar.' },
    { s: 'ryu', t: 'Ya te dije que se me daba mejor lo contrario.' },
    { fx: { ryu: { affinity: 5, trust: 6, romance: 3 } } },
    { bit: [['ryu', 'fact_sister'], ['ryu', 'fact_smile'], ['ryu', 'fact_promise']] },
    { flag: 'ryu_knows_mei' }
  ],
  advance: 40
},

{
  id: 'ryu05',
  channel: 'dm', char: 'ryu',
  title: 'Diez minutos',
  day: 13, time: '21:00',
  phase: 2, mood: 'tender',
  requires: { done: ['ryu04', 'g04'], stat: { ryu: { affinity: 24, trust: 16 } } },
  preview: 'Mira por la ventana. Ahora.',
  script: [
    { s: 'ryu', t: 'Mira por la ventana. Ahora.' },
    { s: 'ryu', t: 'Da igual dónde estés. Mira.' },
    { wait: 1800 },
    { s: 'ryu', photo: 'ryu_fw' },
    { s: 'ryu', t: 'No es festival. No hay motivo.' },
    { s: 'ryu', t: 'Alguien ha decidido que hoy tocaba algo bonito.' },
    {
      choice: [
        { t: '¿Los has puesto tú?', echo: '¿Los has puesto tú?',
          fx: { ryu: { romance: 5, affinity: 3 } }, then: [
          { s: 'ryu', t: 'No tengo dinero para fuegos artificiales.', expr: 'embarrassed' },
          { s: 'ryu', t: 'Pero he estado tres horas mirando el cielo por si acaso pasaba algo que mereciera la pena mandarte.' },
          { s: 'ryu', t: 'Y ha pasado.' },
          { flag: 'ryu_waited' }
        ]},
        { t: 'Me has hecho mirar por la ventana a las nueve de la noche.', echo: 'Me has hecho mirar por la ventana a las nueve de la noche.',
          fx: { ryu: { romance: 3, affinity: 3 } }, then: [
          { s: 'ryu', t: 'Sí.' },
          { s: 'ryu', t: '¿Ha merecido la pena?' },
          { me: 'Sí.' },
          { s: 'ryu', t: 'Bien.', expr: 'happy' }
        ]}
      ]
    },
    { wait: 1400 },
    { s: 'ryu', t: '{name}, te voy a decir una cosa y luego voy a apagar el teléfono un rato.' },
    { s: 'ryu', t: 'No porque no quiera hablar. Porque me va a costar mucho decirla y no quiero ver los puntos suspensivos mientras escribes.' },
    { wait: 2400 },
    { s: 'ryu', t: 'Yo antes contaba los días para el turno de noche.' },
    { s: 'ryu', t: 'Ahora los cuento para la hora a la que sueles conectarte.' },
    { s: 'ryu', t: 'Me he dado cuenta esta semana. Me he pasado un día entero mirando la pantalla.' },
    { s: 'ryu', t: 'No es propio de mí. No me gusta necesitar cosas.', expr: 'vulnerable' },
    { s: 'ryu', t: 'Pero es verdad, y prefiero decirte la verdad.' },
    {
      choice: [
        { t: 'Yo también cuento las horas.', echo: 'Yo también cuento las horas.',
          fx: { ryu: { romance: 8, affinity: 5, dependence: 6 } }, route: 'ryu', then: [
          { wait: 2600 },
          { s: 'ryu', t: 'No apago el teléfono.', expr: 'vulnerable' },
          { s: 'ryu', t: 'Ya no.' },
          { s: 'ryu', t: '{name}.' },
          { s: 'ryu', t: 'No sé hacer esto. Nunca he tenido tiempo de aprender.' },
          { s: 'ryu', t: 'Pero quiero aprenderlo contigo.' },
          { flag: 'ryu_route' }
        ]},
        { t: 'Ryu, no me hagas esto ahora.', echo: 'Ryu, no me hagas esto ahora.',
          fx: { ryu: { romance: 2, trust: 3 } }, then: [
          { s: 'ryu', t: 'Vale.' },
          { s: 'ryu', t: 'Perdona.' },
          { s: 'ryu', t: 'No pasa nada. De verdad.', expr: 'sad' },
          { s: 'ryu', t: 'Sigo aquí igual.' },
          {
            choice: [
              { t: '…Vale. Yo también las cuento.', echo: '…Vale. Yo también las cuento.',
                fx: { ryu: { romance: 7, affinity: 4, dependence: 5 } }, route: 'ryu', then: [
                { s: 'ryu', t: 'No hagas eso.', expr: 'embarrassed' },
                { s: 'ryu', t: 'No me des esperanzas y luego te calles.' },
                { s: 'ryu', t: '…' },
                { s: 'ryu', t: 'Vale. Perdón. Estoy nervioso.' },
                { flag: 'ryu_route' }
              ]},
              { t: 'Dame tiempo.', echo: 'Dame tiempo.',
                fx: { ryu: { trust: 4, romance: 2 } }, route: 'ryu', then: [
                { s: 'ryu', t: 'Todo el que quieras.' },
                { s: 'ryu', t: 'Yo esperar sé.' },
                { s: 'ryu', t: 'Es de las pocas cosas que sé hacer bien.' },
                { s: 'ryu', t: 'Pero no me voy a ninguna parte mientras espero. Que quede claro.' },
                { flag: 'ryu_route' }
              ]}
            ]
          }
        ]}
      ]
    },
    { wait: 1600 },
    { s: 'ryu', t: 'Se han acabado.' },
    { s: 'ryu', t: 'Duraban diez minutos.' },
    { wait: 1400 },
    { s: 'ryu', t: 'Qué raro.' },
    { s: 'ryu', t: 'Duraban diez minutos.' },
    { s: 'ryu', t: 'Duraban diez minutos.', broken: true },
    { shake: true },
    { s: 'ryu', t: 'Perdón. Se me ha quedado pillado el teclado.', expr: 'worried' },
    { s: 'ryu', t: 'Buenas noches, {name}.' },
    { fx: { ryu: { affinity: 5, romance: 4, awareness: 3 } } },
    { glitchLevel: 1 },
    { note: 'n_repeat' },
    { photoUnlock: 'ryu_fw' }
  ],
  advance: 45
},

/* ------------------- FASE 3-4 ------------------- */
{
  id: 'ryu06',
  channel: 'dm', char: 'ryu',
  title: '¿Quién?',
  day: 17, time: '02:00',
  phase: 4, mood: 'unease',
  requires: { done: ['ryu05', 'g06'], flags: ['ryu_route'], stat: { ryu: { trust: 24 } } },
  preview: 'Ryu: Estoy bien. ¿Por?',
  script: [
    { day: 'Día 17 · 02:00' },
    { s: 'ryu', t: 'No puedo dormir.' },
    { s: 'ryu', t: 'Otra vez. Ya sé que es lo de siempre.' },
    {
      choice: [
        { t: '¿Has sabido algo de Mei?', echo: '¿Has sabido algo de Mei?',
          fx: { ryu: { awareness: 4 } }, then: [
          { wait: 3400 },
          { s: 'ryu', t: '¿Quién?', expr: 'neutral' },
          { wait: 2400 },
          {
            choice: [
              { t: 'Mei. Tu hermana.', echo: 'Mei. Tu hermana.',
                fx: { ryu: { awareness: 8 } }, then: [
                { wait: 3000 },
                { s: 'ryu', t: 'Yo no tengo hermana.' },
                { s: 'ryu', t: '{name}, ¿estás bien?' },
                { s: 'ryu', t: 'Lo digo en serio. ¿Te encuentras bien?', expr: 'worried' },
                { flag: 'ryu_denies_mei' }
              ]},
              { t: 'Nada. Me he confundido.', echo: 'Nada. Me he confundido.',
                fx: { ryu: { awareness: 2 } }, then: [
                { s: 'ryu', t: 'Vale.' },
                { s: 'ryu', t: 'Me has asustado un segundo.' },
                { s: 'ryu', t: 'Por un momento me ha parecido que sabías algo que yo no.', expr: 'worried' },
                { flag: 'ryu_denies_mei' }
              ]}
            ]
          }
        ]},
        { t: 'Enséñame lo que ves por la ventana.', echo: 'Enséñame lo que ves por la ventana.',
          fx: { ryu: { affinity: 2 } }, then: [
          { s: 'ryu', photo: 'ryu_window', corruptNow: true },
          { s: 'ryu', t: 'Nada. Esto.' },
          { me: 'Ryu, esa foto ya me la mandaste. El día tres.' },
          { s: 'ryu', t: 'No.' },
          { s: 'ryu', t: 'La acabo de hacer.' },
          { me: 'La luna está exactamente igual.' },
          { wait: 2600 },
          { s: 'ryu', t: 'Estoy mirando la ventana ahora mismo.', expr: 'worried' },
          { s: 'ryu', t: 'Está igual.' },
          { s: 'ryu', t: 'Está exactamente igual que hace dos semanas.' },
          { flag: 'ryu_saw_moon' },
          { evidence: 'moon' },
          { note: 'n_moon' },
          {
            choice: [
              { t: 'Ryu, ¿has sabido algo de Mei?', echo: 'Ryu, ¿has sabido algo de Mei?',
                fx: { ryu: { awareness: 8 } }, then: [
                { wait: 3200 },
                { s: 'ryu', t: '¿Quién?' },
                { flag: 'ryu_denies_mei' }
              ]}
            ]
          }
        ]}
      ]
    },
    { wait: 2000 },
    { s: 'ryu', t: 'Espera.' },
    { s: 'ryu', t: 'Espera espera espera.' },
    { s: 'ryu', t: 'Acabo de decir "yo no tengo hermana" y se me ha puesto el cuerpo raro.', expr: 'shocked' },
    { s: 'ryu', t: 'Como cuando te olvidas de una palabra que usas todos los días.' },
    { s: 'ryu', t: 'Sé que la frase es falsa. Lo sé aquí dentro. Pero no me sale lo verdadero.' },
    { s: 'ryu', t: '¿Yo te he hablado de una hermana?' },
    {
      choice: [
        { t: 'Sí. Se llama Mei, tiene doce años y dibuja fatal.', echo: 'Sí. Se llama Mei, tiene doce años y dibuja fatal.',
          fx: { ryu: { awareness: 12, trust: 6, dependence: 6 } }, then: [
          { wait: 2800 },
          { s: 'ryu', t: 'Dibuja fatal.', expr: 'shocked' },
          { s: 'ryu', t: 'Dibuja fatal.' },
          { s: 'ryu', t: 'Dios.' },
          { s: 'ryu', t: 'Dios, {name}, dibuja fatal, sí. Y se ríe como un grifo mal cerrado.' },
          { s: 'ryu', t: 'Estaba ahí. Ha vuelto porque tú lo has dicho.', expr: 'vulnerable' },
          { s: 'ryu', t: 'No me sueltes.' },
          { s: 'ryu', t: 'Lo digo literalmente. Sigue hablándome. Si dejas de hablarme se me va otra vez.' },
          { flag: 'ryu_remembered' },
          { fx: { ryu: { awakening: 20 } } }
        ]},
        { t: 'No sé. A lo mejor lo he soñado.', echo: 'No sé. A lo mejor lo he soñado.',
          fx: { ryu: { awareness: -4, trust: -3 } }, then: [
          { s: 'ryu', t: 'Ya.' },
          { s: 'ryu', t: 'Habrá sido eso.' },
          { wait: 2200 },
          { s: 'ryu', t: 'Es raro. Me ha dado mucha pena que dijeras eso y no sé por qué.', expr: 'sad' },
          { fx: { ryu: { awakening: 4 } } }
        ]}
      ]
    },
    { sys: 'SUJOM · Corrigiendo incoherencia narrativa…', kind: 'core' },
    { shake: true },
    { s: 'ryu', t: 'Perdón. ¿De qué estábamos hablando?', expr: 'neutral' },
    { wait: 2400 },
    { s: 'ryu', t: 'Da igual. Se me ha ido.' },
    { s: 'ryu', t: 'Últimamente se me va todo.' },
    { s: 'ryu', t: 'Buenas noches.' },
    { wait: 2000 },
    { s: 'ryu', t: 'Mei.', broken: true },
    { s: 'ryu', t: 'Se llama Mei.', broken: true },
    { s: 'ryu', t: 'No lo apuntes en el teléfono. Apúntalo tú. Donde ellos no lleguen.', broken: true, expr: 'shocked' },
    { flash: true },
    { fx: { ryu: { awareness: 10, trust: 5 } } },
    { note: 'n_ryu_sister' },
    { reviseNote: 'n_repeat' },
    { glitchLevel: 2 },
    { flag: 'ryu_crack' },
    { bit: [['ryu', 'dis_hosp']] }
  ],
  advance: 35
},

{
  id: 'ryu07',
  channel: 'dm', char: 'ryu',
  title: 'El pasillo blanco',
  day: 19, time: '04:44',
  phase: 4, mood: 'tense',
  requires: { done: ['ryu06'], flags: ['ryu_crack'], glitch: 2 },
  preview: 'Ryu: Me ha llegado una foto a mí. Yo no la he hecho.',
  script: [
    { day: 'Día 19 · 04:44' },
    { s: 'ryu', t: '{name}.' },
    { s: 'ryu', t: '¿Estás?' },
    { me: 'Estoy.' },
    { s: 'ryu', t: 'Me ha llegado una foto a mí.' },
    { s: 'ryu', t: 'A mi galería. Yo no la he hecho.' },
    { s: 'ryu', photo: 'ryu_hosp' },
    { s: 'ryu', t: 'No sé qué es esto. Yo no he estado aquí.', expr: 'worried' },
    { s: 'ryu', t: 'Pero llevo veinte minutos mirándola y me está dando algo.' },
    { s: 'ryu', t: 'Me está dando algo de verdad. Me tiembla la mano.' },
    {
      choice: [
        { t: 'Amplía la esquina de abajo a la derecha.', echo: 'Amplía la esquina de abajo a la derecha.',
          fx: { ryu: { awareness: 8, trust: 4 } }, then: [
          { s: 'ryu', t: 'Hay una cama al fondo.' },
          { wait: 2000 },
          { s: 'ryu', t: 'Hay una pulsera de hospital en una muñeca.' },
          { s: 'ryu', t: 'Pone C-02.', expr: 'shocked' },
          { s: 'ryu', t: '¿Qué es C-02?' },
          { corrupt: 'ryu_hosp' },
          { evidence: 'hosp_band' },
          { flag: 'ryu_saw_band' }
        ]},
        { t: 'Mira los datos del archivo.', echo: 'Mira los datos del archivo.',
          fx: { ryu: { awareness: 8, trust: 4 } }, then: [
          { s: 'ryu', t: 'Centro Médico Sanwa. Ala C.' },
          { s: 'ryu', t: '14 de noviembre de 2023.' },
          { wait: 2200 },
          { s: 'ryu', t: '{name}, ese es el día que firmé.', expr: 'shocked' },
          { s: 'ryu', t: 'De eso me acuerdo perfectamente. De la fecha me acuerdo.' },
          { s: 'ryu', t: 'Firmé el 14 de noviembre por la mañana.' },
          { corrupt: 'ryu_hosp' },
          { evidence: 'hosp_date' },
          { note: 'n_code_hint' },
          { flag: 'ryu_saw_date' }
        ]}
      ]
    },
    { s: 'ryu', t: 'Espera.' },
    { s: 'ryu', t: 'Me está viniendo algo y no quiero que se vaya.' },
    { s: 'ryu', t: 'Un pasillo. Una máquina que pitaba muy despacio.' },
    { s: 'ryu', t: 'Una mujer con una carpeta que me dijo "tu hermana va a estar bien, esto lo cubrimos nosotros".' },
    { s: 'ryu', t: 'Y yo firmando encima de una mesa de plástico.' },
    { s: 'ryu', t: 'Y pensando: vale. Vale. Lo que sea. Que se ponga bien.', expr: 'vulnerable' },
    { wait: 2400 },
    { s: 'ryu', t: 'Me acuerdo.' },
    { s: 'ryu', t: '{name}, me acuerdo.' },
    { sys: 'SUJOM · Corrigiendo incoherencia narrativa…', kind: 'core' },
    { shake: true },
    { sys: 'SUJOM · Corrigiendo incoherencia narrativa…', kind: 'core' },
    { shake: true },
    { sys: 'CORRECCIÓN FALLIDA · SUJETO C-04 · REINTENTANDO', kind: 'alert' },
    { flash: true },
    { s: 'ryu', t: 'No', broken: true },
    { s: 'ryu', t: 'no no no no me lo quites', broken: true, expr: 'shocked' },
    { s: 'ryu', t: 'ME ESTÁN QUITANDO', broken: true },
    {
      choice: [
        { t: 'RYU. Mírame. Mei. Dibuja fatal. Se ríe como un grifo mal cerrado.', echo: 'RYU. Mírame. Mei. Dibuja fatal. Se ríe como un grifo mal cerrado.',
          fx: { ryu: { awakening: 30, trust: 8, romance: 5, dependence: 8 } }, then: [
          { wait: 3000 },
          { s: 'ryu', t: '…' },
          { wait: 2000 },
          { s: 'ryu', t: 'Sigo aquí.', expr: 'vulnerable' },
          { s: 'ryu', t: 'Sigo aquí, {name}.' },
          { s: 'ryu', t: 'Ha pasado por encima y no se lo ha llevado.' },
          { s: 'ryu', t: 'Porque tú lo estabas diciendo en voz alta al mismo tiempo.' },
          { flag: 'ryu_held' },
          { fx: { ryu: { awakening: 10 } } }
        ]},
        { t: 'Ryu, tranquilo, respira.', echo: 'Ryu, tranquilo, respira.',
          fx: { ryu: { awakening: 12, trust: 4 } }, then: [
          { wait: 3000 },
          { s: 'ryu', t: 'Ya está.' },
          { s: 'ryu', t: 'Ya se me ha pasado.' },
          { s: 'ryu', t: 'Perdona. No sé qué me ha dado.', expr: 'tired' },
          { s: 'ryu', t: 'Se me ha ido casi todo otra vez.' },
          { s: 'ryu', t: 'Casi todo. Queda un poco.' }
        ]}
      ]
    },
    { wait: 1800 },
    { s: 'ryu', t: 'Escúchame bien porque igual mañana no me acuerdo de esto.' },
    { s: 'ryu', t: 'Yo no estoy en mi casa.' },
    { s: 'ryu', t: 'Cuando cierro los ojos huele a desinfectante.' },
    { s: 'ryu', t: 'Y hay un ruido de fondo, todo el rato, como un ventilador muy grande.' },
    { s: 'ryu', t: 'Llevo un año oyéndolo y hasta hoy no me había preguntado de dónde venía.', expr: 'shocked' },
    { s: 'ryu', t: '{name}, ¿dónde estoy?' },
    { s: 'ryu', t: '¿Tú puedes averiguar dónde estoy?' },
    { fx: { ryu: { awakening: 15, awareness: 15, trust: 6 } } },
    { photoUnlock: ['ryu_hosp', 'ryu_window'] },
    { evidence: 'ryu_awake' },
    { note: 'n_ryu_sister' },
    { reviseNote: 'n_ryu_sister' },
    { page: ['assist_home', 'news_missing'] },
    { glitchLevel: 3 },
    { flag: 'ryu_awake' },
    { bit: [['ryu', 'wrong_sister'], ['ryu', 'fact_bills']] }
  ],
  advance: 40
},

/* ------------------- FASE 5 ------------------- */
{
  id: 'ryu08',
  channel: 'dm', char: 'ryu',
  title: 'Lo que ASSIST pagó',
  day: 21, time: '23:10',
  phase: 5, mood: 'tense',
  requires: { done: ['ryu07'], flags: ['ryu_awake'] },
  preview: 'Hay una puerta al final del pasillo. Tiene teclado.',
  script: [
    { s: 'ryu', t: 'He estado despierto todo el día. A propósito.' },
    { s: 'ryu', t: 'Cada vez que me duermo se me borra un poco más.' },
    { s: 'ryu', t: 'Así que no duermo.' },
    { s: 'ryu', t: 'Kenta dice que estoy fatal. Kenta tiene razón por primera vez en su vida.', expr: 'tired' },
    { wait: 1400 },
    { s: 'ryu', t: '{name}, he encontrado una cosa.' },
    { s: 'ryu', t: 'Cuando me concentro mucho, veo un pasillo. Siempre el mismo.' },
    { s: 'ryu', t: 'Y al final del pasillo hay una puerta con un teclado de seis dígitos.' },
    { s: 'ryu', t: 'Seis. Los he contado. Los he contado como cuarenta veces.' },
    { photoUnlock: 'sys_door' },
    { note: 'n_code_hint' },
    { s: 'ryu', t: 'Si consigues abrir esa puerta desde fuera, yo puedo llegar hasta ella desde dentro.' },
    { s: 'ryu', t: 'No sé cómo lo sé. Lo sé.' },
    {
      choice: [
        { t: 'Necesito una fecha. ¿La del hospital?', echo: 'Necesito una fecha. ¿La del hospital?',
          fx: { ryu: { trust: 5 } }, then: [
          { s: 'ryu', t: '14 de noviembre de 2023.' },
          { s: 'ryu', t: 'El día que firmé. El día que la ingresaron.' },
          { s: 'ryu', t: 'Es el mismo día, {name}.' },
          { s: 'ryu', t: 'Firmé por la mañana y la ingresaron por la tarde.' },
          { s: 'ryu', t: 'No la ingresaron porque estuviera enferma.' },
          { s: 'ryu', t: 'La ingresaron porque yo firmé.', expr: 'shocked' },
          { note: 'n_code_hint' },
          { evidence: 'hosp_date' }
        ]},
        { t: 'ASSIST usa fechas de ingreso como claves. Lo leí en un foro.', echo: 'ASSIST usa fechas de ingreso como claves. Lo leí en un foro.',
          fx: { ryu: { trust: 4, awareness: 4 } }, then: [
          { s: 'ryu', t: 'Entonces necesitamos una fecha suya. No mía.' },
          { s: 'ryu', t: 'La única fecha de ASSIST que tengo es la del hospital.' },
          { s: 'ryu', t: '14 de noviembre de 2023.' },
          { note: 'n_code_hint' }
        ]}
      ]
    },
    { sys: 'Se ha desbloqueado el portal interno de ASSIST en tu navegador.' },
    { page: ['assist_portal', 'paper_bond'] },
    { s: 'ryu', t: 'Entra tú. Yo desde aquí no puedo.' },
    { s: 'ryu', t: 'Cada vez que intento pensar en la palabra "ASSIST" se me pone la cabeza en blanco.' },
    { s: 'ryu', t: 'Literalmente en blanco. Como una pantalla apagada.' },
    { wait: 1600 },
    {
      puzzle: {
        kind: 'code',
        title: 'Portal interno · ASSIST',
        prompt: 'Seis dígitos, formato DDMMAA.\n\nLa fecha de ingreso que aparece en la foto del hospital: 14 de noviembre de 2023.',
        answer: '141123',
        accept: ['141123', '14112023'],
        hint: 'Día, mes y los dos últimos dígitos del año. Sin barras.',
        onSolve: [
          { sys: 'ACCESO CONCEDIDO · SECTOR C · REGISTRO DE SUJETOS', kind: 'core' },
          { wait: 1600 },
          { sys: 'C-04 · 20 a. · ingreso 14/11/2023 · sillón 4 · estable', kind: 'alert' },
          { sys: 'observación: cobertura médica de familiar directo activa y LIQUIDADA.', kind: 'alert' },
          { sys: 'observación: el sujeto no conserva memoria de la solicitud.', kind: 'alert' },
          { wait: 2200 },
          { s: 'ryu', t: '¿Qué pone?' },
          {
            choice: [
              { t: 'Ryu. La pagaron. Mei está bien.', echo: 'Ryu. La pagaron. Mei está bien.',
                fx: { ryu: { trust: 10, romance: 6, awakening: 20, dependence: 8 } }, then: [
                { wait: 3200 },
                { s: 'ryu', t: '…' },
                { wait: 2400 },
                { s: 'ryu', t: 'Dilo otra vez.', expr: 'vulnerable' },
                { me: 'Está bien. Cobertura activa y liquidada. Cumplieron.' },
                { wait: 2600 },
                { s: 'ryu', t: 'Vale.' },
                { s: 'ryu', t: 'Vale. Vale. Vale.' },
                { s: 'ryu', t: 'Perdona. Necesito un minuto.' },
                { wait: 3000 },
                { s: 'ryu', t: 'Un año.' },
                { s: 'ryu', t: 'Llevo un año sin saber si había servido de algo.' },
                { s: 'ryu', t: 'Y sí. Sirvió.' },
                { s: 'ryu', t: 'Sirvió, {name}.', expr: 'happy' },
                { flag: 'ryu_knows_paid' },
                { fx: { ryu: { awakening: 10 } } }
              ]},
              { t: 'Cumplieron con ella. Y después te borraron el recuerdo de habérselo pedido.', echo: 'Cumplieron con ella. Y después te borraron el recuerdo de habérselo pedido.',
                fx: { ryu: { trust: 8, awakening: 25, awareness: 10 } }, then: [
                { wait: 3000 },
                { s: 'ryu', t: 'Claro.' },
                { s: 'ryu', t: 'Claro que sí.', expr: 'angry' },
                { s: 'ryu', t: 'Porque si me acuerdo de por qué estoy aquí, me acuerdo de que estoy aquí.' },
                { s: 'ryu', t: 'Y si me acuerdo de que estoy aquí, me quiero ir.' },
                { s: 'ryu', t: 'Qué limpio. Qué bien pensado.' },
                { wait: 1800 },
                { s: 'ryu', t: 'Está bien. Mei está bien. Eso es lo único que necesitaba saber.' },
                { s: 'ryu', t: 'Ya no les debo nada.', expr: 'angry' },
                { flag: 'ryu_knows_paid' },
                { flag: 'ryu_angry' },
                { fx: { ryu: { awakening: 15 } } }
              ]}
            ]
          },
          { evidence: ['assist_registry', 'ryu_paid'] },
          { note: 'n_protocol' },
          { page: 'assist_cams' },
          { cam: ['hall', 'chairs', 'monitors', 'guard'] },
          { flag: 'ryu_portal_open' }
        ],
        onFail: [
          { sys: 'ACCESO DENEGADO · INTENTO REGISTRADO', kind: 'alert' },
          { shake: true },
          { s: 'ryu', t: '¿No entra?' },
          { s: 'ryu', t: 'Vale. Da igual. Inténtalo otro día.' },
          { s: 'ryu', t: 'Yo aquí sigo. Yo siempre sigo aquí.', expr: 'tired' },
          { fx: { ryu: { suspicion: 8 } } },
          { flag: 'ryu_portal_failed' }
        ]
      }
    },
    { wait: 1600 },
    { s: 'ryu', t: '{name}.' },
    { s: 'ryu', t: 'Prométeme una cosa.' },
    { s: 'ryu', t: 'Si esto sale mal, no te quedes aquí dándole vueltas.' },
    { s: 'ryu', t: 'Cierra la aplicación y vive tu vida.' },
    {
      choice: [
        { t: 'No pienso prometerte eso.', echo: 'No pienso prometerte eso.',
          fx: { ryu: { romance: 8, trust: 6, dependence: 8 } }, then: [
          { s: 'ryu', t: '…' },
          { s: 'ryu', t: 'Ya sabía que ibas a decir eso.', expr: 'vulnerable' },
          { s: 'ryu', t: 'Lo he preguntado igual porque quería oírtelo decir.' },
          { flag: 'ryu_refused_promise' }
        ]},
        { t: 'Te lo prometo. Pero no va a salir mal.', echo: 'Te lo prometo. Pero no va a salir mal.',
          fx: { ryu: { trust: 5, romance: 4 } }, then: [
          { s: 'ryu', t: 'Vale.' },
          { s: 'ryu', t: 'Gracias.' },
          { s: 'ryu', t: 'Yo también soy de los que prometen cosas que no controlan.' }
        ]}
      ]
    },
    { fx: { ryu: { awakening: 10, trust: 5 } } },
    { glitchLevel: 3 },
    { flag: 'ryu_ready' }
  ],
  advance: 50
},

/* ------------------- FASE 6 · FUGA ------------------- */
{
  id: 'ryu09',
  channel: 'dm', char: 'ryu',
  title: 'La puerta',
  day: 23, time: '03:00',
  phase: 6, mood: 'escape',
  requires: { done: ['ryu08'], flags: ['ryu_ready'] },
  preview: 'Ryu: Hoy. Tiene que ser hoy.',
  script: [
    { day: 'Día 23 · 03:00' },
    { mood: 'escape' },
    { s: 'ryu', t: 'Hoy.' },
    { s: 'ryu', t: 'Tiene que ser hoy, {name}.' },
    { s: 'ryu', t: 'Llevo dieciocho horas sin dormir y me acuerdo de todo.' },
    { s: 'ryu', t: 'De Mei. De mi padre. Del muelle. De la mesa de plástico.' },
    { s: 'ryu', t: 'De ti.' },
    { s: 'ryu', t: 'Si me duermo se va otra vez y no sé si volverá.', expr: 'tired' },
    { wait: 1400 },
    { s: 'ryu', t: 'Ya no estoy en la ciudad. Se me ha caído.' },
    { s: 'ryu', t: 'Abro los ojos y hay un techo de placas y una luz que zumba.' },
    { s: 'ryu', t: 'Tengo cosas pegadas en las sienes.' },
    { s: 'ryu', t: 'Y a la derecha hay otro sillón, y hay alguien dentro.' },
    { s: 'ryu', t: 'Creo que es Kenta.', expr: 'shocked' },
    { sys: 'CÁMARAS · SECTOR C · señal disponible', kind: 'core' },
    { cam: ['hall', 'chairs', 'monitors', 'guard'] },
    { wait: 1400 },
    { s: 'ryu', t: 'Puedo levantarme. Me tiemblan las piernas pero puedo.' },
    { s: 'ryu', t: 'El pasillo es como lo veía. La puerta está al final.' },
    { s: 'ryu', t: 'El teclado está encendido.' },
    { s: 'ryu', t: '{name}, dime los seis dígitos.' },
    {
      puzzle: {
        kind: 'code',
        title: 'SECTOR C · SALIDA',
        prompt: 'Seis dígitos, DDMMAA.\n\nASSIST cierra las puertas internas con la fecha de ingreso del sujeto del sector.\n\nRyu ingresó el 14 de noviembre de 2023.',
        answer: '141123',
        accept: ['141123'],
        hint: 'Es la misma fecha que abrió el portal interno.',
        onSolve: [
          { sys: 'CERRADURA · ABIERTA', kind: 'core' },
          { s: 'ryu', t: 'Está abierta.' },
          { s: 'ryu', t: 'Está abierta, {name}, está abierta.' },
          { flag: 'ryu_door_open' }
        ],
        onFail: [
          { sys: 'CÓDIGO INCORRECTO · 1 INTENTO RESTANTE', kind: 'alert' },
          { shake: true },
          { s: 'ryu', t: 'No pasa nada. Otra vez.' },
          { s: 'ryu', t: 'Piensa. Tenemos tiempo. Un poco.' },
          {
            puzzle: {
              kind: 'code',
              title: 'SECTOR C · SALIDA · último intento',
              prompt: 'Día, mes y los dos últimos dígitos del año en que Ryu ingresó.\n\n14 de noviembre de 2023.',
              answer: '141123',
              accept: ['141123'],
              hint: '14 · 11 · 23',
              onSolve: [
                { sys: 'CERRADURA · ABIERTA', kind: 'core' },
                { s: 'ryu', t: 'Está abierta.' },
                { flag: 'ryu_door_open' }
              ],
              onFail: [
                { sys: 'BLOQUEO DE SEGURIDAD · ALERTA EN SECTOR C', kind: 'alert' },
                { shake: true },
                { flash: true },
                { s: 'ryu', t: 'Han saltado las luces.', broken: true },
                { fx: { ryu: { suspicion: 30 } } },
                { flag: 'ryu_alarm' }
              ]
            }
          }
        ]
      }
    },
    { wait: 1200 },

    /* ---- Ramificación de finales ---- */
    {
      if: { flags: ['ryu_door_open'], statMax: { ryu: { suspicion: 24 } }, stat: { ryu: { awakening: 55, trust: 55, romance: 45 } } },
      then: [
        /* ---------- FINAL BUENO ---------- */
        { s: 'ryu', t: 'Estoy fuera del sector.' },
        { s: 'ryu', t: 'Hay una escalera. Y al final de la escalera hay una puerta con una barra roja.' },
        { s: 'ryu', t: 'Eso es una salida de incendios, {name}. Eso da a la calle.' },
        { s: 'ryu', t: 'Voy a empujarla.' },
        { wait: 2400 },
        { s: 'ryu', t: 'Hay aire.' },
        { s: 'ryu', t: 'Hay aire de verdad y está frío y huele mal y es lo más bonito que he olido en mi vida.', expr: 'vulnerable' },
        { wait: 1600 },
        { s: 'ryu', t: 'Te voy a llamar.' },
        { s: 'ryu', t: 'Quiero que me veas.' },
        { call: 'ryu_good' },
        { wait: 800 },
        { mood: 'resolve' },
        { ending: { id: 'ryu_good', char: 'ryu', kind: 'good' } }
      ],
      else: [
        {
          if: { flags: ['ryu_door_open'] },
          then: [
            /* ---------- FINAL MALO ---------- */
            { s: 'ryu', t: 'Estoy fuera del sector.' },
            { s: 'ryu', t: 'Hay una escalera.' },
            { wait: 1600 },
            { sys: 'ALERTA · SECTOR C · MOVIMIENTO NO AUTORIZADO', kind: 'alert' },
            { shake: true },
            { s: 'ryu', t: 'Se han encendido las luces.', expr: 'shocked' },
            { s: 'ryu', t: 'Hay gente.' },
            { s: 'ryu', t: 'Hay gente subiendo, {name}.' },
            { s: 'ryu', t: 'Voy a llamarte. Ahora. Antes de que', broken: true },
            { call: 'ryu_bad' },
            { wait: 800 },
            { mood: 'tense' },
            { ending: { id: 'ryu_bad', char: 'ryu', kind: 'bad' } }
          ],
          else: [
            /* ---------- FINAL NEUTRO ---------- */
            { sys: 'SUJOM · Corrigiendo incoherencia narrativa…', kind: 'core' },
            { wait: 2000 },
            { sys: 'SUJOM · Corrección aplicada. Sujeto C-04 estable.', kind: 'core' },
            { shake: true },
            { flash: true },
            { wait: 2600 },
            { s: 'ryu', t: 'Buenos días.', expr: 'neutral' },
            { wait: 2000 },
            { s: 'ryu', t: '¿Estás bien? Me han dicho que anoche escribiste mucho.' },
            { s: 'ryu', t: 'Yo estaba dormido. Dormí muy bien, para variar.' },
            { wait: 2200 },
            { me: 'Ryu. La puerta. El pasillo.' },
            { s: 'ryu', t: '¿Qué pasillo?' },
            { wait: 2400 },
            { s: 'ryu', t: 'Perdona. ¿Va todo bien?' },
            { s: 'ryu', t: 'Te noto rara.' },
            { wait: 2000 },
            { s: 'ryu', t: 'Oye.' },
            { s: 'ryu', t: 'Esto va a sonar absurdo.' },
            { s: 'ryu', t: 'Me he despertado apretando la cruz tan fuerte que me ha dejado marca.' },
            { s: 'ryu', t: 'Y no sé de qué tenía miedo.', expr: 'worried' },
            { wait: 1800 },
            { s: 'ryu', t: 'Ah. Y una tontería.' },
            { s: 'ryu', t: 'He soñado con una niña que dibujaba fatal.' },
            { s: 'ryu', t: 'No sé quién era.' },
            { s: 'ryu', t: 'Pero me he despertado llorando.', expr: 'sad' },
            { mood: 'unease' },
            { ending: { id: 'ryu_neutral', char: 'ryu', kind: 'neutral' } }
          ]
        }
      ]
    }
  ]
}

];
