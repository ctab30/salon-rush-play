/* Jenni's Book service worker. Build 2a437a02c06c6c92.
   Generated. Do not edit by hand.
   HTML is network-first and is not written back into the cache, so an
   online reload cannot mix a new shell with this build's hashed files.
   Hashed assets are cache-first. An update does not call skipWaiting
   until the page asks (first install, or the title screen). */
const CACHE = "jenni-book-2a437a02c06c6c92";
const PRECACHE = ["./","./assets/fredoka-latin-600-normal-C4zohCW5.woff2","./assets/fredoka-latin-600-normal-CcrEjrB4.woff","./assets/fredoka-latin-700-normal-BOIZVyIN.woff2","./assets/fredoka-latin-700-normal-C8FeHd3X.woff","./assets/index-BRWgLfzW.js","./assets/index-OVN4kbsw.css","./assets/nunito-latin-700-normal-Dort48En.woff2","./assets/nunito-latin-700-normal-OcDqTBcA.woff","./assets/nunito-latin-800-normal-D-J0wlBY.woff","./assets/nunito-latin-800-normal-Dz8SOQK_.woff2","./assets/nunito-latin-900-normal-BVB1fGs6.woff2","./assets/nunito-latin-900-normal-CVn49sIn.woff","./assets/premium-DDkjsTTt.css","./assets/styles-Bt0LvRGO.css","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512-maskable.png","./icons/icon-512.png","./index.html","./manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((key) => key.startsWith('jenni-book-') && key !== CACHE)
        .map((key) => caches.delete(key)),
    );
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

/* Vite and other static hosts send Vary: Origin. A navigation and a
   module script don't carry the same Origin as the install-time fetch,
   so a normal match misses and the offline reload is a blank page. */
function query(request) {
  return { ignoreVary: true, ignoreSearch: request.mode === 'navigate' };
}

async function fromCache(request) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request, query(request));
  if (hit) return hit;
  if (request.mode !== 'navigate') return undefined;
  return (await cache.match('./index.html', query(request))) || (await cache.match('./', query(request)));
}

async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch {
    const hit = await fromCache(request);
    if (hit) return hit;
    return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
  }
}

async function cacheFirst(request) {
  const hit = await fromCache(request);
  if (hit) return hit;
  try {
    const fresh = await fetch(request);
    if (fresh.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, fresh.clone());
    }
    return fresh;
  } catch {
    return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  const html = request.mode === 'navigate' || url.pathname.endsWith('/index.html');
  event.respondWith(html ? networkFirst(request) : cacheFirst(request));
});
