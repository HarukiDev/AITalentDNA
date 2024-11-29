import React, { useState } from "react";

const categorys = [
	{
		category: "Category1",
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
		<div className="p-5 px-12 font-sans">
			<header className="flex items-center justify-between mb-12">
				{/* Logo and Navigation */}
				<div className="flex items-center space-x-8">
					<div className="flex items-center">
						<img
							src="https://backend.talentdna.me/img/logo.png"
							alt="Talent Finder Logo"
							className="mr-2"
							style={{ width: "170px" }}
						/>
					</div>
					<nav className="flex space-x-4">
						<a href="/" className="text-gray-700">
							Home
						</a>
						<a href="/employee" className="text-blue-500">
							Employee
						</a>
						<a href="/jobrole" className="text-gray-700">
							Job Role
						</a>
						<a href="/corevalue" className="text-gray-700">
							Core Value
						</a>
					</nav>
				</div>
				{/* Login and Sign In Buttons */}
				<div className="flex space-x-2">
					<button className="px-4 py-2 text-blue-500 border border-blue-500 rounded-full">
						Login
					</button>
					<button className="bg-[#536CE3] text-white px-4 py-2 rounded-full">
						Sign In
					</button>
				</div>
			</header>

			<main>
				<div className="flex items-center justify-between mb-4 border-b">
					<div className="flex space-x-4">
						<a href="/employee" className="py-2 text-gray-500">
							Employee
						</a>
						<a href="/candidate" className="py-2 text-gray-700">
							Candidate
						</a>
						<a href="/category" className="py-2 text-blue-700">
							Category
						</a>
					</div>
					<div className="py-2 text-gray-500">Employee/Category</div>
				</div>
				<div className="flex items-center justify-between mb-5">
					<div>
						<h2 className="text-[30px] font-semibold">Category</h2>
						<p className="mb-4">
							Categorize employees by their division or business unit for
							efficient talent management
						</p>
					</div>
					<div className="flex space-x-2">
						<div className="relative w-80">
							<input
								type="text"
								placeholder="Search Category"
								className="w-full p-3 pl-10 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
						<div className="relative">
							<button
								className="flex items-center justify-center p-3 px-6 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
								onClick={openAddCategoryModal}
							>
								<span>Add Category</span>
							</button>
						</div>
					</div>
				</div>

				{/* table */}
				<table className="min-w-full overflow-hidden border-collapse rounded-lg ">
					<thead>
						<tr className="bg-[#0C3F8B] text-white">
							<th className="px-6 py-4 font-semibold text-left">Category</th>
							<th className="px-6 py-4 font-semibold text-left">Action</th>
						</tr>
					</thead>
					<tbody>
						{categorys.map((candidate, index) => (
							<tr
								key={index}
								className="transition-colors border-b hover:bg-gray-100 group"
							>
								<td className="px-6 py-4 text-gray-800">
									{candidate.category}
								</td>
								<td className="px-6 py-4">
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
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
						<div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-2xl">
							<h2 className="pb-3 mb-6 text-2xl font-bold text-gray-800 border-b">
								Add Category
							</h2>
							<form>
								<div className="mb-6">
									<label
										className="block mb-2 font-medium text-gray-700"
										htmlFor="categoryName"
									>
										Category Name
									</label>
									<input
										type="text"
										id="categoryName"
										placeholder="Enter category name"
										className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
								{/* Tombol Aksi */}
								<div className="flex justify-end space-x-4">
									<button
										type="button"
										onClick={closeAddCategoryModal}
										className="px-6 py-2 font-semibold text-white transition-all bg-gray-500 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="px-6 py-2 font-semibold text-white transition-all bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
									>
										Add Category
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

				{isEditCategoryModalOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
						<div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-2xl">
							<h2 className="pb-3 mb-6 text-2xl font-bold text-gray-800 border-b">
								Update Category
							</h2>
							<form>
								{/* Input Nama Kategori */}
								<div className="mb-6">
									<label
										className="block mb-2 font-medium text-gray-700"
										htmlFor="categoryName"
									>
										Category Name
									</label>
									<input
										type="text"
										id="categoryName"
										placeholder="Enter category name"
										className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
								{/* Tombol Aksi */}
								<div className="flex justify-end space-x-4">
									<button
										type="button"
										onClick={closeEditCategoryModal}
										className="px-6 py-2 font-semibold text-white transition-all bg-gray-500 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="px-6 py-2 font-semibold text-white transition-all bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
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
