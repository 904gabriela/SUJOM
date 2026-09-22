# Estado del proyecto

Dónde está SUJOM, qué se ha hecho, qué falta y en qué orden.

Rama `claude/sujom-otome-game-uxw5ev`, que es la rama por defecto del
repositorio. 71 commits.

Complementa a los otros documentos, no los sustituye:

| Documento | Para qué |
|---|---|
| **`BIBLIA.md`** | El mundo. Manda sobre el guion. |
| **`SUJOM_HANDOFF.md`** | Arquitectura técnica, para un agente nuevo. |
| **`art-crudo/DECISIONES.md`** | Qué arte se aprobó y por qué. |
| **`art-crudo/ENCARGO-PERSONAJES.md`** | Lo que se le pasa a la artista. |
| **`art-crudo/ENCARGO-ALBUM.md`** | El plan de las 26 fotos. |
| **`ESTADO.md`** ← este | La foto de conjunto y el plan. |

---

## 1. Qué es

**ASSIST: Connected Hearts.** Un juego otome que finge ser una app de
mensajería. Conoces a cuatro personajes, te escriben, te caen bien. Y
luego una foto se repite, una fecha no cuadra, y alguien no se acuerda
de algo que te contó.

Debajo: ASSIST observa a alguien en redes, espera a saber por dónde
entra, le anuncia SUJOM de forma dirigida para que descargarlo parezca
idea suya, y acaba conectando su conciencia a una máquina. Los cuatro
ya están dentro. Ellos creen que están chateando.

> **Simple en la superficie porque la inteligencia complicada está
> debajo.** Nunca se explica nada. El romance va primero; el misterio
> sale de dentro del romance.

---

## 2. Estado real, en números

| Área | Estado |
|---|---|
| **Motor** | Funcionando. ~10.500 líneas de JS, sin build ni dependencias. |
| **Guion** | Cuatro rutas completas (~1.000 líneas cada una) + común + secreta. **Contradice la biblia en cuatro sitios.** |
| **Stickers** | **40 de 40 instalados.** |
| **Fotos de perfil** | **4 de 4 instaladas.** |
| **Retratos y expresiones** | Generados, en `assets/`. Provisionales. |
| **Álbum** | **3 de 25 instaladas** (`ryu_ramen`, `kenta_cat`, `reiko_coffee`). El resto sigue dibujado por código. |
| **Comprobaciones** | Dos scripts. No hay suite ni CI. |
| **Pieles** | Una, `piel-noche.css`, cargada siempre. No hay selector. |

---

## 3. Lo que se ha hecho

### 3.1 El mundo

**`BIBLIA.md` se escribió de cero.** No existía: la premisa se había
hablado antes de los diseños, no se puso por escrito, y las fichas de
los cuatro personajes acabaron contando otra historia sin que nadie lo
notara. Ahora recoge el método de reclutamiento, por dónde entró cada
uno, qué pasa después, y el reparto según las hojas de diseño.

**El reparto puesto al día** en `data/characters.js` y en los tres
sitios donde las edades se dicen en voz alta: Ryu 26, Kenta 23, Lara
18, Reiko 25. Los colores de respaldo se muestrearon del arte pintado
en vez de inventarlos — **Lara era rubia de ojos verdes en el código y
es rosa**. Y el perro pasó a llamarse Sándwich.

**Lara entró con 17, no con 21.** El registro interno la hacía más
joven ahora que cuando entró. Corregido en `data/files.js`,
`data/browser.js` y `data/story/lara.js`. Al arreglarlo encajó solo con
el documento de su álbum: por eso hay una cesión de tutela y por eso la
firman sus padres y no ella.

**Sándwich es un mini toy blanco de pelo rizado** — bichón o caniche
toy. Se pidió una vez como terrier de pelo duro y estaba mal.

**Y lo que el guion contradice quedó escrito sin arreglar**, para que
no se pierda otra vez:

