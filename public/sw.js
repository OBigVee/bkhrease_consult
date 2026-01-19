// Service Worker for B.Khrease Academic Website
// Provides basic caching for improved performance

const CACHE_NAME = 'bkhrease-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/services',
  '/team',
  '/contact',
  '/blog',
  '/news',
  '/bk.jpg',
  '/favicon.ico',
  '/_next/static/css/',
  '/_next/static/js/',
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(
          STATIC_CACHE_URLS.filter(url => !url.endsWith('/'))
        );
      })
      .catch(error => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached version if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise fetch from network
      return fetch(event.request)
        .then(response => {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the response for future use
          caches.open(CACHE_NAME).then(cache => {
            // Only cache certain types of requests
            if (shouldCache(event.request.url)) {
              cache.put(event.request, responseToCache);
            }
          });

          return response;
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
    })
  );
});

// Helper function to determine if a request should be cached
function shouldCache(url) {
  // Cache static assets
  if (url.includes('/_next/static/')) return true;
  if (url.includes('/images/')) return true;
  if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.webp'))
    return true;
  if (url.endsWith('.css') || url.endsWith('.js')) return true;

  // Cache API responses (with shorter TTL)
  if (url.includes('/api/')) return false; // Don't cache API responses for now

  // Cache page routes
  const routes = ['/', '/services', '/team', '/contact', '/blog', '/news'];
  return routes.some(route => url.endsWith(route));
}

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form') {
    event.waitUntil(
      // Handle offline form submissions
      handleOfflineFormSubmissions()
    );
  }
});

async function handleOfflineFormSubmissions() {
  // Implementation for handling offline form submissions
  console.log('Service Worker: Handling offline form submissions');
}
