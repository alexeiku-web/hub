const VERSION = "v3";
const SHELL = ["./", "index.html", "data.json", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "docs/8-week-workout-plan.pdf", "docs/beastmaker-1000-8-week-plan.pdf"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open("shell-" + VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => !k.endsWith(VERSION)).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (url.origin !== location.origin && !isFont) return;
  if (isFont) {
    e.respondWith(caches.open("fonts-" + VERSION).then((c) => c.match(req).then((hit) => hit || fetch(req).then((res) => { c.put(req, res.clone()); return res; }))));
    return;
  }
  // App files and data.json: network first so updates arrive, cached copy when offline.
  e.respondWith(fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); caches.open("shell-" + VERSION).then((c) => c.put(req, copy)); } return res; }).catch(() => caches.match(req, {ignoreSearch: true}).then((hit) => hit || caches.match("index.html"))));
});
