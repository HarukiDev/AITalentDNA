import React, { useState } from 'react';

const competencyJob = [
  {
    competencyName: 'Dokter Umum',
    Level: '2',
    competencyDesc: 'Dokter Umum',
    competencyIndicator: 'Dokter Umum',
  },
  {
    competencyName: 'Dokter Umum',
    Level: '2',
    competencyDesc: 'Dokter Umum',
    competencyIndicator: 'Dokter Umum',
  },
  {
    competencyName: 'Dokter Umum',
    Level: '2',
    competencyDesc: 'Dokter Umum',
    competencyIndicator: 'Dokter Umum',
  },
];

const CompetencyTable = () => {
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [isAddCompetencyModalOpen, setIsAddCompetencyModalOpen] = useState(false);
  const [isEditCompetencyModalOpen, setIsEditCompetencyModalOpen] = useState(false);
  const [isImportCSVModalOpen, setIsImportCSVModalOpen] = useState(false);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
const [competencyLibrary, setCompetencyLibrary] = useState([]);
const [selectedCompetency, setSelectedCompetency, setCompetencyName, setCompetencyDesc] = useState("");
const [searchTerm, setSearchTerm] = useState('');


  const toggleActionMenu = () => {
    setActionMenuVisible(!actionMenuVisible);
  };

  const openAddCompetencyModal = () => {
    setIsAddCompetencyModalOpen(true);
    setActionMenuVisible(false);
  };

  const closeAddCompetencyModal = () => {
    setIsAddCompetencyModalOpen(false);
  };

  const openEditCompetencyModal = () => {
    setIsEditCompetencyModalOpen(true);
    setActionMenuVisible(false);
  };

  const closeEditCompetencyModal = () => {
    setIsEditCompetencyModalOpen(false);
  };

  const openImportCSVModal = () => {
    setIsImportCSVModalOpen(true);
    setActionMenuVisible(false);
  };

  const closeImportCSVModal = () => {
    setIsImportCSVModalOpen(false);
  };

  const openLibraryModal = () => {
    // Anda bisa memuat data library kompetensi dari API di sini jika dibutuhkan
    setCompetencyLibrary([
      { name: "Adaptif", description: "Kemampuan untuk beradaptasi dengan perubahan." },
      { name: "Terampil", description: "Keahlian teknis dalam suatu bidang." },
      { name: "Disiplin", description: "Kemampuan untuk bekerja secara konsisten sesuai aturan." },
    ]);
    setIsLibraryModalOpen(true);
  };
  
  const closeLibraryModal = () => {
    setIsLibraryModalOpen(false);
  };
  
  const handleSelectCompetency = (selectedCompetency) => {
    if (!selectedCompetency) {
      console.error("Selected competency is invalid!");
      return;
    }
  
    // Update state dengan data dari competency yang dipilih
    setCompetencyName(selectedCompetency.name || ""); // Default ke string kosong jika null/undefined
    setCompetencyDesc(selectedCompetency.description || "");
    setSelectedCompetency(selectedCompetency); // Simpan kompetensi yang dipilih
  
    // Tutup modal library dan buka modal utama
    setIsLibraryModalOpen(false);
    setIsAddCompetencyModalOpen(true);

    setSelectedCompetency({
      name: item.name,
      description: item.description,
    });
  
    // Menutup modal library dan membuka modal add competency
    setIsLibraryModalOpen(false);
    setIsAddCompetencyModalOpen(true);
  };
  

const [isFormValid, setIsFormValid] = useState(true); // Untuk validasi form
const [categories, setCategories] = useState([
  { id: '1', name: 'Adaptif' },
  { id: '2', name: 'Terampil' },
  { id: '3', name: 'Disiplin' },
]); // Kategori statis, bisa diganti dengan data dari API

const [isToastVisible, setToastVisible] = useState(false); // Menampilkan toast setelah submit

// Validasi sebelum submit
const validateForm = () => {
  if (!selectedCompetency.name || !selectedCompetency.description) {
    setIsFormValid(false);
    return false;
  }
  setIsFormValid(true);
  return true;
};

// Fungsi untuk menambah kompetensi
const handleAddCompetency = (e) => {
  e.preventDefault();
  if (validateForm()) {
    // Simulasikan penyimpanan data (misalnya API)
    console.log("Competency Added", selectedCompetency);
    setToastVisible(true); // Menampilkan feedback
    setTimeout(() => setToastVisible(false), 3000); // Menyembunyikan toast setelah 3 detik
    setSelectedCompetency({ name: '', description: '', level: '', category: '1' }); // Reset form
  }

  // Validasi jika form valid
  if (isFormValid) {
    // Simpan competency ke state atau backend (sesuaikan dengan implementasi Anda)
    addCompetencyToList(selectedCompetency); // Fungsi Anda untuk menyimpan data

    // Reset form setelah submit
    setSelectedCompetency({ name: '', level: '', description: '', category: '' });

    // Tampilkan toast
    setIsToastVisible(true);

    // Tutup modal
    closeAddCompetencyModal();

    // Hilangkan toast setelah beberapa detik (opsional)
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000); // Toast akan hilang setelah 3 detik
  }
};


