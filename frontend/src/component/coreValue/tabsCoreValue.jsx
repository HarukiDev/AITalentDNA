import React from 'react';

export default function TabsCoreValue({ activeTab, setActiveTab }) {
  return (
    <div className="flex items-center justify-between mb-4 border-b">
        <div className="flex space-x-4">
            <button
                onClick={() => setActiveTab('corevalue')}
                className={`py-2 px-4 rounded ${activeTab === 'corevalue' ? 'text-blue-500' : 'text-gray-700'}`}
            >
                Core Value
            </button>
            <button
                onClick={() => setActiveTab('dimension')}
                className={`py-2 px-4 rounded ${activeTab === 'dimension' ? 'text-blue-500' : 'text-gray-700'}`}
            >
                Dimension
            </button> 
        </div>

        {/* Conditional rendering for text */}
        <div className="py-2 text-gray-500 transition-all duration-300 ease-in-out">
            {activeTab === 'corevalue' ? 'Core Value/home' : 'Core Value/dimension'}
        </div>
    </div>
  );
}
