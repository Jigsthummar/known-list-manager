# Known List Manager v1.4 – Dashboard Style Export

A fully working personal data entry web app with:

- 🌒 Dark theme using Tailwind CSS  
- 📝 Form input with auto-focus and keyboard navigation  
- 📋 Interactive table with edit, delete, and search  
- 📄 PDF export with WhatsApp icons  
- 💾 Backup & restore via JSON file  
- 📲 PWA support (works offline)

---

## 📁 Folder Structure

---

## 🔧 Features

### 🖋️ Data Entry Form
- Auto-focus on load
- Keyboard navigation (Tab and Ctrl+S shortcut)
- State-to-city dropdown mapping
- Editable entries

### 🗂️ Dynamic Table
- Loads data from IndexedDB or localStorage
- Supports editing and deleting entries
- Inline WhatsApp icons next to contact numbers
- Live search by name, city, or profession

### 📄 PDF Export
- Export full table to PDF using `jsPDF` and `autoTable`
- WhatsApp icons included next to phone numbers
- Horizontal A4 layout with centered text
- Page numbers at bottom center
- Adjustable column widths for better readability

### 💾 Backup & Restore
- One-click backup as `.json` file
- Upload and restore data from `.json` file

### 📱 PWA Support
- Works offline after installation
- Installable on mobile devices
- Uses service worker for caching

---

## 🛠️ Technologies Used

- **Tailwind CSS** – For responsive dark UI design
- **Font Awesome** – Icons for actions and WhatsApp
- **jsPDF + jspdf-autotable** – PDF generation
- **PapaParse** – Future CSV support (optional)
- **IndexedDB + localStorage fallback** – Persistent storage

---

## 📦 How to Use

1. Clone or download the project.
2. Open `index.html` in a browser.
3. Add new entries using the form.
4. Edit or delete existing entries from the table.
5. Use the **Export PDF**, **Backup**, and **Restore** buttons to manage data.
6. Install as a PWA on your device for offline access.

---

## 📝 Notes

- Designed for **horizontal A4 PDF export** with clean formatting.
- Column widths are dynamically adjusted to prevent wrapping.
- WhatsApp icons added safely with string validation.
- Fully works offline thanks to PWA support.

---

## 👤 Created by

Jignesh Thummar  
Instagram: [@official.jignesh.1](https://www.instagram.com/official.jignesh.1/ )