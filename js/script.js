/* =============================================================
   script.js — Үндсэн зан төлөв
   - Дундын Header / Footer-ийг нэг эх сурвалжаас оруулах
   - Sticky header, мобайл цэс, dropdown/mega menu
   - Хуудас ачаалагч (page loader)
   - Дээш очих товч (back to top)
   - Тоон статистикийн анимаци (count-up)
   - Идэвхтэй цэсийг тэмдэглэх (aria-current)
   ============================================================= */
(function () {
  "use strict";

  /* ---- 0. Тохиргоо ---------------------------------------- */
  var SCHOOL = {
    name: "Хөххотын Олон Улсын Дунд Сургууль",
    short: "ХОУДС",
    phone: "7777-9701",
    email: "elselt@hohhot-school.mn",
    /* Байршлууд — footer-т эндээс гарна. Нэг байршилд хэд хэдэн хаяг байж болно. */
    locations: [
      {
        label: "Улаанбаатар",
        lines: ["СБД, 2-р хороо, Twin Tower 1, 4 давхар, 405 тоот"]
      },
      {
        label: "Баяннуурын кампус",
        lines: ["Хятад, ӨМӨЗО, Баяннуур хот, Урадын Дунд хошуу, Ганцбулаг хойд зам, " +
                "Үньин гудамжны уулзвараас баруун урд зүгт 280 метр"]
      },
      {
        label: "Хөххотын кампус",
        lines: ["Хятад, ӨМӨЗО, Хөххот, Шинчен дүүрэг, Хянган хойд замын 2212",
                "Хятад, ӨМӨЗО, Хөххот, Шинчен дүүрэг, Хянган хойд замын 110"]
      }
    ]
  };

  /* Навигацийн бүтэц. type: link | dropdown | mega */
  var NAV = [
    { label: "Нүүр", href: "index.html", key: "home" },
    {
      label: "Бидний тухай", href: "about.html", key: "about", type: "dropdown",
      items: [
        { label: "Түүх", href: "about.html#history" },
        { label: "Эрхэм зорилго ба алсын хараа", href: "about.html#mission" },
        { label: "Үнэт зүйлс", href: "about.html#values" },
        { label: "Удирдлага", href: "about.html#leadership" },
        { label: "Багш нар", href: "about.html#faculty" },
        { label: "Кампус", href: "about.html#campus" }
      ]
    },
    {
      label: "Сургалт", href: "academics.html", key: "academics", type: "mega",
      cols: [
        {
          title: "Хөтөлбөр",
          items: [
            { label: "Хятад хэлний хөтөлбөр", href: "academics.html#chinese" },
            { label: "Монгол хэлний хөтөлбөр", href: "academics.html#mongolian" },
            { label: "Англи хэлний хөтөлбөр", href: "academics.html#english" }
          ]
        },
        {
          title: "Академик",
          items: [
            { label: "Хичээлийн хөтөлбөр", href: "academics.html#curriculum" },
            { label: "Тэнхимүүд", href: "academics.html#departments" },
            { label: "Хичээлийн хуваарь", href: "academics.html#calendar" }
          ]
        }
      ],
      feature: {
        title: "100% хятад хэл дээр",
        text: "Бүх хичээл хятад хэл дээр явагдаж, сурагчид академик түвшинд уугуул иргэн шиг эзэмшдэг.",
        href: "academics.html", cta: "Дэлгэрэнгүй"
      }
    },
    {
      label: "Элсэлт", href: "admissions.html", key: "admissions", type: "dropdown",
      items: [
        { label: "Элсэлтийн үйл явц", href: "admissions.html#process" },
        { label: "Тавигдах шаардлага", href: "admissions.html#requirements" },
        { label: "Хугацаа", href: "admissions.html#timeline" },
        { label: "Сургалтын төлбөр", href: "admissions.html#tuition" },
        { label: "Тэтгэлэг", href: "admissions.html#scholarships" },
        { label: "Материал татах", href: "admissions.html#forms" }
      ]
    },
    {
      label: "Сурагчийн амьдрал", href: "student-life.html", key: "student-life", type: "dropdown",
      items: [
        { label: "Спорт", href: "student-life.html#sports" },
        { label: "Урлаг ба хөгжим", href: "student-life.html#arts" },
        { label: "Клубууд", href: "student-life.html#clubs" },
        { label: "Дотуур байр", href: "student-life.html#dorm" },
        { label: "Хоол хүнс", href: "student-life.html#dining" },
        { label: "Сурагчийн дэмжлэг", href: "student-life.html#support" }
      ]
    },
    { label: "Мэдээ", href: "news.html", key: "news" },
    { label: "Цомог", href: "gallery.html", key: "gallery" },
    { label: "Асуулт", href: "faq.html", key: "faq" },
    { label: "Холбоо барих", href: "contact.html", key: "contact" }
  ];

  /* ---- 1. SVG хэрэгслүүд ----------------------------------- */
  var ICON = {
    phone: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.5.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.57 3.5a1 1 0 0 1-.25 1z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 4v10h16V8l-8 5z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 11h-4V7h2v4h2z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.7 0 3 0 4.1.06 1 .05 1.7.24 2.3.5.6.24 1.1.56 1.6 1.06.5.5.82 1 .96 1.6.26.6.45 1.3.5 2.3.06 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.05 1-.24 1.7-.5 2.3a4.3 4.3 0 0 1-1.06 1.6c-.5.5-1 .82-1.6.96-.6.26-1.3.45-2.3.5-1.1.06-1.4.06-4.1.06s-3 0-4.1-.06c-1-.05-1.7-.24-2.3-.5a4.3 4.3 0 0 1-1.6-1.06 4.3 4.3 0 0 1-.96-1.6c-.26-.6-.45-1.3-.5-2.3C2 15 2 14.7 2 12s0-3 .06-4.1c.05-1 .24-1.7.5-2.3.24-.6.56-1.1 1.06-1.6.5-.5 1-.82 1.6-.96.6-.26 1.3-.45 2.3-.5C9 2 9.3 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.4 6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7c.2.9.9 1.5 1.7 1.7 1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7C23 15.2 23 12 23 12zM9.8 15.3V8.7l5.7 3.3z"/></svg>',
    fb2: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h2.7l.4-3H13V9.2c0-.9.3-1.5 1.5-1.5H16V5.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.7 1.3-3.7 3.8V11H7.5v3H10v8z"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>'
  };

  /* Лого: цагаан дэвсгэр дээр өнгөт, хар хөх дэвсгэр дээр цагаан хувилбар */
  var CREST = '<img class="brand__crest" src="assets/logo-bird.png" alt="Сургуулийн лого" width="360" height="365">';
  var CREST_LIGHT = '<img class="brand__crest" src="assets/logo-bird-light.png" alt="Сургуулийн лого" width="360" height="365">';

  /* ---- 2. Header барих ------------------------------------- */
  function buildHeader(activeKey) {
    var menu = NAV.map(function (n) {
      var current = n.key === activeKey ? ' aria-current="page"' : "";
      var caret = (n.type === "dropdown" || n.type === "mega")
        ? '<svg class="caret" viewBox="0 0 12 12" fill="currentColor"><path d="M6 8 1.5 3.5 2.9 2 6 5.2 9.1 2l1.4 1.5z"/></svg>' : "";
      var link = '<a class="nav-link" href="' + n.href + '"' + current + '>' + n.label + caret + '</a>';
      var panel = "";

      if (n.type === "dropdown") {
        panel = '<div class="dropdown">' +
          n.items.map(function (i) { return '<a href="' + i.href + '">' + i.label + '</a>'; }).join("") +
          '</div>';
      } else if (n.type === "mega") {
        var cols = n.cols.map(function (c) {
          return '<div class="mega__col"><h5>' + c.title + '</h5>' +
            c.items.map(function (i) { return '<a href="' + i.href + '">' + i.label + '</a>'; }).join("") +
            '</div>';
        }).join("");
        var f = n.feature;
        var feat = '<div class="mega__feature"><h5>' + f.title + '</h5><p>' + f.text +
          '</p><a class="link-arrow" style="color:#cba94f" href="' + f.href + '">' + f.cta + '</a></div>';
        panel = '<div class="mega">' + cols + feat + '</div>';
      }
      return '<li class="nav-item">' + link + panel + '</li>';
    }).join("");

    return '' +
      '<div class="container"><nav class="nav-bar" aria-label="Үндсэн цэс">' +
        '<a class="brand" href="index.html" aria-label="' + SCHOOL.name + ' — нүүр хуудас">' +
          CREST +
          '<span class="brand__text"><span class="brand__name">International School of Hohhot</span>' +
          '<span class="brand__sub">Хөххотын Олон Улсын Сургууль</span></span>' +
        '</a>' +
        '<ul class="nav-menu">' + menu + '</ul>' +
        '<div class="nav-actions">' +
          '<button class="nav-toggle" aria-label="Цэс нээх" aria-expanded="false"><span></span></button>' +
        '</div>' +
      '</nav></div>';
  }

  /* ---- 3. Footer барих ------------------------------------- */
  function buildFooter() {
    var quick = [
      ["Нүүр", "index.html"], ["Бидний тухай", "about.html"], ["Сургалт", "academics.html"],
      ["Элсэлт", "admissions.html"], ["Сурагчийн амьдрал", "student-life.html"],
      ["Мэдээ", "news.html"], ["Цомог", "gallery.html"], ["Асуулт", "faq.html"],
      ["Холбоо барих", "contact.html"]
    ];
    var admis = [
      ["Элсэлтийн үйл явц", "admissions.html#process"], ["Тавигдах шаардлага", "admissions.html#requirements"],
      ["Сургалтын төлбөр", "admissions.html#tuition"], ["Тэтгэлэг", "admissions.html#scholarships"],
      ["Материал татах", "admissions.html#forms"], ["Түгээмэл асуулт", "faq.html"]
    ];
    function links(arr) {
      return arr.map(function (a) { return '<li><a href="' + a[1] + '">' + a[0] + '</a></li>'; }).join("");
    }
    var year = new Date().getFullYear();

    return '' +
      '<div class="footer-cta"><div class="container">' +
        '<div><h3>Хөххотын Олон Улсын Дунд Сургуультай танилцаарай</h3><p>Сургалт, кампус, сурагчийн амьдралын дэлгэрэнгүй мэдээллийг үзнэ үү.</p></div>' +
        '<a class="btn btn--primary" href="about.html">Бидний тухай</a>' +
      '</div></div>' +
      '<div class="footer-main"><div class="container"><div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<a class="brand" href="index.html">' + CREST_LIGHT +
            '<span class="brand__text"><span class="brand__name">International School of Hohhot</span>' +
            '<span class="brand__sub">Хөххотын Олон Улсын Сургууль</span></span></a>' +
          '<p class="footer-about">Хятад–Монголын хамтарсан хөрөнгө оруулалттай, Хөххот болон Баяннуур хотод байрлах ' +
          'олон улсын дунд сургууль. Төгсөгчид хоёр улсын бүрэн дунд боловсролын гэрчилгээг хослон эзэмшинэ.</p>' +
          '<ul class="footer-contact">' +
            SCHOOL.locations.map(function (loc) {
              return '<li>' + ICON.pin + '<span>' +
                '<strong class="footer-loc">' + loc.label + '</strong>' +
                loc.lines.map(function (l) { return '<span class="footer-addr">' + l + '</span>'; }).join("") +
                '</span></li>';
            }).join("") +
            '<li>' + ICON.phone + '<a href="tel:77779701">' + SCHOOL.phone + '</a></li>' +
            '<li>' + ICON.mail + '<a href="mailto:' + SCHOOL.email + '">' + SCHOOL.email + '</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col"><h4>Холбоос</h4><ul class="footer-links">' + links(quick) + '</ul></div>' +
        '<div class="footer-col"><h4>Элсэлт</h4><ul class="footer-links">' + links(admis) + '</ul></div>' +
      '</div></div></div>' +
      '<div class="footer-bottom"><div class="container">' +
        '<span>© ' + year + ' ' + SCHOOL.name + '. Бүх эрх хуулиар хамгаалагдсан.</span>' +
      '</div></div>';
  }

  /* ---- 4. DOM бэлэн болмогц ажиллах ------------------------ */
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var body = document.body;
    var activeKey = body.getAttribute("data-page") || "";

    /* Header / Footer оруулах */
    var headerEl = document.getElementById("site-header");
    var footerEl = document.getElementById("site-footer");
    if (headerEl) headerEl.innerHTML = buildHeader(activeKey);
    if (footerEl) footerEl.innerHTML = buildFooter();

    /* Sticky header сүүдэр */
    var header = document.getElementById("site-header");
    function onScroll() {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 10);
      var btt = document.querySelector(".back-to-top");
      if (btt) btt.classList.toggle("is-visible", window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Мобайл цэс */
    var toggle = document.querySelector(".nav-toggle");
    var navMenu = document.querySelector(".nav-menu");
    var backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);

    function closeMenu() {
      if (!toggle) return;
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      if (navMenu) navMenu.classList.remove("is-open");
      backdrop.classList.remove("is-active");
      document.body.style.overflow = "";
    }
    if (toggle && navMenu) {
      toggle.addEventListener("click", function () {
        var open = toggle.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        navMenu.classList.toggle("is-open", open);
        backdrop.classList.toggle("is-active", open);
        document.body.style.overflow = open ? "hidden" : "";
      });
      backdrop.addEventListener("click", closeMenu);

      /* Мобайл дээр dropdown-г accordion болгон дэлгэх */
      navMenu.querySelectorAll(".nav-item").forEach(function (item) {
        var link = item.querySelector(".nav-link");
        var panel = item.querySelector(".dropdown, .mega");
        if (link && panel) {
          link.addEventListener("click", function (e) {
            if (window.innerWidth <= 1080) {
              e.preventDefault();
              item.classList.toggle("is-expanded");
            }
          });
        }
      });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
      window.addEventListener("resize", function () { if (window.innerWidth > 1080) closeMenu(); });
    }

    /* Тоон статистик — count up */
    var counters = document.querySelectorAll("[data-count]");
    if (counters.length && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          animateCount(en.target);
          io.unobserve(en.target);
        });
      }, { threshold: 0.4 });
      counters.forEach(function (c) { io.observe(c); });
    } else {
      counters.forEach(function (c) { c.textContent = group(c.getAttribute("data-count")); });
    }

    /* Мянгатыг таслалаар тусгаарлана: 3500 -> 3,500 */
    function group(n) {
      var parts = n.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }

    function animateCount(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var dec = (el.getAttribute("data-count").split(".")[1] || "").length;
      var dur = 1600, start = performance.now();
      function tick(now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = group((target * eased).toFixed(dec));
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = group(target.toFixed(dec));
      }
      requestAnimationFrame(tick);
    }

    /* Дотоод жижиг холбоосыг зөөлөн гүйлгэх */
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });

    /* Дээш очих товч */
    var btt = document.querySelector(".back-to-top");
    if (btt) btt.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* Page loader-ийг унтраах */
    var loader = document.querySelector(".page-loader");
    if (loader) {
      window.addEventListener("load", function () {
        setTimeout(function () { loader.classList.add("is-done"); }, 350);
      });
      setTimeout(function () { loader.classList.add("is-done"); }, 2500); // fallback
    }
  });

  /* Гадна ашиглах боломжтой болгох (жишээ нь animation.js) */
  window.HOUDS_ICON = ICON;
})();
