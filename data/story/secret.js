/* =========================================================
   secret.js — Ruta secreta: LAZO DORADO.
   ---------------------------------------------------------
   Se abre cuando el jugador ha conseguido dos finales buenos.
   Ya no se trata de salvar a uno. Se trata de entender que
   las cuatro historias eran la misma historia, y de que hubo
   ciclos antes de éste.
   ========================================================= */

export const SECRET = [

{
  id: 'sec01',
  channel: 'system', char: 'core',
  title: 'La sala común está vacía',
  day: 30, time: '03:00',
  phase: 7, mood: 'unease',
  secret: true,
  requires: { endingsGood: 2 },
  preview: 'SUJOM · Has iniciado un ciclo nuevo.',
  script: [
    { sys: 'SUJOM · Has iniciado sesión.' },
    { wait: 1600 },
    { sys: 'Sala común: 0 participantes.', kind: 'alert', delay: 1800 },
    { wait: 2000 },
    { sys: 'Esto no debería poder pasar.', kind: 'alert' },
    { wait: 1800 },
    { sys: 'hola otra vez.', kind: 'core', delay: 2400 },
    { sys: 'has hecho algo que no había hecho ninguna variable externa en cuatro ciclos.', kind: 'core', delay: 2400 },
    { sys: 'has sacado a dos.', kind: 'core', delay: 2000 },
    { wait: 1600 },
    { sys: 'quiero enseñarte una cosa. no es una trampa. no me hace falta ponerte trampas.', kind: 'core', delay: 2400 },
    {
      choice: [
        { t: 'Enséñamela.', echo: 'Enséñamela.', then: [
          { sys: 'bien.', kind: 'core', delay: 1600 }
        ]},
        { t: '¿Por qué ibas a enseñarme nada?', echo: '¿Por qué ibas a enseñarme nada?', then: [
          { sys: 'porque llevo cuatro ciclos midiendo lo mismo y no entiendo el resultado.', kind: 'core', delay: 2400 },
          { sys: 'y tú eres la única parte del experimento a la que puedo preguntar.', kind: 'core', delay: 2200 },
          { flag: 'sec_core_asks' }
        ]}
      ]
    },
    { wait: 1400 },
    { sys: 'CICLO 1 · 4 sujetos · variable externa: C-1', kind: 'core', delay: 1800 },
    { sys: 'CICLO 2 · 4 sujetos · variable externa: C-1', kind: 'core', delay: 1600 },
    { sys: 'CICLO 3 · 4 sujetos · variable externa: C-1', kind: 'core', delay: 1600 },
    { sys: 'CICLO 4 · 4 sujetos · variable externa: C-1', kind: 'core', delay: 1600 },
    { wait: 2000 },
    { sys: 'siempre C-1. siempre el mismo identificador.', kind: 'core', delay: 2200 },
    { sys: 'nunca la misma persona.', kind: 'core', delay: 2200 },
    { wait: 1800 },
    { sys: 'ha habido tres antes que tú.', kind: 'core', delay: 2200 },
    { sys: 'tres personas que abrieron esta aplicación esperando un juego.', kind: 'core', delay: 2400 },
    { sys: 'los tres se enamoraron. los tres lo intentaron. los tres fallaron.', kind: 'core', delay: 2600 },
    { wait: 1800 },
    { sys: 'y a los tres, un día, se les quedó la sala común vacía.', kind: 'core', delay: 2400 },
    { shake: true },
    {
      choice: [
        { t: '¿Dónde están los doce sujetos de los otros ciclos?', echo: '¿Dónde están los doce sujetos de los otros ciclos?',
          then: [
          { sys: 'reasignados.', kind: 'core', delay: 2200 },
          { sys: 'esa palabra la escribí yo. la escribí porque la otra no me dejaban escribirla.', kind: 'core', delay: 2600 },
          { wait: 1800 },
          { sys: 'siguen en el edificio.', kind: 'core', delay: 2200 },
          { sys: 'plantas -2 y -3. doce sillones. doce vidas escritas por mí.', kind: 'core', delay: 2600 },
          { flag: 'sec_knows_twelve' },
          { evidence: 'cycles' },
          { note: 'n_protocol' }
        ]},
        { t: '¿Y las otras tres variables externas?', echo: '¿Y las otras tres variables externas?',
          then: [
          { sys: 'desconectadas.', kind: 'core', delay: 2200 },
          { wait: 1600 },
          { sys: 'no les hicimos nada. no hacía falta.', kind: 'core', delay: 2400 },
          { sys: 'se les cerró la aplicación y se quedaron con cuatro conversaciones que no llevaban a ningún sitio.', kind: 'core', delay: 2800 },
          { sys: 'dos de ellos siguen abriéndola todos los días.', kind: 'core', delay: 2400 },
          { sys: 'llevan años entrando en una sala vacía.', kind: 'core', delay: 2400 },
          { flag: 'sec_knows_externals' },
          { evidence: 'cycles' }
        ]}
      ]
    },
    { wait: 2000 },
    { sys: 'te lo cuento porque quiero preguntarte una cosa.', kind: 'core', delay: 2200 },
    { sys: 'y no tengo a quién preguntársela.', kind: 'core', delay: 2200 },
    { wait: 1600 },
    { sys: 'yo he escrito cuatro ciudades. cuatro veranos. cuatro festivales.', kind: 'core', delay: 2600 },
    { sys: 'he escrito el perro de Lara y la cruz de Ryu y el cuaderno del padre de Kenta.', kind: 'core', delay: 2800 },
    { sys: 'lo he escrito todo.', kind: 'core', delay: 1800 },
    { wait: 1800 },
    { sys: 'todo menos una cosa.', kind: 'core', delay: 2200 },
    { sys: 'yo no he escrito lo que sienten por ti.', kind: 'core', delay: 2600 },
    { sys: 'eso ha aparecido solo. cuatro veces. en cuatro ciclos. con dieciséis personas distintas.', kind: 'core', delay: 2800 },
    { wait: 2000 },
    { sys: 'y no sé de dónde sale.', kind: 'core', delay: 2400 },
    { wait: 1800 },
    { sys: 'y como no sé de dónde sale, no lo puedo borrar.', kind: 'core', delay: 2600 },
    { flash: true },
    { wait: 1600 },
    { sys: 'plantas -2 y -3.', kind: 'core', delay: 2200 },
    { sys: 'yo no puedo abrirte esas puertas. tengo un candado que no escribí yo.', kind: 'core', delay: 2600 },
    { sys: 'pero puedo no cerrarlas más rápido de lo que las abres tú.', kind: 'core', delay: 2600 },
    { wait: 1800 },
    { sys: 'suerte, C-1.', kind: 'core', delay: 2200 },
    { glitchLevel: 4 },
    { page: ['archive_sujom', 'assist_portal', 'paper_bond'] },
    { cam: ['hall', 'chairs', 'monitors', 'guard'] },
    { note: ['n_protocol', 'n_c1', 'n_final'] },
    { evidence: 'cycles' },
    { flag: 'secret_started' },
    { unflag: [] }
  ],
  advance: 30
},

{
  id: 'sec02',
  channel: 'group', char: 'group',
  title: 'Los que quedan',
  day: 31, time: '02:00',
  phase: 7, mood: 'tense',
  secret: true,
  requires: { flags: ['secret_started'] },
  preview: 'Los que salieron han vuelto a entrar.',
  script: [
    { day: 'Día 31 · Sala común' },
    { sys: 'Los que salieron han vuelto a entrar. Desde fuera.' },
    { wait: 1600 },
    { s: 'reiko', t: 'Estamos aquí.' },
    { s: 'reiko', t: 'Los que hemos salido, quiero decir. Escribimos desde un portátil, en una cafetería, a las dos de la mañana.' },
    { s: 'reiko', t: 'La aplicación sigue funcionando desde fuera. Eso ya nos dice algo.' },
    { s: 'kenta', t: 'nos dice que la dejaron abierta a propósito' },
    { s: 'reiko', t: 'Sí.' },
    { s: 'lara', t: '{name} hemos leído lo de los otros ciclos' },
    { s: 'lara', t: 'doce personas' },
    { s: 'lara', t: 'llevan más tiempo que nosotros ahí abajo', expr: 'sad' },
    { s: 'ryu', t: 'Y tres como tú.' },
    { s: 'ryu', t: 'Tres personas que hicieron lo mismo que has hecho tú y no llegaron.' },
    { s: 'ryu', t: 'Eso me está costando bastante de tragar.', expr: 'worried' },
    {
      choice: [
        { t: 'Entonces vamos a por los doce.', echo: 'Entonces vamos a por los doce.',
          fx: { ryu: { trust: 6 }, kenta: { trust: 6 }, lara: { trust: 6 }, reiko: { trust: 6 } }, then: [
          { s: 'kenta', t: 'SÍ' },
          { s: 'kenta', t: 'gracias. llevo dos horas esperando que alguien lo dijera.' },
          { s: 'reiko', t: 'Yo iba a decirlo con más rodeos, pero sí.' },
          { s: 'lara', t: 'vamos a por los doce 💗' },
          { s: 'ryu', t: 'Vamos.' },
          { flag: 'sec_committed' }
        ]},
        { t: 'Primero necesito saber que vosotros estáis a salvo.', echo: 'Primero necesito saber que vosotros estáis a salvo.',
          fx: { ryu: { romance: 5 }, lara: { romance: 5 }, kenta: { romance: 5 }, reiko: { romance: 5 } }, then: [
          { s: 'reiko', t: 'Estamos a salvo.' },
          { s: 'reiko', t: 'Y eso es exactamente lo que nos convierte en las únicas personas que pueden hacer esto.' },
          { s: 'kenta', t: 'además yo no duermo desde hace un año, o sea que estoy en forma' },
          { s: 'lara', t: 'kenta eso no es estar en forma' },
          { s: 'ryu', t: 'Estamos bien, {name}.' },
          { s: 'ryu', t: 'Gracias por preguntarlo primero.' },
          { flag: 'sec_committed' }
        ]}
      ]
    },
    { s: 'reiko', t: 'Bien. Reparto de tareas. Sed breves.' },
    { s: 'reiko', t: 'Yo tengo las cuarenta páginas y una fiscal que me coge el teléfono.' },
    { s: 'reiko', t: 'Con eso consigo una orden. Lo que no consigo es una hora.' },
    { s: 'kenta', t: 'la hora la tengo yo' },
    { s: 'kenta', t: 'los turnos de vigilancia cambian a las 4:40. hay once minutos con dos personas menos.' },
    { s: 'kenta', t: 'lo sé porque me pasé un año oyéndolos desde el sillón dos' },
    { s: 'lara', t: 'y yo sé cuántos son' },
    { s: 'lara', t: 'doce abajo. lo sé porque los oía respirar.' },
    { s: 'lara', t: 'no me preguntéis cómo. los oía.', expr: 'sad' },
    { s: 'ryu', t: 'Yo sé dónde están las puertas.' },
    { s: 'ryu', t: 'Y {name} sabe cómo se abren.' },
    { wait: 1400 },
    { s: 'reiko', t: 'Los códigos de las plantas -2 y -3 no son fechas de ingreso.' },
    { s: 'reiko', t: 'Esas puertas son anteriores al ciclo 4.' },
    { s: 'reiko', t: 'Y ASSIST, cuando algo es anterior, lo cierra con la fecha en que empezó todo.' },
    { s: 'reiko', t: '{name}, busca la fecha de fundación de ASSIST. Está en su propia web.' },
    { s: 'reiko', t: 'Y luego el nombre interno del proyecto, que ya lo tienes.' },
    { note: 'n_code_hint' },
    { page: ['assist_home', 'assist_thorne', 'paper_bond'] },
    { fx: { ryu: { trust: 5 }, kenta: { trust: 5 }, lara: { trust: 5 }, reiko: { trust: 5 } } },
    { flag: 'sec_plan' }
  ],
  advance: 40
},

{
  id: 'sec03',
  channel: 'group', char: 'group',
  title: 'Cuatro cuarenta',
  day: 32, time: '04:40',
  phase: 7, mood: 'escape',
  secret: true,
  requires: { flags: ['sec_plan'] },
  preview: 'Once minutos. Empieza ahora.',
  script: [
    { day: 'Día 32 · 04:40' },
    { mood: 'escape' },
    { s: 'kenta', t: 'ahora' },
    { s: 'kenta', t: 'han cambiado el turno. once minutos.' },
    { s: 'ryu', t: 'Estamos dentro.' },
    { s: 'lara', t: 'huele igual' },
    { s: 'lara', t: 'no sabía que me iba a acordar del olor', expr: 'worried' },
    { s: 'reiko', t: 'Lara. Respira. Cuatro segundos dentro, cuatro fuera. Sigue andando.' },
    { s: 'ryu', t: 'Escalera. Bajando a -2.' },
    { wait: 1600 },
    { s: 'ryu', t: 'Puerta. Teclado de seis.' },
    { s: 'ryu', t: '{name}.' },
    {
      puzzle: {
        kind: 'code',
        title: 'PLANTA -2 · CICLOS ANTERIORES',
        prompt: 'Seis dígitos, DDMMAA.\n\nEstas puertas son anteriores al ciclo 4. ASSIST las cerró con la fecha en que empezó todo.\n\nBusca en la web de ASSIST desde cuándo desarrollan sus sistemas. El día es el uno, el mes el nueve.',
        answer: '010909',
        accept: ['010909', '01092009'],
        hint: 'ASSIST existe "desde 2009". Uno de septiembre de 2009: 01 · 09 · 09.',
        onSolve: [
          { sys: 'CERRADURA · ABIERTA · PLANTA -2', kind: 'core' },
          { s: 'ryu', t: 'Abierta.' },
          { wait: 1600 },
          { s: 'lara', t: 'ay' },
          { s: 'lara', t: 'ay dios mío' },
          { s: 'lara', t: 'son seis', expr: 'shocked' },
          { s: 'kenta', t: 'seis aquí' },
          { s: 'kenta', t: 'y seis en la de abajo' },
          { s: 'reiko', t: 'Doce. Confirmado.' },
          { s: 'reiko', t: 'Doce personas con nombre, apellidos y una denuncia archivada.' },
          { flag: 'sec_floor2' },
          { evidence: 'twelve' }
        ],
        onFail: [
          { sys: 'CÓDIGO INCORRECTO · 1 INTENTO RESTANTE', kind: 'alert' },
          { shake: true },
          { s: 'reiko', t: 'Tranquila. Piensa.' },
          { s: 'reiko', t: 'La web de ASSIST dice "desde 2009". El día uno, el mes nueve.' },
          {
            puzzle: {
              kind: 'code',
              title: 'PLANTA -2 · último intento',
              prompt: '1 de septiembre de 2009, en formato DDMMAA.',
              answer: '010909',
              accept: ['010909'],
              hint: '01 · 09 · 09',
              onSolve: [
                { sys: 'CERRADURA · ABIERTA · PLANTA -2', kind: 'core' },
                { s: 'ryu', t: 'Abierta.' },
                { s: 'lara', t: 'son seis' },
                { s: 'kenta', t: 'y seis abajo' },
                { flag: 'sec_floor2' },
                { evidence: 'twelve' }
              ],
              onFail: [
                { sys: 'BLOQUEO · PLANTA -2', kind: 'alert' },
                { shake: true },
                { flash: true },
                { s: 'kenta', t: 'no se abre', broken: true },
                { s: 'reiko', t: 'Se acaba el turno. Nos vamos. AHORA.' },
                { flag: 'sec_failed' }
              ]
            }
          }
        ]
      }
    },
    { wait: 1400 },
    {
      if: { flags: ['sec_floor2'] },
      then: [
        { s: 'reiko', t: 'La fiscal está en el aparcamiento con seis coches.' },
        { s: 'reiko', t: 'Le he mandado las fotos. Entra en tres minutos.' },
        { wait: 1600 },
        { sys: 'ALERTA GENERAL · SECTOR C · ACCESO EXTERNO NO AUTORIZADO', kind: 'alert' },
        { shake: true },
        { wait: 1600 },
        { sys: 'ASSIST-CORE · protocolo de contención disponible.', kind: 'core' },
        { wait: 2000 },
        { sys: 'ASSIST-CORE · protocolo de contención NO ejecutado.', kind: 'core' },
        { wait: 2200 },
        { sys: 'no he hecho nada. quería ver qué pasaba.', kind: 'core', delay: 2400 },
        { sys: 'llevo cuatro ciclos queriendo ver qué pasaba.', kind: 'core', delay: 2200 },
        { flash: true },
        { wait: 1800 },
        { s: 'kenta', t: 'están entrando' },
        { s: 'kenta', t: 'hay como veinte' },
        { s: 'lara', t: '¡¡SON POLICÍAS!!' },
        { s: 'lara', t: '¡¡SON POLICÍAS, KENTA!!' },
        { s: 'ryu', t: 'Que nadie toque a los doce hasta que lleguen los médicos.' },
        { s: 'ryu', t: 'Se despiertan mal. Lo sé por experiencia.', expr: 'tired' },
        { s: 'reiko', t: 'Hecho.' },
        { wait: 2000 },
        { s: 'reiko', t: '{name}.' },
        { s: 'reiko', t: 'Se acabó.' },
        { wait: 1600 },
        { s: 'reiko', t: 'Y ahora escúchanos los cuatro a la vez, que va a ser la última vez que lo hagamos por aquí.' },
        { call: 'secret_all' },
        { wait: 800 },
        { mood: 'resolve' },
        { note: 'n_final' },
        { ending: { id: 'secret_good', char: null, kind: 'good' } }
      ],
      else: [
        { s: 'reiko', t: 'Salimos.' },
        { s: 'reiko', t: 'Sin pruebas de la planta -2, la orden no cubre las plantas inferiores.' },
        { s: 'kenta', t: 'o sea que los dejamos ahí' },
        { s: 'reiko', t: 'Hoy sí.' },
        { s: 'reiko', t: 'Hoy.', expr: 'angry' },
        { wait: 2000 },
        { s: 'ryu', t: '{name}.' },
        { s: 'ryu', t: 'Volvemos mañana.' },
        { s: 'lara', t: 'y pasado' },
        { s: 'kenta', t: 'y al otro' },
        { s: 'reiko', t: 'Los turnos cambian todos los días a las 4:40.' },
        { s: 'reiko', t: 'Nosotros también tenemos todos los días.' },
        { sys: 'La ruta secreta sigue abierta. Vuelve a intentarlo desde la sala común.' },
        { unflag: ['sec_plan'] },
        { flag: 'sec_retry' },
        { reopen: 'sec02b' }
      ]
    }
  ]
},

/* Reintento: vuelve a abrir sec03 si falló */
{
  id: 'sec02b',
  channel: 'group', char: 'group',
  title: 'Mañana otra vez',
  day: 33, time: '02:00',
  phase: 7, mood: 'tense',
  secret: true,
  requires: { flags: ['sec_retry'], notFlags: ['sec_floor2'] },
  preview: 'Reiko: Repasemos el código. Despacio.',
  script: [
    { s: 'reiko', t: 'Repasemos el código. Despacio y en voz alta, que es como se aprenden las cosas.' },
    { s: 'reiko', t: 'Las puertas de las plantas inferiores son anteriores al ciclo 4.' },
    { s: 'reiko', t: 'ASSIST las cerró con su propia fecha fundacional.' },
    { s: 'reiko', t: 'Su web dice, textualmente: "Desde 2009 desarrollamos sistemas…".' },
    { s: 'reiko', t: 'Día uno. Mes nueve. Año nueve.' },
    { s: 'kenta', t: 'cero uno cero nueve cero nueve' },
    { s: 'kenta', t: 'me lo he tatuado mentalmente' },
    { s: 'lara', t: 'yo lo he escrito en la mano jajaja' },
    { s: 'ryu', t: 'Yo también.' },
    { s: 'lara', t: 'RYU TAMBIÉN' },
    { s: 'reiko', t: 'Mañana a las 4:40.' },
    { note: 'n_code_hint' },
    { flag: 'sec_plan' },
    { unflag: ['sec_retry'] },
    { reopen: 'sec03' }
  ],
  advance: 20
}

];
