import React, { useState, useEffect } from 'react';

export default function TabsJobRole({ activeTab, setActiveTab }) {
  useEffect(() => {
    // Set the initial tab based on the URL hash when the component mounts
    const hash = window.location.hash;
    if (hash === '#JobRole') {
      setActiveTab('jobrole');
    } else if (hash === '#Competency') {
      setActiveTab('responsibility');
    }
  }, [setActiveTab]);

  // Handle tab click and update the URL hash
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    window.location.hash = `#${tab}`;
  };

  return (
    <div className="flex flex-col items-center justify-between mb-4 border-b md:flex-row">
      {/* Tab Buttons */}
      <div className="flex justify-around w-full mb-2 md:w-auto md:justify-start md:mb-0">
        <button
          onClick={() => handleTabClick('jobrole')}
          className={`py-2 px-4 rounded ${
            activeTab === 'jobrole' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'
          }`}
        >
          Job Role
        </button>
        <button
          onClick={() => handleTabClick('responsibility')}
          className={`py-2 px-4 rounded ${
            activeTab === 'responsibility' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'
          }`}
        >
          Competency
        </button>
      </div>

      {/* Conditional rendering for text */}
      <div className="py-2 text-sm text-center text-gray-500 transition-all duration-300 ease-in-out md:text-right">
        {activeTab === 'jobrole' ? 'Job Role/home' : 'Job Role/competency'}
      </div>
    </div>
  );
}
