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

> ⚠️ **Los rizos no se negocian.** Se probó a quitar «rizado», «bichón»
> y «toy» del prompt para escapar del peluche kawaii, y salió un perro
> de pelo liso que Gabriela rechazó: *«Sándwich es más parecido al
> perro de peluche de antes.»* Lo que hay que quitar es el **acabado**
> —ojos enormes, brillo, desenfoque de fondo—, no la raza.

**Del álbum, aprobadas:** `ryu_ramen`, `kenta_cat` y `reiko_coffee`.
La taza es la que mejor da el registro del reparto de las tres, así
que sirve de vara de medir para las que vengan.

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

Para el prompt: decir explícitamente que **no** es un fondo realista ni
cinematográfico. Y la referencia de estilo del personaje sigue yendo
siempre, aunque no salga nadie.

### Cómo es ese registro, mirado y no recordado

Esto estuvo mal escrito un tiempo y costó dos tandas. Decía «cel shading
plano, línea visible, poco detalle», y con eso salieron gatos oscuros,
hormigón rugoso y pelo dibujado pelo a pelo. El problema es que esa
frase describe **el avatar de Ryu**, no a los personajes.

Abre `assets/characters/*/portrait.png` y míralos. El reparto es:

- **Línea fina y limpia**, no contorno negro grueso.
- **Sombra suave, con degradados**, no manchas planas de dos tonos.
- **Paleta apagada y clara** —grises, rosas polvorientos, blancos
  cálidos—, no contraste alto.
- **Superficies lisas, muy poca textura.** Nada de grano ni de picado.

En una frase: **línea fina, sombra suave, paleta clara, sin textura.**
Es un dibujo ligero, no uno sucio.

> Cuando dudes, no lo recuerdes: abre los `portrait.png` y pon tu imagen
> al lado. Se ve en dos segundos y no hay que discutirlo.

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
- **`kenta_cat`**: **resuelta y aprobada.** Costó tres relanzamientos y
  el que valió fue el que cambió la referencia por el diseño de
  personaje. Ver abajo, «La referencia arrastra su equipaje».

---

## La referencia arrastra su equipaje

Lo mismo que la palabra, pero con una imagen. Salió resolviendo
`kenta_cat`, que se resistió tres tandas.

**El fallo:** en escenas donde no había nadie salían manos y brazos, y
el dibujo salía sucio y con grano, nada que ver con el reparto. Se
probó a reforzar las prohibiciones —«no hands, no arms, nobody is
petting the cat»— y siguió pasando.

**La causa:** se estaba pasando como referencia de estilo el
**avatar** del personaje. Y un avatar, en este juego, **es una foto de
dentro del mundo**: el de Kenta es un selfie con el brazo estirado
hacia la cámara. El brazo no se lo inventaba el modelo, **estaba
dentro de la referencia**. Se le estaba pidiendo que imitara una foto
hecha por Kenta en vez de cómo está dibujado Kenta.

> **La referencia aporta lo que contiene, no sólo su estilo.** Si no
> quieres lo que hay dentro, cambia la referencia. Prohibirlo en el
> prompt no gana, igual que con las palabras.

**La regla, y vale para las 21 escenas que quedan:**

- La referencia del álbum es **`assets/characters/<id>/portrait.png`**,
  el diseño de personaje. **Nunca `avatar.png`.**
- En escenas donde no sale nadie, la referencia se elige **por estilo,
  no por de quién es la escena**. No hay identidad que preservar.
- Van bien **dos diseños a la vez**: dos ejemplos de la misma mano
  definen el estilo mejor que uno.
- Y hay que añadir una línea que antes no hacía falta: **las
  referencias son de estilo, no de contenido; que no dibuje a las
  personas que salen en ellas.** Con una mano y un selfie daba igual;
  con dos personajes de cuerpo entero, si no lo dices te planta a uno
  en la escena.

Los cuatro diseños están subidos a OpenArt con estos nombres:

    diseno-ryu      3R7ym4ShmtptyN5Qzf15
    diseno-kenta    ZMChR31IJgZElREpzves
    diseno-lara     ZU6aoznHahQaghJMAck7
    diseno-reiko    04xYyaH1oy6sUJNQJAaE

⚠️ **Las `IMG_9046`–`IMG_9049` de `LEEME.md` son los avatares**, y son
las que causaron esto. Siguen valiendo para los stickers, donde lo que
importa es la identidad del personaje. Para el álbum, no.

### El borde de polaroid NO venía de la referencia

Aquí llegó a parecer que el borde blanco —prohibido y salido igual
varias veces— venía también del avatar de Kenta, por ser un selfie.
**Era falso, y ya está comprobado:** el borde volvió a salir en una
tanda de `ryu_cross` hecha con los diseños de personaje, sin ningún
avatar de por medio.

