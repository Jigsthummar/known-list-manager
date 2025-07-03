// scripts/pwa.js

let deferredPrompt;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(r => {
        console.log("Service Worker registered", r);
      })
      .catch(err => {
        console.log("SW registration failed:", err);
      });
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default prompt
  e.preventDefault();
  // Store the event for later triggering
  deferredPrompt = e;
  
  // Show custom install button or banner
  const installBtn = document.createElement('button');
  installBtn.textContent = "Install Known List Manager";
  installBtn.className = "fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md z-50 transition duration-300";
  installBtn.onclick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA install');
        } else {
          console.log('User dismissed the PWA install');
        }
        deferredPrompt = null;
        installBtn.remove();
      });
    }
  };

  document.body.appendChild(installBtn);
});