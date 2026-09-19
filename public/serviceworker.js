async function networkFirst(request) {
	try {
		// get the response
		// if it's okay, cache a copy and then return it
		const networkResponse = await fetch(request);
		if (networkResponse.ok) {
			const cache = await caches.open('appData');
			cache.put(request, networkResponse.clone());
		}
		return networkResponse;
	} catch (error) {
		// if the response is an error, check for a match in the cache
		// if there's a match in the cache, return it
		// otherwise return the error
		const cachedResponse = await caches.match(request);
		return cachedResponse || Response.error();
	}
}

async function firstCache() {
	const cache = await caches.open('appData');
	cache.addAll([
		'/',
		'/entertainment',
		'/faqs',
		'/feedback-changes',
		'/index.html',
		'/menu',
		'/useful-contacts',
		'/venue-travel',
		'/welfare',
		'/workshops',
		'/workshops/session-1',
		'/workshops/session-2',
		'/workshops/session-3',
		'/workshops/session-4',
		'/workshops/session-5',
		'/people',
	]);
}

self.addEventListener('install', firstCache);

// when a fetch request is sent, respond with the outcome of networkFirst()
self.addEventListener('fetch', (event) => {
	event.respondWith(networkFirst(event.request));
});
