import React, { useState, useEffect } from "react";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [newCategory, setNewCategory] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");
  const [currentCategory, setCurrentCategory] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Dummy category data (replace with actual data fetching logic)
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = [
        { id: '1', name: 'Category 1' },
        { id: '2', name: 'Category 2' },
        { id: '3', name: 'Category 3' },
        { id: '4', name: 'Category 4' },
        { id: '5', name: 'Category 5' },
        { id: '6', name: 'Category 6' },
        { id: '7', name: 'Category 7' },
        { id: '8', name: 'Category 8' },
        { id: '9', name: 'Category 9' },
        { id: '10', name: 'Category 10' },
      ];
      setCategories(fetchedCategories);
      setFilteredCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  // Filter categories based on search query
  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, categories]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page
  };

  // Modal Handlers
  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const openEditModal = (category) => {
    setCurrentCategory(category);
    setEditCategoryName(category.name);
    setEditModalOpen(true);
  };
  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // Category Operations
  const addCategory = () => {
    if (newCategory) {
      const newCategoryData = { id: Date.now().toString(), name: newCategory };
      const updatedCategories = [...categories, newCategoryData];
      setCategories(updatedCategories);
      setFilteredCategories(updatedCategories);
      setNewCategory("");
      closeAddModal();
    }
  };

  const saveEditCategory = () => {
    const updatedCategories = categories.map((category) =>
      category.id === currentCategory.id
        ? { ...category, name: editCategoryName }
        : category
    );
    setCategories(updatedCategories);
    setFilteredCategories(updatedCategories);
    closeEditModal();
  };

  const deleteCategory = () => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryToDelete.id
    );
    setCategories(updatedCategories);
    setFilteredCategories(updatedCategories);
    closeDeleteModal();
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-between mb-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Category</h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Categorize employees by their division or business unit for efficient talent management
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 md:justify-end">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search Category"
              className="w-full p-3 pl-10 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            onClick={openAddModal}
            className="p-3 px-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>
      </div>

      <div className="overflow-hidden bg-white border rounded-lg shadow-lg">
        <table className="min-w-full text-left border-collapse">
          <thead style={{ backgroundColor: "#0C3F8B" }} className="text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((category) => (
                <tr key={category.id} className="hover:bg-gray-100">
                  <td className="p-3">{category.name}</td>
                  <td className="flex justify-center p-3 space-x-4 text-center">
                        <button
                          className="text-blue-500 hover:text-blue-700 focus:outline-none"
                          onClick={() => openEditModal(category)}
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
                          onClick={() => openDeleteModal(category)}
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
                <td colSpan="2" className="py-3 italic text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between p-4">
          <div>
            <label htmlFor="itemsPerPage" className="mr-2 text-sm">
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="p-2 text-sm border rounded"
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } px-3 py-2 rounded`}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } px-3 py-2 rounded`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
            <button
              onClick={closeAddModal}
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="mb-4 text-xl font-semibold">Add Category</h3>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              placeholder="Enter category name"
            />
            <div className="flex justify-between">
              <button
                onClick={closeAddModal}
                className="px-4 py-2 text-white bg-gray-400 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addCategory}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
            <button
              onClick={closeEditModal}
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="mb-4 text-xl font-semibold">Edit Category</h3>
            <input
              type="text"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              placeholder="Enter category name"
            />
            <div className="flex justify-between">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 text-white bg-gray-400 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveEditCategory}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
            <button
              onClick={closeDeleteModal}
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="mb-4 text-xl font-semibold">Delete Category</h3>
            <p className="mb-6">Are you sure you want to delete the category <strong>{categoryToDelete?.name}</strong>?</p>
            <div className="flex justify-between">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 text-white bg-gray-400 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={deleteCategory}
                className="px-4 py-2 text-white bg-red-600 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryComponent;