- **Kenta** es el más grave. En el guion su familia le quiere y le
  ahoga; en la hoja huye de una casa que le hacía daño. Es el motivo
  contrario: su ruta hay que rehacerla.
- **Reiko** es sustitución entera. Ainsel, el fraude de sus socios y la
  prensa no existen. Unas 25 menciones.
- **Ryu** aguanta con cambio de piel: hermana → hermano, 20 → 26.
- **Lara** cambia de piel y de color.

### 3.2 Motor

**La foto de perfil dejó de cambiar con la emoción**
(`src/engine/portraits.js`). Miraba `expressions[expr]` primero y el
avatar parpadeaba en cada mensaje. Se separó en `avatar()`, que es
fija, y `cara()`, que sí es expresiva y se usa en las tres
ilustraciones grandes.

**Los stickers pasaron de emoji a imágenes** (`src/engine/chat.js` +
`styles/main.css`). La lista vive en `EMOCIONES` y `MEMES` dentro de
`chat.js` — no en `data/`, que es donde se buscaría. Se muestran a
140 px de alto, que es lo que usa Mystic Messenger; a 54 px, como un
emoji, la marca de emoción se perdía.

**El texto de los tres documentos del álbum lo pone el código.** Vive
en `data/photos.js`, campo `doc`, y lo dibuja `src/engine/art.js`. El
artista pinta sólo el papel. Dos cosas hubo que resolver:

- El filtro de corrupción, a escala 9, se comía el texto entero. Baja a
  2 cuando hay documento.
- A un solo tamaño de letra, o no cabía a lo ancho del papel o no se
  leía en el visor. Va a dos: la letra pequeña a 3.4 y la línea que
  hunde a 5. Que además es como se lee un documento de verdad.

**Las dos anomalías que no se pueden pintar, hechas en código:**

- **`dup`** — «dos edificios con las mismas ventanas, píxel por
  píxel». A un modelo le sale *parecido*, y parecido es lo contrario.
  Ahora copia la región de verdad y la pinta dos veces.
- **`nosun`** — la luna que lleva tres semanas sin moverse. Se deja
  plana y con el borde duro, como una calcomanía.

  Y ahí apareció un fallo real: el disco iba clavado en (126, 26) y la
  luna de `ryu_window` está en (112, 36), así que a esa foto le pintaba
  un borrón negro en un trozo de cielo vacío. La posición sale ahora
  del dato de cada foto.

**Una regla que salió dos veces:** lo que el jugador tiene que leer
como prueba va **fuera** del filtro de glitch. El glitch es ambiente;
una prueba ilegible no prueba nada. Y en `dup` lo rompía del todo,
porque el desplazamiento deforma distinto cada zona y la copia dejaba
de ser idéntica al original.

### 3.3 Arte

**40 stickers instalados** en `assets/stickers/`: seis emociones por
personaje más cuatro propios de cada uno.

| | | | | |
|---|---|---|---|---|
| **Ryu** | `movil` | `fuera` | `pulgar` | `dormido` |
| **Kenta** | `senala` | `tira` | `suelo` | `ramen` |
| **Lara** | `sandwich` | `graba` | `corazon` | `desmayo` |
| **Reiko** | `aplauso` | `bebe` | `jade` | `unas` |

Tono: **monigote feo y gracioso, no cute**.

**4 fotos de perfil**, y cada una es distinta en su naturaleza, no sólo
en su dibujo:

| | Qué se ve | Por qué |
|---|---|---|
| **Ryu** | Su mano y un vaso en la barra de un bar | No enseña la cara. Es el único al que la app le apareció sola. |
| **Kenta** | Selfie haciéndose el malote | |
| **Lara** | Sándwich, su perro | No sale ella. Es lo que elegiría. |
| **Reiko** | Bailando | Lo que dejó de hacer. |

**El álbum, en marcha.** 26 fotos en 16 escenas. Descontando el archivo
vacío, la foto repetida a propósito y la puerta que sale dos veces:
**23 imágenes base + 2 gemelas pintadas = 25**. Las otras cuatro
«gemelas» las hace el motor o reutilizan otra imagen: contar fotos con
versión corrupta no es contar encargos.

