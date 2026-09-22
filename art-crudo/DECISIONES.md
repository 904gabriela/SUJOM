# Decisiones de arte ya tomadas

Lo que Gabriela ha aprobado o rechazado, y **por qué**. Existe porque
el motivo es lo único que sirve para la pieza siguiente: sin él, cada
tanda empieza de cero.

Los `ENCARGO-*.md` dicen qué pedir. Esto dice qué ha funcionado.

---

## Lo que está aprobado y cerrado

**Las cuatro fotos de perfil.** Cada una es distinta en su naturaleza,
no sólo en su dibujo:

| | Qué se ve | Por qué |
|---|---|---|
| **Ryu** | Su mano y un vaso en la barra de un bar | No enseña la cara. Es el único al que la app le apareció en el móvil sin descargarla. |
| **Kenta** | Selfie haciéndose el malote | Pedido así con esas palabras. |
| **Lara** | Sándwich, su perro | No sale ella. Es lo que elegiría. |
| **Reiko** | Bailando | Lo que dejó de hacer. |

**Los 40 stickers**: 6 de emoción × 4 personajes + 4 propios de cada
uno. Tono aprobado: *«monigotes feos»*, graciosos, **no ultra cute**.

**Sándwich es un mini toy blanco de pelo rizado** —bichón o caniche
toy, cabeza redonda, ojos oscuros y redondos, patas cortas. Se pidió
una vez como terrier de pelo duro y estaba mal.

---

## Los rechazos, que es donde está la información

Cada uno enseña algo que se repite.

**«El tímido es otro estilo totalmente diferente y el sorprendido es
otro tono de piel.»** Las dos piezas malas tenían hermanas buenas en
la misma tanda; el fallo fue elegir mal, no generar mal. La piel de la
mala medía 224 y las buenas 153–174. → **Mirar la tanda entera antes
de elegir, y medir en vez de opinar.**

**«La triste no la noto por ningún lado.»** Se había pedido «sonríe y
la sonrisa no le llega a los ojos». Eso es una idea literaria y a
tamaño chibi no se dibuja. Se sustituyó por una silueta rota, la mano
tapando los ojos. → **Una emoción tiene que leerse en la silueta.**

**«En una de Kenta se parece mucho a Bakugo con el spiky hair.»** Se
arregló poniendo el pelo como primer problema del prompt, no como
detalle al final.

**«Las de Ryu cambia el tono de piel mucho.»** Tres piezas suyas daban
144, 149 y 214. Cada una pasaba el filtro por separado contra el arte
pintado. → De ahí salió la comprobación de dispersión de conjunto en
`tools/criba_chibi.py`. **Un sticker no se ve solo, se ve en la misma
conversación que los demás.**

**«Yo no usaría la foto realista del perro, ya que todo es
semirrealista anime-ish. El perro descuadra todo.»** Salió un bichón
fotorrealista con pelo real y desenfoque de lente real. → Regla que
está en `BIBLIA.md`: **pasar arte pintado de un personaje como
referencia de estilo aunque en la imagen no salga nadie.**

**«Las de la sombra me gusta pero se nota que tiene las manos en los
bolsillos, así que ¿quién tomó la foto?»** Se intentó arreglar dos
veces y empeoró cada vez: al pedir un brazo levantado con el móvil, el
modelo necesitaba un cuerpo al que ponerle el brazo y plantaba un
hombre entero de pie en la calle. Se abandonó y Ryu se quedó con la
del bar. → **«Cada vez que lo lanzas salen peor» es señal de parar, no
de reformular.**

---

## La regla de cuándo parar

Salió de ahí y vale para todo lo que venga:

> El arte de los personajes lo va a dibujar una artista real. Una
> imagen generada sólo tiene que llegar a **«se entiende la idea»**.
> Insistir para que salga perfecta es trabajo que se va a tirar.

En la sombra de Ryu se gastaron tres tandas en una pieza que ya se
había entendido en la primera. No repetirlo.

---

## Sin resolver, y son decisiones suyas

**`sys_chairs`** — «OCUPACIÓN: 4/4 · PROTOCOLO: LAZO DORADO». Cuatro
sillones con los cuatro dentro. Es la foto que lo cuenta todo, y no
está decidido si se les ve la cara.

**En qué año transcurre el juego.** Bloquea el arreglo de las fechas de
ingreso, que no dan los años que la historia dice. Ver `BIBLIA.md`.

---

## El registro del álbum: cel shading, DECIDIDO

Las dos escenas de prueba salieron en **fondo de anime realista** tipo
Shinkai. Quedaban bien sueltas y aun así están mal.

> *«La idea del juego es que el álbum de fotos siga siendo un juego.
> Si de repente ponemos imágenes realistas ya te saca del juego.»*
> — Gabriela

**El álbum va en el mismo registro que el reparto.** El motivo largo
está en `BIBLIA.md`, y el que de verdad pesa es éste: las fotos no son
decoración, son pruebas. Si están pintadas por otra mano que los
personajes, el jugador atribuye la rareza al estilo y no al mundo —
piensa «estas se ven distintas» en vez de «aquí pasa algo», y la
anomalía se pierde dentro de la diferencia de registro.

Para el prompt: pedir **cel shading plano, línea visible, poco
detalle**, y decir explícitamente que **no** es un fondo realista ni
cinematográfico. Y la referencia de estilo del personaje sigue yendo
siempre, aunque no salga nadie.

---

## La palabra arrastra su equipaje

**Es el patrón más útil que ha salido, y ha salido tres veces.** Cada
vez que un encargo falló por meter algo prohibido, lo prohibido venía
dentro de lo que se estaba pidiendo:

