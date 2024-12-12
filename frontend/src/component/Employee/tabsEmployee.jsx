import React, { useState, useEffect } from 'react';

export default function TabsEmployee({ activeTab, setActiveTab }) {
    useEffect(() => {
        // Set the initial tab based on the URL hash when the component mounts
        const hash = window.location.hash;
        if (hash === '#ExistingEmployee') {
          setActiveTab('Employee');
        } else if (hash === '#NewCandidate') {
          setActiveTab('candidate');
        } else if (hash === '#Category') {
          setActiveTab('category');
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
                onClick={() => handleTabClick('Employee')}
                className={`py-2 px-4 rounded ${activeTab === 'Employee' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'}`}
            >
                Employee
            </button>
            <button
                onClick={() => handleTabClick('candidate')}
                className={`py-2 px-4 rounded ${activeTab === 'candidate' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'}`}
            >
                Candidate
            </button> 
            <button
                onClick={() => handleTabClick('category')}
                className={`py-2 px-4 rounded ${activeTab === 'category' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'}`}
            >
                Category
            </button>
        </div>

        {/* Conditional rendering for the text */}
        <div className="py-2 text-sm text-center text-gray-500 transition-all duration-300 ease-in-out md:text-right">
            {activeTab === 'Employee' ? 'Employee/home' : activeTab === 'candidate' ? 'Employee/Candidate' : 'Employee/Category'}
        </div>
    </div>
  );
}
