import React from "react";

// Import images from the assets folder
import CulturalCompatibilityIcon from "../assets/businessicon.png";
import AskAdindaImage from "../assets/Group.png";
import CompleteTalentProfilesIcon from "../assets/Peopleicon.png";
import AcceleratedHiringIcon from "../assets/Timeicon.png";

const Section1 = () => {
  return (
    <div className="bg-base-100 p-16 relative">
      {/* Circular Frame for "Why Us" */}
      <div className="flex justify-center items-center mb-2">
        <div
          className="border border-gray-400 text-gray-600 font-medium rounded-full px-4 py-1 text-sm"
          style={{
            display: "inline-block",
          }}
        >
          Why Us
        </div>
      </div>

      <h2
        className="text-4xl font text-center mt-4 mb-8 bg-clip-text text-transparent"
        style={{
          background: "linear-gradient(90deg, #0B3983 37.72%, #167AEA 63.25%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Why We're Your Best Choice
      </h2>

      {/* Chatbot Section */}
      <div className="flex flex-col lg:flex-row items-center bg-white shadow-md rounded-xl p-6 gap-6">
        <div className="flex-1">
          <h2 className="text-title-6 font-bold text-black">Guided Assistance with Adinda</h2>
          <p className="text-base-6 mt-2 text-gray-600">
            Meet Adinda, our dedicated chatbot, here to answer all your Talent DNA questions and guide you through the hiring process.
          </p>
        </div>
        <div className="flex-[1.7]"> {/* Enlarges the image */}
          <img
            src={AskAdindaImage}
            alt="Ask Adinda"
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        {/* Feature 1 */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-[700px] mx-auto lg:max-w-[550px] flex flex-col items-center">
          <h3 className="text-title-6 font-bold text-black text-center">Cultural Compatibility</h3>
          <p className="text-base-6 mt-2 text-gray-600 text-center">
            Build teams that genuinely fit your company's core values and vision.
          </p>
          <img
            src={CulturalCompatibilityIcon}
            alt="Cultural Compatibility Icon"
            className="w-full h-18 object-cover"
          />
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-[700px] mx-auto lg:max-w-[550px] flex flex-col items-center">
          <img
            src={AcceleratedHiringIcon}
            alt="Accelerated Hiring Icon"
            className="h-13 w-13 mb-5"
          />
          <h3 className="text-title-6 font-bold text-black text-center">
            Accelerated Hiring Process
          </h3>
          <p className="text-base-6 mt-2 text-gray-600 text-center">
            Focus on the top 5-10 best-fit candidates, making hiring faster and smarter.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-[700px] mx-auto lg:max-w-[550px] flex flex-col items-center">
          <img
            src={CompleteTalentProfilesIcon}
            alt="Complete Talent Profiles Icon"
            className="h-13 w-13 mb-5"
          />
          <h3 className="text-title-6 font-bold text-black text-center">
            Complete Talent Profiles
          </h3>
          <p className="text-base-6 mt-2 text-gray-600 text-center">
            Access detailed insights on job fit, culture alignment, career advice, and growth pathhs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section1;
