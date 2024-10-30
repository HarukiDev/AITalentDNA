import React from "react";
import Navbar from "../pageSection/navbar.jsx";
import Footer from "../pageSection/footer.jsx";


export default function Homepage() {
  return (
    <div className="p-[20%]">
      <Navbar />
      <div className="">
        <h1>Discover your organization’s Top 10 strengths and Bottom 5 development areas. Gain insights to support strategic decisions.</h1>
      </div>
      <Footer />
    </div>
  );
}
