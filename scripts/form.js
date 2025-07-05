// scripts/form.js

window.editingId = null;

// Auto-focus first input on page load
window.addEventListener("load", () => {
  const nameField = document.getElementById("name");
  if (nameField) nameField.focus();
});

// State to Cities Mapping
const stateToCities = {
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Nadiad"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Aurangabad"],
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
  "Karnataka": ["Bengaluru", "Mysore", "Hubli", "Belgaum"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  "Delhi": ["New Delhi"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur"],
  "Punjab": ["Chandigarh", "Amritsar", "Ludhiana"]
};

function updateCityDropdown(selectedState = "", selectedCity = "") {
  const citySelect = document.getElementById("city");
  if (!citySelect) return;

  citySelect.innerHTML = '<option value="">Select City</option>';

  const cities = stateToCities[selectedState] || [];

  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    if (city === selectedCity) option.selected = true;
    citySelect.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const stateSelect = document.getElementById("state");
  const citySelect = document.getElementById("city");

  if (stateSelect && citySelect) {
    stateSelect.addEventListener("change", function () {
      updateCityDropdown(this.value);
    });
  }

  // Tab key navigation between inputs
  const formFields = [
    "#name",
    "#age",
    "#contact",
    "#state",
    "#city",
    "#profession",
    "#relation",
    "#review"
  ];

  formFields.forEach((selector, index) => {
    const field = document.querySelector(selector);
    if (field) {
      field.addEventListener("keydown", function (e) {
        if (e.key === "Tab" && !e.shiftKey) {
          e.preventDefault();
          const nextIndex = (index + 1) % formFields.length;
          const nextField = document.querySelector(formFields[nextIndex]);
          if (nextField) nextField.focus();
        }
      });
    }
  });

  // Ctrl+S shortcut to submit form
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      const form = document.getElementById("data-form");
      if (form) form.dispatchEvent(new Event("submit"));
    }
  });

  // Save or Update Entry
  document.getElementById("data-form")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const state = document.getElementById("state").value.trim();
    const city = document.getElementById("city").value.trim();
    const profession = document.getElementById("profession").value.trim();
    const relation = document.getElementById("relation").value.trim();
    const review = document.getElementById("review").value.trim();

    // Basic Validation
    if (!name || !contact || !state || !city || !relation) {
      alert("Please fill in all required fields.");
      return;
    }

    const entry = {
      name,
      age,
      contact,
      state,
      city,
      profession,
      relation,
      review
    };

    if (window.editingId) {
      entry.id = window.editingId;
      updateEntry(entry, () => {
        window.editingId = null;
        this.reset();
        if (typeof loadTable === 'function') {
          loadTable(); // Call global loadTable
        }
        document.getElementById("name").focus();
      });
    } else {
      saveEntry(entry, () => {
        this.reset();
        if (typeof loadTable === 'function') {
          loadTable(); // Call global loadTable
        }
        document.getElementById("name").focus();
      });
    }
  });
});