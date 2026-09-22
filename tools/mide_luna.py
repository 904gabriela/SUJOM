#!/usr/bin/env python3
"""
mide_luna.py — Encuentra la luna en una foto pintada del álbum.

Por qué existe
--------------
La anomalía `nosun` no pinta una luna: oscurece y aplana la que YA hay
en la imagen, para que parezca una calcomanía pegada. Para eso necesita
saber dónde está, y eso vive en `data/photos.js`, campo:

    luna: [cx, cy, r]

Esas coordenadas están en el espacio del SVG, 160x160, y están medidas
sobre el DIBUJO actual. En cuanto entra una imagen pintada la luna está
en otro sitio, y si nadie vuelve a medirla la anomalía aparece como un
borrón en un trozo de cielo vacío. Ya pasó una vez.

Esto lo mide solo: la mancha compacta más brillante de la mitad
superior.

    python3 tools/mide_luna.py assets/album/ryu_window.jpg

Imprime la línea lista para pegar. Si no está seguro, **lo dice y no
inventa un número**: más vale volver a mirarlo a ojo que meter una
coordenada mala, porque el fallo no se ve hasta que alguien abre esa
foto corrupta dentro del juego.

El `dup` no se mide aquí a propósito. Elegir qué dos trozos de la foto
son «el mismo edificio» es una decisión de composición, no una medida.
"""

import os
import sys

import numpy as np
from PIL import Image

# El lienzo del SVG. Todo se mide aquí para no arrastrar dos escalas.
LADO = 160

# La luna ocupa una parte pequeña del cielo. Las dos que hay escritas a
# mano miden r=8 (ryu_window) y r=12 (reiko_city), así que este rango
# las contiene con holgura por los dos lados. Fuera de aquí no es una
# luna: es un reflejo grande, una farola o un pixel suelto.
R_MIN, R_MAX = 3.0, 30.0

# La luna es redonda. Estos dos filtros tiran lo alargado —una ventana
# encendida, una tira de neón, el canto de un edificio— que es lo que
# más se parece a una luna en brillo y no lo es en forma.
LLENADO_MIN = 0.55   # área / área de su caja: un círculo da ~0.79
PROPORCION = 1.7     # lado largo de la caja / lado corto

# Se prueban umbrales de brillo de más exigente a menos, sólo para
# LOCALIZAR la luna. Se empieza muy arriba porque suele ser lo más
# brillante del cuadro; se baja por si está velada o el cielo lavado.
#
# El tamaño NO se mide con estos umbrales. Un umbral alto se come el
# borde y devuelve una luna más pequeña de la que hay: medida así, una
# de r=12 salía r=10. La anomalía dibuja un círculo de ese radio encima,
# así que quedarse corto deja un anillo brillante alrededor y canta.
PERCENTILES = [99.9, 99.7, 99.5, 99.0, 98.0, 97.0, 95.0]


def manchas(mascara):
    """Grupos de píxeles pegados. Relleno iterativo, sin dependencias."""
    alto, ancho = mascara.shape
    visto = np.zeros_like(mascara, dtype=bool)
    salida = []
    for y0 in range(alto):
        for x0 in range(ancho):
            if not mascara[y0, x0] or visto[y0, x0]:
                continue
            pila, grupo = [(y0, x0)], []
            visto[y0, x0] = True
            while pila:
                y, x = pila.pop()
                grupo.append((y, x))
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < alto and 0 <= nx < ancho \
                            and mascara[ny, nx] and not visto[ny, nx]:
                        visto[ny, nx] = True
                        pila.append((ny, nx))
            salida.append(np.array(grupo))
    return salida


