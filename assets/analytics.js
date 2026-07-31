/* Boulder Biologics — hardened GA4 (healthcare-conscious)
 *
 * Deliberately restrained for a medical site:
 *   - Honors Do Not Track (bails before loading anything Google)
 *   - No Google Signals, no ad-personalization (reduces PII linkage)
 *   - Conversion events NEVER carry PHI — no form field values, names,
 *     emails, or free text are ever sent; only the event + page path.
 *
 * NOTE: page paths themselves (e.g. /prp-eyedrops) are sent to Google as
 * standard page_view data. That is inherent to GA4 and was an accepted
 * tradeoff. Also disable "Google Signals" and set the shortest data
 * retention in the GA4 Admin — those are account-level, not settable here.
 */
(function () {
  var ID = 'G-STJKC8256P';

  // Honor Do Not Track — opt-out before any Google code loads.
  var dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  if (dnt === '1' || dnt === 'yes') return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  // Load Google's tag library.
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);

  // ---- Conversion events (no PHI, ever) ----
  function wire() {
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.addEventListener('click', function () {
        gtag('event', 'click_to_call', { transport_type: 'beacon' });
      });
    });
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.addEventListener('click', function () {
        gtag('event', 'email_click', { transport_type: 'beacon' });
      });
    });
    // Lead form submit — send only the page path, never field values.
    document.querySelectorAll('form').forEach(function (f) {
      f.addEventListener('submit', function () {
        gtag('event', 'generate_lead', {
          transport_type: 'beacon',
          form_location: location.pathname
        });
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
