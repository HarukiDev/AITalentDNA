import React from "react";
import { motion } from "framer-motion";
import SendIcon from "../assets/sendIcon.svg";
import AdindaImage from "../assets/imageProfil/Adinda.svg";
import UserImage from "../assets/imageProfil/userExample.svg";

export default function chatCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col w-full h-full p-6 bg-gray-200 shadow-lg border-1 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10"
    >
        {/* Bubble Chat Adinda */}
        <div className="flex justify-start mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
                <img
                    src={AdindaImage}
                    alt="Adinda"
                    className="object-cover w-auto h-auto rounded-full"
                />
            </div>
            
            <div className="p-3 bg-white rounded-lg shadow-md">
              <p className="text-sm font-semibold">Adinda</p>
              <p>Hai! Ada yang bisa saya bantu?</p>
            </div>
          </div>
        </div>

        {/* Bubble Chat Jimmy */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-3 text-white bg-blue-500 rounded-lg shadow-md">
              <p className="text-sm font-semibold">Jimmy Maulana</p>
              <p>Hai! saya mau nanya .....</p>
            </div>
            <div className="w-[40px] h-[40px] overflow-hidden rounded-full">
                <img
                    src={UserImage}
                    alt="User"
                    className="object-cover w-full h-full"
                />
            </div>
          </div>
        </div>

        {/* Input Message */}
        <div className="flex items-center px-4 py-2 mt-4 bg-white border border-[#536CE3] rounded-full shadow-md">
          <input
            type="text"
            placeholder="Write a message"
            className="flex-grow text-gray-700 outline-none"
          />
          <button className="ml-2">
            <img src={SendIcon} alt="send"/>
          </button>
        </div>
    </motion.div>
  );
}