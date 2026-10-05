#!/usr/bin/env python3
"""Prépare les photos de la galerie (page photographie.html).

Commande unique, en local comme dans l'Action « Publication du site » :

    python .github/scripts/photos.py

Pour chaque photo du dossier _photos/ (originaux, exclus du site par Jekyll car le nom
commence par « _ ») :
  1. retire les métadonnées du fichier original (EXIF, XMP, IPTC…), sans recompression,
     avec le même traitement que strip_exif.py ;
  2. crée dans assets/photos/ trois versions WebP, jamais plus grandes que l'original :
       <nom>-800.webp et <nom>-1200.webp  (largeur 800 / 1200 px, grille de la galerie)
       <nom>-2048.webp                    (plus grand côté 2048 px, visionneuse)
  3. écrit _data/galerie.json : fichiers et dimensions de chaque version, par nom d'original.

Une photo déjà traitée n'est pas recalculée (empreinte de l'original gardée dans
_data/galerie.json). Les fichiers de assets/photos/ qui ne correspondent plus à aucun
original sont supprimés. Titres, descriptions et ordre : _data/photos.yml.

Dépendance : Pillow  →  pip install -r .github/scripts/requirements.txt
"""
import hashlib
import json
import re
import sys
import unicodedata
from pathlib import Path

from PIL import Image, ImageOps

sys.path.insert(0, str(Path(__file__).resolve().parent))
import strip_exif  # noqa: E402  (même dossier)

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "_photos"
OUT = ROOT / "assets" / "photos"
DATA = ROOT / "_data" / "galerie.json"
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
GRID_WIDTHS = (800, 1200)    # largeur des versions de la grille
LIGHTBOX = 2048              # plus grand côté de la version visionneuse
QUALITY = 80


def slug(name):
    """« Lézard_des_murailles .JPG » → « lezard-des-murailles » (nom de fichier sûr pour une URL)."""
    base = unicodedata.normalize("NFKD", Path(name).stem).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", base.lower()).strip("-") or "photo"


def variants(width, height):
    """Dimensions de chaque version : {"800": (w, h), "1200": (w, h), "2048": (w, h)}."""
    out = {}
    for w in GRID_WIDTHS:
        w2 = min(w, width)
        out[str(w)] = (w2, round(height * w2 / width))
    scale = min(1, LIGHTBOX / max(width, height))
    out[str(LIGHTBOX)] = (round(width * scale), round(height * scale))
    return out


def render(path, base):
    with Image.open(path) as im:
        icc = im.info.get("icc_profile")
        im = ImageOps.exif_transpose(im).convert("RGB")
        entry = {}
        for key, (w, h) in variants(*im.size).items():
            dest = OUT / f"{base}-{key}.webp"
            im.resize((w, h), Image.LANCZOS).save(dest, "WEBP", quality=QUALITY, method=6,
                                                   **({"icc_profile": icc} if icc else {}))
            entry[key] = {"src": f"/assets/photos/{dest.name}", "w": w, "h": h}
        return entry


def main():
    if not SRC.is_dir():
        print(f"Dossier {SRC.relative_to(ROOT)} absent : rien à faire.")
        return 0
    OUT.mkdir(parents=True, exist_ok=True)
    old = json.loads(DATA.read_text(encoding="utf-8")) if DATA.exists() else {}

    originals = sorted(p for p in SRC.iterdir() if p.is_file() and p.suffix.lower() in EXTENSIONS)
    data, used_slugs, kept = {}, set(), set()
    created = 0
    for path in originals:
        strip_exif.process(path)
        sha1 = hashlib.sha1(path.read_bytes()).hexdigest()
        base = slug(path.name)
        n = 2
        while base in used_slugs:
            base, n = f"{slug(path.name)}-{n}", n + 1
        used_slugs.add(base)

        prev = old.get(path.name)
        files_ok = prev and all((ROOT / v["src"].lstrip("/")).exists()
                                for k, v in prev.items() if k != "sha1")
        same_names = prev and all(Path(v["src"]).name.startswith(base + "-")
                                  for k, v in prev.items() if k != "sha1")
        if prev and prev.get("sha1") == sha1 and files_ok and same_names:
            entry = {k: v for k, v in prev.items() if k != "sha1"}
        else:
            entry = render(path, base)
            created += 1
            print(f"  WebP créés : {path.name}")
        data[path.name] = {"sha1": sha1, **entry}
        kept.update(Path(v["src"]).name for v in entry.values())

    removed = 0
    for f in OUT.glob("*.webp"):
        if f.name not in kept:
            f.unlink()
            removed += 1
            print(f"  supprimé (plus d'original) : {f.name}")

    text = json.dumps(data, ensure_ascii=False, indent=1) + "\n"
    if not DATA.exists() or DATA.read_text(encoding="utf-8") != text:
        DATA.write_text(text, encoding="utf-8", newline="\n")
    print(f"{len(originals)} photo(s) ; {created} recalculée(s) ; {removed} fichier(s) obsolète(s) supprimé(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
