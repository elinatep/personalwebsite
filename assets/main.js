/* ═══════════════════════════════════════════════════════════
   Elina Teplygina — interaction layer
   No dependencies. Gentle by design; everything degrades.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Only hide-then-reveal when JS is running, so the page is never
     stranded invisible if this script fails to load. */
  document.documentElement.classList.add('js');

  /* ── Reveal on scroll ────────────────────────────────── */
  var revealables = document.querySelectorAll('.reveal, .stop');

  function showAll() {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('in'); });
  }

  if (reduced || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });

    /* Anything already on the first screen shows straight away — the
       observer's negative bottom margin would otherwise hold it back. */
    Array.prototype.forEach.call(revealables, function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('in');
        io.unobserve(el);
      }
    });
  }

  /* ── Scroll: nav hairline, active link, timeline line ── */
  var nav      = document.getElementById('nav');
  var path     = document.getElementById('routePath');
  var routeEl  = document.querySelector('.route');
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('[data-nav]');

  if (path) {
    /* pathLength=1 lets the dash offset be driven by a plain 0..1 ratio. */
    path.setAttribute('pathLength', '1');
    if (reduced) path.style.strokeDashoffset = '0';
  }

  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.pageYOffset || document.documentElement.scrollTop;

      if (nav) nav.classList.toggle('stuck', y > 12);

      if (path && routeEl && !reduced) {
        var box   = routeEl.getBoundingClientRect();
        var vh    = window.innerHeight;
        var ratio = (vh * 0.78 - box.top) / (box.height + vh * 0.4);
        path.style.strokeDashoffset = String(1 - Math.max(0, Math.min(1, ratio)));
      }

      var current = '';
      Array.prototype.forEach.call(sections, function (sec) {
        if (sec.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = sec.id;
        }
      });
      Array.prototype.forEach.call(navLinks, function (a) {
        a.classList.toggle('on', a.getAttribute('href') === '#' + current);
      });

      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ── Portrait falls back to a monogram if the file is absent ── */
  var portrait = document.getElementById('portrait');
  if (portrait) {
    portrait.addEventListener('error', function () {
      portrait.classList.add('missing');
    });
    if (portrait.complete && portrait.naturalWidth === 0) {
      portrait.classList.add('missing');
    }
  }

  /* ── Footer year ─────────────────────────────────────── */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
