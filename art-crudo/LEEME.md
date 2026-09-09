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

## 2. Videollamadas → `assets/characters/<personaje>/`

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
