// Minimal service worker so Chrome recognizes this as an installable PWA.
const CACHE_NAME = "kopincang-kasir-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

// Pass-through fetch handler (required for installability, no special caching logic)
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
