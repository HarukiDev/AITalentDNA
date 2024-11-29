import React from 'react';

export function ShowStatusModal({ isOpen, onClose }) {
  if (!isOpen) return null; // Don't render if the modal isn't open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-lg p-8 transition-transform duration-300 transform scale-100 bg-white rounded-lg shadow-2xl">
        <h2 className="pb-2 mb-6 text-2xl font-bold text-gray-800 border-b">Employee Status</h2>
        <div className="space-y-4">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Total:</span>
            <span>4</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Completed TalentDNA:</span>
            <span>14</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Incomplete TalentDNA:</span>
            <span>0</span>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
