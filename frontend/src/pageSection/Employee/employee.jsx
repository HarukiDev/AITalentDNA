import React, { useState, useEffect, useRef } from 'react';

const Employee = () => {
  // Dummy employee data
  const [filteredemployees, setFilteredEmployees] = useState([
    {
      name: "John Doe",
      nik: "12345",
      email: "johndoe@example.com",
      category: "Developer",
      topTalent: "EQUITABLE...",
      bottomTalent: "PERFECTIONIST...",
    },
  ]);

  // State to handle modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(null); // For holding employee data to edit

  // State to handle modal visibility for Import CSV
  const [showImportModal, setShowImportModal] = useState(false);

   // Handle CSV file input change
   const handleCsvFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
    } else {
      alert('Please upload a valid CSV file.');
    }
  };

  // Handle CSV file import (simple implementation to read file)
  const handleImportCsv = () => {
    if (!csvFile) {
      alert('Please select a CSV file first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;
      // Process the CSV file content (you could use a library like PapaParse)
      console.log(fileContent); // Just logging the content for now
      setShowImportModal(false); // Close modal after importing
      setCsvFile(null); // Reset the CSV file state
    };
    reader.readAsText(csvFile);
  };

    // Dummy download function
    const downloadCSV = () => {
      const headers = ['Employee', 'Email', 'Category', 'Top 10 Talent Value', 'Bottom 5 Talent Value'];
      const rows = filteredemployees.map(employee => [
        employee.name,
        employee.email,
        employee.category,
        employee.topTalent,
        employee.bottomTalent,
      ]);
  
      // Convert headers and rows into a CSV string
      const csvContent = [
        headers.join(','), // Add header row
        ...rows.map(row => row.join(',')), // Add data rows
      ].join('\n');
  
      // Create a Blob from the CSV string and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'employees.csv'; // The name of the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  // Function to open edit modal and prefill data
  const openEditModal = (employee) => {
    setEditEmployeeData(employee);
    setIsModalVisible(true);
  };

  // Function to update employee data
  const handleUpdateEmployee = (updatedEmployee) => {
    setFilteredEmployees(
      filteredemployees.map((employee) =>
        employee.nik === updatedEmployee.nik ? updatedEmployee : employee
      )
    );
    setIsModalVisible(false); // Close modal after updating
  };

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // State untuk modal hapus
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Menyimpan data karyawan yang akan dihapus

  // Fungsi untuk membuka modal hapus
  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalVisible(true);
  };

  // Fungsi untuk menutup modal hapus
  const closeDeleteModal = () => {
    setSelectedEmployee(null);
    setIsDeleteModalVisible(false);
  };

  // Fungsi untuk menghapus karyawan
  const handleDeleteEmployee = () => {
    setFilteredEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee !== selectedEmployee)
    );
    closeDeleteModal(); // Tutup modal setelah menghapus
  };

   // Handle search (just a placeholder, you can implement filtering later)
   const handleSearch = (event) => {
    // Implement your search functionality here
    console.log(event.target.value);
  };



   // Toggle dropdown visibility
   const [actionMenuVisible, setActionMenuVisible] = useState(false);
   const toggleDropdown = () => setActionMenuVisible(!actionMenuVisible);


   const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newEmployeeData, setNewEmployeeData] = useState({
    name: "",
    nik: "",
    email: "",
    category: "",
    topTalent: "",
    bottomTalent: "",
  });
 
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditEmployeeData({ ...editEmployeeData, [name]: value });
  };

  const openAddModal = () => {
    setIsAddModalVisible(true);
  };

  const closeAddModal = () => {
    setNewEmployeeData({
      name: "",
      nik: "",
      email: "",
      category: "",
      topTalent: "",
      bottomTalent: "",
    });
    setIsAddModalVisible(false);
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    setFilteredEmployees((prevEmployees) => [...prevEmployees, newEmployeeData]);
    closeAddModal();
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployeeData({ ...newEmployeeData, [name]: value });
  };


  return (
    <div id="employee">
      <div className="flex flex-col items-center justify-between mb-5 md:flex-row">
        <div>
          <h2 className="text-[30px] font-semibold">Employee</h2>
          <p className="mb-4">Manage your employee data.</p>
        </div>
        <div className="flex space-x-2">
          {/* Your Search and Action Buttons */}
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search Employee"
              className="w-full p-3 pl-10 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
            />
            <svg
              className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm6 6h.01M16 16l3.5 3.5"
              />
            </svg>
          </div>
          <div className="relative" ref={useRef()}>
            <button
              className="flex items-center justify-center p-3 px-6 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={toggleDropdown}
            >
              <span>Option</span>
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={actionMenuVisible
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M19 9l-7 7-7-7'
                  }
                />
              </svg>
            </button>
            {actionMenuVisible && (
              <div className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                
                <div className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100" onClick={() => setShowAddModal(true)}>
                  Add Employee
                </div>
                <div className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100" onClick={() => setShowImportModal(true)}>
                  Import CSV
                </div>
                <div className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100" onClick={downloadCSV}>
                  Download Sample
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {isAddModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
            <form onSubmit={handleAddEmployee}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newEmployeeData.name}
                  onChange={handleNewInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">NIK</label>
                <input
                  type="text"
                  name="nik"
                  value={newEmployeeData.nik}
                  onChange={handleNewInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newEmployeeData.email}
                  onChange={handleNewInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={newEmployeeData.category}
                  onChange={handleNewInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Top 10 Talent Value</label>
                <input
                  type="text"
                  name="topTalent"
                  value={newEmployeeData.topTalent}
                  onChange={handleNewInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Bottom 5 Talent Value</label>
                <input
                  type="text"
                  name="bottomTalent"
                  value={newEmployeeData.bottomTalent}
                  onChange={handleNewInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={closeAddModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import CSV Modal */}
      {showImportModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Import CSV</h3>
            <div className="mb-4">
              <input
                type="file"
                accept=".csv"
                onChange={handleCsvFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleImportCsv}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus */}
      {isDeleteModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
            <h3 className="text-lg font-bold text-center mb-4">
              Are you sure you want to delete this employee?
            </h3>
            <p className="text-center text-gray-700 mb-6">
              {selectedEmployee?.name} ({selectedEmployee?.email})
            </p>
            <div className="flex justify-between">
              <button
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                onClick={handleDeleteEmployee}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-3/4 max-w-4xl">
            <h3 className="text-2xl font-semibold mb-6 text-center text-blue-600">Edit Employee</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedEmployee = {
                  name: e.target.name.value,
                  nik: e.target.nik.value,
                  email: e.target.email.value,
                  category: e.target.category.value,
                  topTalent: e.target.topTalent.value,
                  bottomTalent: e.target.bottomTalent.value,
                };
                handleUpdateEmployee(updatedEmployee); // Update employee data
              }}
            >
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={editEmployeeData?.name}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="nik" className="block text-sm font-medium text-gray-700">NIK</label>
                  <input
                    type="text"
                    id="nik"
                    name="nik"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={editEmployeeData?.nik}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={editEmployeeData?.email}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    id="category"
                    name="category"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={editEmployeeData?.category}
                    required
                  >
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="topTalent" className="block text-sm font-medium text-gray-700">Top 10 Talent Value</label>
                  <select
                    id="topTalent"
                    name="topTalent"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={editEmployeeData?.topTalent}
                    required
                  >
                    <option value="Category 1">Category 1</option>
                    <option value="Category 2">Category 2</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="bottomTalent" className="block text-sm font-medium text-gray-700">Bottom 5 Talent Value</label>
                  <select
                    id="bottomTalent"
                    name="bottomTalent"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={editEmployeeData?.bottomTalent}
                    required
                  >
                    <option value="Category 1">Category 1</option>
                    <option value="Category 2">Category 2</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between items-center mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalVisible(false)}
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-full overflow-x-auto">
        <table className="min-w-[1200px] lg:min-w-full border-collapse">
          <thead>
            <tr className="bg-[#0C3F8B] text-white">
              <th className="py-3 px-6 text-left rounded-tl-lg rounded-bl-lg">Employee</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Top 10 Talent Value</th>
              <th className="py-3 px-6 text-left">Bottom 5 Talent Value</th>
              <th className="py-3 px-6 text-left rounded-tr-lg rounded-br-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredemployees.length > 0 ? (
              filteredemployees.map((employee, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 transition-colors">
                  <td className="py-3 px-6 flex items-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" alt="Avatar" className="mr-3 w-10 h-10 rounded-full" />
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-gray-500">{employee.nik}</div>
                    </div>
                  </td>
                  <td className="py-3 px-6">{employee.email}</td>
                  <td className="py-3 px-6">{employee.category}</td>
                  <td className="py-3 px-6">{employee.topTalent}</td>
                  <td className="py-3 px-6">{employee.bottomTalent}</td>
                  <td className="py-3 px-6 flex justify-around space-x-2">

                  <button
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                      onClick={() => openEditModal(employee)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
                      </svg>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      onClick={() => openDeleteModal(employee)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                      </svg>
                    </button>
                    {/* Add a delete function here */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3">No employees available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
