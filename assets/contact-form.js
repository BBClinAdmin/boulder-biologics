/* ============================================================
   Boulder Biologics — contact / intake form submitter
   ============================================================
   Wires every .cta-form and .intake-form to Formspree via AJAX
   so the button confirms in place (no page redirect). Field
   keys are derived from each input's <label> text, so the forms
   need no per-field name="" attributes. The submit event only
   fires after native HTML5 validation passes, so required
   fields are still enforced.
   ============================================================ */
(function () {
  var ENDPOINT = 'https://formspree.io/f/mgobjlny';

  function keyFor(el, form) {
    if (el.id) {
      var lbl = form.querySelector('label[for="' + el.id + '"]');
      if (lbl) return lbl.textContent.trim();
    }
    return el.name || el.id || 'Field';
  }

  function errorEl(form) {
    var m = form.querySelector('.form-error');
    if (!m) {
      m = document.createElement('p');
      m.className = 'form-error';
      m.setAttribute('role', 'alert');
      m.style.cssText = 'color:#c0392b;font-size:13px;line-height:1.5;margin:10px 0 0;';
      form.appendChild(m);
    }
    return m;
  }

  function handle(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]') || form.querySelector('button');
      var label = btn ? btn.textContent : '';
      var prior = form.querySelector('.form-error');
      if (prior) prior.textContent = '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      var page = (location.pathname.split('/').pop() || 'index.html');
      var data = {
        _subject: 'Website inquiry — ' + page,
        'Source page': page
      };
      Array.prototype.forEach.call(
        form.querySelectorAll('input, select, textarea'),
        function (el) {
          if (el.type === 'submit' || el.type === 'button' || el.type === 'hidden') return;
          var val = (el.value || '').trim();
          data[keyFor(el, form)] = val;
          // Give Formspree a reply-to address.
          if (el.type === 'email' && val) data.email = val;
        }
      );

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (res) {
        if (res.ok) {
          if (btn) btn.textContent = 'Request received ✓';
          form.classList.add('is-sent');
        } else {
          return res.json().then(function () { throw new Error('formspree'); });
        }
      }).catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = label; }
        errorEl(form).textContent =
          'Sorry — something went wrong sending that. Please call 720-550-6175 or email info@boulderbiologics.com.';
      });
    });
  }

  function init() {
    Array.prototype.forEach.call(
      document.querySelectorAll('form.cta-form, form.intake-form'),
      handle
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
