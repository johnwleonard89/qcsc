// Service Worker for Queen City Surface Coatings
// Performance optimization and offline capability

const CACHE_NAME = 'qcsc-v1.0.0';
const STATIC_CACHE = 'qcsc-static-v1.0.0';
const DYNAMIC_CACHE = 'qcsc-dynamic-v1.0.0';
const IMAGE_CACHE = 'qcsc-images-v1.0.0';

// Critical resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/styles/critical.css',
  '/styles/mobile-responsive.css',
  '/favicon.png',
  '/offline/',
  '/manifest.json'
];

// Resources to cache on first visit
const CACHE_PRIORITY_ROUTES = [
  '/services/',
  '/company/contact/',
  '/portfolio/',
  '/company/about/',
  '/services/garage-floor-epoxy/',
  '/services/polyaspartic-coating/',
  '/services/metallic-epoxy-flooring/'
];

// Maximum cache sizes (performance optimization)
const MAX_CACHE_SIZE = {
  [DYNAMIC_CACHE]: 50,
  [IMAGE_CACHE]: 100
};

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
      }),
      caches.open(DYNAMIC_CACHE).then((cache) => {
        console.log('Service Worker: Pre-caching priority routes');
        return cache.addAll(CACHE_PRIORITY_ROUTES);
      })
    ]).then(() => {
      console.log('Service Worker: Installation complete');
      return self.skipWaiting(); // Force activate immediately
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return !['qcsc-static-v1.0.0', 'qcsc-dynamic-v1.0.0', 'qcsc-images-v1.0.0'].includes(cacheName);
            })
            .map((cacheName) => {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Take control of all pages immediately
      self.clients.claim()
    ]).then(() => {
      console.log('Service Worker: Activation complete');
    })
  );
});

// Fetch event - serve cached content with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(handleFetch(request));
});

// Advanced fetch handling with performance optimization
async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Static assets - cache first, then network
    if (isStaticAsset(url.pathname)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // Images - cache first with size limit
    if (isImage(url.pathname)) {
      return await cacheFirstWithLimit(request, IMAGE_CACHE, MAX_CACHE_SIZE[IMAGE_CACHE]);
    }
    
    // HTML pages - network first with cache fallback
    if (isHTMLPage(url.pathname)) {
      return await networkFirstWithCache(request, DYNAMIC_CACHE);
    }
    
    // API requests - network only
    if (isAPIRequest(url.pathname)) {
      return await fetch(request);
    }
    
    // Default: network first
    return await networkFirstWithCache(request, DYNAMIC_CACHE);
    
  } catch (error) {
    console.log('Service Worker: Fetch failed', error);
    
    // Return offline page for HTML requests
    if (isHTMLPage(url.pathname)) {
      const offlineResponse = await caches.match('/offline/');
      if (offlineResponse) {
        return offlineResponse;
      }
    }
    
    // Return cached version if available
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Cache-first strategy (for static assets)
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  const cache = await caches.open(cacheName);
  cache.put(request, networkResponse.clone());
  return networkResponse;
}

// Cache-first with size limit (for images)
async function cacheFirstWithLimit(request, cacheName, maxSize) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  const cache = await caches.open(cacheName);
  
  // Clean cache if it's getting too large
  await limitCacheSize(cacheName, maxSize);
  
  cache.put(request, networkResponse.clone());
  return networkResponse;
}

// Network-first strategy (for HTML pages)
async function networkFirstWithCache(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    // Only cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fall back to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Utility functions
function isStaticAsset(pathname) {
  return pathname.match(/\.(css|js|png|jpg|jpeg|webp|svg|ico|woff|woff2|ttf)$/);
}

function isImage(pathname) {
  return pathname.match(/\.(png|jpg|jpeg|webp|svg|ico)$/);
}

function isHTMLPage(pathname) {
  return pathname === '/' || 
         pathname.endsWith('/') || 
         pathname.endsWith('.html') ||
         (!pathname.includes('.') && !pathname.startsWith('/api/'));
}

function isAPIRequest(pathname) {
  return pathname.startsWith('/api/') || pathname.includes('netlify');
}

// Limit cache size to improve performance
async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxSize) {
    const deleteKeys = keys.slice(0, keys.length - maxSize);
    await Promise.all(deleteKeys.map(key => cache.delete(key)));
    console.log(`Service Worker: Cleaned ${deleteKeys.length} items from ${cacheName}`);
  }
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  console.log('Service Worker: Handling background sync');
  // Process any queued form submissions when back online
  // Implementation would depend on specific requirements
}

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/favicon.png',
      badge: '/favicon.png',
      vibrate: [100, 50, 100],
      data: data.data,
      actions: [
        {
          action: 'view',
          title: 'View Details',
          icon: '/favicon.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});

console.log('Service Worker: Loaded successfully');