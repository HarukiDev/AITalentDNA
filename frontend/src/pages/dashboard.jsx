import React from 'react';
import DashboardContent from '../component/DashboardContent';
import NavBarDashboard from '../pageSection/navBarDashboard';
import Footer from "../pageSection/footer.jsx";

export default function dashboard() {
  return (
    <div>
      <NavBarDashboard />    
      <DashboardContent />
      <Footer />
    </div>
  )
}
