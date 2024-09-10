const cacheName = 'site-static-02';
const assets = [
    '/',
    '/pesquisav02/index.html',
    '/pesquisav02/styles.css',
    '/pesquisav02/script.js',
    '/pesquisav02/manifest.json',
    '/pesquisav02/images/icon-192x192.png',
    '/pesquisav02/images/icon-512x512.png',
    // Adicione outros recursos necessários
];

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache se disponível
        return response || fetch(event.request).then(fetchResponse => {
          // Se o recurso for buscado com sucesso na rede, adicione-o ao cache
          return caches.open(cacheName).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
  );
});