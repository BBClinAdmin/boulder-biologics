/* ============================================================
   Boulder Biologics — image slot auto-loader
   ============================================================
   Resolves any element with [data-img-id] to a real image at
     assets/images/<id>.{avif,webp,jpg,jpeg,png}
   First extension that exists wins. If nothing resolves, the
   placeholder stays put so the slot remains visible in audit.

   Usage:
     <div class="img-slot"
          data-img-id="prp-hero"
          data-label="Hero · ultrasound-guided PRP injection · 21:9"></div>

     <link rel="stylesheet" href="../assets/image-loader.css" />
     <script defer src="../assets/image-loader.js"></script>

   Optional per-slot overrides:
     data-img-fit="contain"     // default: cover
     data-img-position="top"    // CSS object-position; default: center
   ============================================================ */
(function () {
  var me = document.currentScript;
  var base = new URL('./images/', me.src);
  var EXTS = ['avif', 'webp', 'jpg', 'jpeg', 'png'];

  function exists(url) {
    return new Promise(function (res) {
      var img = new Image();
      img.onload = function () { res(true); };
      img.onerror = function () { res(false); };
      img.src = url;
    });
  }

  function resolve(id) {
    var i = 0;
    return new Promise(function (done) {
      (function next() {
        if (i >= EXTS.length) { done(null); return; }
        var url = new URL(id + '.' + EXTS[i], base).href;
        i++;
        exists(url).then(function (ok) { ok ? done(url) : next(); });
      })();
    });
  }

  function fill(el) {
    var id = el.getAttribute('data-img-id');
    if (!id) return Promise.resolve(false);
    return resolve(id).then(function (url) {
      if (!url) {
        el.classList.add('is-missing');
        return false;
      }
      var img = document.createElement('img');
      img.src = url;
      img.alt = el.getAttribute('data-label') || id;
      // Above-the-fold slots (heroes) can opt out of lazy for faster LCP:
      //   <div data-img-id="prp-hero" data-img-eager> … </div>
      if (el.hasAttribute('data-img-eager')) {
        img.loading = 'eager';
        img.setAttribute('fetchpriority', 'high');
      } else {
        img.loading = 'lazy';
      }
      img.decoding = 'async';
      // Responsive srcset: AVIF resolves with a 960px variant alongside the
      // full (≤1920px) file, so phones download the small one. Default sizes
      // is 100vw (always sharp); narrower slots can override with
      // data-img-sizes (e.g. "(max-width:700px) 100vw, 50vw") for more savings.
      if (/\.avif$/.test(url)) {
        var small = url.replace(/\.avif$/, '-960.avif');
        img.srcset = small + ' 960w, ' + url + ' 1920w';
        img.sizes = el.getAttribute('data-img-sizes') || '100vw';
      }
      var fit = el.getAttribute('data-img-fit') || 'cover';
      var pos = el.getAttribute('data-img-position') || 'center';
      img.style.cssText =
        'width:100%;height:100%;display:block;object-fit:' + fit +
        ';object-position:' + pos + ';border-radius:inherit;';
      // Wipe placeholder children (e.g. <span> captions inside .figure / .bio-photo)
      el.innerHTML = '';
      el.appendChild(img);
      el.classList.add('is-loaded');
      return true;
    });
  }

  function init() {
    var slots = document.querySelectorAll('[data-img-id]');
    Array.prototype.forEach.call(slots, fill);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
