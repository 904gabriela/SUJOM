"""Criba las piezas chibi recien pedidas antes de mirarlas una a una.

Cada tanda de OpenArt trae dos variantes por pieza y hay 51 piezas. Mirarlas
todas a ojo es donde se cuelan los fallos, asi que aqui estan los tres que ya
se han colado, cada uno con su medida y su umbral sacado de las piezas que
Gabriela dio por buenas.

    python3 tools/criba_chibi.py <carpeta o png...>
"""

import sys
import glob
import os

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from procesa_arte import quita_fondo                       # noqa: E402

# De las piezas aprobadas: piel 31%, pelo 56%. Las que salieron adultas
# estaban en 46-50% de piel y 42-44% de pelo, asi que el corte va en medio
# pero pegado a lo bueno.
PIEL_MAXIMA = 0.40
PELO_MINIMO = 0.50
# Por debajo de esto no es que haya poca cara: es que la piel no es calida
# y el detector no la encuentra. Paso a paso distinto, aviso distinto.
PIEL_MINIMA = 0.15
# La linea blanca de recorte: en los stickers se quiere, en las piezas del
# jugador no, porque se montan una sobre otra y la linea partiria el cuello.
BORDE_BLANCO = 0.35


def _mascaras(ruta):
    im = quita_fondo(ruta)
    a = np.asarray(im).astype(np.float32)
    op = a[..., 3] > 128
    piel = op & (a[..., 0] > 180) & (a[..., 0] > a[..., 2] + 35) & (a[..., 1] > a[..., 2])
    pelo = op & (a[..., 2] > a[..., 0] + 20)
    return im, a, op, piel, pelo


def _borde_blanco(a, op):
    """Cuanto del filo de la silueta es blanco liso."""
    from scipy import ndimage
    filo = op & ~ndimage.binary_erosion(op, iterations=12)
    if not filo.any():
        return 0.0
    lum = a[..., :3].mean(2)
    sat = a[..., :3].max(2) - a[..., :3].min(2)
    return float(((lum > 235) & (sat < 22))[filo].mean())


def revisa(ruta, jugador=True):
    """Devuelve (pasa, medidas, motivos). `jugador` exige que no haya linea."""
    im, a, op, piel, pelo = _mascaras(ruta)
    m = {
        'piel': piel.sum() / op.sum(),
        'pelo': pelo.sum() / op.sum(),
        'borde': _borde_blanco(a, op),
    }
    motivos = []
    if m['piel'] < PIEL_MINIMA:
        motivos.append(f'piel {m["piel"]:.0%}: no es piel calida, mira el tono')
    elif m['piel'] > PIEL_MAXIMA:
        motivos.append(f'piel {m["piel"]:.0%}: la cara ocupa demasiado, sale adulta')
    if m['pelo'] < PELO_MINIMO:
        motivos.append(f'pelo {m["pelo"]:.0%}: el pelo no domina la silueta')
    if jugador and m['borde'] > BORDE_BLANCO:
        motivos.append(f'borde {m["borde"]:.0%}: lleva linea blanca de recorte')
    return not motivos, m, motivos


def main(argv):
    rutas = []
    for x in argv or ['.']:
        rutas += sorted(glob.glob(os.path.join(x, '*.png'))) if os.path.isdir(x) else [x]
    if not rutas:
        print('no hay nada que cribar')
        return 1

    fallos = 0
    print(f'{"pieza":34} {"piel":>5} {"pelo":>5} {"borde":>6}  veredicto')
    for r in rutas:
        pasa, m, motivos = revisa(r)
        print(f'{os.path.basename(r)[:34]:34} {m["piel"]:5.0%} {m["pelo"]:5.0%} '
              f'{m["borde"]:6.0%}  {"pasa" if pasa else "NO"}')
        for x in motivos:
            print(f'{"":34} -> {x}')
        fallos += not pasa
    print(f'\n{len(rutas) - fallos} de {len(rutas)} pasan')
    return 1 if fallos else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
