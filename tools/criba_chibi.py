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
# La piel tiene que ser la del personaje. Una pieza salio con la cara mucho
# mas clara que las demas y ninguna otra medida la distinguia. Se compara
# con el arte pintado, que es la referencia de verdad. Medido sobre la
# tanda de Ryu: las buenas van de 153 a 174 de luz y la clara dio 224,
# con el arte pintado en 168.
LUZ_PIEL = 34


def _piel(a, op):
    from scipy import ndimage
    rgb = a[..., :3]
    piel = op & (rgb[..., 0] > 150) & (rgb[..., 0] > rgb[..., 2] + 25) & (rgb[..., 1] > rgb[..., 2])
    et, k = ndimage.label(piel)
    if k:
        tam = np.bincount(et.ravel())
        tam[0] = 0
        piel = et == tam.argmax()
    return float(np.median(rgb[piel].mean(1))) if piel.sum() > 200 else None


def piel_pintada(personaje):
    """Luz de la piel en el arte pintado del personaje, o None si no hay."""
    from PIL import Image
    ruta = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                        'assets', 'characters', personaje, 'neutral.png')
    if not os.path.exists(ruta):
        return None
    a = np.asarray(Image.open(ruta).convert('RGBA')).astype(np.float32)
    return _piel(a, a[..., 3] > 128)


def revisa(ruta, luz_referencia=None):
    from PIL import Image
    from scipy import ndimage
    im = quita_fondo(ruta)
    arr = np.asarray(im).astype(np.float32)
    a = arr[..., 3] > 128

    # El encuadre se mide sobre el personaje SOLO. Desde que el recorte
    # conserva las marcas de emocion, una exclamacion flotando estira la
    # caja y un cuerpo entero se cuela por busto.
    et, k = ndimage.label(a)
    cuerpo = a
    if k > 1:
        tam = np.bincount(et.ravel())
        tam[0] = 0
        cuerpo = et == tam.argmax()
    ys, xs = np.where(cuerpo)
    figura = (ys.max() - ys.min() + 1) / (xs.max() - xs.min() + 1)
    luz = _piel(arr, a)

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
    if luz_referencia and luz and abs(luz - luz_referencia) > LUZ_PIEL:
        motivos.append(f'la piel esta a {luz:.0f} y el arte pintado a '
                       f'{luz_referencia:.0f}: no es el mismo tono')
    return not motivos, figura, limpio, luz, motivos


def main(argv):
    personaje = None
    if argv and argv[0] in ('ryu', 'kenta', 'lara', 'reiko'):
        personaje = argv.pop(0)
    rutas = []
    for x in argv or ['.']:
        rutas += sorted(glob.glob(os.path.join(x, '*.png'))) if os.path.isdir(x) else [x]
    if not rutas:
        print('no hay nada que cribar')
        return 1

    ref = piel_pintada(personaje) if personaje else None
    if personaje and ref is None:
        print(f'aviso: no encuentro el arte pintado de {personaje}, '
              f'no se comprueba el tono de piel')
    elif ref:
        print(f'piel de {personaje} en el arte pintado: {ref:.0f} de luz\n')

    fallos = 0
    print(f'{"pieza":30} {"alto/ancho":>10} {"marco":>7} {"piel":>6}  veredicto')
    for r in rutas:
        pasa, figura, limpio, luz, motivos = revisa(r, ref)
        print(f'{os.path.basename(r)[:30]:30} {figura:10.2f} {limpio:7.0%} '
              f'{luz if luz else 0:6.0f}  {"pasa" if pasa else "NO"}')
        for x in motivos:
            print(f'{"":40} -> {x}')
        fallos += not pasa
    print(f'\n{len(rutas) - fallos} de {len(rutas)} pasan')
    return 1 if fallos else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
