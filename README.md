# ASSIST: Connected Hearts

*Conecta con alguien que te entienda.*

Te descargas una app de romance. Creas tu perfil. Conoces a Ryu, Kenta, Lara y
Reiko. Te escriben, te mandan fotos, discuten entre ellos, te caen bien.
Empiezas a tener favoritos.

Y entonces una foto se repite. Y una fecha no cuadra. Y alguien no se acuerda
de algo que te contó la semana pasada.

> El romance es lo primero. El misterio sale de dentro del romance.
> Los personajes están siempre en el centro.

---

## Cómo jugar

No hay que instalar ni compilar nada. Sólo hace falta un servidor local porque
el proyecto usa módulos ES:

```bash
cd ASSIST
python3 -m http.server 8000
# abre http://localhost:8000
```

Vale cualquier alternativa: `npx serve`, la extensión Live Server de VS Code, o
subirlo tal cual a GitHub Pages o Netlify.

> Abrir `index.html` con doble clic **no** funciona: el navegador bloquea los
> módulos ES sobre `file://`.

La partida se guarda sola. Ajustes → *Borrar mi cuenta* la reinicia.

---

## Cómo está montado

El proyecto separa tres capas. **Esto es lo importante si quieres cambiar
cosas sin romper nada.**

```
CÓDIGO   src/engine/   cómo funciona el juego
INTERFAZ src/ui/       cómo se ve
DATOS    data/         qué pasa
```

Puedes reescribir entera la carpeta `src/ui/` sin tocar una línea de la
historia. Y puedes añadir conversaciones, personajes o finales sin abrir
`src/` para nada.

```
index.html            estructura mínima
styles/main.css       identidad visual completa

src/engine/           NO cambies esto para añadir contenido
  state.js            estado, guardado, relaciones, banderas
  story.js            registro de sesiones y reloj ficticio
  chat.js             motor de conversación
  conditions.js       evaluador de requisitos
  portraits.js        resolución de arte (tus imágenes o las generadas)
  art.js              generación de SVG
  audio.js            sonido sintetizado

src/ui/               las pantallas
  shell.js            navegación, cabecera, barra inferior, FASES
  onboarding.js       descarga, instalación y alta
  hub.js              inicio, contactos y fichas
  chat-view.js        bandeja, conversación, puzles, videollamada
  apps.js             álbum, notas, archivos, red, llamadas, ajustes

data/                 AQUÍ es donde se añade contenido
  characters.js       reparto: ficha, arte, etapas, datos desbloqueables
  notifications.js    cómo avisa cada personaje
  photos.js  notes.js  files.js  browser.js  calls.js  endings.js
  story/
    common.js         prólogo, sala común y sucesos del sistema
    ryu.js  kenta.js  lara.js  reiko.js
    filler.js         "Hablar un rato": conversación repetible
    secret.js         ruta secreta
```

---

## Meter tu propio arte

El juego dibuja los retratos por código **sólo mientras no le des los tuyos.**
Para usar tu arte no hay que tocar ningún archivo de programación: se añade un
bloque `art` al personaje en `data/characters.js`.

```js
ryu: {
  ...
  art: {
    avatar:   'assets/characters/ryu/avatar.png',    // chat, listas, avisos
    portrait: 'assets/characters/ryu/portrait.png',  // ficha de personaje
    real:     'assets/characters/ryu/real.png',      // la videollamada final
    expressions: {
      happy: 'assets/characters/ryu/happy.png',
      sad:   'assets/characters/ryu/sad.png'
    }
  }
}
```

Lo que declares se usa; lo que falte cae en el retrato generado. Puedes ir
metiendo arte poco a poco y el juego nunca se queda con un hueco: si una imagen
no carga, vuelve sola al dibujo de respaldo.

Tamaños recomendados:

| | |
|---|---|
| `avatar` | cuadrado, 256×256 |
| `portrait` | vertical, 900×1000 |
| `real` | vertical, 800×1040 |

Las fotos del álbum funcionan igual: añade `file: 'assets/photos/lo-que-sea.jpg'`
a una entrada de `data/photos.js`.

---

## La interfaz cuenta la historia

No hay un "modo terror". Es **la misma aplicación, enfermando.**

Todo el color sale de variables CSS que cuelgan de `<body data-phase>`, y la
fase la marca el avance de la trama:

| Fase | Cuándo | Cómo se ve |
|---|---|---|
| 1 | Romance | Rosa vivo, redondeado, luminoso |
| 2 | Conexión | Igual, un punto menos saturado |
| 3 | Primeras grietas | Colores apagados, líneas de barrido, avisos fantasma |
| 4 | ASSIST | Desaturado y frío, grano, el reloj miente |

