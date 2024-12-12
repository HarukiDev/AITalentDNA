import React, { useState, useEffect } from "react";

export default function Candidate({
  Candidates,
  openAddCandidateModal,
  openEditCandidateModal,
  openDeleteModal,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter candidates based on search query
  const filteredCandidates = Candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCandidates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="min-h-screen p-0 bg-transparent">
      {/* Header */}
      <div className="flex flex-col items-start justify-between mb-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Candidate</h1>
          <p className="text-sm text-gray-600 sm:text-base">Manage your candidate data.</p>
        </div>
        {/* Search Bar and Add Button */}
        <div className="flex flex-wrap items-center gap-4 md:justify-end">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search Candidate"
              className="w-full p-3 pl-10 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          <button
            onClick={openAddCandidateModal}
            className="p-3 px-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Add Candidate
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-white border rounded-lg shadow-lg">
        <div style={{ overflowX: "auto" }}>
          <table className="w-full text-left border-collapse">
            <thead style={{ backgroundColor: "#0C3F8B" }} className="text-white">
              <tr>
                <th className="p-3">Candidate</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Top Talent</th>
                <th className="p-3">Bottom Talent</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-100">
                    <td className="p-3">{candidate.name}</td>
                    <td className="p-3">{candidate.email}</td>
                    <td className="p-3">{candidate.role}</td>
                    <td className="p-3">{candidate.topTalent}</td>
                    <td className="p-3">{candidate.bottomTalent}</td>
                    <td className="flex justify-center p-3 space-x-4 text-center">
                        <button
                          className="text-blue-500 hover:text-blue-700 focus:outline-none"
                          onClick={() => openEditCandidateModal(candidate)}
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
                          onClick={() => openDeleteModal(candidate)}
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
                  <td colSpan="6" className="p-5 italic text-center text-gray-500">
                    *No candidates found.*
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-4 p-4 sm:flex-row sm:gap-0">
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
          <div className="flex items-center justify-center gap-2">
            <button
              className={`${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } px-3 sm:px-4 py-2 text-sm sm:text-base rounded transition duration-300`}
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
            >
              Previous
            </button>
            <span className="text-sm sm:text-base">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
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