// Menangani perubahan dropdown kategori
const handleCategoryChange = (e) => {
  setSelectedCompetency({
    ...selectedCompetency,
    category: e.target.value,
  });
};

const validateInput = (field, value) => {
  // Regex untuk hanya menerima huruf dan spasi
  const onlyLettersRegex = /^[a-zA-Z\s]*$/;

  if (!value.trim()) {
    return 'This field is required.';
  }

  if (!onlyLettersRegex.test(value)) {
    return 'This field must contain only letters.';
  }

  return '';
};

const [errorName, setErrorName] = useState('');
const [errorDesc, setErrorDesc] = useState('');
  
  const downloadSample = () => {
    const csvData = competencyJob.map(competencyJob =>
      `${competencyJob.competencyName},${competencyJob.level},${competencyJob.competencyDesc},${competencyJob.competencyIndicator}`
    ).join('\n');

    const csvHeader = 'Competencyname, level, desc, indicator\n';
    const csvFile = new Blob([csvHeader + csvData], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(csvFile);
    downloadLink.download = 'competency_sample.csv';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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
            <a href="/jobroles" className="text-gray-700 py-2">Job Roles</a>
            <a href="/competency" className="text-blue-500 py-2">Competency</a>
          </div>
          <div className="py-2 text-gray-500">Competency/Job Roles</div>
        </div>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-[30px] font-semibold">Competency</h2>
            <p className="mb-4">⁠Specify the exact skills and abilities required for each job role to ensure alignment with performance expectations.</p>
          </div>
          <div className="flex space-x-2">
            <div className="relative w-80">
              <input type="text" placeholder="Search Competency" className="p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
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
                  <div className="py-2 px-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={openAddCompetencyModal}>
                    Add Competency
                  </div>
                  <div className="py-2 px-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={openImportCSVModal}>
                    Import CSV
                  </div>
                  <div className="py-2 px-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={downloadSample}>
                    Download Competency
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
              <th className="py-3 px-6 text-left">Competency Name</th>
              <th className="py-3 px-6 text-left">Level</th>
              <th className="py-3 px-6 text-left">Competency Desc</th>
              <th className="py-3 px-6 text-left">Competency Indicator</th>
              <th className="py-3 px-6 text-left rounded-tr-lg rounded-br-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {competencyJob.map((competencyJob, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-6">{competencyJob.competencyName}</td>
                <td className="py-3 px-6">{competencyJob.level}</td>
                <td className="py-3 px-6">{competencyJob.competencyDesc}</td>
                <td className="py-3 px-6">{competencyJob.competencyIndicator}</td>
                <td className="py-3 px-6 flex justify-around space-x-2">
                  <div className="flex justify-around space-x-2">
                    {/* Edit Button */}
                    <button className="text-blue-500 hover:text-blue-700 focus:outline-none" aria-label="Edit" onClick={openEditCompetencyModal}>
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

        {
  isAddCompetencyModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-3xl relative">
        {/* Load from Library Button - Top Right */}
        <button
          type="button"
          onClick={openLibraryModal}
          className="absolute top-6 right-6 px-5 py-2 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition-all"
        >
          Load from Library
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Add Competency</h2>
        <form onSubmit={handleAddCompetency}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Competency Name */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="competencyName"
              >
                Competency Name
              </label>
              <input
                type="text"
                id="competencyName"
                placeholder="Enter full name"
                value={selectedCompetency.name || ''}
                onChange={(e) => {
                  const regex = /^[A-Za-z\s]*$/; // Hanya huruf dan spasi
                  if (regex.test(e.target.value)) {
                    setErrorName(''); // Reset error jika valid
                    setSelectedCompetency({
                      ...selectedCompetency,
                      name: e.target.value,
                    });
                  } else {
                    setErrorName('Only letters are allowed'); // Tampilkan pesan error
                  }
                }}
                className={`p-3 border rounded-lg w-full focus:outline-none transition-all ${
                  errorName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errorName && (
                <p className="text-red-500 text-sm mt-1">{errorName}</p>
              )}
            </div>

            {/* Level */}
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="level">
                Level (Opsional)
              </label>
              <input
                type="number"
                id="level"
                placeholder="Enter Level"
                value={selectedCompetency.level || ''}
                onChange={(e) =>
                  setSelectedCompetency({
                    ...selectedCompetency,
                    level: e.target.value,
                  })
                }
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Competency Desc */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="competencyDesc">
              Competency Desc
            </label>
            <textarea
              id="competencyDesc"
              placeholder="Enter description"
              value={selectedCompetency.description || ''}
              onChange={(e) => {
                const regex = /^[A-Za-z\s]*$/; // Hanya huruf dan spasi
                if (regex.test(e.target.value)) {
                  setErrorDesc(''); // Reset error jika valid
                  setSelectedCompetency({
                    ...selectedCompetency,
                    description: e.target.value,
                  });
                } else {
                  setErrorDesc('Only letters are allowed'); // Tampilkan pesan error
                }
              }}
              className={`p-3 border rounded-lg w-full focus:outline-none transition-all ${
                errorDesc ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              rows="4"
            ></textarea>
            {errorDesc && (
              <p className="text-red-500 text-sm mt-1">{errorDesc}</p>
            )}
          </div>

          {/* Dropdown */}
          <div className="col-span-2 mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="kategori">
              Competency Indicator
            </label>
            <select
              id="kategori"
              value={selectedCompetency.category}
              onChange={handleCategoryChange}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={closeAddCompetencyModal}
              className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 font-semibold rounded-full shadow-md ${
                isFormValid
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-400 text-gray-700 cursor-not-allowed'
              } transition-all`}
              disabled={!isFormValid}
            >
              Add Competency
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

{/* Toast/Notification */}
{
  isToastVisible && (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md">
      <p>Competency Added Successfully!</p>
    </div>
  )
}

{/* Library Modal */}
{isLibraryModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-3xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Select Competency</h2>
      
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search competencies..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          value={searchTerm} // State untuk pencarian
          onChange={(e) => setSearchTerm(e.target.value)} // Update state saat mengetik
        />
      </div>

      {/* Kompetensi List */}
      <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
        {competencyLibrary
          .filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item, index) => (
            <div
              key={index}
              className="p-3 border rounded-lg shadow-sm hover:bg-blue-100 cursor-pointer transition-all"
            >
              <div className="flex justify-between items-center">
                <div
                  onClick={() => {
                    handleSelectCompetency(item); // Isi data otomatis
                    closeLibraryModal(); // Tutup modal library
                    openAddCompetencyModal(); // Buka modal Add Competency
                  }}
                  className="cursor-pointer"
                >
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                {/* Tombol Copy */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${item.name}: ${item.description}`);
                    // Set the competency data in Add Competency modal
                    setSelectedCompetency({
                      name: item.name,
                      description: item.description,
                    });
                  }}
                  className="ml-4 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-all"
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={closeLibraryModal}
          className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}



{isEditCompetencyModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-3xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Edit Competency</h2>
      <form>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Kolom Kiri */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="competencyName"
            >
              Competency Name
            </label>
            <input
              type="text"
              id="competencyName"
              placeholder="Enter full name"
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Level (Opsional)
            </label>
            <input
              type="number"
              id="level"
              placeholder="Enter Level"
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Kolom Kanan */}
          <div className="col-span-2">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="competencyDesc"
            >
              Competency Desc
            </label>
            <input
              type="text"
              id="competencyDesc"
              placeholder="Enter competency"
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Dropdown */}
          <div className="col-span-2">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="kategori"
            >
              Indikator
            </label>
            <select
              id="kategori"
              multiple
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-40 overflow-y-scroll"
            >
              <option value="1">
                Menyesuaikan diri dengan cepat ketika ada perubahan instruksi
              </option>
              <option value="2">Bersedia melakukan tugas mendadak</option>
              <option value="3">
                Tetap tenang dalam situasi yang berubah-ubah
              </option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={closeEditCompetencyModal}
            className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-full shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-all"
          >
            Update Competency
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

export default CompetencyTable;
