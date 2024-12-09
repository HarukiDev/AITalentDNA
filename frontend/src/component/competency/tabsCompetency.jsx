import React from 'react';

export default function TabsJobRole({ activeTab, setActiveTab }) {
  return (
    <div className="flex items-center justify-between mb-4 border-b">
        <div className="flex space-x-4">
            <button
                onClick={() => setActiveTab('jobrole')}
                className={`py-2 px-4 rounded ${activeTab === 'jobrole' ? 'text-blue-500' : 'text-gray-700'}`}
            >
                Job Role
            </button>
            <button
                onClick={() => setActiveTab('responsibility')}
                className={`py-2 px-4 rounded ${activeTab === 'responsibility' ? 'text-blue-500' : 'text-gray-700'}`}
            >
                Competency
            </button> 
        </div>

        {/* Conditional rendering for text */}
        <div className="py-2 text-gray-500 transition-all duration-300 ease-in-out">
            {activeTab === 'jobrole' ? 'Job Role/home' : 'Job Role/competency'}
        </div>
    </div>
  );
}
