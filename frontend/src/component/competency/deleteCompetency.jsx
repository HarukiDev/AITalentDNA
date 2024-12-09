import React from 'react';

export default function DeleteCompetency({ isOpen, onClose, onDelete, competency }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-gray-500 top-2 right-2 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Trash Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-red-500 w-14 h-14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-2-2m0 0l-2-2m2 2H9m10 0l-1 12a2 2 0 01-2 2H6a2 2 0 01-2-2L3 7M7 7h10M10 11v6M14 11v6"
            />
          </svg>

          <h3 className="mb-4 text-xl font-semibold text-gray-800">Delete Competency</h3>
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete the competency <strong>{competency.name}</strong>?
          </p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 text-white bg-gray-400 rounded-full hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={() => onDelete(competency)}
              className="px-6 py-2 text-white bg-red-600 rounded-full hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
