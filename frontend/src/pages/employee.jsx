import React, { useState } from 'react';

const employees = [
  {
    name: 'Xythurrrrrr',
    email: 'xyzrrrr@gmail.com',
    nik: '140307xxxxxxxx',
    category: 'category01',
    topTalent: 'EQUITABLE, FIXER, FORGIVING, COLLABORATOR, NOBLE, COMPETITIVE, INITIATOR, EXPLORER, ENERGIZER, DEVELOPER',
    bottomTalent: 'PERFECTIONIST, ARTICULATIVE, COURAGEOUS, PERSONALIZER, ADVISOR',
  },
  // Tambahkan karyawan lainnya sesuai kebutuhan
  {
    name: 'Xythurrrrrr',
    email: 'xyzrrrr@gmail.com',
    nik: '140307xxxxxxxx',
    category: 'category01',
    topTalent: 'EQUITABLE, FIXER, FORGIVING, COLLABORATOR, NOBLE, COMPETITIVE, INITIATOR, EXPLORER, ENERGIZER, DEVELOPER',
    bottomTalent: 'PERFECTIONIST, ARTICULATIVE, COURAGEOUS, PERSONALIZER, ADVISOR',
  },
  {
    name: 'Xythurrrrrr',
    email: 'xyzrrrr@gmail.com',
    nik: '140307xxxxxxxx',
    category: 'category01',
    topTalent: 'EQUITABLE, FIXER, FORGIVING, COLLABORATOR, NOBLE, COMPETITIVE, INITIATOR, EXPLORER, ENERGIZER, DEVELOPER',
    bottomTalent: 'PERFECTIONIST, ARTICULATIVE, COURAGEOUS, PERSONALIZER, ADVISOR',
  },
  {
    name: 'Xythurrrrrr',
    email: 'xyzrrrr@gmail.com',
    nik: '140307xxxxxxxx',
    category: 'category01',
    topTalent: 'EQUITABLE, FIXER, FORGIVING, COLLABORATOR, NOBLE, COMPETITIVE, INITIATOR, EXPLORER, ENERGIZER, DEVELOPER',
    bottomTalent: 'PERFECTIONIST, ARTICULATIVE, COURAGEOUS, PERSONALIZER, ADVISOR',
  },
];

