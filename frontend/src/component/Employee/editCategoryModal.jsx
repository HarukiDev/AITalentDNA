import React, { useState, useEffect } from 'react';

export function EditCoreValueModal({ isOpen, onClose, coreValue, updateCoreValue }) {
  const [coreValueName, setCoreValueName] = useState('');
  const [selectedDimension, setSelectedDimension] = useState('');
  const [dimensions, setDimensions] = useState([
    { id: '1', name: 'Dimension 1' },
    { id: '2', name: 'Dimension 2' },
    { id: '3', name: 'Dimension 3' },
  ]);

  useEffect(() => {
    if (isOpen && coreValue) {
      setCoreValueName(coreValue.name);  // Set core value name
      setSelectedDimension(coreValue.dimension);  // Set the selected dimension
    }
  }, [isOpen, coreValue]);  // Only run when modal opens or coreValue changes

  if (!isOpen) return null; // Don't render modal if it's not open

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!coreValueName || !selectedDimension) {
      alert('Please fill in all fields');
      return;
    }

    const updatedCoreValue = {
      ...coreValue,
      name: coreValueName,
      dimension: selectedDimension,
    };

    updateCoreValue(updatedCoreValue);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Edit Core Value</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="coreValueName">Core Value Name</label>
              <input
                type="text"
                id="coreValueName"
                value={coreValueName}
                onChange={(e) => setCoreValueName(e.target.value)}
                placeholder="Enter Core Value Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="dimension">Dimension</label>
              <select
                id="dimension"
                value={selectedDimension} // Make sure value is set correctly
                onChange={(e) => setSelectedDimension(e.target.value)}  // Update the selected dimension
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Dimension</option>
                {dimensions.map((dimension) => (
                  <option key={dimension.id} value={dimension.id}>
                    {dimension.name}
                  </option>
                ))}
              </select>
            </div>
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
              Update Core Value
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
