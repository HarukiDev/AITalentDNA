import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import Logo from "../assets/logo.svg";

export default function Navbar() {
  const isLargeScreen = useMediaQuery("(max-width: 768px)");
  const [dropdownOpen, setDropdownOpen] = useState(false); // Untuk dropdown menu
  const [currentSection, setCurrentSection] = useState(""); // Untuk menentukan section aktif
  const sections = ["getStarted", "whyUs", "qnA", "testimonial"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // Section dianggap aktif saat 30% terlihat
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect(); // Cleanup observer saat komponen unmount
  }, []);

  return (
    <div>
      {isLargeScreen ? (
        <header className="fixed z-50 flex items-center justify-between w-screen px-6 pt-3">
          {/* Logo */}
          <div className="w-[120px]">
            <a href="#getStarted">
              <img className="w-full h-full bg-cover" src={Logo} alt="Logo" />
            </a>
          </div>

          {/* Dropdown Menu */}
          <div className="relative">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center justify-center btn btn-ghost btn-circle"
                onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown
              >
                {!dropdownOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                ) : (
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>

              {/* Dropdown List */}
              {dropdownOpen && (
                <ul className="absolute right-0 z-50 flex flex-col items-center justify-center w-screen gap-3 py-4 mt-3 bg-white rounded-lg shadow-md px-9 menu menu-sm md:menu-md md:w-72">
                  <li
                    className={`cursor-pointer ${
                      currentSection === "getStarted" ? "text-blue-700" : ""
                    }`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <a href="#getStarted">Home</a>
                  </li>
                  <li
                    className={`cursor-pointer ${
                      currentSection === "whyUs" ? "text-blue-700" : ""
                    }`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <a href="#whyUs">Why Us</a>
                  </li>
                  <li
                    className={`cursor-pointer ${
                      currentSection === "qnA" ? "text-blue-700" : ""
                    }`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <a href="#qnA">QnA</a>
                  </li>
                  <li
                    className={`cursor-pointer ${
                      currentSection === "testimonial" ? "text-blue-700" : ""
                    }`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <a href="#testimonial">Testimonial</a>
                  </li>
                  <div className="flex justify-center gap-2 mt-3">
                    <div className="border border-[#536CE3] p-2 w-[80px] h-[40px] rounded-2xl text-center">
                      <a href="">Login</a>
                    </div>
                    <div className="bg-[#536CE3] rounded-2xl w-[80px] h-[40px] p-2 text-white text-center">
                      <a href="">Sign Up</a>
                    </div>
                  </div>
                </ul>
              )}
            </div>
          </div>
        </header>
      ) : (
        <header className="fixed flex top-0 right-0 left-0 items-center z-50 mt-12 lg:mt-8 xl:mt-10 rounded-[20px] lg:rounded-[30px] px-4 justify-around bg-white mx-[4%] lg:mx-[6%] xl:mx-[8%] shadow-md h-[50px]">
          {/* Logo */}
          <div className="flex items-center gap-14">
            <div className="w-[100px] lg:w-[120px]">
              <img className="w-full h-full bg-cover" src={Logo} alt="Logo" />
            </div>
            {/* Menu Navigation */}
            <div className="flex gap-4 text-base lg:gap-6 xl:gap-8 lg:text-lg xl:text-xl">
              <a
                href="#getStarted"
                className={`${
                  currentSection === "getStarted" ? "text-blue-700" : ""
                }`}
              >
                Home
              </a>
              <a
                href="#whyUs"
                className={`${
                  currentSection === "whyUs" ? "text-blue-700" : ""
                }`}
              >
                Why Us
              </a>
              <a
                href="#qnA"
                className={`${
                  currentSection === "qnA" ? "text-blue-700" : ""
                }`}
              >
                QnA
              </a>
              <a
                href="#testimonial"
                className={`${
                  currentSection === "testimonial" ? "text-blue-700" : ""
                }`}
              >
                Testimonial
              </a>
            </div>
          </div>
          {/* Login and Sign Up */}
          <div className="flex gap-4 text-sm leading-tight text-center lg:gap-5 lg:text-lg">
            <div className="border border-[#536CE3] flex items-center justify-center p-2 w-[80px] lg:w-[100px] xl:w-[120px] h-[40px] rounded-2xl">
              <a href="/Loginpage">Login</a>
            </div>
            <div className="bg-[#536CE3] flex items-center justify-center rounded-2xl p-2 w-[80px] lg:w-[100px] xl:w-[120px] h-[40px] text-white">
              <a href="">Sign Up</a>
            </div>
          </div>
        </header>
      )}
    </div>
  );
}
