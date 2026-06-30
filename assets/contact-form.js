/* ============================================================
   Boulder Biologics — contact / intake form submitter
   ============================================================
   Wires every .cta-form and .intake-form to Formspree via AJAX
   so the button confirms in place (no page redirect). Field
   keys are derived from each input's <label> text, so the forms
   need no per-field name="" attributes. The submit event only
   fires after native HTML5 validation passes, so required
   fields are still enforced.

   This script also enhances every form with a "best way to
   reach you" question:
     • Email  → only the email field is required.
     • Phone  → email + phone + preferred day/time are shown
                and required.
   On success it swaps the form for a method-specific thank-you
   panel. All of this is injected here so the markup on each of
   the ~18 pages stays untouched and consistent.
   ============================================================ */
(function () {
  var ENDPOINT = 'https://formspree.io/f/mgobjlny';
  var CLINIC_PHONE = '720-550-6175';
  var uid = 0;

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

  /* Build a field wrapper that matches the form's existing markup
     (some forms wrap fields in .intake-field, others in a bare div). */
  function makeWrapper(refWrapper) {
    var w = document.createElement(refWrapper ? refWrapper.tagName : 'div');
    if (refWrapper && refWrapper.className) w.className = refWrapper.className;
    return w;
  }

  function makeSelect(refWrapper, labelText, options) {
    var w = makeWrapper(refWrapper);
    var id = 'bb-f' + (++uid);
    var lbl = document.createElement('label');
    lbl.setAttribute('for', id);
    lbl.textContent = labelText;
    var sel = document.createElement('select');
    sel.id = id;
    options.forEach(function (o) {
      var opt = document.createElement('option');
      if (typeof o === 'object') {
        opt.value = o.value; opt.textContent = o.text;
        if (o.disabled) opt.disabled = true;
        if (o.selected) opt.selected = true;
      }
      else { opt.textContent = o; }
      sel.appendChild(opt);
    });
    w.appendChild(lbl);
    w.appendChild(sel);
    return { wrap: w, field: sel };
  }

  function makeInput(refWrapper, labelText, type, placeholder) {
    var w = makeWrapper(refWrapper);
    var id = 'bb-f' + (++uid);
    var lbl = document.createElement('label');
    lbl.setAttribute('for', id);
    lbl.textContent = labelText;
    var inp = document.createElement('input');
    inp.id = id;
    inp.type = type;
    if (placeholder) inp.placeholder = placeholder;
    w.appendChild(lbl);
    w.appendChild(inp);
    return { wrap: w, field: inp };
  }

  function wrapperOf(input) {
    return input.closest('.intake-field') || input.parentElement;
  }

  function enhance(form) {
    var emailInput = form.querySelector('input[type="email"]');
    if (!emailInput) return null; // not a contact form we can enhance
    var emailWrapper = wrapperOf(emailInput);

    var phoneInput = form.querySelector('input[type="tel"]') || form.querySelector('input#ph');
    var phoneWrapper = phoneInput ? wrapperOf(phoneInput) : null;
    if (!phoneWrapper) {
      var made = makeInput(emailWrapper, 'Phone', 'tel', CLINIC_PHONE);
      phoneInput = made.field;
      phoneWrapper = made.wrap;
      emailWrapper.parentNode.insertBefore(phoneWrapper, emailWrapper.nextSibling);
    }

    /* Best way to reach you — placed above the email field. */
    var method = makeSelect(emailWrapper, 'What’s the best way to reach you?', ['Email', 'Phone']);
    emailWrapper.parentNode.insertBefore(method.wrap, emailWrapper);

    /* Preferred day / time — placed after the phone field. */
    var day = makeSelect(phoneWrapper, 'Best day to reach you', [
      { value: '', text: 'Select a day', disabled: true, selected: true },
      'Monday', 'Tuesday', 'Thursday', 'Friday'
    ]);
    var time = makeSelect(phoneWrapper, 'Preferred time of day', [
      { value: '', text: 'Select a time', disabled: true, selected: true },
      'Morning', 'Afternoon'
    ]);
    phoneWrapper.parentNode.insertBefore(day.wrap, phoneWrapper.nextSibling);
    phoneWrapper.parentNode.insertBefore(time.wrap, day.wrap.nextSibling);

    // Some field wrappers (e.g. .intake-field) set `display` in CSS, which
    // overrides the `hidden` attribute — so toggle inline display too. The
    // `hidden` attribute is kept so the submit handler skips these fields.
    function toggle(wrap, show) {
      wrap.hidden = !show;
      wrap.style.display = show ? '' : 'none';
    }
    function update() {
      var byPhone = method.field.value === 'Phone';
      toggle(phoneWrapper, byPhone);
      toggle(day.wrap, byPhone);
      toggle(time.wrap, byPhone);
      if (phoneInput) phoneInput.required = byPhone;
      day.field.required = byPhone;
      time.field.required = byPhone;
    }
    method.field.addEventListener('change', update);
    update();

    return { method: method.field };
  }

  // Light text (e.g. on a dark CTA card) → true; dark text → false.
  function hasLightText(el) {
    var m = (getComputedStyle(el).color || '').match(/\d+/g);
    if (!m) return true;
    var lum = (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) / 255;
    return lum > 0.6;
  }

  function thankYou(form, byPhone) {
    var dark = hasLightText(form); // dark = light text = dark-background card

    // Grey out + blur the form behind, keeping its footprint so the card
    // doesn't collapse, then float the confirmation centered on top.
    if (getComputedStyle(form).position === 'static') form.style.position = 'relative';
    form.style.pointerEvents = 'none';

    var overlay = document.createElement('div');
    overlay.className = 'form-thankyou';
    overlay.setAttribute('role', 'status');
    overlay.style.cssText =
      'position:absolute;inset:0;z-index:5;display:flex;align-items:center;' +
      'justify-content:center;padding:18px;border-radius:inherit;pointer-events:auto;' +
      'background:' + (dark ? 'rgba(10,16,22,0.5)' : 'rgba(244,247,249,0.55)') + ';' +
      '-webkit-backdrop-filter:grayscale(.5) blur(3px);backdrop-filter:grayscale(.5) blur(3px);';

    var panel = document.createElement('div');
    panel.style.cssText =
      'max-width:92%;text-align:center;padding:26px 24px;border-radius:14px;' +
      'border:1px solid ' + (dark ? 'rgba(255,255,255,.16)' : 'rgba(0,0,0,.10)') + ';' +
      'background:' + (dark ? 'rgba(17,25,34,.97)' : 'rgba(255,255,255,.98)') + ';' +
      'color:' + (dark ? '#eaf0f4' : '#16202b') + ';' +
      'box-shadow:0 14px 34px rgba(0,0,0,.28);';

    var h = document.createElement('p');
    h.style.cssText = 'margin:0 0 8px;font-size:20px;font-weight:600;';
    h.innerHTML = 'Thank you <span style="color:var(--accent,#2bb3a3)">✓</span>';
    var p = document.createElement('p');
    p.style.cssText = 'margin:0;font-size:15px;line-height:1.6;opacity:.9;';
    p.textContent = byPhone
      ? 'We’ll do our best to reach you during your preferred time. ' +
        'Please watch for our call from ' + CLINIC_PHONE + '.'
      : 'We’ll be in touch by email shortly.';

    panel.appendChild(h);
    panel.appendChild(p);
    overlay.appendChild(panel);
    form.appendChild(overlay);
    if (overlay.scrollIntoView) overlay.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function handle(form, ctx) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]') || form.querySelector('button');
      var label = btn ? btn.textContent : '';
      var prior = form.querySelector('.form-error');
      if (prior) prior.textContent = '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      var byPhone = !!(ctx && ctx.method && ctx.method.value === 'Phone');
      var page = (location.pathname.split('/').pop() || 'index.html');
      var data = {
        _subject: 'Website inquiry — ' + page,
        'Source page': page
      };
      Array.prototype.forEach.call(
        form.querySelectorAll('input, select, textarea'),
        function (el) {
          if (el.type === 'submit' || el.type === 'button' || el.type === 'hidden') return;
          if (el.closest('[hidden]')) return; // skip fields hidden by the method toggle
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
          thankYou(form, byPhone);
        } else {
          return res.json().then(function () { throw new Error('formspree'); });
        }
      }).catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = label; }
        errorEl(form).textContent =
          'Sorry — something went wrong sending that. Please call ' + CLINIC_PHONE +
          ' or email info@boulderbiologics.com.';
      });
    });
  }

  function init() {
    Array.prototype.forEach.call(
      document.querySelectorAll('form.cta-form, form.intake-form'),
      function (form) {
        var ctx = enhance(form);
        handle(form, ctx);
      }
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
