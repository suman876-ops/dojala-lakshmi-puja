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
      try { var ls = JSON.parse(localStorage.getItem(LS) || "null"); if (ls && typeof ls === "object") { DATA = ls; renderAll(); bootState.data = true; bootCheck(); return; } } catch (e) {}
      DATA = base;
      renderAll();
      bootState.data = true; bootCheck();
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

  /* ---------- downloads ---------- */
  function fetchBlob(url) {
    if (!url) return Promise.reject(new Error("no url"));
    if (url.indexOf("data:") === 0) {
      try {
        var parts = url.split(","), mime = (parts[0].match(/data:([^;]+)/) || [])[1] || "image/jpeg";
        var bin = atob(parts[1]), arr = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
        return Promise.resolve(new Blob([arr], { type: mime }));
      } catch (e) { return Promise.reject(e); }
    }
    return fetch(url, { mode: "cors" }).then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.blob(); });
  }
  function saveBlob(blob, name) {
    var u = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = u; a.download = name; a.style.display = "none";
    document.body.appendChild(a); a.click();
    setTimeout(function () { try { URL.revokeObjectURL(u); a.remove(); } catch (e) {} }, 2500);
  }
  function extOf(url) { return /\.png(\?|$)/i.test(url) ? "png" : (/\.webp(\?|$)/i.test(url) ? "webp" : "jpg"); }
  function loadJSZip() {
    return new Promise(function (res, rej) {
      if (window.JSZip) return res(window.JSZip);
      var s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js";
      s.async = true;
      s.onload = function () { window.JSZip ? res(window.JSZip) : rej(new Error("jszip")); };
      s.onerror = function () { rej(new Error("cdn")); };
      document.head.appendChild(s);
    });
  }
  function galleryIds(mode) {
    var g = DATA.gallery || {};
    return mode === "all" ? (g.puja || []).concat(g.committee || []) : (g[mode] || []);
  }
  function card(p, idx, list) {
    var badge = ((list.indexOf("gallery.") === 0 || list.indexOf("year.") === 0 || list === "visitor") && p.tag) ? '<span class="badge ' + (p.tagType === "live" ? "live" : "arch") + '">' + esc(p.tag) + "</span>" : "";
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
    var cards = arr.map(function (id, i) { return card(ph(id), i, "year." + yearSel); });
    if (String(yearSel) === String(new Date().getFullYear())) {
      var vp = DATA.visitorPhotos || [];
      cards = cards.concat(vp.slice().reverse().map(function (p, i) {
        return card({ src: p.src, caption: p.name || "", tag: "এই বছর", tagType: "live" }, vp.length - 1 - i, "visitor");
      }));
    }
    g.innerHTML = cards.length ? cards.join("")
      : '<div class="empty">' + toBn(yearSel || "") + " সালের ছবি এখনো যোগ করা হয়নি। অ্যাডমিন প্যানেল থেকে যোগ করুন।</div>";
    tilt();
  }

  /* ---------- lightbox ---------- */
  var lb = [], lbI = 0;
  function openLb(list, idx) {
    var arr;
    if (list === "visitor") arr = DATA.visitorPhotos || [];
    else if (list.indexOf("gallery.") === 0) arr = resolve(galleryIds(list.split(".")[1]));
    else if (list.indexOf("year.") === 0) arr = resolve((DATA.years || {})[list.split(".")[1]] || []);
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

  /* resize + compress in the browser before upload (fast on slow networks) */
  function shrinkImage(file, cb) {
    var r = new FileReader();
    r.onload = function () {
      var img = new Image();
      img.onload = function () {
        var m = 1280, w = img.width, h = img.height;
        if (Math.max(w, h) > m) { var s = m / Math.max(w, h); w = Math.round(w * s); h = Math.round(h * s); }
        var c = document.createElement("canvas"); c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        try { c.toBlob(function (b) { cb(b || file); }, "image/jpeg", 0.76); } catch (e) { cb(file); }
      };
      img.onerror = function () { cb(file); };
      img.src = r.result;
    };
    r.onerror = function () { cb(file); };
    r.readAsDataURL(file);
  }

  function shrinkBlob(file) {
    return new Promise(function (res) {
      shrinkImage(file, function (blob) {
        var out = blob;
        try { if (blob && !(blob instanceof File)) out = new File([blob], "photo.jpg", { type: "image/jpeg" }); } catch (e) { out = file; }
        res(out);
      });
    });
  }

  /* compress, but never block the upload if compression stalls */
  function shrinkBlobSafe(file) {
    return new Promise(function (res) {
      var done = false;
      var t = setTimeout(function () { if (!done) { done = true; res(file); } }, 3500);
      try {
        shrinkBlob(file).then(function (out) { if (done) return; done = true; clearTimeout(t); res(out); });
      } catch (e) { if (!done) { done = true; clearTimeout(t); res(file); } }
    });
  }

  /* upload progress 0 -> 100 */
  function progressCtl(boxId, barId, pctId) {
    var box = $(boxId), bar = $(barId), pct = $(pctId), t = null;
    function paint(n) { if (bar) bar.style.width = n + "%"; if (pct) pct.textContent = toBn(n) + "%"; }
    return {
      start: function () {
        if (box) box.hidden = false;
        paint(0);
        var n = 0;
        if (t) clearInterval(t);
        t = setInterval(function () { n = Math.min(93, n + Math.max(1, Math.round((93 - n) / 9))); paint(n); }, 80);
      },
      done: function () {
        if (t) { clearInterval(t); t = null; }
        paint(100);
        setTimeout(function () { if (box) box.hidden = true; paint(0); }, 900);
      },
      fail: function () {
        if (t) { clearInterval(t); t = null; }
        if (box) box.hidden = true;
        paint(0);
      }
    };
  }

  /* ---------- music player ---------- */
  var musicInit = false;
  function music() {
    var a = $("audio"); if (!a) return;
    if (musicInit) return;
    musicInit = true;
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
      var ic = playing
        ? '<svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>'
        : '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
      if ($("playbtn")) $("playbtn").innerHTML = ic;
      if ($("discIcon")) $("discIcon").innerHTML = ic;
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
    a.addEventListener("error", function () { toast("গানটি লোড করা যায়নি — একটু পরে আবার চেষ্টা করুন।"); });
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
    var lbTouch = null, lbBox = $("lightbox");
    if (lbBox) {
      lbBox.addEventListener("touchstart", function (e) {
        if (!lbBox.classList.contains("open") || !e.touches || !e.touches.length) return;
        lbTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
      }, { passive: true });
      lbBox.addEventListener("touchend", function (e) {
        if (!lbTouch || !lb.length) { lbTouch = null; return; }
        var t = e.changedTouches && e.changedTouches[0]; if (!t) { lbTouch = null; return; }
        var dx = t.clientX - lbTouch.x, dy = t.clientY - lbTouch.y, dt = Date.now() - lbTouch.t;
        lbTouch = null;
        if (dt > 800 || Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
        lbI = dx < 0 ? (lbI + 1) % lb.length : (lbI - 1 + lb.length) % lb.length;
        showLb();
      }, { passive: true });
    }
    if ($("lbDl")) $("lbDl").addEventListener("click", function () {
      var p = lb[lbI]; if (!p || !p.src) return;
      toast("ছবি নামানো হচ্ছে...");
      fetchBlob(p.src).then(function (b) { saveBlob(b, "dojala-photo-" + (lbI + 1) + "." + extOf(p.src)); })
        .catch(function () { try { window.open(p.src, "_blank"); } catch (e) {} });
    });
    if ($("dlAll")) $("dlAll").addEventListener("click", function () {
      var arr = resolve(galleryIds("all")).concat(DATA.visitorPhotos || []);
      if (!arr.length) return toast("এখনো কোনো ছবি নেই।");
      var btn = this; btn.disabled = true;
      toast("সব ছবি নামানো হচ্ছে... একটু অপেক্ষা করুন।");
      loadJSZip().then(function (JSZip) {
        var zip = new JSZip(), chain = Promise.resolve(), ok = 0;
        arr.forEach(function (p, i) {
          chain = chain.then(function () {
            return fetchBlob(p.src).then(function (b) {
              zip.file("dojala-photo-" + pad(i + 1) + "." + extOf(p.src), b);
              ok++;
              if (i % 4 === 0) toast("ছবি নামানো হচ্ছে... " + toBn(ok) + "/" + toBn(arr.length));
            }).catch(function () {});
          });
        });
        return chain.then(function () { return zip.generateAsync({ type: "blob" }); });
      }).then(function (blob) {
        saveBlob(blob, "dojala-photos.zip");
        toast(toBn(arr.length) + "টি ছবি ডাউনলোড হয়েছে।");
      }).catch(function () { toast("ডাউনলোড ব্যর্থ হয়েছে।"); })
        .then(function () { btn.disabled = false; });
    });
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
      if (SB_ON) {
        SB.addGreeting(n, m).then(function () { return refreshFromSB(); }).then(function () { $("grName").value = ""; $("grMsg").value = ""; toast("ধন্যবাদ! আপনার শুভেচ্ছা যোগ হয়েছে।"); })
          .catch(function () { toast("দুঃখিত, পাঠানো যায়নি।"); });
        return;
      }
      DATA.greetings = DATA.greetings || [];
      DATA.greetings.push({ name: n, msg: m, date: today() });
      save(); renderGreet(); $("grName").value = ""; $("grMsg").value = "";
      toast("ধন্যবাদ! আপনার শুভেচ্ছা যোগ হয়েছে।");
    });

    // visitor upload
    function clearUpPreview() {
      var pv = $("upPreview"); if (pv) { try { if (pv._url) URL.revokeObjectURL(pv._url); } catch (e) {} pv._url = null; pv.hidden = true; pv.innerHTML = ""; }
      if ($("upFile")) { $("upFile").value = ""; $("upFile")._file = null; $("upFile")._data = null; }
      if ($("upDrop")) $("upDrop").textContent = "এখানে ক্লিক করে ছবি নির্বাচন করুন";
      if ($("upName")) $("upName").value = "";
    }
    if ($("upFile")) $("upFile").addEventListener("change", function () {
      var f = this.files && this.files[0]; if (!f) return;
      if (!/^image\//.test(f.type || "")) { this.value = ""; return toast("শুধু ছবি (JPG / PNG) দেওয়া যাবে।"); }
      $("upFile")._file = f;
      readImage(f, function (d) { $("upFile")._data = d; });
      var pv = $("upPreview");
      if (pv) {
        try { if (pv._url) URL.revokeObjectURL(pv._url); } catch (e) {}
        var u = f;
        try { u = URL.createObjectURL(f); pv._url = u; } catch (e) { u = ""; }
        pv.hidden = false;
        pv.innerHTML = (u ? '<img src="' + u + '" alt="প্রিভিউ">' : "") +
          '<button type="button" class="up-prev-x" id="upPrevX" aria-label="বাতিল">✕</button>' +
          '<span class="up-prev-t">ছবি ঠিক আছে? নিচে “ছবি আপলোড করুন” চাপুন।</span>';
      }
      if ($("upDrop")) $("upDrop").textContent = "অন্য ছবি বেছে নিতে এখানে ক্লিক করুন";
    });
    if ($("upPreview")) $("upPreview").addEventListener("click", function (e) {
      if (e.target && e.target.closest && e.target.closest("#upPrevX")) clearUpPreview();
    });
    if ($("upSubmit")) $("upSubmit").addEventListener("click", function () {
      var btn = this;
      if (btn.disabled) return;
      var n = $("upName").value.trim();
      function needPhoto() {
        toast("আগে একটি ছবি বেছে নিন।");
        var d = $("upDrop");
        if (d) { d.classList.add("need"); setTimeout(function () { d.classList.remove("need"); }, 950); }
      }
      if (SB_ON) {
        var file = $("upFile")._file;
        if (!file) return needPhoto();
        if (!/^image\//.test(file.type || "")) return toast("শুধু ছবি (JPG / PNG) দেওয়া যাবে।");
        var pr = progressCtl("upProg", "upProgBar", "upProgPct");
        var label = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>আপলোড হচ্ছে...';
        pr.start(); toast("আপলোড হচ্ছে...");
        shrinkBlobSafe(file)
          .then(function (out) {
            return SB.upload(out, "visitor", "visitor").then(function (url) {
              return SB.addVisitor(n, url).then(function (row) {
                DATA.visitorPhotos = DATA.visitorPhotos || [];
                DATA.visitorPhotos.push({ name: n, src: url, id: row && row.id });
                var cy = new Date().getFullYear();
                DATA.years = DATA.years || {}; DATA.years[cy] = DATA.years[cy] || [];
                try { renderVisitor(); renderYearTabs(); renderYear(); } catch (e) {}
                return url;
              });
            });
          })
          .then(function () { pr.done(); clearUpPreview(); toast("ছবি যোগ হয়েছে! ধন্যবাদ।"); return refreshFromSB(); })
          .catch(function () { pr.fail(); toast("আপলোড ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"); })
          .then(function () { btn.disabled = false; btn.innerHTML = label; });
        return;
      }
      var d = $("upFile")._data; if (!d) return needPhoto();
      DATA.visitorPhotos = DATA.visitorPhotos || [];
      DATA.visitorPhotos.push({ name: n, src: d });
      save(); renderVisitor(); renderYear(); clearUpPreview();
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
      var u = location.href, t = "সার্বজনীন শ্রী শ্রী লক্ষ্মীপূজা — দোজলা";
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
      if (SB_ON) {
        if (!$("admPass").value) { $("loginMsg").className = "panel-msg err"; $("loginMsg").textContent = "পাসওয়ার্ড লিখুন।"; return; }
        $("loginMsg").className = "panel-msg"; $("loginMsg").textContent = "যাচাই করা হচ্ছে...";
        SB.signIn(ADMIN_EMAIL, $("admPass").value).then(function () {
          sessionStorage.setItem("dojala_admin", "1"); $("loginModal").classList.remove("open"); openAdmin();
        }).catch(function () { $("loginMsg").className = "panel-msg err"; $("loginMsg").textContent = "ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।"; });
        return;
      }
      if (DATA.adminPassword && $("admPass").value === DATA.adminPassword) { sessionStorage.setItem("dojala_admin", "1"); $("loginModal").classList.remove("open"); openAdmin(); }
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
    if ($("admSearch")) $("admSearch").addEventListener("input", function () {
      admQuery = this.value.trim().toLowerCase(); renderAdmPhotos();
    });
    if ($("dashUpload")) $("dashUpload").addEventListener("click", function () {
      var t = document.querySelector('[data-ptab="photos"]'); if (t) t.click();
    });
    if ($("dashDlAll")) $("dashDlAll").addEventListener("click", function () {
      var d = $("dlAll"); if (d) d.click();
    });
    if ($("dashLogout")) $("dashLogout").addEventListener("click", function () {
      try { sessionStorage.removeItem("dojala_admin"); } catch (e) {}
      try { if (SB.signOut) SB.signOut(); } catch (e) {}
      var m = $("adminModal"); if (m) m.classList.remove("open");
      toast("লগআউট হয়েছে।");
    });

    var admFiles = [];
    function renderAdmPreview() {
      var el = $("admPreview"); if (!el) return;
      el.innerHTML = admFiles.map(function (f, i) {
        var u = URL.createObjectURL(f);
        return '<span class="adm-thumb"><img src="' + u + '" alt=""><button class="adm-thumb-x" data-rfi="' + i + '" title="বাতিল">✕</button></span>';
      }).join("");
      if ($("admCount")) $("admCount").textContent = admFiles.length ? (toBn(admFiles.length) + "টি ছবি বেছে নেওয়া হয়েছে — এখন নিচের বোতামে চাপ দিন।") : "";
    }
    if ($("admFile")) $("admFile").addEventListener("change", function () {
      admFiles = admFiles.concat(Array.prototype.slice.call(this.files || []));
      this.value = "";
      renderAdmPreview();
    });
    if ($("admPreview")) $("admPreview").addEventListener("click", function (e) {
      var b = e.target.closest("[data-rfi]"); if (!b) return;
      admFiles.splice(+b.dataset.rfi, 1); renderAdmPreview();
    });
    if ($("admUpload")) $("admUpload").addEventListener("click", function () {
      var btn = this; if (btn.disabled) return;
      var cat = $("admCat").value, cap = $("admCap").value.trim(), arr = admListFor(cat);
      if (!admFiles.length) return admMsg("আগে ধাপ ৩-এ একটি ছবি বেছে নিন।", false);
      if (!arr) return admMsg("ভুল বিভাগ।", false);
      var files = admFiles.slice();
      var tooBig = files.filter(function (f) { return f.size > 25 * 1024 * 1024; });
      if (tooBig.length) return admMsg("কিছু ছবি অনেক বড় — সেগুলো বাদ দিন।", false);
      if (SB_ON) {
        var parts = cat.split(".");
        var category = parts[0] === "gallery" ? parts[1] : "puja";
        var year = parts[0] === "year" ? parseInt(parts[1], 10) : new Date().getFullYear();
        var pr = progressCtl("admProg", "admProgBar", "admProgPct");
        var run = function () {
          pr.start();
          var chain = Promise.resolve(), added = [];
          files.forEach(function (f, i) {
            chain = chain.then(function () {
              admMsg("আপলোড হচ্ছে... (" + toBn(i + 1) + "/" + toBn(files.length) + ")", true);
              return shrinkBlobSafe(f).then(function (out) {
                return SB.upload(out, "gallery").then(function (url) {
                  return SB.addPhoto({ url: url, caption: cap || "", tag: "এই বছর", tag_type: "live", category: category, year: year, sort: Date.now() + i });
                });
              }).then(function (row) { if (row && row.id) added.push(row); });
            });
          });
          chain.then(function () {
            added.forEach(function (row) {
              DATA.photos[row.id] = { src: row.url, caption: row.caption || "", tag: row.tag || "", tagType: row.tag_type || "live" };
              var c = row.category === "committee" ? "committee" : "puja";
              DATA.gallery[c] = DATA.gallery[c] || []; DATA.gallery[c].push(row.id);
              var y = row.year || new Date().getFullYear();
              DATA.years[y] = DATA.years[y] || []; DATA.years[y].push(row.id);
            });
            if (added.length) { try { renderAll(); } catch (e) {} }
            pr.done();
            admFiles = []; renderAdmPreview(); $("admCap").value = "";
            admMsg(toBn(files.length) + "টি ছবি যোগ হয়েছে।", true);
            return refreshFromSB();
          }).catch(function (e) { pr.fail(); admMsg("আপলোড ব্যর্থ: " + (e && e.message ? e.message : "") + "। আবার চেষ্টা করুন।", false); })
            .then(function () { btn.disabled = false; });
        };
        admMsg("যাচাই করা হচ্ছে...", true);
        btn.disabled = true;
        SB.currentUser().then(function (u) {
          if (!u) { btn.disabled = false; admMsg("লগইন শেষ হয়ে গেছে — আবার পাসওয়ার্ড দিয়ে লগইন করে চেষ্টা করুন।", false); return; }
          run();
        }).catch(function () { run(); });
        return;
      }
      var done = 0;
      files.forEach(function (f) {
        readImage(f, function (d) {
          var id = "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
          DATA.photos[id] = { src: d, caption: cap || "" };
          arr.push(id); done++;
          if (done === files.length) { save(); renderAdmPhotos(); renderGallery(); renderYear(); admFiles = []; renderAdmPreview(); $("admCap").value = ""; admMsg(toBn(done) + "টি ছবি যোগ হয়েছে।", true); }
        });
      });
    });
    if ($("admPhotoList")) $("admPhotoList").addEventListener("click", function (e) {
      var b = e.target.closest("[data-delcat]"); if (!b) return;
      if (!confirm("এই ছবিটি মুছে ফেলবেন?")) return;
      var arr = admListFor(b.dataset.delcat), did = arr[+b.dataset.deli];
      if (SB_ON) {
        SB.deletePhoto(did).then(function () { return refreshFromSB(); }).then(function () { admMsg("ছবি মুছে ফেলা হয়েছে।", true); })
          .catch(function (e) { admMsg("মুছতে ব্যর্থ: " + (e && e.message ? e.message : ""), false); });
        return;
      }
      arr.splice(+b.dataset.deli, 1);
      cleanPhotos(); save(); renderAdmPhotos(); renderGallery(); renderYear(); admMsg("ছবি মুছে ফেলা হয়েছে।", true);
    });
    if ($("admAddNotice")) $("admAddNotice").addEventListener("click", function () {
      var t = $("admNotice").value.trim(); if (!t) return admMsg("ঘোষণার লেখা লিখুন।", false);
      if (SB_ON) {
        SB.addAnnouncement(t, today()).then(function () { return refreshFromSB(); }).then(function () { $("admNotice").value = ""; admMsg("ঘোষণা যোগ হয়েছে।", true); })
          .catch(function (e) { admMsg("ব্যর্থ: " + (e && e.message ? e.message : ""), false); });
        return;
      }
      DATA.announcements = DATA.announcements || [];
      DATA.announcements.unshift({ text: t, date: today() });
      save(); renderAdmNotices(); renderNotices(); $("admNotice").value = ""; admMsg("ঘোষণা যোগ হয়েছে।", true);
    });
    if ($("admNoticeList")) $("admNoticeList").addEventListener("click", function (e) {
      var b = e.target.closest("[data-delnotice]"); if (!b) return;
      if (!confirm("এই ঘোষণা মুছবেন?")) return;
      var ni = +b.dataset.delnotice;
      if (SB_ON) {
        SB.deleteAnnouncement(DATA.announcements[ni].id).then(function () { return refreshFromSB(); }).then(function () { admMsg("ঘোষণা মুছে ফেলা হয়েছে।", true); })
          .catch(function () { admMsg("ব্যর্থ হয়েছে।", false); });
        return;
      }
      DATA.announcements.splice(ni, 1); save(); renderAdmNotices(); renderNotices(); admMsg("ঘোষণা মুছে ফেলা হয়েছে।", true);
    });
    if ($("admGreetList")) $("admGreetList").addEventListener("click", function (e) {
      var b = e.target.closest("[data-delgreet],[data-delvphoto]"); if (!b) return;
      if (SB_ON) {
        var pr = b.hasAttribute("data-delgreet")
          ? SB.deleteGreeting(DATA.greetings[+b.dataset.delgreet].id)
          : SB.deleteVisitor(DATA.visitorPhotos[+b.dataset.delvphoto].id);
        pr.then(function () { return refreshFromSB(); }).then(function () { admMsg("মুছে ফেলা হয়েছে।", true); }).catch(function () { admMsg("ব্যর্থ হয়েছে।", false); });
        return;
      }
      if (b.hasAttribute("data-delgreet")) DATA.greetings.splice(+b.dataset.delgreet, 1);
      else DATA.visitorPhotos.splice(+b.dataset.delvphoto, 1);
      save(); renderAdmGreet(); renderGreet(); renderVisitor(); admMsg("মুছে ফেলা হয়েছে।", true);
    });
    if ($("admSaveSettings")) $("admSaveSettings").addEventListener("click", function () {
      var p = $("admNewPass").value.trim();
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
    if (cat.indexOf("gallery.") === 0) { var g = cat.split(".")[1]; DATA.gallery[g] = DATA.gallery[g] || []; return DATA.gallery[g]; }
    if (cat.indexOf("year.") === 0) { var y = cat.split(".")[1]; DATA.years[y] = DATA.years[y] || []; return DATA.years[y]; }
    return null;
  }
  function cleanPhotos() {
    var used = {};
    ["puja", "committee"].forEach(function (k) { (DATA.gallery[k] || []).forEach(function (id) { used[id] = 1; }); });
    Object.keys(DATA.years || {}).forEach(function (y) { (DATA.years[y] || []).forEach(function (id) { used[id] = 1; }); });
    Object.keys(DATA.photos || {}).forEach(function (id) { if (!used[id]) delete DATA.photos[id]; });
  }
  function renderAdmin() {
    renderAdmPhotos(); renderAdmNotices(); renderAdmGreet(); renderDashboard();
  }
  function renderDashboard() {
    var allPh = DATA.photos || {}, total = Object.keys(allPh).length, live = 0, arch = 0;
    Object.keys(allPh).forEach(function (id) { if ((allPh[id].tagType || "") === "live") live++; else arch++; });
    if ($("dashPhotos")) $("dashPhotos").textContent = toBn(total);
    if ($("dashThisYear")) $("dashThisYear").textContent = toBn(live);
    if ($("dashOld")) $("dashOld").textContent = toBn(arch);
    if ($("dashVisitor")) $("dashVisitor").textContent = toBn((DATA.visitorPhotos || []).length);
    if ($("dashNotices")) $("dashNotices").textContent = toBn((DATA.announcements || []).length);
    if ($("dashGreets")) $("dashGreets").textContent = toBn((DATA.greetings || []).length);
    var rec = $("dashRecent");
    if (rec) {
      var ids = [];
      try { ids = galleryIds("all").slice(0, 6); } catch (e) { ids = Object.keys(allPh).slice(0, 6); }
      if (!ids.length) ids = Object.keys(allPh).slice(0, 6);
      try {
        rec.innerHTML = ids.length ? ids.map(function (id) {
          var p = ph(id);
          return '<figure class="dash-thumb"><img src="' + esc(p.src) + '" alt="" loading="lazy"><figcaption>' + esc(p.caption || "ছবি") + "</figcaption></figure>";
        }).join("") : '<p class="hint">এখনো কোনো ছবি নেই।</p>';
      } catch (e) { rec.innerHTML = '<p class="hint">ছবি দেখানো যায়নি।</p>'; }
    }
  }
  var admQuery = "";
  function renderAdmPhotos() {
    var el = $("admPhotoList"); if (!el) return;
    var q = admQuery;
    var cats = [["gallery.puja", "গ্রামের পূজার ছবি"], ["gallery.committee", "কমিটির ছবি"]];
    Object.keys(DATA.years || {}).forEach(function (y) { cats.push(["year." + y, "ছবি — " + toBn(y)]); });
    var html = "";
    cats.forEach(function (c) {
      var arr = admListFor(c[0]); if (!arr || !arr.length) return;
      var rows = "";
      arr.forEach(function (id, i) {
        var p = ph(id);
        if (q && (p.caption || "").toLowerCase().indexOf(q) < 0) return;
        rows += '<li><img src="' + esc(p.src) + '" alt=""><span class="grow">' + esc(p.caption || "(ক্যাপশন নেই)") + "<small>" + esc(p.credit || "") + '</small></span><button class="del" data-delcat="' + c[0] + '" data-deli="' + i + '">✕</button></li>';
      });
      if (!rows) return;
      html += '<li style="background:none;padding:9px 4px 2px;color:var(--gold3);font-size:.85rem">' + esc(c[1]) + "</li>" + rows;
    });
    el.innerHTML = html || ('<li style="background:none;color:var(--dim)">' + (q ? "এই নামে কোনো ছবি নেই।" : "এখনো কোনো ছবি নেই।") + "</li>");
    if ($("admPhotoCount")) $("admPhotoCount").textContent = toBn(Object.keys(DATA.photos || {}).length);
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
    if ($("yr")) $("yr").textContent = toBn(new Date().getFullYear());
    var fb = DATA.facebook || {};
    if ($("fbPuja") && fb.puja) $("fbPuja").href = fb.puja.url;
    if ($("fbDojala") && fb.dojala) $("fbDojala").href = fb.dojala.url;
    observeReveal(); countUp();
  }

  /* ---------- supabase sync ---------- */
  var SB_ON = false;
  var ADMIN_EMAIL = "sumanmahata711@gmail.com";
  function sbReady() { return !!(window.SB && window.SB.configured()); }
  function applySB(photos, ann, greet, vis) {
    DATA.photos = {}; DATA.gallery = { puja: [], committee: [] }; DATA.years = {};
    var defYear = new Date().getFullYear();
    (photos || []).forEach(function (row) {
      DATA.photos[row.id] = { src: row.url, caption: row.caption || "", tag: row.tag || "", tagType: row.tag_type || "live" };
      var cat = row.category === "committee" ? "committee" : "puja";
      DATA.gallery[cat].push(row.id);
      var yr = row.year || defYear;
      DATA.years[yr] = DATA.years[yr] || [];
      DATA.years[yr].push(row.id);
    });
    DATA.announcements = (ann || []).map(function (a) { return { text: a.text, date: a.date || "", id: a.id }; });
    DATA.greetings = (greet || []).map(function (g) { return { name: g.name, msg: g.msg, id: g.id, date: "" }; });
    DATA.visitorPhotos = (vis || []).map(function (v) { return { name: v.name, src: v.url, id: v.id }; });
    if (DATA.visitorPhotos.length) { var curY = new Date().getFullYear(); DATA.years[curY] = DATA.years[curY] || []; }
  }
  function refreshFromSB() {
    return Promise.all([SB.listPhotos(), SB.listAnnouncements(), SB.listGreetings(), SB.listVisitor()])
      .then(function (r) { applySB(r[0], r[1], r[2], r[3]); renderAll(); renderAdmin(); bootState.data = true; bootCheck(); });
  }
  function initSB() {
    return SB.load().then(function (ok) {
      if (!ok) return;
      SB_ON = true;
      return refreshFromSB();
    }).catch(function () {}).then(function () { bootState.sb = true; bootCheck(); });
  }

  /* ---------- boot ---------- */
  var bootState = { load: false, data: false, sb: false };
  var bootTimer = null, bootHidden = false;
  function hideLoader() {
    if (bootHidden) return;
    bootHidden = true;
    if ($("loader")) $("loader").classList.add("done");
  }
  function bootCheck() {
    if (bootState.load && bootState.data && bootState.sb) bootDone();
  }
  function bootCounter() {
    var pct = $("ldPct"), bar = $("ldBar");
    if (!pct && !bar) return;
    var start = Date.now();
    bootTimer = setInterval(function () {
      var n = Math.min(95, Math.round((Date.now() - start) / 900 * 100));
      if (pct) pct.textContent = toBn(n) + "%";
      if (bar) bar.style.width = n + "%";
    }, 40);
  }
  function bootDone() {
    if (bootTimer) { clearInterval(bootTimer); bootTimer = null; }
    var pct = $("ldPct"), bar = $("ldBar");
    if (pct) pct.textContent = "১০০%";
    if (bar) bar.style.width = "100%";
    setTimeout(hideLoader, 300);
  }

  document.addEventListener("DOMContentLoaded", function () {
    bootCounter();
    embers(); parallax(); nav(); clock(); events();
    loadData();
    if (sbReady()) initSB(); else bootState.sb = true;
    setTimeout(revealAll, 1800);
    /* safety: never stay on the boot screen for more than 9 seconds */
    setTimeout(function () {
      bootState.load = true; bootState.data = true; bootState.sb = true;
      bootCheck();
    }, 9000);
  });
  window.addEventListener("load", function () { bootState.load = true; bootCheck(); });
})();
