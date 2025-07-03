// scripts/backup.js

document.getElementById("backup-btn")?.addEventListener("click", () => {
  getAllEntries(entries => {
    const dataStr = encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", "data:text/json;charset=utf-8," + dataStr);
    downloadAnchorNode.setAttribute("download", "known_list_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  });
});

document.getElementById("restore-btn")?.addEventListener("click", () => {
  document.getElementById("restore-file").click();
});

document.getElementById("restore-file")?.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const parsed = JSON.parse(event.target.result);
      if (window.dbType === "localStorage") {
        localStorage.setItem("entries", JSON.stringify(parsed));
      } else {
        const transaction = db.transaction(["entries"], "readwrite");
        const store = transaction.objectStore("entries");
        store.clear();
        parsed.forEach(entry => store.add(entry));
      }

      alert("Data restored successfully!");
      loadTable();
    } catch (err) {
      alert("Invalid file format.");
    }
  };
  reader.readAsText(file);
});

document.getElementById("export-csv")?.addEventListener("click", () => {
  getAllEntries(entries => {
    const csv = Papa.unparse(entries);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "known_list.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});

document.getElementById("import-csv")?.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    complete: function(results) {
      const entries = results.data;
      if (window.dbType === "localStorage") {
        localStorage.setItem("entries", JSON.stringify(entries));
      } else {
        const transaction = db.transaction(["entries"], "readwrite");
        const store = transaction.objectStore("entries");
        store.clear();
        entries.forEach(entry => store.add(entry));
      }

      alert("CSV data imported successfully!");
      loadTable();
    }
  });
});