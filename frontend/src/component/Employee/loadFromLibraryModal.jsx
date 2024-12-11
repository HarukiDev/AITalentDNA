import React, { useState, useEffect } from 'react';

export default function LoadFromLibraryModal({ isOpen, onClose, loadEmployees }) {
  // Contoh data yang diambil dari database (dapat diganti dengan API)
  const [Employees, setEmployees] = useState([
    { id: 1, name: 'ESQ', description: 'Berintegritas' },
    { id: 2, name: 'ESQ', description: 'Setia' },
    { id: 3, name: 'ESQ', description: 'Berkomunikasi' },
    { id: 4, name: 'ESQ', description: 'Utamakan Pelanggan' },
    { id: 5, name: 'ESQ', description: 'Inovatif' }
  ]);
  
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // Reset selected values when modal is opened
      setSelectedEmployees([]);
    }
  }, [isOpen]);

  // Handle selecting or deselecting a core value
  const toggleSelectEmployee = (Employee) => {
    setSelectedEmployees((prevValues) => {
      if (prevValues.includes(Employee)) {
        return prevValues.filter((item) => item !== Employee);
      } else {
        return [...prevValues, Employee];
      }
    });
  };

  // Handle the selection of core values and close modal
  const handleAddEmployees = () => {
    loadEmployees(selectedEmployees);
    onClose();
  };

  if (!isOpen) return null; // Don't render the modal if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Load from Library</h2>

        {/* Search Field */}
        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="Search Core Values"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm6 6h.01M16 16l3.5 3.5" />
          </svg>
        </div>

        {/* Core Value List */}
        <div className="space-y-4 overflow-y-auto max-h-64">
          {Employees.map((Employee) => (
            <div
              key={Employee.id}
              className="flex items-center justify-between p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => toggleSelectEmployee(Employee)}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(Employee)}
                  onChange={() => toggleSelectEmployee(Employee)}
                />
                <div>
                  <h3 className="font-medium text-gray-800">{Employee.name}</h3>
                  <p className="text-sm text-gray-600">{Employee.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer with Action Buttons */}
        <div className="flex justify-end mt-4 space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 font-semibold text-white bg-gray-500 rounded-full shadow-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddEmployees}
            className="px-5 py-2 font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600"
          >
            Add Core Values
          </button>
        </div>
      </div>
    </div>
  );
}
