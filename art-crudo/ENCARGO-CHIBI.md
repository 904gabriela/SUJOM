# Encargo: los chibis

> **El encargo son 24 stickers. Nada más.**
>
> El chibi es sólo para los stickers del reparto. Las 27 piezas del
> jugador —doce cabezas y quince de ropa, en dos capas— quedan fuera, y
> con ellas el vestidor y la ropa comprable con gemas.
>
> Lo que se probó para esas piezas está más abajo y funciona: la
> composición de cabeza sobre ropa quedó demostrada. Se conserva por si
> vuelve, no porque esté pedido.

> Esta hoja se reescribió entera después de probarla. La primera versión
> pedía cabeza y hombros pintados al estilo del reparto, y estaba mal en
> casi todo. Lo que hay aquí es lo que funcionó, con las pruebas.

## La idea

Cada personaje tiene **dos registros**:

- **Su diseño original**, pintado, para cuando está de verdad presente:
  el perfil, la galería, las videollamadas. Ya existe.
- **Su versión chibi**, para el chat: el avatar del círculo y los
  stickers que manda.

El jugador vive en el mismo mundo: su avatar es un chibi como el de
ellos. Nadie se sale del estilo porque el estilo es doble para todos.

## Lo que ya está probado

| | Resultado |
|---|---|
| El chibi conserva la identidad | ✅ Ryu se reconoce al instante |
| Croma fuera y línea blanca intacta | ✅ alfa 0 fuera, 28% opaco |
| Recorte de cabeza automático | ✅ busca el cuello, no se le dice dónde |
| Se lee a 34 px | ✅ mejor que el pintado, formas más limpias |
| Recolorear pelo y piel | ✅ 18 combinaciones de un dibujo |
| **Cabeza suelta sobre ropa suelta** | ✅ probado con dos dibujos independientes |

Y lo que **no** funcionó, para que nadie lo reintente:

- **Cuerpo entero: dos intentos, dos fracasos.** Salían adultos en
  miniatura; al pedir cuerpo redondo salieron achaparrados y perdieron
  la cara. El sticket de busto salió bien a la primera.
- **La palabra "chibi" sola no basta**, y describir "cabeza grande,
  rasgos pequeños, ojos grandes" da un bebé: son las proporciones de una
  cara infantil.

## Cómo se juntan las dos capas del jugador

Esto era el riesgo del encargo: que una cabeza pedida en un dibujo y una
prenda pedida en otro no encajasen. Ya está probado con las dos piezas
sueltas, sin retocarlas a mano. Tres medidas y ya:

- **El eje.** Las dos piezas salen centradas solas. Medido: la cabeza a
  x=1024 y el jersey a x=1023, de 2048. Un píxel. No hay que alinear
  nada a ojo, basta con centrar por el eje del hueco del cuello.
- **La barbilla.** No se busca el cuello: en una pieza que es solo
  cabeza no existe el estrechamiento, así que el buscador de cuello se
  mete dentro del pelo. Se busca **la piel**: la fila más baja con más
  de 40 px de piel es la barbilla. Salió y=1474 de 1821, o sea que por
  debajo hay 347 px de pelo que caen sobre el jersey y tapan la unión.
- **El hueco del cuello.** Se detecta solo: dentro de la prenda, los
  píxeles con luminancia > 225. Salió una elipse de 416 × 147.

La barbilla se apoya a media altura del hueco y el pelo hace el resto.
No se ve la costura en ninguna de las nueve pruebas.

**El tamaño** sale del reparto, no de mi criterio: en los stickers ya
aprobados la cabeza pico está al 18–27% de la altura y el cuerpo al
63–73%, con la cabeza entre el 0,8 y el 1,1 del ancho del cuerpo. Se
probaron el 85, el 95 y el 105%.

    ELEGIDO: 105% del ancho de hombros.

Es un número del código, no del encargo: mueve las 27 piezas del jugador
a la vez y se puede cambiar sin volver a pedir nada.

> **Aviso que afecta a la tienda.** Con el pelo medio o largo, la melena
> tapa el cuello entero y **el escote no se ve**. Un cuello alto y una
> camiseta de cuello redondo se ven iguales de peinado largo. Lo que sí
> distingue a un conjunto de otro es el color, la manga y el cuerpo. Si
> se quiere que el cuello alto se note, que sea de un color que no lleve
> ningún otro conjunto.

## Por qué no hace falta el cuerpo entero

El avatar sale en círculos de 34, 50 y 60 px, y en el vestidor. **Los
pantalones y los zapatos no se ven en ninguna pantalla del juego.** En un
busto se ve todo lo que de verdad se cambia: pelo, piel, camiseta,
sudadera, cuello alto, chaqueta, pendientes, gafas.

## El pedido: 51 piezas

### Reparto — 24 stickers, una pieza cada uno

