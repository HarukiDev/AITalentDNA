import React, { useState, useEffect } from 'react';

const EditEmployeeModal = ({ isOpen, onClose, employee, updateEmployee }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNIK] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories] = useState([
    { id: '1', name: 'Kategori 1' },
    { id: '2', name: 'Kategori 2' },
    { id: '3', name: 'Kategori 3' },
  ]);

  // Gunakan useEffect untuk memastikan data employee ter-set pada saat modal dibuka
  useEffect(() => {
    if (isOpen && employee) {
      console.log("Employee data received:", employee); // Debugging
      setEmployeeName(employee.name || '');
      setEmail(employee.email || '');
      setNIK(employee.nik || '');
      setJabatan(employee.jabatan || '');
      setSelectedCategory(employee.category || ''); // Pastikan kategori ter-set sesuai data
    }
  }, [isOpen, employee]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input
    if (!employeeName || !email || !nik || !jabatan || !selectedCategory) {
      alert('Please fill in all fields');
      return;
    }

    // Siapkan data yang akan diperbarui
    const updatedEmployee = {
      ...employee, // Menggunakan data employee yang sudah ada
      name: employeeName,
      email,
      nik,
      jabatan,
      category: selectedCategory, // Pastikan kategori yang dipilih benar
    };

    // Kirim data yang sudah di-update ke parent
    updateEmployee(updatedEmployee);
    onClose(); // Tutup modal setelah data di-update
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="fullName">
                Full Name
              </label>
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
              <label className="block mb-2 font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="nik">
                NIK
              </label>
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
              <label className="block mb-2 font-medium text-gray-700" htmlFor="jabatan">
                Jabatan
              </label>
              <input
                type="text"
                id="jabatan"
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                placeholder="Enter position"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 font-medium text-gray-700" htmlFor="category">
                Category
              </label>
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
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
