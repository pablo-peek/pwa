const CACHE_NAME = 'v1_cache_PWA';

var urlsToCache = [
    './',
    './css/styles.css',
    './icons/icon.png',
    './icons/icon16.jpeg',
    './icons/icon32.jpeg',
    './icons/icon64.jpeg',
    './icons/icon96.jpeg',
    './icons/icon128.jpeg',
    './icons/icon192.jpeg',
    './icons/icon256.jpeg',
    './icons/icon384.jpeg',
    './icons/icon512.jpeg',
    './icons/icon1024.jpeg',
    './images/accidenteMichael.jpg',
    './images/accidenteMichael2.jpg',
    './images/accidenteMichael3.jpg',
    './images/angular.png',
    './images/clogo.png',
    './images/dart.png',
    './images/docker.png',
    './images/Ferrari_310B-removebg.png',
    './images/ferrari-f2004-655-2004-explo-1.jpg',
    './images/Ferrari-Logo.png',
    './images/foto.png',
    './images/git.png',
    './images/github.png',
    './images/istockphoto-513133900-612x612.jpg',
    './images/javascript.png',
    './images/Michael-Schumacher-portada-1920 (1).jpg',
    './images/Michael-Schumacher.jpg',
    './images/mongo.png',
    './images/mysql.png',
    './images/nestjs.png',
    './images/react.png',
    './images/typescript.png',
    './images/utchlogo.png',
    './images/vite.png',
    './carousel.html',
    './index.html',
    './main.js',
    './manifest.json',
    './README.md',
    './sw.js'
];


self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => {
                    self.skipWaiting();
                });
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});


self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhiteList.indexOf(cacheName)=== -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
    })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                return res;
            }
            return fetch(e.request);
        })
    );
});