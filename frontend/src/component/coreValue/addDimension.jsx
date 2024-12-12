import React, { useState, useEffect } from 'react';

// Fungsi untuk fetch dimensi dari database (simulasi)
const fetchDimensions = async () => {
  return [
    { id: '1', name: 'Dimension 1', description: 'Description for Dimension 1', indicators: ['Indicator 1', 'Indicator 2'] },
    { id: '2', name: 'Dimension 2', description: 'Description for Dimension 2', indicators: ['Indicator 3', 'Indicator 4'] },
    { id: '3', name: 'Dimension 3', description: 'Description for Dimension 3', indicators: ['Indicator 5', 'Indicator 6'] },
  ];
};

export function AddDimensionModal({ isOpen, onClose, addDimension }) {
  const [dimensionName, setDimensionName] = useState('');
  const [dimensionDescription, setDimensionDescription] = useState('');
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [indicatorsList, setIndicatorsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIndicators, setFilteredIndicators] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const loadDimensions = async () => {
        const fetchedDimensions = await fetchDimensions();
        setIndicatorsList(fetchedDimensions.flatMap(d => d.indicators)); // Ambil semua indikator
        setFilteredIndicators(fetchedDimensions.flatMap(d => d.indicators)); // Menampilkan semua indikator pada awal
      };
      loadDimensions();
    } else {
      // Reset semua state ketika modal ditutup
      setDimensionName('');
      setDimensionDescription('');
      setSelectedIndicators([]);
      setSearchTerm('');
      setFilteredIndicators([]);
    }
  }, [isOpen]);

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = indicatorsList.filter(indicator =>
      indicator.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredIndicators(filtered);
  };

  // Fungsi untuk menambahkan indikator yang dipilih
  const handleIndicatorSelect = (indicator) => {
    if (!selectedIndicators.includes(indicator)) {
      setSelectedIndicators(prevSelected => [...prevSelected, indicator]);
    }
    setSearchTerm(''); // Reset pencarian setelah memilih indikator
    setFilteredIndicators(indicatorsList); // Reset daftar indikator
  };

  // Fungsi untuk menghapus indikator yang sudah dipilih
  const handleIndicatorRemove = (indicator) => {
    setSelectedIndicators(selectedIndicators.filter(i => i !== indicator));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dimensionName || !dimensionDescription || selectedIndicators.length === 0) {
      alert('Please fill in all fields');
      return;
    }

    // Buat dimension baru
    const newDimension = { 
      name: dimensionName, 
      description: dimensionDescription, 
      indicators: selectedIndicators
    };

    // Panggil addDimension untuk menambahkan data baru ke CoreValuePage
    addDimension(newDimension);

    // Tutup modal setelah submit
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Add Dimension</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Left Column: Dimension Name */}
            <div className="col-span-1">
              <label className="block mb-2 font-medium text-gray-700" htmlFor="dimensionName">Dimension Name</label>
              <input
                type="text"
                id="dimensionName"
                value={dimensionName}
                onChange={(e) => setDimensionName(e.target.value)}
                placeholder="Enter Dimension Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Right Column: Dimension Description */}
            <div className="col-span-1">
              <label className="block mb-2 font-medium text-gray-700" htmlFor="dimensionDescription">Description</label>
              <input
                type="text"
                id="dimensionDescription"
                value={dimensionDescription}
                onChange={(e) => setDimensionDescription(e.target.value)}
                placeholder="Enter Description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Indicator Dropdown */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700" htmlFor="dimensionIndicator">Select Indicators</label>
            <div className="flex flex-wrap gap-2">
              {/* Menampilkan tag yang sudah dipilih */}
              {selectedIndicators.map((indicator, index) => (
                <span
                  key={index}
                  className="flex items-center px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full cursor-pointer"
                  onClick={() => handleIndicatorRemove(indicator)} // Hapus tag saat diklik
                >
                  {indicator} <span className="ml-2 text-lg">×</span>
                </span>
              ))}
            </div>

            {/* Input untuk pencarian indikator */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Type to search indicators"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Dropdown untuk menampilkan hasil pencarian */}
            {searchTerm && filteredIndicators.length > 0 && (
              <ul className="mt-2 overflow-y-auto border border-gray-300 rounded-lg max-h-48">
                {filteredIndicators.map((indicator, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                    onClick={() => handleIndicatorSelect(indicator)}
                  >
                    {indicator}
                  </li>
                ))}
              </ul>
            )}
            {searchTerm && filteredIndicators.length === 0 && (
              <div className="mt-2 text-center text-gray-500">No Indicators Found</div>
            )}
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
              Add Dimension
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
