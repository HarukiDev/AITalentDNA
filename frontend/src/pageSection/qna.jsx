// QnA.js
import React from 'react';
import { useMediaQuery } from "@uidotdev/usehooks";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function QnA() {
  const isLargeScreen = useMediaQuery("(max-width: 768px)");

  const sliderContent = [
    { title: 'What is AI Talent Finder ?', description: 'Loremmm ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { title: 'How does it work?', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { title: 'What are the benefits?', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { title: 'How to get started?', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { title: 'Is it secure?', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { title: 'What is AI Talent Finder ?', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show two slides at a time
    slidesToScroll: 2, // Scroll two slides at a time
  };
  
  return (
    <section id="qnA" className="qna-section py-10">
      <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-10">
        <div className="w-1/2">
          {/* <span className="qa-label block bg-blue-200 py-2 px-4 rounded-[12px] text-blue-800 font-semibold text-sm inline-block">
            Q & A
          </span> */}
          
          <h2 className="text-3xl font-bold mt-4">
            Questions on <span className="highlight text-blue-600">Your Mind?</span> <br /> We Have the <span className="highlight text-blue-600">Solutions!</span>
          </h2>
        </div>
        <div className="w-1/2 pl-8">
          <p className="text-gray-600 mt-2">
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
            
            <Slider {...settings} className="slider-container flex flex-row w-full max-w-4xl mx-auto">
            {sliderContent.map((item, index) => (
              <div key={index} className="slider-slide flex-grow basis-0">
                <div className="p-6 bg-white rounded-lg shadow-md mb-4 w-full">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </Slider>


          
        )}
      </div>
    </section>
  );
}
