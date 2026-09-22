# Encargo: el álbum

26 fotos en `data/photos.js`, repartidas en 16 escenas. Ahora mismo
están dibujadas por código, como SVG, en `src/engine/art.js`. Esto es
el plan para sustituirlas por arte pintado.

> **Esto es un encargo, no un guion para un generador.** El arte final
> lo dibujan personas (ver `BIBLIA.md`). Lo que se genere aquí son
> bocetos para ver cómo queda montado y para enseñar el encuadre; en
> cuanto se entiende la idea, ya han hecho su trabajo.

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

Quedan **23 imágenes base**.

### Y sólo DOS gemelas se pintan

De las seis fotos que «necesitan gemela», cuatro no llevan imagen
aparte, porque su anomalía no es un objeto que alguien pueda pintar:

| Foto | Quién hace la gemela |
|---|---|
| `ryu_fw` | **Pintada.** Un reflejo en un cristal es un objeto. |
| `kenta_room` | **Pintada.** Una puerta con teclado es un objeto. |
| `ryu_window` | El código (`nosun`): la luna no se ha movido. |
| `reiko_city` | El código (`nosun`). |
| `kenta_city` | El código (`dup`): tiene que ser idéntico de verdad. |
| `lara_momo2` | Reutiliza la imagen de `lara_momo`. Es el chiste. |

> **Total a pintar: 23 base + 2 gemelas = 25 imágenes.**

Antes aquí ponía «23 base + 6 gemelas», que sale de contar las seis
fotos que tienen versión corrupta. Pero contar fotos no es contar
encargos: cuatro de esas seis no le cuestan nada a nadie porque las
hace el motor.

## Cómo entra el arte al juego

Ya existe la entrada, así que una imagen aprobada se mete en dos pasos:

1. Guarda el fichero en **`assets/album/<id>.jpg`** (cuadrado; 1024 px
   basta y pesa ~120 KB, que a 107 px y a pantalla completa sobra).
2. Añade el campo en `data/photos.js`:

       img: 'assets/album/<id>.jpg'

   Y `imgCorrupt` **sólo** en `ryu_fw` y `kenta_room`.

Eso es todo: `photo()` la dibuja dentro del mismo grupo donde estaba el
SVG, así que el glitch y las anomalías siguen funcionando encima. Si el
fichero falta, se ve el dibujo de código de siempre — se puede ir
metiendo foto a foto sin romper nada.

### Las coordenadas hay que volver a medirlas

`luna` y `dup` están medidas sobre el SVG y no valen sobre una imagen
pintada.

- **La luna la mide una herramienta:**

      python3 tools/mide_luna.py assets/album/ryu_window.jpg

  Busca la mancha compacta más brillante de la mitad superior e imprime
  la línea lista para pegar. Si no está segura lo dice y no inventa un
  número.

- **El `dup` se elige a ojo.** No hay herramienta y no debería haberla:
  decidir qué dos trozos son «el mismo edificio» es composición, no
  medida.

## Las tres clases de foto

| Clase | Cuántas | Qué se pide |
|---|---|---|
| **Sólo limpia** | 11 | La foto bonita. Nunca se corrompe. |
| **Necesita gemela** | 6 | La limpia y la misma con algo cambiado. **Sólo 2 se pintan** (ver arriba). |
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

> **Cuidado al sustituir el arte de esas dos.** Las dos llevan
> coordenadas en `data/photos.js` —`luna: [cx, cy, r]` en `ryu_window`
> y `reiko_city`, y `dup: { de, a }` en `kenta_city`— y esas
> coordenadas apuntan al dibujo que hay **ahora**, que es el SVG. En
> cuanto entre una imagen pintada, la luna estará en otro sitio y los
> edificios también. Hay que volver a medirlas sobre la imagen nueva,
> o la luna aparecerá pegada en un trozo de cielo vacío. Ya pasó una
> vez, por tener el número clavado en el código en vez de en el dato.

## Lo que hay que prohibir en cada encargo

De los errores ya cometidos, por orden de cuántas veces han pasado:

1. **Nada de fotorrealismo.** Pasar arte del personaje como
   referencia de estilo aunque no salga nadie. Pasó con el perro.
   **Y tiene que ser `portrait.png`, el diseño de personaje, nunca
   `avatar.png`**: el avatar es una foto de dentro del mundo y arrastra
   lo que contiene (ver `DECISIONES.md`, «La referencia arrastra su
   equipaje»). Pasa dos diseños a la vez y di que son de estilo, que si
   no te dibuja a esas personas dentro de la escena.
   El registro, mirándolo y no de memoria: **línea fina, sombra suave,
   paleta apagada y clara, sin textura**, diciendo explícitamente que
   **no** es un fondo pintado realista ni cinematográfico. Las dos
   escenas de prueba salieron tipo Shinkai y por eso se descartó ese
   registro: el álbum va en la misma mano que el reparto.
2. **Ni texto, ni marca de agua, ni firma.** Pasó con un sticker que
   traía «Ryu» escrito.
3. **Ni marco decorativo, ni borde blanco, ni efecto polaroid, ni
   foto torcida pegada en un álbum.** Pasó en el avatar de Ryu y otra
   vez en la tanda de sombras. El encuadre tiene que llegar al borde.
4. **Ni caras cuando no se piden.** En una foto de un cuenco de ramen
   no tiene que aparecer nadie comiéndoselo.
5. **Ni encuadres lejanos.** El modelo se aleja por defecto y la
   imagen acaba pareciendo una sesión de fotos, no algo hecho con el
   móvil de pasada. Hay que pedir **cerca, grande, llenando el
   encuadre y con la cámara a la altura del objeto** desde la primera
   línea del prompt. Y es el que más pesa a 107 px: lejos, el sujeto
   se convierte en una mancha.

## Lo que todavía no está decidido

- **`sys_chairs`** dice «OCUPACIÓN: 4/4 · PROTOCOLO: LAZO DORADO».
  Cuatro sillones con los cuatro dentro. Es la foto que lo cuenta
  todo, y no está escrito si se les ve la cara o no.

Y nada más. Lo demás está decidido.

## Los tres `paper`: decidido y hecho

Son documentos con texto legible, y el punto 2 de arriba dice que nada
de texto. Son la excepción, porque ahí el texto *es* la foto.

**Se decidió que lo pone el código, y ya está implementado.** El texto
vive en `data/photos.js`, en el campo `doc` de cada uno, y lo dibuja
`src/engine/art.js`. Al artista se le pide **sólo el papel**, sin nada
escrito.

Sale gratis dos veces: se corrige sin volver a encargar nada, y a
107 px se convierte solo en un bloque ilegible, que es lo que parece
un documento visto de lejos.
