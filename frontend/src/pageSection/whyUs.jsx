import React from "react";
import CulturalCompatibilityIcon from "../assets/businessicon.svg";
import AskAdindaImage from "../assets/imageCard1.svg";
import CompleteTalentProfilesIcon from "../assets/Peopleicon.svg";
import AcceleratedHiringIcon from "../assets/Timeicon.svg";

export default function WhyUs() {
  return (
    <div id="whyUs" className="px-[20%] h-full">
      {/* Circular Frame for "Why Us" */}
      <div className="flex items-center justify-center mb-2">
        <div
          className="px-4 py-1 text-sm font-medium text-gray-600 border border-gray-400 rounded-full"
          style={{
            display: "inline-block",
          }}
        >
          Why Us
        </div>
      </div>

      <h2
        className="mt-4 mb-8 text-4xl text-center text-transparent font bg-clip-text"
        style={{
          background: "linear-gradient(90deg, #0B3983 37.72%, #167AEA 63.25%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Why We're Your Best Choice
      </h2>

      {/* Chatbot Section */}
      <div className="flex flex-col items-center gap-6 p-6 bg-white shadow-md lg:flex-row rounded-xl">
        <div className="flex-1">
          <h2 className="font-bold text-black text-title-6">Guided Assistance with Adinda</h2>
          <p className="mt-2 text-gray-600 text-base-6">
            Meet Adinda, our dedicated chatbot, here to answer all your Talent DNA questions and guide you through the hiring process.
          </p>
        </div>
        <div className="flex-[1.7]">
          {/* Enlarges the image */}
          <img
            src={AskAdindaImage}
            alt="Ask Adinda"
            className="object-cover w-full h-auto rounded-xl"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 gap-6 mt-10 lg:grid-cols-3">
        {/* Feature 1 */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-[700px] mx-auto lg:max-w-[550px] flex flex-col items-center">
          <h3 className="font-bold text-center text-black text-title-6">Cultural Compatibility</h3>
          <p className="mt-2 text-center text-gray-600 text-base-6">
            Build teams that genuinely fit your company's core values and vision.
          </p>
          <img
            src={CulturalCompatibilityIcon}
            alt="Cultural Compatibility Icon"
            className="object-cover w-full h-18"
          />
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-[700px] mx-auto lg:max-w-[550px] flex flex-col items-center">
          <img
            src={AcceleratedHiringIcon}
            alt="Accelerated Hiring Icon"
            className="mb-5 h-13 w-13"
          />
          <h3 className="font-bold text-center text-black text-title-6">
            Accelerated Hiring Process
          </h3>
          <p className="mt-2 text-center text-gray-600 text-base-6">
            Focus on the top 5-10 best-fit candidates, making hiring faster and smarter.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-[700px] mx-auto lg:max-w-[550px] flex flex-col items-center">
          <img
            src={CompleteTalentProfilesIcon}
            alt="Complete Talent Profiles Icon"
            className="mb-5 h-13 w-13"
          />
          <h3 className="font-bold text-center text-black text-title-6">
            Complete Talent Profiles
          </h3>
          <p className="mt-2 text-center text-gray-600 text-base-6">
            Access detailed insights on job fit, culture alignment, career advice, and growth paths.
          </p>
        </div>
      </div>
    </div>
  );
}