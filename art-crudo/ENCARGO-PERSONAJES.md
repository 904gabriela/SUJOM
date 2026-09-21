# Encargo: los personajes

Para la artista que dibuja al reparto. Quién es cada uno está en
`BIBLIA.md`, que manda sobre cualquier otra cosa escrita.

Cuatro personajes: **Ryu**, **Kenta**, **Lara** y **Reiko**.

## Cuántas piezas son

**20 por personaje, 80 en total.**

| Pieza | Por personaje | Qué es |
|---|---|---|
| Avatar | 1 | La foto de perfil. La que más se ve de todo el juego. |
| Expresiones | 6 | Neutral, contento, tímido, enfadado, triste, sorpresa. |
| Retrato | 1 | La ficha del personaje. Cuerpo o medio cuerpo, vertical. |
| Videollamada | 2 | Dos únicos momentos: asustado y aliviado. |
| Stickers | 10 | 6 de emoción + 4 propios de cada uno. |

## Especificaciones

| Pieza | Fichero | Tamaño | Fondo |
|---|---|---|---|
| Avatar | `avatar.png` | 512×512 | opaco, llena el cuadro |
| Expresiones | `neutral/happy/sad/angry/shocked/shy.png` | 768×768 | transparente |
| Retrato | `portrait.png` | 900×1000 | transparente |
| Videollamada | `real-scared/real-relief.png` | 800×1040 | puede llevar fondo |
| Stickers | ver abajo | alto 384, ancho libre | **transparente** |

Van en `assets/characters/<ryu|kenta|lara|reiko>/`, salvo los stickers,
que van en `assets/stickers/` con el nombre `<personaje>-<pieza>.png`.

## La regla que decide si una pieza sirve

**Casi todo se ve mucho más pequeño de lo que se dibuja.** Estos son
los tamaños reales en pantalla, medidos en el juego:

| Dónde | Tamaño |
|---|---|
| Junto a cada mensaje del chat | **34 px** |
| Medidor de afinidad | 30 px |
| Aviso emergente | 38 px |
| Notificación | 44 px |
| Lista de contactos | 50 px |
| Pantalla de final | 96 px |

El avatar se ve en un círculo de 34 px cientos de veces por partida.
Eso quiere decir que **la cara tiene que llenar el cuadro**: un plano
general precioso a 34 px es una mancha. Se recorta en círculo, así que
lo que toque las esquinas se pierde.

Los stickers son la excepción: se ven a **140 px de alto**, que da
para el cuerpo entero y para que se lea la marca de emoción flotando.

## Los stickers

Seis de emoción, iguales para los cuatro:

    neutral · contento · timido · enfadado · triste · sorpresa

Y cuatro propios de cada uno, que son lo que los hace suyos:

| | | | | |
|---|---|---|---|---|
| **Ryu** | `movil` | `fuera` | `pulgar` | `dormido` |
| **Kenta** | `senala` | `tira` | `suelo` | `ramen` |
| **Lara** | `sandwich` | `graba` | `corazon` | `desmayo` |
| **Reiko** | `aplauso` | `bebe` | `jade` | `unas` |

Los nombres de fichero son esos, sin acentos ni eñes, porque el código
los pide así. `data/stickers` no existe: la lista está en
`src/engine/chat.js`.

Tono: **monigote feo y gracioso**, no *cute*. El chiste es que cada
uno sea reconociblemente él haciendo algo muy suyo.

## En qué orden conviene entregarlas

El juego funciona con `assets/` incompleto: lo que falta se dibuja por
código automáticamente, así que se puede ir metiendo arte poco a poco
sin romper nada. Por eso el orden que más rinde es por veces que se
ve:

1. **Los 4 avatares.** Cambian la cara del juego entero de golpe.
2. **Los 40 stickers.** Es lo que se ve durante toda la conversación.
3. **Las 24 expresiones.** Ilustran los momentos importantes.
4. **Los 4 retratos.** Una pantalla, pero grande.
5. **Las 8 de videollamada.** Se ven una vez cada una — y son el
   clímax, así que son las que más aguantan esperar y las que menos
   perdonan quedar regular.

## Lo que ya hay

En `assets/` están las 80 piezas **generadas con IA**. No son arte
final: son bocetos para poder ver el juego montado y decidir
encuadres. Sirven como referencia visual del tono y del plano, no como
modelo a copiar.

Lo que sí hay que respetar de ellas es lo técnico: el encuadre, el
tamaño y el recorte, que están probados en pantalla.

## Dos cosas que ya han salido mal

Por si ahorran una vuelta:

- **La cara a contraluz, o muy pequeña dentro del cuadro.** A 34 px
  desaparece. Se arregla acercando el plano.
- **El tono de piel cambiando entre piezas del mismo personaje.** Una
  pieza sola no canta; las diez juntas en la misma conversación, sí.
  Hay una herramienta que lo mide, `tools/criba_chibi.py`, que avisa
  cuando la dispersión dentro de un conjunto se pasa.
