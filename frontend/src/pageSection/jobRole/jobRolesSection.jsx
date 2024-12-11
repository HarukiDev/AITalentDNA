import React, { useEffect, useRef, useState } from 'react';

export default function JobRolesPage({
  jobRoles,
  openAddJobRoleModal,
  openLoadFromLibraryModal,
  openDeleteModal,
  openEditJobRoleModal,
}) {
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Jumlah item per halaman (default)

  const actionMenuRef = useRef(null);

  const toggleActionMenu = () => {
    setActionMenuVisible((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setActionMenuVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filtered data based on search term
  const filteredJobRoles = jobRoles.filter(
    (jobRole) =>
      jobRole.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jobRole.competency.some((comp) =>
        comp.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJobRoles.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredJobRoles.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10)); // Ubah jumlah item per halaman
    setCurrentPage(1); // Reset ke halaman pertama
  };

  return (
    <div className="p-0 bg-transparent min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Job Roles</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Define job roles based on the competencies you need
        </p>
      </div>

      {/* Search Bar and Option Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-4 sm:mt-0">
        {/* Search Bar */}
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Job Roles"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.42-1.42l3.75 3.74a1 1 0 11-1.41 1.42l-3.75-3.74zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        {/* Option Button */}
        <div className="relative w-full sm:w-auto" ref={actionMenuRef}>
          <button
            className="flex justify-center items-center bg-blue-600 text-white py-2 px-4 w-full sm:w-auto rounded-lg"
            onClick={toggleActionMenu}
          >
            {actionMenuVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <>
                <span>Option</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>


            {actionMenuVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={openAddJobRoleModal}
                >
                  Add Job Roles
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

{/* Table */}
<div className="bg-white border rounded-lg shadow-lg overflow-hidden">
  <div style={{ overflowX: 'auto' }}> {/* Inline style for scrollable wrapper */}
    <table className="w-full text-left border-collapse">
      <thead style={{ backgroundColor: '#0C3F8B' }} className="text-white">
        <tr>
          <th className="p-3">Job Name</th>
          <th className="p-3">Competency</th>
          <th className="p-3">Additional Competency</th>
          <th className="p-3 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length > 0 ? (
          currentItems.map((jobRole) => (
            <tr key={jobRole.id} className="hover:bg-gray-100">
              <td className="p-3 border-t">{jobRole.name}</td>
              <td className="p-3 border-t text-gray-600">
                <ul className="list-disc pl-5">
                  {jobRole.competency.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </td>
              <td className="p-3 border-t text-gray-600">
                <ul className="list-disc pl-5">
                  {jobRole.additionalCompetency.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </td>
              <td className="p-3 border-t text-center flex justify-center space-x-4">
                <button
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  onClick={() => openEditJobRoleModal(jobRole)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
                  </svg>
                </button>
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => openDeleteModal(jobRole)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="p-5 text-center italic text-gray-500" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
              *No match records were found.*
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>


  <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4 sm:gap-0">
  {/* Items Per Page Selector */}
  <div className="flex items-center">
    <label htmlFor="itemsPerPage" className="mr-2 text-sm sm:text-base">
      Items per page:
    </label>
    <select
      id="itemsPerPage"
      value={itemsPerPage}
      onChange={handleItemsPerPageChange}
      className="p-2 border rounded text-sm sm:text-base"
    >
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="10">10</option>
    </select>
  </div>

  {/* Pagination Controls */}
  <div className="flex items-center justify-center gap-2">
    {/* Previous Button */}
    <button
      className={`${
        currentPage === 1
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      } px-3 sm:px-4 py-2 text-sm sm:text-base rounded transition duration-300`}
      disabled={currentPage === 1}
      onClick={handlePreviousPage}
    >
      Previous
    </button>

    {/* Current Page Info */}
    <span className="text-sm sm:text-base">
      Page {currentPage} of {totalPages}
    </span>

    {/* Next Button */}
    <button
      className={`${
        currentPage === totalPages
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      } px-3 sm:px-4 py-2 text-sm sm:text-base rounded transition duration-300`}
      disabled={currentPage === totalPages}
      onClick={handleNextPage}
    >
      Next
    </button>
  </div>
</div>

      </div>
    </div>
  );
}
