if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/RHUsH_2VSkPkA638wmbWG/_buildManifest.js",revision:"460552d55451286668f003c6794f0f52"},{url:"/_next/static/RHUsH_2VSkPkA638wmbWG/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/107-e653b1b18af7152a.js",revision:"e653b1b18af7152a"},{url:"/_next/static/chunks/130.a58fe56895bf2639.js",revision:"a58fe56895bf2639"},{url:"/_next/static/chunks/443-f839445d86da5891.js",revision:"f839445d86da5891"},{url:"/_next/static/chunks/455.b76849951ded5ded.js",revision:"b76849951ded5ded"},{url:"/_next/static/chunks/471.516fd23b47985f28.js",revision:"516fd23b47985f28"},{url:"/_next/static/chunks/7d412c98-dcd3dd62fa9e5c88.js",revision:"dcd3dd62fa9e5c88"},{url:"/_next/static/chunks/857.aa20309752110e7e.js",revision:"aa20309752110e7e"},{url:"/_next/static/chunks/89-8c70dccdb695a3e4.js",revision:"8c70dccdb695a3e4"},{url:"/_next/static/chunks/91.6aea6ebaaa2d627e.js",revision:"6aea6ebaaa2d627e"},{url:"/_next/static/chunks/947-95a6ab859b1645b0.js",revision:"95a6ab859b1645b0"},{url:"/_next/static/chunks/958-b3ff506e0b745e20.js",revision:"b3ff506e0b745e20"},{url:"/_next/static/chunks/966-1b2767a4ce441b33.js",revision:"1b2767a4ce441b33"},{url:"/_next/static/chunks/framework-63157d71ad419e09.js",revision:"63157d71ad419e09"},{url:"/_next/static/chunks/main-444953773f0c7017.js",revision:"444953773f0c7017"},{url:"/_next/static/chunks/pages/_app-396772a14ee4f66f.js",revision:"396772a14ee4f66f"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/branch_orders-8bcb81df1ff6a1a1.js",revision:"8bcb81df1ff6a1a1"},{url:"/_next/static/chunks/pages/branches-6f5b8c6f6cf595d7.js",revision:"6f5b8c6f6cf595d7"},{url:"/_next/static/chunks/pages/dashboard-f93eceba5bc23ba3.js",revision:"f93eceba5bc23ba3"},{url:"/_next/static/chunks/pages/index-42c6628f33c1706f.js",revision:"42c6628f33c1706f"},{url:"/_next/static/chunks/pages/inventory-d2782409ff801c3a.js",revision:"d2782409ff801c3a"},{url:"/_next/static/chunks/pages/items-8ffd15b49bfaad35.js",revision:"8ffd15b49bfaad35"},{url:"/_next/static/chunks/pages/items_info-e3af09c122c9e2fe.js",revision:"e3af09c122c9e2fe"},{url:"/_next/static/chunks/pages/login-05f4aef10846ef92.js",revision:"05f4aef10846ef92"},{url:"/_next/static/chunks/pages/supplier_orders-e47d9212c3a68d5c.js",revision:"e47d9212c3a68d5c"},{url:"/_next/static/chunks/pages/users-d56894a690894620.js",revision:"d56894a690894620"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-a1bb3627867215f0.js",revision:"a1bb3627867215f0"},{url:"/_next/static/css/eb56d7a0fa0fe2ff.css",revision:"eb56d7a0fa0fe2ff"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/images/icon-192x192.png",revision:"d73535542b782d0eb06650ac49965c37"},{url:"/images/icon-256x256.png",revision:"58a3bd3ab218d5fd8ba27007f8d4e88c"},{url:"/images/icon-384x384.png",revision:"cfab0f273ba6d7d1fb2d704a40796586"},{url:"/images/icon-512x512.png",revision:"2569fb3b4093daa152286b077dd3ebdd"},{url:"/manifest.json",revision:"6bd6161866c793893c05dc506668ce94"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
