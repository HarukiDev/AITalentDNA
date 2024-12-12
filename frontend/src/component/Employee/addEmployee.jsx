import React, { useState, useEffect } from 'react';

// Fungsi untuk fetch kategori dari database (simulasi)
const fetchCategories = async () => {
  // Di sini seharusnya kamu fetch data dari API atau database, ini hanya contoh data statis
  return [
    { id: '1', name: 'Frontend Developer' },
    { id: '2', name: 'Backend Developer' },
    { id: '3', name: 'Full Stack Developer' },
  ];
};

export function AddEmployeeModal({ isOpen, onClose, addEmployee }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNIK] = useState('');
  const [position, setPosition] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch categories when the modal opens
  useEffect(() => {
    if (isOpen) {
      const loadCategories = async () => {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      };
      loadCategories();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !nik || !position || !selectedCategory) {
      alert('Please fill in all fields');
      return;
    }

    // Buat employee baru
    const newEmployee = {
      name: fullName,
      email,
      nik,
      position,
      category: selectedCategory,
    };

    // Panggil addEmployee untuk menambahkan data baru ke EmployeePage
    addEmployee(newEmployee);

    // Tutup modal setelah submit
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-2xl p-6 m-12 bg-white rounded-lg shadow-2xl">
        <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="gap-4 mb-4 md:grid md:grid-cols-2">
            {/* Full Name */}
            <div className="col-span-1">
              <label className="block mb-2 font-medium text-gray-700" htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="col-span-1">
              <label className="block mb-2 font-medium text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* NIK */}
            <div className="col-span-1">
              <label className="block mb-2 font-medium text-gray-700" htmlFor="nik">NIK</label>
              <input
                type="text"
                id="nik"
                value={nik}
                onChange={(e) => setNIK(e.target.value)}
                placeholder="Enter NIK"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Position */}
            <div className="col-span-1">
              <label className="block mb-2 font-medium text-gray-700" htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Enter position"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Dropdown */}
            <div className="col-span-2">
              <label className="block mb-2 font-medium text-gray-700" htmlFor="category">Category</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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
