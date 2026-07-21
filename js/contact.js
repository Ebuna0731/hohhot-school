/* =============================================================
   contact.js — Холбоо барих формын шалгалт (client-side)
   - Заавал бөглөх талбар, и-мэйл, утасны формат шалгах
   - Алдааг талбар бүр дээр харуулах, амжилттай төлөв
   Тэмдэглэл: backend байхгүй тул илгээлтийг симуляц хийнэ.
   ============================================================= */
(function () {
  "use strict";

  function init() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    var status = form.querySelector(".form-status");

    var rules = {
      name:    function (v) { return v.trim().length >= 2 || "Нэрээ бүрэн бичнэ үү."; },
      email:   function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Зөв и-мэйл хаяг оруулна уу."; },
      phone:   function (v) { return v.trim() === "" || /^[0-9+\-\s()]{6,}$/.test(v.trim()) || "Утасны дугаар буруу байна."; },
      subject: function (v) { return v.trim() !== "" || "Сэдвээ сонгоно уу."; },
      message: function (v) { return v.trim().length >= 10 || "Мессежээ дэлгэрэнгүй бичнэ үү (10+ тэмдэгт)."; }
    };

    function fieldOf(input) { return input.closest(".field"); }

    function setError(input, msg) {
      var f = fieldOf(input);
      if (!f) return;
      var box = f.querySelector(".error-msg");
      if (msg) {
        f.classList.add("is-invalid");
        if (box) box.textContent = msg;
        input.setAttribute("aria-invalid", "true");
      } else {
        f.classList.remove("is-invalid");
        if (box) box.textContent = "";
        input.removeAttribute("aria-invalid");
      }
    }

    function validate(input) {
      var rule = rules[input.name];
      if (!rule) return true;
      var res = rule(input.value);
      setError(input, res === true ? "" : res);
      return res === true;
    }

    /* Бичиж дуусаад шалгах */
    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      if (!input) return;
      input.addEventListener("blur", function () { validate(input); });
      input.addEventListener("input", function () {
        if (fieldOf(input).classList.contains("is-invalid")) validate(input);
      });
      input.addEventListener("change", function () { validate(input); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var firstBad = null;
      Object.keys(rules).forEach(function (name) {
        var input = form.elements[name];
        if (input && !validate(input)) { ok = false; if (!firstBad) firstBad = input; }
      });

      if (!ok) {
        status.className = "form-status is-error";
        status.textContent = "Зарим талбарыг зөв бөглөнө үү.";
        if (firstBad) firstBad.focus();
        return;
      }

      /* Илгээлтийн симуляц */
      var btn = form.querySelector('button[type="submit"]');
      var label = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Илгээж байна…";

      setTimeout(function () {
        btn.disabled = false;
        btn.textContent = label;
        form.reset();
        status.className = "form-status is-success";
        status.textContent = "Баярлалаа! Таны хүсэлтийг хүлээн авлаа. Бид удахгүй холбогдоно.";
        status.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 1100);
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
