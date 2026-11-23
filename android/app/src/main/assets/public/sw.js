/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-25ee6505'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "8f33b54242c3c54bba08341122a51fd5"
  }, {
    "url": "pwa-512x512.png",
    "revision": "f6bba0d369d02e7bbdd81584a9309116"
  }, {
    "url": "pwa-192x192.png",
    "revision": "73be9983e08d90bbaa33d0bac72f2aad"
  }, {
    "url": "index.html",
    "revision": "79efd6b26490cef8dda52afb53fd7509"
  }, {
    "url": "favicon.ico",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "15155cc11e91838beb5edf5f8b63f9b4"
  }, {
    "url": "js/supabase-config.js",
    "revision": "954c25b8cd6cbd1f9a9c0ca7af79161a"
  }, {
    "url": "js/media-manifest.js",
    "revision": "dd38dac46cfa3eb2937f0691ec663017"
  }, {
    "url": "js/firebase-config.js",
    "revision": "b79def6848fd6bc6d162cd982676cae1"
  }, {
    "url": "js/firebase-backend.js",
    "revision": "f738e6754d18e97d295315a6a700a3b4"
  }, {
    "url": "js/app.js",
    "revision": "296351c5549ff7d7578a6d356eff0973"
  }, {
    "url": "css/style.css",
    "revision": "31a281bd0858c6cb3ef165e2e8730a06"
  }, {
    "url": "assets/workbox-window.prod.es5-BBnX5xw4.js",
    "revision": null
  }, {
    "url": "assets/og-logo.png",
    "revision": null
  }, {
    "url": "assets/og-logo-BSR6YLDl.png",
    "revision": null
  }, {
    "url": "assets/index-g-wtipZ6.css",
    "revision": null
  }, {
    "url": "assets/index-DXDGSlrL.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "15155cc11e91838beb5edf5f8b63f9b4"
  }, {
    "url": "pwa-192x192.png",
    "revision": "73be9983e08d90bbaa33d0bac72f2aad"
  }, {
    "url": "pwa-512x512.png",
    "revision": "f6bba0d369d02e7bbdd81584a9309116"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "8f33b54242c3c54bba08341122a51fd5"
  }, {
    "url": "manifest.webmanifest",
    "revision": "69c4965f6d3a15a38b58ed043af7bc5c"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/^\/api\//, /firestore\.googleapis\.com/]
  }));
  workbox.registerRoute(/\/version\.json/i, new workbox.NetworkOnly(), 'GET');
  workbox.registerRoute(/\/(js|css)\/.*\.(js|css)/i, new workbox.NetworkFirst({
    "cacheName": "og-runtime-code",
    "networkTimeoutSeconds": 4,
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 20,
      maxAgeSeconds: 604800
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/\/media\/photos\/.*\.(jpg|jpeg|png|webp)/i, new workbox.CacheFirst({
    "cacheName": "og-photos-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 160,
      maxAgeSeconds: 2592000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
