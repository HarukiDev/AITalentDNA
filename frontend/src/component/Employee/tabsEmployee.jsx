import React from 'react';

export default function TabsEmployee({ activeTab, setActiveTab }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-4 border-b">
        <div className="flex w-full md:w-auto justify-around md:justify-start mb-2 md:mb-0">
            <button
                onClick={() => setActiveTab('Employee')}
                className={`py-2 px-4 rounded ${activeTab === 'Employee' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'}`}
            >
                Employee
            </button>
            <button
                onClick={() => setActiveTab('candidate')}
                className={`py-2 px-4 rounded ${activeTab === 'candidate' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'}`}
            >
                Candidate
            </button> 
            <button
                onClick={() => setActiveTab('category')}
                className={`py-2 px-4 rounded ${activeTab === 'category' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'}`}
            >
                Category
            </button>
        </div>

        {/* Conditional rendering for the text */}
        <div className="py-2 text-gray-500 text-sm text-center md:text-right transition-all duration-300 ease-in-out">
            {activeTab === 'Employee' ? 'Employee/home' : activeTab === 'candidate' ? 'Employee/Candidate' : 'Employee/Category'}
        </div>
    </div>
  );
}
