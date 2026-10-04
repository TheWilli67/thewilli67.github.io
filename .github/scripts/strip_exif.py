#!/usr/bin/env python3
"""Retire les métadonnées des photos (EXIF, XMP, IPTC, commentaires), sans recompression.

JPEG : suppression des segments APP1 (EXIF / XMP), APP13 (IPTC) et COM. Le reste du
fichier est recopié octet pour octet : l'image n'est pas réencodée et ne perd aucune
qualité. Le profil couleur ICC (APP2) est conservé. Si la photo a une orientation
EXIF différente de 1 (photo prise à la verticale), un bloc EXIF minimal contenant
uniquement l'orientation est réinséré pour qu'elle reste affichée dans le bon sens.

PNG : suppression des chunks eXIf, tEXt, zTXt, iTXt et tIME.

Les autres formats sont ignorés. Le script est idempotent : un fichier déjà nettoyé
n'est pas modifié.

Usage : python strip_exif.py <dossier ou fichier> [...]
"""
import struct
import sys
from pathlib import Path

JPEG_EXT = {".jpg", ".jpeg"}
PNG_EXT = {".png"}
PNG_DROP = {b"eXIf", b"tEXt", b"zTXt", b"iTXt", b"tIME"}


def read_orientation(tiff):
    """Return the EXIF orientation stored in IFD0 of a TIFF block, or None."""
    if len(tiff) < 8 or tiff[:2] not in (b"II", b"MM"):
        return None
    bo = "<" if tiff[:2] == b"II" else ">"
    (ifd,) = struct.unpack(bo + "I", tiff[4:8])
    if ifd + 2 > len(tiff):
        return None
    (count,) = struct.unpack(bo + "H", tiff[ifd:ifd + 2])
    for k in range(count):
        entry = tiff[ifd + 2 + 12 * k: ifd + 14 + 12 * k]
        if len(entry) < 12:
            break
        tag, typ = struct.unpack(bo + "HH", entry[:4])
        if tag == 0x0112 and typ == 3:
            return struct.unpack(bo + "H", entry[8:10])[0]
    return None


def minimal_exif(orientation):
    """APP1 segment containing only the orientation tag (little-endian TIFF)."""
    tiff = b"II*\x00" + struct.pack("<I", 8)
    tiff += struct.pack("<H", 1) + struct.pack("<HHIHH", 0x0112, 3, 1, orientation, 0)
    tiff += struct.pack("<I", 0)
    payload = b"Exif\x00\x00" + tiff
    return b"\xff\xe1" + struct.pack(">H", len(payload) + 2) + payload


def strip_jpeg(data):
    if data[:2] != b"\xff\xd8":
        raise ValueError("en-tête JPEG invalide")
    segments = []  # (marker, raw bytes including the FFxx marker)
    orientation = None
    i = 2
    while i < len(data):
        if data[i] != 0xFF:
            raise ValueError(f"marqueur attendu à l'octet {i}")
        while i < len(data) and data[i] == 0xFF:
            i += 1
        marker = data[i]
        i += 1
        if marker in (0xDA, 0xD9):  # début des données image / fin : on recopie tout
            tail = b"\xff" + bytes([marker]) + data[i:]
            break
        if 0xD0 <= marker <= 0xD7 or marker == 0x01:
            segments.append((marker, b"\xff" + bytes([marker])))
            continue
        (length,) = struct.unpack(">H", data[i:i + 2])
        body = data[i + 2:i + length]
        if marker == 0xE1 and body.startswith(b"Exif\x00\x00"):
            orientation = read_orientation(body[6:]) or orientation
        if marker not in (0xE1, 0xED, 0xFE):
            segments.append((marker, b"\xff" + bytes([marker]) + data[i:i + length]))
        i += length
    else:
        raise ValueError("fichier JPEG tronqué")

    out = bytearray(b"\xff\xd8")
    rest = segments
    if segments and segments[0][0] == 0xE0:  # APP0 (JFIF) reste en premier
        out += segments[0][1]
        rest = segments[1:]
    if orientation and orientation != 1:
        out += minimal_exif(orientation)
    for _, raw in rest:
        out += raw
    out += tail
    return bytes(out)


def strip_png(data):
    sig = b"\x89PNG\r\n\x1a\n"
    if data[:8] != sig:
        raise ValueError("en-tête PNG invalide")
    out = bytearray(sig)
    i = 8
    while i < len(data):
        (length,) = struct.unpack(">I", data[i:i + 4])
        ctype = data[i + 4:i + 8]
        chunk = data[i:i + 12 + length]
        if ctype not in PNG_DROP:
            out += chunk
        i += 12 + length
        if ctype == b"IEND":
            break
    return bytes(out)


def process(path):
    ext = path.suffix.lower()
    if ext in JPEG_EXT:
        fn = strip_jpeg
    elif ext in PNG_EXT:
        fn = strip_png
    else:
        return None
    data = path.read_bytes()
    try:
        new = fn(data)
    except ValueError as e:
        print(f"  ignoré  {path} ({e})")
        return False
    if new == data:
        print(f"  propre  {path}")
        return False
    path.write_bytes(new)
    print(f"  nettoyé {path} ({len(data) - len(new)} octets retirés)")
    return True


def main(args):
    if not args:
        print(__doc__)
        return 1
    changed = 0
    for arg in args:
        p = Path(arg)
        files = sorted(f for f in p.rglob("*") if f.is_file()) if p.is_dir() else [p]
        for f in files:
            if process(f):
                changed += 1
    print(f"{changed} fichier(s) modifié(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
