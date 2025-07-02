// scripts/db.js

let db;

function initDB() {
  const request = indexedDB.open("KnownListDB", 1);

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains("entries")) {
      db.createObjectStore("entries", { keyPath: "id", autoIncrement: true });
    }
  };

  request.onsuccess = function (event) {
    db = event.target.result;
  };

  request.onerror = function (event) {
    console.error("IndexedDB error:", event.target.error);
    useLocalStorage();
  };
}

function useLocalStorage() {
  window.dbType = "localStorage";
}

initDB();

function saveEntry(entry, callback) {
  if (window.dbType === "localStorage") {
    let entries = JSON.parse(localStorage.getItem("entries") || "[]");
    entry.id = entries.length ? entries[entries.length - 1].id + 1 : 1;
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));
    callback && callback(entry.id);
  } else {
    const transaction = db.transaction(["entries"], "readwrite");
    const store = transaction.objectStore("entries");
    const request = store.add(entry);
    request.onsuccess = () => callback && callback(request.result);
    request.onerror = e => console.error("Save failed:", e);
  }
}


function getAllEntries(callback) {
  if (window.dbType === "localStorage") {
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    callback(entries);
  } else {
    const transaction = db.transaction(["entries"], "readonly");
    const store = transaction.objectStore("entries");
    const request = store.getAll();
    request.onsuccess = () => callback(request.result);
    request.onerror = e => console.error("Fetch failed:", e);
  }
}

function deleteEntry(id, callback) {
  if (window.dbType === "localStorage") {
    let entries = JSON.parse(localStorage.getItem("entries") || "[]");
    entries = entries.filter(e => e.id !== id);
    localStorage.setItem("entries", JSON.stringify(entries));
    callback();
  } else {
    const transaction = db.transaction(["entries"], "readwrite");
    const store = transaction.objectStore("entries");
    store.delete(id);
    transaction.oncomplete = callback;
  }
}

function updateEntry(updatedEntry, callback) {
  if (window.dbType === "localStorage") {
    let entries = JSON.parse(localStorage.getItem("entries") || "[]");
    entries = entries.map(e => e.id === updatedEntry.id ? updatedEntry : e);
    localStorage.setItem("entries", JSON.stringify(entries));
    callback();
  } else {
    const transaction = db.transaction(["entries"], "readwrite");
    const store = transaction.objectStore("entries");
    store.put(updatedEntry);
    transaction.oncomplete = callback;
  }
}