/* ==========================================================================
   app.js — সার্বজনীন শ্রী শ্রী লক্ষ্মীপূজা  ·  Dojala Lakshmi Puja
   ========================================================================== */
(function () {
  "use strict";

  var LS = "dojala_data_v2";
  var DEFAULT = window.SITE_DEFAULT || {};
  var DATA = {};

  /* ---------- helpers ---------- */
  var BN = "০১২৩৪৫৬৭৮৯";
  function toBn(n) { return String(n).replace(/[0-9]/g, function (d) { return BN[+d]; }); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }
  function $(id) { return document.getElementById(id); }
  function qsa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function bnDate(iso) { try { return new Date(iso).toLocaleDateString("bn-IN", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return iso; } }
  function today() { return new Date().toLocaleDateString("bn-IN", { day: "numeric", month: "long", year: "numeric" }); }

  function save() { try { localStorage.setItem(LS, JSON.stringify(DATA)); } catch (e) {} }

  function merge(base, over) {
    Object.keys(over || {}).forEach(function (k) { base[k] = over[k]; });
    return base;
  }

  function loadData() {
    var base = JSON.parse(JSON.stringify(DEFAULT));
    function finish() {
      try { var ls = JSON.parse(localStorage.getItem(LS) || "null"); if (ls && typeof ls === "object") { DATA = ls; return; } } catch (e) {}
      DATA = base;
      renderAll();
    }
    try {
      fetch("data.json", { cache: "no-store" }).then(function (r) {
        return r.ok ? r.json() : null;
      }).then(function (j) {
        if (j && typeof j === "object") { merge(base, j); }
        finish();
      }).catch(finish);
    } catch (e) { finish(); }
  }

  /* ---------- reveal ---------- */
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) : null;
  function revealAll() { qsa(".reveal:not(.in)").forEach(function (el) { el.classList.add("in"); }); }
  function observeReveal() {
    if (!io) { revealAll(); return; }
    qsa(".reveal:not(.in)").forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 6, 5) * 70) + "ms";
      io.observe(el);
    });
  }

  /* ---------- background: embers ---------- */
  function embers() {
    var c = $("embers"); if (!c) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var ctx = c.getContext("2d"), W, H, parts = [], n = 34;
    function size() { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; }
    size(); window.addEventListener("resize", size);
    for (var i = 0; i < n; i++) {
      parts.push({ x: Math.random() * W, y: Math.random() * H, r: 0.7 + Math.random() * 2, s: 0.15 + Math.random() * 0.5, a: Math.random() });
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.s; p.x += Math.sin((p.y + p.r * 40) * 0.01) * 0.25;
        if (p.y < -6) { p.y = H + 6; p.x = Math.random() * W; }
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        g.addColorStop(0, "rgba(255,224,150," + (0.55 * (0.4 + p.a)) + ")");
        g.addColorStop(1, "rgba(240,200,105,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, 6.283); ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    if (!reduce) draw();
  }

  /* ---------- parallax ---------- */
  function parallax() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    var layers = qsa("[data-par]");
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      layers.forEach(function (l) { l.style.transform = "translate3d(0," + (y * parseFloat(l.dataset.par)) + "px,0)"; });
    }, { passive: true });
    var hero = document.querySelector(".hero");
    if (hero) hero.addEventListener("mousemove", function (e) {
      var x = (e.clientX / window.innerWidth - 0.5), yy = (e.clientY / window.innerHeight - 0.5);
      qsa("[data-mx]").forEach(function (l) {
        var f = parseFloat(l.dataset.mx);
        l.style.transform = "translate3d(" + (x * f) + "px," + (yy * f) + "px,0)";
      });
    });
  }

  /* ---------- count-up ---------- */
  function countUp() {
    qsa("[data-count]").forEach(function (el) {
      var end = parseInt(el.dataset.count, 10), suf = el.dataset.suffix || "", t0 = null, dur = 1400;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = toBn(Math.round(end * e)) + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      var o = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { requestAnimationFrame(step); o.disconnect(); }
      });
      o.observe(el);
    });
  }

  /* ---------- nav ---------- */
  function nav() {
    if ($("menuBtn")) $("menuBtn").addEventListener("click", function () { $("navLinks").classList.toggle("open"); });
    if ($("navLinks")) $("navLinks").addEventListener("click", function (e) { if (e.target.tagName === "A") $("navLinks").classList.remove("open"); });
    var prog = $("navProg");
    window.addEventListener("scroll", function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (prog) prog.style.width = (h > 0 ? (window.scrollY / h * 100) : 0) + "%";
    }, { passive: true });
    var links = qsa(".nav-links a");
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
        }
      });
    }, { threshold: 0.3, rootMargin: "-30% 0px -55% 0px" });
    qsa("section[id]").forEach(function (s) { so.observe(s); });
  }

  /* ---------- live clock ---------- */
  function clock() {
    var el = $("liveTime"); if (!el) return;
    function upd() {
      var d = new Date(), h = d.getHours(), ap = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      el.textContent = h + ":" + pad(d.getMinutes()) + " " + ap;
    }
    upd(); setInterval(upd, 15000);
  }

  /* ---------- tilt ---------- */
  function tilt() {
    if (window.matchMedia("(pointer:coarse)").matches) return;
    qsa(".tilt").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(900px) rotateY(" + (x * 9) + "deg) rotateX(" + (-y * 9) + "deg) translateZ(8px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- notices ---------- */
  function renderNotices() {
    var ul = $("noticeList"); if (!ul) return;
    var arr = DATA.announcements || [];
    ul.innerHTML = arr.length
      ? arr.map(function (a) { return '<li><span class="dot"></span><div class="txt"><b>' + esc(a.text) + "</b>" + (a.date ? '<div class="dt">' + esc(a.date) + "</div>" : "") + "</div></li>"; }).join("")
      : '<li><span class="dot"></span><div class="txt"><b>কোনো ঘোষণা নেই</b><div class="dt">শীঘ্রই আসছে</div></div></li>';
    var txt = arr.length ? arr.map(function (a) { return a.text; }).join("   •   ") : "স্বাগতম! সার্বজনীন শ্রী শ্রী লক্ষ্মীপূজার ওয়েবসাইটে আপনাকে স্বাগত জানাই।";
    if ($("tickerText")) $("tickerText").textContent = txt;
  }

  /* ---------- gallery ---------- */
  var gMode = "all";
  function ph(id) { return (DATA.photos && DATA.photos[id]) || { src: "", caption: "" }; }
  function resolve(arr) { return (arr || []).map(ph); }
  function galleryIds(mode) {
    var g = DATA.gallery || {};
    return mode === "all" ? (g.puja || []).concat(g.committee || []) : (g[mode] || []);
  }
  function card(p, idx, list) {
    var badge = (list.indexOf("gallery.") === 0 && p.tag) ? '<span class="badge ' + (p.tagType === "live" ? "live" : "arch") + '">' + esc(p.tag) + "</span>" : "";
    return '<figure class="gitem tilt" data-list="' + list + '" data-idx="' + idx + '">' + badge +
      '<img src="' + esc(p.src) + '" alt="' + esc(p.caption || "দোজলা লক্ষ্মীপূজার ছবি") + '" loading="lazy" decoding="async">' +
      '<span class="zoom"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg></span>' +
      '<figcaption class="cap">' + esc(p.caption || "") + (p.credit ? "<small>" + esc(p.credit) + "</small>" : "") + "</figcaption></figure>";
  }
  function renderGallery() {
    var arr = galleryIds(gMode), g = $("galleryGrid"); if (!g) return;
    g.innerHTML = arr.length ? arr.map(function (id, i) { return card(ph(id), i, "gallery." + gMode); }).join("")
      : '<div class="empty">এই বিভাগে এখনো কোনো ছবি নেই। অ্যাডমিন প্যানেল থেকে ছবি যোগ করুন।</div>';
    tilt();
  }
  function renderYearTabs() {
    var years = Object.keys(DATA.years || {}).sort(function (a, b) { return b - a; }), tabs = $("yearTabs"); if (!tabs) return;
    if (!yearSel || years.indexOf(yearSel) < 0) yearSel = years[0] || null;
    tabs.innerHTML = years.map(function (y, i) { return '<button class="tab' + (i === 0 ? " active" : "") + '" data-ytab="' + y + '">' + toBn(y) + "</button>"; }).join("");
    qsa("[data-ytab]").forEach(function (b) {
      b.addEventListener("click", function () {
        qsa("[data-ytab]").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active"); yearSel = b.dataset.ytab; renderYear();
      });
    });
  }
  var yearSel = null;
  function renderYear() {
    var arr = (DATA.years && DATA.years[yearSel]) || [], g = $("yearGrid"); if (!g) return;
    g.innerHTML = arr.length ? arr.map(function (id, i) { return card(ph(id), i, "year." + yearSel); }).join("")
      : '<div class="empty">' + toBn(yearSel || "") + " সালের ছবি এখনো যোগ করা হয়নি। অ্যাডমিন প্যানেল থেকে যোগ করুন।</div>";
    tilt();
  }

  /* ---------- lightbox ---------- */
  var lb = [], lbI = 0;
  function openLb(list, idx) {
    var arr;
    if (list === "visitor") arr = DATA.visitorPhotos || [];
    else if (list.indexOf("gallery.") === 0) arr = resolve(galleryIds(list.split(".")[1]));
    else arr = resolve(list.split(".").reduce(function (o, k) { return o && o[k]; }, DATA) || []);
    lb = arr; lbI = idx; showLb();
  }
  function showLb() {
    var p = lb[lbI]; if (!p) return;
    $("lbImg").src = p.src;
    $("lbCap").innerHTML = esc(p.caption || p.name || "") + (p.credit ? "<small>" + esc(p.credit) + "</small>" : "");
    $("lightbox").classList.add("open");
  }

  /* ---------- greetings ---------- */
  function renderGreet() {
    var w = $("greetWall"); if (!w) return;
    var arr = DATA.greetings || [];
    w.innerHTML = arr.length ? arr.slice().reverse().map(function (g) {
      return '<div class="msg"><div class="who">' + esc(g.name || "অতিথি") + "</div><p>" + esc(g.msg || "") + "</p>" + (g.date ? '<div class="dt">' + esc(g.date) + "</div>" : "") + "</div>";
    }).join("") : '<div class="empty">এখনো কোনো শুভেচ্ছা বার্তা নেই। প্রথম হয়ে আপনিই লিখুন!</div>';
  }

  /* ---------- visitor photos ---------- */
  function renderVisitor() {
    var g = $("visitorGrid"); if (!g) return;
    var arr = DATA.visitorPhotos || [];
    g.innerHTML = arr.length ? arr.slice().reverse().map(function (p, i) {
      return '<figure class="gitem tilt" data-list="visitor" data-idx="' + (arr.length - 1 - i) + '"><img src="' + esc(p.src) + '" alt="' + esc(p.name || "দর্শকের ছবি") + '" loading="lazy"><figcaption class="cap">' + esc(p.name || "") + "</figcaption></figure>";
    }).join("") : '<div class="empty">এখনো কোনো দর্শক ছবি দেননি।</div>';
    tilt();
  }

  function readImage(file, cb) {
    var r = new FileReader();
    r.onload = function () {
      var img = new Image();
      img.onload = function () {
        var m = 1100, w = img.width, h = img.height;
        if (Math.max(w, h) > m) { var s = m / Math.max(w, h); w = Math.round(w * s); h = Math.round(h * s); }
        var c = document.createElement("canvas"); c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        cb(c.toDataURL("image/jpeg", 0.78));
      };
      img.src = r.result;
    };
    r.readAsDataURL(file);
  }

  /* ---------- music player ---------- */
  function music() {
    var a = $("audio"); if (!a) return;
    var list = (DATA.songs && DATA.songs.length) ? DATA.songs : ((DATA.song && DATA.song.src) ? [DATA.song] : []);
    var idx = 0;
    function cur() { return list[idx] || { title: "কোনো গান চলছে না", artist: "" }; }
    function load() {
      var s = cur();
      a.src = s.src || "";
      if ($("nowTitle")) $("nowTitle").textContent = s.title || "কোনো গান চলছে না";
      if ($("nowSub")) $("nowSub").textContent = s.artist || "শিল্পী বেছে নিন";
      if ($("cur")) $("cur").textContent = "০:০০";
      if ($("dur")) $("dur").textContent = "০:০০";
      if ($("fill")) $("fill").style.width = "0%";
    }
    var bars = qsa("#bars i"), bt = null;
    function paintBars() { bars.forEach(function (b) { b.style.height = (15 + Math.random() * 85) + "%"; }); }
    function startBars() { if (bt) return; bt = setInterval(paintBars, 160); paintBars(); }
    function stopBars() { clearInterval(bt); bt = null; bars.forEach(function (b) { b.style.height = "20%"; }); }
    function icon() {
      var playing = !a.paused && !a.ended;
      var p = $("playbtn"); if (p) p.innerHTML = playing
        ? '<svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>'
        : '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
      if ($("disc")) $("disc").classList.toggle("playing", playing);
      if ($("miniMusic")) $("miniMusic").classList.toggle("playing", playing);
      playing ? startBars() : stopBars();
    }
    function toggle() { if (a.paused) { a.play().catch(function () {}); } else { a.pause(); } }
    function step(d) { if (!list.length) return; idx = (idx + d + list.length) % list.length; load(); a.play().catch(function () {}); }
    if ($("playbtn")) $("playbtn").addEventListener("click", toggle);
    if ($("miniMusic")) $("miniMusic").addEventListener("click", toggle);
    if ($("disc")) $("disc").addEventListener("click", toggle);
    if ($("prevBtn")) $("prevBtn").addEventListener("click", function () { step(-1); });
    if ($("nextBtn")) $("nextBtn").addEventListener("click", function () { step(1); });
    a.addEventListener("play", icon); a.addEventListener("pause", icon);
    a.addEventListener("ended", function () { if (list.length > 1) step(1); else icon(); });
    a.addEventListener("timeupdate", function () {
      var p = a.duration ? (a.currentTime / a.duration * 100) : 0;
      if ($("fill")) $("fill").style.width = p + "%";
      if ($("cur")) $("cur").textContent = fmt(a.currentTime);
      if ($("dur")) $("dur").textContent = fmt(a.duration || 0);
    });
    a.addEventListener("loadedmetadata", function () { if ($("dur")) $("dur").textContent = fmt(a.duration || 0); });
    var bar = $("seek"); if (bar) bar.addEventListener("click", function (e) {
      var r = bar.getBoundingClientRect();
      if (a.duration) a.currentTime = ((e.clientX - r.left) / r.width) * a.duration;
    });
    function fmt(t) { t = Math.max(0, Math.floor(t || 0)); return toBn(Math.floor(t / 60)) + ":" + toBn(pad(t % 60)); }
    load();
    if ("mediaSession" in navigator) {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({ title: cur().title, artist: cur().artist || "", album: "দোজলা লক্ষ্মীপূজা" });
        navigator.mediaSession.setActionHandler("play", toggle);
        navigator.mediaSession.setActionHandler("pause", toggle);
      } catch (e) {}
    }
  }

  /* ---------- toast ---------- */
  var tT;
  function toast(m) {
    var t = $("toast"); if (!t) return;
    t.textContent = m; t.classList.add("show");
    clearTimeout(tT); tT = setTimeout(function () { t.classList.remove("show"); }, 2800);
  }
  function flash(id) { var el = $(id); if (!el) return; el.focus(); el.style.borderColor = "#c62a30"; setTimeout(function () { el.style.borderColor = ""; }, 1200); }

  /* ---------- events ---------- */
  function events() {
    // gallery tabs
    qsa("[data-gtab]").forEach(function (b) {
      b.addEventListener("click", function () {
        qsa("[data-gtab]").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active"); gMode = b.dataset.gtab; renderGallery();
      });
    });
    // lightbox
    document.addEventListener("click", function (e) {
      var it = e.target.closest ? e.target.closest(".gitem") : null;
      if (it) openLb(it.dataset.list, +it.dataset.idx);
    });
    if ($("lbClose")) $("lbClose").addEventListener("click", function () { $("lightbox").classList.remove("open"); });
    if ($("lbPrev")) $("lbPrev").addEventListener("click", function () { lbI = (lbI - 1 + lb.length) % lb.length; showLb(); });
    if ($("lbNext")) $("lbNext").addEventListener("click", function () { lbI = (lbI + 1) % lb.length; showLb(); });
    document.addEventListener("keydown", function (e) {
      if (!$("lightbox").classList.contains("open")) return;
      if (e.key === "Escape") $("lightbox").classList.remove("open");
      if (e.key === "ArrowLeft") $("lbPrev").click();
      if (e.key === "ArrowRight") $("lbNext").click();
    });
    if ($("lightbox")) $("lightbox").addEventListener("click", function (e) { if (e.target === $("lightbox")) $("lightbox").classList.remove("open"); });

    // greetings
    if ($("grSubmit")) $("grSubmit").addEventListener("click", function () {
      var n = $("grName").value.trim(), m = $("grMsg").value.trim();
      if (!n) return flash("grName");
      if (!m) return flash("grMsg");
      DATA.greetings = DATA.greetings || [];
      DATA.greetings.push({ name: n, msg: m, date: today() });
      save(); renderGreet(); $("grName").value = ""; $("grMsg").value = "";
      toast("ধন্যবাদ! আপনার শুভেচ্ছা যোগ হয়েছে।");
    });

    // visitor upload
    if ($("upFile")) $("upFile").addEventListener("change", function () {
      var f = this.files && this.files[0]; if (!f) return;
      readImage(f, function (d) { $("upFile")._data = d; });
    });
    if ($("upSubmit")) $("upSubmit").addEventListener("click", function () {
      var n = $("upName").value.trim(); if (!n) return flash("upName");
      var d = $("upFile")._data; if (!d) return toast("আগে একটি ছবি বেছে নিন।");
      DATA.visitorPhotos = DATA.visitorPhotos || [];
      DATA.visitorPhotos.push({ name: n, src: d });
      save(); renderVisitor(); $("upName").value = ""; $("upFile").value = ""; $("upFile")._data = null;
      toast("ছবি যোগ হয়েছে! ধন্যবাদ।");
    });

    // to top
    if ($("toTop")) {
      $("toTop").addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
      window.addEventListener("scroll", function () { $("toTop").classList.toggle("show", window.scrollY > 700); }, { passive: true });
    }

    // overlays close
    qsa("[data-close]").forEach(function (b) { b.addEventListener("click", function () { $(b.dataset.close).classList.remove("open"); }); });
    qsa(".overlay").forEach(function (o) { o.addEventListener("click", function (e) { if (e.target === o) o.classList.remove("open"); }); });

    if ($("shareWa")) $("shareWa").addEventListener("click", function () {
      var u = location.href, t = "সার্বজনীন শ্রী শ্রী লক্ষ্মীপূজা — দোজলা মুড়াবনী";
      window.open("https://wa.me/?text=" + encodeURIComponent(t + " " + u), "_blank");
    });
    if ($("copyLink")) $("copyLink").addEventListener("click", function () {
      var u = location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(u).then(function () { toast("লিংক কপি হয়েছে!"); }, function () { toast(u); });
      } else { toast(u); }
    });

    adminEvents();
  }

  /* ---------- admin ---------- */
  function openModal(id) { $(id).classList.add("open"); }
  function admMsg(t, ok) {
    var m = $("admMsg"); m.className = "panel-msg " + (ok ? "ok" : "err"); m.textContent = t;
    clearTimeout(m._t); m._t = setTimeout(function () { m.className = "panel-msg"; }, 3200);
  }
  function openAdmin() { openModal("adminModal"); renderAdmin(); }
  function adminEvents() {
    if ($("adminOpen")) $("adminOpen").addEventListener("click", function () {
      if (sessionStorage.getItem("dojala_admin") === "1") openAdmin();
      else { $("admPass").value = ""; $("loginMsg").className = "panel-msg"; openModal("loginModal"); setTimeout(function () { $("admPass").focus(); }, 80); }
    });
    if ($("loginBtn")) $("loginBtn").addEventListener("click", function () {
      if ($("admPass").value === DATA.adminPassword) { sessionStorage.setItem("dojala_admin", "1"); $("loginModal").classList.remove("open"); openAdmin(); }
      else { $("loginMsg").className = "panel-msg err"; $("loginMsg").textContent = "ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।"; }
    });
    if ($("admPass")) $("admPass").addEventListener("keydown", function (e) { if (e.key === "Enter") $("loginBtn").click(); });

    qsa("[data-ptab]").forEach(function (b) {
      b.addEventListener("click", function () {
        qsa("[data-ptab]").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        qsa("[data-pbody]").forEach(function (x) { x.hidden = x.dataset.pbody !== b.dataset.ptab; });
      });
    });

    if ($("admFile")) $("admFile").addEventListener("change", function () {
      var files = Array.prototype.slice.call(this.files || []); if (!files.length) return;
      var cat = $("admCat").value, cap = $("admCap").value.trim(), arr = admListFor(cat);
      if (!arr) return admMsg("ভুল বিভাগ।", false);
      var done = 0;
      files.forEach(function (f) {
        readImage(f, function (d) {
          var id = "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
          DATA.photos[id] = { src: d, caption: cap || "" };
          arr.push(id); done++;
          if (done === files.length) { save(); renderAdmPhotos(); renderGallery(); renderYear(); admMsg(done + "টি ছবি যোগ হয়েছে।", true); $("admFile").value = ""; $("admCap").value = ""; }
        });
      });
    });
    if ($("admPhotoList")) $("admPhotoList").addEventListener("click", function (e) {
      var b = e.target.closest("[data-delcat]"); if (!b) return;
      if (!confirm("এই ছবিটি মুছে ফেলবেন?")) return;
      var arr = admListFor(b.dataset.delcat); arr.splice(+b.dataset.deli, 1);
      cleanPhotos(); save(); renderAdmPhotos(); renderGallery(); renderYear(); admMsg("ছবি মুছে ফেলা হয়েছে।", true);
    });
    if ($("admAddNotice")) $("admAddNotice").addEventListener("click", function () {
      var t = $("admNotice").value.trim(); if (!t) return admMsg("ঘোষণার লেখা লিখুন।", false);
      DATA.announcements = DATA.announcements || [];
      DATA.announcements.unshift({ text: t, date: today() });
      save(); renderAdmNotices(); renderNotices(); $("admNotice").value = ""; admMsg("ঘোষণা যোগ হয়েছে।", true);
    });
    if ($("admNoticeList")) $("admNoticeList").addEventListener("click", function (e) {
      var b = e.target.closest("[data-delnotice]"); if (!b) return;
      if (!confirm("এই ঘোষণা মুছবেন?")) return;
      DATA.announcements.splice(+b.dataset.delnotice, 1); save(); renderAdmNotices(); renderNotices(); admMsg("ঘোষণা মুছে ফেলা হয়েছে।", true);
    });
    if ($("admGreetList")) $("admGreetList").addEventListener("click", function (e) {
      var b = e.target.closest("[data-delgreet],[data-delvphoto]"); if (!b) return;
      if (b.hasAttribute("data-delgreet")) DATA.greetings.splice(+b.dataset.delgreet, 1);
      else DATA.visitorPhotos.splice(+b.dataset.delvphoto, 1);
      save(); renderAdmGreet(); renderGreet(); renderVisitor(); admMsg("মুছে ফেলা হয়েছে।", true);
    });
    if ($("admSaveSettings")) $("admSaveSettings").addEventListener("click", function () {
      var d = $("admDate").value, p = $("admNewPass").value.trim();
      if (d) DATA.countdownTarget = d + "T18:00:00+05:30";
      if (p) DATA.adminPassword = p;
      save(); admMsg("সেটিংস সংরক্ষিত হয়েছে।", true); $("admNewPass").value = "";
    });
    if ($("admReset")) $("admReset").addEventListener("click", function () {
      if (!confirm("সব পরিবর্তন মুছে ডিফল্টে ফিরবেন?")) return;
      localStorage.removeItem(LS); DATA = JSON.parse(JSON.stringify(DEFAULT));
      renderAll(); renderAdmin(); admMsg("ডিফল্টে ফিরে এসেছে।", true);
    });
    if ($("admExport")) $("admExport").addEventListener("click", function () {
      DATA.version = (DATA.version || 1) + 1;
      save();
      var blob = new Blob([JSON.stringify(DATA)], { type: "application/json" });
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "data.json";
      document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 400);
      admMsg("data.json ডাউনলোড হয়েছে — সাইটের ফোল্ডারে আপলোড করুন।", true);
    });
  }

  function admListFor(cat) {
    if (cat.indexOf("gallery.") === 0) return DATA.gallery[cat.split(".")[1]];
    if (cat.indexOf("year.") === 0) return DATA.years[cat.split(".")[1]];
    return null;
  }
  function cleanPhotos() {
    var used = {};
    ["puja", "committee"].forEach(function (k) { (DATA.gallery[k] || []).forEach(function (id) { used[id] = 1; }); });
    Object.keys(DATA.years || {}).forEach(function (y) { (DATA.years[y] || []).forEach(function (id) { used[id] = 1; }); });
    Object.keys(DATA.photos || {}).forEach(function (id) { if (!used[id]) delete DATA.photos[id]; });
  }
  function renderAdmin() {
    if ($("admDate")) $("admDate").value = (DATA.countdownTarget || "").slice(0, 10);
    renderAdmPhotos(); renderAdmNotices(); renderAdmGreet();
  }
  function renderAdmPhotos() {
    var el = $("admPhotoList"); if (!el) return;
    var cats = [["gallery.puja", "গ্রামের পূজার ছবি"], ["gallery.committee", "কমিটির ছবি"]];
    Object.keys(DATA.years || {}).forEach(function (y) { cats.push(["year." + y, "ছবি — " + toBn(y)]); });
    var html = "";
    cats.forEach(function (c) {
      var arr = admListFor(c[0]); if (!arr || !arr.length) return;
      html += '<li style="background:none;padding:9px 4px 2px;color:var(--gold3);font-size:.85rem">' + esc(c[1]) + "</li>";
      arr.forEach(function (id, i) {
        var p = ph(id);
        html += '<li><img src="' + esc(p.src) + '" alt=""><span class="grow">' + esc(p.caption || "(ক্যাপশন নেই)") + "<small>" + esc(p.credit || "") + '</small></span><button class="del" data-delcat="' + c[0] + '" data-deli="' + i + '">✕</button></li>';
      });
    });
    el.innerHTML = html || '<li style="background:none;color:var(--dim)">এখনো কোনো ছবি নেই।</li>';
  }
  function renderAdmNotices() {
    var el = $("admNoticeList"); if (!el) return;
    var arr = DATA.announcements || [];
    el.innerHTML = arr.length ? arr.map(function (a, i) { return '<li><span class="grow">' + esc(a.text) + "<small>" + esc(a.date || "") + '</small></span><button class="del" data-delnotice="' + i + '">✕</button></li>'; }).join("")
      : '<li style="background:none;color:var(--dim)">কোনো ঘোষণা নেই।</li>';
  }
  function renderAdmGreet() {
    var el = $("admGreetList"); if (!el) return;
    var g = DATA.greetings || [], v = DATA.visitorPhotos || [], html = "";
    if (g.length) html += '<li style="background:none;padding:9px 4px 2px;color:var(--gold3);font-size:.85rem">শুভেচ্ছা বার্তা</li>';
    g.forEach(function (x, i) { html += '<li><span class="grow"><b>' + esc(x.name) + "</b><small>" + esc(x.msg) + '</small></span><button class="del" data-delgreet="' + i + '">✕</button></li>'; });
    if (v.length) html += '<li style="background:none;padding:9px 4px 2px;color:var(--gold3);font-size:.85rem">দর্শকের ছবি</li>';
    v.forEach(function (x, i) { html += '<li><img src="' + esc(x.src) + '" alt=""><span class="grow">' + esc(x.name) + '</span><button class="del" data-delvphoto="' + i + '">✕</button></li>'; });
    el.innerHTML = html || '<li style="background:none;color:var(--dim)">এখনো কিছু আসেনি।</li>';
  }

  /* ---------- render all ---------- */
  function renderAll() {
    renderNotices(); renderGallery(); renderYearTabs(); renderYear(); renderGreet(); renderVisitor();
    music();
    if ($("cdDate")) $("cdDate").textContent = bnDate(DATA.countdownTarget);
    if ($("yr")) $("yr").textContent = toBn(new Date().getFullYear());
    var fb = DATA.facebook || {};
    if ($("fbPuja") && fb.puja) $("fbPuja").href = fb.puja.url;
    if ($("fbDojala") && fb.dojala) $("fbDojala").href = fb.dojala.url;
    observeReveal(); countUp();
  }

  /* ---------- boot ---------- */
  function hideLoader() { if ($("loader")) $("loader").classList.add("done"); }
  document.addEventListener("DOMContentLoaded", function () {
    embers(); parallax(); nav(); clock(); events();
    loadData();
    setTimeout(hideLoader, 650);
    setTimeout(revealAll, 1800);
  });
  window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 2600);
})();
