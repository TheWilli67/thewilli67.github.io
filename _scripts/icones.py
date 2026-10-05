#!/usr/bin/env python3
"""Reconstruit le sprite d'icônes assets/icons.svg et _data/icons.yml.

Le site n'utilise pas Font Awesome en ligne : seules les icônes réellement employées sont
copiées dans un sprite SVG local. Pour ajouter une icône :
  1. l'écrire dans une page avec {% include icon.html id='fas-nom' %}
     (fas = solid, far = regular, fab = brands ; nom = celui du site fontawesome.com) ;
  2. lancer, depuis la racine du dépôt :  python _scripts/icones.py

Le script relève les identifiants utilisés dans les pages (.html), télécharge une fois les
métadonnées de Font Awesome Free 6.5.0 (cdn.jsdelivr.net, environ 5 Mo, au moment où le
script tourne : rien n'est chargé par le site) et réécrit le sprite et les largeurs.
Licence des icônes : CC BY 4.0, mentionnée dans le sprite.
"""
import json
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/metadata/icon-families.json"
STYLE = {"fas": "solid", "far": "regular", "fab": "brands"}
USE = re.compile(r"""include icon\.html id=['"](fa[sbr])-([a-z0-9-]+)['"]""")


def used_icons():
    ids = set()
    for p in ROOT.rglob("*.html"):
        if any(part.startswith(".") or part == "_site" for part in p.relative_to(ROOT).parts):
            continue
        for style, name in USE.findall(p.read_text(encoding="utf-8")):
            ids.add((style, name))
    return sorted(ids)


def main():
    ids = used_icons()
    print(f"{len(ids)} icônes utilisées ; téléchargement des métadonnées Font Awesome…")
    with urllib.request.urlopen(SOURCE, timeout=60) as r:
        families = json.load(r)
    index = {}
    for name, v in families.items():
        for style, svg in (v.get("svgs", {}).get("classic") or {}).items():
            for n in [name] + list((v.get("aliases") or {}).get("names", [])):
                index.setdefault((style, n), svg)

    symbols, widths, missing = [], {}, []
    for style, name in ids:
        svg = index.get((STYLE[style], name))
        if not svg:
            missing.append(f"{style}-{name}")
            continue
        paths = svg["path"] if isinstance(svg["path"], list) else [svg["path"]]
        body = "".join(f'<path d="{d}"/>' for d in paths if d)
        symbols.append(f'<symbol id="{style}-{name}" viewBox="0 0 {svg["width"]} 512">{body}</symbol>')
        widths[f"{style}-{name}"] = svg["width"]
    if missing:
        print("Introuvables dans Font Awesome Free 6.5.0 :", ", ".join(missing))
        return 1

    (ROOT / "assets" / "icons.svg").write_text(
        '<svg xmlns="http://www.w3.org/2000/svg">\n'
        '<!-- Icônes : Font Awesome Free 6.5.0 by @fontawesome - https://fontawesome.com\n'
        '     Licence des icônes : CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/).\n'
        '     Sprite limité aux icônes utilisées par le site ; id = style-nom (fas, far, fab). -->\n'
        + "\n".join(symbols) + "\n</svg>\n", encoding="utf-8", newline="\n")
    (ROOT / "_data" / "icons.yml").write_text(
        "# Largeur (viewBox) de chaque icône de assets/icons.svg, lue par _includes/icon.html.\n"
        "# Hauteur toujours 512. Fichier généré avec le sprite : ne pas modifier à la main.\n"
        + "".join(f"{k}: {v}\n" for k, v in sorted(widths.items())), encoding="utf-8", newline="\n")
    print(f"assets/icons.svg et _data/icons.yml réécrits ({len(symbols)} icônes).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
