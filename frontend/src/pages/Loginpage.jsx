import React, { useState } from "react";
import LogoSVG from '../assets/image8.svg';
import ObjectSVG from '../assets/objects1.svg';

export default function LoginPage() {
  const [signIn, setSignIn] = useState(true);

  // Detect Android device
  const isAndroid = /Android/i.test(navigator.userAgent);

  return (
    <div className="bg-[#EDF2FF] rounded-xl shadow-lg relative overflow-hidden w-full min-h-screen">
      
      {/* Sign Up Form */}
      <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-600 ease-in-out ${signIn ? 'opacity-0 z-1' : 'opacity-100 z-5 translate-x-[100%]'}`}>
        <form className="bg-[#EDF2FF] flex items-center justify-center flex-col px-12 py-8 h-full text-center">
          <h1 className="m-0 font-bold">Create Account</h1>
          <input type="text" placeholder="Name" className="bg-white border-none p-2 m-2 w-full rounded-lg text-sm h-[35px]" />
          <input type="email" placeholder="Email" className="bg-white border-none p-2 m-2 w-full rounded-lg text-sm h-[35px]" />
          <input type="password" placeholder="Password" className="bg-white border-none p-2 m-2 w-full rounded-lg text-sm h-[35px]" />
          <button className="bg-gradient-to-r from-[#1678E6] to-[#0C3C87] text-white font-bold rounded-full py-2 w-full h-[35px] text-sm uppercase transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#ff4b2b] hover:to-[#1678E6] active:scale-95 focus:outline-none">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-600 ease-in-out ${signIn ? 'opacity-100 z-2' : 'opacity-0 z-1 translate-x-[100%]'}`}>
        <form className="bg-[#EDF2FF] flex items-center justify-center flex-col px-12 py-8 h-full text-center">
          <img src={LogoSVG} alt="AI Talent Finder Logo" className="w-[150px] mb-5 mx-auto" />
          <input type="email" placeholder="Email" className="bg-white border-none p-2 m-2 w-full rounded-lg text-sm h-[35px]" />
          <input type="password" placeholder="Password" className="bg-white border-none p-2 m-2 w-full rounded-lg text-sm h-[35px]" />
          <button className="bg-gradient-to-r from-[#1678E6] to-[#0C3C87] text-white font-bold rounded-full py-2 w-full h-[35px] text-sm uppercase transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#ff4b2b] hover:to-[#1678E6] active:scale-95 focus:outline-none">Sign In</button>
          <p className="mt-2 text-xs text-center text-gray-600">
            Don't have an account?{" "}
            <span onClick={() => setSignIn(false)} className="text-[#1678E6] font-bold cursor-pointer hover:underline">Sign up</span>
          </p>
          <a href="#" className="mt-2 text-xs text-center text-gray-600">Forgot your password?</a>
        </form>
      </div>

      {/* Overlay Container */}
      <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out z-100 ${signIn ? 'transform-none' : 'transform-x-[50%]'}`}>
        <div className={`bg-gradient-to-r from-[#324DD0] to-[#2C3BA4] text-white h-full w-[200%] transform transition-all duration-600 ease-in-out ${signIn ? 'transform-none' : 'transform-x-[50%]'}`}>
          <div className="absolute top-0 flex flex-col items-center justify-center w-1/2 h-full px-10 py-8 text-center">
            <h1 className="m-0 font-bold">Welcome Back!</h1>
            <p className="font-light text-sm leading-[20px] mt-5 mb-7">
              To keep connected with us, please login with your personal info
            </p>
            <button onClick={() => setSignIn(true)} className="bg-transparent border-2 border-white text-white rounded-full py-2 px-6 font-bold text-sm uppercase transition-all duration-300 ease-in-out hover:bg-white hover:text-[#1678E6]">
              Sign In
            </button>
          </div>

          {/* Right Panel (optional based on Android) */}
          {!isAndroid && (
            <div className="absolute top-0 right-0 w-1/2 h-full transition-all ease-in-out transform duration-600">
              <img src={ObjectSVG} alt="Adinda Illustration" className="w-full h-auto max-w-full" />
              <h1 className="mt-5 font-bold">Featuring</h1>
              <p className="mt-2 text-sm font-light text-center">
                Guided Assistance <strong>Adinda</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
