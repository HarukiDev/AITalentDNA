// QnA.js
import React from 'react';
import { useMediaQuery } from "@uidotdev/usehooks";

export default function QnA() {
  const isLargeScreen = useMediaQuery("(max-width: 768px)");
  
  return (
    <div id="qnA" className="px-[20%] h-screen flex justify-center items-center">
      <div className="container px-4 mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div className="w-1/2">
          <h2 className="mt-4 text-3xl font-bold">
            Questions on <span className="text-blue-600 highlight">Your Mind?</span> <br /> We Have the <span className="text-blue-600 highlight">Solutions!</span>
          </h2>
        </div>
        <div className="w-1/2 pl-8">
          <p className="mt-2 text-gray-600">
            Whether you're curious about how Talent DNA works, the benefits it offers, or how to get started, we’ve compiled answers to the most common questions. Check below for the insights you need!
          </p>
          <button className="read-more bg-blue-600 text-white py-2 px-6 rounded-[12px] mt-4">Read More</button>
        </div>
      </div>

        {isLargeScreen ? (
          <div className="text-center">
            <p>ini android</p>
          </div>
        ) : (
            
            <div className="flex flex-row w-full max-w-4xl mx-auto slider-container">
              <div className="flex-grow slider-slide basis-0">
                <div className="w-full p-6 mb-4 bg-white rounded-lg shadow-md">
                  <h3 className="mb-2 text-xl font-semibold">Lorem, ipsum dolor sit amet consectetur adipisicing.</h3>
                  <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi illo cum, non labore ducimus consectetur.</p>
                </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}
