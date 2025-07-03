// scripts/pwa.js

let deferredPrompt;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(r => {
      console.log("Service Worker registered", r);
    }).catch(err => {
      console.log("SW registration failed:", err);
    });
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Show a custom install button or banner here
});