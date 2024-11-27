import React, { useState } from 'react';

const jobRole = [
  {
    jobRole: 'Dokter Umum',
    competency: 'loremipsum',
    additionalCompetency: 'loremipsum',
  },
  {
    jobRole: 'Dokter Umum',
    competency: 'loremipsum',
    additionalCompetency: 'loremipsum',
  },
  {
    jobRole: 'Dokter Umum',
    competency: 'loremipsum',
    additionalCompetency: 'loremipsum',
  },
];

const JobroleTable = () => {
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [isAddJobroleModalOpen, setIsAddJobroleModalOpen] = useState(false);
  const [isEditJobroleModalOpen, setIsEditJobroleModalOpen] = useState(false);
  const [isImportCSVModalOpen, setIsImportCSVModalOpen] = useState(false);

  const toggleActionMenu = () => {
    setActionMenuVisible(!actionMenuVisible);
  };

  const openAddJobroleModal = () => {
    setIsAddJobroleModalOpen(true);
    setActionMenuVisible(false);
  };

  const closeAddJobroleModal = () => {
    setIsAddJobroleModalOpen(false);
  };

  const openEditJobroleModal = () => {
    setIsEditJobroleModalOpen(true);
    setActionMenuVisible(false);
  };

  const closeEditJobroleModal = () => {
    setIsEditJobroleModalOpen(false);
  };

  const openImportCSVModal = () => {
    setIsImportCSVModalOpen(true);
    setActionMenuVisible(false);
  };

  const closeImportCSVModal = () => {
    setIsImportCSVModalOpen(false);
  };

  return (
    <div className="font-sans p-5 px-12">
      <header className="flex justify-between items-center mb-12">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <img src="https://backend.talentdna.me/img/logo.png" alt="Talent Finder Logo" className="mr-2" style={{ width: '170px' }} />
          </div>
          <nav className="flex space-x-4">
            <a href="/" className="text-gray-700">Home</a>
            <a href="/employee" className="text-gray-700">Employee</a>
            <a href="/jobrole" className="text-blue-500">Job Role</a>
            <a href="/corevalue" className="text-gray-700">Core Value</a>
          </nav>
        </div>
        {/* Login and Sign In Buttons */}
        <div className="flex space-x-2">
          <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full">Login</button>
          <button className="bg-[#536CE3] text-white px-4 py-2 rounded-full">Sign In</button>
        </div>

      </header>

      <main>
        <div className="flex justify-between items-center mb-4 border-b">
          <div className="flex space-x-4">
            <a href="/jobroles" className="text-blue-500 py-2">Job Roles</a>
            <a href="/competency" className="text-gray-700 py-2">Competency</a>
          </div>
          <div className="py-2 text-gray-500">Job Roles/Job Roles</div>
        </div>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-[30px] font-semibold">Job Roles</h2>
            <p className="mb-4">Define job roles based on the competencies you need</p>
          </div>
          <div className="flex space-x-2">
            <div className="relative w-80">
              <input type="text" placeholder="Search Job Role" className="p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm6 6h.01M16 16l3.5 3.5" />
              </svg>
            </div>
            <div className="relative">
              <button onClick={toggleActionMenu} className="p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors px-6">
                <span>Option</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {actionMenuVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <div className="py-2 px-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={openAddJobroleModal}>
                    Add Job Roles
                  </div>
                  <div className="py-2 px-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={openImportCSVModal}>
                    Import CSV
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
              <th className="py-3 px-6 text-left">Job Role</th>
              <th className="py-3 px-6 text-left">Competency</th>
              <th className="py-3 px-6 text-left">Additional Competency</th>
              <th className="py-3 px-6 text-left rounded-tr-lg rounded-br-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobRole.map((jobRole, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-6">{jobRole.jobRole}</td>
                <td className="py-3 px-6">{jobRole.competency}</td>
                <td className="py-3 px-6">{jobRole.additionalCompetency}</td>
                <td className="py-3 px-6 flex justify-around space-x-2">
                  <div className="flex justify-around space-x-2">
                    {/* Edit Button */}
                    <button className="text-blue-500 hover:text-blue-700 focus:outline-none" aria-label="Edit" onClick={openEditJobroleModal}>
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

        {isAddJobroleModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-3xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Add Job Role</h2>
              <form>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Dropdown */}
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="kategori">Related Jobs</label>
                    <select
                      id="kategori"
                      className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option value="1">Dokter Umum</option>
                      <option value="2">Dokter Umum</option>
                      <option value="3">Dokter Umum</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeAddJobroleModal}
                    className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-all"
                  >
                    Add Job Roles
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isEditJobroleModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-3xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Edit Job Role</h2>
              <form>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Kolom Kiri */}
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="kategori">Related Jobs</label>
                    <select
                      id="kategori"
                      className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option value="1">Dokter Umum</option>
                      <option value="2">Dokter Umum</option>
                      <option value="3">Dokter Umum</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">Job Roles</label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Change Job Roles"
                      className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="additionalCompetency">Additional Competency</label>
                    <input
                      type="text"
                      id="additionalCompetency"
                      placeholder="Change Additional Competency"
                      className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeEditJobroleModal}
                    className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-all"
                  >
                    Update Job Role
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isImportCSVModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg shadow-2xl transform scale-100 transition-transform duration-300 w-full max-w-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Import CSV</h2>
              <form>
                <div className="mb-6">
                  <label
                    htmlFor="fileUpload"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Upload File
                  </label>
                  <input
                    type="file"
                    id="fileUpload"
                    accept=".csv, .xls, .xlsx"
                    className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeImportCSVModal}
                    className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-all"
                  >
                    Import
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default JobroleTable;
