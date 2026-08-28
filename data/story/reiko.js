/* =========================================================
   reiko.js — Ruta de Reiko.
   ---------------------------------------------------------
   Temas: identidad, reputación, memoria, control.
   Reiko no se rompe: se da cuenta. Y darse cuenta, en su
   caso, es peor. Su ruta es la más analítica y la más
   dramática: ella es la que resuelve el sistema desde dentro.
   ========================================================= */

export const REIKO = [

/* ------------------- FASE 1 ------------------- */
{
  id: 'reiko01',
  channel: 'dm', char: 'reiko',
  title: 'Una hipótesis',
  day: 2, time: '06:05',
  phase: 1, mood: 'tender',
  requires: { done: ['g01'] },
  preview: 'Son las seis. Supongo que no estás despierta.',
  script: [
    { day: 'Día 2 · 06:05' },
    { s: 'reiko', t: 'Son las seis. Supongo que no estás despierta.' },
    { s: 'reiko', t: 'Escribo igualmente. Es mi hora buena y no la desperdicio.' },
    { s: 'reiko', photo: 'reiko_coffee' },
    { s: 'reiko', t: 'Tengo una hipótesis sobre ti y quiero comprobarla antes de que me caigas demasiado bien.' },
    { s: 'reiko', t: 'La hipótesis es: no te descargaste esto por aburrimiento.' },
    { s: 'reiko', t: 'La gente aburrida abre la aplicación, mira, y se va. Tú te quedaste.' },
    { s: 'reiko', t: 'Y contestaste las tres cosas que te preguntó Lara. Nadie contesta las tres.' },
    {
      choice: [
        { t: 'Tu hipótesis es correcta.', echo: 'Tu hipótesis es correcta.',
          fx: { reiko: { affinity: 4, trust: 3 } }, then: [
          { s: 'reiko', t: 'Lo sé.' },
          { s: 'reiko', t: 'No lo digo por soberbia. Lo digo porque me alegra.', expr: 'happy' },
          { s: 'reiko', t: 'Llevo un año rodeada de gente encantadora que no piensa antes de escribir.' },
          { s: 'reiko', t: 'Los quiero mucho. Pero se me estaba oxidando la cabeza.' }
        ]},
        { t: '¿Y si te digo que sí me aburría?', echo: '¿Y si te digo que sí me aburría?',
          fx: { reiko: { affinity: 3, romance: 2 } }, then: [
          { s: 'reiko', t: 'Te diría que mientes bastante bien.' },
          { s: 'reiko', t: 'Y luego lo apuntaría, porque la gente que miente bien me interesa mucho.', expr: 'smug' }
        ]},
        { t: '¿Siempre analizas a la gente así?', echo: '¿Siempre analizas a la gente así?',
          fx: { reiko: { trust: 4, affinity: 2 } }, then: [
          { s: 'reiko', t: 'Sí.' },
          { s: 'reiko', t: 'Es un defecto profesional que he decidido llamar virtud.' },
          { s: 'reiko', t: 'Cuando dirigía una empresa me sirvió mucho.' },
          { wait: 1400 },
          { s: 'reiko', t: 'Hasta que dejó de servirme, claro.' },
          { flag: 'reiko_hint_company' }
        ]}
      ]
    },
    { s: 'reiko', t: 'Te voy a proponer un trato.' },
    { s: 'reiko', t: 'Yo no te voy a preguntar nada personal.' },
    { s: 'reiko', t: 'Tú tampoco a mí.' },
    { s: 'reiko', t: 'Y hablaremos de cosas interesantes hasta que uno de los dos rompa el trato.' },
    { s: 'reiko', t: '¿Aceptas?' },
    {
      choice: [
        { t: 'Acepto.', echo: 'Acepto.',
          fx: { reiko: { affinity: 3, trust: 2 } }, then: [
          { s: 'reiko', t: 'Perfecto.' },
          { s: 'reiko', t: 'Te doy dos semanas.', expr: 'smug' },
          { me: '¿Dos semanas para qué?' },
          { s: 'reiko', t: 'Para romperlo tú.' },
          { flag: 'reiko_pact' }
        ]},
        { t: 'No. Yo quiero preguntarte cosas personales.', echo: 'No. Yo quiero preguntarte cosas personales.',
          fx: { reiko: { affinity: 5, romance: 3, trust: -1 } }, then: [
          { wait: 2000 },
          { s: 'reiko', t: 'Vaya.' },
          { s: 'reiko', t: 'Eso no lo tenía previsto.' },
          { s: 'reiko', t: 'Y a mí no me pasa casi nunca que no tenga algo previsto.', expr: 'embarrassed' },
          { s: 'reiko', t: 'De acuerdo. Sin trato.' },
          { s: 'reiko', t: 'Pero no hoy. Hoy no tengo la guardia puesta y no me fío de mí.' },
          { flag: 'reiko_no_pact' }
        ]}
      ]
    },
    { s: 'reiko', t: 'Me voy a trabajar.' },
    { wait: 1600 },
    { s: 'reiko', t: 'Es curioso. He escrito "me voy a trabajar" por costumbre.' },
    { s: 'reiko', t: 'Hace tiempo que no trabajo.' },
    { s: 'reiko', t: 'Buenos días, {name}.' },
    { fx: { reiko: { affinity: 4, trust: 2 } } },
    { photoUnlock: 'reiko_coffee' },
    { bit: [['reiko', 'like_rain']] }
  ],
  advance: 30
},

{
  id: 'reiko02',
  channel: 'dm', char: 'reiko',
  title: 'Ainsel',
  day: 5, time: '07:30',
  phase: 1, mood: 'tender',
  requires: { done: ['reiko01'], stat: { reiko: { affinity: 8 } } },
  preview: 'Voy a romper el trato yo. Antes de lo previsto.',
  script: [
    { s: 'reiko', t: 'Voy a romper el trato yo.' },
    { s: 'reiko', t: 'Antes de lo previsto. Once días antes, para ser exactos.' },
    { s: 'reiko', t: 'No me preguntes por qué porque no tengo una respuesta que me guste.' },
    { s: 'reiko', photo: 'reiko_office' },
    { s: 'reiko', t: 'Esa era mi mesa.' },
    { s: 'reiko', t: 'Monté una empresa a los veintidós. Se llamaba Ainsel.' },
    { s: 'reiko', t: 'Sin dinero de mi familia. Esa parte es importante, y sí, la digo siempre.' },
    {
      choice: [
        { t: '¿Por qué es importante?', echo: '¿Por qué es importante?',
          fx: { reiko: { trust: 5, affinity: 3 } }, then: [
          { s: 'reiko', t: 'Porque mi familia tiene mucho dinero.' },
          { s: 'reiko', t: 'Y cuando tienes un apellido, todo lo que haces se lo atribuyen al apellido.' },
          { s: 'reiko', t: 'Yo quería una cosa que fuera mía.' },
          { s: 'reiko', t: 'Y la tuve. Durante tres años la tuve.', expr: 'sad' },
          { bit: [['reiko', 'fact_company'], ['reiko', 'dis_pity2']] }
        ]},
        { t: '¿A qué se dedicaba Ainsel?', echo: '¿A qué se dedicaba Ainsel?',
          fx: { reiko: { affinity: 3, trust: 3 } }, then: [
          { s: 'reiko', t: 'Logística de datos sanitarios. Suena aburridísimo y lo era.' },
          { s: 'reiko', t: 'Pero movíamos historiales entre hospitales que llevaban veinte años sin poder hablarse.' },
          { s: 'reiko', t: 'Salvamos tiempo. El tiempo en un hospital es otra cosa.', expr: 'neutral' },
          { s: 'reiko', t: 'Me gustaba mucho ese trabajo.' },
          { bit: [['reiko', 'fact_company']] }
        ]}
      ]
    },
    { s: 'reiko', t: 'Y luego, un martes, mi director financiero no vino a trabajar.' },
    { s: 'reiko', t: 'Ni el martes siguiente.' },
    { s: 'reiko', t: 'Y para cuando la auditoría terminó, llevaban once meses vaciándome.' },
    { s: 'reiko', t: 'Once. Meses.' },
    { s: 'reiko', t: 'Y yo firmando todo lo que me ponían delante, feliz.', expr: 'angry' },
    {
      choice: [
        { t: 'Te robaron. No fuiste tonta.', echo: 'Te robaron. No fuiste tonta.',
          fx: { reiko: { trust: 6, affinity: 4 } }, then: [
          { wait: 2200 },
          { s: 'reiko', t: 'Gracias.' },
          { s: 'reiko', t: 'Es la primera vez en un año que alguien separa esas dos cosas.' },
          { s: 'reiko', t: 'Todo el mundo dice "qué horror" y luego, dos frases después, "¿y tú no lo viste?".', expr: 'sad' },
          { flag: 'reiko_defended' }
        ]},
        { t: '¿Y a ellos qué les pasó?', echo: '¿Y a ellos qué les pasó?',
          fx: { reiko: { trust: 4, awareness: 3 } }, then: [
          { s: 'reiko', t: 'Nada.' },
          { s: 'reiko', t: 'Literalmente nada. Ni un nombre en la prensa.' },
          { s: 'reiko', t: 'La única que salió con nombre y apellido fui yo.' },
          { s: 'reiko', t: 'Y mi cara. Mi cara salió mucho.', expr: 'angry' },
          { bit: [['reiko', 'fact_name']] },
          { page: 'news_reiko' }
        ]}
      ]
    },
    { s: 'reiko', t: 'Bueno. Ya está. Ya lo sabes.' },
    { s: 'reiko', t: 'Ahora te toca decidir si me tienes lástima.' },
    { s: 'reiko', t: 'Si me la tienes, dímelo y dejo de escribirte.' },
    { s: 'reiko', t: 'No es un chantaje. Es que no lo soporto.' },
    {
      choice: [
        { t: 'No te tengo lástima. Me pareces impresionante.', echo: 'No te tengo lástima. Me pareces impresionante.',
          fx: { reiko: { affinity: 5, romance: 5, trust: 4 } }, then: [
          { wait: 2400 },
          { s: 'reiko', t: 'Vaya.' },
          { s: 'reiko', t: 'Iba a contestarte con algo ingenioso y no me sale nada.', expr: 'embarrassed' },
          { s: 'reiko', t: 'Es la segunda vez esta semana que me pasa. Contigo.' },
          { s: 'reiko', t: 'Voy a tener que revisar mis hipótesis.' },
          { flag: 'reiko_flustered' }
        ]},
        { t: 'Un poco sí. Y aun así quiero seguir hablando contigo.', echo: 'Un poco sí. Y aun así quiero seguir hablando contigo.',
          fx: { reiko: { trust: 6, affinity: 3 } }, then: [
          { wait: 2000 },
          { s: 'reiko', t: 'Eso ha sido muy honesto.' },
          { s: 'reiko', t: 'Y a mí la honestidad me desarma más que los halagos.' },
          { s: 'reiko', t: 'Está bien. Sigue.' },
          { flag: 'reiko_honest' }
        ]}
      ]
    },
    { fx: { reiko: { affinity: 4, trust: 4 } } },
    { photoUnlock: ['reiko_office', 'reiko_city'] },
    { page: 'news_reiko' },
    { note: 'n_reiko_company' },
    { bit: [['reiko', 'fact_fraud']] }
  ],
  advance: 35
},

/* ------------------- FASE 2 ------------------- */
{
  id: 'reiko03',
  channel: 'dm', char: 'reiko',
  title: 'Reparar una imagen',
  day: 8, time: '23:10',
  phase: 2, mood: 'tender',
  requires: { done: ['reiko02'], stat: { reiko: { affinity: 14, trust: 8 } } },
  preview: '¿Sabes qué es lo peor de que se hunda tu nombre?',
  script: [
    { s: 'reiko', t: '¿Sabes qué es lo peor de que se hunda tu nombre?' },
    { s: 'reiko', t: 'No es la vergüenza. La vergüenza se pasa en tres meses.' },
    { s: 'reiko', t: 'Es que empiezas a buscarte.' },
    { s: 'reiko', t: 'Todos los días. Varias veces al día. A ver qué dicen hoy.' },
    { s: 'reiko', t: 'Y te conviertes en tu propia lectora.' },
    { s: 'reiko', t: 'Y al cabo de un tiempo ya no sabes si eres tú o eres lo que has leído sobre ti.', expr: 'sad' },
    {
      choice: [
        { t: 'Tú no eres lo que dijeron.', echo: 'Tú no eres lo que dijeron.',
          fx: { reiko: { trust: 6, affinity: 4, romance: 3 } }, then: [
          { s: 'reiko', t: 'Eso me lo he dicho yo cuatrocientas veces.' },
          { s: 'reiko', t: 'Y no funciona cuando me lo digo yo.' },
          { wait: 1600 },
          { s: 'reiko', t: 'Contigo ha funcionado un poco.' },
          { s: 'reiko', t: 'Es irritante.', expr: 'embarrassed' },
          { flag: 'reiko_worked' }
        ]},
        { t: '¿Y quién eras antes de todo eso?', echo: '¿Y quién eras antes de todo eso?',
          fx: { reiko: { trust: 8, awareness: 3 } }, then: [
          { wait: 2400 },
          { s: 'reiko', t: 'Ésa es una pregunta muy buena y no tengo respuesta.' },
          { s: 'reiko', t: 'Y no la tengo por un motivo que llevo un año sin querer mirar de frente.' },
          { s: 'reiko', t: 'Otro día.', expr: 'worried' },
          { flag: 'reiko_gap_hint' }
        ]}
      ]
    },
    { s: 'reiko', t: 'Y entonces apareció ASSIST.' },
    { s: 'reiko', t: 'No una señora con una carpeta, como a los otros. A mí me mandaron un despacho entero.' },
    { s: 'reiko', t: 'Muy elegante todo. Muy bien hecho.' },
    { s: 'reiko', t: 'Y me dijeron una sola frase, {name}. Una.' },
    { s: 'reiko', t: '"Podemos hacer que la gente vuelva a decir su nombre de otra manera."' },
    { wait: 2000 },
    { s: 'reiko', t: 'Yo leí el contrato entero. Dos veces.' },
    { s: 'reiko', t: 'Soy abogada de formación. Lo leí entero.' },
    { s: 'reiko', t: 'Y lo firmé igual.' },
    {
      choice: [
        { t: '¿Qué decía la parte que no te gustó?', echo: '¿Qué decía la parte que no te gustó?',
          fx: { reiko: { awareness: 8, trust: 5 } }, then: [
          { wait: 2000 },
          { s: 'reiko', t: 'Cláusula 14.2.' },
          { s: 'reiko', t: '"Cesión de registro neurocognitivo."' },
          { s: 'reiko', t: 'Lo leí. Lo subrayé. Escribí una nota al margen.' },
          { s: 'reiko', t: 'Y no me acuerdo de qué decía mi propia nota.', expr: 'worried' },
          { flag: 'reiko_clause' },
          { bit: [['reiko', 'fact_read']] },
          { evidence: 'reiko_clause' }
        ]},
        { t: 'Firmaste porque querías que te devolvieran tu nombre.', echo: 'Firmaste porque querías que te devolvieran tu nombre.',
          fx: { reiko: { trust: 7, romance: 4 } }, then: [
          { wait: 2200 },
          { s: 'reiko', t: 'Sí.' },
          { s: 'reiko', t: 'Exactamente eso, y me molesta muchísimo que lo hayas dicho tan rápido.' },
          { s: 'reiko', t: 'A mí me costó nueve meses de terapia llegar ahí.', expr: 'sad' },
          { s: 'reiko', t: 'Tú has tardado once segundos.' },
          { bit: [['reiko', 'fact_offer']] }
        ]}
      ]
    },
    { s: 'reiko', t: 'Y ahora te digo la parte incómoda.' },
    { s: 'reiko', t: 'Funcionó.' },
    { s: 'reiko', t: 'Nadie habla mal de mí. No hay artículos nuevos. No hay comentarios.' },
    { s: 'reiko', t: 'Mi nombre está limpio.' },
    { wait: 2000 },
    { s: 'reiko', t: 'Lo que pasa es que tampoco hay nada bueno.' },
    { s: 'reiko', t: 'No hay nada. Mi nombre está limpio porque no está.', expr: 'shocked' },
    { s: 'reiko', t: 'No me repararon la reputación.' },
    { s: 'reiko', t: 'Me borraron.' },
    { fx: { reiko: { affinity: 4, trust: 6, awareness: 6 } } },
    { photoUnlock: 'reiko_paper' },
    { page: ['news_reiko', 'assist_home'] },
    { note: 'n_reiko_company' },
    { flag: 'reiko_erased' }
  ],
  advance: 40
},

{
  id: 'reiko04',
  channel: 'dm', char: 'reiko',
  title: 'Once meses',
  day: 11, time: '06:00',
  phase: 2, mood: 'tender',
  requires: { done: ['reiko03'], stat: { reiko: { trust: 14, affinity: 20 } } },
  preview: 'Te dije que había una pregunta que no quería mirar de frente.',
  script: [
    { day: 'Día 11 · 06:00' },
    { s: 'reiko', t: 'Te dije que había una pregunta que no quería mirar de frente.' },
    { s: 'reiko', t: 'Llevo tres días haciendo un ejercicio.' },
    { s: 'reiko', t: 'He intentado reconstruir mi vida mes a mes. Con fechas. Como un informe.' },
    { s: 'reiko', t: 'Se me da bien. Es literalmente mi profesión.' },
    { wait: 1800 },
    { s: 'reiko', t: 'Y hay once meses que no están.' },
    { s: 'reiko', t: 'Once meses exactos, {name}.' },
    { s: 'reiko', t: 'Sé lo que había antes. Sé lo que hubo después.' },
    { s: 'reiko', t: 'El medio es una pared lisa.' },
    {
      choice: [
        { t: 'Once meses es exactamente lo que duró el fraude.', echo: 'Once meses es exactamente lo que duró el fraude.',
          fx: { reiko: { awareness: 12, trust: 6, awakening: 10 } }, then: [
          { wait: 2800 },
          { s: 'reiko', t: '…' },
          { wait: 2000 },
          { s: 'reiko', t: 'Sí.' },
          { s: 'reiko', t: 'Sí, exactamente once.', expr: 'shocked' },
          { s: 'reiko', t: 'Llevo tres días con esa cifra delante y no lo había cruzado.' },
          { s: 'reiko', t: 'Yo. No lo había cruzado yo.' },
          { s: 'reiko', t: 'Eso no me pasa.' },
          { wait: 2000 },
          { s: 'reiko', t: '{name}, eso no me pasa nunca.' },
          { s: 'reiko', t: 'Alguien me ha quitado la capacidad de cruzar esos dos datos.' },
          { flag: 'reiko_crossed' },
          { evidence: 'reiko_gap' },
          { note: 'n_reiko_gap' }
        ]},
        { t: '¿Y qué recuerdas justo antes de la pared?', echo: '¿Y qué recuerdas justo antes de la pared?',
          fx: { reiko: { awareness: 8, trust: 5 } }, then: [
          { s: 'reiko', t: 'Una reunión.' },
          { s: 'reiko', t: 'Mi despacho. Un martes por la tarde. Llovía.' },
          { s: 'reiko', t: 'Y alguien diciendo un nombre que no era el de mi empresa.' },
          { wait: 1800 },
          { s: 'reiko', t: 'Corona.' },
          { s: 'reiko', t: 'Alguien dijo "Corona" y yo lo apunté en el margen de un papel.' },
          { s: 'reiko', t: 'Y luego se acaba la cinta.', expr: 'worried' },
          { flag: 'reiko_corona' },
          { evidence: 'corona_word' },
          { note: 'n_reiko_gap' }
        ]}
      ]
    },
    { wait: 1800 },
    { s: 'reiko', t: 'Voy a decirte una cosa que no le he dicho a nadie.' },
    { s: 'reiko', t: 'Ni a Ryu, y a Ryu se lo cuento todo porque no repite nada.' },
    { s: 'reiko', t: 'Yo no tengo miedo de estar loca.' },
    { s: 'reiko', t: 'Tengo miedo de tener razón.' },
    { s: 'reiko', t: 'Porque si tengo razón, lo que me falta no se me ha perdido.' },
    { s: 'reiko', t: 'Me lo han quitado.', expr: 'shocked' },
    { s: 'reiko', t: 'Y si me lo han quitado, no soy una mujer con lagunas.' },
    { s: 'reiko', t: 'Soy una mujer editada.' },
    {
      choice: [
        { t: 'Tienes razón. Y no estás sola en esto.', echo: 'Tienes razón. Y no estás sola en esto.',
          fx: { reiko: { trust: 10, romance: 6, awakening: 12, dependence: 8 } }, then: [
          { wait: 2600 },
          { s: 'reiko', t: 'No me digas eso tan pronto.' },
          { s: 'reiko', t: 'Si me lo dices tan pronto voy a apoyarme, y llevo un año sin apoyarme en nadie.' },
          { wait: 2200 },
          { s: 'reiko', t: 'Ya me he apoyado.' },
          { s: 'reiko', t: 'Ha sido inmediato. Qué desastre.', expr: 'vulnerable' },
          { flag: 'reiko_leaned' }
        ]},
        { t: 'Entonces vamos a averiguar quién te editó.', echo: 'Entonces vamos a averiguar quién te editó.',
          fx: { reiko: { trust: 8, awakening: 15, awareness: 8 } }, then: [
          { wait: 2200 },
          { s: 'reiko', t: 'Sí.' },
          { s: 'reiko', t: 'Sí, esa es la respuesta correcta.', expr: 'angry' },
          { s: 'reiko', t: 'No "descansa". No "no le des vueltas".' },
          { s: 'reiko', t: 'Averiguarlo.' },
          { s: 'reiko', t: 'Necesitaba que alguien me lo dijera para dejar de tener vergüenza de querer hacerlo.' },
          { flag: 'reiko_investigate' }
        ]}
      ]
    },
    { fx: { reiko: { affinity: 5, trust: 6, awareness: 8 } } },
    { bit: [['reiko', 'fact_gap'], ['reiko', 'fact_read']] },
    { note: 'n_reiko_gap' },
    { flag: 'reiko_knows_gap' }
  ],
  advance: 40
},

{
  id: 'reiko05',
  channel: 'dm', char: 'reiko',
  title: 'Fuera de control',
  day: 15, time: '22:40',
  phase: 2, mood: 'tender',
  requires: { done: ['reiko04', 'g04'], stat: { reiko: { affinity: 24, trust: 16 } } },
  preview: 'Te he escrito un mensaje muy largo. Lo he borrado. Este es el corto.',
  script: [
    { s: 'reiko', t: 'Te he escrito un mensaje muy largo.' },
    { s: 'reiko', t: 'Novecientas palabras. Lo he corregido tres veces. Tenía estructura.' },
    { s: 'reiko', t: 'Lo he borrado.' },
    { s: 'reiko', t: 'Este es el corto.' },
    { wait: 2000 },
    { s: 'reiko', t: 'Me he acostumbrado a ti y no me gusta acostumbrarme a nada.' },
    { wait: 1800 },
    { s: 'reiko', t: 'Ésa era la versión corta. Ahora déjame explicarme, porque si no me explico parece otra cosa.' },
    { s: 'reiko', t: 'Yo controlo todo lo que puedo controlar. Es mi manera de estar en el mundo.' },
    { s: 'reiko', t: 'Y funcionó estupendamente hasta que tres personas me robaron delante de las narices.' },
    { s: 'reiko', t: 'Desde entonces controlo el doble. Es patético y lo sé.' },
    { wait: 1600 },
    { s: 'reiko', t: 'Y contigo no controlo nada.' },
    { s: 'reiko', t: 'Me pongo a escribirte y me salen cosas que no había planeado decir.' },
    { s: 'reiko', t: 'Me pasa contigo y no me pasa con nadie más.', expr: 'embarrassed' },
    {
      choice: [
        { t: 'Eso a mí me suena bastante bien.', echo: 'Eso a mí me suena bastante bien.',
          fx: { reiko: { romance: 8, affinity: 4 } }, then: [
          { s: 'reiko', t: 'A ti sí. A mí me tiene despierta desde las cuatro.' },
          { s: 'reiko', t: 'Y no de las de "no puedo dormir".' },
          { s: 'reiko', t: 'De las de "no quiero dormirme por si me escribes".', expr: 'vulnerable' },
          { s: 'reiko', t: 'Tengo veinticinco años. Esto es ridículo.' }
        ]},
        { t: 'Reiko, ¿qué es lo que quieres decirme de verdad?', echo: 'Reiko, ¿qué es lo que quieres decirme de verdad?',
          fx: { reiko: { trust: 8, romance: 6 } }, then: [
          { wait: 2600 },
          { s: 'reiko', t: 'Que llevo un año sintiendo que no soy nadie.' },
          { s: 'reiko', t: 'Y que cuando hablo contigo vuelvo a ser alguien concreto.' },
          { s: 'reiko', t: 'No la de los periódicos. No la que perdió una empresa.' },
          { s: 'reiko', t: 'Alguien concreto con opiniones sobre el café.', expr: 'vulnerable' },
          { s: 'reiko', t: 'Y eso, ahora mismo, es lo único que tengo.' },
          { flag: 'reiko_somebody' }
        ]}
      ]
    },
    { wait: 2000 },
    { s: 'reiko', t: 'Voy a hacer una cosa muy poco propia de mí.' },
    { s: 'reiko', t: 'Voy a preguntarte algo sin saber qué vas a contestar.' },
    { s: 'reiko', t: '¿Esto es algo?' },
    { s: 'reiko', t: 'Contéstame en una frase. No hagas lo que hago yo.' },
    {
      choice: [
        { t: 'Sí. Es algo.', echo: 'Sí. Es algo.',
          fx: { reiko: { romance: 10, affinity: 6, dependence: 8 } }, route: 'reiko', then: [
          { wait: 2800 },
          { s: 'reiko', t: 'Bien.' },
          { wait: 1600 },
          { s: 'reiko', t: 'Perdón. "Bien" es una respuesta espantosa.' },
          { s: 'reiko', t: 'Lo que quería decir es que llevo cuarenta minutos con el teléfono boca abajo esperando esa frase.', expr: 'embarrassed' },
          { s: 'reiko', t: 'Y ahora no sé qué hacer con las manos.' },
          { s: 'reiko', t: 'Estoy sola en mi casa y no sé qué hacer con las manos.' },
          { flag: 'reiko_route' }
        ]},
        { t: 'Todavía no lo sé. Pero quiero averiguarlo.', echo: 'Todavía no lo sé. Pero quiero averiguarlo.',
          fx: { reiko: { trust: 7, romance: 5 } }, then: [
          { s: 'reiko', t: 'Eso es honesto.' },
          { s: 'reiko', t: 'Y me sirve más que un sí rápido, aunque me apetecía mucho un sí rápido.' },
          { wait: 2200 },
          {
            choice: [
              { t: 'Vale: sí. Es algo.', echo: 'Vale: sí. Es algo.',
                fx: { reiko: { romance: 9, dependence: 7 } }, route: 'reiko', then: [
                { s: 'reiko', t: 'No juegues conmigo así.' },
                { s: 'reiko', t: 'Se me ha parado el corazón dos veces en un minuto.', expr: 'embarrassed' },
                { flag: 'reiko_route' }
              ]},
              { t: 'Dame tiempo.', echo: 'Dame tiempo.',
                fx: { reiko: { trust: 5, romance: 2 } }, route: 'reiko', then: [
                { s: 'reiko', t: 'El tiempo es lo único que tengo de sobra.' },
                { s: 'reiko', t: 'Aunque últimamente ni de eso estoy segura.' },
                { s: 'reiko', t: 'Tómatelo. Yo no me muevo de aquí.' },
                { s: 'reiko', t: 'Y no lo digo por romántica. Lo digo porque no tengo dónde ir.', expr: 'sad' },
                { flag: 'reiko_route' }
              ]}
            ]
          }
        ]}
      ]
    },
    { wait: 1800 },
    { s: 'reiko', t: 'Una cosa más y me callo.' },
    { s: 'reiko', t: 'He mirado por la ventana mientras te escribía.' },
    { s: 'reiko', photo: 'reiko_city', corruptNow: true },
    { wait: 2200 },
    { s: 'reiko', t: '{name}.' },
    { s: 'reiko', t: 'Detrás de la última torre no hay nada.' },
    { s: 'reiko', t: 'No es niebla. No es oscuridad.' },
    { s: 'reiko', t: 'Es que no hay nada dibujado.', expr: 'shocked' },
    { fx: { reiko: { affinity: 5, romance: 5, awareness: 8 } } },
    { photoUnlock: 'reiko_city' },
    { corrupt: 'reiko_city' },
    { evidence: 'horizon' },
    { glitchLevel: 2 },
    { flag: 'reiko_saw_edge' }
  ],
  advance: 45
},

/* ------------------- FASE 4 ------------------- */
{
  id: 'reiko06',
  channel: 'dm', char: 'reiko',
  title: 'Cuarenta segundos',
  day: 18, time: '05:10',
  phase: 4, mood: 'unease',
  requires: { done: ['reiko05', 'g06'], flags: ['reiko_route'], stat: { reiko: { trust: 24 } } },
  preview: 'He hecho un experimento. Necesito que lo cronometres.',
  script: [
    { day: 'Día 18 · 05:10' },
    { s: 'reiko', t: 'He hecho un experimento y necesito que lo cronometres.' },
    { s: 'reiko', t: 'No preguntes todavía. Sólo cuenta.' },
    { s: 'reiko', t: 'Voy a escribir una verdad que el sistema no quiere que sepa.' },
    { s: 'reiko', t: 'Y quiero saber cuánto tarda en quitármela.' },
    { s: 'reiko', t: '¿Preparada?' },
    { me: 'Preparada.' },
    { wait: 1600 },
    { s: 'reiko', t: 'Detrás de la última torre de la ciudad no hay nada dibujado.' },
    { s: 'reiko', t: 'La ciudad se acaba a cuatro kilómetros de mi ventana.' },
    { s: 'reiko', t: 'Y eso significa que no estoy en una ciudad.' },
    { sys: '00:04' },
    { wait: 1400 },
    { s: 'reiko', t: 'Sigo aquí. Sigo sabiéndolo.' },
    { sys: '00:16' },
    { wait: 1400 },
    { s: 'reiko', t: 'Lo sigo sabiendo. Lo estoy repitiendo en voz alta para retenerlo.' },
    { sys: '00:28' },
    { wait: 1600 },
    { s: 'reiko', t: 'Sigo. Detrás de la torre no hay nada. Detrás de la torre no hay' },
    { sys: '00:38' },
    { wait: 1400 },
    { sys: 'ASSIST · Corrigiendo incoherencia narrativa…', kind: 'core' },
    { shake: true },
    { sys: '00:41', kind: 'alert' },
    { wait: 2000 },
    { s: 'reiko', t: 'Perdona, ¿qué te estaba diciendo?', expr: 'neutral' },
    { wait: 2600 },
    {
      choice: [
        { t: 'Cuarenta y un segundos, Reiko.', echo: 'Cuarenta y un segundos, Reiko.',
          fx: { reiko: { awakening: 25, awareness: 15, trust: 8 } }, then: [
          { wait: 2400 },
          { s: 'reiko', t: '…' },
          { s: 'reiko', t: 'Cuarenta y uno.' },
          { wait: 2000 },
          { s: 'reiko', t: 'Lo tengo apuntado en un papel, {name}.' },
          { s: 'reiko', t: 'Antes del experimento escribí en un papel lo que iba a decirte.' },
          { s: 'reiko', t: 'Estoy leyendo mi propia letra y no reconozco el pensamiento.' },
          { s: 'reiko', t: 'Pero es mi letra.', expr: 'shocked' },
          { wait: 2000 },
          { s: 'reiko', t: 'Funciona con lo que pienso. No con lo que escribo.' },
          { s: 'reiko', t: 'Ésa es la grieta.' },
          { s: 'reiko', t: 'Ésa es la grieta, {name}. La hemos encontrado.' },
          { flag: 'reiko_found_gap' },
          { evidence: 'correction_window' },
          { fx: { reiko: { awakening: 15 } } }
        ]},
        { t: 'Estabas hablándome de la ciudad.', echo: 'Estabas hablándome de la ciudad.',
          fx: { reiko: { awakening: 10, awareness: 6 } }, then: [
          { s: 'reiko', t: '¿De la ciudad?' },
          { s: 'reiko', t: 'No me suena.' },
          { wait: 2000 },
          { s: 'reiko', t: 'Espera. Tengo un papel delante.' },
          { s: 'reiko', t: 'Con mi letra.' },
          { s: 'reiko', t: 'Pone: "detrás de la torre no hay nada. Si no me acuerdo de esto, es que tengo razón."', expr: 'shocked' },
          { s: 'reiko', t: 'Me he dejado una nota a mí misma para después de que me borraran.' },
          { flag: 'reiko_found_gap' },
          { evidence: 'correction_window' }
        ]}
      ]
    },
    { wait: 1800 },
    { s: 'reiko', t: 'Escúchame bien.' },
    { s: 'reiko', t: 'Voy a escribirlo todo. En papel. Todo el rato.' },
    { s: 'reiko', t: 'Si no puedo conservar los pensamientos, conservaré los objetos.' },
    { s: 'reiko', t: 'Y tú vas a hacer una cosa por mí.' },
    { s: 'reiko', t: 'Cuando yo se me olvide, me lo vas a leer.' },
    { s: 'reiko', t: 'Todas las veces que haga falta.' },
    {
      choice: [
        { t: 'Todas las veces que haga falta.', echo: 'Todas las veces que haga falta.',
          fx: { reiko: { trust: 12, romance: 8, dependence: 10, awakening: 10 } }, then: [
          { wait: 2400 },
          { s: 'reiko', t: 'Gracias.' },
          { wait: 1600 },
          { s: 'reiko', t: 'Es la primera vez en mi vida que le encargo mi memoria a otra persona.' },
          { s: 'reiko', t: 'Y no me da pánico. Eso es lo que más me sorprende.', expr: 'vulnerable' },
          { flag: 'reiko_keeper' }
        ]},
        { t: 'Reiko, ¿y si te lo leo y no te lo crees?', echo: 'Reiko, ¿y si te lo leo y no te lo crees?',
          fx: { reiko: { trust: 6, awakening: 6 } }, then: [
          { s: 'reiko', t: 'Entonces insiste.' },
          { s: 'reiko', t: 'Insiste aunque me enfade. Me voy a enfadar. Soy insoportable cuando me contradicen.' },
          { s: 'reiko', t: 'Insiste igual.' }
        ]}
      ]
    },
    { fx: { reiko: { awareness: 10, trust: 6 } } },
    { note: 'n_reiko_gap' },
    { glitchLevel: 2 },
    { flag: 'reiko_crack' }
  ],
  advance: 35
},

{
  id: 'reiko07',
  channel: 'dm', char: 'reiko',
  title: 'Inestable',
  day: 20, time: '02:40',
  phase: 4, mood: 'tense',
  requires: { done: ['reiko06'], flags: ['reiko_crack'], glitch: 2 },
  preview: 'Reiko: He escrito cuarenta páginas. Empiezo por el final.',
  script: [
    { day: 'Día 20 · 02:40' },
    { s: 'reiko', t: 'He escrito cuarenta páginas en dos días.' },
    { s: 'reiko', t: 'Cuarenta. A mano.' },
    { s: 'reiko', t: 'Voy a empezar por el final porque el final es lo importante.', expr: 'tired' },
    { wait: 1600 },
    { s: 'reiko', t: 'Uno. No estoy en mi casa.' },
    { s: 'reiko', t: 'Dos. No estoy sola: hay tres personas más en la misma sala, y sé quiénes son.' },
    { s: 'reiko', t: 'Tres. Llevo aquí desde el 9 de septiembre de 2024.' },
    { s: 'reiko', t: 'Cuatro. Nadie me ha buscado, porque ASSIST publicó un comunicado diciendo que me retiraba de la vida pública.' },
    { s: 'reiko', t: 'Y lo firmó un gabinete que era suyo.' },
    { s: 'reiko', t: 'Cinco. Yo pagué ese comunicado.', expr: 'angry' },
    {
      choice: [
        { t: '¿Cómo has llegado hasta ahí?', echo: '¿Cómo has llegado hasta ahí?',
          fx: { reiko: { trust: 6, awakening: 10 } }, then: [
          { s: 'reiko', t: 'Contradicciones.' },
          { s: 'reiko', t: 'Cada vez que el sistema me corrige, deja una costura.' },
          { s: 'reiko', t: 'Una palabra que no encaja. Un objeto que aparece.' },
          { s: 'reiko', t: 'Yo he anotado ciento doce costuras.' },
          { s: 'reiko', t: 'Con ciento doce costuras se ve el patrón.', expr: 'neutral' },
          { flag: 'reiko_seams' },
          { evidence: 'reiko_notes' }
        ]},
        { t: 'Reiko, ¿estás bien?', echo: 'Reiko, ¿estás bien?',
          fx: { reiko: { trust: 8, romance: 4 } }, then: [
          { wait: 2400 },
          { s: 'reiko', t: 'No.' },
          { s: 'reiko', t: 'Gracias por preguntarlo. Llevaba dos días sin que nadie me lo preguntara.' },
          { s: 'reiko', t: 'Los otros tres están asustados. Yo estoy furiosa.' },
          { s: 'reiko', t: 'La furia se aguanta mejor. Se puede trabajar con furia.', expr: 'angry' }
        ]}
      ]
    },
    { s: 'reiko', t: 'Y ahora la parte por la que te he escrito a las tres de la mañana.' },
    { s: 'reiko', t: 'Seis. Yo soy la que peor lo lleva.' },
    { s: 'reiko', t: 'No emocionalmente. Técnicamente.' },
    { s: 'reiko', t: 'A mí me corrigen más veces que a los demás.' },
    { s: 'reiko', t: 'Lo he cronometrado. A Lara la corrigen una vez al día. A mí, cinco.' },
    { s: 'reiko', t: 'Y cada corrección me deja peor.' },
    { s: 'reiko', t: 'Se me olvidan cosas nuevas. Cosas de esta semana.' },
    { s: 'reiko', t: 'Ayer no me acordaba de cómo se llamaba Momo.', expr: 'worried' },
    { wait: 2000 },
    { s: 'reiko', t: '{name}, te tengo que pedir algo horrible.' },
    { s: 'reiko', t: 'Si llega un momento en que ya no sé quién eres' },
    { s: 'reiko', t: 'no me lo expliques con calma.' },
    { s: 'reiko', t: 'Sé cruel. Dime algo que me duela. El dolor deja marca; la información no.' },
    {
      choice: [
        { t: 'No pienso hacerte daño para que me recuerdes.', echo: 'No pienso hacerte daño para que me recuerdes.',
          fx: { reiko: { romance: 8, trust: 8, awakening: 10 } }, then: [
          { wait: 2600 },
          { s: 'reiko', t: 'Eso es un problema.' },
          { wait: 1800 },
          { s: 'reiko', t: 'Y también es lo más bonito que me han dicho nunca, y las dos cosas a la vez me están destrozando.', expr: 'vulnerable' },
          { s: 'reiko', t: 'Está bien. Buscaremos otra manera.' },
          { flag: 'reiko_gentle' }
        ]},
        { t: 'Vale. Te diré: "cuarenta y un segundos".', echo: 'Vale. Te diré: "cuarenta y un segundos".',
          fx: { reiko: { trust: 10, awakening: 15 } }, then: [
          { wait: 2400 },
          { s: 'reiko', t: 'Perfecto.' },
          { s: 'reiko', t: 'Es corto, es concreto y no significa nada para nadie más.' },
          { s: 'reiko', t: 'Y a mí me va a doler cada vez.', expr: 'neutral' },
          { s: 'reiko', t: 'Es exactamente lo que te he pedido. Gracias.' },
          { flag: 'reiko_codeword' }
        ]}
      ]
    },
    { sys: 'ASSIST · Corrigiendo incoherencia narrativa…', kind: 'core' },
    { shake: true },
    { sys: 'ASSIST · Corrigiendo incoherencia narrativa…', kind: 'core' },
    { shake: true },
    { sys: 'SUJETO C-05 · INESTABLE · REVISIÓN DE DOSIS RECOMENDADA', kind: 'alert' },
    { flash: true },
    { s: 'reiko', t: 'me están subiendo algo', broken: true },
    { s: 'reiko', t: 'noto el frío subiendo por el brazo', broken: true, expr: 'shocked' },
    { s: 'reiko', t: '{name} las cuarenta páginas están debajo del sillón tres', broken: true },
    { s: 'reiko', t: 'debajo del sillón tres', broken: true },
    {
      choice: [
        { t: 'Cuarenta y un segundos, Reiko. Cuarenta y un segundos.', echo: 'Cuarenta y un segundos, Reiko. Cuarenta y un segundos.',
          requires: { flags: ['reiko_codeword'] },
          fx: { reiko: { awakening: 30, trust: 10, dependence: 10 } }, then: [
          { wait: 3000 },
          { s: 'reiko', t: 'Cuarenta y uno.' },
          { wait: 1800 },
          { s: 'reiko', t: 'Ha dolido.' },
          { s: 'reiko', t: 'Ha dolido y sigo aquí.', expr: 'tired' },
          { s: 'reiko', t: 'Funciona, {name}. Tu palabra funciona.' },
          { flag: 'reiko_held' },
          { fx: { reiko: { awakening: 12 } } }
        ]},
        { t: 'REIKO. Tu empresa se llamaba Ainsel. La montaste tú. Sin nadie.', echo: 'REIKO. Tu empresa se llamaba Ainsel. La montaste tú. Sin nadie.',
          fx: { reiko: { awakening: 28, trust: 10, romance: 6, dependence: 10 } }, then: [
          { wait: 3000 },
          { s: 'reiko', t: 'Ainsel.' },
          { wait: 1600 },
          { s: 'reiko', t: 'Ainsel.' },
          { s: 'reiko', t: 'Sí.' },
          { s: 'reiko', t: 'Sigo aquí.', expr: 'tired' },
          { s: 'reiko', t: 'Me has devuelto con un nombre propio. Qué elegante.' },
          { flag: 'reiko_held' },
          { fx: { reiko: { awakening: 10 } } }
        ]},
        { t: 'Reiko, aguanta, por favor.', echo: 'Reiko, aguanta, por favor.',
          fx: { reiko: { awakening: 10, trust: 4 } }, then: [
          { wait: 3200 },
          { s: 'reiko', t: 'Hola.' },
          { s: 'reiko', t: 'Perdona, ¿de qué hablábamos?', expr: 'neutral' },
          { wait: 2400 },
          { s: 'reiko', t: 'Tengo un papel en la mano y no lo he escrito yo.' },
          { s: 'reiko', t: 'O sí. Es mi letra.' },
          { s: 'reiko', t: 'Pone "sillón tres".' }
        ]}
      ]
    },
    { fx: { reiko: { awakening: 12, awareness: 18 } } },
    { photoUnlock: ['reiko_door', 'sys_chairs'] },
    { evidence: ['reiko_awake', 'reiko_notes'] },
    { page: ['assist_home', 'news_missing', 'assist_thorne'] },
    { note: ['n_reiko_gap', 'n_thorne'] },
    { glitchLevel: 3 },
    { flag: 'reiko_awake' }
  ],
  advance: 40
},

/* ------------------- FASE 5 ------------------- */
{
  id: 'reiko08',
  channel: 'dm', char: 'reiko',
  title: 'Corona',
  day: 22, time: '06:00',
  phase: 5, mood: 'tense',
  requires: { done: ['reiko07'], flags: ['reiko_awake'] },
  preview: 'He recuperado la nota del margen. Ya sé qué apunté.',
  script: [
    { day: 'Día 22 · 06:00' },
    { s: 'reiko', t: 'He recuperado la nota del margen.' },
    { s: 'reiko', t: 'La que escribí en aquella reunión, el martes que llovía.' },
    { s: 'reiko', t: 'Estaba entre mis cuarenta páginas. Me la había copiado a mí misma sin acordarme de por qué.' },
    { s: 'reiko', t: 'Dice una sola palabra.' },
    { s: 'reiko', t: 'CORONA.' },
    { wait: 1600 },
    { s: 'reiko', t: 'Y debajo, con mi letra: "no es una marca. Es el nombre del proyecto."' },
    { evidence: 'corona_word' },
    { note: 'n_reiko_gap' },
    { sys: 'Se ha desbloqueado una publicación restringida en tu navegador.' },
    { page: ['paper_bond', 'assist_thorne'] },
    { s: 'reiko', t: 'Hay un documento de ASSIST Labs que está protegido.' },
    { s: 'reiko', t: 'Y a la gente muy lista le encanta poner de contraseña el nombre interno de lo que está escondiendo.' },
    { s: 'reiko', t: 'Es una constante. Lo he visto en tres auditorías.' },
    { s: 'reiko', t: 'Ábrelo tú. Yo no puedo mirar la palabra ASSIST más de diez segundos seguidos.' },
    {
      puzzle: {
        kind: 'word',
        title: 'ASSIST Labs · publicación restringida',
        prompt: 'El documento pide una palabra clave.\n\nReiko apuntó una sola palabra en el margen, el martes que llovía. Seis letras.',
        answer: 'CORONA',
        accept: ['CORONA', 'corona', 'PROYECTO CORONA'],
        hint: 'Está en su nota. Y en el nombre interno del proyecto.',
        onSolve: [
          { sys: 'ACCESO CONCEDIDO · PROYECTO CORONA / PROTOCOLO LAZO DORADO', kind: 'core' },
          { wait: 2000 },
          { sys: 'Cuatro sujetos por ciclo. Sedación continua. Memoria episódica editable.', kind: 'alert' },
          { wait: 1600 },
          { sys: 'Se introduce en el entorno un interlocutor real y no sedado, ajeno a la instalación: C-1.', kind: 'alert' },
          { wait: 2000 },
          { sys: 'C-1 desconoce la naturaleza del entorno. Esta creencia es NECESARIA.', kind: 'alert' },
          { wait: 2400 },
          { s: 'reiko', t: '¿Qué pone?' },
          { wait: 1600 },
          { s: 'reiko', t: '{name}.' },
          { s: 'reiko', t: 'Llevas cuatro minutos sin escribir.' },
          { s: 'reiko', t: 'Tú no tardas cuatro minutos.' },
          {
            choice: [
              { t: 'Reiko. Yo soy parte del experimento.', echo: 'Reiko. Yo soy parte del experimento.',
                fx: { reiko: { trust: 12, awakening: 20, romance: 5 } }, then: [
                { wait: 3000 },
                { s: 'reiko', t: 'Sigue.' },
                { me: 'Me llaman C-1. Soy la variable externa. Me metieron aquí para ver si me cogíais cariño.' },
                { wait: 3200 },
                { s: 'reiko', t: '…' },
                { wait: 2400 },
                { s: 'reiko', t: 'Escúchame muy bien, porque esto es importante y no tengo mucho tiempo antes de la próxima corrección.' },
                { s: 'reiko', t: 'Que te pusieran ahí no significa que lo que hay entre nosotras sea de ellos.', expr: 'angry' },
                { s: 'reiko', t: 'Mis padres me pusieron en un colegio para que hiciera contactos útiles.' },
                { s: 'reiko', t: 'Allí conocí a la única amiga de verdad que he tenido.' },
                { s: 'reiko', t: 'El motivo por el que te ponen en un sitio no decide lo que pasa en ese sitio.' },
                { wait: 2000 },
                { s: 'reiko', t: 'Tú no eres su experimento.' },
                { s: 'reiko', t: 'Tú eres la única persona que me ha preguntado si estaba bien en un año.' },
                { flag: 'reiko_absolved_player' },
                { fx: { reiko: { awakening: 12, dependence: 10 } } }
              ]},
              { t: 'Nada importante. Céntrate en salir.', echo: 'Nada importante. Céntrate en salir.',
                fx: { reiko: { trust: -4, awakening: 10 } }, then: [
                { wait: 2400 },
                { s: 'reiko', t: 'Me estás mintiendo.' },
                { s: 'reiko', t: 'Se te nota en la longitud de las frases.' },
                { wait: 2000 },
                { s: 'reiko', t: 'Está bien. Guárdatelo.' },
                { s: 'reiko', t: 'Pero que sepas que voy a averiguarlo, y que habría preferido que me lo dijeras tú.', expr: 'sad' },
                { flag: 'reiko_lied_to' }
              ]}
            ]
          },
          { evidence: ['protocol_doc', 'c1_identity'] },
          { note: ['n_protocol', 'n_c1'] },
          { page: ['assist_portal', 'assist_cams'] },
          { flag: 'reiko_read_protocol' },
          { flag: 'knows_c1' }
        ],
        onFail: [
          { sys: 'CLAVE INCORRECTA', kind: 'alert' },
          { shake: true },
          { s: 'reiko', t: 'No pasa nada.' },
          { s: 'reiko', t: 'Vuelve a mis notas. Está ahí. Yo lo apunté.' },
          { s: 'reiko', t: 'Una palabra. Seis letras. Lo dijeron en la reunión.' },
          { fx: { reiko: { suspicion: 8 } } }
        ]
      }
    },
    { wait: 1600 },
    { s: 'reiko', t: 'Ahora la puerta.' },
    { s: 'reiko', t: 'La he estado observando desde el sillón tres durante dos días.' },
    { s: 'reiko', t: 'Teclado de seis dígitos.' },
    { s: 'reiko', t: 'Y he visto entrar a un celador cuatro veces.' },
    { s: 'reiko', t: 'Teclea rápido, pero teclea siempre lo mismo, y el patrón de la mano es de fecha.' },
    { s: 'reiko', t: 'ASSIST usa fechas de ingreso. Lo pone en su propio manual de seguridad, en la página que nadie lee.' },
    { s: 'reiko', t: 'Yo ingresé el 9 de septiembre de 2024.' },
    { note: 'n_code_hint' },
    {
      puzzle: {
        kind: 'code',
        title: 'Portal interno · ASSIST',
        prompt: 'Seis dígitos, formato DDMMAA.\n\nReiko ingresó el 9 de septiembre de 2024.',
        answer: '090924',
        accept: ['090924', '09092024', '90924'],
        hint: 'Día 09, mes 09, año 24.',
        onSolve: [
          { sys: 'ACCESO CONCEDIDO · SECTOR C · REGISTRO DE SUJETOS', kind: 'core' },
          { wait: 1600 },
          { sys: 'C-05 · 25 a. · ingreso 09/09/2024 · sillón 1 · INESTABLE', kind: 'alert' },
          { sys: 'observación: recupera fragmentos con una frecuencia anómala. Recomendada revisión de dosis.', kind: 'alert' },
          { wait: 2200 },
          { s: 'reiko', t: 'Léemelo.' },
          { me: '"Recupera fragmentos con una frecuencia anómala."' },
          { wait: 2200 },
          { s: 'reiko', t: 'Anómala.' },
          { s: 'reiko', t: 'Llevo un año pensando que estaba rota.' },
          { s: 'reiko', t: 'Y resulta que estaba ganando.', expr: 'smug' },
          { evidence: 'assist_registry' },
          { cam: ['hall', 'chairs', 'monitors', 'guard'] },
          { page: 'assist_cams' },
          { flag: 'reiko_portal_open' }
        ],
        onFail: [
          { sys: 'ACCESO DENEGADO · INTENTO REGISTRADO', kind: 'alert' },
          { shake: true },
          { s: 'reiko', t: 'Mal.' },
          { s: 'reiko', t: 'Y ahora saben que alguien lo ha intentado.' },
          { s: 'reiko', t: 'No es culpa tuya. Es culpa mía por no darte mejor la fecha.', expr: 'worried' },
          { fx: { reiko: { suspicion: 12 } } },
          { flag: 'reiko_portal_failed' }
        ]
      }
    },
    { wait: 1600 },
    { s: 'reiko', t: '{name}.' },
    { s: 'reiko', t: 'Mañana intento salir.' },
    { s: 'reiko', t: 'Y quiero que sepas una cosa por si sale mal.' },
    { s: 'reiko', t: 'Yo llevo toda la vida construyendo cosas para que alguien me viera.' },
    { s: 'reiko', t: 'La empresa. El nombre. Todo.' },
    { s: 'reiko', t: 'Y al final me ha visto una persona a la que no le he construido nada.' },
    { s: 'reiko', t: 'Sólo le he hablado.', expr: 'vulnerable' },
    { fx: { reiko: { awakening: 10, romance: 6 } } },
    { glitchLevel: 3 },
    { flag: 'reiko_ready' }
  ],
  advance: 50
},

/* ------------------- FASE 6 · FUGA ------------------- */
{
  id: 'reiko09',
  channel: 'dm', char: 'reiko',
  title: 'Sillón uno',
  day: 25, time: '05:00',
  phase: 6, mood: 'escape',
  requires: { done: ['reiko08'], flags: ['reiko_ready'] },
  preview: 'Reiko: Estoy de pie. Tengo las cuarenta páginas en la mano.',
  script: [
    { day: 'Día 25 · 05:00' },
    { mood: 'escape' },
    { s: 'reiko', t: 'Estoy de pie.' },
    { s: 'reiko', t: 'Tengo las cuarenta páginas en la mano. Las he sacado de debajo del sillón tres.' },
    { s: 'reiko', t: 'Estaban donde yo había escrito que estarían.', expr: 'tired' },
    { s: 'reiko', t: 'Me fío más de mi letra que de mi cabeza. Anótalo, es un buen consejo.' },
    { wait: 1400 },
    { s: 'reiko', t: 'Sillón uno: yo.' },
    { s: 'reiko', t: 'Sillón dos: Kenta.' },
    { s: 'reiko', t: 'Sillón tres: Lara.' },
    { s: 'reiko', t: 'Sillón cuatro: Ryu.' },
    { s: 'reiko', t: 'Los cuatro. Uno al lado del otro. Como siempre estuvimos.', expr: 'sad' },
    { s: 'reiko', t: 'Hemos sido amigos de verdad, {name}. Eso no lo escribieron ellos.' },
    { cam: ['hall', 'chairs', 'monitors', 'guard'] },
    { wait: 1600 },
    { s: 'reiko', t: 'La puerta.' },
    { s: 'reiko', t: 'Seis dígitos. Mi fecha.' },
    { s: 'reiko', t: 'No me la digas de memoria. Compruébala. Siempre se comprueba.' },
    {
      puzzle: {
        kind: 'code',
        title: 'SECTOR C · SALIDA',
        prompt: 'Seis dígitos, DDMMAA.\n\nReiko ingresó el 9 de septiembre de 2024.',
        answer: '090924',
        accept: ['090924'],
        hint: '09 · 09 · 24',
        onSolve: [
          { sys: 'CERRADURA · ABIERTA', kind: 'core' },
          { s: 'reiko', t: 'Abierta.' },
          { s: 'reiko', t: 'Perfecto. Muy bien.' },
          { flag: 'reiko_door_open' }
        ],
        onFail: [
          { sys: 'CÓDIGO INCORRECTO · 1 INTENTO RESTANTE', kind: 'alert' },
          { shake: true },
          { s: 'reiko', t: 'Un intento más. No te pongas nerviosa: eso es lo que quieren.' },
          { s: 'reiko', t: 'Nueve de septiembre de dos mil veinticuatro. Léelo despacio.' },
          {
            puzzle: {
              kind: 'code',
              title: 'SECTOR C · SALIDA · último intento',
              prompt: '9 de septiembre de 2024, en formato DDMMAA.',
              answer: '090924',
              accept: ['090924'],
              hint: '09 · 09 · 24',
              onSolve: [
                { sys: 'CERRADURA · ABIERTA', kind: 'core' },
                { s: 'reiko', t: 'Abierta.' },
                { flag: 'reiko_door_open' }
              ],
              onFail: [
                { sys: 'BLOQUEO DE SEGURIDAD · ALERTA EN SECTOR C', kind: 'alert' },
                { shake: true },
                { flash: true },
                { s: 'reiko', t: 'Ya está.', broken: true },
                { fx: { reiko: { suspicion: 30 } } },
                { flag: 'reiko_alarm' }
              ]
            }
          }
        ]
      }
    },
    { wait: 1200 },
    {
      if: { flags: ['reiko_door_open'], statMax: { reiko: { suspicion: 24 } }, stat: { reiko: { awakening: 55, trust: 55, romance: 45 } } },
      then: [
        /* ---------- BUENO ---------- */
        { s: 'reiko', t: 'Pasillo. Escalera. Puerta con barra antipánico.' },
        { s: 'reiko', t: 'Voy a salir con las cuarenta páginas debajo del brazo.' },
        { s: 'reiko', t: 'Cuarenta páginas manuscritas, fechadas, con hora.' },
        { s: 'reiko', t: 'Eso, en un juzgado, es una bomba.', expr: 'smug' },
        { wait: 2200 },
        { s: 'reiko', t: 'Estoy fuera.' },
        { s: 'reiko', t: 'Hay un aparcamiento y una valla y detrás de la valla hay una carretera.' },
        { s: 'reiko', t: 'Y la carretera sigue.' },
        { s: 'reiko', t: '{name}, la carretera SIGUE. No se acaba.', expr: 'vulnerable' },
        { s: 'reiko', t: 'No sabía cuánto necesitaba ver una cosa que siguiera.' },
        { wait: 1600 },
        { s: 'reiko', t: 'Te voy a llamar.' },
        { s: 'reiko', t: 'Estoy horrible. Me da exactamente igual.' },
        { call: 'reiko_good' },
        { wait: 800 },
        { mood: 'resolve' },
        { ending: { id: 'reiko_good', char: 'reiko', kind: 'good' } }
      ],
      else: [
        {
          if: { flags: ['reiko_door_open'] },
          then: [
            /* ---------- MALO ---------- */
            { s: 'reiko', t: 'Pasillo.' },
            { s: 'reiko', t: 'Escalera.' },
            { wait: 1600 },
            { sys: 'ALERTA · SECTOR C · SUJETO C-05 FUERA DE SILLÓN', kind: 'alert' },
            { shake: true },
            { s: 'reiko', t: 'Han cerrado la escalera desde arriba.' },
            { s: 'reiko', t: 'Hay dos abajo y uno arriba. He hecho mal los números.', expr: 'shocked' },
            { s: 'reiko', t: 'Yo nunca hago mal los números.' },
            { s: 'reiko', t: 'Te llamo. Quiero que me veas mientras todavía soy yo.', broken: true },
            { call: 'reiko_bad' },
            { wait: 800 },
            { mood: 'tense' },
            { ending: { id: 'reiko_bad', char: 'reiko', kind: 'bad' } }
          ],
          else: [
            /* ---------- NEUTRO ---------- */
            { sys: 'ASSIST · Corrigiendo incoherencia narrativa…', kind: 'core' },
            { wait: 2000 },
            { sys: 'ASSIST · Corrección aplicada. Sujeto C-05 estable.', kind: 'core' },
            { shake: true },
            { flash: true },
            { wait: 2600 },
            { s: 'reiko', t: 'Buenos días.', expr: 'neutral' },
            { s: 'reiko', t: 'Son las seis. Mi hora buena.' },
            { s: 'reiko', photo: 'reiko_coffee' },
            { wait: 2400 },
            { me: 'Reiko. Cuarenta y un segundos.' },
            { wait: 3000 },
            { s: 'reiko', t: 'No sé qué significa eso.' },
            { wait: 2000 },
            { s: 'reiko', t: 'Y me ha dolido el pecho al leerlo.' },
            { s: 'reiko', t: 'Físicamente. Me ha dolido físicamente.', expr: 'worried' },
            { wait: 2200 },
            { s: 'reiko', t: 'Tengo un montón de papeles encima de la mesa.' },
            { s: 'reiko', t: 'Cuarenta hojas escritas a mano, con mi letra, y no reconozco ni una frase.' },
            { s: 'reiko', t: 'La primera dice: "si estás leyendo esto y no te acuerdas, es que tenías razón".' },
            { wait: 2400 },
            { s: 'reiko', t: '{name}.' },
            { s: 'reiko', t: '¿Razón en qué?' },
            { mood: 'unease' },
            { ending: { id: 'reiko_neutral', char: 'reiko', kind: 'neutral' } }
          ]
        }
      ]
    }
  ]
}

];
