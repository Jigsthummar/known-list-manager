// scripts/table.js

window.loadTable = function () {
  getAllEntries(entries => {
    const tbody = document.getElementById("table-body");
    if (!tbody) return;

    tbody.innerHTML = "";

    entries.forEach((entry, index) => {
      const tr = document.createElement("tr");
      tr.className = "border-b border-gray-700 hover:bg-gray-700 transition duration-150";

      tr.innerHTML = `
        <td class="px-4 py-3">${index + 1}</td>
        <td class="px-4 py-3">${entry.name || ""}</td>
        <td class="px-4 py-3">${entry.age || ""}</td>
        <td class="px-4 py-3">
          ${entry.contact || ""}
          <a href="https://wa.me/ ${entry.contact || ""}" target="_blank" class="ml-2 text-green-400">
            <i class="fab fa-whatsapp"></i>
          </a>
        </td>
        <td class="px-4 py-3">${entry.city || ""}</td>
        <td class="px-4 py-3">${entry.state || ""}</td>
        <td class="px-4 py-3">${entry.profession || ""}</td>
        <td class="px-4 py-3">${entry.relation || ""}</td>
        <td class="px-4 py-3">${entry.review || ""}</td>
        <td class="px-4 py-3 flex justify-center space-x-2">
          <button onclick="editEntry(${entry.id})" class="text-blue-400 hover:text-blue-600">
            <i class="fas fa-edit"></i>
          </button>
          <button onclick="deleteEntry(${entry.id}, loadTable)" class="text-red-400 hover:text-red-600">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  });
};

window.addEventListener("load", loadTable);

function editEntry(id) {
  getAllEntries(entries => {
    const entry = entries.find(e => e.id === id);
    if (!entry) return;

    // Fill form
    document.getElementById("name").value = entry.name;
    document.getElementById("age").value = entry.age;
    document.getElementById("contact").value = entry.contact;
    document.getElementById("state").value = entry.state;
    updateCityDropdown(entry.state, entry.city); // from form.js
    document.getElementById("profession").value = entry.profession;
    document.getElementById("relation").value = entry.relation;
    document.getElementById("review").value = entry.review;

    // Set editing mode
    window.editingId = id;

    // Scroll to top
    document.getElementById("data-form").scrollIntoView({ behavior: "smooth" });
  });
}