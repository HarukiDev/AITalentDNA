import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Employee from "./pages/EmployeePage.jsx";
import Dashboard from "./pages/dashboard.jsx";
import CoreValue from "./pages/coreValuePage.jsx";
import LoginPage from "./pages/Loginpage.jsx"
import Jobfit from "./pages/jobfitPage.jsx";
import DetailProfile from './pages/detailProfile';
import UserProfile from "./pages/userProfile.jsx";
import FindPage from "./pages/findpage.jsx";
import JobRolePage from "./pages/jobRolePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/DetailProfil" element={<DetailProfile/>} />
      <Route path="/UserProfile" element={<UserProfile/>} />
      <Route path="/Employee" element={<Employee />} />
      <Route path="/JobRole" element={<JobRolePage />} />
      <Route path="/Corevalue" element={<CoreValue />} />
      <Route path="/Loginpage" element={<LoginPage />} />
      <Route path="/jobfit" element={<Jobfit />} />
      <Route path="/MatchingByPerson" element={<FindPage />} />
    </Routes>
  );
}

export default App;