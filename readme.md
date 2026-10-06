# William Hertrich — Portfolio

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-2563eb?logo=github&logoColor=white)](https://thewilli67.github.io)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/Licence-Tous%20droits%20réservés-red)](#licence)

> Portfolio personnel d'un ingénieur systèmes & réseaux en CDI chez OCI Informatique, diplômé du Master CDSI (Cyberdéfense & Sécurité de l'Information) de l'INSA Hauts-de-France, après deux ans d'alternance chez Réseau-Net.

---

## Aperçu

**[→ Voir sur le site en ligne](https://thewilli67.github.io)**

Site statique HTML/CSS vanilla hébergé sur GitHub Pages, entièrement bilingue (français / anglais). Conçu pour présenter mon parcours académique, mes expériences professionnelles et mes projets techniques dans un format moderne et responsive, dont deux **projets professionnels phares** menés en alternance (refonte GLPI chez SOLINEST et portail d'administration de la supervision chez Réseau-Net) et une page dédiée au **Master CDSI**.

---

## Structure du projet

```
thewilli67.github.io/
│
├── index.html                  # Page d'accueil (hero + compétences + expériences)
├── portfolio.html              # Portfolio (poste actuel, alternances, Master, BUT, SAE, lycée)
├── master.html                 # Master CDSI : parcours S7→S10, alternance, projets, labs, compétences
├── a_propos.html               # À propos (parcours, valeurs, centres d'intérêt)
├── contact.html                # Coordonnées (LinkedIn, CV, e-mail, GitHub)
├── alternance.html             # Hub alternances
├── but.html                    # BUT R&T complet (BUT1 + BUT2 + BUT3)
├── photographie.html           # Galerie photo, générée à partir de _data/galerie.json
├── jeux.html                   # Ludothèque, générée depuis Steam et _data/jeux.yml
├── projet_72h.html             # Projet hydrolienne, Terminale STI2D
├── mentions_legales.html       # Mentions légales (LCEN)
├── Gemfile                     # Prévisualisation locale : même Jekyll que la publication (bundle exec jekyll serve)
│
├── alternance/
│   ├── reseau-net.html         # Détail alternance Réseau-Net (2024–2026)
│   └── solinest.html           # Détail alternance SOLINEST (2022–2024)
│
├── experience/
│   └── oci.html                # Détail poste actuel, OCI Informatique (CDI, depuis 09/2026)
│
├── projets_pro/
│   ├── refonte_glpi.html       # Projet phare SOLINEST, refonte GLPI 9.x → 10.x
│   ├── monitoring_admin.html   # Projet phare Réseau-Net, portail Prometheus/Grafana
│   └── screenshots/            # Captures floutées du portail Monitoring Admin (WebP + vignettes)
│
├── SAE23/
│   ├── SAE23.html              # SAE23, Game Library (EN)
│   ├── SAE23_fr.html           # SAE23, Bibliothèque de jeux (FR)
│   └── SAE23_Documents/        # Captures de la SAE23 (WebP)
│
├── _photos/                    # Originaux de la galerie (déposer les photos ici ; exclu du site)
├── _sources/                   # Originaux des autres images (PNG / JPG avant conversion ; exclu du site)
├── _includes/                  # Morceaux de page communs, insérés par Jekyll (voir « Modifier le site »)
│   ├── head.html               # <head> : méta-données, Open Graph, préchargement de police, CSS et scripts
│   ├── nav.html                # Menu
│   ├── footer.html             # Pied de page
│   └── icon.html               # Icône du sprite SVG
├── assets/
│   ├── css/site.css            # Styles communs : polices, variables, icônes, menu, en-tête, sections, pied de page
│   ├── fonts/                  # Geist et Geist Mono en woff2 variables (un fichier par famille) + licence OFL
│   ├── icons.svg               # Sprite des icônes utilisées (Font Awesome Free, CC BY 4.0)
│   ├── flags/                  # Drapeaux FR / GB du bouton de langue (flag-icons, MIT)
│   └── photos/                 # Versions WebP de la galerie (générées, ne pas modifier)
├── _data/
│   ├── galerie.json            # Versions WebP et dimensions de chaque photo (généré par photos.py)
│   ├── icons.yml               # Largeur de chaque icône du sprite (généré par _scripts/icones.py)
│   ├── photos.yml              # Titres et descriptions facultatifs des photos (FR / EN)
│   ├── jeux.yml                # Ludothèque : jeux terminés, jeux hors Steam, jeux masqués (à la main)
│   └── steam.json              # Bibliothèque Steam, réécrite automatiquement (ne pas modifier)
│
├── scripts/
│   ├── i18n.js                 # Bilinguisme FR / EN, popup de langue, menu mobile
│   └── reveal.js               # Apparition des éléments .reveal au défilement
│
├── .github/
│   ├── workflows/pages.yml       # Action « Publication du site » : photos, synchro Steam, build Jekyll, déploiement
│   ├── scripts/photos.py         # Galerie : EXIF retirés, versions WebP, _data/galerie.json (local ou Action)
│   ├── scripts/requirements.txt  # Dépendance de photos.py (Pillow)
│   ├── scripts/strip_exif.py     # Nettoyage EXIF sans recompression (utilisable en local)
│   └── scripts/steam_sync.py     # Synchronisation de la bibliothèque Steam (Web API)
│
├── _scripts/                   # Utilitaires de maintenance (non servis par GitHub Pages)
│   ├── icones.py               # Reconstruit le sprite d'icônes à partir des icônes utilisées
│   ├── strip_emdash.py         # Retire les tirets cadratins hors titres (voir avertissement)
│   ├── reindent_html.py        # Ré-indentation HTML par profondeur de tag
│   └── reindent_style_js.py    # Ré-indentation CSS/JS dans les blocs <style>/<script>
│
├── Images_photos/              # Portrait (WebP), image de partage (og-image.jpg), illustrations (WebP)
└── documents/                  # CV, certifications et livrables (SAE302, SAE303, SAE502…)
```

---

## Technologies

| Technologie | Usage |
|---|---|
| **HTML5** | Structure sémantique de toutes les pages |
| **CSS3** | Feuille commune `assets/css/site.css` + styles propres à chaque page : variables CSS, Grid, Flexbox, animations |
| **JavaScript vanilla** | Bilinguisme, apparition au défilement, galerie, filtres |
| **Jekyll (GitHub Pages)** | En-tête, menu et pied de page communs (`_includes/`), galerie et Ludothèque (données `_data/`) |
| **GitHub Actions** | Publication du site, photos de la galerie (WebP), synchronisation Steam quotidienne |
| **Steam Web API** | Jeux, temps de jeu, succès et dernier lancement de la Ludothèque |
| **Font Awesome Free 6.5** | Icônes, copiées dans un sprite SVG local (`assets/icons.svg`, CC BY 4.0) |
| **Geist / Geist Mono** | Polices auto-hébergées (`assets/fonts`, SIL OFL 1.1) |

Aucun framework CSS ni bundler, aucune ressource chargée depuis un autre domaine.

---

## Fonctionnalités

- **Design system** ([`DESIGN.md`](DESIGN.md)) : canvas brun-charbon, textes off-white, un seul accent ambre (`#e5a54b`) réservé aux liens, au focus et au bouton principal, Geist / Geist Mono ; jetons et composants communs dans `assets/css/site.css`, contrastes WCAG AA vérifiés sur toutes les surfaces
- **Bilinguisme FR / EN** : attributs `data-fr` / `data-en` traduits par `i18n.js` ; au premier passage, une popup propose la langue (affichée en même temps que la page, sans flash), puis le choix est mémorisé dans le navigateur
- **Transitions de page** : fondu natif du navigateur (View Transitions, en CSS), en simple amélioration et désactivé si le système demande moins d'animations
- **Scroll reveal** : les éléments `.reveal` situés sous l'écran apparaissent au défilement (`reveal.js`) ; rien n'est masqué sans JavaScript ni avec `prefers-reduced-motion`
- **Images légères** : WebP avec `width` / `height` (pas de décalage au chargement), `loading="lazy"` hors du premier écran, portrait prioritaire (`fetchpriority="high"`)
- **Responsive** : breakpoints à 900 px et 600 px, menu burger sur mobile
- **Accessibilité** : lien d'évitement et zone `<main>` sur chaque page, `aria-current` dans le menu, menu mobile utilisable au clavier (Échap pour fermer), fenêtres modales natives (`<dialog>` : langue, visionneuses), onglets du BUT au clavier (flèches, Début, Fin), focus toujours visible
- **Partage sur les réseaux** : balises Open Graph / Twitter et image d'aperçu 1200×630 sur toutes les pages
- **Galerie photo dynamique** : les photos déposées dans `_photos/` apparaissent seules (versions WebP 800 / 1200 px pour la grille, 2048 px pour la visionneuse `←` `→` `Esc`)
- **Ludothèque synchronisée** : bibliothèque Steam mise à jour chaque jour, plus les jeux hors Steam saisis à la main
- **Page Master** : frise S7→S10 dépliable, schéma d'architecture en SVG, labs filtrables par semestre
- **Galerie lightbox custom** sur `projets_pro/monitoring_admin.html` (captures floutées)

---

## Modifier le site

Chaque page commence par un *front matter* lu par Jekyll, puis insère les morceaux communs :

```html
---
title: "Contact"                 # onglet : « William Hertrich — Contact », partage : « William Hertrich · Contact »
description: "Contacter William…"  # moteurs de recherche et aperçu de partage
---
<!DOCTYPE html>
<html lang="fr">
<head>
  {% include head.html %}
  <style>
    /* uniquement ce qui est propre à la page */
  </style>
</head>
<body>
  {% include nav.html active="contact" %}   <!-- accueil | portfolio | apropos | contact -->
  …
  {% include footer.html %}
</body>
</html>
```

| Pour changer… | Modifier |
|---|---|
| Le menu (liens, ordre) | `_includes/nav.html` |
| Le pied de page | `_includes/footer.html` (lien en plus : `{% include footer.html extra_url="…" extra_label="…" %}`) |
| Les polices, l'image de partage, les scripts communs | `_includes/head.html` et `assets/css/site.css` (`@font-face`) |
| Une icône | `{% include icon.html id='fas-nom' %}` (nom du site fontawesome.com) ; nouvelle icône : `python _scripts/icones.py` |
| Une couleur, l'en-tête de page, les titres de section | `assets/css/site.css` (une page peut redéfinir une règle dans sa propre balise `<style>`, chargée après) |

Une page rédigée en anglais ajoute `lang: en` à son front matter (voir `SAE23/SAE23.html`). L'année du pied de page se met à jour seule à chaque publication.

### Textes et traductions

- **Typographie française** (convention de l'Imprimerie nationale) : apostrophe `’`, `&nbsp;` avant « : » et à l'intérieur des guillemets `«&nbsp;…&nbsp;»`, espace fine insécable `&#8239;` avant ; ! ?, `n°&nbsp;`. En anglais : `’` et guillemets “ ”. Ne pas appliquer ces règles au code, aux sur-titres précédés du prompt `$` (`.ph-eyebrow`, `.hero-eyebrow`) ni aux libellés `//` (`.s-tag`).
- **Attributs d'accessibilité** : la valeur française dans l'attribut, la valeur anglaise dans `data-en-alt`, `data-en-aria-label` ou `data-en-title` (ex. `aria-label="Fermer" data-en-aria-label="Close"`), basculées par `i18n.js`.
- **Noms propres et techniques** : `translate="no"` (étiquettes de technologies, nom dans le menu) pour que les traducteurs automatiques ne les déforment pas.
- **Lien vers un nouvel onglet** : `target="_blank" aria-describedby="nouvel-onglet"` ; le texte « (s’ouvre dans un nouvel onglet) » est dans le pied de page commun.
- **Nombres et dates générés en JavaScript** : `Intl.NumberFormat` / `Intl.DateTimeFormat` (`fr-FR`, `en-GB`), chiffres en `font-variant-numeric: tabular-nums` dans les colonnes.

---

## Ajouter une photo à la galerie

1. Déposer l'original (`.jpg`, `.jpeg`, `.png` ou `.webp`) dans le dossier `_photos/`.
2. Lancer, depuis la racine du dépôt :

   ```bash
   python .github/scripts/photos.py
   ```

   Le script retire les métadonnées de l'original (numéro de série du boîtier, date, réglages…, sans recompression), crée les versions WebP dans `assets/photos/` (800 et 1200 px de large pour la grille, 2048 px pour la visionneuse) et écrit leurs dimensions dans `_data/galerie.json`. Une photo déjà traitée n'est pas recalculée ; les versions d'une photo retirée de `_photos/` sont effacées.
3. Commit + push des trois emplacements (`_photos/`, `assets/photos/`, `_data/galerie.json`).

Si l'étape 2 est oubliée, l'Action **« Publication du site »** lance le même script et commite le résultat : faire alors un **Pull** dans GitHub Desktop avant de pousser à nouveau. Première utilisation en local : `pip install -r .github/scripts/requirements.txt` (Pillow).

Sans autre action, le titre est déduit du nom du fichier (`Coucher de soleil.jpg` → « Coucher de soleil » ; les noms d'appareil comme `IMG_1234.JPG` n'affichent pas de titre). Pour un titre, une description ou une traduction anglaise, ajouter une entrée dans [`_data/photos.yml`](_data/photos.yml), avec le nom exact de l'original : l'ordre de ce fichier est l'ordre d'affichage.

---

## Publication et Ludothèque Steam

Le site est publié par l'Action **« Publication du site »** ([`.github/workflows/pages.yml`](.github/workflows/pages.yml)) à chaque push, tous les jours vers 6 h (heure de Paris) et à la demande (onglet *Actions* → *Publication du site* → *Run workflow*). Elle prépare les photos (`photos.py`), synchronise Steam, construit le site avec Jekyll et le déploie.

> Les commits faits par une Action ne redéclenchent pas la publication « depuis une branche » de GitHub Pages : c'est pour cela que l'Action publie elle-même le site.

### Mise en place (une seule fois)

1. **Source de publication** : *Settings* → *Pages* → *Build and deployment* → *Source* = **GitHub Actions**.
2. **Clé Steam** : la créer sur <https://steamcommunity.com/dev/apikey> (nom de domaine demandé : `thewilli67.github.io`).
3. **Secrets du dépôt** : *Settings* → *Secrets and variables* → *Actions* → *New repository secret* :
   - `STEAM_API_KEY` : la clé Steam ;
   - `STEAM_ID` : le SteamID64 (17 chiffres) ou le nom personnalisé du profil (`steamcommunity.com/id/<nom>`) ;
   - `STEAM_MASQUES` (facultatif) : appids des jeux à masquer sans laisser de trace dans le dépôt, séparés par des virgules.
4. **Confidentialité Steam** : *Profil* → *Modifier le profil* → *Paramètres de confidentialité* → *Détails des jeux* = **Public**.
5. Lancer l'Action une première fois (*Run workflow*) et vérifier la page Ludothèque.

La clé reste dans les secrets GitHub : elle n'apparaît ni dans le code ni sur le site.

### Au quotidien

- **Steam** : rien à faire, temps de jeu, succès et dates se mettent à jour chaque jour.
- **Jeux hors Steam** (Star Citizen…) : modifier les heures dans [`_data/jeux.yml`](_data/jeux.yml), section `hors_steam`.
- **Jeux terminés** : ajouter le jeu dans `termines` avec son `appid` (ses heures et succès viennent de Steam).
- **Masquer un jeu** : avec ta propre clé, l'API renvoie toute la bibliothèque, y compris les jeux privés ou masqués dans Steam. Un jeu masqué est retiré *avant* l'écriture des données : il n'apparaît ni dans `_data/steam.json` ni dans le code source du site.
  - `masques` dans `_data/jeux.yml` : simple, mais la liste est visible dans le dépôt public ;
  - secret `STEAM_MASQUES` : aucune trace dans le dépôt (penser à retaper toute la liste pour la modifier, un secret n'est pas relisible).
- **Heures** : comme le client Steam, le temps affiché inclut le temps joué hors ligne.

---

## Prévisualisation locale

Le site passe par Jekyll (morceaux communs `_includes/`, données `_data/`) : un simple serveur statique (`npx serve .`, `python -m http.server`) afficherait les balises `{% include %}` telles quelles, sans menu, galerie ni Ludothèque. La commande adaptée est `jekyll serve`, qui demande Ruby.

Le [`Gemfile`](Gemfile) fixe la même version que l'Action de publication (gem `github-pages` 232, soit Jekyll 3.10.0) : l'aperçu local est construit comme le site en ligne.

Installation, une seule fois (Windows : [RubyInstaller](https://rubyinstaller.org/), version « Ruby+Devkit ») :

```bash
gem install bundler
bundle install
pip install -r .github/scripts/requirements.txt
```

Avant chaque push :

```bash
python .github/scripts/photos.py   # seulement si des photos ont été ajoutées ou retirées
bundle exec jekyll serve           # puis ouvrir http://localhost:4000
```

Les données de l'Action (`_data/steam.json`, `_data/galerie.json`) sont commitées dans le dépôt : l'aperçu local utilise leur dernière version (faire un Pull pour récupérer la synchronisation Steam du jour).

Journal : historique purgé des métadonnées EXIF le 06/10/2026.

> ⚠️ `_scripts/strip_emdash.py` supprime les tirets cadratins sans les remplacer par une ponctuation, ce qui casse les phrases. Ne pas le relancer tel quel sur des textes contenant des tirets.

---

## Pages et contenu

| Page | Description |
|---|---|
| `index.html` | Hero, compétences techniques, timeline des expériences |
| `portfolio.html` | Vue d'ensemble de tous les projets et formations |
| `master.html` | Master CDSI : parcours, alternance Réseau-Net, 6 projets phares, 18 labs, compétences, référentiels |
| `a_propos.html` | Parcours, valeurs, centres d'intérêt, objectifs |
| `contact.html` | LinkedIn, GitHub, email, CV PDF |
| `photographie.html` | Galerie photo (Canon EOS 600D) |
| `jeux.html` | Ludothèque : bibliothèque Steam synchronisée et jeux hors Steam |
| `experience/oci.html` | Poste actuel : DSI interne OCI, Aruba, VMware, WatchGuard, supervision Zabbix/LibreNMS/NetBox… |
| `alternance/reseau-net.html` | MSP multi-clients, FortiGate, SentinelOne, VMware… |
| `alternance/solinest.html` | Helpdesk, AD, Centreon, migration WS 2016… |
| `projets_pro/refonte_glpi.html` | Refonte GLPI 9.x → 10.x chez SOLINEST : types de demandes, workflow d'attribution, SSO Google Workspace, base de connaissances |
| `projets_pro/monitoring_admin.html` | Portail d'administration de la supervision chez Réseau-Net : stack Prometheus/Grafana pilotée depuis une interface FastAPI + HTMX |
| `but.html` | Toutes les compétences BUT R&T (3 ans, option Cybersécurité) |
| `SAE23/SAE23.html` | Application Django, Game Library (EN) |
| `SAE23/SAE23_fr.html` | Application Django, bibliothèque de jeux vidéo (FR) |
| `projet_72h.html` | Hydrolienne portable, modélisation 3D, Terminale |
| `mentions_legales.html` | Mentions légales conformes à la LCEN |

### Projets professionnels

Deux projets phares menés en alternance sont documentés sur des pages dédiées, accessibles depuis `portfolio.html` (section « Projets professionnels ») et depuis la fiche de l'alternance correspondante.

Les pages restent volontairement au **niveau conceptuel** (architecture, stack, choix d'ingénierie) et n'exposent aucune information sensible sur les infrastructures des employeurs (IPs, hostnames, chemins internes, secrets, identifiants, configurations spécifiques). Les captures d'écran du portail Monitoring Admin sont **floutées** avant publication ; la page Master utilise un schéma dessiné plutôt que des captures des mémoires.

---

## Auteur

**William Hertrich**
Ingénieur Systèmes & Réseaux, OCI Informatique · diplômé du Master CDSI, INSA Hauts-de-France (2026)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-williamhertrich-0a66c2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/williamhertrich-67860-2003)
[![GitHub](https://img.shields.io/badge/GitHub-TheWilli67-24292f?logo=github&logoColor=white)](https://github.com/TheWilli67)
[![Email](https://img.shields.io/badge/Email-william.hertrich%40proton.me-2563eb?logo=protonmail&logoColor=white)](mailto:william.hertrich@proton.me)

---

## Licence

© 2026 William Hertrich, tous droits réservés.
Voir [mentions légales](https://thewilli67.github.io/mentions_legales.html) pour les détails sur la propriété intellectuelle.
