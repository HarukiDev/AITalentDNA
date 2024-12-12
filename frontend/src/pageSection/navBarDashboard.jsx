import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import Logo from "../assets/logo.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBarDashboard() {
  const isLargeScreen = useMediaQuery("(max-width: 768px)");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk hamburger menu
  const employeeRef = useRef(null);
  const jobRoleRef = useRef(null);
  const coreValueRef = useRef(null);
  const [activeLink, setActiveLink] = useState(window.location.pathname); 

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Ambil data pengguna dari localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = '/LoginPage';
    }
  }, []);
  
  // Menangani klik di luar dropdown untuk menutup dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (employeeRef.current && !employeeRef.current.contains(event.target)) &&
        (jobRoleRef.current && !jobRoleRef.current.contains(event.target)) &&
        (coreValueRef.current && !coreValueRef.current.contains(event.target)) &&
        !event.target.closest('.hamburger')
      ) {
        setActiveDropdown(null); 
        setIsMenuOpen(false); 
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  // Update active link ketika URL berubah
  useEffect(() => {
    const handleLocationChange = () => {
      setActiveLink(window.location.pathname);
    };
  
    window.addEventListener('popstate', handleLocationChange);
  
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);
  
  // Fungsi untuk memeriksa apakah link saat ini aktif
  const isActive = (path) => {
    return activeLink === path ? 'text-blue-700' : 'text-gray-700'; 
  };
  
  // Toggle dropdown yang aktif
  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prevState) => (prevState === dropdownName ? null : dropdownName));
  };
  
  // Toggle hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
      {isLargeScreen ? (
        // Jika layar kecil (Mobile)
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-6 py-3 bg-white shadow-md">
          {/* Logo */}
          <div className="w-[120px]">
            <a href="/dashboard">
              <img className="w-full h-full bg-cover" src={Logo} alt="Logo" />
            </a>
          </div>

          {/* Hamburger Button */}
          <div className="relative">
            <button
              className="flex items-center justify-center p-2 btn btn-ghost btn-circle hamburger"
              onClick={toggleMenu}
            >
              {!isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="absolute right-0 z-50 px-6 py-4 mt-3 bg-white rounded-lg shadow-md w-[300px] md:w-72"
                  style={{ position: 'absolute', zIndex: 999 }}
                  onClick={(e) => e.stopPropagation()} // Stop propagation
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex flex-col gap-4">
                    {/* Home Link */}
                    <a
                      href="/dashboard"
                      className={`px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 ${isActive('/dashboard')}`}
                    >
                      Home
                    </a>

                    {/* Employee Dropdown */}
                    <div ref={employeeRef}>
                      <button
                        className={`flex items-center justify-between w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100} ${isActive('/employee')}`}
                        onClick={() => toggleDropdown('employee')}
                      >
                        Employee
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {activeDropdown === 'employee' && (
                          <motion.ul
                            className="pl-4 mt-2 space-y-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <li>
                              <a href="/employee#ExistingEmployee" className="block px-4 py-2 text-gray-600">
                                Existing Employee
                              </a>
                            </li>
                            <li>
                              <a href="/employee#NewCandidate" className="block px-4 py-2 text-gray-600">
                                New Candidate
                              </a>
                            </li>
                            <li>
                              <a href="/employee#Category" className="block px-4 py-2 text-gray-600">
                                Category
                              </a>
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Job Role Dropdown */}
                    <div ref={jobRoleRef}>
                      <button
                        className={`flex items-center justify-between w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100} ${isActive('/jobRole')}`}
                        onClick={() => toggleDropdown('jobRole')}
                      >
                        Job Role
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {activeDropdown === 'jobRole' && (
                          <motion.ul
                            className="pl-4 mt-2 space-y-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <li>
                              <a href="/jobRole#JobRole" className="block px-4 py-2 text-gray-600">
                                Job Role 
                              </a>
                            </li>
                            <li>
                              <a href="/jobRole#Competency" className="block px-4 py-2 text-gray-600">
                                Competency
                              </a>
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Core Value Dropdown */}
                    <div ref={coreValueRef}>
                      <button
                        className={`flex items-center justify-between w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100} ${isActive('/coreValue')}`}
                        onClick={() => toggleDropdown('coreValue')}
                      >
                        Core Value
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {activeDropdown === 'coreValue' && (
                          <motion.ul
                            className="pl-4 mt-2 space-y-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <li>
                              <a href="/coreValue#corevalue" className="block px-4 py-2 text-gray-600">
                                Core Value
                              </a>
                            </li>
                            <li>
                              <a href="/coreValue#dimension" className="block px-4 py-2 text-gray-600">
                                Dimensions
                              </a>
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-4">
                      {user ? (
                        <a href="/UserProfile" className="flex items-center gap-4">
                          <div className="w-10 h-10">
                            <img
                              src={user.profileImage || "https://static.wikitide.net/hoyodexwiki/9/92/Elysia_%28B3-MU-0%29.png"}
                              alt="Profile"
                              className="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-start">
                            <div>
                              <h1 className="font-semibold">{user.username}</h1>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </a>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>
      ) : (
        // Jika layar besar (Desktop)
        <header className="fixed flex top-0 right-0 left-0 items-center z-50 mt-12 lg:mt-8 xl:mt-10 rounded-[20px] lg:rounded-[30px] px-4 justify-around bg-white mx-[4%] lg:mx-[6%] xl:mx-[8%] shadow-md h-[50px] md:text-sm lg:text-base">
        {/* Logo */}
        <div className="w-[120px]">
          <a href="/dashboard">
            <img className="w-full h-full bg-cover" src={Logo} alt="Logo" />
          </a>
        </div>
  
        {/* Menu Navigation */}
        <div className="flex gap-3 lg:gap-8">
          <a href="/dashboard" className={`text-sm lg:text-base ${isActive('/dashboard')}`}>Home</a>
  
          {/* Dropdown for Employee */}
          <div ref={employeeRef} className="relative">
            <div
              className={`flex items-center cursor-pointer ${isActive('/employee')}`}
              onClick={() => toggleDropdown('employee')}
            >
              Employee
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <AnimatePresence>
              {activeDropdown === 'employee' && (
                <motion.ul
                  className="absolute left-0 w-40 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <li><a href="/employee#ExistingEmployee" className="block px-4 py-2">Existing Employee</a></li>
                  <li><a href="/employee#NewCandidate" className="block px-4 py-2">New Candidate</a></li>
                  <li><a href="/employee#Category" className="block px-4 py-2">Category</a></li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
  
          {/* Dropdown for Job Role */}
          <div ref={jobRoleRef} className="relative">
            <div
              className={`flex items-center cursor-pointer ${isActive('/jobRole')}`}
              onClick={() => toggleDropdown('jobRole')}
            >
              Job Role
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <AnimatePresence>
              {activeDropdown === 'jobRole' && (
                <motion.ul
                  className="absolute left-0 w-40 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <li><a href="/jobRole#JobRole" className="block px-4 py-2">Job Role</a></li>
                  <li><a href="/jobRole#Competency" className="block px-4 py-2">Competency</a></li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
  
          {/* Dropdown for Core Value */}
          <div ref={coreValueRef} className="relative">
            <div
              className={`flex items-center cursor-pointer ${isActive('/coreValue')}`}
              onClick={() => toggleDropdown('coreValue')}
            >
              Core Value
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <AnimatePresence>
              {activeDropdown === 'coreValue' && (
                <motion.ul
                  className="absolute left-0 w-40 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <li><a href="/coreValue#corevalue" className="block px-4 py-2">Core Value</a></li>
                  <li><a href="/coreValue#dimension" className="block px-4 py-2">Dimensions</a></li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
  
        {/* User Profile */}
        <div className="flex items-center gap-4">
          {user ? (
            <a href="/UserProfile" className="flex items-center gap-4">
              <div className="w-10 h-10">
                <img
                  src={user.profileImage || "https://static.wikitide.net/hoyodexwiki/9/92/Elysia_%28B3-MU-0%29.png"}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <div className="flex flex-col items-start justify-start">
                <div>
                  <h1 className="font-semibold">{user.username}</h1>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </a>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </header>
      )}
    </div>
  );
}
