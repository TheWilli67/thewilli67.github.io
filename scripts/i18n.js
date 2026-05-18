(function () {
  'use strict';

  var DEFAULT = 'fr';

  /* ─── Storage ─── */
  function getLang() { return localStorage.getItem('lang') || DEFAULT; }

  function setLang(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    applyLang(lang);
    updateToggles(lang);
    closeModal();
    closeMobileNav();
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
  function updateToggles(lang) {
    document.querySelectorAll('.lang-toggle-btn').forEach(function (btn) {
      if (lang === 'en') {
        btn.innerHTML = '<span class="fi fis fi-gb"></span>';
        btn.title = 'Passer en français';
      } else {
        btn.innerHTML = '<span class="fi fis fi-fr"></span>';
        btn.title = 'Switch to English';
      }
    });
  }

  /* ─── Mobile nav ─── */
  function injectMobileNav() {
    var nav = document.querySelector('.nav');
    if (!nav || nav.querySelector('.nav-burger')) return;

    var navLinks = document.querySelector('.nav-links');

    /* hamburger button — appended inside nav-links so it sits on the right */
    var burger = document.createElement('button');
    burger.className = 'nav-burger';
    burger.setAttribute('aria-label', 'Menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML =
      '<span class="nb-bar"></span>' +
      '<span class="nb-bar"></span>' +
      '<span class="nb-bar"></span>';
    if (navLinks) navLinks.appendChild(burger);
    else nav.appendChild(burger);

    /* mobile drawer */
    var drawer = document.createElement('div');
    drawer.id = 'mobile-nav';
    drawer.className = 'mobile-nav';
    drawer.setAttribute('aria-hidden', 'true');

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
    /* insert right after the <nav> element */
    nav.parentNode.insertBefore(drawer, nav.nextSibling);

    /* toggle on burger click */
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = drawer.classList.toggle('mn-open');
      burger.classList.toggle('nb-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      drawer.setAttribute('aria-hidden', String(!isOpen));
    });

    /* close on link click */
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMobileNav();
    });

    /* close on outside click */
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !drawer.contains(e.target)) {
        closeMobileNav();
      }
    });
  }

  function closeMobileNav() {
    var drawer = document.getElementById('mobile-nav');
    var burger = document.querySelector('.nav-burger');
    if (drawer) { drawer.classList.remove('mn-open'); drawer.setAttribute('aria-hidden', 'true'); }
    if (burger) { burger.classList.remove('nb-open'); burger.setAttribute('aria-expanded', 'false'); }
  }

  /* ─── First-visit modal ─── */
  function closeModal() {
    var modal = document.getElementById('lang-modal');
    if (!modal) return;
    modal.style.opacity = '0';
    setTimeout(function () { if (modal.parentNode) modal.parentNode.removeChild(modal); }, 420);
  }

  function injectStyles() {
    if (document.getElementById('i18n-styles')) return;
    var s = document.createElement('style');
    s.id = 'i18n-styles';
    s.textContent =
      /* ── Modal ── */
      '#lang-modal{position:fixed;inset:0;z-index:9998;background:rgba(15,23,42,.97);' +
      'display:flex;align-items:center;justify-content:center;' +
      'opacity:0;transition:opacity .4s ease;backdrop-filter:blur(8px);}' +
      '#lang-modal.lm-visible{opacity:1;}' +
      '.lm-card{background:#1e293b;border:1px solid rgba(255,255,255,.09);' +
      'border-radius:20px;padding:2.75rem 2.25rem;text-align:center;' +
      'box-shadow:0 24px 64px rgba(0,0,0,.55);max-width:360px;width:90%;}' +
      '.lm-avatar{width:66px;height:66px;border-radius:50%;' +
      'background:conic-gradient(from 180deg,#2563eb,#6366f1,#2563eb);' +
      'display:flex;align-items:center;justify-content:center;' +
      'font-size:1.45rem;font-weight:800;color:#fff;margin:0 auto 1.1rem;' +
      'font-family:Inter,sans-serif;box-shadow:0 0 28px rgba(37,99,235,.35);}' +
      '.lm-name{font-size:1.2rem;font-weight:800;color:#f8fafc;' +
      'margin-bottom:.3rem;font-family:Inter,sans-serif;letter-spacing:-.01em;}' +
      '.lm-hint{font-size:.82rem;color:#64748b;margin-bottom:1.75rem;' +
      'font-family:Inter,sans-serif;line-height:1.55;}' +
      '.lm-btns{display:flex;gap:.75rem;}' +
      '.lm-btn{flex:1;padding:.8rem .9rem;border-radius:11px;' +
      'border:1.5px solid rgba(255,255,255,.1);' +
      'background:rgba(255,255,255,.05);color:#f1f5f9;' +
      'font-size:.9rem;font-weight:600;cursor:pointer;' +
      'display:flex;align-items:center;justify-content:center;gap:.45rem;' +
      'transition:all .2s ease;font-family:Inter,sans-serif;}' +
      '.lm-btn:hover{background:rgba(37,99,235,.2);border-color:rgba(37,99,235,.5);transform:translateY(-2px);}' +
      '.lm-flag{font-size:1.2rem;border-radius:3px;box-shadow:0 1px 4px rgba(0,0,0,.4);}' +
      /* ── Navbar lang toggle ── */
      '.lang-toggle-btn{display:inline-flex;align-items:center;justify-content:center;' +
      'padding:.2rem .4rem;height:30px;min-width:36px;' +
      'background:rgba(37,99,235,.12);font-size:1.35rem;line-height:1;' +
      'border-radius:6px;border:1px solid rgba(37,99,235,.3);' +
      'cursor:pointer;transition:all .25s ease;flex-shrink:0;}' +
      '.lang-toggle-btn:hover{background:rgba(37,99,235,.25);border-color:#60a5fa;}' +
      '.lang-toggle-btn .fi{border-radius:3px;box-shadow:0 1px 3px rgba(0,0,0,.3);}' +
      /* ── Hamburger ── */
      '.nav-burger{display:none;flex-direction:column;align-items:center;justify-content:center;' +
      'gap:5px;width:38px;height:38px;background:transparent;border:none;cursor:pointer;' +
      'border-radius:8px;padding:8px;transition:background .2s;flex-shrink:0;}' +
      '.nav-burger:hover{background:rgba(255,255,255,.07);}' +
      '.nb-bar{display:block;width:22px;height:2px;background:#94a3b8;border-radius:2px;' +
      'transition:transform .3s ease,opacity .3s ease;}' +
      '.nb-open .nb-bar:nth-child(1){transform:translateY(7px) rotate(45deg);}' +
      '.nb-open .nb-bar:nth-child(2){opacity:0;transform:scaleX(0);}' +
      '.nb-open .nb-bar:nth-child(3){transform:translateY(-7px) rotate(-45deg);}' +
      /* ── Mobile drawer ── */
      '.mobile-nav{position:fixed;top:64px;left:0;right:0;z-index:998;' +
      'background:rgba(15,23,42,.98);backdrop-filter:blur(14px);' +
      'border-bottom:1px solid rgba(255,255,255,.07);' +
      'padding:1rem 1.5rem 1.5rem;display:none;' +
      'transform:translateY(-8px);opacity:0;pointer-events:none;' +
      'transition:transform .3s ease,opacity .3s ease;}' +
      '.mobile-nav.mn-open{transform:translateY(0);opacity:1;pointer-events:auto;}' +
      '.mn-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.25rem;}' +
      '.mn-list a{display:block;padding:.85rem 1rem;color:#94a3b8;font-size:.87rem;' +
      'font-weight:500;letter-spacing:.07em;text-transform:uppercase;' +
      'border-radius:8px;transition:color .2s,background .2s;}' +
      '.mn-list a:hover,.mn-list a.active{color:#93c5fd;background:rgba(37,99,235,.15);}' +
      /* ── Responsive ── */
      '@media(max-width:1100px){' +
      '.nav-burger{display:flex;}' +
      '.mobile-nav{display:block;}' +
      '.nav-links a{display:none!important;}' +
      '}';
    document.head.appendChild(s);
  }

  function showModal() {
    var modal = document.createElement('div');
    modal.id = 'lang-modal';
    modal.innerHTML =
      '<div class="lm-card">' +
        '<div class="lm-avatar">WH</div>' +
        '<p class="lm-name">William Hertrich</p>' +
        '<p class="lm-hint">Choisissez votre langue<br>Choose your language</p>' +
        '<div class="lm-btns">' +
          '<button class="lm-btn" id="lm-btn-fr"><span class="fi fis fi-fr lm-flag"></span> Fran&#231;ais</button>' +
          '<button class="lm-btn" id="lm-btn-en"><span class="fi fis fi-gb lm-flag"></span> English</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
    document.getElementById('lm-btn-fr').addEventListener('click', function () { setLang('fr'); });
    document.getElementById('lm-btn-en').addEventListener('click', function () { setLang('en'); });
    /* double rAF to trigger CSS transition */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { modal.classList.add('lm-visible'); });
    });
  }

  /* ─── Inject flag-icons CSS (renders real flag images on all OS/browsers) ─── */
  function injectFlagIcons() {
    if (document.getElementById('flag-icons-css')) return;
    var link = document.createElement('link');
    link.id = 'flag-icons-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/css/flag-icons.min.css';
    document.head.appendChild(link);
  }

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', function () {
    injectFlagIcons();
    injectStyles();
    injectMobileNav();
    var stored = localStorage.getItem('lang');
    if (stored) {
      document.documentElement.lang = stored;
      applyLang(stored);
      updateToggles(stored);
    } else {
      /* default: French (site content already in French) */
      applyLang(DEFAULT);
      updateToggles(DEFAULT);
      /* show modal after page has fully faded in (~1100 ms) */
      setTimeout(showModal, 1100);
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
