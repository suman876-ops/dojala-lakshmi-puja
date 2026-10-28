/* Dojala Lakshmi Puja — service worker
   Goal: instant repeat visits and a usable page on a weak or dead connection.
   Strategy:
     - HTML / CSS / JS  -> network first (always shows the newest version), cache as fallback
     - images / audio   -> cache first (they never change under the same file name)
     - other origins (Supabase API, CDN) -> untouched
*/
var VER = "dojala-v1";
var SHELL = [
  "./",
  "./index.html",
  "./assets/css/style.css",
  "./assets/js/data.js",
  "./assets/js/app.js",
  "./assets/js/supabase.js"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(VER)
      .then(function (c) {
        return Promise.all(SHELL.map(function (u) {
          return c.add(u).catch(function () {});
        }));
      })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== VER; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;

  var isMedia = /\.(webp|jpe?g|png|gif|svg|ico|mp3|woff2?)$/i.test(url.pathname);

  if (isMedia) {
    e.respondWith(
      caches.match(req).then(function (hit) {
        if (hit) return hit;
        return fetch(req).then(function (res) {
          if (res && res.status === 200) {
            var copy = res.clone();
            caches.open(VER).then(function (c) { c.put(req, copy); }).catch(function () {});
          }
          return res;
        }).catch(function () { return hit; });
      })
    );
    return;
  }

  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.status === 200) {
        var copy = res.clone();
        caches.open(VER).then(function (c) { c.put(req, copy); }).catch(function () {});
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) {
        if (hit) return hit;
        return caches.match("./index.html").then(function (home) {
          return home || caches.match("./");
        });
      });
    })
  );
});
