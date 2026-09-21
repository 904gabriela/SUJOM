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

**El registro del álbum.** La primera tanda de fotos (`ryu_ramen`) ha
salido en **fondo de anime pintado realista**, tipo Shinkai: reflejos,
profundidad de campo, mucho detalle. El reparto está en **cel shading**.
Las dos cosas son bonitas y a 107 px se leen bien, pero son **dos manos
distintas**. Hay que decidir si el álbum va en ese registro a propósito
—una foto se parece más a una foto que a un dibujo, así que tiene
sentido— o si se acerca al del reparto.

**`sys_chairs`** — «OCUPACIÓN: 4/4 · PROTOCOLO: LAZO DORADO». Cuatro
sillones con los cuatro dentro. Es la foto que lo cuenta todo, y no
está decidido si se les ve la cara.

**En qué año transcurre el juego.** Bloquea el arreglo de las fechas de
ingreso, que no dan los años que la historia dice. Ver `BIBLIA.md`.

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

- **`ryu_ramen`**: rechazada, las cuatro con marcas. Sin rehacer.
- **`kenta_cat`**: el gato está **bien** —callejero, feo, mirada de
  no me importas, nada de siamés ni de mono—, y el registro también.
  Falla el encuadre: dos con mano o brazo en cuadro y dos con borde de
  polaroid. Se intentó recortar la buena a mano y no salió; no se
  insistió, porque es una imagen provisional. **Relanzar con las
  reglas de arriba, no reparar.**

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
