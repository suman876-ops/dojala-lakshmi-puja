/* ==========================================================================
   supabase.js  ·  Supabase backend (ছবি, ঘোষণা, শুভেচ্ছা, দর্শকের ছবি)
   config না থাকলে বা কোনো সমস্যা হলে সাইট লোকাল মোডে চলবে।
   ========================================================================== */
window.SB = (function () {
  "use strict";
  var cfg = window.SUPABASE_CONFIG || {};
  var BUCKET = cfg.bucket || "photos";
  var client = null;

  function configured() {
    return !!(cfg.url && cfg.anonKey && String(cfg.url).indexOf("http") === 0);
  }

  function makeClient(resolve) {
    try { client = window.supabase.createClient(cfg.url, cfg.anonKey); resolve(true); }
    catch (e) { client = null; resolve(false); }
  }

  function load() {
    return new Promise(function (resolve) {
      if (!configured()) return resolve(false);
      if (client) return resolve(true);
      if (window.supabase && window.supabase.createClient) return makeClient(resolve);
      var s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";
      s.async = true;
      s.onload = function () { makeClient(resolve); };
      s.onerror = function () { resolve(false); };
      document.head.appendChild(s);
    });
  }

  /* ---------------- auth ---------------- */
  function signIn(email, password) {
    return client.auth.signInWithPassword({ email: email, password: password }).then(function (r) {
      if (r.error) throw r.error;
      return r.data.user;
    });
  }
  function signOut() { return client.auth.signOut().catch(function () {}); }
  function currentUser() {
    return client.auth.getUser().then(function (r) { return r.data ? r.data.user : null; }).catch(function () { return null; });
  }

  /* ---------------- storage ---------------- */
  function upload(file, prefix, bucket) {
    var B = bucket || BUCKET;
    var name = (file && file.name) || "image.jpg";
    var ext = (name.split(".").pop() || "jpg").toLowerCase();
    if (!/^(jpe?g|png|webp|gif)$/.test(ext)) ext = "jpg";
    var path = (prefix || "uploads") + "/" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;
    return client.storage.from(B)
      .upload(path, file, { cacheControl: "31536000", upsert: false, contentType: file.type || "image/jpeg" })
      .then(function (r) {
        if (r.error) throw r.error;
        return client.storage.from(B).getPublicUrl(path).data.publicUrl;
      });
  }

  /* ---------------- photos ---------------- */
  function listPhotos() {
    return client.from("photos").select("*")
      .order("tag_type", { ascending: false })
      .order("sort", { ascending: true })
      .then(function (r) {
        if (r.error) throw r.error; return r.data || [];
      });
  }
  function addPhoto(row) {
    return client.from("photos").insert(row).select().single().then(function (r) { if (r.error) throw r.error; return r.data; });
  }
  function updatePhoto(id, patch) {
    return client.from("photos").update(patch).eq("id", id).then(function (r) { if (r.error) throw r.error; return r.data; });
  }
  function deletePhoto(id) {
    return client.from("photos").delete().eq("id", id).then(function (r) { if (r.error) throw r.error; });
  }

  /* ---------------- announcements ---------------- */
  function listAnnouncements() {
    return client.from("announcements").select("*").order("created_at", { ascending: false }).then(function (r) { if (r.error) throw r.error; return r.data || []; });
  }
  function addAnnouncement(text, date) {
    return client.from("announcements").insert({ text: text, date: date || "" }).select().single().then(function (r) { if (r.error) throw r.error; return r.data; });
  }
  function deleteAnnouncement(id) {
    return client.from("announcements").delete().eq("id", id).then(function (r) { if (r.error) throw r.error; });
  }

  /* ---------------- greetings ---------------- */
  function listGreetings() {
    return client.from("greetings").select("*").order("created_at", { ascending: false }).then(function (r) { if (r.error) throw r.error; return r.data || []; });
  }
  function addGreeting(name, msg) {
    return client.from("greetings").insert({ name: name, msg: msg }).select().single().then(function (r) { if (r.error) throw r.error; return r.data; });
  }
  function deleteGreeting(id) {
    return client.from("greetings").delete().eq("id", id).then(function (r) { if (r.error) throw r.error; });
  }

  /* ---------------- visitor photos ---------------- */
  function listVisitor() {
    return client.from("visitor_photos").select("*").order("created_at", { ascending: false }).then(function (r) { if (r.error) throw r.error; return r.data || []; });
  }
  function addVisitor(name, url) {
    return client.from("visitor_photos").insert({ name: name, url: url }).select().single().then(function (r) { if (r.error) throw r.error; return r.data; });
  }
  function deleteVisitor(id) {
    return client.from("visitor_photos").delete().eq("id", id).then(function (r) { if (r.error) throw r.error; });
  }

  /* ---------------- visitor counter ---------------- */
  function bumpVisit() {
    return client.rpc("bump_visit").then(function (r) { if (r.error) throw r.error; return r.data; });
  }

  /* ---------------- online presence ---------------- */
  var presenceCh = null, presenceUid = "u" + Math.random().toString(36).slice(2, 10);
  function presence(onChange) {
    try {
      if (presenceCh) { try { client.removeChannel(presenceCh); } catch (e) {} presenceCh = null; }
      presenceCh = client.channel("online", { config: { presence: { key: presenceUid } } });
      presenceCh.on("presence", { event: "sync" }, function () {
        var st = presenceCh.presenceState() || {};
        try { onChange(Object.keys(st).length); } catch (e) {}
      });
      presenceCh.subscribe(function (status) {
        if (status === "SUBSCRIBED") { try { presenceCh.track({ at: Date.now() }); } catch (e) {} }
      });
      return presenceCh;
    } catch (e) { return null; }
  }

  return {
    configured: configured, load: load, presence: presence, bumpVisit: bumpVisit,
    signIn: signIn, signOut: signOut, currentUser: currentUser, upload: upload,
    listPhotos: listPhotos, addPhoto: addPhoto, updatePhoto: updatePhoto, deletePhoto: deletePhoto,
    listAnnouncements: listAnnouncements, addAnnouncement: addAnnouncement, deleteAnnouncement: deleteAnnouncement,
    listGreetings: listGreetings, addGreeting: addGreeting, deleteGreeting: deleteGreeting,
    listVisitor: listVisitor, addVisitor: addVisitor, deleteVisitor: deleteVisitor
  };
})();
