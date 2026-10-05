/*
 * Apparition au défilement des éléments .reveal (styles dans /assets/css/site.css).
 *
 * Seuls les éléments situés sous l'écran au chargement sont masqués (classe
 * .reveal-pending), puis révélés quand ils arrivent à l'écran : le contenu visible
 * dès l'arrivée s'affiche tout de suite, sans attendre ce script. Sans JavaScript, sans
 * IntersectionObserver ou avec prefers-reduced-motion, rien n'est masqué.
 *
 * Chargé avec defer, ce script s'exécute après les scripts de fin de page : les
 * éléments .reveal qu'ils créent (Ludothèque, Photographie) sont donc pris en compte.
 */
(function () {
  'use strict';

  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.remove('reveal-pending');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  var bottom = window.innerHeight;
  document.querySelectorAll('.reveal').forEach(function (el) {
    if (el.getBoundingClientRect().top < bottom) return; /* déjà à l'écran */
    el.classList.add('reveal-pending');
    io.observe(el);
  });
})();
