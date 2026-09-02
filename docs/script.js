/* Jordan Bitjocka IV — portfolio interactions */
(function () {
  "use strict";

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Scroll-reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Animated stat counters */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduced) { el.textContent = format(target); return; }
    var duration = 1100;
    var start = null;
    function format(v) {
      return el.hasAttribute("data-format") && v >= 1000
        ? v.toLocaleString("en-US")
        : String(v);
    }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); /* ease-out cubic */
      el.textContent = format(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var statEls = document.querySelectorAll(".stats strong[data-count]");
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            so.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statEls.forEach(function (el) { so.observe(el); });
  } else {
    statEls.forEach(animateCount);
  }
})();
