import { FaFileCsv, FaFilePdf } from "react-icons/fa";

function ExportButtons({ onExportCSV, onExportPDF, disabled }) {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <button
        disabled={disabled}
        onClick={onExportCSV}
        className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FaFileCsv />
        Export CSV
      </button>

      <button
        disabled={disabled}
        onClick={onExportPDF}
        className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FaFilePdf />
        Export PDF
      </button>
    </div>
  );
}

export default ExportButtons;
