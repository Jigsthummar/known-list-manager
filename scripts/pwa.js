// scripts/pwa.js

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(r => {
      console.log("Service Worker registered", r);
    }).catch(err => {
      console.log("SW registration failed:", err);
    });
  });
}