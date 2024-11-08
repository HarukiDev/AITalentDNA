import React from "react";
import Navbar from "../pageSection/navbar.jsx";
import Footer from "../pageSection/footer.jsx";
import GetStartedSection from "../pageSection/getStarted.jsx"

export default function Homepage() {
  return (
    <div className="px-[20%]">
      <Navbar />
      <GetStartedSection />
      <Footer />
    </div>
  );
}
