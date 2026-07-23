/*
 * Scaliente no longer ships an offline experience. This one-shot worker replaces
 * legacy PWA workers, removes their caches, then unregisters itself. Keeping the
 * endpoint prevents an old worker from serving a stale landing indefinitely.
 */

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const cacheNames = await caches.keys();
        const legacyCaches = cacheNames.filter((name) =>
            /scaliente|workbox|precache|next-pwa/i.test(name),
        );

        await Promise.all(legacyCaches.map((name) => caches.delete(name)));
        await self.registration.unregister();

        const windows = await self.clients.matchAll({ type: 'window' });
        await Promise.all(windows.map((client) => client.navigate(client.url)));
    })());
});
