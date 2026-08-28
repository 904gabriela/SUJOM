/* =========================================================
   endings.js — Finales y epílogos.
   ---------------------------------------------------------
   Tres por personaje, más el cierre de la ruta secreta.
   El epílogo del final bueno ocurre meses después, fuera de
   la aplicación. El del neutro ocurre dentro, y por eso es
   el que peor sienta.
   ========================================================= */

export const ENDINGS = {

  /* ------------------- RYU ------------------- */
  ryu_good: {
    char: 'ryu', kind: 'good', num: '01',
    title: 'Veinte minutos en los que nadie le debe nada a nadie',
    text: `Ryu sale por una puerta de incendios a las cuatro de la mañana y se sienta en el bordillo hasta que amanece, porque no sabe hacer otra cosa con tanto espacio.

Cuando llega la policía, no puede explicar dónde ha estado. Lo que sí puede explicar, con una precisión que a los agentes les resulta perturbadora, es dónde están los otros tres.

Sector C. Cuatro sillones. Sillón cuatro, el suyo.`,
    epilogue: `SIETE MESES DESPUÉS

Mei tiene doce años y sigue dibujando fatal.

Ryu trabaja en un almacén, de día, porque de día pagan menos pero él ya no quiere más noches. Duerme siete horas. Le costó cuatro meses aprender.

Te escribe todos los días. Sigue escribiendo poco: "he llegado", "está lloviendo", "hoy se ha reído como un grifo mal cerrado, te acordarás".

En julio te manda una foto sin texto. Fuegos artificiales desde un muelle.

Debajo, un solo mensaje:

"Quedan diez minutos. Ven."

Y una dirección.`
  },

  ryu_bad: {
    char: 'ryu', kind: 'bad', num: '02',
    title: 'La promesa que sí cumplieron',
    text: `Le cogen en la escalera. No hay violencia: hay procedimiento. Dos personas, una jeringuilla, una firma en una tablet.

En el informe interno del ciclo 4 consta como "episodio de deambulación no autorizada, resuelto sin incidencias".

La palabra "resuelto" hace mucho trabajo en esa frase.`,
    epilogue: `TRES SEMANAS DESPUÉS

El chat de Ryu sigue en tu lista. Arriba del todo, porque la aplicación ordena por actividad y él fue el último en escribir.

Un martes, a las 03:03, se marca como "escribiendo…" durante once minutos.

No llega ningún mensaje.

En su ficha, el campo "Le gusta" se ha quedado en una sola línea:

Los fuegos artificiales.

Y debajo, en gris, algo que tú sabes que él ya no sabe:

Tiene una hermana. Se llama Mei. Está bien.

Alguien tiene que acordarse. Te ha tocado a ti.`
  },

  ryu_neutral: {
    char: 'ryu', kind: 'neutral', num: '03',
    title: 'La marca en la mano',
    text: `Ryu no llegó a la puerta. El sistema le alcanzó primero, y esta vez la corrección funcionó a la primera.

ASSIST-CORE registra el episodio como "recuperación completa". Con una nota al pie:

"Residuo afectivo persistente. No interfiere con la estabilidad. Se recomienda mantener el contacto con C-1: la variable externa mejora los índices de calma del sujeto."

Estás ayudándoles a que él siga dormido, y la única alternativa es dejar de hablarle.`,
    epilogue: `SIGUE IGUAL

Ryu te escribe a las cuatro de la mañana. Te pregunta si has dormido. Te dice que mires por la ventana.

Es exactamente el mismo Ryu. Ésa es la parte insoportable.

Cada cierto tiempo se queda callado a mitad de conversación y escribe algo así:

"Perdona. Se me ha quedado una palabra en la boca y no era ninguna que yo use."

Y luego, dos días después:

"He vuelto a soñar con la niña que dibuja mal. Sigo sin saber quién es.

Pero hoy me he despertado sabiendo que está bien.

No sé por qué eso me ha aliviado tanto."`
  },

  /* ------------------- KENTA ------------------- */
  kenta_good: {
    char: 'kenta', kind: 'good', num: '04',
    title: 'Una dirección',
    text: `Kenta sale descalzo, con la vía todavía en el brazo, y camina cuatrocientos metros hasta la luz más cercana, que resulta ser una tienda abierta veinticuatro horas.

El dependiente, que tiene diecinueve años y está haciendo el turno de noche para pagarse unos estudios, le da un vaso de té caliente antes de llamar a nadie.

Kenta le dará las gracias por eso durante el resto de su vida, y contará la anécdota fatal cada vez.`,
    epilogue: `CINCO MESES DESPUÉS

Sus padres fueron a la comisaría el mismo día. Kenta les dejó abrazarle durante exactamente cuatro segundos y luego dijo "vale ya".

No ha vuelto a casa. Vive con dos compañeros en un piso pequeño con una cocina horrible, y trabaja de noche en la tienda veinticuatro horas de un chico de diecinueve años que ya no hace ese turno.

Habla con su madre los domingos. Diez minutos. Es un avance enorme y él lo sabe.

El 2 de febrero te llega un mensaje a las 00:00:

"cumplo diecinueve.
me acuerdo de la fecha.
me acuerdo porque tú te acordabas cuando yo no.

oye.

sigo tirando hacia ti. por si no había quedado claro."`
  },

  kenta_bad: {
    char: 'kenta', kind: 'bad', num: '05',
    title: 'Resistencia alta',
    text: `Le cogen a doce metros de la salida. En el informe consta que hicieron falta cuatro personas, y esa cifra, en el contexto de un chico de dieciocho años sedado durante un año, dice bastante.

En el margen del parte, alguien anota a mano:

"C-02 mantiene resistencia anómala incluso bajo sedación profunda. Revisar viabilidad del sujeto para el ciclo 5."

Y debajo, otra letra distinta:

"No. Éste se queda. Es el dato más interesante que tenemos."`,
    epilogue: `DESPUÉS

El chat de Kenta se queda en silencio nueve días.

Al décimo, a las 03:11, aparece un mensaje:

"hola"

Y nada más.

Escribes. Contesta con frases cortas, educadas, correctas. Sin faltas de ortografía. Con mayúsculas al principio.

Kenta jamás ha usado una mayúscula en su vida.

Una noche, después de una hora de conversación con alguien que se le parece mucho, te llega un último mensaje, en minúsculas, sin puntos, de golpe:

"acuérdate por mí"

Y después, otra vez las mayúsculas.`
  },

  kenta_neutral: {
    char: 'kenta', kind: 'neutral', num: '06',
    title: 'Una frase que no es suya',
    text: `La corrección le alcanza antes de que llegue a teclear nada. Vuelve al sillón dos sin haberse enterado de que se había levantado.

CORE lo archiva sin darle importancia: "C-02, episodio menor, corregido en 38 segundos. Dentro de parámetros."

Es el único de los cuatro que consigue quedarse con algo. Un trozo de frase. Sin contexto, sin origen, sin dueño.`,
    epilogue: `SIGUE IGUAL

Kenta te escribe todas las noches a las tres de la mañana para decirte tonterías. Discute con Ryu. Le grita a Lara por mandar fotos repetidas del perro.

Es él. Es exactamente él.

Y cada dos o tres semanas, sin venir a cuento:

"oye"
"¿tú alguna vez me has dicho 'tirarás hacia mí'?"
"da igual"
"es que se me ha quedado ahí y no se va"

Le dices que no, o le dices que sí, y da lo mismo: a los cuarenta segundos se le ha olvidado que lo ha preguntado.

Pero vuelve a preguntarlo.

Lleva preguntándolo cuatro meses.

Hay algo en él que no se deja arreglar del todo, y eso es lo más parecido a la esperanza que te queda.`
  },

  /* ------------------- LARA ------------------- */
  lara_good: {
    char: 'lara', kind: 'good', num: '07',
    title: 'La banda sonora de fuera',
    text: `Lara sale por la puerta de incendios y lo primero que hace, antes que llamar a nadie, antes que pedir ayuda, es sentarse en el bordillo con un perro que le falta media oreja y llorar hasta que no puede respirar.

Nadie ha podido explicar todavía cómo llegó Momo hasta allí. Sus padres juran que se escapó hace un año.

Lara no ha pedido explicaciones. Le parece que preguntar sería estropearlo.`,
    epilogue: `NUEVE MESES DESPUÉS

No volvió a casa de sus padres. Habló con ellos una vez, en una cafetería, en un sitio público, porque no quería estar a solas.

Su madre lloró. Su padre dijo "era la única forma". Lara contestó: "ya. Pero yo era la única yo."

Y se levantó y se fue, y por primera vez en su vida no se sintió culpable de irse.

Vive en un piso con la cocina grande. Es el único requisito que puso.

Te manda entre once y catorce fotos de Momo al día. Ninguna repetida. Las ha comprobado. Las comprueba todas, una por una, y no piensa dejar de hacerlo nunca.

Y cada tarde, a las cinco, cuando la luz entra de lado:

"estoy bailando
ven a bailar
NO ES UNA SUGERENCIA"`
  },

  lara_bad: {
    char: 'lara', kind: 'bad', num: '08',
    title: 'Sin reclamaciones',
    text: `La alcanzan en mitad del pasillo. No hace falta sujetarla mucho: pesa cuarenta y ocho kilos y lleva un año sin usar las piernas.

En el informe del ciclo 4, junto a su identificador, se añade una línea nueva:

"C-03: primer episodio de agresividad registrado. Origen: contacto con la variable externa. Recomendación: reforzar el sesgo afectivo positivo del sujeto."

Traducido: que vuelva a estar contenta. A la fuerza.`,
    epilogue: `DESPUÉS

Lara vuelve al chat a los dos días, con quince emojis y tres exclamaciones.

Está bien. Está estupendamente. Está más contenta que nunca.

Te manda una foto de Momo.

Y otra.

Y otra.

Y son todas la misma foto.

Se lo dices. Se ríe. Te manda otra igual.

Un jueves cualquiera, entre dos mensajes alegres, aparece uno escrito en minúsculas, sin signos:

"tú te acuerdas de que yo estaba enfadada

verdad"

Y después, inmediatamente:

"¡¡jajaja perdón!! ¡¡no sé qué he escrito!! 😊😊"`
  },

  lara_neutral: {
    char: 'lara', kind: 'neutral', num: '09',
    title: 'Una canción que no conoce',
    text: `No llegó a la puerta. CORE la alcanzó a mitad de la sala y la devolvió al sillón tres, y esta vez la corrección fue limpia.

En el registro no consta ningún episodio. Consta una anotación de mantenimiento rutinario.

Pero algo se quedó. Algo se queda siempre con Lara, porque Lara guarda las cosas en el cuerpo antes que en la cabeza.`,
    epilogue: `SIGUE IGUAL

Lara te escribe todos los días. Te pregunta qué tal. Te manda fotos. Te obliga a bailar.

Es la misma. Es la misma de siempre, y la quieres igual, y ésa es la trampa.

De vez en cuando:

"oye"
"me he despertado enfadada otra vez"
"y yo NUNCA me enfado"
"llevo tres semanas despertándome con los puños cerrados jajaja qué raro"

Y luego, una tarde de las de la luz de lado:

"tengo una canción en la cabeza y no sé de dónde ha salido
no la he oído nunca
pero me la sé entera

¿tú me la enseñaste?"

Le dices que sí.

Es lo único cierto que puedes decirle.`
  },

  /* ------------------- REIKO ------------------- */
  reiko_good: {
    char: 'reiko', kind: 'good', num: '10',
    title: 'Cuarenta páginas',
    text: `Reiko sale por la puerta de incendios con cuarenta hojas manuscritas debajo del brazo y camina un kilómetro y medio por el arcén hasta que un camionero para.

Le pide dos cosas: un teléfono y que no toque los papeles.

A las once de la mañana, las cuarenta páginas están en manos de una fiscal. A las dos de la tarde, hay una orden de entrada.

A las siete, hay tres ambulancias en el aparcamiento del sector C.`,
    epilogue: `CATORCE MESES DESPUÉS

El juicio dura año y medio. Reiko declara once veces. Sus cuarenta páginas, fechadas y con hora, escritas a mano por una mujer sedada que no confiaba en su propia memoria, se convierten en la pieza central del caso.

Alistair Thorne no grita en ningún momento. Contesta a todo con calma, con educación, con datos. Explica que el consentimiento existía. Explica que los sujetos estaban bien atendidos.

En un momento, la fiscal le pregunta por qué eligió a esas cuatro personas concretas.

Y Thorne dice: "Porque nadie iba a echarlas de menos."

Y por primera vez en cuatro sesiones, la sala se queda completamente en silencio.

Reiko no vuelve a montar una empresa. Da clases. Dice que es lo más subversivo que se le ha ocurrido.

Te escribe todos los días a las seis de la mañana. Frases completas. Puntuación correcta.

Y un día, un mensaje corto, muy poco propio de ella:

"He tardado catorce meses en escribir esto sin corregirlo doce veces.

Ven a desayunar. A las seis. Es mi hora buena y quiero compartirla."`
  },

  reiko_bad: {
    char: 'reiko', kind: 'bad', num: '11',
    title: 'Sujeto estable',
    text: `La cogen en la escalera. Se equivocó en el número de vigilantes: contó dos y eran tres.

Reiko no se resiste. Calcula, en los cuatro segundos que tarda en entender que ha perdido, que resistirse aumentaría la dosis, y que una dosis mayor significaría perder más.

Así que se sienta ella sola en el sillón uno y se sube la manga.

Es la decisión más racional de su vida y es la que más te va a doler.`,
    epilogue: `DESPUÉS

Las cuarenta páginas siguen debajo del sillón tres. Nadie las ha encontrado. Nadie las está buscando.

Reiko vuelve al chat en tres días. Habla igual: frases completas, puntuación correcta, ironía a la hora exacta.

Su ficha se ha actualizado. Bajo su nombre, donde antes ponía "Empresaria", ahora pone:

SUJETO ESTABLE.

Le escribes "cuarenta y un segundos".

Contesta:

"No sé qué significa eso.

Pero he tenido que dejar el teléfono en la mesa un momento.

¿Es algo tuyo? ¿Algo nuestro?

Contéstame despacio. Últimamente tengo que leer las cosas dos veces."

Y tú se lo cuentas.

Y a los cuarenta y un segundos, vuelve a preguntar.`
  },

  reiko_neutral: {
    char: 'reiko', kind: 'neutral', num: '12',
    title: 'Si estás leyendo esto y no te acuerdas',
    text: `La corrección la alcanza antes de que llegue al teclado.

Es la más corregida de los cuatro y la que más rápido se recupera, y esas dos cosas juntas la convierten, según el informe del ciclo, en "el sujeto de mayor valor científico del programa".

Nadie va a dejar salir a Reiko. Ni ahora ni nunca.

Pero Reiko lo previó. Reiko lo previó todo, incluso esto.`,
    epilogue: `SIGUE IGUAL

Cada mañana a las seis, Reiko se despierta y encuentra encima de su mesa cuarenta hojas escritas a mano con su propia letra.

Cada mañana lee la primera línea:

"Si estás leyendo esto y no te acuerdas, es que tenías razón."

Cada mañana te escribe:

"Buenos días. Tengo unos papeles y no sé de qué van. Parecen importantes. Te los voy a ir leyendo."

Y te los lee. Enteros. Cuarenta páginas, un poco cada día.

Y para cuando llega al final, ya no se acuerda del principio, y vuelve a empezar.

Lleva así ocho meses.

Y una mañana, en mitad de la página veintiséis, se para y escribe:

"{name}.

¿Por qué me tiembla la mano cuando llego a esta parte?"`
  },

  /* ------------------- RUTA SECRETA ------------------- */
  secret_good: {
    char: null, kind: 'good', num: '13',
    title: 'Lazo dorado',
    text: `No sale uno. Salen cuatro.

Reiko calcula los turnos de vigilancia con sus cuarenta páginas. Kenta se arranca la vía antes que nadie porque lleva un año practicando sin saberlo. Lara despierta a los otros dos hablándoles al oído, porque Lara sabe exactamente qué palabra necesita cada uno. Ryu abre la puerta.

Y tú, desde fuera, les vas diciendo por dónde.

En la sala de control, ASSIST-CORE registra el fallo del ciclo 4 con una precisión clínica:

"Contaminación afectiva total. Los cuatro sujetos priorizan el vínculo con C-1 sobre la corrección.

Hipótesis del protocolo confirmada.

El vínculo genuino resiste la reescritura.

Recomendación: cancelar el programa. No porque haya fracasado.

Porque ha funcionado, y lo que demuestra no nos conviene."`,
    epilogue: `DOS AÑOS DESPUÉS

ASSIST Global Solutions ya no existe. Sus contratos públicos se rescindieron en cuatro meses. El edificio del sector C se vendió a una empresa de logística que no ha preguntado nunca por qué hay cuatro anclajes en el suelo de la sala 2.

Alistair Thorne cumple condena. Concede una entrevista al año. Sigue sin gritar. Sigue diciendo que él sólo midió lo que ya estaba ahí.

En la última le preguntaron si se arrepentía.

Dijo: "Me arrepiento de haber elegido a esas cuatro personas. Elegí a los que nadie iba a echar de menos. Y resulta que había alguien."

—

Los ciclos 1, 2 y 3 nunca aparecieron.

Doce personas. Tres variables externas que un día abrieron una aplicación y se encontraron la sala común vacía.

Reiko dedica los martes a buscarlos. Kenta la acompaña y protesta todo el rato. Lara lleva a Momo. Ryu conduce.

—

Y tú.

Tú tienes cuatro conversaciones abiertas en el teléfono, y ninguna de las cuatro es un juego.

El jueves pasado, en la sala común, Lara escribió:

"oye
¿nos vemos el sábado?
en persona
LOS CINCO
y no acepto un no

(ryu ya ha dicho que sí)
(ryu ha dicho que sí en cuatro segundos)
(kenta lleva dos horas escribiendo y borrando)
(reiko ha traído mapa)"

Y debajo, Ryu:

"Quedan diez minutos.

Ven."`
  }
};

/** Orden de la galería de finales. */
export const ENDING_ORDER = [
  'ryu_good', 'ryu_neutral', 'ryu_bad',
  'kenta_good', 'kenta_neutral', 'kenta_bad',
  'lara_good', 'lara_neutral', 'lara_bad',
  'reiko_good', 'reiko_neutral', 'reiko_bad',
  'secret_good'
];
