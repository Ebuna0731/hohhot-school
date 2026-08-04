/* =============================================================
   leaders.js — Захирлын мэндчилгээний карусель
   - Сум ба цэгээр слайд солих
   - Автомат гүйлгэлт (data-autoplay="мс"), hover/focus үед зогсоно
   - Гар: ← → товч
   ============================================================= */
(function () {
  "use strict";

  function init() {
    var root = document.getElementById("leaders");
    if (!root) return;

    var slides = Array.prototype.slice.call(root.querySelectorAll(".leaders__slide"));
    var dots = Array.prototype.slice.call(root.querySelectorAll(".leaders__dot"));
    var arrows = Array.prototype.slice.call(root.querySelectorAll(".leaders__arrow"));
    if (slides.length < 2) return;

    var index = 0;
    var timer = null;
    var delay = parseInt(root.getAttribute("data-autoplay"), 10) || 0;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle("is-active", i === index); });
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === index);
        d.setAttribute("aria-selected", i === index ? "true" : "false");
      });
    }

    function start() {
      if (!delay || reduced) return;
      stop();
      timer = setInterval(function () { show(index + 1); }, delay);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    /* Хэрэглэгч өөрөө сольсон бол автомат тоолуурыг эхнээс нь эхлүүлнэ */
    function goto(next) { show(next); start(); }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { goto(i); });
    });

    arrows.forEach(function (btn) {
      btn.addEventListener("click", function () {
        goto(index + (btn.getAttribute("data-dir") === "prev" ? -1 : 1));
      });
    });

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); goto(index - 1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goto(index + 1); }
    });

    /* Уншиж байхад бүү сольё */
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    show(0);
    start();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
