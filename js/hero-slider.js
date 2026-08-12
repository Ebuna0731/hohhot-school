/* =============================================================
   hero-slider.js — Нүүр хуудасны hero зургийн сэлгэлт
   - Зургууд автоматаар аажим солигдоно (crossfade)
   - Хоёр захын сумаар гараар сэлгэнэ
   - Таб идэвхгүй үед зогсоож, буцаж ирэхэд үргэлжлүүлнэ
   ============================================================= */
(function () {
  "use strict";

  var INTERVAL = 4200;   /* нэг зураг харагдах хугацаа (мс) */

  var slides = document.querySelectorAll(".hero__slides .hero__scene");
  if (slides.length < 2) return;

  var arrows = document.querySelectorAll(".hero .hero__arrow");
  var index = 0;
  var timer = null;

  /* Дараагийн зургийг урьдчилан ачаалж, сэлгэлт саадгүй болгоно */
  function preload(i) {
    var img = slides[i % slides.length];
    if (img && img.loading === "lazy") img.loading = "eager";
  }

  function show(next) {
    slides[index].classList.remove("is-active");
    index = (next + slides.length) % slides.length;
    slides[index].classList.add("is-active");
    preload(index + 1);
  }

  function start() {
    if (timer) return;
    timer = setInterval(function () { show(index + 1); }, INTERVAL);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  /* Гараар сэлгэсэн бол тоолуурыг тэгээс эхлүүлнэ —
     дарсны дараа зураг тэр дороо үсрэхээс сэргийлнэ */
  function goManual(next) {
    stop();
    show(next);
    start();
  }

  for (var a = 0; a < arrows.length; a++) {
    arrows[a].addEventListener("click", function () {
      goManual(index + (this.dataset.dir === "prev" ? -1 : 1));
    });
  }

  /* Таб нуугдсан үед CPU/батарей дэмий зарцуулахгүй */
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  preload(1);
  start();
})();