### 3.4 Herramientas

- **`tools/procesa_arte.py`** — quita el croma y recorta. Se arregló un
  fallo que borraba las marcas de emoción: al podar componentes sueltos
  se quedaba con la mancha mayor, y la burbuja o la exclamación
  flotante también son manchas sueltas.
- **`tools/criba_chibi.py`** — filtro de aceptación. Comprueba
  encuadre, marco, tono de piel contra el arte pintado, y dispersión de
  piel dentro del conjunto. Cada umbral lleva escrito de dónde sale.
- **`tools/procesa_ui.py`** — piezas de interfaz.
- **`tools/comprueba_guardado.js`** — la red de `state.js`: guardar,
  cargar y comprobar que vuelve lo mismo, más una huella de la forma
  del guardado. Verificado que **salta** ante un cambio de forma real y
  que **no** salta ante un comentario.

---

## 4. Las decisiones, con su motivo

**No deshacerlas sin hablarlo.**

| Decisión | Qué evita |
|---|---|
| El chibi es **sólo para stickers** | 27 piezas del jugador que ya no se encargan |
| El **arte final lo dibujan personas** | Pulir imágenes que se van a redibujar |
| El **álbum va en el registro del reparto** | Que la anomalía se lea como diferencia de estilo |
| La referencia es el **diseño de personaje**, no el avatar | Manos y brazos colados en escenas sin gente |
| **Todo está pintado**, también las fotos | El perro fotorrealista que descuadraba todo |
| El **creador de personaje** se dibuja por código | Encargar arte de algo que el jugador combina |
| El arte se pide **siempre a `portraits.js`** | Que `assets/` incompleto rompa la interfaz |

Las dos que más han cambiado el proyecto:

**El arte de personajes lo dibuja una artista real, ya confirmada**, y
el objetivo es que con el tiempo todo el arte sea de artistas. Lo que
hay en `assets/` son bocetos para poder ver el juego montado. Eso baja
el listón de cada imagen a «se entiende la idea» y sube el del encargo,
que es lo que de verdad se le pasa a alguien.

**El álbum va en el mismo registro que el reparto.** Las escenas de
prueba salieron en fondo de anime realista tipo Shinkai y quedaban bien
sueltas, y aun así están mal: las fotos no son decoración, son pruebas.
Si están pintadas por otra mano que los personajes, el jugador atribuye
la rareza al estilo y no al mundo — piensa «estas se ven distintas» en
vez de «aquí pasa algo».

---

## 5. Lo aprendido pidiendo arte

Está entero en `art-crudo/DECISIONES.md`. Lo que más ahorra:

**Una prohibición no gana contra el sujeto.** Tres veces falló lo
mismo, con la prohibición escrita en mayúsculas en el mismo prompt:

| Qué se pidió | Qué se coló |
|---|---|
| «Que la **sombra** haga la foto» | Un hombre entero de pie, con cara |
| «Un **konbini** de noche» | Pepsi, Coca-Cola, «CUP NOODLES» |
| «Una **foto** hecha con el móvil» | Marco de polaroid, inclinación, y la mano del fotógrafo |

Si lo que no quieres es parte de lo que has pedido, cambia lo que
pides.

**Cuándo parar.** Cuando cada tanda sale peor que la anterior, o cuando
el mismo fallo se repite tres veces. En la sombra de Ryu se gastaron
tres tandas en algo que ya se había entendido en la primera.

**Y nunca reparar a mano una imagen generada.** Es provisional y se va
a redibujar.

---

## 6. Huecos conocidos

Cosas que faltan y que no son obvias.

### El álbum no tiene por dónde entrar

**`photo()` en `src/engine/art.js` sólo sabe dibujar SVG.** No existe
el equivalente de `portraits.js` para las fotos: los personajes tienen
capa de resolución con respaldo automático, el álbum no.

