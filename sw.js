const CACHE="food-diary-workout-v41";
const FILES=["./","./stats/daily.json","./dashboard.html","./dashboard.css?v=20261122-2","./dashboard.js?v=20261122-2","./index.html","./exercise-guide.js?v=20261122-36","./app.js?v=20261122-41","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith("food-diary-workout-")&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{const request=event.request,url=new URL(request.url);if(request.method!=="GET"||url.origin!==self.location.origin)return;
event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(request,{cache:"no-store"});if(response.ok)await cache.put(request,response.clone());return response}catch{return await cache.match(request)||await caches.match(request)||Response.error()}})())});
