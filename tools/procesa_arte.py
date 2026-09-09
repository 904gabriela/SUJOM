#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Convierte el arte crudo de OpenArt en los assets que pide el juego.

Entrada:  art-crudo/<personaje>-<gesto>.png   (croma verde, sin recortar)
          art-crudo/<personaje>-retrato.png   (cuerpo, fondo blanco o verde)
Salida:   assets/characters/<personaje>/<gesto>.png   busto alineado 1024
          assets/characters/<personaje>/avatar.png    cara 256
          assets/characters/<personaje>/portrait.png  cuerpo entero

Tres pasos por pieza: se quita el croma midiendo el verde real del fondo,
se alinea la cabeza para que al cambiar de gesto la cara no de un salto,
y se recorta el avatar de la propia pieza neutral.

    python3 tools/procesa_arte.py
"""
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage
from skimage.segmentation import flood, watershed  # noqa: F401  (flood: retratos)

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CRUDO = os.path.join(RAIZ, 'art-crudo')
DESTINO = os.path.join(RAIZ, 'assets', 'characters')

PERSONAJES = ['ryu', 'kenta', 'lara', 'reiko']
GESTOS = ['neutral', 'happy', 'shy', 'angry', 'sad', 'shocked']

# como se llaman en la hoja de encargo -> como los pide el juego
ALIAS_ENTRADA = {
    'neutral': 'neutral', 'sonrisa': 'happy', 'sonrojo': 'shy',
    'enfado': 'angry', 'triste': 'sad', 'tristeza': 'sad',
    'sorpresa': 'shocked',
}

LADO_BUSTO = 1024
LADO_AVATAR = 256


# ------------------------------------------------------------------ croma

def _color_fondo(a):
    borde = np.concatenate([a[:6].reshape(-1, 3), a[-6:].reshape(-1, 3),
                            a[:, :6].reshape(-1, 3), a[:, -6:].reshape(-1, 3)])
    return np.median(borde, axis=0)


def quita_fondo(ruta, dentro=52, fuera=115):
    """Deja alfa de verdad. Vale para croma verde y para blanco liso."""
    im = Image.open(ruta).convert('RGB')
    a = np.asarray(im).astype(np.float32)
    fondo = _color_fondo(a)
    verdoso = fondo[1] > fondo[0] + 25 and fondo[1] > fondo[2] + 25

    if verdoso:
        # No se mide la distancia al verde concreto del fondo, sino cuanto
        # tira a verde cada pixel. Asi caen igual el croma brillante y el
        # rim verde oscuro del contorno, mientras que crema, piel, negro y
        # rosa (que nunca tiran a verde) se quedan intactos.
        verdor = a[..., 1] - np.maximum(a[..., 0], a[..., 2])
        alfa = 1.0 - np.clip((verdor - 12) / 30.0, 0, 1)
    else:
        alfa = np.clip((np.sqrt(((a - fondo) ** 2).sum(2)) - dentro)
                       / (fuera - dentro), 0, 1)

    solido = alfa > 0.5
    et, k = ndimage.label(solido)
    if k > 1:                       # fuera motas sueltas
        tam = np.bincount(et.ravel()); tam[0] = 0
        alfa[(et != tam.argmax()) & (et != 0)] = 0

    if not verdoso:
        # Solo en el recorte sobre blanco: ahi hay huecos reales que cerrar.
        # Con croma NO se rellenan: los claros entre mechones quedan
        # encerrados dentro de la silueta y rellenarlos los deja opacos
        # conservando el verde. Eso era la franja verde del pelo.
        alfa[ndimage.binary_fill_holes(alfa > 0.5) & (alfa < 0.5)] = 1.0

    rgb = a.copy()
    if verdoso:
        # lo que quede teñido, al filo, se le baja el verde al mayor de los
        # otros dos canales: sin esto queda un halo de color
        tope = np.maximum(rgb[..., 0], rgb[..., 2])
        exceso = rgb[..., 1] - tope
        m = (alfa > 0.02) & (exceso > 0)
        rgb[..., 1][m] = tope[m]

    return Image.fromarray(
        np.dstack([rgb.clip(0, 255), alfa * 255]).astype(np.uint8), 'RGBA')


# --------------------------------------------------------------- alineado

def mide_cabeza(rgba):
    """(centro x, coronilla y, ancho) medidos sobre el tercio superior."""
    alfa = np.asarray(rgba)[..., 3] > 128
    filas = np.where(alfa.any(1))[0]
    if len(filas) == 0:
        raise ValueError('pieza vacia')
    arriba, abajo = filas[0], filas[-1]
    zona = alfa[arriba:arriba + max(1, int((abajo - arriba) * 0.38))]
    anchos = zona.sum(1)
    i = int(np.argmax(anchos))
    cols = np.where(zona[i])[0]
    return (cols[0] + cols[-1]) / 2, float(arriba), float(anchos[i])


def alinea(rgba, lado=LADO_BUSTO, ancho_cabeza=0.46, coronilla=0.10):
    cx, cy, w = mide_cabeza(rgba)
    k = (lado * ancho_cabeza) / w
    esc = rgba.resize((max(1, round(rgba.width * k)),
                       max(1, round(rgba.height * k))), Image.LANCZOS)
    out = Image.new('RGBA', (lado, lado), (0, 0, 0, 0))
    out.alpha_composite(esc, (round(lado / 2 - cx * k),
                              round(lado * coronilla - cy * k)))
    return out


def recorta_avatar(rgba, lado=LADO_AVATAR, holgura=1.5):
    cx, cy, w = mide_cabeza(rgba)
    caja = w * holgura
    x0, y0 = int(cx - caja / 2), int(cy - caja * 0.10)
    return rgba.crop((x0, y0, int(x0 + caja), int(y0 + caja))) \
               .resize((lado, lado), Image.LANCZOS)


# ------------------------------------------------------------------ curro

def fuentes(pj):
    """Empareja los archivos de art-crudo/ con los gestos del juego."""
    hallado = {}
    if not os.path.isdir(CRUDO):
        return hallado
    for f in sorted(os.listdir(CRUDO)):
        raiz, ext = os.path.splitext(f)
        if ext.lower() not in ('.png', '.jpg', '.jpeg'):
            continue
        partes = raiz.lower().split('-')
        if partes[0] != pj or len(partes) < 2:
            continue
        etiqueta = '-'.join(partes[1:])
        clave = ALIAS_ENTRADA.get(etiqueta, etiqueta)
        hallado[clave] = os.path.join(CRUDO, f)
    return hallado


def main():
    if not os.path.isdir(CRUDO):
        sys.exit(f'no existe {CRUDO}: crea la carpeta y mete el arte crudo')

    total = 0
    for pj in PERSONAJES:
        src = fuentes(pj)
        if not src:
            print(f'{pj}: nada en art-crudo/, saltado')
            continue
        salida = os.path.join(DESTINO, pj)
        os.makedirs(salida, exist_ok=True)

        base = None
        for gesto in GESTOS:
            if gesto not in src:
                print(f'  {pj}/{gesto}: falta')
                continue
            pieza = alinea(quita_fondo(src[gesto]))
            pieza.save(os.path.join(salida, f'{gesto}.png'))
            if gesto == 'neutral' or base is None:
                base = pieza
            total += 1
            print(f'  {pj}/{gesto}.png')

        if base is not None:
            recorta_avatar(base).save(os.path.join(salida, 'avatar.png'))
            print(f'  {pj}/avatar.png')

        if 'retrato' in src:
            quita_fondo(src['retrato']).save(
                os.path.join(salida, 'portrait.png'))
            print(f'  {pj}/portrait.png')

    print(f'\n{total} gestos procesados')


if __name__ == '__main__':
    main()
