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
una bien, queda la que si ha fallado de verdad —dos veces— y si separa.
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


def revisa(ruta):
    a = np.asarray(quita_fondo(ruta))[..., 3] > 128
    ys, xs = np.where(a)
    figura = (ys.max() - ys.min() + 1) / (xs.max() - xs.min() + 1)
    motivos = []
    if figura > FIGURA_MAXIMA:
        motivos.append('salio de cuerpo entero, se pidio busto')
    return not motivos, figura, motivos


def main(argv):
    rutas = []
    for x in argv or ['.']:
        rutas += sorted(glob.glob(os.path.join(x, '*.png'))) if os.path.isdir(x) else [x]
    if not rutas:
        print('no hay nada que cribar')
        return 1

    fallos = 0
    print(f'{"pieza":40} {"alto/ancho":>10}  veredicto')
    for r in rutas:
        pasa, figura, motivos = revisa(r)
        print(f'{os.path.basename(r)[:40]:40} {figura:10.2f}  {"pasa" if pasa else "NO"}')
        for x in motivos:
            print(f'{"":40} -> {x}')
        fallos += not pasa
    print(f'\n{len(rutas) - fallos} de {len(rutas)} pasan')
    return 1 if fallos else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
