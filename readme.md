# William Hertrich — Portfolio

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-2563eb?logo=github&logoColor=white)](https://thewilli67.github.io)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/Licence-Tous%20droits%20réservés-red)](#licence)

> Portfolio personnel d'un ingénieur systèmes & réseaux en Master CDSI (Cyberdéfense & Sécurité de l'Information) à l'INSA Hauts-de-France, alternant chez Réseau-Net.

---

## Aperçu

**[→ Voir sur le site en ligne](https://thewilli67.github.io)**

Site statique HTML/CSS vanilla hébergé sur GitHub Pages. Conçu pour présenter mon parcours académique, mes expériences professionnelles et mes projets techniques dans un format moderne et responsive.

---

## Structure du projet

```
thewilli67.github.io/
│
├── index.html                  # Page d'accueil (hero + compétences + expériences)
├── portfolio.html              # Portfolio (alternances, Master, BUT, SAE, lycée)
├── a_propos.html               # À propos (parcours, valeurs, centres d'intérêt)
├── contact.html                # Coordonnées et liens
├── alternance.html             # Hub alternances
├── but.html                    # BUT R&T complet (BUT1 + BUT2 + BUT3 fusionnés)
├── projet_72h.html             # Projet hydrolienne — Terminale STI2D
├── mentions_legales.html       # Mentions légales (LCEN)
│
├── alternance/
│   ├── reseau-net.html         # Détail alternance Réseau-Net (2024–2026)
│   └── solinest.html           # Détail alternance SOLINEST (2022–2024)
│
├── SAE23/
│   ├── SAE23.html              # SAE23 — Game Library (EN)
│   └── SAE23_fr.html           # SAE23 — Bibliothèque de jeux (FR)
│
├── scripts/
│   └── animation_page.js       # Transitions fade-in / fade-out entre pages
│
├── Images_photos/              # Photos, illustrations, diagrammes
├── documents/                  # PDF, documents téléchargeables (CV, certifications, SAE)
│
├── BUT1/                       # Pages individuelles BUT1 (legacy, remplacées par but.html)
├── BUT2/                       # Pages individuelles BUT2 (legacy)
└── BUT3/                       # Pages individuelles BUT3 (legacy)
```

---

## Technologies

| Technologie | Usage |
|---|---|
| **HTML5** | Structure sémantique de toutes les pages |
| **CSS3** | Styles embarqués par page — variables CSS, Grid, Flexbox, animations |
| **JavaScript vanilla** | Transitions de page (`animation_page.js`), IntersectionObserver (scroll reveal) |
| **Font Awesome 6.5** | Icônes (CDN) |
| **Inter — Google Fonts** | Police principale |
| **GitHub Pages** | Hébergement statique gratuit |

Aucun framework CSS ni bundler — zéro dépendance de build.

---

## Fonctionnalités

- **Design system cohérent** — variables CSS partagées (`--accent`, `--bg-dark`, `--text-m`…) reproduites sur chaque page
- **Transitions de page** — fondu entrant/sortant via `animation_page.js`
- **Scroll reveal** — apparition progressive des éléments au défilement (IntersectionObserver)
- **Responsive** — breakpoints à 900 px et 600 px, navigation mobile adaptée
- **Bilinguisme SAE23** — version EN et FR avec bouton de basculement
- **Thème par page** — chaque section a sa couleur d'accent (bleu, orange SOLINEST, sky blue Réseau-Net, teal 72h…)

---

## Déploiement local

Aucun serveur requis — ouvrir directement dans un navigateur :

```bash
git clone https://github.com/TheWilli67/thewilli67.github.io.git
cd thewilli67.github.io
# Ouvrir index.html dans le navigateur
```

> Les chemins absolus (`/Images_photos/…`, `/scripts/…`) fonctionnent correctement sur GitHub Pages. En local, préférer un mini-serveur pour éviter les erreurs CORS :
> ```bash
> # Python 3
> python -m http.server 8000
> # Node.js (npx)
> npx serve .
> ```

---

## Pages et contenu

| Page | Description |
|---|---|
| `index.html` | Hero, compétences techniques, timeline des expériences |
| `portfolio.html` | Vue d'ensemble de tous les projets et formations |
| `a_propos.html` | Parcours, valeurs, centres d'intérêt, objectifs |
| `contact.html` | LinkedIn, GitHub, email, téléphone, CV PDF |
| `alternance/reseau-net.html` | MSP multi-clients, FortiGate, SentinelOne, VMware… |
| `alternance/solinest.html` | Helpdesk, AD, Centreon, migration WS 2016… |
| `but.html` | Toutes les compétences BUT R&T (3 ans, option Cybersécurité) |
| `SAE23/SAE23_fr.html` | Application Django — bibliothèque de jeux vidéo |
| `projet_72h.html` | Hydrolienne portable — modélisation 3D, Terminale |
| `mentions_legales.html` | Mentions légales conformes à la LCEN |

---

## Auteur

**William Hertrich**
Alternant Ingénieur Systèmes & Réseaux — Master CDSI, INSA Hauts-de-France

[![LinkedIn](https://img.shields.io/badge/LinkedIn-williamhertrich-0a66c2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/williamhertrich-67860-2003)
[![GitHub](https://img.shields.io/badge/GitHub-TheWilli67-24292f?logo=github&logoColor=white)](https://github.com/TheWilli67)
[![Email](https://img.shields.io/badge/Email-william.hertrich67%40gmail.com-2563eb?logo=gmail&logoColor=white)](mailto:william.hertrich@proton.me)

---

## Licence

© 2026 William Hertrich — Tous droits réservés.
Voir [mentions légales](https://thewilli67.github.io/mentions_legales.html) pour les détails sur la propriété intellectuelle.
