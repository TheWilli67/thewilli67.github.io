#!/usr/bin/env python3
"""Synchronise la bibliothèque Steam (jeux, temps de jeu, succès) dans _data/steam.json.

Variables d'environnement (secrets du dépôt GitHub) :
  STEAM_API_KEY : clé Web API Steam, à créer sur https://steamcommunity.com/dev/apikey
  STEAM_ID      : SteamID64 (17 chiffres) ou nom de profil personnalisé
                  (la partie <nom> de steamcommunity.com/id/<nom>)

Sans ces variables, le script ne fait rien et les données existantes sont conservées.

Jeux masqués : ils sont retirés AVANT l'écriture des données, ils n'apparaissent donc ni
dans _data/steam.json (dépôt public) ni dans le code source du site. Deux sources, cumulées :
  - la liste « masques » de _data/jeux.yml (noms ou appids, visible dans le dépôt public) ;
  - le secret facultatif STEAM_MASQUES (appids séparés par des virgules), pour masquer un
    jeu sans laisser aucune trace dans le dépôt.
Le script n'affiche jamais quels jeux sont masqués, seulement leur nombre.

_data/steam.json n'est réécrit que si les données ont changé (pas de commit inutile).
_data/steam_sync.json reçoit à chaque exécution la date de vérification ; il n'est pas
commité (voir .gitignore) et sert seulement à afficher « mis à jour le … » sur le site.

Données écrites pour chaque jeu :
  appid, name, minutes (temps de jeu total, hors ligne compris, comme dans le client Steam),
  last (dernier lancement, timestamp Unix ou null),
  ach ([succès obtenus, succès totaux] ou null si le jeu n'a pas de succès).
"""
import json
import os
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

API = "https://api.steampowered.com"
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "_data" / "steam.json"
SYNC = ROOT / "_data" / "steam_sync.json"
JEUX = ROOT / "_data" / "jeux.yml"


def norm(name):
    """Same normalisation as jeux.html: lowercase, no accents, letters and digits only."""
    s = unicodedata.normalize("NFD", str(name).lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]+", "", s)


def yaml_masques(text):
    """Return the « masques » list of _data/jeux.yml (PyYAML if available, else a small parser)."""
    try:
        import yaml
        return list((yaml.safe_load(text) or {}).get("masques") or [])
    except ImportError:
        pass
    items, inside = [], False
    for line in text.splitlines():
        line = re.sub(r"\s+#.*$", "", line).rstrip()
        if not inside:
            m = re.match(r"^masques:\s*(.*)$", line)
            if m:
                rest = m.group(1).strip()
                if rest.startswith("["):
                    return [x.strip().strip("'\"") for x in rest.strip("[]").split(",") if x.strip()]
                inside = True
            continue
        if re.match(r"^\S", line):
            break
        m = re.match(r"^\s*-\s*(.+)$", line)
        if m:
            items.append(m.group(1).strip().strip("'\""))
    return items


def load_masks():
    """Set of masked appids (as 'id:<n>') and normalised names."""
    raw = yaml_masques(JEUX.read_text(encoding="utf-8")) if JEUX.exists() else []
    raw += [x for x in re.split(r"[\s,;]+", os.environ.get("STEAM_MASQUES", "")) if x]
    return {f"id:{int(x)}" if str(x).strip().isdigit() else norm(x) for x in raw if str(x).strip()}


def call(method, **params):
    """GET an API method and return the decoded JSON (None on a 4xx without JSON body).

    The URL contains the API key: it is never printed.
    """
    url = f"{API}/{method}/?" + urllib.parse.urlencode(params)
    for attempt in range(4):
        try:
            with urllib.request.urlopen(url, timeout=20) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and attempt < 3:
                time.sleep(3 * (attempt + 1))
                continue
            if 400 <= e.code < 500:
                # GetPlayerAchievements répond 400 pour les jeux sans succès
                try:
                    return json.loads(e.read())
                except ValueError:
                    return None
            raise RuntimeError(f"{method} : erreur HTTP {e.code}") from None
        except (urllib.error.URLError, TimeoutError):
            if attempt < 3:
                time.sleep(3 * (attempt + 1))
                continue
            raise RuntimeError(f"{method} : Steam injoignable") from None


