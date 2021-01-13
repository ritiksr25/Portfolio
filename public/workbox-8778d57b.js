define("./workbox-8778d57b.js", ["exports"], function (t) {
	"use strict";
	try {
		self["workbox:core:6.0.2"] && _();
	} catch (t) {}
	const e = (t, ...e) => {
		let s = t;
		return e.length > 0 && (s += ` :: ${JSON.stringify(e)}`), s;
	};
	class s extends Error {
		constructor(t, s) {
			super(e(t, s)), (this.name = t), (this.details = s);
		}
	}
	try {
		self["workbox:routing:6.0.2"] && _();
	} catch (t) {}
	const n = t => (t && "object" == typeof t ? t : { handle: t });
	class i {
		constructor(t, e, s = "GET") {
			(this.handler = n(e)), (this.match = t), (this.method = s);
		}
	}
	class r extends i {
		constructor(t, e, s) {
			super(
				({ url: e }) => {
					const s = t.exec(e.href);
					if (s && (e.origin === location.origin || 0 === s.index))
						return s.slice(1);
				},
				e,
				s
			);
		}
	}
	class a {
		constructor() {
			(this.t = new Map()), (this.i = new Map());
		}
		get routes() {
			return this.t;
		}
		addFetchListener() {
			self.addEventListener("fetch", t => {
				const { request: e } = t,
					s = this.handleRequest({ request: e, event: t });
				s && t.respondWith(s);
			});
		}
		addCacheListener() {
			self.addEventListener("message", t => {
				if (t.data && "CACHE_URLS" === t.data.type) {
					const { payload: e } = t.data,
						s = Promise.all(
							e.urlsToCache.map(e => {
								"string" == typeof e && (e = [e]);
								const s = new Request(...e);
								return this.handleRequest({
									request: s,
									event: t
								});
							})
						);
					t.waitUntil(s),
						t.ports &&
							t.ports[0] &&
							s.then(() => t.ports[0].postMessage(!0));
				}
			});
		}
		handleRequest({ request: t, event: e }) {
			const s = new URL(t.url, location.href);
			if (!s.protocol.startsWith("http")) return;
			const n = s.origin === location.origin,
				{ params: i, route: r } = this.findMatchingRoute({
					event: e,
					request: t,
					sameOrigin: n,
					url: s
				});
			let a = r && r.handler;
			const o = t.method;
			if ((!a && this.i.has(o) && (a = this.i.get(o)), !a)) return;
			let c;
			try {
				c = a.handle({ url: s, request: t, event: e, params: i });
			} catch (t) {
				c = Promise.reject(t);
			}
			return (
				c instanceof Promise &&
					this.o &&
					(c = c.catch(n =>
						this.o.handle({ url: s, request: t, event: e })
					)),
				c
			);
		}
		findMatchingRoute({ url: t, sameOrigin: e, request: s, event: n }) {
			const i = this.t.get(s.method) || [];
			for (const r of i) {
				let i;
				const a = r.match({
					url: t,
					sameOrigin: e,
					request: s,
					event: n
				});
				if (a)
					return (
						(i = a),
						((Array.isArray(a) && 0 === a.length) ||
							(a.constructor === Object &&
								0 === Object.keys(a).length) ||
							"boolean" == typeof a) &&
							(i = void 0),
						{ route: r, params: i }
					);
			}
			return {};
		}
		setDefaultHandler(t, e = "GET") {
			this.i.set(e, n(t));
		}
		setCatchHandler(t) {
			this.o = n(t);
		}
		registerRoute(t) {
			this.t.has(t.method) || this.t.set(t.method, []),
				this.t.get(t.method).push(t);
		}
		unregisterRoute(t) {
			if (!this.t.has(t.method))
				throw new s("unregister-route-but-not-found-with-method", {
					method: t.method
				});
			const e = this.t.get(t.method).indexOf(t);
			if (!(e > -1)) throw new s("unregister-route-route-not-registered");
			this.t.get(t.method).splice(e, 1);
		}
	}
	let o;
	const c = () => (
		o || ((o = new a()), o.addFetchListener(), o.addCacheListener()), o
	);
	function h(t, e, n) {
		let a;
		if ("string" == typeof t) {
			const s = new URL(t, location.href);
			a = new i(({ url: t }) => t.href === s.href, e, n);
		} else if (t instanceof RegExp) a = new r(t, e, n);
		else if ("function" == typeof t) a = new i(t, e, n);
		else {
			if (!(t instanceof i))
				throw new s("unsupported-route-type", {
					moduleName: "workbox-routing",
					funcName: "registerRoute",
					paramName: "capture"
				});
			a = t;
		}
		return c().registerRoute(a), a;
	}
	const u = {
			googleAnalytics: "googleAnalytics",
			precache: "precache-v2",
			prefix: "workbox",
			runtime: "runtime",
			suffix: "undefined" != typeof registration ? registration.scope : ""
		},
		l = t =>
			[u.prefix, t, u.suffix].filter(t => t && t.length > 0).join("-"),
		f = t => t || l(u.precache),
		w = t => t || l(u.runtime);
	function d(t) {
		t.then(() => {});
	}
	const p = new Set();
	class y {
		constructor(t, e, { onupgradeneeded: s, onversionchange: n } = {}) {
			(this.h = null),
				(this.u = t),
				(this.l = e),
				(this.p = s),
				(this.m = n || (() => this.close()));
		}
		get db() {
			return this.h;
		}
		async open() {
			if (!this.h)
				return (
					(this.h = await new Promise((t, e) => {
						let s = !1;
						setTimeout(() => {
							(s = !0),
								e(
									new Error(
										"The open request was blocked and timed out"
									)
								);
						}, this.OPEN_TIMEOUT);
						const n = indexedDB.open(this.u, this.l);
						(n.onerror = () => e(n.error)),
							(n.onupgradeneeded = t => {
								s
									? (n.transaction.abort(), n.result.close())
									: "function" == typeof this.p && this.p(t);
							}),
							(n.onsuccess = () => {
								const e = n.result;
								s
									? e.close()
									: ((e.onversionchange = this.m.bind(this)),
									  t(e));
							});
					})),
					this
				);
		}
		async getKey(t, e) {
			return (await this.getAllKeys(t, e, 1))[0];
		}
		async getAll(t, e, s) {
			return await this.getAllMatching(t, { query: e, count: s });
		}
		async getAllKeys(t, e, s) {
			return (
				await this.getAllMatching(t, {
					query: e,
					count: s,
					includeKeys: !0
				})
			).map(t => t.key);
		}
		async getAllMatching(
			t,
			{
				index: e,
				query: s = null,
				direction: n = "next",
				count: i,
				includeKeys: r = !1
			} = {}
		) {
			return await this.transaction([t], "readonly", (a, o) => {
				const c = a.objectStore(t),
					h = e ? c.index(e) : c,
					u = [],
					l = h.openCursor(s, n);
				l.onsuccess = () => {
					const t = l.result;
					t
						? (u.push(r ? t : t.value),
						  i && u.length >= i ? o(u) : t.continue())
						: o(u);
				};
			});
		}
		async transaction(t, e, s) {
			return (
				await this.open(),
				await new Promise((n, i) => {
					const r = this.h.transaction(t, e);
					(r.onabort = () => i(r.error)),
						(r.oncomplete = () => n()),
						s(r, t => n(t));
				})
			);
		}
		async g(t, e, s, ...n) {
			return await this.transaction([e], s, (s, i) => {
				const r = s.objectStore(e),
					a = r[t].apply(r, n);
				a.onsuccess = () => i(a.result);
			});
		}
		close() {
			this.h && (this.h.close(), (this.h = null));
		}
	}
	y.prototype.OPEN_TIMEOUT = 2e3;
	const m = {
		readonly: ["get", "count", "getKey", "getAll", "getAllKeys"],
		readwrite: ["add", "put", "clear", "delete"]
	};
	for (const [t, e] of Object.entries(m))
		for (const s of e)
			s in IDBObjectStore.prototype &&
				(y.prototype[s] = async function (e, ...n) {
					return await this.g(s, e, t, ...n);
				});
	try {
		self["workbox:expiration:6.0.2"] && _();
	} catch (t) {}
	const g = "cache-entries",
		R = t => {
			const e = new URL(t, location.href);
			return (e.hash = ""), e.href;
		};
	class v {
		constructor(t) {
			(this.R = t),
				(this.h = new y("workbox-expiration", 1, {
					onupgradeneeded: t => this.v(t)
				}));
		}
		v(t) {
			const e = t.target.result.createObjectStore(g, { keyPath: "id" });
			e.createIndex("cacheName", "cacheName", { unique: !1 }),
				e.createIndex("timestamp", "timestamp", { unique: !1 }),
				(async t => {
					await new Promise((e, s) => {
						const n = indexedDB.deleteDatabase(t);
						(n.onerror = () => {
							s(n.error);
						}),
							(n.onblocked = () => {
								s(new Error("Delete blocked"));
							}),
							(n.onsuccess = () => {
								e();
							});
					});
				})(this.R);
		}
		async setTimestamp(t, e) {
			const s = {
				url: (t = R(t)),
				timestamp: e,
				cacheName: this.R,
				id: this.q(t)
			};
			await this.h.put(g, s);
		}
		async getTimestamp(t) {
			return (await this.h.get(g, this.q(t))).timestamp;
		}
		async expireEntries(t, e) {
			const s = await this.h.transaction(g, "readwrite", (s, n) => {
					const i = s
							.objectStore(g)
							.index("timestamp")
							.openCursor(null, "prev"),
						r = [];
					let a = 0;
					i.onsuccess = () => {
						const s = i.result;
						if (s) {
							const n = s.value;
							n.cacheName === this.R &&
								((t && n.timestamp < t) || (e && a >= e)
									? r.push(s.value)
									: a++),
								s.continue();
						} else n(r);
					};
				}),
				n = [];
			for (const t of s) await this.h.delete(g, t.id), n.push(t.url);
			return n;
		}
		q(t) {
			return this.R + "|" + R(t);
		}
	}
	class q {
		constructor(t, e = {}) {
			(this.U = !1),
				(this._ = !1),
				(this.L = e.maxEntries),
				(this.N = e.maxAgeSeconds),
				(this.C = e.matchOptions),
				(this.R = t),
				(this.T = new v(t));
		}
		async expireEntries() {
			if (this.U) return void (this._ = !0);
			this.U = !0;
			const t = this.N ? Date.now() - 1e3 * this.N : 0,
				e = await this.T.expireEntries(t, this.L),
				s = await self.caches.open(this.R);
			for (const t of e) await s.delete(t, this.C);
			(this.U = !1), this._ && ((this._ = !1), d(this.expireEntries()));
		}
		async updateTimestamp(t) {
			await this.T.setTimestamp(t, Date.now());
		}
		async isURLExpired(t) {
			if (this.N) {
				return (
					(await this.T.getTimestamp(t)) < Date.now() - 1e3 * this.N
				);
			}
			return !1;
		}
		async delete() {
			(this._ = !1), await this.T.expireEntries(1 / 0);
		}
	}
	try {
		self["workbox:strategies:6.0.2"] && _();
	} catch (t) {}
	const U = {
		cacheWillUpdate: async ({ response: t }) =>
			200 === t.status || 0 === t.status ? t : null
	};
	function x() {
		return (x =
			Object.assign ||
			function (t) {
				for (var e = 1; e < arguments.length; e++) {
					var s = arguments[e];
					for (var n in s)
						Object.prototype.hasOwnProperty.call(s, n) &&
							(t[n] = s[n]);
				}
				return t;
			}).apply(this, arguments);
	}
	function L(t, e) {
		const s = new URL(t);
		for (const t of e) s.searchParams.delete(t);
		return s.href;
	}
	class b {
		constructor() {
			this.promise = new Promise((t, e) => {
				(this.resolve = t), (this.reject = e);
			});
		}
	}
	function N(t) {
		return "string" == typeof t ? new Request(t) : t;
	}
	class C {
		constructor(t, e) {
			(this.D = {}),
				Object.assign(this, e),
				(this.event = e.event),
				(this.P = t),
				(this.k = new b()),
				(this.K = []),
				(this.O = [...t.plugins]),
				(this.M = new Map());
			for (const t of this.O) this.M.set(t, {});
			this.event.waitUntil(this.k.promise);
		}
		fetch(t) {
			return this.waitUntil(
				(async () => {
					const { event: e } = this;
					let n = N(t);
					if (
						"navigate" === n.mode &&
						e instanceof FetchEvent &&
						e.preloadResponse
					) {
						const t = await e.preloadResponse;
						if (t) return t;
					}
					const i = this.hasCallback("fetchDidFail")
						? n.clone()
						: null;
					try {
						for (const t of this.iterateCallbacks(
							"requestWillFetch"
						))
							n = await t({ request: n.clone(), event: e });
					} catch (t) {
						throw new s("plugin-error-request-will-fetch", {
							thrownError: t
						});
					}
					const r = n.clone();
					try {
						let t;
						t = await fetch(
							n,
							"navigate" === n.mode ? void 0 : this.P.fetchOptions
						);
						for (const s of this.iterateCallbacks(
							"fetchDidSucceed"
						))
							t = await s({ event: e, request: r, response: t });
						return t;
					} catch (t) {
						throw (
							(i &&
								(await this.runCallbacks("fetchDidFail", {
									error: t,
									event: e,
									originalRequest: i.clone(),
									request: r.clone()
								})),
							t)
						);
					}
				})()
			);
		}
		async fetchAndCachePut(t) {
			const e = await this.fetch(t),
				s = e.clone();
			return this.waitUntil(this.cachePut(t, s)), e;
		}
		cacheMatch(t) {
			return this.waitUntil(
				(async () => {
					const e = N(t);
					let s;
					const { cacheName: n, matchOptions: i } = this.P,
						r = await this.getCacheKey(e, "read"),
						a = x({}, i, { cacheName: n });
					s = await caches.match(r, a);
					for (const t of this.iterateCallbacks(
						"cachedResponseWillBeUsed"
					))
						s =
							(await t({
								cacheName: n,
								matchOptions: i,
								cachedResponse: s,
								request: r,
								event: this.event
							})) || void 0;
					return s;
				})()
			);
		}
		async cachePut(t, e) {
			const n = N(t);
			var i;
			await ((i = 0), new Promise(t => setTimeout(t, i)));
			const r = await this.getCacheKey(n, "write");
			if (!e)
				throw new s("cache-put-with-no-response", {
					url:
						((a = r.url),
						new URL(String(a), location.href).href.replace(
							new RegExp(`^${location.origin}`),
							""
						))
				});
			var a;
			const o = await this.W(e);
			if (!o) return;
			const { cacheName: c, matchOptions: h } = this.P,
				u = await self.caches.open(c),
				l = this.hasCallback("cacheDidUpdate"),
				f = l
					? await (async function (t, e, s, n) {
							const i = L(e.url, s);
							if (e.url === i) return t.match(e, n);
							const r = x({}, n, { ignoreSearch: !0 }),
								a = await t.keys(e, r);
							for (const e of a)
								if (i === L(e.url, s)) return t.match(e, n);
					  })(u, r.clone(), ["__WB_REVISION__"], h)
					: null;
			try {
				await u.put(r, l ? o.clone() : o);
			} catch (t) {
				throw (
					("QuotaExceededError" === t.name &&
						(await (async function () {
							for (const t of p) await t();
						})()),
					t)
				);
			}
			for (const t of this.iterateCallbacks("cacheDidUpdate"))
				await t({
					cacheName: c,
					oldResponse: f,
					newResponse: o.clone(),
					request: r,
					event: this.event
				});
		}
		async getCacheKey(t, e) {
			if (!this.D[e]) {
				let s = t;
				for (const t of this.iterateCallbacks("cacheKeyWillBeUsed"))
					s = N(
						await t({
							mode: e,
							request: s,
							event: this.event,
							params: this.params
						})
					);
				this.D[e] = s;
			}
			return this.D[e];
		}
		hasCallback(t) {
			for (const e of this.P.plugins) if (t in e) return !0;
			return !1;
		}
		async runCallbacks(t, e) {
			for (const s of this.iterateCallbacks(t)) await s(e);
		}
		*iterateCallbacks(t) {
			for (const e of this.P.plugins)
				if ("function" == typeof e[t]) {
					const s = this.M.get(e),
						n = n => {
							const i = x({}, n, { state: s });
							return e[t](i);
						};
					yield n;
				}
		}
		waitUntil(t) {
			return this.K.push(t), t;
		}
		async doneWaiting() {
			let t;
			for (; (t = this.K.shift()); ) await t;
		}
		destroy() {
			this.k.resolve();
		}
		async W(t) {
			let e = t,
				s = !1;
			for (const t of this.iterateCallbacks("cacheWillUpdate"))
				if (
					((e =
						(await t({
							request: this.request,
							response: e,
							event: this.event
						})) || void 0),
					(s = !0),
					!e)
				)
					break;
			return s || (e && 200 !== e.status && (e = void 0)), e;
		}
	}
	class E {
		constructor(t = {}) {
			(this.cacheName = w(t.cacheName)),
				(this.plugins = t.plugins || []),
				(this.fetchOptions = t.fetchOptions),
				(this.matchOptions = t.matchOptions);
		}
		handle(t) {
			const [e] = this.handleAll(t);
			return e;
		}
		handleAll(t) {
			t instanceof FetchEvent && (t = { event: t, request: t.request });
			const e = t.event,
				s =
					"string" == typeof t.request
						? new Request(t.request)
						: t.request,
				n = "params" in t ? t.params : void 0,
				i = new C(this, { event: e, request: s, params: n }),
				r = this.A(i, s, e);
			return [r, this.S(r, i, s, e)];
		}
		async A(t, e, n) {
			let i;
			await t.runCallbacks("handlerWillStart", { event: n, request: e });
			try {
				if (((i = await this.I(e, t)), !i || "error" === i.type))
					throw new s("no-response", { url: e.url });
			} catch (s) {
				for (const r of t.iterateCallbacks("handlerDidError"))
					if (((i = await r({ error: s, event: n, request: e })), i))
						break;
				if (!i) throw s;
			}
			for (const s of t.iterateCallbacks("handlerWillRespond"))
				i = await s({ event: n, request: e, response: i });
			return i;
		}
		async S(t, e, s, n) {
			let i, r;
			try {
				i = await t;
			} catch (r) {}
			try {
				await e.runCallbacks("handlerDidRespond", {
					event: n,
					request: s,
					response: i
				}),
					await e.doneWaiting();
			} catch (t) {
				r = t;
			}
			if (
				(await e.runCallbacks("handlerDidComplete", {
					event: n,
					request: s,
					response: i,
					error: r
				}),
				e.destroy(),
				r)
			)
				throw r;
		}
	}
	function T(t, e) {
		const s = e();
		return t.waitUntil(s), s;
	}
	try {
		self["workbox:precaching:6.0.2"] && _();
	} catch (t) {}
	function D(t) {
		if (!t) throw new s("add-to-cache-list-unexpected-type", { entry: t });
		if ("string" == typeof t) {
			const e = new URL(t, location.href);
			return { cacheKey: e.href, url: e.href };
		}
		const { revision: e, url: n } = t;
		if (!n) throw new s("add-to-cache-list-unexpected-type", { entry: t });
		if (!e) {
			const t = new URL(n, location.href);
			return { cacheKey: t.href, url: t.href };
		}
		const i = new URL(n, location.href),
			r = new URL(n, location.href);
		return (
			i.searchParams.set("__WB_REVISION__", e),
			{ cacheKey: i.href, url: r.href }
		);
	}
	class P {
		constructor() {
			(this.updatedURLs = []),
				(this.notUpdatedURLs = []),
				(this.handlerWillStart = async ({ request: t, state: e }) => {
					e && (e.originalRequest = t);
				}),
				(this.cachedResponseWillBeUsed = async ({
					event: t,
					state: e,
					cachedResponse: s
				}) => {
					if ("install" === t.type) {
						const t = e.originalRequest.url;
						s
							? this.notUpdatedURLs.push(t)
							: this.updatedURLs.push(t);
					}
					return s;
				});
		}
	}
	class k {
		constructor({ precacheController: t }) {
			(this.cacheKeyWillBeUsed = async ({ request: t, params: e }) => {
				const s = (e && e.cacheKey) || this.j.getCacheKeyForURL(t.url);
				return s ? new Request(s) : t;
			}),
				(this.j = t);
		}
	}
	let K;
	async function O(t, e) {
		let n = null;
		if (t.url) {
			n = new URL(t.url).origin;
		}
		if (n !== self.location.origin)
			throw new s("cross-origin-copy-response", { origin: n });
		const i = t.clone(),
			r = {
				headers: new Headers(i.headers),
				status: i.status,
				statusText: i.statusText
			},
			a = e ? e(r) : r,
			o = (function () {
				if (void 0 === K) {
					const t = new Response("");
					if ("body" in t)
						try {
							new Response(t.body), (K = !0);
						} catch (t) {
							K = !1;
						}
					K = !1;
				}
				return K;
			})()
				? i.body
				: await i.blob();
		return new Response(o, a);
	}
	const M = {
		cacheWillUpdate: async ({ response: t }) =>
			t.redirected ? await O(t) : t
	};
	class W extends E {
		constructor(t = {}) {
			(t.cacheName = f(t.cacheName)),
				super(t),
				(this.B = !1 !== t.fallbackToNetwork),
				this.plugins.push(M);
		}
		async I(t, e) {
			const s = await e.cacheMatch(t);
			return (
				s ||
				(e.event && "install" === e.event.type
					? await this.F(t, e)
					: await this.H(t, e))
			);
		}
		async H(t, e) {
			let n;
			if (!this.B)
				throw new s("missing-precache-entry", {
					cacheName: this.cacheName,
					url: t.url
				});
			return (n = await e.fetch(t)), n;
		}
		async F(t, e) {
			const n = await e.fetchAndCachePut(t);
			let i = Boolean(n);
			if ((n && n.status >= 400 && !this.$() && (i = !1), !i))
				throw new s("bad-precaching-response", {
					url: t.url,
					status: n.status
				});
			return n;
		}
		$() {
			return this.plugins.some(t => t.cacheWillUpdate && t !== M);
		}
	}
	class A {
		constructor({
			cacheName: t,
			plugins: e = [],
			fallbackToNetwork: s = !0
		} = {}) {
			(this.G = new Map()),
				(this.V = new Map()),
				(this.J = new Map()),
				(this.P = new W({
					cacheName: f(t),
					plugins: [...e, new k({ precacheController: this })],
					fallbackToNetwork: s
				})),
				(this.install = this.install.bind(this)),
				(this.activate = this.activate.bind(this));
		}
		get strategy() {
			return this.P;
		}
		precache(t) {
			this.addToCacheList(t),
				this.X ||
					(self.addEventListener("install", this.install),
					self.addEventListener("activate", this.activate),
					(this.X = !0));
		}
		addToCacheList(t) {
			const e = [];
			for (const n of t) {
				"string" == typeof n
					? e.push(n)
					: n && void 0 === n.revision && e.push(n.url);
				const { cacheKey: t, url: i } = D(n),
					r =
						"string" != typeof n && n.revision
							? "reload"
							: "default";
				if (this.G.has(i) && this.G.get(i) !== t)
					throw new s("add-to-cache-list-conflicting-entries", {
						firstEntry: this.G.get(i),
						secondEntry: t
					});
				if ("string" != typeof n && n.integrity) {
					if (this.J.has(t) && this.J.get(t) !== n.integrity)
						throw new s(
							"add-to-cache-list-conflicting-integrities",
							{ url: i }
						);
					this.J.set(t, n.integrity);
				}
				if ((this.G.set(i, t), this.V.set(i, r), e.length > 0)) {
					const t = `Workbox is precaching URLs without revision info: ${e.join(
						", "
					)}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
					console.warn(t);
				}
			}
		}
		install(t) {
			return T(t, async () => {
				const e = new P();
				this.strategy.plugins.push(e);
				for (const [e, s] of this.G) {
					const n = this.J.get(s),
						i = this.V.get(e),
						r = new Request(e, {
							integrity: n,
							cache: i,
							credentials: "same-origin"
						});
					await Promise.all(
						this.strategy.handleAll({
							params: { cacheKey: s },
							request: r,
							event: t
						})
					);
				}
				const { updatedURLs: s, notUpdatedURLs: n } = e;
				return { updatedURLs: s, notUpdatedURLs: n };
			});
		}
		activate(t) {
			return T(t, async () => {
				const t = await self.caches.open(this.strategy.cacheName),
					e = await t.keys(),
					s = new Set(this.G.values()),
					n = [];
				for (const i of e)
					s.has(i.url) || (await t.delete(i), n.push(i.url));
				return { deletedURLs: n };
			});
		}
		getURLsToCacheKeys() {
			return this.G;
		}
		getCachedURLs() {
			return [...this.G.keys()];
		}
		getCacheKeyForURL(t) {
			const e = new URL(t, location.href);
			return this.G.get(e.href);
		}
		async matchPrecache(t) {
			const e = t instanceof Request ? t.url : t,
				s = this.getCacheKeyForURL(e);
			if (s) {
				return (await self.caches.open(this.strategy.cacheName)).match(
					s
				);
			}
		}
		createHandlerBoundToURL(t) {
			const e = this.getCacheKeyForURL(t);
			if (!e) throw new s("non-precached-url", { url: t });
			return s => (
				(s.request = new Request(t)),
				(s.params = x({ cacheKey: e }, s.params)),
				this.strategy.handle(s)
			);
		}
	}
	let S;
	const I = () => (S || (S = new A()), S);
	class j extends i {
		constructor(t, e) {
			super(({ request: s }) => {
				const n = t.getURLsToCacheKeys();
				for (const t of (function* (
					t,
					{
						ignoreURLParametersMatching: e = [/^utm_/, /^fbclid$/],
						directoryIndex: s = "index.html",
						cleanURLs: n = !0,
						urlManipulation: i
					} = {}
				) {
					const r = new URL(t, location.href);
					(r.hash = ""), yield r.href;
					const a = (function (t, e = []) {
						for (const s of [...t.searchParams.keys()])
							e.some(t => t.test(s)) && t.searchParams.delete(s);
						return t;
					})(r, e);
					if ((yield a.href, s && a.pathname.endsWith("/"))) {
						const t = new URL(a.href);
						(t.pathname += s), yield t.href;
					}
					if (n) {
						const t = new URL(a.href);
						(t.pathname += ".html"), yield t.href;
					}
					if (i) {
						const t = i({ url: r });
						for (const e of t) yield e.href;
					}
				})(s.url, e)) {
					const e = n.get(t);
					if (e) return { cacheKey: e };
				}
			}, t.strategy);
		}
	}
	(t.CacheFirst = class extends E {
		async I(t, e) {
			let n,
				i = await e.cacheMatch(t);
			if (!i)
				try {
					i = await e.fetchAndCachePut(t);
				} catch (t) {
					n = t;
				}
			if (!i) throw new s("no-response", { url: t.url, error: n });
			return i;
		}
	}),
		(t.ExpirationPlugin = class {
			constructor(t = {}) {
				var e;
				(this.cachedResponseWillBeUsed = async ({
					event: t,
					request: e,
					cacheName: s,
					cachedResponse: n
				}) => {
					if (!n) return null;
					const i = this.Y(n),
						r = this.Z(s);
					d(r.expireEntries());
					const a = r.updateTimestamp(e.url);
					if (t)
						try {
							t.waitUntil(a);
						} catch (t) {}
					return i ? n : null;
				}),
					(this.cacheDidUpdate = async ({
						cacheName: t,
						request: e
					}) => {
						const s = this.Z(t);
						await s.updateTimestamp(e.url), await s.expireEntries();
					}),
					(this.tt = t),
					(this.N = t.maxAgeSeconds),
					(this.et = new Map()),
					t.purgeOnQuotaError &&
						((e = () => this.deleteCacheAndMetadata()), p.add(e));
			}
			Z(t) {
				if (t === w()) throw new s("expire-custom-caches-only");
				let e = this.et.get(t);
				return e || ((e = new q(t, this.tt)), this.et.set(t, e)), e;
			}
			Y(t) {
				if (!this.N) return !0;
				const e = this.st(t);
				if (null === e) return !0;
				return e >= Date.now() - 1e3 * this.N;
			}
			st(t) {
				if (!t.headers.has("date")) return null;
				const e = t.headers.get("date"),
					s = new Date(e).getTime();
				return isNaN(s) ? null : s;
			}
			async deleteCacheAndMetadata() {
				for (const [t, e] of this.et)
					await self.caches.delete(t), await e.delete();
				this.et = new Map();
			}
		}),
		(t.NetworkFirst = class extends E {
			constructor(t = {}) {
				super(t),
					this.plugins.some(t => "cacheWillUpdate" in t) ||
						this.plugins.unshift(U),
					(this.nt = t.networkTimeoutSeconds || 0);
			}
			async I(t, e) {
				const n = [],
					i = [];
				let r;
				if (this.nt) {
					const { id: s, promise: a } = this.it({
						request: t,
						logs: n,
						handler: e
					});
					(r = s), i.push(a);
				}
				const a = this.rt({
					timeoutId: r,
					request: t,
					logs: n,
					handler: e
				});
				i.push(a);
				for (const t of i) e.waitUntil(t);
				let o = await Promise.race(i);
				if ((o || (o = await a), !o))
					throw new s("no-response", { url: t.url });
				return o;
			}
			it({ request: t, logs: e, handler: s }) {
				let n;
				return {
					promise: new Promise(e => {
						n = setTimeout(async () => {
							e(await s.cacheMatch(t));
						}, 1e3 * this.nt);
					}),
					id: n
				};
			}
			async rt({ timeoutId: t, request: e, logs: s, handler: n }) {
				let i, r;
				try {
					r = await n.fetchAndCachePut(e);
				} catch (t) {
					i = t;
				}
				return (
					t && clearTimeout(t),
					(!i && r) || (r = await n.cacheMatch(e)),
					r
				);
			}
		}),
		(t.StaleWhileRevalidate = class extends E {
			constructor(t) {
				super(t),
					this.plugins.some(t => "cacheWillUpdate" in t) ||
						this.plugins.unshift(U);
			}
			async I(t, e) {
				const n = e.fetchAndCachePut(t).catch(() => {});
				let i,
					r = await e.cacheMatch(t);
				if (r);
				else
					try {
						r = await n;
					} catch (t) {
						i = t;
					}
				if (!r) throw new s("no-response", { url: t.url, error: i });
				return r;
			}
		}),
		(t.cleanupOutdatedCaches = function () {
			self.addEventListener("activate", t => {
				const e = f();
				t.waitUntil(
					(async (t, e = "-precache-") => {
						const s = (await self.caches.keys()).filter(
							s =>
								s.includes(e) &&
								s.includes(self.registration.scope) &&
								s !== t
						);
						return (
							await Promise.all(
								s.map(t => self.caches.delete(t))
							),
							s
						);
					})(e).then(t => {})
				);
			});
		}),
		(t.clientsClaim = function () {
			self.addEventListener("activate", () => self.clients.claim());
		}),
		(t.precacheAndRoute = function (t, e) {
			!(function (t) {
				I().precache(t);
			})(t),
				(function (t) {
					const e = I();
					h(new j(e, t));
				})(e);
		}),
		(t.registerRoute = h);
});
