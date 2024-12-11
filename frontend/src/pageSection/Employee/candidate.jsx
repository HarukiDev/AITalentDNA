import React, { useState, useEffect, useRef } from 'react';

const Candidate = () => {
  const [filteredCandidates, setFilteredCandidates] = useState([]); // State for candidates
  const [actionMenuVisible, setActionMenuVisible] = useState(false); // State for dropdown visibility
  const [showAddModal, setShowAddModal] = useState(false); // State to show/hide the add candidate modal
  const [showEditModal, setShowEditModal] = useState(false); // State to show/hide the edit candidate modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to show/hide the delete confirmation modal
  const [showImportModal, setShowImportModal] = useState(false); // State to show/hide the import modal
  const [newCandidate, setNewCandidate] = useState({ name: '', email: '', role: '', topTalent: '', bottomTalent: '' }); // New candidate data
  const [editCandidate, setEditCandidate] = useState({ name: '', email: '', role: '', topTalent: '', bottomTalent: '' }); // Candidate to edit
  const [candidateToDelete, setCandidateToDelete] = useState(null); // Candidate to delete
  const [csvFile, setCsvFile] = useState(null); // State to hold the CSV file
  const dropdownRef = useRef(null); // Reference for the dropdown

  // Sample data for candidates
  const candidates = [
    { name: 'Fathur', email: 'fathur@gmail.com', role: 'member', topTalent: 'EQUITABLE, FIXER', bottomTalent: 'PERFECTIONIST' }
    // Add more candidates as needed
  ];

  // Initialize filtered candidates
  useEffect(() => {
    setFilteredCandidates(candidates);
  }, []);

  // Handle form change (for both new and edit candidate)
  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditCandidate((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setNewCandidate((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle adding a new candidate
  const handleAddCandidate = () => {
    setFilteredCandidates((prev) => [...prev, newCandidate]);
    setShowAddModal(false); // Close the modal
    setNewCandidate({ name: '', email: '', role: '', topTalent: '', bottomTalent: '' }); // Reset form
  };

  // Handle editing a candidate
  const handleEditCandidate = () => {
    setFilteredCandidates((prev) =>
      prev.map((candidate) =>
        candidate.email === editCandidate.email ? editCandidate : candidate
      )
    );
    setShowEditModal(false); // Close the modal
    setEditCandidate({ name: '', email: '', role: '', topTalent: '', bottomTalent: '' }); // Reset form
  };

  // Handle deleting a candidate
  const handleDeleteCandidate = () => {
    setFilteredCandidates((prev) =>
      prev.filter((candidate) => candidate.email !== candidateToDelete.email)
    );
    setShowDeleteModal(false); // Close the modal
    setCandidateToDelete(null); // Reset delete candidate
  };

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

  // Search logic (for example)
  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setFilteredCandidates(
      candidates.filter(candidate =>
        candidate.name.toLowerCase().includes(searchQuery) || candidate.email.toLowerCase().includes(searchQuery)
      )
    );
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setActionMenuVisible(!actionMenuVisible);
  };

  // Open Edit Candidate Modal
  const openEditCandidateModal = (candidate) => {
    setEditCandidate(candidate);
    setShowEditModal(true);
  };

  // Open Delete Candidate Modal
  const openDeleteCandidateModal = (candidate) => {
    setCandidateToDelete(candidate);
    setShowDeleteModal(true);
  };

  const downloadCSV = () => {
    const headers = ['Candidate', 'Role', 'Top 10 Talent Value', 'Bottom 5 Talent Value'];
    const rows = filteredCandidates.map(candidate => [
      candidate.name,
      candidate.role,
      candidate.topTalent,
      candidate.bottomTalent,
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
    link.download = 'candidates.csv'; // The name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div id="candidate">
      <div className="flex flex-col items-center justify-between mb-5 md:flex-row">
        <div>
          <h2 className="text-[30px] font-semibold">Candidate</h2>
          <p className="mb-4">Import candidate data in Excel format, including names and email addresses</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search Candidate"
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
          <div className="relative" ref={dropdownRef}>
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
                  Add Candidate
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

      {/* Add Candidate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Candidate</h3>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={newCandidate.name}
                onChange={(e) => handleInputChange(e)}
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={newCandidate.email}
                onChange={(e) => handleInputChange(e)}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="role"
                value={newCandidate.role}
                onChange={(e) => handleInputChange(e)}
                placeholder="Role"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="topTalent"
                value={newCandidate.topTalent}
                onChange={(e) => handleInputChange(e)}
                placeholder="Top 10 Talent Value"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="bottomTalent"
                value={newCandidate.bottomTalent}
                onChange={(e) => handleInputChange(e)}
                placeholder="Bottom 5 Talent Value"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCandidate}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add Candidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Candidate Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Candidate</h3>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={editCandidate.name}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={editCandidate.email}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="role"
                value={editCandidate.role}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="Role"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="topTalent"
                value={editCandidate.topTalent}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="Top 10 Talent Value"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="bottomTalent"
                value={editCandidate.bottomTalent}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="Bottom 5 Talent Value"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleEditCandidate}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Candidate Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-2xl">
            {/* Close Button */}


            {/* Modal Content */}
            <div className="flex flex-col items-center justify-center text-center">
              {/* Trash Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="text-red-500 w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-2-2m0 0l-2-2m2 2H9m10 0l-1 12a2 2 0 01-2 2H6a2 2 0 01-2-2L3 7M7 7h10M10 11v6M14 11v6" />
              </svg>

              <h3 className="mb-4 text-xl font-semibold text-gray-800">Delete Candidate</h3>
              <p className="mb-6 text-gray-600">
                Are you sure you want to delete the Candidate <strong></strong>?
              </p>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 text-white bg-gray-400 rounded-full hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCandidate}
                  className="px-6 py-2 text-white bg-red-600 rounded-full hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

      )}

      <div className="max-w-full overflow-x-auto">
        <table className="min-w-[1200px] lg:min-w-full border-collapse">
          <thead>
            <tr className="bg-[#0C3F8B] text-white">
              <th className="py-3 px-6 text-left rounded-tl-lg rounded-bl-lg">Candidate</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Top 10 Talent Value</th>
              <th className="py-3 px-6 text-left">Bottom 5 Talent Value</th>
              <th className="py-3 px-6 text-left rounded-tr-lg rounded-br-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 transition-colors">
                  <td className="py-3 px-6 flex items-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" alt="Avatar" className="mr-3 w-10 h-10 rounded-full" />
                    <div>
                      <div className="font-medium">{candidate.name}</div>
                      <div className="text-gray-500">{candidate.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-6">{candidate.role}</td>
                  <td className="py-3 px-6">{candidate.topTalent}</td>
                  <td className="py-3 px-6">{candidate.bottomTalent}</td>
                  <td className="py-3 px-6 flex justify-around space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                      onClick={() => openEditCandidateModal(candidate)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
                      </svg>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      onClick={() => openDeleteCandidateModal(candidate)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center text-gray-500">No candidates found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Candidate;
