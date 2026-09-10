"""Criba los stickers del reparto antes de mirarlos uno a uno.

    python3 tools/criba_chibi.py <carpeta o png...>

Comprueba una sola cosa, y es a proposito.

La version anterior media cuatro: la piel, el pelo, la linea blanca del
borde y una banda de brillo. Todos aquellos umbrales salian de las piezas
del jugador —cabezas sueltas sobre croma, con el pelo pedido en azul
violaceo— y ninguno sobrevive al cambio a stickers del reparto:

  - el pelo se buscaba por color, y cada personaje tiene el suyo;
  - la linea blanca se daba por mala, y en un sticker se quiere;
  - la piel ocupaba mucho en una cabeza suelta y poco en un busto vestido;
  - el brillo medido en la mitad superior de un busto incluye la cara y el
    filo blanco, asi que daba entre 11% y 25% en piezas perfectas.

Puestos a elegir entre un filtro que mide cuatro cosas mal y uno que mide
una bien, quedan las que si han fallado de verdad y si separan.
"""

import sys
import glob
import os

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from procesa_arte import quita_fondo                       # noqa: E402

# Un busto cortado en la cintura es casi cuadrado; una figura de pie es
# mucho mas alta que ancha. Medido sobre trece piezas: los bustos van de
# 1,26 a 1,61 y los dos cuerpos enteros dan 1,83 los dos. El corte va en
# el hueco, que es ancho.
FIGURA_MAXIMA = 1.70
# El marco de la imagen tiene que ser croma y nada mas. Cuando el modelo se
# inventa un panel blanco al lado, o escribe el nombre del personaje —los
# dos han pasado—, el marco deja de ser verde. Medido: las piezas limpias
# dan 100% clavado y la que traia el nombre escrito dio 67%.
MARCO_LIMPIO = 0.97
ANCHO_MARCO = 12


def revisa(ruta):
    from PIL import Image
    a = np.asarray(quita_fondo(ruta))[..., 3] > 128
    ys, xs = np.where(a)
    figura = (ys.max() - ys.min() + 1) / (xs.max() - xs.min() + 1)

    crudo = np.asarray(Image.open(ruta).convert('RGB')).astype(np.float32)
    croma = crudo[..., 1] - np.maximum(crudo[..., 0], crudo[..., 2]) > 40
    marco = np.zeros(croma.shape, bool)
    marco[:ANCHO_MARCO] = marco[-ANCHO_MARCO:] = True
    marco[:, :ANCHO_MARCO] = marco[:, -ANCHO_MARCO:] = True
    limpio = float(croma[marco].mean())

    motivos = []
    if figura > FIGURA_MAXIMA:
        motivos.append('salio de cuerpo entero, se pidio busto')
    if limpio < MARCO_LIMPIO:
        motivos.append('el marco no es croma: hay texto, un panel o una escena')
    return not motivos, figura, limpio, motivos


def main(argv):
    rutas = []
    for x in argv or ['.']:
        rutas += sorted(glob.glob(os.path.join(x, '*.png'))) if os.path.isdir(x) else [x]
    if not rutas:
        print('no hay nada que cribar')
        return 1

    fallos = 0
    print(f'{"pieza":34} {"alto/ancho":>10} {"marco":>7}  veredicto')
    for r in rutas:
        pasa, figura, limpio, motivos = revisa(r)
        print(f'{os.path.basename(r)[:34]:34} {figura:10.2f} {limpio:7.0%}  '
              f'{"pasa" if pasa else "NO"}')
        for x in motivos:
            print(f'{"":40} -> {x}')
        fallos += not pasa
    print(f'\n{len(rutas) - fallos} de {len(rutas)} pasan')
    return 1 if fallos else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
