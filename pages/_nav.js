/* ============================================================================
   _nav.js — Mobile navigation toggle (progressive enhancement)
   ----------------------------------------------------------------------------
   Wires every .nav-toggle button to the primary nav in its header. With JS off,
   the nav still works at >1024px; the button only matters on small screens where
   _nav.css collapses the nav. Accessible: aria-expanded, Escape, outside-click,
   and auto-close after following a link.
   ========================================================================== */
(function () {
  "use strict";

  function setup(toggle) {
    var header = toggle.closest(".site-header");
    var nav = header && header.querySelector("nav");
    if (!nav) return;

    function isOpen() { return nav.classList.contains("nav--open"); }

    function open() {
      nav.classList.add("nav--open");
      toggle.setAttribute("aria-expanded", "true");
    }
    function close() {
      nav.classList.remove("nav--open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      isOpen() ? close() : open();
    });

    // close after choosing a destination
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });

    // close on Escape (and return focus to the button)
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) { close(); toggle.focus(); }
    });

    // close when tapping outside the header
    document.addEventListener("click", function (e) {
      if (isOpen() && !header.contains(e.target)) close();
    });

    // if the viewport grows back to desktop, clear the open state
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024 && isOpen()) close();
    });
  }

  function init() {
    var toggles = document.querySelectorAll(".nav-toggle");
    for (var i = 0; i < toggles.length; i++) setup(toggles[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
