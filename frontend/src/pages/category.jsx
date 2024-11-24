import React, { useState } from 'react';

const categorys = [
    {
        category: 'Category1',
    },
    // Tambahkan Category lainnya sesuai kebutuhan
];

const CategoryTable = () => {
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);



    const openAddCategoryModal = () => {
        setIsAddCategoryModalOpen(true);
        setActionMenuVisible(false);
    };

    const closeAddCategoryModal = () => {
        setIsAddCategoryModalOpen(false);
    };

    const openEditCategoryModal = () => {
        setIsEditCategoryModalOpen(true);
        setActionMenuVisible(false);
    };

    const closeEditCategoryModal = () => {
        setIsEditCategoryModalOpen(false);
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
                        <a href="/employee" className="text-blue-500">Employee</a>
                        <a href="/jobrole" className="text-gray-700">Job Role</a>
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
                        <a href="/employee" className="text-gray-500 py-2">Employee</a>
                        <a href="/candidate" className="text-gray-700 py-2">Candidate</a>
                        <a href="/category" className="text-blue-700 py-2">Category</a>
                    </div>
                    <div className="py-2 text-gray-500">Employee/Category</div>
                </div>
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h2 className="text-[30px] font-semibold">Category</h2>
                        <p className="mb-4">Categorize employees by their division or business unit for efficient talent management</p>
                    </div>
                    <div className="flex space-x-2">
                        <div className="relative w-80">
                            <input type="text" placeholder="Search Category" className="p-3 pl-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm6 6h.01M16 16l3.5 3.5" />
                            </svg>
                        </div>
                        <div className="relative">
                            <button className="p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors px-6" onClick={openAddCategoryModal}>
                                <span>Add Category</span>
                            </button>
                        </div>

                    </div>
                </div>

                {/* table */}
                <table className="min-w-full border-collapse rounded-lg overflow-hidden ">
  <thead>
    <tr className="bg-[#0C3F8B] text-white">
      <th className="py-4 px-6 text-left font-semibold">Category</th>
      <th className="py-4 px-6 text-left font-semibold">Action</th>
    </tr>
  </thead>
  <tbody>
    {categorys.map((candidate, index) => (
      <tr
        key={index}
        className="border-b hover:bg-gray-100 transition-colors group"
      >
        <td className="py-4 px-6 text-gray-800">{candidate.category}</td>
        <td className="py-4 px-6">
          <div className="flex justify-start space-x-4">
            {/* Edit Button */}
            <button
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
              aria-label="Edit"
              onClick={openEditCategoryModal}
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
            {/* Delete Button */}
            <button
              className="text-red-500 hover:text-red-700 focus:outline-none"
              aria-label="Delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>


                {isAddCategoryModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Add Category</h2>
                            <form>
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="categoryName">Category Name</label>
                                    <input
                                        type="text"
                                        id="categoryName"
                                        placeholder="Enter category name"
                                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                                {/* Tombol Aksi */}
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={closeAddCategoryModal}
                                        className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-all"
                                    >
                                        Add Category
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isEditCategoryModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Update Category</h2>
                            <form>
                                {/* Input Nama Kategori */}
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="categoryName">Category Name</label>
                                    <input
                                        type="text"
                                        id="categoryName"
                                        placeholder="Enter category name"
                                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                                {/* Tombol Aksi */}
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={closeEditCategoryModal}
                                        className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-all"
                                    >
                                        Update Category
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

export default CategoryTable;
