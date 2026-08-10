import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ==========================================
// CSV EXPORT
// ==========================================
export function exportCSV(expenses) {
  const headers = ["Item", "Price", "Category", "Date"];

  const rows = expenses.map((expense) => [
    expense.itemName,
    expense.price,
    expense.aiCategory,
    new Date(expense.createdAt).toLocaleDateString(),
  ]);

  const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
    "\n",
  );

  const blob = new Blob([csv], {
    type: "text/csv",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "SmartReceipts_Report.csv";

  link.click();

  URL.revokeObjectURL(url);
}

// ==========================================
// PDF EXPORT
// ==========================================
export function exportPDF(expenses, total, budget, insights) {
  const doc = new jsPDF();

  // ------------------------------------------
  // Header
  // ------------------------------------------
  doc.setFontSize(24);
  doc.setTextColor(16, 185, 129);

  doc.text("SmartReceipts", 14, 18);

  doc.setFontSize(16);
  doc.setTextColor(80, 80, 80);

  doc.text("Business Expense Report", 14, 28);

  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);

  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 36);

  // ------------------------------------------
  // Summary
  // ------------------------------------------
  doc.setFontSize(13);
  doc.setTextColor(16, 185, 129);

  doc.text("Summary", 14, 48);

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);

  doc.text(`Budget: $${Number(budget || 0).toFixed(2)}`, 14, 58);

  doc.text(`Spent: $${Number(total || 0).toFixed(2)}`, 14, 66);

  doc.text(
    `Remaining: $${(Number(budget || 0) - Number(total || 0)).toFixed(2)}`,
    14,
    74,
  );

  doc.text(`Transactions: ${expenses.length}`, 14, 82);

  // ------------------------------------------
  // Expense Table
  // ------------------------------------------
  autoTable(doc, {
    startY: 90,

    head: [["Item", "Category", "Price", "Date"]],

    body: expenses.map((expense) => [
      expense.itemName,
      expense.aiCategory,
      `$${Number(expense.price || 0).toFixed(2)}`,
      new Date(expense.createdAt).toLocaleDateString(),
    ]),

    // Makes the table striped
    theme: "striped",

    // Header styling
    headStyles: {
      fillColor: [16, 185, 129],
      textColor: 255,
      fontStyle: "bold",
    },

    // General table styling
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },

    // Alternating row background
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  // ------------------------------------------
  // AI Insights
  // ------------------------------------------
  let finalY = doc.lastAutoTable.finalY + 15;

  // Prevent the insights heading from being
  // placed too close to the bottom of the page.
  if (finalY > 260) {
    doc.addPage();
    finalY = 20;
  }

  doc.setFontSize(15);
  doc.setTextColor(16, 185, 129);

  doc.text("AI Financial Insights", 14, finalY);

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);

  const insightText = insights || "No AI analysis generated.";

  doc.text(insightText, 14, finalY + 10, {
    maxWidth: 180,
  });

  // ------------------------------------------
  // Footer
  // ------------------------------------------
  const pageCount = doc.internal.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    doc.setFontSize(9);
    doc.setTextColor(130, 130, 130);

    doc.text(`SmartReceipts • Page ${i} of ${pageCount}`, 14, 290);
  }

  // ------------------------------------------
  // Download
  // ------------------------------------------
  doc.save("SmartReceipts_Report.pdf");
}
