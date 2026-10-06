# thewilli67.github.io — règles pour Claude Code

## Contexte
Site perso / portfolio, hébergé sur GitHub Pages (Jekyll par défaut, pas de build custom).
Objectif : site rapide, sobre, style « terminal technique premium ».

## Hiérarchie des sources (en cas de conflit, la plus haute gagne)
1. Accessibilité et performance (skill web-design-guidelines) : non négociable.
2. DESIGN.md : seule source pour couleurs, polices, tokens, styles de composants.
   Ne jamais inférer ni inventer un autre langage visuel.
3. taste-skill (design-taste-frontend, redesign-existing-projects) : qualité de
   composition, espacement, hiérarchie, motion, dans les limites du DESIGN.md.

## Performance (priorité haute)
- Site 100 % statique HTML/CSS, aucun framework ni étape de build.
- JS vanilla uniquement si indispensable, chargé en defer. Pas de GSAP ni librairie d'animation.
- Objectif Lighthouse ≥ 95 sur les 4 axes, mobile compris.
- Polices woff2 auto-hébergées : Geist et Geist Mono en version variable, un seul fichier
  woff2 par famille (graisses utilisées : 400, 500 et 600), font-display: swap, preload de Geist uniquement.
- Images WebP/AVIF avec width/height explicites et loading="lazy" hors premier écran.
- Animations CSS uniquement (transform/opacity), toujours avec prefers-reduced-motion.

## Règles
- Pas de nouvelle dépendance externe (CDN, script, police distante) sans me demander.
- Ne pas modifier _config.yml, CLAUDE.md ni DESIGN.md sans me demander.
- Contenu en français, ne pas réécrire mes textes sans validation.

## Workflow d'une passe de refonte
1. Audit avec web-design-guidelines : liste priorisée des problèmes, sans modifier.
2. Attendre ma validation.
3. Refonte avec redesign-existing-projects, en appliquant DESIGN.md.
4. Ré-audit web-design-guidelines sur les fichiers modifiés et résumé des changements.