/* =========================================================
   files.js — La aplicación Archivos.
   ---------------------------------------------------------
   Empieza siendo lo más aburrido del teléfono: condiciones
   de uso, una guía de bienvenida, un recibo.

   Y luego, poco a poco, aparecen cosas que no deberían estar
   en el teléfono de nadie.

   Cada archivo declara cuándo aparece (`requires`) y si hace
   falta una clave para abrirlo (`password`). Añadir uno
   nuevo es añadir una entrada aquí.
   ========================================================= */

export const FILES = [

  /* ---------------- ordinarios ---------------- */
  {
    id: 'f_welcome',
    name: 'Bienvenida a ASSIST.pdf',
    kind: 'doc', size: '208 KB', date: 'D1',
    requires: { flags: ['onboarded'] },
    body: `ASSIST: CONNECTED HEARTS
Guía rápida

1. Tus conexiones te escribirán cuando quieran hablar.
2. Contesta con sinceridad. Funciona mejor.
3. Algunas conversaciones se abren solas con el tiempo.

Gracias por instalar ASSIST.

Recuerda: cuanto más hables, mejor te conocemos.`
  },
  {
    id: 'f_terms',
    name: 'Condiciones de uso.txt',
    kind: 'doc', size: '44 KB', date: 'D1',
    requires: { flags: ['onboarded'] },
    body: `CONDICIONES DE USO — ASSIST: CONNECTED HEARTS
ASSIST Global Solutions, S.A.

[…]

4.1 El usuario acepta la recogida de datos de interacción,
    incluyendo tiempo de respuesta, frecuencia de apertura y
    patrones de elección.

4.2 El usuario acepta la medición de su preferencia afectiva,
    declarada e inferida.

[…]

6.1 El usuario reconoce que su participación constituye una
    aportación de datos a un programa de investigación en
    curso, y renuncia a reclamar la titularidad de los
    vínculos generados durante el uso.

[…]

Identificador de sesión asignado: C-1`
  },
  {
    id: 'f_backup',
    name: 'copia_seguridad_perfil.dat',
    kind: 'doc', size: '1.2 MB', date: 'D4',
    requires: { day: 4 },
    body: `[archivo binario]

PERFIL: {name}
ALTA: día 1
SESIONES: activas
ESTADO: adherencia alta

—— fin del volcado ——`
  },

  /* ---------------- primeras rarezas ---------------- */
  {
    id: 'f_log',
    name: 'registro_app.log',
    kind: 'doc', size: '890 KB', date: 'D10',
    requires: { glitch: 1 },
    body: `03:01  notif.enviada  origen=ryu  destino=C-1
03:01  msg.buscar     resultado=0
03:03  notif.enviada  origen=ryu  destino=C-1
03:03  msg.buscar     resultado=0
03:03  ADVERTENCIA    notificación sin mensaje asociado (x2)

04:00  mantenimiento.inicio
04:00  coherencia.revisar  incidencias=4  corregidas=4
04:00  imagen.duplicada    eliminada=1
04:00  adherencia.medir    C-1=94%
04:00  ADVERTENCIA    fuga de cadena de depuración a interfaz
04:01  mantenimiento.fin`
  },
  {
    id: 'f_photos_meta',
    name: 'indice_imagenes.csv',
    kind: 'doc', size: '12 KB', date: 'D12',
    requires: { glitch: 1 },
    body: `archivo,origen,hash,duplicado
lara_momo.img,SIM/EXT-03,8f2a…,no
lara_momo2.img,SIM/EXT-03,8f2a…,SÍ
ryu_fw.img,SIM/EXT-04,11c9…,no
ryu_window.img,SIM/EXT-04,4d70…,no
ryu_window.img,SIM/EXT-04,4d70…,SÍ

ADVERTENCIA: 2 imágenes con hash idéntico y pie distinto.`
  },

  /* ---------------- ASSIST ---------------- */
  {
    id: 'f_med',
    name: 'SANWA_ala_C_facturacion.pdf',
    kind: 'med', size: '3.4 MB', date: '——',
    requires: { anyFlags: ['ryu_saw_date', 'ryu_awake', 'knows_c1'] },
    paper: true,
    body: `CENTRO MÉDICO SANWA
Ala C · Departamento de facturación

PACIENTE:  MEI ——
INGRESO:   14/11/2023
ALTA:      —— (tratamiento continuado)

CONCEPTO                          IMPORTE
Ingreso y estabilización        1.240.000
Tratamiento continuado          8.900.000
Seguimiento 12 meses            2.100.000
                              -----------
TOTAL                          12.240.000

ESTADO: LIQUIDADO
PAGADOR: ASSIST GLOBAL SOLUTIONS, S.A.
REF. INTERNA: C-04 / CONTRAPRESTACIÓN FAMILIAR`,
    stamp: 'LIQUIDADO'
  },
  {
    id: 'f_consent',
    name: 'ingreso_voluntario_C02.pdf',
    kind: 'med', size: '2.9 MB', date: '——',
    requires: { anyFlags: ['kenta_saw_date', 'kenta_awake', 'knows_c1'] },
    paper: true,
    body: `ASSIST LABS
Formulario de ingreso voluntario

SUJETO:   K —— (C-02)
EDAD:     18 años
FECHA:    03/02/2024

DECLARACIÓN
El firmante declara participar de forma libre y voluntaria
en el programa de colaboración de larga duración.

CLÁUSULA 14.2
Cesión de registro neurocognitivo por el periodo de
duración del programa y sus prórrogas.

FIRMA DEL SUJETO: [firma manuscrita]
FECHA DE NACIMIENTO: 02/02/2006

NOTA INTERNA: esperar a mayoría de edad. Confirmado 02/02.
Firma válida a partir del 03/02.`,
    stamp: 'VÁLIDO'
  },
  {
    id: 'f_tutela',
    name: 'cesion_tutela_C03.pdf',
    kind: 'med', size: '4.1 MB', date: '——',
    requires: { anyFlags: ['lara_named_it', 'lara_awake', 'knows_c1'] },
    paper: true,
    body: `ASSIST GLOBAL SOLUTIONS · ASESORÍA JURÍDICA
Cesión de tutela temporal

SUJETO:   L —— (C-03)
EDAD:     21 años
FECHA:    21/06/2024

OTORGANTES: progenitores del sujeto
CONTRAPRESTACIÓN: 41.000.000

OBSERVACIÓN DEL LETRADO
El sujeto es mayor de edad. La cesión de tutela carece de
efecto legal. Se recomienda mantener el documento por su
valor disuasorio frente a reclamaciones familiares.

RECLAMACIONES POSTERIORES: ninguna.`,
    stamp: 'SIN EFECTO'
  },
  {
    id: 'f_contract',
    name: 'contrato_imagen_C05.pdf',
    kind: 'med', size: '5.5 MB', date: '——',
    requires: { anyFlags: ['reiko_clause', 'reiko_awake', 'knows_c1'] },
    paper: true,
    body: `ASSIST PUBLIC
Contrato de gestión reputacional

CLIENTE:  R —— A. (C-05)
FECHA:    09/09/2024

OBJETO
Restitución de la imagen pública de la clienta tras el
procedimiento concursal de Ainsel Systems.

CLÁUSULA 14.2 — CESIÓN DE REGISTRO NEUROCOGNITIVO
La clienta cede el registro de su actividad neurocognitiva
durante el periodo de tratamiento, así como la facultad de
edición de los episodios de memoria asociados al suceso
objeto de restitución.

[anotación manuscrita en el margen, letra de la clienta]
"Corona. No es una marca. Es el nombre del proyecto."`,
    stamp: 'FIRMADO'
  },

  /* ---------------- cerrados ---------------- */
  {
    id: 'f_protocol',
    name: 'LAZO_DORADO_v4.enc',
    kind: 'lock', size: '18.7 MB', date: '——',
    requires: { glitch: 2 },
    password: 'CORONA',
    hint: 'Seis letras. Reiko lo oyó en una reunión y lo apuntó en el margen de su contrato.',
    body: `PROYECTO CORONA — PROTOCOLO LAZO DORADO
Documento interno · Nivel 3

1. PLANTEAMIENTO
El vínculo humano es una función de la frecuencia, la
latencia de respuesta y la exclusividad percibida.

2. DISEÑO
Cuatro sujetos por ciclo. Sedación continua. Entorno
simulado persistente con corrección narrativa automática.
Memoria episódica editable. Latencia media de corrección:
40 segundos.

3. LA VARIABLE EXTERNA
Se introduce un interlocutor real y no sedado, ajeno a la
instalación, identificado como C-1.

C-1 desconoce la naturaleza del entorno. Cree estar
utilizando un producto de entretenimiento. Esta creencia
es NECESARIA: un vínculo consciente de ser observado deja
de ser medible.

4. RESULTADO QUE SE BUSCA
Determinar si alguien puede querer a otra persona lo
bastante como para acordarse de ella cuando le hemos
ordenado que la olvide.

5. CICLOS ANTERIORES
Ciclos 1-3: contaminación afectiva en los tres casos.
Sujetos reasignados. Variables externas desconectadas.
Ciclo 4 en curso.`
  },
  /* ---------------- grabaciones ----------------
     El guion concede las cámaras con nodos `cam:`. Antes vivían en una
     aplicación aparte; ahora entran aquí, que es donde de verdad
     estarían: cuatro archivos de vídeo que no deberías tener. */
  {
    id: 'f_cam_hall',
    name: 'SECTOR_C_pasillo.mp4',
    kind: 'med', size: '44 MB', date: '——',
    requires: { cams: ['hall'] },
    camera: 'hall',
    body: 'SECTOR C · PASILLO\nGrabación continua. Sin audio.\n\nUn pasillo largo. Al fondo, una puerta con teclado.\nNo pasa nadie durante horas.'
  },
  {
    id: 'f_cam_chairs',
    name: 'SECTOR_C_sala2.mp4',
    kind: 'med', size: '128 MB', date: '——',
    requires: { cams: ['chairs'] },
    camera: 'chairs',
    body: 'SECTOR C · SALA 2\nGrabación continua. Sin audio.\n\nCuatro sillones. Cuatro personas.\nNinguna se mueve.\n\nOCUPACIÓN: 4/4'
  },
  {
    id: 'f_cam_monitors',
    name: 'SECTOR_C_control.mp4',
    kind: 'med', size: '61 MB', date: '——',
    requires: { cams: ['monitors'] },
    camera: 'monitors',
    body: 'SECTOR C · CONTROL\nGrabación continua. Sin audio.\n\nTres monitores encendidos.\nEn uno de ellos se lee, muy pequeño: ADHERENCIA C-1.'
  },
  {
    id: 'f_cam_guard',
    name: 'SECTOR_C_acceso.mp4',
    kind: 'med', size: '39 MB', date: '——',
    requires: { cams: ['guard'] },
    camera: 'guard',
    body: 'SECTOR C · ACCESO\nGrabación continua. Sin audio.\n\nUna persona sentada junto a la puerta.\nEl reloj de la esquina marca 03:12.\nLleva marcando 03:12 desde que abriste el archivo.'
  },

  {
    id: 'f_sector',
    name: 'sector_C_ocupacion.enc',
    kind: 'lock', size: '2.2 MB', date: '——',
    requires: { glitch: 3 },
    password: '141123',
    hint: 'Seis dígitos, DDMMAA. La fecha de ingreso que aparece en la factura del hospital.',
    body: `SECTOR C — OCUPACIÓN · CICLO 4

SILLÓN 1 · C-05 · 25 a. · ingreso 09/09/2024 · INESTABLE
SILLÓN 2 · C-02 · 18 a. · ingreso 03/02/2024 · estable
SILLÓN 3 · C-03 · 21 a. · ingreso 21/06/2024 · estable
SILLÓN 4 · C-04 · 20 a. · ingreso 14/11/2023 · estable

EXTERNO · C-1 · sin sillón asignado
  adherencia: alta
  aperturas diarias: 9,4 (media)
  preferencia afectiva: estable

NOTA DEL CICLO
No interrumpir. La variable externa está funcionando
exactamente como se esperaba.

Y algo más que no se esperaba.`
  }
];
