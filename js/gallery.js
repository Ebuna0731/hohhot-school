/* =============================================================
   gallery.js — Зургийн цомгийн шүүлтүүр + Lightbox
   - Ангиллаар шүүх (data-category)
   - Lightbox: нээх/хаах, өмнөх/дараах, гар (← → Esc)
   ============================================================= */
(function () {
  "use strict";

  function init() {
    var grid = document.querySelector(".gallery-grid");
    if (!grid) return;

    var items = Array.prototype.slice.call(grid.querySelectorAll(".gallery-item"));
    var filters = document.querySelectorAll(".filter-btn");

    /* ---- Шүүлтүүр ---- */
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filters.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var cat = btn.getAttribute("data-filter");
        items.forEach(function (it) {
          var show = cat === "all" || it.getAttribute("data-category") === cat;
          it.classList.toggle("is-hidden", !show);
        });
      });
    });

    /* ---- Lightbox бүтэц ---- */
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Зураг харах цонх");
    lb.innerHTML =
      '<button class="lightbox__btn lightbox__close" aria-label="Хаах">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
      '<button class="lightbox__btn lightbox__prev" aria-label="Өмнөх">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18 9 12l6-6"/></svg></button>' +
      '<img class="lightbox__img" alt="">' +
      '<button class="lightbox__btn lightbox__next" aria-label="Дараах">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>' +
      '<p class="lightbox__cap"></p>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector(".lightbox__img");
    var lbCap = lb.querySelector(".lightbox__cap");
    var current = 0;
    var lastFocus = null;

    function visibleItems() {
      return items.filter(function (it) { return !it.classList.contains("is-hidden"); });
    }

    function show(idx) {
      var list = visibleItems();
      if (!list.length) return;
      current = (idx + list.length) % list.length;
      var it = list[current];
      var img = it.querySelector("img");
      lbImg.src = img.getAttribute("data-full") || img.src;
      lbImg.alt = img.alt || "";
      var cap = it.querySelector(".cap");
      lbCap.textContent = cap ? cap.textContent : (img.alt || "");
    }

    function open(it) {
      lastFocus = document.activeElement;
      var list = visibleItems();
      show(list.indexOf(it));
      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
      lb.querySelector(".lightbox__close").focus();
    }
    function close() {
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    items.forEach(function (it) {
      it.setAttribute("tabindex", "0");
      it.setAttribute("role", "button");
      it.addEventListener("click", function () { open(it); });
      it.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(it); }
      });
    });

    lb.querySelector(".lightbox__close").addEventListener("click", close);
    lb.querySelector(".lightbox__prev").addEventListener("click", function () { show(current - 1); });
    lb.querySelector(".lightbox__next").addEventListener("click", function () { show(current + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });

    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "ArrowRight") show(current + 1);
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
