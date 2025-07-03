# Known List Manager v2.0 – Enhanced Edition 📋

A simple, offline-ready web app to manage a list of known people — with features like PDF/CSV export, backup/restore, and PWA install support.

Made with ❤️ by [Jignesh Thummar](https://www.instagram.com/official.jignesh.1 )

---

## 💡 Features

- ✅ Add/Edit/Delete entries (Name, Age, Contact, State/City, Profession, Relation, Review)
- ✅ Dark Mode UI using Tailwind CSS
- ✅ Keyboard navigation (`Tab`, `Ctrl + S`)
- ✅ WhatsApp links next to contact numbers (excluded in PDF)
- ✅ Export data to **PDF or CSV**
- ✅ Backup & Restore functionality (JSON)
- ✅ Works offline – Installable as a **Progressive Web App (PWA)**
- ✅ Live search/filter
- ✅ Form validation
- ✅ Masked contact numbers in PDF exports (e.g., `X91 9876 X09`)

---

## 🧩 Technologies Used

| Feature | Tool/Library |
|--------|--------------|
| Styling | [Tailwind CSS](https://tailwindcss.com/ ) |
| Icons | [Font Awesome](https://fontawesome.com/ ) |
| PDF Export | [`jsPDF`](https://github.com/parallax/jsPDF ) + `autoTable` plugin |
| CSV Support | [`PapaParse`](https://www.papaparse.com/ ) |
| Data Storage | IndexedDB (fallback to localStorage)
| PWA Support | Service Worker + Manifest
| Build Tool | CDN-based, no build step needed

---

## 📦 Folder Structure
known-list-manager/
│
├── index.html # Main HTML page
├── manifest.json # PWA metadata
├── sw.js # Service worker for offline caching
├── styles/
│ └── main.css # Custom dark mode styles
├── scripts/
│ ├── db.js # IndexedDB / localStorage logic
│ ├── form.js # Form input handling and validation
│ ├── table.js # Table rendering and live search
│ ├── export.js # PDF export with formatting
│ ├── backup.js # JSON & CSV import/export
│ ├── pwa.js # PWA registration and install prompt
│
└── README.md # This file