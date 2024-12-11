import React, { useState, useEffect } from 'react';

// Fungsi untuk fetch dimensi dari database (simulasi)
const fetchDimensions = async () => {
  // Di sini seharusnya kamu fetch data dari API atau database, ini hanya contoh data statis
  return [
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
    { id: '3', name: 'Category 3' },
  ];
};

export function AddCoreValueModal({ isOpen, onClose, addCoreValue }) {
  const [coreValueName, setCoreValueName] = useState('');
  const [selectedDimension, setSelectedDimension] = useState('');
  const [dimensions, setDimensions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const loadDimensions = async () => {
        const fetchedDimensions = await fetchDimensions();
        setDimensions(fetchedDimensions);
      };
      loadDimensions();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coreValueName || !selectedDimension) {
      alert('Please fill in all fields');
      return;
    }

    // Buat core value baru
    const newCoreValue = { name: coreValueName, dimension: selectedDimension };

    // Panggil addCoreValue untuk menambahkan data baru ke CoreValuePage
    addCoreValue(newCoreValue);

    // Tutup modal setelah submit
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Add Core Value</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Left Column: Core Value Name */}
            <div className="col-span-1">
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

            {/* Right Column: Dimension Dropdown */}
            <div className="col-span-1">
              <label className="block mb-2 font-medium text-gray-700" htmlFor="dimension">Dimension</label>
              <select
                id="dimension"
                value={selectedDimension}
                onChange={(e) => setSelectedDimension(e.target.value)}
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

          <div className="flex justify-end mt-4 space-x-4">
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
              Add Core Value
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}