| Qué se pidió | Qué se coló |
|---|---|
| «Que **la sombra** haga la foto» | Un hombre entero de pie en la calle, con cara. |
| «Un **konbini** de noche» | Pepsi, Coca-Cola, «CUP NOODLES». |
| «Una **foto hecha con el móvil**» | El marco de polaroid, la inclinación, y la mano del que la hace. |

En los tres casos la prohibición estaba escrita, explícita y en
mayúsculas, en el mismo prompt. No sirvió de nada.

> **Una prohibición no gana contra el sujeto.** Si lo que no quieres
> es parte de lo que has pedido, hay que cambiar lo que pides.

Traducido a reglas concretas para el álbum:

- **No digas que es una foto.** Describe el encuadre —a ras de suelo,
  cerca, poca profundidad de campo, luz de la escena— y deja que la
  sensación de foto salga de ahí. Decir «foto» invita al objeto foto:
  marco blanco, inclinación, y el fotógrafo.
- **No nombres sitios que están hechos de marcas.** «Konbini» trae
  logotipos. Cambia el sujeto: el objeto en primer plano llenando el
  encuadre y el sitio detrás, sólo como luz y desenfoque.
- **No pidas una acción que necesita un cuerpo** si no quieres el
  cuerpo.

### Estado de las dos escenas de prueba

- **`ryu_ramen`**: **resuelta y aprobada.** Ver abajo, «Lo barato se
  cuenta con el envase y la luz».
- **`kenta_cat`**: el gato está **bien** —callejero, feo, mirada de
  no me importas, nada de siamés ni de mono—. Falla el encuadre: dos
  con mano o brazo en cuadro y dos con borde de polaroid. Se intentó
  recortar la buena a mano y no salió; no se insistió, porque es una
  imagen provisional. **Relanzar con las reglas de arriba, no
  reparar.**

  ⚠️ Una nota vieja decía que el registro del gato también estaba
  bien. **Ya no vale**: aquella tanda salió tipo Shinkai, que es justo
  el registro que se descartó. Al relanzarla va en cel shading como
  todo lo demás.

---

## Lo barato se cuenta con el envase y la luz, no con el sitio

De cómo se resolvió `ryu_ramen`, y sirve para todo lo que venga.

La primera tanda buena era un cuenco de cerámica en un mostrador de
madera cálida. Limpia, sin marcas, bonita. Y mal:

> *«Me gustaría que se vea más tipo tienda. Ryu siento que se iría a
> por lo más barato posible.»* — Gabriela

Un cuenco de cerámica es un puesto, y un puesto cuesta dinero. El
problema es que **el objeto barato es justo el objeto con marca** —y
ahí prohibir no vale, que es la regla de la sección anterior. La
salida fue repartir el trabajo:

| Qué tiene que decir | Quién lo dice |
|---|---|
| Que es barato | El envase: vaso blanco de usar y tirar, palillos finos, servilleta de papel |
| Que es una tienda | **La luz**: fluorescente blanco, duro y plano, desde arriba |
| Que es de noche | La ventana: la calle en manchas planas, sin formas legibles |
| Los estantes | Nadie. La cámara mira a la ventana, así que la tienda queda **detrás de quien mira** |

Lo que hay que quedarse: **el sitio se cuenta con su luz y su
mobiliario, no enseñándolo.** Un fluorescente plano sobre laminado gris
dice «abierto toda la noche» sin traer un solo logotipo. Enseñar un
estante trae productos, y los productos traen marcas.

**Y la tapa va, en blanco.** Se prohibió la tapa por miedo a que
llegara impresa, el modelo la puso igual, y resultó ser lo que salva
la miniatura: a 107 px rompe la silueta, así que el vaso deja de ser
un cilindro blanco y pasa a ser una forma reconocible. El problema era
la impresión, no la tapa. **Prohibir el objeto entero por una parte
suya sale caro.**

### El encuadre: pedirlo cerca desde el principio

El modelo por defecto se aleja, y entonces la imagen parece que
alguien se levantó a hacer una sesión de fotos en vez de una foto de
móvil de madrugada.

> *«Yo la recortaría un poco para que parezca tomada más de cerca.»*
> — Gabriela

Se probaron tres recortes y se aprobó el medio. **Pasado cierto punto,
acercarse quita el sitio**: el más cerrado enseñaba mejor la comida y
se comía el fluorescente y la ventana, o sea deshacía lo que acababa
de costar conseguir. El medio es donde caben las dos cosas.

Para el prompt: decir **cerca, grande, llenando el encuadre, cámara a
la altura del objeto** desde la primera línea. Sale más barato que
recortar después.

Y ojo con la diferencia: **recortar para elegir el encuadre está
bien** —es una decisión de composición—, pero **reparar a mano lo que
salió mal sigue prohibido** (ver abajo). Lo primero elige, lo segundo
arregla.

---

## Cuándo NO seguir reintentando

Dos señales, las dos pagadas:

1. **Cada tanda sale peor que la anterior.** Pasó con la sombra de
   Ryu: tres tandas para una pieza que ya se había entendido en la
   primera. Se abandonó y se cogió la alternativa.
2. **El fallo es el mismo tres veces seguidas.** Entonces no es suerte,
   es el prompt, y hay que cambiar el sujeto (ver arriba) en vez de
   reforzar la prohibición.

Y una cosa que **no** hay que hacer: reparar a mano una imagen
generada. Es provisional y se va a redibujar. Se intentó con el gato y
salió peor que el original.
