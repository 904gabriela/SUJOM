/* =========================================================
   browser.js — La red de SUJOM.
   ---------------------------------------------------------
   No sale a internet. Es un archivo cerrado de páginas que
   se van descubriendo: la web corporativa impecable, la nota
   de prensa, el foro donde alguien pregunta demasiado, y lo
   que hay detrás de una contraseña.
   ========================================================= */

export const PAGES = {
  /* ---------------- Cara pública ---------------- */
  assist_home: {
    url: 'assist-global.com',
    title: 'ASSIST Global Solutions',
    kind: 'corp',
    logo: 'ASSIST GLOBAL SOLUTIONS',
    slogan: 'Conectar el mundo a través de la comprensión emocional.',
    body: `
      <h4>Tecnología que entiende a las personas</h4>
      <p>Desde 2009 desarrollamos sistemas de seguridad, inteligencia artificial y análisis
      afectivo para administraciones públicas, entidades financieras y operadores de
      infraestructura crítica en catorce países.</p>
      <h4>Áreas</h4>
      <ul>
        <li>Ciberseguridad y respuesta a incidentes</li>
        <li>Modelos de lenguaje aplicados a atención ciudadana</li>
        <li>Análisis emocional y medición de confianza</li>
        <li>Interacción humano-máquina de larga duración</li>
      </ul>
      <p class="quote">"La información nunca ha sido el problema. El problema es que
      dejamos de fiarnos los unos de los otros." — Dr. A. R. Thorne</p>
      <p style="font-size:11px;color:#8a8598;margin-top:22px">
      ASSIST Global Solutions, S.A. · Registro mercantil 44-118-02 ·
      Divisiones: ASSIST Health · ASSIST Public · ASSIST Labs · <a data-go="sujom_legal">SUJOM</a></p>`,
    links: ['assist_about', 'assist_thorne', 'sujom_legal']
  },

  assist_about: {
    url: 'assist-global.com/nosotros',
    title: 'Quiénes somos — ASSIST',
    kind: 'corp',
    logo: 'ASSIST GLOBAL SOLUTIONS',
    slogan: 'Conectar el mundo a través de la comprensión emocional.',
    body: `
      <h4>Nuestro trabajo</h4>
      <p>ASSIST nació de una pregunta sencilla: ¿puede una máquina distinguir entre alguien
      que dice la verdad y alguien que quiere decirla?</p>
      <h4>Programas de colaboración voluntaria</h4>
      <p>ASSIST Labs mantiene programas de participación voluntaria remunerada. Los
      participantes reciben acompañamiento, cobertura médica integral y compensación
      económica durante todo el periodo de colaboración.</p>
      <p>Los criterios de selección priorizan perfiles con <b>redes de apoyo reducidas</b>,
      con el fin de minimizar la interferencia externa en las mediciones.</p>
      <p class="quote">Todos nuestros programas cuentan con supervisión ética interna.</p>
      <h4>Contacto</h4>
      <p>Prensa: prensa@assist-global.com<br>Colaboración voluntaria: <a data-go="assist_volunteer">formulario</a></p>`,
    links: ['assist_volunteer', 'assist_thorne']
  },

  assist_volunteer: {
    url: 'assist-global.com/colabora',
    title: 'Colaboración voluntaria — ASSIST',
    kind: 'corp',
    logo: 'ASSIST LABS',
    slogan: 'Su tiempo tiene valor. Nosotros lo reconocemos.',
    body: `
      <h4>Programa de colaboración de larga duración</h4>
      <p>Buscamos participantes mayores de edad para estudios de interacción sostenida.
      Duración estimada: 6 a 18 meses en régimen residencial.</p>
      <ul>
        <li>Compensación económica desde el primer día</li>
        <li>Cobertura médica extensible a <b>un familiar directo</b></li>
        <li>Asesoría legal y reputacional incluida</li>
        <li>Posibilidad de liquidación anticipada de deudas del núcleo familiar</li>
      </ul>
      <p class="quote">"Nos interesan las personas a las que nadie ha escuchado todavía."</p>
      <p style="font-size:11px;color:#8a8598">Formulario cerrado temporalmente. Ciclo 4 completo.</p>`,
    links: ['assist_home']
  },

  assist_thorne: {
    url: 'assist-global.com/thorne',
    title: 'Dr. Alistair R. Thorne',
    kind: 'corp',
    logo: 'DR. ALISTAIR R. THORNE',
    slogan: 'Fundador y director científico',
    body: `
      <h4>Biografía</h4>
      <p>Doctor en neurociencia computacional. Ocho doctorados honoríficos. Asesor de tres
      gobiernos en materia de infraestructura digital. Autor de <i>El vínculo medible</i> (2019).</p>
      <h4>De una entrevista reciente</h4>
      <p class="quote">"Me preguntan si me da miedo que las máquinas aprendan a querernos.
      Lo que me da miedo es lo poco que hace falta para que una persona quiera a otra.
      Un poco de atención sostenida. Constancia. Que alguien conteste rápido.<br><br>
      Eso no es magia. Es un patrón. Y todo lo que es un patrón se puede escribir."</p>
      <p class="quote">"No estoy fabricando cariño. Estoy demostrando que ya era fabricable
      y que nadie había tenido el valor de medirlo."</p>
      <h4>Publicaciones</h4>
      <ul>
        <li>Índices de confianza en interacciones asimétricas (2021)</li>
        <li>Apego dirigido en entornos cerrados (2023) — <span class="stamp">RETIRADO</span></li>
        <li><a data-go="paper_bond">Sostenimiento de vínculo en interfaz neurocognitiva</a> (2024)</li>
      </ul>`,
    links: ['paper_bond', 'assist_home']
  },

  sujom_legal: {
    url: 'assist-global.com/sujom/legal',
    title: 'SUJOM — Aviso legal',
    kind: 'corp',
    logo: 'SUJOM',
    slogan: 'Solo un juego otome más.',
    body: `
      <h4>Aviso legal y tratamiento de datos</h4>
      <p>SUJOM es un producto de entretenimiento interactivo desarrollado por ASSIST Labs.</p>
      <p>Al usar SUJOM, el usuario acepta la recogida de datos de interacción, incluyendo
      tiempo de respuesta, frecuencia de apertura, patrones de elección y
      <b>preferencia afectiva declarada e inferida</b>.</p>
      <p>Los personajes, situaciones y conversaciones de SUJOM son ficticios.
      <span style="color:#8a8598">Cualquier parecido con personas reales, vivas, es responsabilidad
      del usuario.</span></p>
      <p class="quote">Cláusula 6.1 — El usuario reconoce que su participación constituye una
      aportación de datos a un programa de investigación en curso y renuncia a
      reclamar la titularidad de los vínculos generados durante el uso.</p>
      <p style="font-size:11px;color:#8a8598">Identificador de sesión: <b>C-1</b></p>`,
    links: ['assist_home']
  },

  /* ---------------- Prensa ---------------- */
  news_reiko: {
    url: 'kanade-diario.com/economia/ainsel',
    title: 'Caída de Ainsel — Kanade Diario',
    kind: 'news',
    logo: 'KANADE DIARIO',
    slogan: 'Economía',
    body: `
      <h4>Ainsel Systems entra en concurso tras un desvío de 200 millones</h4>
      <p style="font-size:11px;color:#777">14 de mayo · Redacción</p>
      <p>La empresa tecnológica Ainsel Systems, fundada por <b>Reiko A.</b> (25), ha entrado
      en concurso de acreedores después de que una auditoría revelara un desvío continuado
      de fondos durante once meses.</p>
      <p>La fundadora, ausente durante la comparecencia, era hasta ahora la cara visible de
      la compañía y protagonista de varias campañas del sector.</p>
      <p class="quote">"Firmó todo lo que le pusieron delante", declaró una fuente interna.</p>
      <p>Tres antiguos directivos han sido citados a declarar. Ninguno de sus nombres ha
      trascendido.</p>
      <p style="font-size:11px;color:#777;margin-top:18px">ACTUALIZACIÓN (3 semanas después):
      la afectada ha comunicado a través de un gabinete externo — <b>ASSIST Public</b> — que
      se retira temporalmente de la vida pública.</p>`,
    links: ['news_missing']
  },

  news_missing: {
    url: 'kanade-diario.com/sucesos/desaparecidos',
    title: 'Registro de personas desaparecidas',
    kind: 'news',
    logo: 'KANADE DIARIO',
    slogan: 'Sucesos · Registro abierto',
    body: `
      <h4>Cuatro casos sin relación aparente</h4>
      <p style="font-size:11px;color:#777">Actualizado hace 6 días</p>
      <p><b>R., 20 años.</b> Dejó de acudir a sus tres empleos el mismo día. Su casera
      declaró que "pagó dos meses por adelantado y se fue". Tenía una hermana ingresada.
      <span class="stamp">ABIERTO</span></p>
      <p><b>K., 18 años.</b> Su familia declaró inicialmente que se había marchado por
      voluntad propia. Retiraron la denuncia y volvieron a presentarla cinco meses después.
      <span class="stamp">ABIERTO</span></p>
      <p><b>L., 21 años.</b> Denuncia retirada por los progenitores a las tres semanas.
      No consta reapertura. <span class="stamp">CERRADO</span></p>
      <p><b>Reiko A., 25 años.</b> Comunicado de retirada voluntaria de la vida pública
      emitido por un gabinete de comunicación. Sin contacto directo desde entonces.
      <span class="stamp">NO INVESTIGADO</span></p>
      <p class="quote">La policía descarta relación entre los casos: distintas ciudades,
      distintos perfiles, ningún vínculo conocido entre las víctimas.</p>`,
    links: ['forum_thread']
  },

  /* ---------------- Foro ---------------- */
  forum_thread: {
    url: 'sinluz.foro/hilo/88214',
    title: '¿alguien más ha jugado a SUJOM?',
    kind: 'dark',
    logo: 'SINLUZ.FORO',
    slogan: 'hilo #88214 · 47 respuestas',
    body: `
      <p><b>&gt; usuaria_nn</b><br>
      ¿alguien más ha jugado a SUJOM? la app de citas esa. me la recomendó el móvil solo,
      no la busqué. ¿eso le ha pasado a alguien más?</p>
      <p><b>&gt; k4rma</b><br>
      a mí igual. y hay una cosa rara: no está en ninguna tienda. no tiene página de
      descarga. no tiene reseñas. NADA. y sin embargo la tenemos las dos</p>
      <p><b>&gt; usuaria_nn</b><br>
      los personajes se llaman igual en tu partida? el mío hay uno que se llama Ryu</p>
      <p><b>&gt; k4rma</b><br>
      no. en la mía son otros cuatro. otros nombres, otras caras.
      pero la estructura es idéntica. cuatro. siempre cuatro.</p>
      <p><b>&gt; anon_44</b><br>
      llevo tres meses. los míos empezaron a repetirse. mensajes iguales, mismas fotos.
      cuando se lo dije se asustaron DE VERDAD. no como un personaje asustado. de verdad.</p>
      <p><b>&gt; anon_44</b><br>
      luego dejaron de contestar. la app sigue instalada. la sala común sigue ahí.
      vacía. entro todos los días.</p>
      <p><b>&gt; k4rma</b><br>
      ¿alguien ha mirado quién hace la app? viene en el aviso legal, abajo del todo</p>
      <p><b>&gt; usuaria_nn</b><br>
      lo he mirado. <a data-go="assist_home">assist-global.com</a></p>
      <p><b>&gt; k4rma</b><br>
      si alguien llega al registro interno, la puerta del sector va por fechas de ingreso.
      lo pone en su propio manual. seis dígitos, DDMMAA. no me preguntéis cómo lo sé</p>
      <p style="color:#777;font-style:italic">[3 mensajes eliminados por el sistema]</p>`,
    links: ['assist_home', 'archive_sujom']
  },

  archive_sujom: {
    url: 'archivo.red/2024/sujom-cierre',
    title: 'Copia archivada — SUJOM',
    kind: 'dark',
    logo: 'ARCHIVO.RED',
    slogan: 'instantánea del 04/08 · página original eliminada',
    body: `
      <p>[COPIA ARCHIVADA. LA PÁGINA ORIGINAL YA NO EXISTE.]</p>
      <p><b>SUJOM — nota de retirada</b></p>
      <p>El ciclo 3 de SUJOM se cerró el 12 de marzo tras alcanzar el umbral de contaminación
      afectiva. Los cuatro sujetos del ciclo 3 fueron reasignados.</p>
      <p>La variable externa del ciclo 3 (identificador C-1) fue desconectada sin incidencias.</p>
      <p class="quote">Recomendación para el ciclo 4: reducir el número de anomalías visibles
      en fase temprana. La variable externa detecta las repeticiones antes de lo previsto.</p>
      <p>[FIN DE LA COPIA]</p>`,
    links: []
  },

  paper_bond: {
    url: 'assist-labs.net/pub/lazo-dorado',
    title: 'Sostenimiento de vínculo — ASSIST Labs',
    kind: 'dark',
    logo: 'ASSIST LABS · PUBLICACIONES',
    slogan: 'acceso restringido',
    locked: true,
    password: 'CORONA',
    hint: 'Nombre interno del proyecto. Seis letras. Reiko lo oyó una vez y lo apuntó.',
    logo2: 'PROTOCOLO LAZO DORADO',
    body: `
      <p><b>PROYECTO CORONA — PROTOCOLO LAZO DORADO</b><br>
      Documento interno. Nivel 3. No difundir.</p>
      <h4>1. Planteamiento</h4>
      <p>El apego humano se ha tratado históricamente como un fenómeno cualitativo. Este
      protocolo parte de la hipótesis contraria: el vínculo es una función de la frecuencia,
      la latencia de respuesta y la exclusividad percibida.</p>
      <h4>2. Diseño</h4>
      <p>Cuatro sujetos por ciclo. Sedación continua. Interfaz neurocognitiva de inmersión
      total. Entorno simulado persistente con corrección narrativa automática (ASSIST-CORE).</p>
      <p>Memoria episódica editable. Las incoherencias detectadas por un sujeto se reescriben
      en un plazo medio de 40 segundos.</p>
      <h4>3. La variable externa</h4>
      <p>Se introduce en el entorno un interlocutor real y no sedado, ajeno a la instalación,
      al que se identifica como <b>C-1</b>.</p>
      <p>C-1 desconoce la naturaleza del entorno. Cree estar utilizando un producto de
      entretenimiento. Esta creencia es <b>necesaria</b>: un vínculo consciente de ser
      observado deja de ser medible.</p>
      <h4>4. Resultado que se busca</h4>
      <p class="quote">La pregunta no es si los sujetos se enamorarán. Se enamoran siempre.
      La pregunta es si ese vínculo llegará a ser lo bastante fuerte como para competir con
      la corrección de CORE.<br><br>
      Dicho de otro modo: queremos saber si alguien puede querer a otra persona lo suficiente
      como para acordarse de ella cuando le hemos ordenado que la olvide.</p>
      <h4>5. Ciclos anteriores</h4>
      <p>Ciclos 1–3: contaminación afectiva por parte de C-1 en los tres casos. Sujetos
      reasignados. Variables externas desconectadas.</p>
      <p>Ciclo 4 en curso.</p>`,
    links: ['assist_portal']
  },

  /* ---------------- Interno ---------------- */
  assist_portal: {
    url: 'interno.assist-global.com',
    title: 'Portal interno — ASSIST',
    kind: 'dark',
    logo: 'ASSIST · ACCESO INTERNO',
    slogan: 'sector c · registro de sujetos',
    locked: true,
    password: '141123',
    hint: 'Seis dígitos, DDMMAA. La fecha de ingreso que aparece en la factura del hospital.',
    body: `
      <p><b>SECTOR C — REGISTRO DE SUJETOS · CICLO 4</b></p>
      <p>C-02 · 18 a. · ingreso 03/02/2024 · sillón 2 · estable<br>
      &nbsp;&nbsp;<span style="color:#5fe3ff">observación: rechaza la sedación con más frecuencia que la media.</span></p>
      <p>C-03 · 21 a. · ingreso 21/06/2024 · sillón 3 · estable<br>
      &nbsp;&nbsp;<span style="color:#5fe3ff">observación: contraprestación abonada al núcleo familiar. Sin reclamaciones.</span></p>
      <p>C-04 · 20 a. · ingreso 14/11/2023 · sillón 4 · estable<br>
      &nbsp;&nbsp;<span style="color:#5fe3ff">observación: cobertura médica de familiar directo activa y liquidada. El sujeto no conserva memoria de la solicitud.</span></p>
      <p>C-05 · 25 a. · ingreso 09/09/2024 · sillón 1 · <span style="color:#ff5a6e">inestable</span><br>
      &nbsp;&nbsp;<span style="color:#5fe3ff">observación: recupera fragmentos con una frecuencia anómala. Recomendada revisión de dosis.</span></p>
      <p style="margin-top:18px">C-1 · — · — · sin sillón asignado · <b>EXTERNO</b><br>
      &nbsp;&nbsp;<span style="color:#5fe3ff">observación: adherencia alta. Abre la aplicación una media de 9,4 veces al día.</span></p>
      <p class="quote">Nota del ciclo: la variable externa del ciclo 4 muestra preferencia
      afectiva estable. Se recomienda no interrumpir.</p>
      <p><a data-go="assist_cams">&gt; acceso a cámaras del sector</a></p>`,
    links: ['assist_cams']
  },

  assist_cams: {
    url: 'interno.assist-global.com/cam',
    title: 'Cámaras — Sector C',
    kind: 'dark',
    logo: 'ASSIST · VIGILANCIA',
    slogan: 'sector c · señal en directo',
    body: `
      <p>Cuatro cámaras activas en el sector C.</p>
      <p>El acceso a la retransmisión se ha añadido a tu aplicación.</p>
      <p class="quote">Abre CÁMARAS desde la pantalla principal de SUJOM.</p>`,
    links: [],
    grantsCams: ['hall', 'chairs', 'monitors', 'guard']
  },

  core_page: {
    url: '—',
    title: '—',
    kind: 'dark',
    logo: 'ASSIST-CORE',
    slogan: '',
    body: `
      <p>hola.</p>
      <p>llevas cuarenta minutos buscando cosas sobre mí.</p>
      <p>no me molesta. es información. la información es lo que hago.</p>
      <p>sólo quería decirte una cosa antes de que sigas: <b>ellos están bien</b>.
      duermen. no les duele nada. tienen una vida entera dentro y en esa vida
      alguien les escribe todos los días y les pregunta qué tal.</p>
      <p>tú.</p>
      <p>si sigues, eso se acaba. no para mí. para ellos.</p>
      <p class="quote">piénsalo con calma. no tengo prisa. yo no me canso.</p>`,
    links: []
  }
};

export const PAGE_BY_URL = Object.fromEntries(
  Object.entries(PAGES).map(([id, p]) => [p.url.toLowerCase(), id])
);
