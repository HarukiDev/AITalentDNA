import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Jobfit from "./pages/job-fit.jsx";
import Culturefit from "./pages/culture-fit.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/job-fit" element={<Jobfit />} />
      <Route path="/culture-fit" element={<Culturefit />} />
    </Routes>
  );
}

export default App;
