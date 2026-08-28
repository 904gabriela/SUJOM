# SUJOM — *Solo un juego otome más*

**by ASSIST**

Una aplicación de citas donde cuatro personas te escriben todos los días.

Te descargas SUJOM esperando un juego. Conoces a Ryu, Kenta, Lara y Reiko.
Charlas con ellos, te mandan fotos, discuten entre sí, te caen bien. Empiezas a
tener favoritos.

Y entonces una foto se repite. Y una fecha no cuadra. Y alguien no se acuerda de
algo que te contó la semana pasada.

> El romance es el corazón. El teléfono es la puesta en escena.
> El misterio es la escalada. El horror es la consecuencia.

---

## Cómo jugar

No hay nada que instalar ni compilar. Hace falta un servidor estático porque el
juego usa módulos ES:

```bash
cd SUJOM
python3 -m http.server 8000
# abre http://localhost:8000
```

Cualquier alternativa vale: `npx serve`, `php -S localhost:8000`, la extensión
Live Server de VS Code, o subirlo tal cual a GitHub Pages / Netlify.

> Abrir `index.html` con doble clic **no** funciona: el navegador bloquea los
> módulos ES sobre `file://`.

La partida se guarda sola en `localStorage`. Ajustes → *Borrar partida* la
reinicia.

---

## Qué hay dentro

| | |
|---|---|
| Conversaciones | 55 sesiones guionizadas |
| Rutas | 4 personajes × 9 sesiones + una ruta secreta |
| Finales | 13 (bueno / neutro / malo por personaje + final secreto) |
| Fotografías | 26, con metadatos que cambian |
| Notas | 19, algunas se contradicen a sí mismas |
| Páginas web | 13, dos protegidas por contraseña |
| Puzles | códigos de fecha, una palabra clave, análisis de imágenes |
| Assets binarios | **ninguno** |

Todo el arte es SVG generado en tiempo real a partir de los datos del personaje
(retratos, chibis, ocho expresiones, fotografías, cámaras de vigilancia), y todo
el audio se sintetiza con WebAudio. El repositorio no contiene ni una imagen ni
un mp3, así que nada se rompe ni pesa.

---

## Estructura

```
index.html            Estructura mínima; todo lo demás se monta en JS
styles/main.css       Identidad visual completa

src/engine/           CÓMO funciona el juego
  state.js            Estado, guardado, relaciones, banderas
  story.js            Registro de sesiones, disponibilidad, reloj ficticio
  chat.js             Motor de conversación (retardos, elecciones, efectos)
  conditions.js       Evaluador de requisitos
  art.js              Generación procedural de SVG
  audio.js            Síntesis de sonido y ambientes

src/ui/               Pantallas
  shell.js            Navegación, avisos, modal, capa de corrupción
  onboarding.js       Portada y creación de perfil
  hub.js              Pantalla principal y fichas de personaje
  chat-view.js        Lista, chat, puzles y videollamadas
  apps.js             Galería, notas, navegador, cámaras, finales, ajustes

data/                 QUÉ pasa
  characters.js       Reparto: arte, ficha y datos desbloqueables
  photos.js  notes.js  browser.js  calls.js  endings.js
  story/
    common.js         Prólogo, sala común y sucesos del sistema
    ryu.js  kenta.js  lara.js  reiko.js
    filler.js         "Hablar un rato": conversación repetible
    secret.js         Ruta secreta
```

El principio de diseño es el del encargo:

> **El código define cómo funciona el juego. Los datos definen qué pasa.**

Añadir una conversación no requiere tocar `src/`.

---

## Añadir contenido

Una sesión es un objeto. Se registra en `src/main.js` y ya está:

```js
{
  id: 'ryu10',
  channel: 'dm',            // 'dm' | 'group' | 'system'
  char: 'ryu',
  title: 'El muelle',
  day: 26, time: '04:00',
  phase: 6,
  mood: 'tender',           // ambiente musical
  requires: { done: ['ryu09'], stat: { ryu: { trust: 40 } } },
  preview: 'Ryu: ¿Sigues despierta?',
  script: [
    { s: 'ryu', t: 'Hola.', expr: 'happy' },
    { s: 'ryu', photo: 'ryu_fw' },
    { choice: [
      { t: 'Hola.', fx: { ryu: { affinity: 3 } }, then: [
        { s: 'ryu', t: 'Ya está. Con eso me vale.' }
      ]}
    ]},
    { note: 'n_ryu_fw' },
    { flag: 'ryu_pier' }
  ],
  advance: 30               // minutos que avanza el reloj ficticio
}
```

**Nodos disponibles:** `s`/`t` (mensaje), `me` (respuesta guionizada), `sys`
(sistema, con `kind:'core'|'alert'`), `photo`, `sticker`, `day`, `choice`,
`if`/`then`/`else`, `puzzle`, `call`, `ending`, `fx`, `flag`, `note`,
`photoUnlock`, `corrupt`, `page`, `cam`, `evidence`, `bit`, `glitchLevel`,
`route`, `open`, `reopen`, `shake`, `flash`, `wait`, `mood`.

**Personajes nuevos:** añade una entrada a `data/characters.js` con su
especificación de arte (color y estilo de pelo, ojos, piel, acento) y sus
`bits`; el arte, las fichas, los avatares y el hub se generan solos. Si debe
aparecer más tarde, dale un `debutFlag`.

**Comprobar el contenido:** en la consola del navegador, `sujom.audit()` avisa
de sesiones vacías o dependencias que no existen. `sujom.skipTo('ryu09')` salta
a una sesión concreta para probarla.

---

## Diseño de la progresión

Las cuatro rutas siguen la misma columna vertebral emocional pero con material
propio: **romance → conexión → apego → pequeñas rarezas → misterio →
descubrimiento → horror → fuga → resolución.**

- **Entrar en una ruta** depende de la cercanía (afinidad y confianza): si has
  hablado mucho con alguien, su ruta se abre.
- **El final** depende de cómo hayas manejado los momentos que importan
  (romance, despertar y la sospecha que hayas levantado en ASSIST-CORE).

Esa separación es deliberada: nadie se queda sin historia por haber contestado
regular, pero el final bueno hay que ganárselo. Cada personaje tiene además una
conversación repetible ("Hablar un rato") que sube cercanía pero **nunca**
romance, para que la partida no pueda atascarse sin convertirse en un grindeo.

Comprobado por simulación (`jugador atento` / `descuidado` / `al azar`):

| Jugador | Resultado |
|---|---|
| Siempre la mejor opción | 4/4 finales buenos |
| Siempre la peor opción | 4/4 finales malos, nunca atascado |
| Al azar | mezcla de buenos y malos |

La ruta secreta se abre con **dos finales buenos**.

---

## Accesibilidad

Ajustes permite reducir los efectos visuales (parpadeos, sacudidas y
distorsión) sin que cambie la historia, ajustar la velocidad de los mensajes
—incluida instantánea— y silenciar música y efectos por separado. La interfaz
respeta `prefers-reduced-motion`.

---

## Advertencias de contenido

Terror psicológico, experimentación humana, pérdida de memoria, secuestro,
sedación forzada, traición familiar y explotación económica. Sin violencia
gráfica ni jumpscares: el malestar viene de que te importen los personajes.

---

## Nota

SUJOM es una obra de ficción. ASSIST Global Solutions, el Protocolo Lazo Dorado
y el doctor Alistair R. Thorne no existen. Los personajes tampoco.

Eso es exactamente lo que diría la aplicación.
