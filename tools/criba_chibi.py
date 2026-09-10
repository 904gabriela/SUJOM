"""Criba los stickers del reparto antes de mirarlos uno a uno.

    python3 tools/criba_chibi.py <carpeta o png...>

Comprueba cuatro cosas, y las cuatro estan aqui porque fallaron de verdad:
el encuadre, el marco, el tono de piel contra el arte pintado, y la
dispersion de piel dentro del conjunto.

Hubo una version anterior que tambien media cuatro y no valia ninguna:
sus umbrales salian de las piezas del jugador —cabezas sueltas sobre
croma, con el pelo pedido en azul violaceo— y no sobrevivieron al cambio
a stickers del reparto. Buscaba el pelo por un color que solo tenia el
jugador, daba por mala la linea blanca de recorte que en un sticker se
quiere, y media la piel con un umbral de cabezas sueltas, donde la cara
ocupa el doble que en un busto vestido. Tumbo ocho piezas buenas seguidas.

De ahi la regla que gobierna este archivo: **un umbral solo entra cuando
hay un fallo real detras y un hueco medido que lo separe.** Cada
constante lleva escrito de donde sale.
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
# Y ademas las piezas de un mismo personaje tienen que parecerse ENTRE SI.
# Medido sobre la tanda de memes: Reiko 10 de dispersion, Lara 18, Kenta 33
# y Ryu 70, que es el que canta. Por encima de 25 se nota al verlos juntos.
DISPERSION_MAXIMA = 25


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
    luces = []
    print(f'{"pieza":30} {"alto/ancho":>10} {"marco":>7} {"piel":>6}  veredicto')
    for r in rutas:
        pasa, figura, limpio, luz, motivos = revisa(r, ref)
        print(f'{os.path.basename(r)[:30]:30} {figura:10.2f} {limpio:7.0%} '
              f'{luz if luz else 0:6.0f}  {"pasa" if pasa else "NO"}')
        for x in motivos:
            print(f'{"":40} -> {x}')
        fallos += not pasa
        if luz:
            luces.append((os.path.basename(r), luz))
    print(f'\n{len(rutas) - fallos} de {len(rutas)} pasan')

    # Una pieza puede estar cerca de la referencia y aun asi lejos de sus
    # hermanas. En la tanda de memes, tres piezas de Ryu dieron 144, 149 y
    # 214: las tres pasaron una por una contra un arte pintado en 173, y
    # entre ellas habia 70 niveles. Un sticker no se ve solo, se ve en la
    # misma conversacion que los demas, asi que el conjunto tambien cuenta.
    if len(luces) > 2:
        v = [l for _, l in luces]
        disp = max(v) - min(v)
        print(f'\ndispersion de piel en el conjunto: {disp:.0f} '
              f'(de {min(v):.0f} a {max(v):.0f})')
        if disp > DISPERSION_MAXIMA:
            med = float(np.median(v))
            print(f'  demasiada. Estas se salen de la mediana ({med:.0f}):')
            for n, l in luces:
                if abs(l - med) > DISPERSION_MAXIMA / 2:
                    print(f'    {n[:44]:44} {l:.0f}')
            fallos += 1
    return 1 if fallos else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