def resolve_steamid(key, value):
    if value.isdigit() and len(value) == 17:
        return value
    res = call("ISteamUser/ResolveVanityURL/v1", key=key, vanityurl=value) or {}
    sid = res.get("response", {}).get("steamid")
    if not sid:
        raise RuntimeError("STEAM_ID introuvable : indiquer le SteamID64 (17 chiffres) "
                           "ou le nom de profil personnalisé")
    return sid


def achievements(key, sid, appid):
    res = call("ISteamUserStats/GetPlayerAchievements/v1", key=key, steamid=sid, appid=appid) or {}
    stats = res.get("playerstats", {})
    items = stats.get("achievements") if stats.get("success") else None
    if not items:
        return None
    return [sum(1 for a in items if a.get("achieved")), len(items)]


def fetch_games(key, sid, masks):
    res = call("IPlayerService/GetOwnedGames/v1", key=key, steamid=sid,
               include_appinfo=1, include_played_free_games=1, format="json") or {}
    raw = res.get("response", {}).get("games", [])
    visible = [g for g in raw
               if f"id:{g['appid']}" not in masks and norm(g.get("name", "")) not in masks]
    if len(visible) != len(raw):
        print(f"  {len(raw) - len(visible)} jeu(x) masqué(s), non écrit(s) dans les données")
    games = []
    for g in visible:
        # Steam affiche le temps en ligne + le temps joué hors ligne (compté à part par l'API)
        minutes = int(g.get("playtime_forever", 0)) + int(g.get("playtime_disconnected", 0))
        games.append({
            "appid": g["appid"],
            "name": g.get("name") or f"App {g['appid']}",
            "minutes": minutes,
            "last": g.get("rtime_last_played") or None,
            "ach": None,
        })
    played = [g for g in games if g["minutes"] > 0]
    for i, g in enumerate(played, 1):
        g["ach"] = achievements(key, sid, g["appid"])
        time.sleep(0.2)
        if i % 20 == 0:
            print(f"  succès récupérés pour {i}/{len(played)} jeux joués")
    games.sort(key=lambda g: (-g["minutes"], g["name"].lower()))
    return games


def main():
    key = os.environ.get("STEAM_API_KEY", "").strip()
    steam_id = os.environ.get("STEAM_ID", "").strip()
    if not key or not steam_id:
        print("Secrets STEAM_API_KEY / STEAM_ID absents : données Steam existantes conservées.")
        return 0

    old = {}
    if OUT.exists():
        old = json.loads(OUT.read_text(encoding="utf-8"))

    sid = resolve_steamid(key, steam_id)
    games = fetch_games(key, sid, load_masks())
    if not games:
        print("::error::Steam n'a renvoyé aucun jeu. Vérifier que la clé API correspond au "
              "compte, et que « Détails des jeux » est public dans la confidentialité du profil "
              "Steam. Données existantes conservées.")
        return 1

    played = sum(1 for g in games if g["minutes"] > 0)
    now = datetime.now(timezone.utc)
    if old.get("games") == games and not old.get("manuel"):
        print(f"Aucun changement ({len(games)} jeux, dont {played} joués).")
    else:
        OUT.write_text(json.dumps({"updated": now.date().isoformat(), "games": games},
                                  ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        print(f"Données Steam mises à jour : {len(games)} jeux, dont {played} joués.")
    SYNC.write_text(json.dumps({"checked": now.isoformat(timespec="minutes")}) + "\n",
                    encoding="utf-8")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except RuntimeError as e:
        print(f"::error::{e}. Données Steam existantes conservées.")
        sys.exit(1)
