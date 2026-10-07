"""Bake capsule refraction maps; no browser JavaScript or runtime generation.

Inspired by https://kube.io/blog/liquid-glass-css-svg/.
Run from the repository root: python3 scripts/generate_navbar_glass.py
"""
import base64
import json
import math
from pathlib import Path
import struct
import zlib


def chunk(kind, data):
    return struct.pack('!I', len(data)) + kind + data + struct.pack('!I', zlib.crc32(kind + data))


def capsule(width, height):
    radius = height / 2
    pixels = bytearray()
    for y in range(height):
        pixels.append(0)  # PNG scanline filter
        for x in range(width):
            cx = min(max(x + 0.5, radius), width - radius)
            dx, dy = x + 0.5 - cx, y + 0.5 - radius
            distance = math.hypot(dx, dy)
            depth = radius - distance
            displacement = 0
            if 0 < depth < 12:
                t = max(0.001, depth / 12)
                # Convex squircle profile with a flat, undistorted interior.
                surface = (1 - (1 - t) ** 4) ** 0.25
                slope = (1 - t) ** 3 / (1 - (1 - t) ** 4) ** 0.75
                incidence = math.atan(slope)
                refraction = math.asin(math.sin(incidence) / 1.5)
                displacement = math.tan(incidence - refraction) * (8 + surface * 12)
            factor = min(displacement / 24, 1) / max(distance, 0.001)
            pixels.extend((round(128 - dx * factor * 127), round(128 - dy * factor * 127), 128))
    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', struct.pack('!2I5B', width, height, 8, 2, 0, 0, 0))
    png += chunk(b'IDAT', zlib.compress(bytes(pixels), 9)) + chunk(b'IEND', b'')
    return 'data:image/png;base64,' + base64.b64encode(png).decode()


Path('src/components/navbar-glass-maps.json').write_text(json.dumps({
    'desktop': capsule(672, 62),
    'mobile': capsule(366, 58),
}, indent=2) + '\n')