Consecuencia práctica: **aunque se aprueben las 23 imágenes, hoy no hay
manera de meterlas en el juego.** Hace falta:

1. Un campo en `data/photos.js` que apunte al fichero.
2. Que `photo()` lo use y caiga en la escena SVG si falta.
3. Volver a medir las coordenadas de `luna` y `dup`, que están tomadas
   sobre el SVG actual y no valdrán sobre una imagen pintada.

Es trabajo de motor, no de arte, y **conviene hacerlo antes de generar
las 23**, no después.

⚠️ **Ya hay dos imágenes aprobadas —`ryu_ramen` y `kenta_cat`— esperando
a que esto exista.** Cuanto más se tarde, más imágenes aprobadas se
acumulan sin poder comprobarse dentro del juego, que es donde de verdad
se ve si funcionan. **Es el siguiente paso.**

### Lo que no verifica nadie

`tools/comprueba_guardado.js` cubre `state.js`, y la comprobación de
renderizado cubre `art.js` + `data/photos.js`. Fuera quedan
`conditions.js`, `story.js` y la lista de stickers de `chat.js`. Fue
deliberado — nadie los está tocando — pero conviene saberlo antes de
tocarlos.

### Las fechas no dan los años

El registro interno guarda la edad al entrar, y restando salen los años
que llevan dentro: Ryu 6, Kenta 5, Lara 1, Reiko recién llegada. Pero
las cuatro fechas de ingreso caben en diez meses. Se arregla moviendo
las fechas, y para eso falta saber **en qué año transcurre el juego**,
que no está escrito en ningún sitio.

### No hay ningún C-01

Los sujetos van del C-02 al C-05. O significa algo, o es un hueco.

---

## 7. El plan

### Ahora — terminar el álbum

1. **Construir la entrada de arte del álbum** (hueco de arriba). Antes
   de generar, no después.
2. ~~Relanzar `kenta_cat`.~~ **Hecha y aprobada**, igual que
   `ryu_ramen`. Las dos escenas de prueba están cerradas.
3. **Las 21 escenas restantes**, en tandas de dos o tres. La receta
   está validada con las dos, y las reglas que costaron están en
   `DECISIONES.md`: el sujeto manda sobre la prohibición, la referencia
   es el diseño de personaje y no el avatar, y el registro se comprueba
   abriendo los `portrait.png`.
4. **Las 2 gemelas pintadas** (`ryu_fw` y `kenta_room`). Las otras
   cuatro ya las hace el código.

Cada tanda cuesta una vuelta de conversación: `cdn.openart.ai` no llega
desde la sesión, así que el agente lanza y Gabriela descarga el zip y
se lo pasa. Por eso se lanzan dos o tres y no veintitrés.

### Después — el arte de personajes

El encargo está escrito con los números reales: **20 piezas por
personaje, 80 en total**, y a qué tamaño se ve cada cosa (el avatar
sale en un círculo de 34 px cientos de veces por partida).

Orden de entrega, por veces que se ve: **avatares → stickers →
expresiones → retratos → videollamada**. El juego funciona con
`assets/` incompleto, así que se puede entregar por tandas y cada tanda
se ve inmediatamente.

### Al final, a propósito — la historia

Aplazado por decisión de Gabriela: *«Primero quiero salir de todo lo
visual»*. Cuando toque: rehacer la ruta de Kenta, sustituir la de
Reiko, y cambiar de piel a Ryu y a Lara.

---

## 8. Decisiones pendientes de Gabriela

Ninguna bloquea el álbum salvo la primera, y sólo cuando se llegue a
esa foto.

- **`sys_chairs`** — «OCUPACIÓN: 4/4 · PROTOCOLO: LAZO DORADO». Cuatro
  sillones con los cuatro dentro. Es la foto que lo cuenta todo, y no
  está decidido si se les ve la cara.
- **En qué año transcurre el juego.** Bloquea el arreglo de las fechas.
- **Si hacen falta más pieles.** Hoy hay una y no hay selector.
- **Si el C-01 significa algo** o es un descuido.