Así que el borde es otra cosa, y lo más probable es que sea lo de la
sección siguiente: el género del sujeto. `ryu_cross` pedía un bodegón
de joyería, y ese género viene con marco.

Lo que sí queda firme de la referencia es **el brazo**: estaba
literalmente dentro del avatar de Kenta. Eso es causa directa, no
estadística. Y la regla de usar el diseño de personaje se sostiene por
el registro, que sí mejoró de forma clara, no por el borde.

> Queda como aviso de método: **una tanda que cambia dos cosas a la vez
> no demuestra ninguna de las dos.** Aquella cambió referencia y prompt
> juntos, y la conclusión fácil era la equivocada.

---

## El sujeto arrastra su género, y el género trae su acabado

La tercera cara del mismo patrón, y la que más cara sale porque parece
que el fallo está en el estilo cuando está en el qué.

Salió lanzando tres escenas **con el mismo prompt de estilo, las mismas
referencias y las mismas prohibiciones**. Una salió perfecta y dos
salieron irreconocibles:

| Escena | Qué salió | Qué género arrastraba |
|---|---|---|
| `reiko_coffee` | **Bien a la primera.** | Ninguno. Una taza en una mesa no se parece a ningún tipo de foto. |
| `ryu_cross` | Fotorrealista, y con borde de polaroid | Un colgante de plata sobre madera con luz de lámpara **es** una foto de producto de joyería. |
| `lara_momo` | Peluche kawaii con ojos enormes | Un perrito blanco de pelo rizado **es** una ilustración kawaii. |

> **Cada sujeto tiene un género de imagen asociado, y ese género viene
> con su propio acabado.** Si lo que pides se parece a un tipo de foto
> que existe ahí fuera —producto, mascota, comida de revista, retrato
> de estudio—, el modelo trae el acabado de ese género y **la
> referencia de estilo pierde**.

En `lara_momo` la prohibición estaba escrita con esas palabras —«NOT a
big-eyed mascot»— y salió exactamente eso. Otra vez: la prohibición no
gana contra el sujeto.

### Cómo se arregla, y cómo NO

El primer intento lo arregló mal: **quitando del prompt las palabras
que invocan el género.** Las dos volvieron rechazadas, y por el motivo
contrario al anterior:

| Qué se quitó | Qué se perdió |
|---|---|
| «colgante», «plata», primer plano → se colgó de un clavo en la pared | *«Parece una cruz de adorno de pared más que su colgante.»* |
| «rizado», «bichón», «toy» → perro de pelo liso | *«Sándwich es más parecido al perro de peluche de antes.»* |

Quitando esas palabras se escapa del género, sí, **pero también se
pierde lo que la cosa es.** Un colgante que ni cuelga de un cuello ni
está quitado encima de algo deja de leerse como colgante. Un bichón sin
rizos deja de ser Sándwich.

> **El género no está en lo que la cosa es, está en cómo la miras.**
> Lo que hay que cambiar es el **encuadre, la luz y el acabado**, no la
> identidad del sujeto.

Traducido a qué tocar y qué no:

- **Quédate** con lo que define la cosa: la cruz es un colgante con su
  cadena; el perro es un bichón blanco y rizado.
- **Cambia** lo que trae el género: el macro, la luz cálida de foco, la
  madera oscura, el metal pulido, el fondo desenfocado, los ojos
  enormes y brillantes.
- **Y ponla en una situación corriente, no en una pose.** La cruz
  quitada de un tirón encima del alféizar donde siempre la deja, no
  colocada sobre terciopelo ni colgada como adorno.

**La señal para detectarlo antes de gastar una tanda:** si lo que vas a
pedir se parece a algo de un catálogo o de una tienda de regalos, ya
tienes el problema. Pero la salida no es pedir otra cosa: es pedir la
misma cosa en un día cualquiera.

**Y funcionó, las dos a la primera con la regla corregida:**

- **Sándwich** volvió a ser un bichón —rizos, cabeza redonda, orejas
  caídas, patas cortas— y lo que se quitó fue el acabado: ojos
  pequeños y sin brillo, fondo nítido y plano. Misma raza que la tanda
  del peluche, otro dibujo.
- **La cruz** pasó a ser **un collar recién quitado encima del
  alféizar**, con la cadena amontonada de cualquier manera. Ese
  desorden es lo que lo delata: un adorno estaría colocado; un collar
  que alguien se quita de un tirón, no.

> Detalle que costó elegir entre dos: pide **una cadena corta**. En una
> versión salió dando tres vueltas al alféizar —*«más larga que una
> cadena de bicicleta»*— y deja de parecer un collar por exceso de
> cuerda, no por el encuadre.

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
