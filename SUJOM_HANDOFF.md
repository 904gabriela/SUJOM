# SUJOM — Traspaso

Para un agente nuevo que tiene el repositorio pero no la conversación.
Todo lo que hay aquí está comprobado contra el código, no supuesto.

Rama de trabajo: `claude/sujom-otome-game-uxw5ev`.
Último commit al escribir esto: `b482243`.

> Antes de nada: **`BIBLIA.md` manda.** Cuando el guion y ese documento
> no coincidan, el que está mal es el guion. Este traspaso describe el
> estado técnico; la biblia describe el mundo.

**El proyecto está en español**: el código, los comentarios, los
nombres de fichero de los assets, los documentos y los mensajes de
commit. Sigue igual. Los identificadores internos mezclan español e
inglés por herencia (`happy`, `shocked` conviven con `contento`,
`sorpresa`); no los unifiques, hay ficheros y guion atados a ellos.

---

# 1. PRODUCT GOAL

**ASSIST: Connected Hearts** es un juego otome que finge ser una app de
mensajería. Te descargas la app, creas tu perfil, conoces a cuatro
personajes, te escriben y te caen bien. Y luego una foto se repite, una
fecha no cuadra y alguien no se acuerda de algo que te contó.

Lo que en realidad es: ASSIST observa a alguien en redes, espera a
saber por dónde entra, le anuncia SUJOM de forma dirigida para que
descargarlo parezca idea suya, y acaba conectando su conciencia a una
máquina. Los cuatro personajes ya están dentro. Ellos creen que están
chateando.

**Filosofía central:**

> **Simple en la superficie porque la inteligencia complicada está
> debajo.**

En la práctica eso quiere decir: la pantalla es una app de chat
corriente y agradable. Todo lo raro se cuenta con detalles que el
jugador tiene que notar solo — una luna que no se ha movido, dos
edificios con las mismas ventanas encendidas, un contrato que dice más
de lo que parece. Nunca se explica. El romance va primero; el misterio
sale de dentro del romance.

---

# 2. CURRENT ARCHITECTURE

Esto es lo que hay de verdad hoy. No hay nada planificado descrito como
si existiera.

## No hay build

**No hay `package.json`, ni npm, ni bundler, ni framework.** Son
módulos ES servidos tal cual. Se arranca así:

    python3 -m http.server 8000
    # http://localhost:8000

`node_modules/` aparece sólo en el directorio temporal de trabajo, no
en el repositorio.

