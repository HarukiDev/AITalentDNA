import React, { useEffect, useState } from "react";
import FindByNamePage from "../pageSection/findpage/searchsection";
import FindByTalentDNAPage from "../pageSection/findpage/TalentDNASection";
import NavbarDashboard from "../pageSection/navBarDashboard";

const FindPage = () => {
  const [activeSection, setActiveSection] = useState("findByName");

  // Set section aktif berdasarkan query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const section = queryParams.get("section");

    if (section === "findByTalentDNA" || section === "findByName") {
      setActiveSection(section);
    }
  }, []);

  const handleSectionChange = (section) => {
    // Update URL tanpa reload halaman
    window.history.pushState({}, "", `?section=${section}`);
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "findByName":
        return <FindByNamePage />;
      case "findByTalentDNA":
        return <FindByTalentDNAPage />;
      default:
        return <FindByNamePage />;
    }
  };

  return (
    <div>
      {/* Kontainer Konten */}
      <div className="px-[12%] h-full py-32 relative">
        {/* Tombol Kembali */}
        <a
          href="/dashboard"
          className="absolute flex items-center text-gray-700 top-10 left-10 hover:text-blue-700"
        >
          <img
            src="https://img.icons8.com/?size=100&id=40217&format=png&color=1D4ED8"
            alt="Back"
            className="w-6 h-6 mr-2"
          />
          Back
        </a>

        {/* Navigasi Tab */}
        <div className="flex flex-col items-center justify-between mb-4 border-b md:flex-row">
          <div className="flex justify-around w-full mb-4 md:w-auto md:justify-start md:mb-0">
            <button
              onClick={() => handleSectionChange("findByName")}
              className={`py-2 px-4 rounded ${
                activeSection === "findByName"
                  ? "text-blue-500 border-b-2 border-blue-500" 
                  : "text-gray-700"
              }`}
            >
              Find By Name
            </button>
            <button
              onClick={() => handleSectionChange("findByTalentDNA")}
              className={`py-2 px-4 rounded ${
                activeSection === "findByTalentDNA"
                  ? "text-blue-500 border-b-2 border-blue-500" 
                  : "text-gray-700"
              }`}
            >
              Find By TalentDNA
            </button>
          </div>
          {/* Conditional rendering for text */}
          <div className="py-2 text-sm text-center text-gray-500 transition-all duration-300 ease-in-out md:text-right ">
              {activeSection === 'findByName' ? 'Matching by Fit/find By Name' : 'Matching by Fit/find By Talent DNA'}
          </div>
        </div>
        

        {/* Konten Berdasarkan Tab Aktif */}
        <div className="p-4 bg-white rounded-lg shadow">{renderSection()}</div>
      </div>
    </div>
  );
};

export default FindPage;