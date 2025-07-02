// scripts/export.js

document.getElementById("export-pdf")?.addEventListener("click", () => {
  getAllEntries(entries => {
    if (!entries || entries.length === 0) {
      alert("No data found to export.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("l", "pt", "a4"); // Landscape A4

    // Add heading and date
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text("Jignesh Thummar known List 07-2025", 40, 40);

    const today = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Generated on: ${today}`, 40, 60);

    // Table headers and body
    const head = [["#", "Name", "Age", "Contact", "City", "State", "Profession", "Relation", "Review"]];
    const body = entries.map((entry, index) => [
      index + 1,
      entry.name || "",
      entry.age || "",
      entry.contact || "",
      entry.city || "",
      entry.state || "",
      entry.profession || "",
      entry.relation || "",
      entry.review || ""
    ]);

    // Base column widths (before distribution of extra space)
    let colWidths = [
      20,   // #
      100,  // Name
      25,   // Age
      85,   // Contact
      60,   // City
      60,   // State
      80,   // Profession
      60,   // Relation
      100   // Review
    ];

    // Total available width for landscape A4 with margins
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 72; // Left + Right margin
    const availableWidth = pageWidth - margin;

    // Calculate total used width before distributing extra space
    const totalUsedWidth = colWidths.reduce((sum, w) => sum + w, 0);
    const extraSpace = Math.max(0, availableWidth - totalUsedWidth);

    // Define how much % of extra space should go to each column
    const distribution = [
      0,     // # → no extra
      0.35,  // Name → 35%
      0.10,  // Age → 10%
      0.20,  // Contact → 20%
      0,     // City → no extra
      0,     // State → no extra
      0,     // Profession → no extra
      0,     // Relation → no extra
      0.35   // Review → 35%
    ];

    // Distribute extra space proportionally
    distribution.forEach((ratio, i) => {
      colWidths[i] += Math.floor(extraSpace * ratio);
    });

    // Generate autoTable
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
        fillColor: [37, 99, 235], // Tailwind blue-600
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245] // Light gray
      },
      columnStyles: {
        ...Object.fromEntries(colWidths.map((w, i) => [i, { cellWidth: w }])),
        // Prevent wrapping in Age (index 2), State (index 5)
        2: { cellWidth: colWidths[2], overflow: 'visible' },  // Age
        5: { cellWidth: colWidths[5], overflow: 'visible' }   // State
      },
      margin: { left: 36, right: 36, top: 36, bottom: 36 },
      didDrawCell: function (data) {
        // Add WhatsApp icon next to contact number
        const col = data.column.index;
        const row = data.row.section;

        if (col === 3 && row === "body") {
          const cellText = data.cell.text;

          // Ensure it's a string before trimming
          const cleanText = typeof cellText === 'string' ? cellText.trim() : String(cellText).trim();

          const whatsappLink = `https://wa.me/   ${cleanText}`;
          const x = data.cell.x + data.cell.width - 20;
          const y = data.cell.y + 10;

          doc.setTextColor(0, 150, 0); // Green color
          doc.textWithLink("📱", x, y, { url: whatsappLink });
        }
      },
      didDrawPage: function (data) {
        // Centered page numbers
        const pageCount = doc.internal.getNumberOfPages();
        const currentPage = data.pageNumber;

        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.setFontSize(10);
        doc.setTextColor(100); // Gray color
        doc.text(`Page ${currentPage} of ${pageCount}`, pageSize.getWidth() / 2, pageHeight - 30, { align: 'center' });
      }
    });

    // Save the PDF
    doc.save("known_list.pdf");
  });
});
