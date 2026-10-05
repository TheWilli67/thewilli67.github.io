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
├── photographie.html           # Galerie photo, générée à partir du dossier /photo/
├── jeux.html                   # Ludothèque, générée depuis Steam et _data/jeux.yml
├── projet_72h.html             # Projet hydrolienne, Terminale STI2D
├── mentions_legales.html       # Mentions légales (LCEN)
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
│   └── screenshots/            # Captures floutées du portail Monitoring Admin
│
├── SAE23/
│   ├── SAE23.html              # SAE23, Game Library (EN)
│   ├── SAE23_fr.html           # SAE23, Bibliothèque de jeux (FR)
│   └── SAE23_Documents/        # Captures de la SAE23
│
├── photo/                      # Photos de la galerie (ajout automatique, voir plus bas)
├── _includes/                  # Morceaux de page communs, insérés par Jekyll (voir « Modifier le site »)
│   ├── head.html               # <head> : méta-données, Open Graph, polices, CSS et scripts communs
│   ├── nav.html                # Menu
│   └── footer.html             # Pied de page
├── assets/css/site.css         # Styles communs : variables, menu, en-tête de page, sections, pied de page
├── _data/
│   ├── photos.yml              # Titres et descriptions facultatifs des photos (FR / EN)
│   ├── jeux.yml                # Ludothèque : jeux terminés, jeux hors Steam, jeux masqués (à la main)
│   └── steam.json              # Bibliothèque Steam, réécrite automatiquement (ne pas modifier)
│
├── scripts/
│   ├── animation_page.js       # Transitions fondu entrant / sortant entre pages
│   ├── i18n.js                 # Bilinguisme FR / EN, popup de langue, menu mobile
│   └── reveal.js               # Apparition des éléments .reveal au défilement
│
├── .github/
│   ├── workflows/pages.yml       # Action « Publication du site » : EXIF, synchro Steam, build Jekyll, déploiement
│   ├── scripts/strip_exif.py     # Nettoyage EXIF sans recompression (utilisable en local)
│   └── scripts/steam_sync.py     # Synchronisation de la bibliothèque Steam (Web API)
│
├── _scripts/                   # Utilitaires de maintenance (non servis par GitHub Pages)
│   ├── strip_emdash.py         # Retire les tirets cadratins hors titres (voir avertissement)
│   ├── reindent_html.py        # Ré-indentation HTML par profondeur de tag
│   └── reindent_style_js.py    # Ré-indentation CSS/JS dans les blocs <style>/<script>
│
├── Images_photos/              # Photo de profil, image de partage (og-image.jpg), illustrations
└── documents/                  # CV, certifications et livrables (SAE302, SAE303, SAE502…)
```

---

## Technologies

| Technologie | Usage |
|---|---|
| **HTML5** | Structure sémantique de toutes les pages |
| **CSS3** | Feuille commune `assets/css/site.css` + styles propres à chaque page : variables CSS, Grid, Flexbox, animations |
| **JavaScript vanilla** | Transitions, bilinguisme, apparition au défilement, galerie, filtres |
| **Jekyll (GitHub Pages)** | En-tête, menu et pied de page communs (`_includes/`), galerie (liste du dossier `/photo/`) et Ludothèque (données `_data/`) |
| **GitHub Actions** | Publication du site, synchronisation Steam quotidienne, nettoyage EXIF des photos |
| **Steam Web API** | Jeux, temps de jeu, succès et dernier lancement de la Ludothèque |
| **Font Awesome 6.5** | Icônes (CDN) |
| **Inter (Google Fonts)** | Police principale |

Aucun framework CSS ni bundler, zéro dépendance de build.

---

## Fonctionnalités

- **Design system cohérent** : variables CSS (`--accent`, `--bg-dark`, `--text-m`…) et composants communs (menu, en-tête de page, sections, pied de page) définis une seule fois dans `assets/css/site.css`, contrastes conformes WCAG AA sur les fonds sombres
- **Bilinguisme FR / EN** : attributs `data-fr` / `data-en` traduits par `i18n.js` ; au premier passage, une popup propose la langue (affichée en même temps que la page, sans flash), puis le choix est mémorisé dans le navigateur
- **Transitions de page** : fondu entrant/sortant via `animation_page.js`, sans bloquer Ctrl/Cmd+clic, les liens externes ou le retour arrière ; site lisible même sans JavaScript (`<noscript>`)
- **Scroll reveal** : apparition progressive des éléments `.reveal` au défilement (`reveal.js`, IntersectionObserver)
- **Responsive** : breakpoints à 900 px et 600 px, menu burger sur mobile
- **Partage sur les réseaux** : balises Open Graph / Twitter et image d'aperçu 1200×630 sur toutes les pages
- **Galerie photo dynamique** : les photos déposées dans `/photo/` apparaissent seules, avec visionneuse (`←` `→` `Esc`)
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
| Les polices, l'image de partage, les scripts communs | `_includes/head.html` |
| Une couleur, l'en-tête de page, les titres de section | `assets/css/site.css` (une page peut redéfinir une règle dans sa propre balise `<style>`, chargée après) |

Une page rédigée en anglais ajoute `lang: en` à son front matter (voir `SAE23/SAE23.html`). L'année du pied de page se met à jour seule à chaque publication.

---

## Ajouter une photo à la galerie

1. Déposer la photo (`.jpg`, `.jpeg`, `.png` ou `.webp`) dans le dossier `photo/`.
2. Commit + push. La photo apparaît dans la galerie à la prochaine publication GitHub Pages.
3. L'Action **« Publication du site »** retire les EXIF (numéro de série du boîtier, date, réglages…) sans recompresser l'image avant de publier, puis commite les photos nettoyées : faire un **Pull** dans GitHub Desktop avant de pousser à nouveau.

Sans autre action, le titre est déduit du nom du fichier (`Coucher de soleil.jpg` → « Coucher de soleil » ; les noms d'appareil comme `IMG_1234.JPG` n'affichent pas de titre). Pour un titre, une description ou une traduction anglaise, ajouter une entrée dans [`_data/photos.yml`](_data/photos.yml) : l'ordre de ce fichier est l'ordre d'affichage.

Nettoyage manuel possible en local : `python .github/scripts/strip_exif.py photo`.

---

## Publication et Ludothèque Steam

Le site est publié par l'Action **« Publication du site »** ([`.github/workflows/pages.yml`](.github/workflows/pages.yml)) à chaque push, tous les jours vers 6 h (heure de Paris) et à la demande (onglet *Actions* → *Publication du site* → *Run workflow*). Elle nettoie les photos, synchronise Steam, construit le site avec Jekyll et le déploie.

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

## Déploiement local

Toutes les pages passent par Jekyll (en-tête, menu et pied de page communs) : pour un aperçu local, il faut Jekyll, qui demande Ruby.

```bash
git clone https://github.com/TheWilli67/thewilli67.github.io.git
cd thewilli67.github.io
gem install jekyll   # une seule fois, après avoir installé Ruby
jekyll serve         # puis ouvrir http://localhost:4000
```

> Un simple serveur statique (`python -m http.server`) ne suffit plus : les balises `{% include … %}` s'afficheraient telles quelles à la place du menu et du pied de page. Sans Jekyll en local, il suffit de pousser : la publication GitHub Pages construit le site.

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
