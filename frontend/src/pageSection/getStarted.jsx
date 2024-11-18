import React from 'react';
import ChatCard from '../component/chatCard';
import Bgtexture from "../assets/bg-texture.svg";

export default function getStarted() {
  return (
    <div id="getStarted" className="relative min-h-screen">
      {/* Background Texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${Bgtexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9, // Mengurangi sedikit transparansi agar tekstur tetap terlihat
        }}
      ></div>

      {/* Gradient Overlay untuk Fade Out */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8fbffb3] to-[#f8fbff] opacity-90"></div>

      {/* Konten Utama */}
      <div className="relative px-[20%]">
        <div className="px-[3%] py-36">
          <div className="flex flex-col items-center text-center gap-y-5">
            <h1 className="text-5xl bg-gradient-to-r from-[#0B3983] to-[#167AEA] text-transparent bg-clip-text leading-snug">
              Empower Your HR Management With SMART Insight
            </h1>
            <p className="text-base text-[#484747] lg:px-10">
              Elevate your HR management with SMART Insight. Simplify processes, foster employee engagement, and make informed decisions to support each individual’s growth and success.
            </p>
            <div className="w-[200px] h-[50px] bg-gradient-to-r from-[#0B3983] to-[#167AEA] p-2 text-white rounded-lg text-lg items-center flex justify-center">
              <a href="" className="">
                Get Started
              </a>
            </div>
          </div>
          <div className="mt-8">
            <ChatCard />
          </div>
        </div>
      </div>
    </div>
  );
}
