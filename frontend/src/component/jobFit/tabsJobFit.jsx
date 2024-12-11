import React from 'react';

export default function TabsJobFit({ activeTab, setActiveTab }) {
  return (
    <div className="flex items-center justify-between mb-4 border-b">
        <div className="flex space-x-4">
            <button
                onClick={() => setActiveTab('jobfit')}
                className={`py-2 px-4 rounded ${activeTab === 'jobfit' ? 'text-blue-500' : 'text-gray-700'}`}
            >
                Job Fit
            </button>
            <button
                onClick={() => setActiveTab('culturefit')}
                className={`py-2 px-4 rounded ${activeTab === 'culturefit' ? 'text-blue-500' : 'text-gray-700'}`}
            >
                Culture Fit
            </button> 
        </div>

        {/* Conditional rendering for text */}
        <div className="py-2 text-gray-500 transition-all duration-300 ease-in-out">
            {activeTab === 'jobfit' ? 'Matching by Fit/jobfit' : 'Matching by Fit/culturefit'}
        </div>
    </div>
  );
}
