# Encargo: el avatar del jugador

## Para qué es

Es tu foto de perfil dentro de ASSIST. Sale en cuatro sitios y en todos
es un círculo pequeño:

| Dónde | Tamaño |
|---|---|
| Al lado de tus mensajes en el chat | 34 px |
| En la lista de conversaciones | 50 px |
| En la fila de contactos del inicio | 60 px |
| En Ajustes, al editarlo | grande |

Eso manda sobre todo lo demás. **A 34 px no se ve un cuerpo, se ve una
cara.** Así que no encargamos un muñeco entero: encargamos **cabeza y
hombros**, encuadrado como una foto de perfil.

Esa decisión es la que hace que el encargo quepa en tu presupuesto, y
aquí está la cuenta.

## Por qué no se pueden pedir los muñecos enteros

Si cada combinación fuera un dibujo:

    3 lecturas × 4 peinados × 3 pieles × 5 colores de pelo × 5 conjuntos
    = 900 dibujos ≈ 18.000 créditos

No cabe: tienes unos 8.000.

Partiéndolo en dos capas y dejando el color al código:

    12 cabezas + 15 hombros = 27 dibujos ≈ 600 créditos
    → las mismas 900 combinaciones

**27 piezas dan 900 aspectos distintos.** Ese es el encargo.

## Las dos capas

1. **Hombros y ropa** — abajo. Solo se ve el cuello y un poco de pecho.
2. **Cabeza y pelo** — encima. Tapa la parte de arriba del cuello.

Se pueden dibujar por separado sin que se descuadren porque la cabeza
solapa siempre el borde de arriba de la ropa, y porque el proceso vuelve
a alinear cada pieza midiendo dónde está la coronilla y qué ancho tiene
la cabeza. Ese código ya existe: es el mismo que alineó las láminas de
Ryu, Kenta, Lara y Reiko.

## El color lo pongo yo

La piel y el color del pelo **no se encargan**. Se generan en el proceso
a partir de una pieza pintada en un color de referencia.

Esto es lo delicado del encargo y ya nos ha mordido una vez hoy: girarle
el tono a una pieza falla cuando está muy apagada, o cuando dos cosas de
la imagen comparten tono y la máscara no sabe cuál es cuál. Por eso el
encargo pide **el pelo en un azul violáceo medio**: es lo más lejos
posible de la piel en la rueda del color, así que separar pelo de cara
es trivial y ninguno de los dos fallos puede darse.

Es feo de mirar suelto. Da igual: nunca se verá así, el código siempre le
pone un color encima.

**Antes de encargar las 27, encarga UNA** (la primera de la lista) y
mándamela. Compruebo que el recoloreado funciona de verdad y solo
entonces sigues. Si falla, hemos perdido 20 créditos en vez de 600.

## El pedido

### Cabezas — 12 piezas

`chibi-cabeza-<lectura>-<peinado>.png`

|  | corto | medio | largo | recogido |
|---|---|---|---|---|
| **fem** | ✓ | ✓ | ✓ | ✓ |
| **masc** | ✓ | ✓ | ✓ | ✓ |
| **neutro** | ✓ | ✓ | ✓ | ✓ |

    chibi-cabeza-fem-corto.png       chibi-cabeza-masc-corto.png
    chibi-cabeza-fem-medio.png       chibi-cabeza-masc-medio.png
    chibi-cabeza-fem-largo.png       chibi-cabeza-masc-largo.png
    chibi-cabeza-fem-recogido.png    chibi-cabeza-masc-recogido.png

    chibi-cabeza-neutro-corto.png    chibi-cabeza-neutro-largo.png
    chibi-cabeza-neutro-medio.png    chibi-cabeza-neutro-recogido.png

> "Lectura" no es identidad. El jugador elige el cuerpo que quiera y los
> pronombres que quiera, por separado: en el código `look` y `pronouns`
> son campos distintos y no se hablan.

### Hombros y ropa — 15 piezas

`chibi-ropa-<lectura>-<conjunto>.png`

Conjuntos: `basico` (el que viene de serie), `sudadera`, `cuello-alto`,
`chaqueta`, `camisa`.

    chibi-ropa-fem-basico.png        chibi-ropa-masc-basico.png
    chibi-ropa-fem-sudadera.png      chibi-ropa-masc-sudadera.png
    chibi-ropa-fem-cuello-alto.png   chibi-ropa-masc-cuello-alto.png
    chibi-ropa-fem-chaqueta.png      chibi-ropa-masc-chaqueta.png
    chibi-ropa-fem-camisa.png        chibi-ropa-masc-camisa.png

    chibi-ropa-neutro-basico.png     chibi-ropa-neutro-chaqueta.png
    chibi-ropa-neutro-sudadera.png   chibi-ropa-neutro-camisa.png
    chibi-ropa-neutro-cuello-alto.png

`basico` viene gratis. Los otros cuatro se compran con gemas.

## Encuadre, igual en las 27

- Cuadrado, 2K.
- Centrado. Nada tocando los bordes.
- **Cabezas**: la coronilla al 12% desde arriba, la cabeza ocupando un
  62% del ancho, y la pieza cortada por debajo de la barbilla.
- **Ropa**: el cuello arrancando a media altura, hombros y pecho, cortado
  al 92%.
- Fondo croma verde plano `#00B140`. Si alguna pieza sale verde, esa se
  pide sobre azul `#0047FF` — el recorte mide cuánto tira a verde cada
  píxel y se comería una pieza verde sobre verde.
- **Sin marco dorado.** Las láminas de las apps lo llevan; estas no,
  porque van dentro de un aro que ya pone la interfaz.
- Sin texto, sin sombra proyectada, sin degradado en el fondo.

## Lo que hago yo cuando lleguen

1. Recorto el croma y alineo por coronilla y ancho, como con los cuatro
   personajes.
2. Genero los tonos de piel y los colores de pelo desde la pieza de
   referencia.
3. Monto las dos capas y sustituyo el `playerFace()` dibujado a código.
4. Engancho los cuatro conjuntos a la tienda.
