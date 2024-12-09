import React, { useEffect, useRef, useState } from 'react';

export default function CompetencyPage({
  competencies,
  openAddCompetencyModal,
  openLoadFromLibraryModal,
  openDeleteModal,
  openEditCompetencyModal,
}) {
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Jumlah item per halaman
  const itemsPerPageOptions = [3, 5, 10, 20]; // Opsi jumlah baris per halaman

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

  const handleSaveAsCsv = () => {
    // Header kolom
    let csvContent = '"Name","Level","Description","Indicators"\n';
  
    // Tambahkan baris data
    competencies.forEach((competency) => {
      const indicators = competency.indicators.join('; '); // Gabungkan indikator menjadi satu string
      csvContent += `"${competency.name}","${competency.level}","${competency.description}","${indicators}"\n`;
    });
  
    // Buat file Blob dan unduh sebagai CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'competencies.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Filtered data based on search term
  const filteredCompetencies = competencies.filter(
    (competency) =>
      competency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      competency.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompetencies.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCompetencies.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset halaman ke awal
  };

  return (
    <div className="p-0 bg-transparent min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Competencies</h1>
          <p className="text-gray-600">
            Define competencies based on the roles and skills you need
          </p>
        </div>

        {/* Search Bar and Option Button */}
        <div className="flex items-center">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search Competencies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
            <span className="absolute left-3 text-gray-400">
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
          <div className="relative" ref={actionMenuRef}>
          <button
  className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
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
      Option
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
                  onClick={openAddCompetencyModal}
                >
                  Add Competency
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={openLoadFromLibraryModal}
                >
                  Load from Library
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleSaveAsCsv}
                >
                  Save Competency
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
          <th className="p-3">Name</th>
          <th className="p-3">Level</th>
          <th className="p-3">Description</th>
          <th className="p-3">Indicators</th>
          <th className="p-3 w-20">Action</th> {/* Fixed width for better layout */}
        </tr>
      </thead>
      <tbody>
        {currentItems.length > 0 ? (
          currentItems.map((competency, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-3 border-t">{competency.name}</td>
              <td className="p-3 border-t">{competency.level}</td>
              <td className="p-3 border-t text-gray-600">{competency.description}</td>
              <td className="p-3 border-t text-gray-600">
                <ul className="list-disc pl-5">
                  {competency.indicators.map((indicator, idx) => (
                    <li key={idx}>{indicator}</li>
                  ))}
                </ul>
              </td>
              <td className="p-3 border-t flex items-center space-x-2">
                {/* Action buttons */}
                <button
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  onClick={() => openEditCompetencyModal(competency)}
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
                  onClick={() => openDeleteModal(competency)}
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
            <td colSpan="5" className="p-5 text-center italic text-gray-500" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
              *No match records were found.*
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

      {/* Pagination */}
      <div className="flex justify-between items-center p-4">
          <div>
            <label htmlFor="itemsPerPage" className="mr-2">
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="p-2 border rounded"
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
          <div className="flex items-center">
            <button
              className={`${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } px-4 py-2 rounded transition duration-300`}
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
            >
              Previous
            </button>
            <span className="px-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`${
                currentPage === totalPages
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } px-4 py-2 rounded transition duration-300`}
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