def busca(ruta):
    im = Image.open(ruta).convert('RGB')
    if im.width != im.height:
        print(f'  aviso: {im.width}x{im.height} no es cuadrada; el álbum lo es.')
    im = im.resize((LADO, LADO), Image.LANCZOS)

    # Luminancia perceptual: una luna amarillenta pesa más que un azul
    # del mismo valor en RGB crudo.
    rgb = np.asarray(im, dtype=np.float64)
    luz = 0.2126 * rgb[:, :, 0] + 0.7152 * rgb[:, :, 1] + 0.0722 * rgb[:, :, 2]

    # Sólo la mitad de arriba: la luna está en el cielo. Abajo hay
    # charcos, faros y ventanas que brillan igual o más.
    arriba = luz[: LADO // 2, :]

    fondo = float(np.median(arriba))

    for p in PERCENTILES:
        corte = np.percentile(arriba, p)
        semillas = manchas(arriba >= corte)

        # 1 · Localizar. De todos los núcleos brillantes, el más brillante
        #     que además sea pequeño y redondo.
        semilla = None
        for g in semillas:
            ys, xs = g[:, 0], g[:, 1]
            if not (R_MIN <= (len(g) / np.pi) ** 0.5 <= R_MAX):
                continue
            brillo = float(arriba[ys, xs].mean())
            if semilla is None or brillo > semilla[0]:
                semilla = (brillo, g)
        if semilla is None:
            continue

        # 2 · Medir, a media altura entre el pico de la luna y el cielo de
        #     alrededor. Es donde de verdad se acaba el disco: por encima
        #     se corta el borde, por debajo se traga el halo.
        _, g = semilla
        pico = float(arriba[g[:, 0], g[:, 1]].max())
        media = (pico + fondo) / 2.0
        y0, x0 = int(round(g[:, 0].mean())), int(round(g[:, 1].mean()))
        disco = None
        for cand in manchas(arriba >= media):
            if ((cand[:, 0] == y0) & (cand[:, 1] == x0)).any():
                disco = cand
                break
        if disco is None:
            disco = g

        ys, xs = disco[:, 0], disco[:, 1]
        area = len(disco)
        r = (area / np.pi) ** 0.5
        h = ys.max() - ys.min() + 1
        w = xs.max() - xs.min() + 1

        # 3 · Comprobar la forma sobre el disco entero, no sobre el núcleo.
        #     Aquí es donde se cae una tira de neón o el canto de un
        #     edificio, que de núcleo parecen una luna y de disco no.
        if not (R_MIN <= r <= R_MAX):
            continue
        if max(h, w) / max(1, min(h, w)) > PROPORCION:
            continue
        if area / (h * w) < LLENADO_MIN:
            continue

        return {
            'cx': float(xs.mean()), 'cy': float(ys.mean()), 'r': float(r),
            'brillo': float(arriba[ys, xs].mean()), 'p': p,
            'pico': pico, 'fondo': fondo,
        }
    return None


def main():
    if len(sys.argv) < 2:
        print(__doc__.strip())
        return 2

    fallos = 0
    for ruta in sys.argv[1:]:
        nombre = os.path.basename(ruta)
        if not os.path.exists(ruta):
            print(f'{nombre}: no existe')
            fallos += 1
            continue

        m = busca(ruta)
        print(f'\n{nombre}')
        if not m:
            fallos += 1
            print('  NO LA ENCUENTRO. No me invento la coordenada.')
            print('  Puede ser que el cielo esté lavado, que la luna esté')
            print('  tapada, o que en esta foto no haya. Míralo a ojo y')
            print('  escribe `luna` a mano; el formato es [cx, cy, r] sobre')
            print('  un lienzo de 160x160 con el origen arriba a la izquierda.')
            continue

        cx, cy, r = round(m['cx']), round(m['cy']), round(m['r'])
        print(f'  luna: [{cx}, {cy}, {r}]')
        print(f'  (localizada en el percentil {m["p"]}; medida a media '
              f'altura entre {m["fondo"]:.0f} y {m["pico"]:.0f} de 255)')
        if m['pico'] - m['fondo'] < 40:
            print('  aviso: la luna apenas destaca del cielo. Compruébalo a')
            print('         ojo: con tan poco contraste es fácil que haya')
            print('         cogido una nube o un reflejo.')

    return 1 if fallos else 0


if __name__ == '__main__':
    sys.exit(main())
