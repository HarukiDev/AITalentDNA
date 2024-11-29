import React from 'react';
import ChatCard from '../component/chatCard';
import Bgtexture from "../assets/bg-texture.svg";
import { motion } from "framer-motion";

export default function getStarted() {
  const text = "Empower Your HR Management With SMART Insight".split(" ");
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
          opacity: 0.9,
        }}
      ></div>

      {/* Gradient Overlay untuk Fade Out */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8fbffb3] to-[#f8fbff] opacity-90"></div>

      {/* Konten Utama */}
      <div className="relative px-[15%]">
        <div className="px-[3%] py-32">
          <div className="flex flex-col items-center text-center gap-y-5">
            <div className="bg-gradient-to-r from-[#0B3983] to-[#167AEA] bg-clip-text">
              {text.map((el, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: i / 5,
                  }}
                  key={i}
                  className="text-5xl leading-snug text-transparent"
                >
                  {el}{" "}
                </motion.span>
              ))}
            </div>
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
