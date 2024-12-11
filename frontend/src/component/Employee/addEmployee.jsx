import React, { useState, useEffect } from 'react';

// Fungsi untuk fetch dimensi dari database (simulasi)
const fetchEmployees = async () => {
  return [
    { id: '1', name: 'Kategori 1' },
    { id: '2', name: 'Kategori 2' },
    { id: '3', name: 'Kategori 3' },
  ];
};

export function AddEmployeeModal({ isOpen, onClose, addEmployee }) {
  const [EmployeeName, setEmployeeName] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [email, setEmail] = useState('');
  const [nik, setNik] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const loadEmployees = async () => {
        const fetchedEmployees = await fetchEmployees();
        setEmployees(fetchedEmployees);
      };
      loadEmployees();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EmployeeName || !selectedEmployee || !email || !nik || !jabatan) {
      alert('Please fill in all fields');
      return;
    }

    // Buat Employee baru
    const newEmployee = {
      name: EmployeeName,
      employee: selectedEmployee,
      email,
      nik,
      jabatan,
    };

    // Panggil addEmployee untuk menambahkan data baru ke EmployeePage
    addEmployee(newEmployee);

    // Reset form dan tutup modal
    setEmployeeName('');
    setSelectedEmployee('');
    setEmail('');
    setNik('');
    setJabatan('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={EmployeeName}
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
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="nik">NIK</label>
              <input
                type="text"
                id="nik"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                placeholder="Enter NIK"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="jabatan">Position</label>
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
              <label className="block mb-2 font-medium text-gray-700" htmlFor="employee">Category</label>
              <select
                id="employee"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.name}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 font-semibold text-white bg-gray-500 rounded-full hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
