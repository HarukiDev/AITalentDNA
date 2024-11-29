import React from 'react';

export function ImportCSVModal({ isOpen, onClose }) {
  if (!isOpen) return null; // Don't render if the modal isn't open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-lg p-8 transition-transform duration-300 transform scale-100 bg-white rounded-lg shadow-2xl">
        <h2 className="pb-2 mb-6 text-2xl font-bold text-gray-800 border-b">Import CSV</h2>
        <form>
          <div className="mb-6">
            <label htmlFor="fileUpload" className="block mb-2 font-medium text-gray-700">
              Upload File
            </label>
            <input
              type="file"
              id="fileUpload"
              accept=".csv, .xls, .xlsx"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 font-semibold text-white bg-gray-500 rounded-full shadow-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600"
            >
              Import
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
