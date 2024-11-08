import React from 'react'
import { useMediaQuery } from "@uidotdev/usehooks";
import Logo from "../assets/logo.svg"

export default function navbar() {
  const isLargeScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div>
      {isLargeScreen ? (
        <header className="fixed z-50 flex items-center justify-between w-screen pt-3">
          <p>ini android</p>
        </header>
      ) : (
        <header className="fixed flex top-0 right-0 left-0 items-center z-50 mt-10 rounded-[30px] px-4 lg:py-1 xl:py-[5px] justify-around">
          <div className='flex items-center gap-7'>
            <div className="w-[150px]">
              <img className="w-full h-full bg-cover" src={Logo} alt="" />
            </div>
            <div className="flex gap-6 text-lg">
              <a href="#getStarted">Home</a>
              <a href="#whyUs">WhyUs</a>
              <a href="#qnA">QnA</a>
            </div>
          </div>
          <div className="flex gap-5 text-lg leading-tight text-center">
            <div className="border border-[#536CE3] p-2 w-[100px] h-[40px] rounded-2xl">
              <a href="">Login</a>
            </div>
            <div className="bg-[#536CE3] rounded-2xl w-[100px] h-[40px] p-2 text-white">
              <a href="">Sign In</a>
            </div>
          </div>
        </header>
      )}
    </div>
  );
}