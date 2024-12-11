import React from 'react';

export default function TabsEmployee({ activeTab, setActiveTab }) {
  return (
    <div className="flex items-center justify-between mb-4 border-b">
        <div className="flex space-x-4">
            <button
                onClick={() => setActiveTab('Employee')}
                className={`py-2 px-4 rounded ${activeTab === 'Employee' ? 'text-blue-500' : 'text-gray-700'}`}
            >
                Employee
            </button>
            <button
                onClick={() => setActiveTab('candidate')}
                className={`py-2 px-4 rounded ${activeTab === 'candidate' ? 'text-blue-500' : 'text-gray-700'}`}
            >
                Candidate
            </button> 
            <button
                onClick={() => setActiveTab('category')}
                className={`py-2 px-4 rounded ${activeTab === 'category' ? 'text-blue-500' : 'text-gray-700'}`}
            >
                Category
            </button>
        </div>

        {/* Conditional rendering for the text */}
        <div className="py-2 text-gray-500 transition-all duration-300 ease-in-out">
            {activeTab === 'Employee' ? 'Employee/home' : activeTab === 'candidate' ? 'Employee/Candidate' : 'Employee/Category'}
        </div>
    </div>
  );
}
