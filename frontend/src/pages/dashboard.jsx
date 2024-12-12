import React from 'react';
import DashboardContent from '../component/dashBoard/dashboardContent';
import NavBarDashboard from '../pageSection/navBarDashboard';

export default function dashboard() {
  return (
    <div>
      <NavBarDashboard />    
      <DashboardContent />
    </div>
  )
}
