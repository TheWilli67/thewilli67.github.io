/*
 * Transitions de page : fondu entrant au chargement, fondu sortant avant de
 * suivre un lien interne.
 *
 * - Le fondu sortant ne s'applique qu'aux clics gauches simples vers une page
 *   du site : Ctrl/Cmd/Maj+clic, clic molette, target="_blank", download,
 *   ancres de la page courante, mailto:/tel: et liens externes gardent le
 *   comportement normal du navigateur.
 * - La classe .no-script-execution exclut aussi un lien du fondu.
 * - Au retour arrière (cache bfcache), la page est réaffichée au lieu de
 *   rester invisible.
 * - Sans JavaScript, une règle <noscript> dans chaque page rend le body visible.
 */
(function () {
  'use strict';

  var OUT_DELAY = 400; // ms avant de quitter la page (le fondu CSS dure 0,5 s)
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function show() {
    document.body.classList.remove('fade-out');
    document.body.classList.add('fade-in');
  }

  document.addEventListener('DOMContentLoaded', function () {
    requestAnimationFrame(show);
  });

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) show();
  });

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var link = e.target.closest('a[href]');
    if (!link || link.classList.contains('no-script-execution')) return;
    if (link.hasAttribute('download')) return;
    if (link.target && link.target !== '_self') return;

    var url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return;

    e.preventDefault();
    if (reduceMotion) {
      location.href = url.href;
      return;
    }
    document.body.classList.remove('fade-in');
    document.body.classList.add('fade-out');
    setTimeout(function () { location.href = url.href; }, OUT_DELAY);
  });
})();