Los personajes no cambian de ropa, así que van enteros: cara, manos y
marca de emoción en el mismo dibujo.

> **Cada personaje tiene su propio registro. No comparten set.**
>
> El primer intento pidió las mismas seis emociones genéricas para
> todos y salió un chico expresivo cualquiera, no Ryu. Ocho piezas bien
> hechas y sólo una servía.
>
> El reparto se reparte así: **Kenta es volumen** (grita, señala, tira
> algo), **Lara es exceso** (selfie, corazones, brillos, Sándwich metido
> en el plano), y los otros dos son callados por motivos contrarios —
> **Ryu no expresa, Reiko elige qué enseñar**. Eso último importa: si
> los dos callados fueran callados igual, se parecerían.

#### Ryu: la cara no se mueve

En un personaje estoico la gracia es que la cara **no cambia** y la
marca hace todo el trabajo. Una vena de enfado sobre una cara plana es
más graciosa que una cara enfadada. El prompt tiene que prohibirlo
explícitamente —nada de sonrisa grande, boca abierta, ojos redondos ni
lágrimas— porque si no el modelo lo dibuja expresivo por defecto.

    ...        cara plana, un bocadillo con tres puntos. El más usado.
    contento   la boca sube un milímetro. Un corazón al lado, ajeno.
    timido     igual de plano, girado, y el rubor enorme.
    enfadado   cara plana, la vena roja. YA HECHO y ya estaba en su tono.
    triste     no llora: se sube el cuello de la chaqueta. Una gota.
    sorpresa   el único donde la cara SÍ se mueve.

Cinco que no se mueven y uno que sí. El sexto funciona porque es el
único que rompe la regla, así que si algún día se ablandan los otros
cinco, ése deja de tener gracia.

Para el resto del reparto, las seis de siempre:

    <pj>-neutral    sin marca
    <pj>-contento   corazón o nota
    <pj>-timido     gota de sudor, rubor fuerte
    <pj>-enfadado   la cruz roja de enfado
    <pj>-triste     lágrima
    <pj>-sorpresa   interrogación o rayas de sorpresa

Para `ryu`, `kenta`, `lara`, `reiko`. **El avatar del chat de cada uno
sale de recortarle la cabeza al neutral**, no se encarga aparte.

La marca de emoción no es adorno: a 120 px en un chat, **lo que se lee es
la marca**, no la cara. Por eso la llevan todos los sets de referencia.

### Jugador — 27 piezas, en dos capas

Aquí sí hay que cambiar de ropa, así que va partido:

**Cabezas (12)** — `chibi-cabeza-<lectura>-<peinado>.png`

Lecturas: `fem`, `masc`, `neutro`. Peinados: `corto`, `medio`, `largo`,
`recogido`.

Cortadas **recto por debajo de la barbilla**, sin cuello ni hombros.

**Hombros y ropa (15)** — `chibi-ropa-<lectura>-<conjunto>.png`

Conjuntos: `basico` (gratis), `sudadera`, `cuello-alto`, `chaqueta`,
`camisa`. Los cuatro últimos se compran con gemas.

Sin cabeza, sin cara, sin pelo: solo la ropa del cuello para abajo.

> "Lectura" no es identidad. En el código `look` y `pronouns` son campos
> distintos y no se hablan: el jugador elige el cuerpo que quiera con los
> pronombres que quiera.

### La cuenta

    24 stickers ≈ 480 créditos

Las 27 piezas del jugador ya no van. Hechos: los seis stickers de Ryu
están a medias y hay dos cabezas por lectura que ya no hacen falta.

## Reglas que valen para las 51

- Cuadrado (stickers) o 3:4 (piezas del jugador), 2K.
- Centrado, con aire, nada tocando los bordes.
- Croma **verde plano `#00B140`**. Si una pieza sale verde, esa se pide
  sobre **azul `#0047FF`**: el recorte mide cuánto tira a verde cada
  píxel y se comería una pieza verde sobre verde.
- **Ojos en negro neutro**, sin azul ni violeta. Si llevan azul, giran
  cuando recoloreo el pelo y salen verde oliva. Probado.
- Sin texto, sin sombra proyectada, sin degradado de fondo.
- **Stickers**: la línea blanca de recorte sí, queda bien y sobrevive al
  croma. **Piezas del jugador**: sin línea blanca, que se van a componer
  una encima de otra.

## El color lo pone el código

En las piezas del jugador, la piel y el pelo **no se encargan**: se
generan. Por eso el pelo se pide en **azul violáceo medio (#6E6FA8)**, lo
más lejos posible de la piel en la rueda del color: separar pelo de cara
pasa a ser trivial. Medido sobre la pieza de prueba, el pelo ocupa el 42%
y la piel el 28%, sin solaparse.

Se ve raro suelto. Nunca se verá así.
