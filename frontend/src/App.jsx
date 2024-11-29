import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Employee from "./pages/employee.jsx";
import Dashboard from "./pages/dashboard.jsx";
import CoreValue from "./pages/coreValuePage.jsx";
import LoginPage from "./pages/Loginpage.jsx"
import Jobfit from "./pages/job-fit.jsx";
import Culturefit from "./pages/culture-fit.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Employee" element={<Employee />} />
      <Route path="/Corevalue" element={<CoreValue />} />
      <Route path="/Loginpage" element={<LoginPage />} />
      <Route path="/job-fit" element={<Jobfit />} />
      <Route path="/culture-fit" element={<Culturefit />} />
    </Routes>
  );
}

export default App;
