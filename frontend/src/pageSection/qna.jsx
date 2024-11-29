import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function QnA() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    [
      {
        question: "What is AI Talent Finder?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        question: "How does it work?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ],
    [
      {
        question: "Why choose us?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        question: "What are the benefits?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ],
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideAnimation = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div
      id="qnA"
      className="px-[12%] h-full py-32 justify-center flex items-center flex-col"
    >
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-between mb-10 md:flex-row">
          <div className="flex flex-col">
            <div className="flex items-center justify-center mb-2 md:justify-start md:items-start">
              <div className="px-4 py-1 text-sm font-medium text-gray-600 border border-gray-400 rounded-full">
                QnA
              </div>
            </div>

            <h2
              className="mt-4 mb-8 text-4xl text-center text-transparent md:text-start font bg-clip-text"
              style={{
                background:
                  "linear-gradient(90deg, #0B3983 37.72%, #167AEA 63.25%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Questions on Your Mind? <br /> We Have the Solutions!
            </h2>
          </div>

          <div className="md:pl-8 w-full md:w-[350px] xl:w-[710px] flex flex-col items-center text-center md:flex-none md:items-start md:text-start">
            <p className="mt-2 text-gray-600">
              Whether you're curious about how Talent DNA works, the benefits it
              offers, or how to get started, we’ve compiled answers to the most
              common questions. Check below for the insights you need!
            </p>
            <button className="bg-gradient-to-r from-[#0B3983] to-[#167AEA] p-2 text-white rounded-lg mt-2">
              Read More
            </button>
          </div>
        </div>

        {/* Slider Section */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              className="text-gray-600 hover:text-blue-500"
              onClick={handlePrev}
            >
              &larr;
            </button>

            {/* Slider Content */}
            <div className="relative flex-1 mx-6 overflow-hidden">
              <AnimatePresence mode="wait">
                {slides[currentSlide] && (
                  <motion.div
                    key={currentSlide}
                    className="grid w-full gap-4 rounded-md md:grid-cols-2"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden: { opacity: 0, x: 50 },
                      visible: { opacity: 1, x: 0 },
                      exit: { opacity: 0, x: -50 },
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: "relative", // Hilangkan absolute untuk debugging
                    }}
                  >
                    {slides[currentSlide].map((item, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg h-[280px] md:h-[350px] lg:h-[230px] xl:w[210px] overflow-hidden text-center md:text-start"
                      >
                        <h3 className="mb-2 text-lg font-bold text-black">
                          {item.question}
                        </h3>
                        <p className="overflow-hidden text-sm text-gray-600 text-ellipsis">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <button
              className="text-gray-600 hover:text-blue-500"
              onClick={handleNext}
            >
              &rarr;
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  currentSlide === index
                    ? "bg-blue-500"
                    : "bg-gray-300 hover:bg-blue-400"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
