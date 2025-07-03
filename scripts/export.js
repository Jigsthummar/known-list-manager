// scripts/export.js

document.getElementById("export-pdf")?.addEventListener("click", () => {
  getAllEntries(entries => {
    if (!entries || entries.length === 0) {
      alert("No data found to export.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("l", "pt", "a4");

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Known List Manager", 40, 40);

    const today = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Generated on: ${today}`, 40, 60);

    const head = [["#", "Name", "Age", "Contact", "City", "State", "Profession", "Relation", "Review"]];
    const body = entries.map((entry, index) => [
      index + 1,
      entry.name || "",
      entry.age || "",
      maskContact(entry.contact),
      entry.city || "",
      entry.state || "",
      entry.profession || "",
      entry.relation || "",
      entry.review || ""
    ]);

    let colWidths = [20, 100, 25, 85, 60, 60, 80, 60, 100];
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 72;
    const availableWidth = pageWidth - margin;
    const totalUsedWidth = colWidths.reduce((sum, w) => sum + w, 0);
    const extraSpace = Math.max(0, availableWidth - totalUsedWidth);
    const distribution = [0, 0.35, 0.10, 0.20, 0, 0, 0, 0, 0.35];

    distribution.forEach((ratio, i) => {
      colWidths[i] += Math.floor(extraSpace * ratio);
    });

    doc.autoTable({
      head: head,
      body: body,
      startY: 80,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 5,
        textColor: [0, 0, 0],
        font: 'helvetica'
      },
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        ...Object.fromEntries(colWidths.map((w, i) => [i, { cellWidth: w }])),
        2: { cellWidth: colWidths[2], overflow: 'visible' },
        5: { cellWidth: colWidths[5], overflow: 'visible' }
      },
      margin: { left: 36, right: 36, top: 36, bottom: 36 },
      didDrawPage: function (data) {
        const pageCount = doc.internal.getNumberOfPages();
        const currentPage = data.pageNumber;
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Page ${currentPage} of ${pageCount}`, pageWidth / 2, pageWidth > 800 ? pageWidth - 30 : 800, { align: 'center' });
      }
    });

    doc.save("known_list.pdf");
  });
});

function maskContact(contact) {
  if (!contact) return '';
  const str = contact.toString();
  if (str.length < 4) return str;
  return 'X' + str.slice(1, -2) + 'X';
}