const EmployeeTable = () => {
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [isImportCSVModalOpen, setIsImportCSVModalOpen] = useState(false);
  const [isShowStatusModalOpen, setIsShowStatusModalOpen] = useState(false);

  const toggleActionMenu = () => {
    setActionMenuVisible(!actionMenuVisible);
  };

  const openAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(true);
    setActionMenuVisible(false);
  };

  const closeAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(false);
  };

  const openEditEmployeeModal = () => {
    setIsEditEmployeeModalOpen(true);
    setActionMenuVisible(false);
  };

  const closeEditEmployeeModal = () => {
    setIsEditEmployeeModalOpen(false);
  };

  const openImportCSVModal = () => {
    setIsImportCSVModalOpen(true);
    setActionMenuVisible(false);
  };

  const closeImportCSVModal = () => {
    setIsImportCSVModalOpen(false);
  };

  const openShowStatusModal = () => {
    setIsShowStatusModalOpen(true);
    setActionMenuVisible(false);
  };

  const closeShowStatusModal = () => {
    setIsShowStatusModalOpen(false);
  };

  const downloadSample = () => {
    const csvData = employees.map(employee =>
      `${employee.name},${employee.email},${employee.category},${employee.topTalent},${employee.bottomTalent}`
    ).join('\n');

    const csvHeader = 'Name,Email,Category,Top 10 Talent,Bottom 5 Talent\n';
    const csvFile = new Blob([csvHeader + csvData], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(csvFile);
    downloadLink.download = 'employee_sample.csv';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="p-5 px-12 font-sans">
      <main>
        <div className="flex items-center justify-between mb-4 border-b">
          <div className="flex space-x-4">
            <a href="/employee" className="py-2 text-blue-500">Employee</a>
            <a href="/candidate" className="py-2 text-gray-700">Candidate</a>
            <a href="/category" className="py-2 text-gray-700">Category</a>
          </div>
          <div className="py-2 text-gray-500">Employee/home</div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[30px] font-semibold">Employee</h2>
            <p className="mb-4">Import employee data in Excel format, complete with names, emails, etc</p>
          </div>
          <div className="flex space-x-2">
            <div className="relative w-80">
              <input type="text" placeholder="Search Employee" className="w-full p-3 pl-10 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <svg className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm6 6h.01M16 16l3.5 3.5" />
              </svg>
            </div>
            <div className="relative">
              <button onClick={toggleActionMenu} className="flex items-center justify-center p-3 px-6 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600">
                <span>Option</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {actionMenuVisible && (
                <div className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100" onClick={openAddEmployeeModal}>
                    Add Employee
                  </div>
                  <div className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100" onClick={openImportCSVModal}>
                    Import CSV
                  </div>
                  <div className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100" onClick={downloadSample}>
                    Download Sample
                  </div>
                  <div className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100" onClick={openShowStatusModal}>
                    Show Status
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* table */}
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#0C3F8B] text-white">
              <th className="px-6 py-3 text-left rounded-tl-lg rounded-bl-lg">Employee</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Top 10 Talent Value</th>
              <th className="px-6 py-3 text-left">Bottom 5 Talent Value</th>
              <th className="px-6 py-3 text-left rounded-tr-lg rounded-br-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={index}
                className="transition-colors border-b hover:bg-gray-100"
              >
                <td className="flex items-center px-6 py-3">
                  <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" alt="Avatar" className="w-10 h-10 mr-3 rounded-full" />
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-gray-500">140307xxxxxxxx</div>
                  </div>
                </td>
                <td className="px-6 py-3">{employee.email}</td>
                <td className="px-6 py-3">{employee.category}</td>
                <td className="px-6 py-3">{employee.topTalent}</td>
                <td className="px-6 py-3">{employee.bottomTalent}</td>
                <td className="flex justify-around px-6 py-3 space-x-2">
                  <div className="flex justify-around space-x-2">
                    {/* Edit Button */}
                    <button className="text-blue-500 hover:text-blue-700 focus:outline-none" aria-label="Edit" onClick={openEditEmployeeModal}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
                      </svg>
                    </button>
                    {/* Delete Button */}
                    <button className="text-red-500 hover:text-red-700 focus:outline-none" aria-label="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isAddEmployeeModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-2xl">
              <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Add Employee</h2>
              <form>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Kolom Kiri */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700" htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Enter full name"
                      className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {/* Kolom Kanan */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700" htmlFor="nik">Nomer Induk Karyawan</label>
                    <input
                      type="text"
                      id="nik"
                      placeholder="Enter NIK"
                      className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700" htmlFor="jabatan">Jabatan</label>
                    <input
                      type="text"
                      id="jabatan"
                      placeholder="Enter position"
                      className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {/* Dropdown */}
                  <div className="col-span-2">
                    <label className="block mb-2 font-medium text-gray-700" htmlFor="kategori">Kelompok / Kategori</label>
                    <select
                      id="kategori"
                      className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1">Kategori 1</option>
                      <option value="2">Kategori 2</option>
                      <option value="3">Kategori 3</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeAddEmployeeModal}
                    className="px-5 py-2 font-semibold text-white transition-all bg-gray-500 rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-semibold text-white transition-all bg-blue-500 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    Add Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isEditEmployeeModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-2xl">
              <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Edit Employee</h2>
              <form>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Kolom Kiri */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700" htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Enter full name"
                      className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {/* Kolom Kanan */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700" htmlFor="nik">Nomer Induk Karyawan</label>
                    <input
                      type="text"
                      id="nik"
                      placeholder="Enter NIK"
                      className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700" htmlFor="jabatan">Jabatan</label>
                    <input
                      type="text"
                      id="jabatan"
                      placeholder="Enter position"
                      className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {/* Dropdown */}
                  <div className="col-span-2">
                    <label className="block mb-2 font-medium text-gray-700" htmlFor="kategori">Kelompok / Kategori</label>
                    <select
                      id="kategori"
                      className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1">Kategori 1</option>
                      <option value="2">Kategori 2</option>
                      <option value="3">Kategori 3</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeEditEmployeeModal}
                    className="px-5 py-2 font-semibold text-white transition-all bg-gray-500 rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-semibold text-white transition-all bg-blue-500 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    Update Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isImportCSVModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-lg p-8 transition-transform duration-300 transform scale-100 bg-white rounded-lg shadow-2xl">
              <h2 className="pb-2 mb-6 text-2xl font-bold text-gray-800 border-b">Import CSV</h2>
              <form>
                <div className="mb-6">
                  <label
                    htmlFor="fileUpload"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Upload File
                  </label>
                  <input
                    type="file"
                    id="fileUpload"
                    accept=".csv, .xls, .xlsx"
                    className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeImportCSVModal}
                    className="px-5 py-2 font-semibold text-white transition-all bg-gray-500 rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-semibold text-white transition-all bg-blue-500 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    Import
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


        {isShowStatusModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-lg p-8 transition-transform duration-300 transform scale-100 bg-white rounded-lg shadow-2xl">
              <h2 className="pb-2 mb-6 text-2xl font-bold text-gray-800 border-b">Employee Status</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Total:</span>
                  <span>4</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Sudah Isi TalentDNA:</span>
                  <span>14</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Belum Isi TalentDNA:</span>
                  <span>0</span>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeShowStatusModal}
                  className="px-5 py-2 font-semibold text-white transition-all bg-blue-500 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default EmployeeTable;
