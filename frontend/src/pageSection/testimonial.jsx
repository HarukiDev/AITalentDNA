import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const testimonials = [
    {
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
      name: "Jimmy Maulana",
      position: "Front End",
    },
    {
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
      name: "Jimmy Keren",
      position: "Front End",
    },
    {
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
      name: "Jimmy TOP GLOBAL",
      position: "Front End",
    },
    {
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
      name: "Jimmy JAMES",
      position: "Front End",
    },
  ];

  const handleNext = () => {
    if (isScrolling.current) return;

    isScrolling.current = true; // Set scrolling state
    setActiveIndex((prev) => (prev + 1) % testimonials.length); // Looping
  };

  const handlePrev = () => {
    if (isScrolling.current) return;

    isScrolling.current = true; // Set scrolling state
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    ); // Looping backwardy
  };

  const handleScroll = () => {
    if (isScrolling.current) return;

    const container = containerRef.current;
    const items = container.querySelectorAll(".testimonial-card");

    let closestIndex = 0;
    let closestDistance = Infinity;
    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const containerCenter =
        container.scrollLeft + container.offsetWidth / 2;
      const distance = Math.abs(itemCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    const container = containerRef.current;

    // Tambahkan event scroll untuk mendeteksi perubahan posisi
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container && container.children[activeIndex]) {
      isScrolling.current = true;

      const activeItem = container.children[activeIndex];
      const containerWidth = container.offsetWidth;
      const itemWidth = activeItem.offsetWidth;
      const scrollLeft = activeItem.offsetLeft - (containerWidth - itemWidth) / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 500); 
    }
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Auto-slide setiap 3 detik

    return () => clearInterval(interval); 
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (swipeDistance > 50) {
      // Swipe ke kiri (Next)
      handleNext();
    } else if (swipeDistance < -50) {
      // Swipe ke kanan (Prev)
      handlePrev();
    }
  };

  return (
    <div id="testimonial" className="px-[12%] h-full py-32">
      <div className="container mx-auto">
        {/* Circular Frame for "Testimonial" */}
        <div className="flex items-center justify-center mb-2">
          <div className="px-4 py-1 text-sm font-medium text-gray-600 border border-gray-400 rounded-full">
            Testimonial
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
          What Our Client Say <br /> About AI Talent Finder
        </h2>

        {/* Navigation Buttons */}
        <div className="justify-end hidden gap-4 md:flex">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`flex items-center justify-center w-12 h-12 border-2 rounded-full ${
              activeIndex === 0
                ? "border-gray-300 text-gray-300 cursor-not-allowed"
                : "border-blue-500 text-black cursor-pointer"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={activeIndex === testimonials.length - 1}
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              activeIndex === testimonials.length - 1
                ? "bg-gray-300 text-black cursor-not-allowed"
                : "bg-blue-500 text-white cursor-pointer"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Testimonial Slider */}
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="flex gap-6 py-6 overflow-x-scroll rounded-xl scrollbar-hide snap-x snap-mandatory lg:snap-none lg:cursor-default cursor-grab"
          style={{
            WebkitOverflowScrolling: "touch",
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={`testimonial-card flex flex-col ${
                activeIndex === index
                  ? "bg-blue-500 text-white w-[200px] h-[330px] md:w-[350px] md:h-[280px] lg:w-[500px] lg:h-[250px] text-sm md:text-base"
                  : "bg-white text-gray-800 w-[200px] h-[320px] md:w-[300px] md:h-[250px] lg:w-[480px] lg:h-[240px] text-sm md:text-base"
              } p-6 rounded-lg shadow-md justify-center items-start shrink-0`}
              initial={{ opacity: 0.8, scale: 0.9 }}
              animate={{
                opacity: activeIndex === index ? 1 : 0.8,
                scale: activeIndex === index ? 1 : 0.9,
              }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-4">{testimonial.text}</p>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="w-10 h-10 mr-3 rounded-full"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
