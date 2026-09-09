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

# Cuanto se rebaja el color de una pieza, 1.0 = tal cual salio del pincel.
# Llamadas y album volvieron con el doble de saturacion que las demas
# (77% y 54% frente al 7-38% del resto) y se comian la rejilla. Se ajustan
# aqui y no en el archivo de origen, para que el arte crudo siga intacto.
AJUSTES = {'llamadas': 0.52, 'album': 0.74}


def rebaja_color(rgba, factor):
    """Acerca los colores a su gris sin tocar el brillo ni el alfa."""
    a = np.asarray(rgba).astype(np.float32)
    rgb = a[..., :3]
    gris = rgb @ np.array([0.299, 0.587, 0.114], np.float32)
    a[..., :3] = gris[..., None] + (rgb - gris[..., None]) * factor
    return Image.fromarray(a.clip(0, 255).astype(np.uint8), 'RGBA')


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
        if nombre in AJUSTES:
            pieza = rebaja_color(pieza, AJUSTES[nombre])
        pieza.resize((LADO, LADO), Image.LANCZOS).save(
            os.path.join(DESTINO, f'{nombre}.png'))
        print(f'  ui/{nombre}.png' + (
            f'  (color al {AJUSTES[nombre]:.0%})' if nombre in AJUSTES else ''))
        n += 1
    print(f'\n{n} piezas de interfaz')


if __name__ == '__main__':
    main()
