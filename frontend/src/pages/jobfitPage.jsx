import React, { useState } from 'react';
import Navbar from '../pageSection/navBarDashboard';
import TabsJobFit from "../component/jobFit/tabsJobFit";
import Jobfit from '../pageSection/jobFit/jobFit';
import CultureFit from '../pageSection/jobFit/cultureFit';

export default function JobFitPage() {
  const [activeTab, setActiveTab] = useState('jobfit');
  const [actionMenuVisible, setActionMenuVisible] = useState(false);

  // Contoh data untuk `jobFits`
  const [jobFits, setJobFits] = useState([
    { id: 1, name: 'Job Fit Example 1' },
    { id: 2, name: 'Job Fit Example 2' },
    // Tambahkan data lain sesuai kebutuhan
  ]);

  // Toggle action menu visibility
  const toggleActionMenu = () => {
    setActionMenuVisible((prevState) => !prevState); // Lebih aman dengan fungsi callback
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Kontainer Konten */}
      <div className="px-[12%] h-full py-32">
        {/* Tab Navigasi */}
        <TabsJobFit activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Konten Berdasarkan Tab Aktif */}
        {activeTab === 'jobfit' ? (
          <Jobfit
            jobFits={jobFits} // Data `jobFits` yang didefinisikan di state
            actionMenuVisible={actionMenuVisible}
            toggleActionMenu={toggleActionMenu}
          />
        ) : (
          <CultureFit />
        )}
      </div>
    </div>
  );
}
