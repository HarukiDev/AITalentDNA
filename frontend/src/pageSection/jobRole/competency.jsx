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
    <div className="min-h-screen p-0 bg-transparent">
      {/* Header */}
      <div className="flex flex-col items-start justify-between mb-5 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Competencies</h1>
        <p className="text-sm text-gray-600 sm:text-base">
          Define competencies based on the roles and skills you need
        </p>
      </div>

      {/* Search Bar and Option Button */}
      <div className="flex flex-col items-start gap-3 mt-4 sm:flex-row sm:items-center sm:gap-4 sm:mt-0">
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Competencies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg shadow-sm sm:w-64 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <span className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
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
        <div className="relative w-full sm:w-auto" ref={actionMenuRef}>
          <button
            className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-lg sm:w-auto"
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
              <div className="absolute right-0 w-48 mt-2 bg-white border rounded-lg shadow-lg">
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={openAddCompetencyModal}
                >
                  Add Competency
                </button>
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={openLoadFromLibraryModal}
                >
                  Load from Library
                </button>
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
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
<div className="overflow-hidden bg-white border rounded-lg shadow-lg">
  <div style={{ overflowX: 'auto' }}> {/* Inline style for scrollable wrapper */}
    <table className="w-full text-left border-collapse">
      <thead style={{ backgroundColor: '#0C3F8B' }} className="text-white">
        <tr>
          <th className="p-3">Name</th>
          <th className="p-3">Level</th>
          <th className="p-3">Description</th>
          <th className="p-3">Indicators</th>
          <th className="w-20 p-3">Action</th> {/* Fixed width for better layout */}
        </tr>
      </thead>
      <tbody>
        {currentItems.length > 0 ? (
          currentItems.map((competency, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-3 ">{competency.name}</td>
              <td className="p-3 ">{competency.level}</td>
              <td className="p-3 text-gray-600 border-t">{competency.description}</td>
              <td className="p-3 text-gray-600">
                <ul className="pl-5 list-disc">
                  {competency.indicators.map((indicator, idx) => (
                    <li key={idx}>{indicator}</li>
                  ))}
                </ul>
              </td>
              <td className="flex items-center p-3 space-x-2">
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
            <td colSpan="5" className="p-5 italic text-center text-gray-500" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
              *No match records were found.*
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

 {/* Pagination */}
<div className="flex flex-col items-center justify-between gap-4 p-4 sm:flex-row sm:gap-0">
  {/* Items Per Page Selector */}
  <div className="flex items-center">
    <label htmlFor="itemsPerPage" className="mr-2 text-sm sm:text-base">
      Items per page:
    </label>
    <select
      id="itemsPerPage"
      value={itemsPerPage}
      onChange={handleItemsPerPageChange}
      className="p-2 text-sm border rounded sm:text-base"
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
