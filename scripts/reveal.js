/*
 * Apparition au défilement : chaque élément .reveal reçoit la classe .up quand il
 * entre à l'écran (styles dans /assets/css/site.css).
 *
 * Chargé avec defer, ce script s'exécute après les scripts de fin de page : les
 * éléments .reveal qu'ils créent (Ludothèque, Photographie) sont donc pris en compte.
 * Sans JavaScript, la règle <noscript> de _includes/head.html les affiche directement.
 */
(function () {
  'use strict';

  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('up'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('up'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  items.forEach(function (el) { io.observe(el); });
})();
