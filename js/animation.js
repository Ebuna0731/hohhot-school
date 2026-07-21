/* =============================================================
   animation.js — Скролл дагасан илчлэлт (scroll reveal)
   .reveal / .reveal-left / .reveal-right / .reveal-scale
   ============================================================= */
(function () {
  "use strict";

  function init() {
    var items = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    if (!items.length) return;

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    items.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
