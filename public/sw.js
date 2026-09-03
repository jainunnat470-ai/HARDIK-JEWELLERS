// Clean passive PWA service worker with Push Notification support
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

// Passive fetch listener to satisfy PWA installability requirements without blocking network requests
self.addEventListener('fetch', (e) => {
  // Do nothing - let browser handle network fetch normally
});

// Listen to background push events when the app is closed
self.addEventListener('push', (event) => {
  let payload = {
    title: 'Hardik Jewellers',
    body: 'Live Gold Rate Update! Check today\'s latest prices.'
  };

  if (event.data) {
    try {
      payload = event.data.json();
    } catch (e) {
      payload = {
        title: 'Hardik Jewellers',
        body: event.data.text()
      };
    }
  }

  const options = {
    body: payload.body,
    icon: '/assets/logo.jpg',
    badge: '/assets/logo.jpg',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

// Handle notification clicks (reopen the app)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
