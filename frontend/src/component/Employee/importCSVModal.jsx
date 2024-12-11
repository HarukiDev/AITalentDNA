import React from 'react';

export default function ImportCSVModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Import CSV</h2>
          <p className="mb-4">Upload your CSV file here.</p>
          <input type="file" className="w-full p-2 border rounded" />
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={onClose}
            >
              Close
            </button>
            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
