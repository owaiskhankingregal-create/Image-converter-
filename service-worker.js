const CACHE_NAME = 'ai-headshot-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/vite.svg',
];

// Install event: cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: serve from cache, fall back to network, and cache new requests
self.addEventListener('fetch', event => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request)
        .then(response => {
          // Return from cache if found
          if (response) {
            return response;
          }

          // Otherwise, fetch from network
          return fetch(event.request).then(networkResponse => {
            // Check if we received a valid response
            if (networkResponse && networkResponse.status === 200) {
              // Clone the response because it's a stream and can only be consumed once.
              const responseToCache = networkResponse.clone();
              cache.put(event.request, responseToCache);
            }
            return networkResponse;
          }).catch(error => {
            // Handle fetch errors
            console.error('Fetching failed:', error);
            throw error;
          });
        });
    })
  );
});
