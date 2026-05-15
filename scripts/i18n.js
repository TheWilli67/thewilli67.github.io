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
      btn.textContent = lang === 'en' ? 'EN' : 'FR';
      btn.title = lang === 'en' ? 'Passer en français' : 'Switch to English';
    });
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
      /* modal */
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
      /* navbar toggle */
      '.lang-toggle-btn{display:block;padding:.4rem .75rem;' +
      'background:rgba(37,99,235,.12);color:#93c5fd;' +
      'font-size:.75rem;font-weight:700;letter-spacing:.08em;' +
      'border-radius:6px;border:1px solid rgba(37,99,235,.3);' +
      'cursor:pointer;transition:all .25s ease;font-family:Inter,sans-serif;' +
      'line-height:1;}' +
      '.lang-toggle-btn:hover{background:rgba(37,99,235,.25);border-color:#60a5fa;color:#bfdbfe;}';
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
          '<button class="lm-btn" id="lm-btn-fr">&#127467;&#127479; Fran&#231;ais</button>' +
          '<button class="lm-btn" id="lm-btn-en">&#127468;&#127463; English</button>' +
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

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', function () {
    injectStyles();
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
      if (e.target.classList.contains('lang-toggle-btn')) {
        setLang(getLang() === 'en' ? 'fr' : 'en');
      }
    });
  });

  /* public API */
  window.i18n = { setLang: setLang, getLang: getLang };
})();
