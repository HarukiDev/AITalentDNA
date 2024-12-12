import React, { useState, useEffect } from "react";
import Jobfit from "../pageSection/jobFit/jobFit";
import CultureFit from "../pageSection/jobFit/cultureFit";

const JobFitPage = () => {
  const [activeTab, setActiveTab] = useState("jobfit");

  // Set tab aktif berdasarkan query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const section = queryParams.get("section");

    if (section === "jobfit" || section === "culturefit") {
      setActiveTab(section);
    }
  }, []);

  const handleTabChange = (section) => {
    // Update URL tanpa reload halaman
    window.history.pushState({}, "", `?section=${section}`);
    setActiveTab(section);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "jobfit":
        return <Jobfit />;
      case "culturefit":
        return <CultureFit />;
      default:
        return <Jobfit />;
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
            <div className="flex justify-around w-full mb-4 md:justify-start md:mb-0">
            <a
              href="/jobfit?section=jobfit"
              onClick={(e) => {
                e.preventDefault(); // Hindari reload halaman
                handleTabChange("jobfit");
              }}
              className={`py-2 px-4 rounded ${
                activeTab === "jobfit"
                  ? "text-blue-500 border-b-2 border-blue-500" 
                  : "text-gray-700"
              }`}
            >
              Job Fit
            </a>
            <a
              href="/jobfit?section=culturefit"
              onClick={(e) => {
                e.preventDefault(); // Hindari reload halaman
                handleTabChange("culturefit");
              }}
              className={`py-2 px-4 rounded ${
                activeTab === "culturefit"
                  ? "text-blue-500 border-b-2 border-blue-500" 
                  : "text-gray-700"
              }`}
            >
              Culture Fit
            </a>
          </div>
          {/* Conditional rendering for text */}
          <div className="w-full py-2 text-sm text-center text-gray-500 transition-all duration-300 ease-in-out md:text-right">
              {activeTab === 'jobfit' ? 'Matching By Fit/job fit' : 'Matching by Fit/culture fit'}
          </div>
        </div>

        {/* Konten Berdasarkan Tab Aktif */}
        <div className="p-4 bg-white rounded-lg shadow">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default JobFitPage;
