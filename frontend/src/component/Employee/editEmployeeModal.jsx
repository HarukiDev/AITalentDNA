import React, { useState, useEffect } from 'react';

export function EditEmployeeModal({ isOpen, onClose, Employee, updateEmployee }) {
  const [employeeName, setEmployeeName] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNIK] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([
    { id: '1', name: 'Kategori 1' },
    { id: '2', name: 'Kategori 2' },
    { id: '3', name: 'Kategori 3' },
  ]);

  useEffect(() => {
    if (isOpen && Employee) {
      // Set nilai default dari employee yang sedang diedit
      setEmployeeName(Employee.name || '');
      setEmail(Employee.email || '');
      setNIK(Employee.nik || '');
      setJabatan(Employee.jabatan || '');
      setSelectedCategory(Employee.category || '');
    }
  }, [isOpen, Employee]);

  if (!isOpen) return null; // Jangan render modal jika tidak terbuka

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input
    if (!employeeName || !email || !nik || !jabatan || !selectedCategory) {
      alert('Please fill in all fields');
      return;
    }

    // Update data employee
    const updatedEmployee = {
      ...Employee,
      name: employeeName,
      email,
      nik,
      jabatan,
      category: selectedCategory,
    };

    // Panggil fungsi update dari parent component
    updateEmployee(updatedEmployee);

    // Tutup modal setelah submit
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Kolom Kiri */}
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="Enter full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
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

            {/* Kolom Kanan */}
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="nik">Nomer Induk Karyawan</label>
              <input
                type="text"
                id="nik"
                value={nik}
                onChange={(e) => setNIK(e.target.value)}
                placeholder="Enter NIK"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="jabatan">Jabatan</label>
              <input
                type="text"
                id="jabatan"
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                placeholder="Enter position"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Dropdown Kategori */}
            <div className="col-span-2">
              <label className="block mb-2 font-medium text-gray-700" htmlFor="category">Kelompok / Kategori</label>
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

          {/* Tombol Aksi */}
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
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
