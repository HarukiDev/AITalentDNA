import React, { useState, useEffect } from 'react';

const CategoryComponent = () => {
  const [filteredCategorys, setFilteredCategorys] = useState([]); // Menyimpan kategori
  const [searchTerm, setSearchTerm] = useState(''); // Menyimpan kata kunci pencarian
  const [modalOpen, setModalOpen] = useState(false); // Menyimpan status modal (terbuka/tutup)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Menyimpan status modal konfirmasi hapus
  const [addModalOpen, setAddModalOpen] = useState(false); // Menyimpan status modal tambah kategori
  const [editModalOpen, setEditModalOpen] = useState(false); // Menyimpan status modal edit kategori
  const [currentCategory, setCurrentCategory] = useState({ name: '' }); // Menyimpan kategori yang sedang diedit
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Menyimpan kategori yang akan dihapus
  const [newCategory, setNewCategory] = useState(''); // Menyimpan nama kategori baru
  const [editCategoryName, setEditCategoryName] = useState(''); // Menyimpan nama kategori yang sedang diedit

  // Data kategori dummy (contoh)
  const dummyCategory = { name: 'Category 1' };

  // Fungsi untuk membuka modal konfirmasi hapus
  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  // Fungsi untuk menutup modal konfirmasi hapus
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  // Fungsi untuk menghapus kategori
  const deleteCategory = () => {
    const updatedCategories = filteredCategorys.filter(
      (category) => category.name !== categoryToDelete.name
    );
    setFilteredCategorys(updatedCategories);
    closeDeleteModal();
  };

  // Fungsi untuk membuka modal tambah kategori
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  // Fungsi untuk menutup modal tambah kategori
  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  // Fungsi untuk membuka modal edit kategori
  const openEditModal = (category) => {
    setCurrentCategory(category);
    setEditCategoryName(category.name); // Set name kategori yang akan diedit
    setEditModalOpen(true);
  };

  // Fungsi untuk menutup modal edit kategori
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditCategoryName('');
  };

  // Fungsi untuk menangani pencarian
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = filteredCategorys.filter((category) =>
      category.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCategorys(filtered);
  };

  // Fungsi untuk menambah kategori baru
  const addCategory = () => {
    if (newCategory) {
      const updatedCategories = [...filteredCategorys, { name: newCategory }];
      setFilteredCategorys(updatedCategories);
      setNewCategory('');
      closeAddModal();
    }
  };

  // Fungsi untuk menyimpan perubahan pada kategori yang diedit
  const saveEditCategory = () => {
    const updatedCategories = filteredCategorys.map((category) =>
      category.name === currentCategory.name
        ? { ...category, name: editCategoryName }
        : category
    );
    setFilteredCategorys(updatedCategories);
    closeEditModal();
  };

  // Simulasi data kategori (dari data dummy)
  useEffect(() => {
    setFilteredCategorys([dummyCategory]); // Menambahkan data kategori dummy ke dalam state
  }, []);

  return (
    <div id="category">
      <div className="flex flex-col items-center justify-between mb-5 md:flex-row">
        <div>
          <h2 className="text-[30px] font-semibold">Category</h2>
          <p className="mb-4">Categorize employees by their division or business unit for efficient talent management</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search Candidate"
              className="w-full p-3 pl-10 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
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
          {/* Button untuk membuka modal Add Category */}
          <div className="relative">
            <button
              className="flex items-center justify-center p-3 px-6 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={openAddModal}
            >
              <span>Add Category</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabel Kategori */}
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-[1200px] lg:min-w-full border-collapse">
          <thead>
            <tr className="bg-[#0C3F8B] text-white">
              <th className="w-1/3 px-6 py-3 text-left rounded-tl-lg rounded-bl-lg">Name</th>
              <th className="w-1/3 px-6 py-3 text-left rounded-tr-lg rounded-br-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategorys.length > 0 ? (
              filteredCategorys.map((category, index) => (
                <tr key={index} className="transition-colors border-b hover:bg-gray-100">
                  <td className="px-6 py-3">{category.name}</td>
                  <td className="flex items-center px-6 py-3 space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                      onClick={() => openEditModal(category)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
                      </svg>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      onClick={() => openDeleteModal(category)}
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

      {/* Modal Konfirmasi Hapus */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-2xl">
            <button
              onClick={closeDeleteModal}
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center justify-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-red-500 w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-2-2m0 0l-2-2m2 2H9m10 0l-1 12a2 2 0 01-2 2H6a2 2 0 01-2-2L3 7M7 7h10M10 11v6M14 11v6" />
              </svg>
              <h3 className="mb-4 text-xl font-semibold text-gray-800">Delete Category</h3>
              <p className="mb-6 text-gray-600">Are you sure you want to delete the category <strong>{categoryToDelete?.name}</strong>?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={closeDeleteModal}
                  className="px-6 py-2 text-white bg-gray-400 rounded-full hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteCategory}
                  className="px-6 py-2 text-white bg-red-600 rounded-full hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Category */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-2xl">
            <button
              onClick={closeAddModal}
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center justify-center text-center">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">Add Category</h3>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="mb-4 px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter category name"
              />
              <div className="flex justify-center space-x-4">
                <button
                  onClick={closeAddModal}
                  className="px-6 py-2 text-white bg-gray-400 rounded-full hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={addCategory}
                  className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Category */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-2xl">
            <button
              onClick={closeEditModal}
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center justify-center text-center">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">Edit Category</h3>
              <input
                type="text"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                className="mb-4 px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Edit category name"
              />
              <div className="flex justify-center space-x-4">
                <button
                  onClick={closeEditModal}
                  className="px-6 py-2 text-white bg-gray-400 rounded-full hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditCategory}
                  className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
                >
                  Save
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryComponent;