Para ver cómo queda cualquier fase sin jugar hasta ella, en la consola del
navegador:

```js
assist.phase(4)   // 0 a 4
```

Los **avisos fantasma** son la pieza clave: a partir de la fase 3 la app avisa
de mensajes que no existen. Se guardan en el centro de notificaciones, así que
el jugador puede volver a mirarlos y comprobar que no se lo ha imaginado.
Se editan en `data/notifications.js`.

---

## Añadir contenido

Una conversación es un objeto. Se registra en `src/main.js` y ya está:

```js
{
  id: 'ryu10',
  channel: 'dm',              // 'dm' | 'group' | 'system'
  char: 'ryu',
  title: 'El muelle',
  day: 26, time: '04:00',
  mood: 'tender',             // ambiente musical
  requires: { done: ['ryu09'], stat: { ryu: { trust: 40 } } },
  preview: '¿Sigues despierta?',
  script: [
    { s: 'ryu', t: 'Hola.', expr: 'happy' },
    { s: 'ryu', photo: 'ryu_fw' },
    { choice: [
      { t: 'Hola.', fx: { ryu: { affinity: 3 } }, then: [
        { s: 'ryu', t: 'Con eso me vale.' }
      ]}
    ]},
    { note: 'n_ryu_fw' },
    { flag: 'ryu_pier' }
  ],
  advance: 30                 // minutos que avanza el reloj
}
```

**Nodos disponibles:** `s`/`t` (mensaje), `me`, `sys` (con `kind:'core'|'alert'`),
`photo`, `sticker`, `day`, `choice`, `if`/`then`/`else`, `puzzle`, `call`,
`ending`, `fx`, `flag`, `note`, `photoUnlock`, `corrupt`, `page`, `cam`,
`evidence`, `bit`, `glitchLevel`, `route`, `open`, `reopen`, `shake`, `flash`,
`wait`, `mood`.

**Un personaje nuevo:** añade una entrada en `data/characters.js` con su ficha,
sus `stages` (las frases que describen vuestra relación) y su `art`. El hub,
los contactos, los avisos y las fichas se generan solos.

**Comprobar lo que has añadido**, en la consola:

```js
assist.audit()          // avisa de referencias rotas
assist.skipTo('ryu09')  // salta a una conversación para probarla
```

---

## Progresión

Las cuatro rutas comparten columna vertebral pero no material: **romance →
conexión → apego → rarezas → misterio → despertar → investigación → fuga →
videollamada.**

- **Entrar** en una ruta depende de la cercanía (afinidad y confianza).
- **El final** depende de cómo hayas llevado los momentos que importan
  (romance, despertar y la sospecha que hayas levantado).

La separación es deliberada: nadie se queda sin historia por haber contestado
regular, pero el final bueno hay que ganárselo. Cada personaje tiene además una
conversación repetible ("Hablar un rato") que sube cercanía pero **nunca**
romance, para que la partida no pueda atascarse sin volverse un grindeo.

Comprobado por simulación:

| Jugador | Resultado |
|---|---|
| Siempre la mejor opción | 4/4 finales buenos |
| Siempre la peor opción | 4/4 finales malos, nunca atascado |
| Al azar | mezcla de buenos y malos |

La ruta secreta se abre con **dos finales buenos**.

---

## Contenido

| | |
|---|---|
| Conversaciones | 55 |
| Rutas | 4 × 9 sesiones + ruta secreta |
| Finales | 13 |
| Fotografías | 26, con metadatos que cambian |
| Notas | 19 |
| Archivos | 14, dos cifrados |
| Páginas web | 13, dos con contraseña |
| Assets binarios | **ninguno** |

Todo el arte de respaldo es SVG generado en tiempo real y todo el audio se
sintetiza con WebAudio. El repositorio no contiene ni una imagen ni un mp3
hasta que metas los tuyos.

---

## Accesibilidad

Ajustes permite reducir los efectos visuales (la interfaz se queda en fase 2
como máximo, sin parpadeos ni distorsión, y la historia no cambia), ajustar la
velocidad de los mensajes —incluida instantánea— y silenciar música y efectos
por separado. Se respeta `prefers-reduced-motion`.

---

## Advertencias de contenido

Terror psicológico, experimentación humana, pérdida de memoria, secuestro,
sedación forzada, traición familiar y explotación económica. Sin violencia
gráfica ni sustos de salto: el malestar viene de que te importen los personajes.

---

## Nota

ASSIST Global Solutions, el Protocolo Lazo Dorado y el doctor Alistair R.
Thorne no existen. Los personajes tampoco.

Eso es exactamente lo que diría la aplicación.
