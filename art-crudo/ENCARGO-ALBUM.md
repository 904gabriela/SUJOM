# Encargo: el álbum

26 fotos en `data/photos.js`, repartidas en 16 escenas. Ahora mismo
están dibujadas por código, como SVG, en `src/engine/art.js`. Esto es
el plan para sustituirlas por arte pintado.

> Regla que manda sobre todo lo demás, de `BIBLIA.md`: **aquí no hay
> ninguna imagen fotográfica.** Una foto en este mundo es una imagen
> pintada que se comporta como una foto —encuadre de móvil,
> profundidad de campo, grano— pero pintada. Se consigue pasando el
> arte de un personaje como referencia de estilo, aunque en la imagen
> no salga nadie.

## Dónde se ven

- **Rejilla de tres columnas** (`.gal`, `styles/main.css:808`). En una
  pantalla de móvil eso son unos **107 px por foto**.
- **Visor a pantalla completa** al tocarla, con los metadatos debajo.

Los dos tamaños importan, pero el que decide es el de 107. Una foto
que a tamaño grande es preciosa y a 107 px es una mancha marrón no
sirve: la rejilla es lo que se ve primero y lo que se ve siempre.

## Cuántas imágenes hacen falta

No son 26. Tres descuentos:

- **`lara_empty` no lleva arte.** Es un archivo vacío y el código ya
  dibuja el «SIN DATOS». Pintarlo sería contradecir lo que dice.
- **`lara_momo2` reutiliza la imagen de `lara_momo`.** No es ahorro,
  es el chiste: la anomalía de esa foto es justamente que *es la misma
  foto*. Si se pintan dos, se rompe.
- **`reiko_door` y `sys_door` son la misma puerta.** Una la ve ella,
  la otra la ve el sistema.

Quedan **23 imágenes base** y **6 gemelas corruptas**.

## Las tres clases de foto

| Clase | Cuántas | Qué se pide |
|---|---|---|
| **Sólo limpia** | 11 | La foto bonita. Nunca se corrompe. |
| **Necesita gemela** | 6 | La limpia y la misma con algo cambiado. |
| **Sólo corrupta** | 9 | Nace rota. No existe versión limpia. |

**Sólo limpia:** `ryu_ramen` `ryu_cross` `kenta_ramen` `kenta_cat`
`lara_momo` `lara_outfit` `lara_coffee` `lara_fest` `reiko_office`
`reiko_coffee` `group_fest`

**Necesita gemela:** `ryu_fw` `ryu_window` `kenta_city` `kenta_room`
`lara_momo2` `reiko_city`

**Sólo corrupta:** `ryu_hosp` `ryu_lab` `kenta_paper` `lara_empty`
`lara_paper` `reiko_paper` `reiko_door` `sys_chairs` `sys_door`

## La decisión que importa: dónde vive la anomalía

Cada foto corrupta lleva un detalle que no debería estar. Hay dos
sitios donde puede vivir, y la respuesta no es la misma para todas.

**Pintada dentro de la imagen** cuando el detalle es una cosa que
alguien pintaría: un reflejo en un cristal, una puerta con teclado,
una pulsera de hospital. Se pide una segunda imagen.

**Puesta por código encima del arte** cuando el detalle es una
*propiedad* de la imagen y no un objeto dentro de ella. Y aquí está lo
importante:

> `kenta_city` dice «dos edificios distintos tienen las mismas
> ventanas encendidas. Píxel por píxel». Eso **no se puede pintar**.
> Si se lo pides a un modelo te pinta dos edificios parecidos, y
> parecido es exactamente lo contrario de lo que dice el texto. En
> cambio en código es trivial: se copia un rectángulo del arte
> pintado y se pega en otro sitio. Y entonces sí es verdad.

Lo mismo con la luna de `ryu_window`, que lleva tres semanas en el
mismo sitio: eso se cuenta oscureciéndola, no pintándola.

Así que el código de anomalías **no se tira, se reescribe**: ahora
dibuja vectores cian encima de un SVG, y tiene que pasar a operar
sobre la imagen pintada. Un rectángulo cian sobre una foto no parece
un detalle de la foto, parece un botón.

| Anomalía | Dónde | Por qué |
|---|---|---|
| `reflection` | pintada | Un reflejo en un cristal es un objeto. |
| `band` | pintada | Una pulsera de hospital es un objeto. |
| `door` | pintada | Una puerta con teclado es un objeto. |
| `wires` | pintada | Cables saliendo de un sillón. |
| `figure` | pintada | Alguien de pie al fondo que no estaba. |
| `dup` | **código** | Tiene que ser idéntico de verdad. |
| `nosun` | **código** | No es un objeto: es que no se ha movido. |

## Lo que hay que prohibir en cada encargo

De los errores ya cometidos, por orden de cuántas veces han pasado:

1. **Nada de fotorrealismo.** Pasar arte del personaje como
   referencia de estilo aunque no salga nadie. Pasó con el perro.
2. **Ni texto, ni marca de agua, ni firma.** Pasó con un sticker que
   traía «Ryu» escrito.
3. **Ni marco decorativo, ni borde blanco, ni efecto polaroid, ni
   foto torcida pegada en un álbum.** Pasó en el avatar de Ryu y otra
   vez en la tanda de sombras. El encuadre tiene que llegar al borde.
4. **Ni caras cuando no se piden.** En una foto de un cuenco de ramen
   no tiene que aparecer nadie comiéndoselo.

## Lo que todavía no está decidido

- **`sys_chairs`** dice «OCUPACIÓN: 4/4 · PROTOCOLO: LAZO DORADO».
  Cuatro sillones con los cuatro dentro. Es la foto que lo cuenta
  todo, y no está escrito si se les ve la cara o no.
- **Los tres `paper`** son documentos con texto legible, y el punto 2
  de arriba dice que nada de texto. Son la excepción: ahí el texto
  *es* la foto. Hay que decidir si se pinta el papel en blanco y el
  texto lo pone el código encima —que además permite traducirlo y que
  se lea a 107 px— o si se pide pintado y se acepta que el modelo
  escriba garabatos.
