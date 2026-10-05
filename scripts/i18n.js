/*
 * Bilinguisme FR / EN, bouton de langue, menu mobile et fenêtre de choix de langue.
 *
 * - Textes : attributs data-fr / data-en (data-i18n-html pour un contenu HTML),
 *   data-href-fr / data-href-en, data-fr-placeholder / data-en-placeholder.
 * - Le choix de langue est mémorisé dans le navigateur (localStorage).
 * - Première visite : une fenêtre modale (<dialog>) propose la langue ; celle du
 *   navigateur (navigator.languages) est appliquée et proposée en premier.
 *   Échap garde cette langue.
 * - Menu mobile (moins de 1100 px) : bouton « Menu » qui affiche ou masque la liste ;
 *   Échap ou un clic à l'extérieur la referme.
 */
(function () {
  'use strict';

  var DEFAULT = 'fr';

  /* ─── Storage (localStorage peut être indisponible, ex. navigation privée) ─── */
  function readStored() {
    try { return localStorage.getItem('lang'); } catch (e) { return null; }
  }
  function writeStored(lang) {
    try { localStorage.setItem('lang', lang); } catch (e) { /* choix non mémorisé */ }
  }

  /* Langue du navigateur, si c'est le français ou l'anglais */
  function detectLang() {
    var list = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i]).slice(0, 2).toLowerCase();
      if (code === 'fr' || code === 'en') return code;
    }
    return DEFAULT;
  }

  var current = readStored() || DEFAULT;

  function getLang() { return current; }

  function setLang(lang) {
    current = lang;
    writeStored(lang);
    showLang(lang);
    closeModal();
    closeMobileNav(false);
  }

  function showLang(lang) {
    document.documentElement.lang = lang;
    applyLang(lang);
    updateToggles(lang);
  }

  /* ─── Apply translations ─── */
  function applyLang(lang) {
    document.querySelectorAll('[data-fr]').forEach(function (el) {
      var val = lang === 'en' ? (el.dataset.en || el.dataset.fr) : el.dataset.fr;
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });
    /* translate href attributes (e.g. SAE23 link switches version) */
    document.querySelectorAll('[data-href-fr]').forEach(function (el) {
      el.href = lang === 'en' ? (el.dataset.hrefEn || el.dataset.hrefFr) : el.dataset.hrefFr;
    });
    /* translate placeholder attributes */
    document.querySelectorAll('[data-fr-placeholder]').forEach(function (el) {
      el.placeholder = lang === 'en'
        ? (el.dataset.enPlaceholder || el.dataset.frPlaceholder)
        : el.dataset.frPlaceholder;
    });
  }

  /* ─── Toggle buttons ─── */
  /* Drapeaux SVG locaux (/assets/flags, d'après flag-icons, licence MIT) */
  function flag(code, cls) {
    return '<img class="' + cls + '" src="/assets/flags/' + code + '.svg" alt="" width="20" height="20">';
  }

  /* Le bouton propose l'autre langue : son nom est écrit dans cette langue (attribut lang). */
  function updateToggles(lang) {
    document.querySelectorAll('.lang-toggle-btn').forEach(function (btn) {
      var label = lang === 'en' ? 'Passer en français' : 'Switch to English';
      btn.innerHTML = flag(lang === 'en' ? 'gb' : 'fr', 'flag');
      btn.title = label;
      btn.setAttribute('aria-label', label);
      btn.setAttribute('lang', lang === 'en' ? 'fr' : 'en');
    });
  }

  /* ─── Mobile nav ─── */
  function injectMobileNav() {
    var nav = document.querySelector('.nav');
    if (!nav || nav.querySelector('.nav-burger')) return;

    var navLinks = document.querySelector('.nav-links');

    /* bouton « Menu » — ajouté dans .nav-links pour être aligné à droite */
    var burger = document.createElement('button');
    burger.type = 'button';
    burger.className = 'nav-burger';
    burger.setAttribute('aria-label', 'Menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'mobile-nav');
    burger.innerHTML =
      '<span class="nb-bar"></span>' +
      '<span class="nb-bar"></span>' +
      '<span class="nb-bar"></span>';
    if (navLinks) navLinks.appendChild(burger);
    else nav.appendChild(burger);

    /* liste mobile, masquée (hidden) tant qu'elle est fermée : ses liens ne reçoivent pas le focus */
    var drawer = document.createElement('div');
    drawer.id = 'mobile-nav';
    drawer.className = 'mobile-nav';
    drawer.hidden = true;

    var ul = document.createElement('ul');
    ul.className = 'mn-list';

    if (navLinks) {
      var ORDER = ['/index.html', '/portfolio.html', '/a_propos.html', '/contact.html'];
      var links = Array.prototype.slice.call(navLinks.querySelectorAll('a'));
      links.sort(function (a, b) {
        var ai = ORDER.indexOf(a.getAttribute('href'));
        var bi = ORDER.indexOf(b.getAttribute('href'));
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      });
      links.forEach(function (a) {
        var li = document.createElement('li');
        var link = a.cloneNode(true);
        link.classList.remove('show');
        li.appendChild(link);
        ul.appendChild(li);
      });
    }

    drawer.appendChild(ul);
    /* juste après le <nav>, pour suivre l'ordre de tabulation */
    nav.parentNode.insertBefore(drawer, nav.nextSibling);

    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (drawer.hidden) openMobileNav();
      else closeMobileNav(false);
    });

    /* close on link click */
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMobileNav(false);
    });

    /* close on outside click */
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !drawer.contains(e.target)) closeMobileNav(false);
    });

    /* Échap : referme et rend le focus au bouton */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.hidden) closeMobileNav(true);
    });
  }

  function openMobileNav() {
    var drawer = document.getElementById('mobile-nav');
    var burger = document.querySelector('.nav-burger');
    if (!drawer || !burger) return;
    drawer.hidden = false;
    burger.classList.add('nb-open');
    burger.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav(returnFocus) {
    var drawer = document.getElementById('mobile-nav');
    var burger = document.querySelector('.nav-burger');
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true;
    if (burger) {
      burger.classList.remove('nb-open');
      burger.setAttribute('aria-expanded', 'false');
      if (returnFocus) burger.focus();
    }
  }

  /* ─── First-visit modal ─── */
  function closeModal() {
    var modal = document.getElementById('lang-modal');
    if (!modal) return;
    modal.classList.remove('lm-visible');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(function () {
      if (modal.open) modal.close();
      if (modal.parentNode) modal.parentNode.removeChild(modal);
      document.documentElement.classList.remove('modal-open');
    }, reduce ? 0 : 420);
  }

  function injectStyles() {
    if (document.getElementById('i18n-styles')) return;
    var s = document.createElement('style');
    s.id = 'i18n-styles';
    s.textContent =
      /* ── Modal : <dialog> plein écran qui sert de fond ── */
      '#lang-modal{position:fixed;inset:0;width:100%;height:100%;max-width:none;max-height:none;' +
      'margin:0;padding:0;border:0;color:inherit;background:rgba(15,23,42,.97);' +
      'display:flex;align-items:center;justify-content:center;overscroll-behavior:contain;' +
      'opacity:0;transition:opacity .4s ease;backdrop-filter:blur(8px);}' +
      '#lang-modal:not([open]){display:none;}' +
      '#lang-modal::backdrop{background:transparent;}' +
      '#lang-modal.lm-visible{opacity:1;}' +
      '.lm-card{background:#1e293b;border:1px solid rgba(255,255,255,.09);' +
      'border-radius:20px;padding:2.75rem 2.25rem;text-align:center;' +
      'box-shadow:0 24px 64px rgba(0,0,0,.55);max-width:360px;width:90%;}' +
      '.lm-avatar{width:66px;height:66px;border-radius:50%;' +
      'background:conic-gradient(from 180deg,#2563eb,#6366f1,#2563eb);' +
      'display:flex;align-items:center;justify-content:center;' +
      'font-size:1.45rem;font-weight:800;color:#fff;margin:0 auto 1.1rem;' +
      'font-family:inherit;box-shadow:0 0 28px rgba(37,99,235,.35);}' +
      '.lm-name{font-size:1.2rem;font-weight:800;color:#f8fafc;' +
      'margin-bottom:.3rem;font-family:inherit;letter-spacing:-.01em;}' +
      '.lm-hint{font-size:.82rem;color:#94a3b8;margin-bottom:1.75rem;' +
      'font-family:inherit;line-height:1.55;}' +
      '.lm-btns{display:flex;gap:.75rem;}' +
      '.lm-btn{flex:1;padding:.8rem .9rem;border-radius:11px;' +
      'border:1.5px solid rgba(255,255,255,.1);' +
      'background:rgba(255,255,255,.05);color:#f1f5f9;' +
      'font-size:.9rem;font-weight:600;cursor:pointer;' +
      'display:flex;align-items:center;justify-content:center;gap:.45rem;' +
      'transition:background-color .2s ease,border-color .2s ease,transform .2s ease;font-family:inherit;}' +
      '.lm-btn:hover,.lm-btn:focus-visible{background:rgba(37,99,235,.2);border-color:rgba(37,99,235,.5);transform:translateY(-2px);}' +
      '.lm-btn:focus-visible{outline:2px solid #93c5fd;outline-offset:2px;}' +
      '.lm-flag{width:1.2rem;height:1.2rem;border-radius:3px;box-shadow:0 1px 4px rgba(0,0,0,.4);}' +
      /* ── Navbar lang toggle ── */
      '.lang-toggle-btn{display:inline-flex;align-items:center;justify-content:center;' +
      'padding:.2rem .4rem;height:30px;min-width:36px;' +
      'background:rgba(37,99,235,.12);font-size:1.35rem;line-height:1;' +
      'border-radius:6px;border:1px solid rgba(37,99,235,.3);' +
      'cursor:pointer;transition:background-color .25s ease,border-color .25s ease;flex-shrink:0;}' +
      '.lang-toggle-btn:hover{background:rgba(37,99,235,.25);border-color:#60a5fa;}' +
      '.lang-toggle-btn .flag{width:1em;height:1em;border-radius:3px;box-shadow:0 1px 3px rgba(0,0,0,.3);}' +
      /* ── Hamburger ── */
      '.nav-burger{display:none;flex-direction:column;align-items:center;justify-content:center;' +
      'gap:5px;width:38px;height:38px;background:transparent;border:none;cursor:pointer;' +
      'border-radius:8px;padding:8px;transition:background-color .2s;flex-shrink:0;}' +
      '.nav-burger:hover{background:rgba(255,255,255,.07);}' +
      '.nb-bar{display:block;width:22px;height:2px;background:#94a3b8;border-radius:2px;' +
      'transition:transform .3s ease,opacity .3s ease;}' +
      '.nb-open .nb-bar:nth-child(1){transform:translateY(7px) rotate(45deg);}' +
      '.nb-open .nb-bar:nth-child(2){opacity:0;transform:scaleX(0);}' +
      '.nb-open .nb-bar:nth-child(3){transform:translateY(-7px) rotate(-45deg);}' +
      /* ── Mobile drawer (masqué par l'attribut hidden quand il est fermé) ── */
      '.mobile-nav{position:fixed;top:64px;left:0;right:0;z-index:998;' +
      'background:rgba(15,23,42,.98);backdrop-filter:blur(14px);' +
      'border-bottom:1px solid rgba(255,255,255,.07);' +
      'padding:1rem 1.5rem 1.5rem;display:none;overscroll-behavior:contain;' +
      'transition:transform .3s ease,opacity .3s ease;}' +
      '.mn-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.25rem;}' +
      '.mn-list a{display:block;padding:.85rem 1rem;color:#94a3b8;font-size:.87rem;' +
      'font-weight:500;letter-spacing:.07em;text-transform:uppercase;' +
      'border-radius:8px;transition:color .2s,background-color .2s;}' +
      '.mn-list a:hover,.mn-list a.active{color:#93c5fd;background:rgba(37,99,235,.15);}' +
      /* ── Responsive ── */
      '@media(max-width:1100px){' +
      '.nav-burger{display:flex;}' +
      '.mobile-nav{display:block;}' +
      '.nav-links a{display:none!important;}' +
      '}' +
      /* ── Apparition, seulement si l'utilisateur accepte les animations ── */
      '@media(prefers-reduced-motion:no-preference){' +
      '@starting-style{.mobile-nav{opacity:0;transform:translateY(-8px);}}' +
      '}' +
      '@media(prefers-reduced-motion:reduce){' +
      '#lang-modal,.lm-btn,.nb-bar,.mobile-nav{transition:none;}' +
      '.lm-btn:hover,.lm-btn:focus-visible{transform:none;}' +
      '}';
    document.head.appendChild(s);
  }

  function showModal(proposed) {
    if (typeof HTMLDialogElement === 'undefined') return; /* navigateur ancien : langue par défaut */
    var modal = document.createElement('dialog');
    modal.id = 'lang-modal';
    modal.setAttribute('aria-labelledby', 'lm-name');
    modal.setAttribute('aria-describedby', 'lm-hint');
    modal.innerHTML =
      '<div class="lm-card">' +
        '<div class="lm-avatar" aria-hidden="true">WH</div>' +
        '<p class="lm-name" id="lm-name">William Hertrich</p>' +
        '<p class="lm-hint" id="lm-hint"><span lang="fr">Choisissez votre langue</span><br><span lang="en">Choose your language</span></p>' +
        '<div class="lm-btns">' +
          '<button type="button" class="lm-btn" id="lm-btn-fr" lang="fr">' + flag('fr', 'lm-flag') + ' Fran&#231;ais</button>' +
          '<button type="button" class="lm-btn" id="lm-btn-en" lang="en">' + flag('gb', 'lm-flag') + ' English</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
    document.getElementById('lm-btn-fr').addEventListener('click', function () { setLang('fr'); });
    document.getElementById('lm-btn-en').addEventListener('click', function () { setLang('en'); });
    /* Échap : garde la langue proposée */
    modal.addEventListener('cancel', function (e) { e.preventDefault(); setLang(proposed); });
    document.documentElement.classList.add('modal-open');
    modal.showModal();                                   /* page derrière inerte, focus dans la fenêtre */
    document.getElementById('lm-btn-' + proposed).focus();
    /* double rAF to trigger CSS transition */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { modal.classList.add('lm-visible'); });
    });
  }

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', function () {
    injectStyles();
    injectMobileNav();
    var stored = readStored();
    if (stored) {
      showLang(stored);
    } else {
      /* Première visite : langue du navigateur appliquée et proposée, choix mémorisé ensuite */
      var proposed = detectLang();
      current = proposed;
      showLang(proposed);
      showModal(proposed);
    }
    /* delegate toggle clicks */
    document.addEventListener('click', function (e) {
      if (e.target.closest('.lang-toggle-btn')) {
        setLang(getLang() === 'en' ? 'fr' : 'en');
      }
    });
  });

  /* public API */
  window.i18n = { setLang: setLang, getLang: getLang };
})();
