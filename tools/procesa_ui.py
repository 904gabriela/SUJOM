#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Prepara las piezas de interfaz: croma fuera, recorte y tamano de icono.

Entrada:  art-crudo/ui-<nombre>.png   (croma verde)
Salida:   assets/ui/<nombre>.png      (PNG con alfa, 256x256)

Reutiliza la clave por verdor de procesa_arte: mide cuanto tira a verde
cada pixel en vez de la distancia al verde del fondo, que es lo que
permite quitar tanto el croma brillante como el halo oscuro del borde.
"""
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(RAIZ, 'tools'))
from procesa_arte import quita_fondo          # noqa: E402

CRUDO = os.path.join(RAIZ, 'art-crudo')
DESTINO = os.path.join(RAIZ, 'assets', 'ui')
LADO = 256


def recorta_ajustado(rgba, margen=0.03):
    """Recorta al contenido y lo centra en un cuadrado, con un pelo de aire.

    Las tarjetas salen del generador con margenes distintos; sin esto unas
    se verian mas grandes que otras en la rejilla.
    """
    alfa = np.asarray(rgba)[..., 3] > 40
    filas = np.where(alfa.any(1))[0]
    cols = np.where(alfa.any(0))[0]
    if not len(filas) or not len(cols):
        return rgba
    y0, y1, x0, x1 = filas[0], filas[-1], cols[0], cols[-1]
    lado = max(y1 - y0, x1 - x0)
    aire = int(lado * margen)
    lado += aire * 2
    cy, cx = (y0 + y1) // 2, (x0 + x1) // 2
    caja = (cx - lado // 2, cy - lado // 2, cx + lado // 2, cy + lado // 2)
    return rgba.crop(caja)


def main():
    os.makedirs(DESTINO, exist_ok=True)
    n = 0
    for f in sorted(os.listdir(CRUDO)):
        if not f.startswith('ui-') or not f.lower().endswith('.png'):
            continue
        nombre = os.path.splitext(f)[0][3:]
        pieza = recorta_ajustado(quita_fondo(os.path.join(CRUDO, f)))
        pieza.resize((LADO, LADO), Image.LANCZOS).save(
            os.path.join(DESTINO, f'{nombre}.png'))
        print(f'  ui/{nombre}.png')
        n += 1
    print(f'\n{n} piezas de interfaz')


if __name__ == '__main__':
    main()
