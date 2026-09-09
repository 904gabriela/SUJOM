# Encargo: los chibis

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

Y lo que **no** funcionó, para que nadie lo reintente:

- **Cuerpo entero: dos intentos, dos fracasos.** Salían adultos en
  miniatura; al pedir cuerpo redondo salieron achaparrados y perdieron
  la cara. El sticket de busto salió bien a la primera.
- **La palabra "chibi" sola no basta**, y describir "cabeza grande,
  rasgos pequeños, ojos grandes" da un bebé: son las proporciones de una
  cara infantil.

## Por qué no hace falta el cuerpo entero

El avatar sale en círculos de 34, 50 y 60 px, y en el vestidor. **Los
pantalones y los zapatos no se ven en ninguna pantalla del juego.** En un
busto se ve todo lo que de verdad se cambia: pelo, piel, camiseta,
sudadera, cuello alto, chaqueta, pendientes, gafas.

## El pedido: 51 piezas

### Reparto — 24 stickers, una pieza cada uno

Los personajes no cambian de ropa, así que van enteros: cara, manos y
marca de emoción en el mismo dibujo.

Seis estados por personaje, que son **los que el motor ya maneja** y las
mismas seis expresiones que ya pintaste:

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

    24 stickers + 27 piezas del jugador = 51 ≈ 1.020 créditos

De 10.047 disponibles.

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
