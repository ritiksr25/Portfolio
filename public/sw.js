if (!self.define) {
	const e = e => {
			"require" !== e && (e += ".js");
			let s = Promise.resolve();
			return (
				i[e] ||
					(s = new Promise(async s => {
						if ("document" in self) {
							const i = document.createElement("script");
							(i.src = e),
								document.head.appendChild(i),
								(i.onload = s);
						} else importScripts(e), s();
					})),
				s.then(() => {
					if (!i[e])
						throw new Error(
							`Module ${e} didn’t register its module`
						);
					return i[e];
				})
			);
		},
		s = (s, i) => {
			Promise.all(s.map(e)).then(e => i(1 === e.length ? e[0] : e));
		},
		i = { require: Promise.resolve(s) };
	self.define = (s, t, a) => {
		i[s] ||
			(i[s] = Promise.resolve().then(() => {
				let i = {};
				const n = { uri: location.origin + s.slice(1) };
				return Promise.all(
					t.map(s => {
						switch (s) {
							case "exports":
								return i;
							case "module":
								return n;
							default:
								return e(s);
						}
					})
				).then(e => {
					const s = a(...e);
					return i.default || (i.default = s), i;
				});
			}));
	};
}
define("./sw.js", ["./workbox-8778d57b"], function (e) {
	"use strict";
	importScripts(),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url:
						"/_next/static/chunks/71247caf95475e3ea7f9a0f8a30beb258b23d005.98442d8fd6e246f93e50.js",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url:
						"/_next/static/chunks/a9a7754c.75b5e0a2369786075be2.js",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url:
						"/_next/static/chunks/cb1608f2.d20475c148c3125080f1.js",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url:
						"/_next/static/chunks/f6078781a05fe1bcb0902d23dbbb2662c8d200b3.f6d970403bd2fa4c2639.js",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url:
						"/_next/static/chunks/framework.93a4db703368d9b8f53e.js",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url: "/_next/static/chunks/main-afb11f9f23d0b50f92ce.js",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url:
						"/_next/static/chunks/pages/_app-1bd3c58a726d99fb0f52.js",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url:
						"/_next/static/chunks/pages/_error-dd118763c372c727754f.js",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url:
						"/_next/static/chunks/pages/index-4e2315107ebb84c01bb5.js",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url:
						"/_next/static/chunks/polyfills-a98cee78eb8282e29fb6.js",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url: "/_next/static/chunks/webpack-e067438c4cf4ef2ef178.js",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url: "/_next/static/css/2714dad025197cd4ab23.css",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url: "/_next/static/css/acbf65925f731a01ddfa.css",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url:
						"/_next/static/ikXSUISox4UNaWGByVtXP/_buildManifest.js",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url: "/_next/static/ikXSUISox4UNaWGByVtXP/_ssgManifest.js",
					revision: "ikXSUISox4UNaWGByVtXP"
				},
				{
					url: "/android-chrome-192x192.png",
					revision: "1035148ccfab0919fc2de0fabc9386d1"
				},
				{
					url: "/android-chrome-512x512.png",
					revision: "927ca6133f3591fb0cfacf4aa790ad69"
				},
				{
					url: "/apple-touch-icon.png",
					revision: "4d5c4b54cceaad1060a879bc59b89fd9"
				},
				{
					url: "/assets/favicon.ico",
					revision: "f8f05e952d2570104d608464abee27e6"
				},
				{
					url: "/assets/photo.jpg",
					revision: "f135485d8f20412fb258799bda218007"
				},
				{
					url: "/favicon-16x16.png",
					revision: "e9c9f648150530fac4cc3adf0dbceedc"
				},
				{
					url: "/favicon-32x32.png",
					revision: "8470de9e8cdb74195ef4e845da7afd22"
				},
				{
					url: "/favicon.ico",
					revision: "8305b1de08e4583732666c5fcd212551"
				},
				{
					url: "/robots.txt",
					revision: "f77c87f977e0fcce05a6df46c885a129"
				},
				{
					url: "/site.webmanifest",
					revision: "745b0a324e026ee1d76809c793a40ec6"
				}
			],
			{ ignoreURLParametersMatching: [] }
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			"/",
			new e.NetworkFirst({
				cacheName: "start-url",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 1,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0
					})
				]
			}),
			"GET"
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: "google-fonts",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 4,
						maxAgeSeconds: 31536e3,
						purgeOnQuotaError: !0
					})
				]
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-font-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 4,
						maxAgeSeconds: 604800,
						purgeOnQuotaError: !0
					})
				]
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-image-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 64,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0
					})
				]
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-js-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0
					})
				]
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-style-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0
					})
				]
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: "static-data-assets",
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0
					})
				]
			}),
			"GET"
		),
		e.registerRoute(
			/\/api\/.*$/i,
			new e.NetworkFirst({
				cacheName: "apis",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 16,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0
					})
				]
			}),
			"GET"
		),
		e.registerRoute(
			/.*/i,
			new e.NetworkFirst({
				cacheName: "others",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({
						maxEntries: 32,
						maxAgeSeconds: 86400,
						purgeOnQuotaError: !0
					})
				]
			}),
			"GET"
		);
});
