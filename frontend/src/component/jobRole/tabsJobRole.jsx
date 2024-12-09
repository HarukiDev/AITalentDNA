import React from 'react';

export default function TabsJobRole({ activeTab, setActiveTab }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-4 border-b">
      {/* Tab Buttons */}
      <div className="flex w-full md:w-auto justify-around md:justify-start mb-2 md:mb-0">
        <button
          onClick={() => setActiveTab('jobrole')}
          className={`py-2 px-4 rounded ${
            activeTab === 'jobrole' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'
          }`}
        >
          Job Role
        </button>
        <button
          onClick={() => setActiveTab('responsibility')}
          className={`py-2 px-4 rounded ${
            activeTab === 'responsibility' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-700'
          }`}
        >
          Competency
        </button>
      </div>

      {/* Conditional rendering for text */}
      <div className="py-2 text-gray-500 text-sm text-center md:text-right transition-all duration-300 ease-in-out">
        {activeTab === 'jobrole' ? 'Job Role/home' : 'Job Role/competency'}
      </div>
    </div>
  );
}
