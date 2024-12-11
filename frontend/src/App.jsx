import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Candidate from "./pages/candidate.jsx";
import Category from "./pages/category.jsx";
import Dashboard from "./pages/dashboard.jsx";
import CoreValue from "./pages/coreValuePage.jsx";

import Employee from "./pages/EmployeePage.jsx";

import JobFit from "./pages/jobfitPage.jsx";

import LoginPage from "./pages/Loginpage.jsx"

// import Findpage from "./pages/findpage.jsx";
import DetailProfile from "./pages/detailProfile.jsx";
import UserProfile from "./pages/userProfile.jsx";
import FindPage from "./pages/findpage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/DetailProfil" element={<DetailProfile/>} />
      <Route path="/UserProfile" element={<UserProfile/>} />
      <Route path="/Employee" element={<Employee />} />
      <Route path="/Corevalue" element={<CoreValue />} />
      
      <Route path="/Employee" element={<Employee />} />
      
      <Route path="/Jobfit" element={<JobFit />} />

      <Route path="/Loginpage" element={<LoginPage />} />
      <Route path="/job-fit" element={<Jobfit />} />
      <Route path="/culture-fit" element={<Culturefit />} />
      <Route path="/MatchingByPerson" element={<FindPage />} />
    </Routes>
  );
}

export default App;