## Reparto de responsabilidades

    index.html          Arranque. Carga main.css + piel-noche.css.
    src/main.js         Bootstrap.
    src/ui/             Pantallas: shell, hub, chat-view, apps,
                        onboarding, tienda, album-util.
    src/engine/         Lógica: story, chat, state, conditions,
                        portraits, art, audio, tienda.
    data/               Contenido. Sin lógica.
    data/story/         Las rutas: ryu, kenta, lara, reiko,
                        common, secret, filler.
    tools/*.py          Python. Procesado de arte, no del juego.
    styles/             main.css + piel-noche.css.

Unas 10.500 líneas de JS. Lo más gordo son las cuatro rutas, ~1.000
líneas cada una.

## Las piezas que conviene entender antes de tocar nada

**`src/engine/state.js`** — La partida vive en `localStorage`, clave
`sujom.save.v1`, `SAVE_VERSION = 1`. Si la versión no cuadra, la
partida se descarta. No hay servidor ni base de datos: **todo es
cliente**.

**`src/engine/portraits.js`** — Capa de resolución de arte, y es la
pieza más importante del repositorio para no romper cosas. La interfaz
**nunca** pide una imagen directamente: la pide aquí. Si el personaje
declara un bloque `art` en `data/characters.js`, se usa el fichero; si
falta o falla al cargar, el `<img onerror>` lo sustituye por el SVG
generado por código. Consecuencia práctica: **el juego funciona con
`assets/` vacío**, y se puede ir metiendo arte pieza a pieza sin tocar
una línea de interfaz.

**`src/engine/art.js`** — Dibuja por código, en SVG, los retratos, los
chibis, las 16 escenas del álbum y las cámaras. Es el respaldo de todo
lo anterior y también lo que se ve ahora mismo en el álbum.

**`src/engine/story.js`** — Registro de sesiones, desbloqueos, reloj
interno, fases y no-leídos. `audit()` y `stats()` existen y son útiles
para inspeccionar.

**`src/engine/conditions.js`** — `meets(req)` decide si algo está
desbloqueado; `lockHint()` explica por qué no.

**`src/engine/chat.js`** — Además del chat, aquí vive **la lista de
stickers**, en `EMOCIONES` y `MEMES`. No está en `data/`, que es donde
la buscarías. Si añades un sticker, se declara ahí o no se dibuja.

## Pieles

Hay **una sola**, `styles/piel-noche.css`, y va cargada
incondicionalmente desde `index.html`. **No hay selector de pieles.**
Si alguna nota vieja menciona «lila», «lavanda» o «noche cálida», son
ideas, no código.

---

# 3. IMPORTANT ARCHITECTURAL DECISIONS

Decisiones tomadas, con su motivo. **No deshacerlas sin hablarlo.**

1. **El arte se pide siempre a `portraits.js`**, nunca directamente.
   Es lo que permite mezclar arte real y respaldo generado.

2. **Nada de lo que hay en `assets/` es arte final.** Son bocetos para
   ver el juego montado. El arte de los personajes lo va a dibujar una
   artista real, ya confirmada, y el objetivo es que con el tiempo todo
   el arte sea de artistas. Consecuencia: **no merece la pena pulir una
   imagen generada de personaje**; se va a redibujar. El encargo
   (`art-crudo/ENCARGO-PERSONAJES.md`) sí merece cuidado, porque es lo
   que se le pasa a una persona.

3. **El chibi es sólo para los stickers.** No se encarga arte chibi del
   jugador: ni cabezas, ni ropa, ni vestidor.

4. **El creador de personaje se dibuja por código a propósito** —ocho
   colores de pelo, seis de piel, cuatro peinados— para no encargar
   arte de algo que el jugador combina.

5. **El texto de los documentos del álbum lo pone el código**, desde
   `data/photos.js`. El artista pinta el papel; las palabras las pone
   el motor. Así se corrigen sin volver a encargar nada, y de rebote:
   a 107 px el texto se convierte solo en un bloque ilegible, que es
   justo lo que parece un documento visto de lejos.

6. **Dos anomalías se hacen en código y no se pueden pintar:**
   - `dup` — «dos edificios con las mismas ventanas, píxel por píxel».
     A un pintor le sale *parecido*, y parecido es lo contrario de lo
     que dice la nota. El código copia la región de verdad.
   - `nosun` — la luna que lleva tres semanas sin moverse.

   ⚠️ **Las dos llevan coordenadas en `data/photos.js`** (`luna:
   [cx,cy,r]`, `dup: {de,a}`) **medidas sobre el SVG actual.** En
   cuanto entre arte pintado hay que volver a medirlas o la luna
   aparecerá pegada en un trozo de cielo vacío.

7. **Lo que el jugador tiene que leer como prueba va fuera del filtro
   de corrupción.** El glitch es ambiente; una prueba ilegible no
   prueba nada. Esta regla apareció dos veces: con el texto de los
   documentos y con las anomalías.

8. **Un umbral sólo entra en `tools/criba_chibi.py` cuando hay un fallo
   real detrás y un hueco medido que lo separe.** Una versión anterior
   de ese filtro sacó los umbrales de piezas de otro tipo y tumbó ocho
   piezas buenas seguidas. Cada constante lleva escrito de dónde sale.

9. **Todo es cliente.** No hay servidor, ni base de datos, ni API, ni
   cuentas. La única persistencia es `localStorage`. Si alguna vez hace
   falta backend, es una decisión nueva y grande, no un detalle de
   implementación.

---

# 4. CURRENT TESTS / REGRESSION SUITES

**No hay suite, y sigue sin haberla a propósito.**

- No hay `package.json`, así que **no hay scripts de test**.
- No hay ficheros `*.test.js`, `*.spec.js` ni carpeta de tests.
- No hay runner, ni CI, ni linter configurado.

Hay **una sola comprobación**, y cubre un solo fichero:

    node tools/comprueba_guardado.js

Mira `src/engine/state.js` y nada más. El motivo de que exista sólo
ésa: es el único sitio del proyecto donde un error **destruye un dato
real del jugador, y en silencio**. Si alguien cambia la forma del
guardado y no sube `SAVE_VERSION`, `load()` se lo come sin quejarse y
la partida se pierde sin que nadie se entere. Comprueba cuatro cosas:

1. Que la forma del guardado no ha cambiado a escondidas. Lleva una
   huella (`FORMA_ESPERADA`) del árbol de campos; si la forma cambia y
   `SAVE_VERSION` sigue igual, **falla con código 1**.
2. Ida y vuelta: llena la partida con las funciones públicas, guarda,
   la carga desde una instancia nueva del módulo y compara campo por
   campo.
3. Que una partida de otra versión, o ilegible, se rechaza sin
   reventar.
4. Que el guardado con retardo (220 ms, el que usa casi todo) acaba
   escribiendo.

**`conditions.js`, `story.js`, `chat.js` y la interfaz no los mira
nadie**, y es una decisión de Gabriela, no un descuido: no los está
tocando nadie y lo que viene son 21 escenas de arte. Cuando alguien
vaya a tocar esos sistemas, se cubren entonces. **No montes una suite
ni añadas `package.json`** sin preguntar.

## Cómo se ha verificado el trabajo hasta ahora

Manualmente, y conviene seguir igual mientras no se decida otra cosa:

1. **Comprobación de renderizado** — importar los módulos con `node` y
   comprobar que todo devuelve SVG. Por ejemplo:

       node -e "import('./data/photos.js').then(async m=>{
         const {photo}=await import('./src/engine/art.js');
         for(const id in m.PHOTOS) for(const c of [true,false])
           if(!photo(m.PHOTOS[id],{corrupt:c}).startsWith('<svg')) throw new Error(id);
         console.log('ok');
       })"

   Al escribir esto: **las 26 fotos renderizan limpias y corruptas.**

2. **Captura con Playwright** desde el directorio temporal, montando
   los módulos reales y el CSS real, para mirar el resultado a los
   tamaños de verdad. Chromium está en `/opt/pw-browsers/chromium`.

3. **El juego, en el navegador**, con `python3 -m http.server`.

Montar una suite de verdad es una decisión que **no se ha tomado**.
No la tomes tú sin preguntar.

> Si tocas `src/engine/state.js`, pasa `node tools/comprueba_guardado.js`
> antes de dar nada por bueno. Es la única red que hay.

---

# 5. NEXT TASK — VERY IMPORTANT

> **No empieces rediseñando la arquitectura.** No hace falta, y las
> decisiones de la sección 3 tienen motivo. El trabajo pendiente es de
> contenido, no de estructura.

## Cómo se genera el arte — léelo antes de pedir una imagen

Esto no es opcional para la tarea siguiente, y tiene una limitación que
sorprende:

**No puedes ver las imágenes que generas.** El dominio
`cdn.openart.ai` no es alcanzable desde la sesión (comprobado: la
petición no llega). El bucle real es:

1. Lanzas la generación con la herramienta MCP de OpenArt.
2. **Gabriela** descarga el zip del resultado y te lo manda.
3. Lo descomprimes y *entonces* puedes mirarlo.

O sea que **cada tanda cuesta una vuelta de conversación**. No lances
veintitrés imágenes de golpe: lanza dos o tres, fija el tono con su
visto bueno, y luego produce en serie. Y no describas una imagen que no
has visto como si la hubieras visto.

**Lo que se usa:**

- Modelo `byte-plus-seedream-4-5`, modo `image2image`, 1:1, 2K.
- Referencias de estilo ya subidas a la cuenta — el mapa está en
  `art-crudo/LEEME.md`:

      IMG_9046 → Reiko      IMG_9048 → Lara
      IMG_9047 → Ryu        IMG_9049 → Kenta

  Se pasan **aunque en la imagen no salga nadie**. Es lo que evita que
  el modelo devuelva una foto de verdad, que desentona con todo lo
  demás (`BIBLIA.md`, «Todo está pintado, también las fotos»).

- `tools/procesa_arte.py` quita el croma y recorta.
  `tools/criba_chibi.py <personaje> <carpeta>` criba antes de mirar
  pieza a pieza, y avisa si el tono de piel se dispersa dentro de un
  conjunto.

**El reparto de trabajo:** Gabriela pone y aprueba la dirección de
arte; tú la conviertes en aplicación. Cuando algo es una decisión
suya —el año del juego, si a los cuatro se les ve la cara en
`sys_chairs`— se pregunta, no se elige.

**Los encargos escritos** están en `art-crudo/`:
`ENCARGO-PERSONAJES.md` (lo que se le pasa a la artista),
`ENCARGO-ALBUM.md`, `ENCARGO-CHIBI.md`, `PROMPTS-CHIBI.md` y
`LEEME.md`.

📌 **`art-crudo/DECISIONES.md` es obligatorio antes de pedir una
imagen.** Su sección «La palabra arrastra su equipaje» es la que más
tiempo ahorra: las dos escenas de prueba del álbum se perdieron por
eso, y las dos llevaban la prohibición escrita en mayúsculas en el
mismo prompt. Los encargos dicen *qué* pedir; ése dice *qué ha funcionado
y qué se ha rechazado, con el motivo*. Lleva lo que sólo existía en la
conversación: los cuatro avatares y por qué cada uno es lo que es, los
rechazos con lo que enseñó cada uno, la regla de cuándo parar de
reintentar, y lo que sigue sin decidir. Sin él se repiten errores ya
pagados.

## Lo inmediato: el álbum

El plan está escrito en `art-crudo/ENCARGO-ALBUM.md`. Resumen:

- Son **26 fotos** en `data/photos.js`, en 16 escenas.
- Descontando el archivo vacío, la foto repetida a propósito y la
  puerta que sale dos veces: **23 imágenes base + 6 gemelas
  corruptas**.
- **Hecho ya:** los tres documentos (texto por código) y las dos
  anomalías de código.
- **`ryu_ramen` — generada y RECHAZADA.** Las cuatro versiones salieron
  con marcas comerciales visibles (Pepsi, Coca-Cola, «CUP NOODLES»),
  una con firma y otra con borde blanco torcido, **pese a estar todo
  eso prohibido en el prompt**. El motivo y la salida están en
  `art-crudo/DECISIONES.md`, sección «Lo que no gana una prohibición»:
  hay que cambiar el sujeto, no reforzar la prohibición. **Empieza por
  aquí**, es el siguiente paso concreto.
- **`kenta_cat` — generada y RECHAZADA por encuadre.** El gato está
  bien y el registro también; lo que falla es que dos versiones meten
  una mano o un brazo en cuadro y dos traen borde de polaroid. Hay que
  relanzarla, no repararla.
- **Pendiente:** las 21 escenas restantes. No las lances de golpe.

Receta que funciona, de `ENCARGO-ALBUM.md`: pasar arte pintado de un
personaje como referencia de estilo **aunque en la imagen no salga
nadie** (si no, el modelo devuelve una foto de verdad y desentona con
todo lo demás), y prohibir explícitamente texto, marca de agua, marco
decorativo, borde blanco y efecto polaroid.

## Lo aplazado a propósito

**La historia y el trasfondo**, por decisión de Gabriela: *«Primero
quiero salir de todo lo visual»*. `BIBLIA.md` lista lo que el guion
contradice — la ruta de Kenta hay que rehacerla, la de Reiko es
sustitución entera, Ryu y Lara necesitan cambio de piel. **No lo
empieces sin que te lo pida.**

## Un número que falta y bloquea las fechas

`BIBLIA.md` lo explica: las edades de ingreso dan cinco y seis años
dentro, pero todas las fechas caben en diez meses. Se arregla moviendo
las fechas, y para moverlas hace falta saber **en qué año transcurre el
juego**, que no está escrito en ningún sitio. Es una decisión de
Gabriela.

---

# NEXT AGENT INSTRUCTIONS

1. Read this file.
2. Inspect the current repository.
3. Verify material claims against code before modifying anything.
4. Do not repeat already-completed audits unless evidence contradicts
   the handoff.
5. Continue from NEXT TASK.
6. **Preserva la partida del jugador.** El único dato real que se
   puede destruir es la partida en `localStorage`, clave
   `sujom.save.v1`. Si cambias su forma, sube `SAVE_VERSION` y migra —
   si no, la partida se descarta al cargar y el jugador pierde todo.
7. **Haz commit antes de sobrescribir.** No hay base de datos ni
   migraciones: aquí el trabajo se pierde sobrescribiendo ficheros.
   Antes de tocar `assets/` o de reescribir contenido en `data/`,
   asegura lo que hay.
