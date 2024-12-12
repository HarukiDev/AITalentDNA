import React, { useState, useEffect } from 'react';

export default function TabsCoreValue({ activeTab, setActiveTab }) {
  useEffect(() => {
    // Set the initial tab based on the URL hash when the component mounts
    const hash = window.location.hash;
    if (hash === '#corevalue') {
      setActiveTab('corevalue');
    } else if (hash === '#dimension') {
      setActiveTab('dimension');
    }
  }, [setActiveTab]);

  // Handle tab click and update the URL hash
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    window.location.hash = `#${tab}`;
  };

  return (
    <div className="flex flex-col items-center justify-between mb-4 border-b md:flex-row">
      <div className="flex justify-around w-full mb-2 md:w-auto md:justify-start md:mb-0">
        <button
          onClick={() => handleTabClick('corevalue')}
          className={`py-2 px-4 rounded ${activeTab === 'corevalue' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'}`}
        >
          Core Value
        </button>
        <button
          onClick={() => handleTabClick('dimension')}
          className={`py-2 px-4 rounded ${activeTab === 'dimension' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'}`}
        >
          Dimension
        </button>
      </div>

      {/* Optional conditional text */}
      <div className="py-2 text-sm text-center text-gray-500 transition-all duration-300 ease-in-out md:text-right">
        {activeTab === 'corevalue' ? 'Core Value/home' : 'Core Value/dimension'}
      </div>
    </div>
  );
}
