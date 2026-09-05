/* iBooth service worker.

   Two jobs, and only two.

   1. The app opens with no signal. A trade-show floor regularly has none, and
      today the page itself still has to be fetched before any of the offline
      cleverness inside it matters.

   2. The app can be added to the home screen, which is what actually stops
      Safari deleting a rep's entire show. WebKit wipes all script-writable
      storage — localStorage included — after seven days of Safari use without
      the user touching the site, and a home-screen web app is exempt because
      it is not Safari and keeps its own counter. Without this, a rep who works
      a show and does not reopen the app for a week loses everything they
      captured unless they exported. A manifest alone does not make iOS offer
      the install; the service worker is part of the price.

   BUILD_STAMP is substituted by build.sh, so every build gets its own cache
   and the old ones are deleted on activate. A service worker that serves a
   stale app forever is a worse bug than the one it fixes.  */

var STAMP = '2026-09-05-4147b7';
var CACHE = 'ibooth-' + STAMP;

/* The app and the barcode engine, which is what a rep needs on the floor.
   The PDF writer goes in too, so the executive summary can still be built on
   the train home. Deliberately NOT the card reader — that engine is 11 MB and
   is fetched on demand — and deliberately not the account book, which changes
   on its own schedule and is handled below. */
var SHELL = [
  './',
  './index.html',
  './zxing/zxing_reader.wasm',
  './pdf/jspdf.umd.min.js',
  './icon-192.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      /* one missing file must not sink the whole install, or a renamed asset
         silently leaves every phone with no offline copy at all */
      return Promise.all(SHELL.map(function (u) {
        return c.add(u).catch(function () { return null; });
      }));
    }).then(function () {
      /* Take over as the active worker straight away, but do NOT claim pages
         that are already open. A rep mid-scan should not have the app swapped
         under them; they get the new version the next time they open it. */
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(names.map(function (n) {
        return (n !== CACHE && n.indexOf('ibooth-') === 0) ? caches.delete(n) : null;
      }));
    })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }

  /* Anything that is not ours — the Anthropic API, fonts, the card engine's
     CDN — goes straight to the network. A service worker has no business
     sitting in front of somebody's API call. */
  if (url.origin !== self.location.origin) return;

  /* The account book and its stamp are versioned data, not app shell. The app
     fetches them with cache:'no-store' precisely so it can tell whether a
     newer one has been published; caching them here would defeat that. */
  if (/account-book\.(enc|stamp|json)$/.test(url.pathname)) return;

  /* The page itself: network first, so a redeploy is picked up on the next
     launch, with the cache as the fallback that makes a dead network a
     non-event. */
  if (req.mode === 'navigate' || /\/(index\.html)?$/.test(url.pathname)) {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put('./index.html', copy); });
        return res;
      }).catch(function () {
        return caches.match('./index.html').then(function (hit) {
          return hit || caches.match('./');
        });
      })
    );
    return;
  }

  /* Everything else of ours is a static asset: cache first, and quietly fill
     the cache on the way past so the second show is faster than the first. */
  e.respondWith(
    caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
