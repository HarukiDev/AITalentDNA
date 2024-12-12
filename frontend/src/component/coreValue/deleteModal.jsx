import React from 'react';

export default function DeleteModal({ isOpen, onClose, onDelete, entity, type }) {
  if (!isOpen) return null;

  const entityName = entity?.name || entity?.id;
  const entityType = type === 'dimension' ? 'Dimension' : 'Core Value';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-2xl">
        <button onClick={onClose} className="absolute text-gray-500 top-2 right-2 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="mb-4 text-xl font-semibold text-gray-800">Delete {entityType}</h3>
        <p className="mb-6 text-gray-600">Are you sure you want to delete the {entityType.toLowerCase()} <strong>{entityName}</strong>?</p>

        <div className="flex justify-center space-x-4">
          <button onClick={onClose} className="px-6 py-2 text-white bg-gray-400 rounded-full hover:bg-gray-500">Cancel</button>
          <button onClick={() => onDelete(entity)} className="px-6 py-2 text-white bg-red-600 rounded-full hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
}
