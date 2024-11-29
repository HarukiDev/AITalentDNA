import React, { useState, useEffect, useRef } from 'react';

export default function CoreValue({
  coreValues,
  openAddCoreValueModal,
  openLoadFromLibraryModal,
  openEditCoreValueModal,
  openDeleteModal,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMenuVisible, setActionMenuVisible] = useState(false); // State untuk dropdown visibility
  const dropdownRef = useRef(null); // Reference untuk dropdown menu

  // Filter berdasarkan pencarian
  const filteredCoreValues = coreValues.filter((coreValue) =>
    coreValue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coreValue.dimension.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle menu dropdown ketika tombol "Option" diklik
  const toggleActionMenu = () => {
    setActionMenuVisible(prev => !prev); // Toggle visibility
  };

  // Menutup dropdown ketika mengklik di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActionMenuVisible(false); // Menutup dropdown jika klik di luar
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div id="coreValue">
      <div className="flex flex-col items-center justify-between mb-5 md:flex-row">
        <div>
          <h2 className="text-[30px] font-semibold">Core Value</h2>
          <p className="mb-4">Manage the core values for your organization.</p>
        </div>
        <div className="flex space-x-2">
          {/* Search Bar */}
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search Core Value"
              className="w-full p-3 pl-10 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
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

          {/* Tombol Option untuk membuka dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleActionMenu} // Hanya toggle menu saat tombol diklik
              className="flex items-center justify-center p-3 px-6 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              <span>Option</span>
              {actionMenuVisible ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
            {/* Dropdown */}
            {actionMenuVisible && (
              <div className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div
                  className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100"
                  onClick={openAddCoreValueModal}
                >
                  Add Core Value
                </div>
                <div
                  className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-100"
                  onClick={openLoadFromLibraryModal}
                >
                  Load from Library
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabel Core Value */}
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-[1200px] lg:min-w-full border-collapse">
          <thead>
            <tr className="bg-[#0C3F8B] text-white">
              <th className="w-1/3 px-6 py-3 text-left rounded-tl-lg rounded-bl-lg">Name</th>
              <th className="w-3/4 px-6 py-3 text-left">Dimension</th>
              <th className="w-1/3 px-6 py-3 text-left rounded-tr-lg rounded-br-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoreValues.length > 0 ? (
              filteredCoreValues.map((coreValue, index) => (
                <tr key={index} className="transition-colors border-b hover:bg-gray-100">
                  <td className="px-6 py-3">{coreValue.name}</td>
                  <td className="px-6 py-3">{coreValue.dimension}</td>
                  <td className="flex items-center px-6 py-3 space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                      onClick={() => openEditCoreValueModal(coreValue)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
                      </svg>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      onClick={() => openDeleteModal(coreValue)}
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
                <td colSpan="3" className="py-3 text-center">No matching records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
