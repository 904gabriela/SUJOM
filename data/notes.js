/* =========================================================
   notes.js — Cuaderno.
   ---------------------------------------------------------
   Algunas notas las escribe SUJOM sola ("para que no se te
   olvide"). Otras las escribe el jugador sin darse cuenta.
   Y algunas, más tarde, dejan de decir lo que decían.
   ========================================================= */

export const NOTES = {
  n_welcome: {
    title: 'Bienvenida',
    kind: 'info',
    date: 'D1',
    body: 'SUJOM guarda aquí lo que va pasando, para que no tengas que acordarte de todo.\n\nPuedes volver cuando quieras.'
  },

  /* --- cotidianas --- */
  n_ryu_fw: {
    title: 'Fuegos artificiales',
    kind: 'info',
    date: 'D2',
    body: 'A Ryu le gustan los fuegos artificiales.\n\nDice que es lo único que le sigue pareciendo bonito aunque sepa exactamente cómo funciona.'
  },
  n_kenta_home: {
    title: 'Kenta y la palabra "casa"',
    kind: 'info',
    date: 'D3',
    body: 'Se fue de casa a los diecisiete. No dice por qué exactamente, sólo repite que "no aguantaba".\n\nCuando le pregunté si echaba algo de menos, tardó nueve minutos en contestar "el arroz de mi madre" y luego borró el mensaje.'
  },
  n_lara_momo: {
    title: 'Momo',
    kind: 'info',
    date: 'D2',
    body: 'El perro de Lara. Siete años. Una oreja rota desde que era cachorro.\n\nLara dice que Momo es "la única persona de su casa que nunca le ha mentido".\n\nMe pareció una forma rara de decirlo.'
  },
  n_reiko_company: {
    title: 'La empresa de Reiko',
    kind: 'info',
    date: 'D3',
    body: 'La montó a los veintidós. Sin dinero de su familia — insistió mucho en esa parte.\n\nTres personas de su equipo la vaciaron en once meses. Su nombre salió en los periódicos antes que el de ellos.'
  },

  /* --- primeras grietas --- */
  n_repeat: {
    title: 'El mensaje repetido',
    kind: 'info',
    date: 'D5',
    body: 'Ryu me escribió lo mismo dos veces, palabra por palabra, con quince minutos de diferencia.\n\nCuando se lo dije, no había ningún mensaje repetido en su pantalla.\n\nSerá un fallo de la app.',
    revised: 'Ya no creo que sea un fallo de la app.'
  },
  n_dates: {
    title: 'Las fechas no cuadran',
    kind: 'evidence',
    date: 'D6',
    body: 'Lara dice que conoció a Kenta "hace como un año".\nKenta dice que conoció a Lara "en marzo".\nReiko dice que se conocieron los cuatro "el mismo día".\n\nNinguna de las tres cosas puede ser verdad a la vez.'
  },
  n_moon: {
    title: 'La luna',
    kind: 'evidence',
    date: 'D7',
    body: 'He comparado la foto de la ventana de Ryu del día 2 con la del día 15.\n\nLa luna está exactamente en el mismo sitio. Misma fase, misma altura, mismo píxel.\n\nEso no pasa.'
  },

  /* --- ASSIST --- */
  n_assist: {
    title: 'ASSIST Global Solutions',
    kind: 'evidence',
    date: 'D8',
    body: 'Ciberseguridad, inteligencia artificial, "análisis emocional".\nContratos con administraciones públicas.\nFundador: Dr. Alistair R. Thorne.\n\nLema: "Conectar el mundo a través de la comprensión emocional".\n\nSUJOM aparece en el pie de página de su web. Muy abajo. En gris.'
  },
  n_thorne: {
    title: 'Dr. Alistair R. Thorne',
    kind: 'evidence',
    date: 'D9',
    body: 'Fundador de ASSIST. Cincuenta y ocho años. Ocho doctorados honoríficos.\n\nEn todas las entrevistas dice lo mismo: que el problema del mundo no es la falta de información, sino la falta de vínculo.\n\nLo dice con calma. Y tiene razón. Ese es el problema.'
  },
  n_missing: {
    title: 'Personas desaparecidas',
    kind: 'evidence',
    date: 'D10',
    body: 'Cuatro denuncias abiertas. Cuatro ciudades distintas. Ninguna relacionada, según la policía.\n\nUn chico de 20 que dejó de ir a trabajar.\nUn chico de 18 cuya familia dice que "se fue solo".\nUna chica de 21 cuyos padres retiraron la denuncia a las tres semanas.\nUna empresaria de 25 de la que se dijo que se había ido del país.\n\nNo hace falta que te diga los nombres.'
  },
  n_protocol: {
    title: 'Protocolo Lazo Dorado',
    kind: 'core',
    date: '——',
    body: 'PROYECTO CORONA / PROTOCOLO LAZO DORADO\n\nInterfaz neurocognitiva de vínculo sostenido.\nSujetos sedados. Entorno simulado persistente.\nMemoria editable. Corrección narrativa automática.\n\nObjetivo declarado: medir si el apego emocional genuino puede generarse, dirigirse y — llegado el caso — romperse.\n\nVariable externa introducida en el ciclo 4: SUJETO C-1.'
  },
  n_c1: {
    title: 'C-1',
    kind: 'core',
    date: '——',
    body: 'En todos los registros hay cuatro sujetos en sillón: C-02, C-03, C-04 y uno cuyo campo está vacío.\n\nY hay un quinto identificador que aparece en cada sesión, en cada medición, en cada informe de vínculo.\n\nC-1.\n\nNo tiene sillón asignado. No tiene sala. No tiene hora de ingreso.\n\nTiene un nombre de usuario.'
  },

  /* --- por personaje --- */
  n_ryu_sister: {
    title: 'La hermana de Ryu',
    kind: 'evidence',
    date: 'D11',
    body: 'Se llama Mei. Ryu me habló de ella el día 4: dijo que le gustaba dibujar y que se reía "como un grifo mal cerrado".\n\nHoy le he preguntado por ella.\n\nMe ha dicho: "¿Quién?".',
    revised: 'Centro Médico Sanwa, ala C. Ingreso 14/11/2023.\nFacturas: LIQUIDADAS.\nPagador: ASSIST GLOBAL SOLUTIONS, S.A.\n\nASSIST cumplió su promesa.\nY luego le quitó a Ryu el recuerdo de habérsela pedido.'
  },
  n_kenta_form: {
    title: 'El formulario de Kenta',
    kind: 'evidence',
    date: 'D11',
    body: 'Formulario de ingreso voluntario.\nFirma: K——.\nFecha: 03/02/2024.\n\nEl día siguiente a su cumpleaños. Cumplía dieciocho el 2.\n\nEsperaron un día. Un solo día, para que la firma valiera.'
  },
  n_lara_price: {
    title: 'La cifra',
    kind: 'evidence',
    date: 'D11',
    body: 'Cesión de tutela temporal. 21/06/2024.\nContraprestación: 41.000.000.\n\nFirmado por sus dos padres.\nLara no firma en ninguna parte del documento.\n\nElla vio la cifra. Me lo dijo así: "sé exactamente cuánto valía".'
  },
  n_reiko_gap: {
    title: 'Los once meses',
    kind: 'evidence',
    date: 'D11',
    body: 'Reiko puede contarme su vida entera menos once meses.\n\nSabe que su empresa cayó. Sabe que salió en la prensa. No sabe qué hizo entre una cosa y la otra.\n\nCláusula 14.2 de su contrato: cesión de registro neurocognitivo.\n\nNo le borraron la vida. Le borraron la parte en la que se dio cuenta.'
  },

  /* --- puzles --- */
  n_code_hint: {
    title: 'Seis dígitos',
    kind: 'evidence',
    date: '——',
    body: 'La puerta del sector C tiene un teclado de seis dígitos.\n\nASSIST no usa contraseñas aleatorias en las puertas internas: usa fechas de ingreso. Lo pone en su propio manual de seguridad, en la página que nadie lee.\n\nFormato: DDMMAA.'
  },
  n_final: {
    title: 'Lo que sé',
    kind: 'core',
    date: '——',
    body: 'Son reales.\n\nEstán en una sala del sector C, en cuatro sillones, sedados, con la cabeza llena de una ciudad que no existe y de una vida que alguien les escribió.\n\nY yo llevo semanas hablando con ellos.\n\nNo era un juego. Nunca lo fue. Yo era la parte del experimento que tenía que caerles bien.'
  }
};
