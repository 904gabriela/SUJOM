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
# Album volvio con el 54% de saturacion frente al 7-38% del resto y se comia
# la rejilla. Se ajusta aqui y no en el archivo de origen, para que el arte
# crudo siga intacto. Llamadas estuvo aqui hasta que se repinto: la nueva ya
# viene apagada de serie y volver a rebajarla la dejaba en gris muerto.
AJUSTES = {'album': 0.74}

# Grados que se gira el tono de cada pieza.
#
# Las nueve volvieron amontonadas en dos sitios de la rueda: mensajes,
# llamadas y album entre 2 y 20 grados, y contactos, ajustes y finales
# entre 335 y 347. No es que se parecieran de tono: coincidian tambien en
# luz y en saturacion, o sea en los tres ejes a la vez.
#
# Aqui se reparten con 25 grados de separacion como minimo. Mensajes no se
# toca porque es el nucleo de la pantalla, y archivos casi tampoco porque
# su arena es el neutro de la piel.
# El giro no sirve para todo. Lo que decide no es cuantos grados, sino de
# donde sale la pieza: girar 96 grados finales, que es apagada, la dejo
# perfecta, pero girar 135 llamadas, que estaba saturada, la convirtio en
# verde menta, o sea en la que volvia a gritar. Y girar el rosa de ajustes
# le puso el marco dorado rosa, porque a ese tono la mascara ya no lo
# distingue del cuerpo.
#
# O sea: gira bien lo que ya esta apagado y lejos del dorado. Lo demas se
# repinta. Llamadas y ajustes se repintaron por eso.
GIRO = {
    'album': +15,        #  20 ->  32, de rosa polvoriento a arena dorada
    'finales': -96,      # 346 -> 251, de ciruela a indigo
    'contactos': -15,    # 335 -> 325, malva, un retoque
    'ajustes': +40,      # 247 -> 291, de indigo a violeta
}
# El marco dorado interior lo comparten las nueve, asi que girarlo con el
# resto rompe la familia. Se deja quieto todo lo que sea claro y calido,
# que es justo el marco y el brillo del icono.
TONO_MARCO, ANCHO_MARCO, LUZ_MARCO = 38.0, 34.0, 0.72
# Por debajo de esta saturacion el tono ya no se ve y girarlo no cambia nada.
SAT_MINIMA = 0.10


def rebaja_color(rgba, factor):
    """Acerca los colores a su gris sin tocar el brillo ni el alfa."""
    a = np.asarray(rgba).astype(np.float32)
    rgb = a[..., :3]
    gris = rgb @ np.array([0.299, 0.587, 0.114], np.float32)
    a[..., :3] = gris[..., None] + (rgb - gris[..., None]) * factor
    return Image.fromarray(a.clip(0, 255).astype(np.uint8), 'RGBA')


def _rgb_hsv(rgb):
    """RGB 0-1 a HSV 0-1, vectorizado."""
    mx, mn = rgb.max(-1), rgb.min(-1)
    dif = mx - mn
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    h = np.zeros_like(mx)
    seguro = np.where(dif == 0, 1, dif)
    h = np.where(mx == r, ((g - b) / seguro) % 6, h)
    h = np.where(mx == g, (b - r) / seguro + 2, h)
    h = np.where(mx == b, (r - g) / seguro + 4, h)
    h = np.where(dif == 0, 0, h / 6.0)
    return np.dstack([h, np.where(mx == 0, 0, dif / np.where(mx == 0, 1, mx)), mx])


def _hsv_rgb(hsv):
    h, s, v = hsv[..., 0] * 6.0, hsv[..., 1], hsv[..., 2]
    i = np.floor(h).astype(int) % 6
    f = h - np.floor(h)
    p, q, t = v * (1 - s), v * (1 - s * f), v * (1 - s * (1 - f))
    salida = np.choose(i[..., None], [
        np.dstack([v, t, p]), np.dstack([q, v, p]), np.dstack([p, v, t]),
        np.dstack([p, q, v]), np.dstack([t, p, v]), np.dstack([v, p, q]),
    ])
    return salida


def gira_tono(rgba, grados, nombre=''):
    """Gira el tono de la pieza dejando quieto el marco dorado.

    El peso cae a cero segun un pixel se acerca al dorado (tono 38, claro):
    asi el cuerpo de la tarjeta cambia de color y el marco no.

    Avisa si la pieza esta demasiado apagada para que girarla signifique
    algo: el tono de un gris no se ve, asi que el giro no la mueve. La
    tentacion entonces es subirle la saturacion para que el giro luzca,
    y eso no funciona: amplificar un casi-gris saca neon. Llamadas, a S 4,
    salio con el telefono en amarillo fosforito. Una pieza asi se repinta.
    """
    a = np.asarray(rgba).astype(np.float32)
    hsv = _rgb_hsv(a[..., :3] / 255.0)
    tono = hsv[..., 0] * 360.0
    d = np.abs(tono - TONO_MARCO)
    d = np.minimum(d, 360 - d)
    es_marco = np.clip(1 - d / ANCHO_MARCO, 0, 1) * np.clip(
        (hsv[..., 2] - LUZ_MARCO) / (1 - LUZ_MARCO), 0, 1)

    cuerpo = (np.asarray(rgba)[..., 3] > 128) & (es_marco < 0.5)
    if cuerpo.any():
        sat = float(np.median(hsv[..., 1][cuerpo]))
        if sat < SAT_MINIMA:
            print(f'    AVISO: {nombre or "la pieza"} esta a S {sat:.0%}, '
                  f'demasiado apagada para que el giro se note. Repintala.')

    hsv[..., 0] = (hsv[..., 0] + (grados / 360.0) * (1 - es_marco)) % 1.0
    a[..., :3] = _hsv_rgb(hsv) * 255.0
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
        if nombre in GIRO:
            pieza = gira_tono(pieza, GIRO[nombre], nombre)
        pieza.resize((LADO, LADO), Image.LANCZOS).save(
            os.path.join(DESTINO, f'{nombre}.png'))
        notas = []
        if nombre in AJUSTES:
            notas.append(f'color al {AJUSTES[nombre]:.0%}')
        if nombre in GIRO:
            notas.append(f'tono {GIRO[nombre]:+d}°')
        print(f'  ui/{nombre}.png' + (f'  ({", ".join(notas)})' if notas else ''))
        n += 1
    print(f'\n{n} piezas de interfaz')


if __name__ == '__main__':
    main()
