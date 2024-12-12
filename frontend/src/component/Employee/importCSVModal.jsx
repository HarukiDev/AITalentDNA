import React from 'react';
import ExampleCSV from "../../assets/csvExample/contoh.xlsx";

export default function ImportCSVModal({ isOpen, onClose }) {
  const handleDownloadSampleExcel = () => {
    const link = document.createElement('a');
    link.href = ExampleCSV; // Path file yang diimpor
    link.download = 'Sample-Employee.xlsx'; // Nama file saat diunduh
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Import Excel</h2>
          <p className="mb-4">
            Upload your Excel file here or download the sample Excel file to use as a template.
          </p>
          <input type="file" accept=".xlsx" className="w-full p-2 mb-4 border rounded" />
          <div className="flex justify-between mt-4 space-x-2">
            <button
              className="px-4 py-2 text-white bg-green-500 rounded-full hover:bg-green-600"
              onClick={handleDownloadSampleExcel}
            >
              Download Sample Excel
            </button>
            <div className="flex space-x-2">
              <button
                className="px-5 py-2 font-semibold text-white bg-gray-500 rounded-full hover:bg-gray-600"
                onClick={onClose}
              >
                Close
              </button>
              <button className="px-5 py-2 font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600">
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
