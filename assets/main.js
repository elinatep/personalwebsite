/* ═══════════════════════════════════════════════════════════
   Elina Teplygina — interaction layer
   No dependencies. Everything degrades gracefully.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine    = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ── Theme ───────────────────────────────────────────── */
  var root   = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var txt    = document.getElementById('toggleTxt');

  var stored;
  try { stored = localStorage.getItem('theme'); } catch (e) { stored = null; }
  if (!stored) {
    stored = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  setTheme(stored);

  function setTheme(t) {
    root.setAttribute('data-theme', t);
    if (txt) txt.textContent = t === 'dark' ? 'Night' : 'Day';
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(t === 'dark'));
      toggle.setAttribute('aria-label',
        'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' mode');
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ── Boot sequence: split-flap style word resolve ────── */
  var boot     = document.getElementById('boot');
  var bootWord = document.getElementById('bootWord');

  function endBoot() {
    if (!boot) return;
    boot.classList.add('done');
    document.body.style.overflow = '';
    window.setTimeout(function () {
      if (boot && boot.parentNode) boot.parentNode.removeChild(boot);
    }, 800);
  }

  if (boot && bootWord) {
    if (reduced) {
      bootWord.textContent = 'Elina Teplygina';
      window.setTimeout(endBoot, 350);
    } else {
      document.body.style.overflow = 'hidden';
      flap(bootWord, 'ELINA TEPLYGINA', 1150, endBoot);
      // Hard safety net: never trap the visitor behind the intro.
      window.setTimeout(endBoot, 2600);
    }
  }

  function flap(el, target, duration, done) {
    var glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var chars  = target.split('');
    var locked = 0;
    var start  = performance.now();
    var per    = duration / chars.length;

    function frame(now) {
      var elapsed = now - start;
      locked = Math.min(chars.length, Math.floor(elapsed / per));
      var out = '';
      for (var i = 0; i < chars.length; i++) {
        if (chars[i] === ' ') { out += ' '; continue; }
        out += i < locked ? chars[i]
             : glyphs.charAt(Math.floor(Math.random() * glyphs.length));
      }
      el.textContent = out;
      if (locked < chars.length) {
        requestAnimationFrame(frame);
      } else {
        el.innerHTML = 'ELINA <i>TEPLYGINA</i>';
        window.setTimeout(done, 380);
      }
    }
    requestAnimationFrame(frame);
  }

  /* ── Reveal on scroll ────────────────────────────────── */
  var revealables = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });

    /* Anything already on the first screen reveals immediately. The observer's
       negative bottom margin would otherwise hold it back until a scroll. */
    Array.prototype.forEach.call(revealables, function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('in');
        io.unobserve(el);
      }
    });
  }

  /* ── Scroll-driven: progress bar, nav state, route line ─ */
  var nav      = document.getElementById('nav');
  var progress = document.getElementById('progressBar');
  var path     = document.getElementById('routePath');
  var routeEl  = document.querySelector('.route');
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('[data-nav]');

  if (path) {
    // pathLength=1 lets us drive the dash offset with a plain 0..1 ratio.
    path.setAttribute('pathLength', '1');
    if (reduced) path.style.strokeDashoffset = '0';
  }

  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y      = window.pageYOffset || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - window.innerHeight;

      if (progress) {
        progress.style.width = (height > 0 ? (y / height) * 100 : 0) + '%';
      }

      if (nav) nav.classList.toggle('stuck', y > 24);

      /* Draw the route line as the section passes through the viewport. */
      if (path && routeEl && !reduced) {
        var box   = routeEl.getBoundingClientRect();
        var vh    = window.innerHeight;
        var span  = box.height + vh * 0.5;
        var trav  = (vh * 0.75) - box.top;
        var ratio = Math.max(0, Math.min(1, trav / span));
        path.style.strokeDashoffset = String(1 - ratio);
      }

      /* Which section owns the nav highlight. */
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

  /* ── Stop markers pop in as they arrive ──────────────── */
  var stops = document.querySelectorAll('.stop');
  if ('IntersectionObserver' in window) {
    var stopIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); stopIO.unobserve(e.target); }
      });
    }, { threshold: 0.25 });
    Array.prototype.forEach.call(stops, function (s) { stopIO.observe(s); });
  } else {
    Array.prototype.forEach.call(stops, function (s) { s.classList.add('in'); });
  }

  /* ── Card tilt + spotlight (pointer devices only) ────── */
  if (fine && !reduced) {
    Array.prototype.forEach.call(document.querySelectorAll('.tilt'), function (card) {
      card.addEventListener('pointermove', function (ev) {
        var r  = card.getBoundingClientRect();
        var px = (ev.clientX - r.left) / r.width;
        var py = (ev.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');
        card.style.transform =
          'perspective(900px) rotateX(' + ((0.5 - py) * 5).toFixed(2) + 'deg) ' +
          'rotateY(' + ((px - 0.5) * 5).toFixed(2) + 'deg) translateY(-4px)';
      });
      card.addEventListener('pointerleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ── Custom cursor ───────────────────────────────────── */
  if (fine && !reduced) {
    var cur = document.querySelector('.cursor');
    if (cur) {
      var tx = -100, ty = -100, cx = -100, cy = -100;

      window.addEventListener('pointermove', function (e) {
        tx = e.clientX; ty = e.clientY;
      }, { passive: true });

      (function loop() {
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        cur.style.transform =
          'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
        requestAnimationFrame(loop);
      })();

      var hot = document.querySelectorAll('a, button, .line, .quote__portrait');
      Array.prototype.forEach.call(hot, function (el) {
        el.addEventListener('pointerenter', function () {
          document.body.classList.add('is-hovering');
        });
        el.addEventListener('pointerleave', function () {
          document.body.classList.remove('is-hovering');
        });
      });
    }
  }

  /* ── Count-up stats ──────────────────────────────────── */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !reduced) {
    var cIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        cIO.unobserve(e.target);
        var to = parseInt(e.target.getAttribute('data-count'), 10);
        if (isNaN(to)) return;
        var t0 = performance.now(), dur = 1100;
        (function step(now) {
          var p = Math.min(1, (now - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          e.target.textContent = String(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(counters, function (c) { cIO.observe(c); });
  }

  /* ── Portrait fallback (monogram if the image is absent) ─ */
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
