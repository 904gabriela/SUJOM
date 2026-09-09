# Dónde va cada imagen

Dos destinos distintos según la pieza.

## 1. Gestos y retratos → `art-crudo/` (esta carpeta)

Súbelos **en verde y sin recortar**, tal cual salen de OpenArt. El croma,
el alineado y los avatares los hace `tools/procesa_arte.py`.

Esta carpeta está en el `.gitignore`: entra el crudo, sale procesado a
`assets/`. No engorda el repo.

    ryu-neutral.png      kenta-neutral.png    lara-neutral.png    reiko-neutral.png
    ryu-sonrisa.png      kenta-sonrisa.png    lara-sonrisa.png    reiko-sonrisa.png
    ryu-sonrojo.png      kenta-sonrojo.png    lara-sonrojo.png    reiko-sonrojo.png
    ryu-enfado.png       kenta-enfado.png     lara-enfado.png     reiko-enfado.png
    ryu-triste.png       kenta-triste.png     lara-triste.png     reiko-triste.png
    ryu-sorpresa.png     kenta-sorpresa.png   lara-sorpresa.png   reiko-sorpresa.png
    ryu-retrato.png      kenta-retrato.png    lara-retrato.png    reiko-retrato.png

Luego:

    python3 tools/procesa_arte.py

## 2. Tarjetas de interfaz → `art-crudo/ui-<nombre>.png`

Igual que los gestos, pero las procesa `tools/procesa_ui.py`:

    ui-mensajes.png   ui-contactos.png  ui-album.png
    ui-red.png        ui-notas.png      ui-archivos.png
    ui-llamadas.png   ui-finales.png    ui-ajustes.png

**Ojo con el color del croma.** El recorte borra el fondo midiendo cuánto
tira a verde cada píxel, que es lo que le permite quitar el halo oscuro
del borde y salvar los mechones de pelo. Con una tarjeta verde sobre
croma verde se come el icono: probado, sale con el 0% del cuerpo opaco y
el verde aplanado a gris.

Así que **si la pieza es verde, pídela sobre croma AZUL** (`#0047FF`).
El proceso detecta solo cuál de los dos es y cambia de método; con azul
mide distancia al color del fondo. Llamadas es la primera que va así.

Y que el fondo sea **plano**: un reflejo o un degradado bajo la tarjeta no
se puede quitar, y la pieza sale medio transparente.

## 3. Videollamadas → `assets/characters/<personaje>/`

Estas **no se procesan**: no llevan croma, el fondo oscuro forma parte de
la escena. Van directas, con este nombre exacto:

    assets/characters/ryu/real-relief.png     assets/characters/ryu/real-scared.png
    assets/characters/kenta/real-relief.png   assets/characters/kenta/real-scared.png
    assets/characters/lara/real-relief.png    assets/characters/lara/real-scared.png
    assets/characters/reiko/real-relief.png   assets/characters/reiko/real-scared.png

`relief` es la calle a las cinco de la mañana. `scared` es el pasillo.

## Qué referencia es quién

En OpenArt, por si te lías al identificarlas:

    IMG_9046 → Reiko      IMG_9048 → Lara
    IMG_9047 → Ryu        IMG_9049 → Kenta
