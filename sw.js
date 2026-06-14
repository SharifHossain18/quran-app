const CACHE_NAME = 'quran-majid-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './style.v3.css',
  './app.v3.js',
  './PDMS_Saleem_QuranFont.ttf',
  './data/pageRelation.json',
  './data/rukuSurahRelation.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter(k => k !== CACHE_NAME && k !== 'quran-audio-cache')
            .map(k => caches.delete(k))
        );
      }),
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only handle GET requests and http/https schemes (ignore extensions, etc.)
  if (event.request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Skip caching external audio files and APIs in the app shell cache
  const isAudioRequest = url.hostname.includes('everyayah.com');
  const isApiRequest = url.hostname.includes('api.alquran.cloud');

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((res) => {
        // Only cache valid standard responses, and do not cache audio/APIs in CACHE_NAME
        if (res && res.status === 200 && !isAudioRequest && !isApiRequest) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          }).catch((err) => {
            console.warn('Failed to cache response:', err);
          });
        }
        return res;
      }).catch((err) => {
        // Propagate the error for fetches that genuinely fail
        throw err;
      });
    })
  );
});
