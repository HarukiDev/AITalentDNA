import React, { useState, useEffect } from 'react';

export default function AddEmployeeModal({ isOpen, onClose, addEmployee }) {
  const [employee, setEmployee] = useState({
    fullName: '',
    email: '',
    nik: '',
    jabatan: '',
    category: '',  // This will hold the ID of the selected category
  });

  const [categories] = useState([
    { id: '1', name: 'category 1' },
    { id: '2', name: 'category 2' },
    { id: '3', name: 'category 3' },
  ]);

  // Handle modal visibility and reset form
  useEffect(() => {
    if (!isOpen) {
      setEmployee({
        fullName: '',
        email: '',
        nik: '',
        jabatan: '',
        category: '',  // Reset the category value
      });
    }
  }, [isOpen]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!employee.fullName || !employee.email || !employee.nik || !employee.jabatan || !employee.category) {
      alert('Please fill in all fields');
      return;
    }

    // Find category name based on selected category ID
    const selectedCategory = categories.find((cat) => cat.id === employee.category);

    // If selectedCategory is found, proceed to add the employee
    if (selectedCategory) {
      addEmployee({
        name: employee.fullName,  // Change fullName to name
        email: employee.email,
        category: selectedCategory.name,  // Send category name instead of ID
      });
    }

    onClose(); // Close the modal after adding the employee
  };

  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Left Column */}
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={employee.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={employee.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Right Column */}
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="nik">
                Nomer Induk Karyawan (NIK)
              </label>
              <input
                type="text"
                id="nik"
                name="nik"
                value={employee.nik}
                onChange={handleInputChange}
                placeholder="Enter NIK"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="jabatan">
                Jabatan
              </label>
              <input
                type="text"
                id="jabatan"
                name="jabatan"
                value={employee.jabatan}
                onChange={handleInputChange}
                placeholder="Enter position"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Dropdown */}
            <div className="col-span-2">
              <label className="block mb-2 font-medium text-gray-700" htmlFor="category">
                Kelompok / Kategori
              </label>
              <select
                id="category"
                name="category"
                value={employee.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
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
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
