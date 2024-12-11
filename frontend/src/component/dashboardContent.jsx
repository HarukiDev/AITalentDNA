import { useNavigate } from 'react-router-dom';
import React from "react";
import AdindaImage from "../assets/imageProfil/Adinda.svg";
import BgTextureCard1 from "../assets/bg-textureCard1.svg";
import BgTextureCard2 from "../assets/bg-textureCard2.svg";
import logoMBF from "../assets/logoMBF.svg";
import logoMBP from "../assets/logoMBP.svg";
import BgtextureP from "../assets/bgtextureP.svg";
import { motion } from "framer-motion";
import SendIcon from "../assets/sendIcon.svg";



export default function DashboardContent() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Jobfit');
  };
  
  return (
    <div className="px-[12%] h-full py-32">
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="w-full">
          {/* Adinda Section */}
          <div className="relative w-full lg:w-[100%] h-[320px]">
            {/* Content inside the blue box */}
            <div className="flex flex-col items-center justify-start px-8 py-6 text-white shadow-md rounded-xl h-[85%]"
              style={{
                background: `linear-gradient(to right, #536CE3, #001FB2)`,  // Gradasi biru
                position: 'relative',
              }}>
              {/* Gambar Tekstur di atas background */}
              <div
                style={{
                  backgroundImage: `url(${BgTextureCard1})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.12,
                  zIndex: 1, 
                }}
              ></div>
          
              {/* Konten */}
              <div className="z-10 flex items-center justify-between w-full">
                {/* Teks */}
                <div className="flex flex-col w-full lg:w-[60%]">
                  <h2 className="mb-2 text-3xl font-bold">Hi! I'm Adinda</h2>
                  <p className="mb-4 text-sm">
                    Your dedicated Talent DNA chatbot, here to answer all your
                    questions and guide you through the hiring process.
                  </p>
                </div>
              
                {/* Gambar Adinda dengan clip-path */}
                <div className="w-[200px] h-[200px] overflow-hidden">
                  <img
                    src={AdindaImage}
                    alt="Adinda"
                    className="object-contain w-full h-full"
                    style={{
                      clipPath: 'inset(1px 0 0 0)', 
                    }}
                  />
                </div>
              </div>
            </div>
                  
            {/* Input Message Box */}
            <div className="absolute bottom-0 w-[90%] p-4 transform -translate-x-1/2 left-1/2  bg-white rounded-xl shadow-md z-20">
              <div className="relative w-full">
                {/* Message Text */}
                <div className="mb-2 text-sm text-gray-500">
                  <p>Have a question? Ask Adinda about Talent DNA!</p>
                </div>
                {/* Input Box */}
                <div className="relative flex items-center justify-between border border-gray-300 rounded-[20px] shadow-md ">
                  <input
                    type="text"
                    placeholder="Type your question here..."
                    className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    className="p-2"
                  >
                    <img src={SendIcon} alt="send" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 md:flex-row">
          {/* Matching By Fit */}
          <div className="p-4 bg-white shadow-md rounded-xl w-full xl:w-[50%] flex flex-col justify-start items-center text-center h-[320px]">
            <h3 className="mb-4 text-xl font-semibold">Matching By Fit</h3>
            <div className="w-[80px] mb-4 flex justify-center items-center h-[60px]">
              <img 
                src={logoMBF} 
                alt="Logo Matching By Fit"
                className="object-cover w-full h-full" 
              />
            </div>
            {/* Foto User */}
            <div className="relative flex justify-center mb-2">
              <div className="relative w-[35px] h-[35px]">
                <img 
                  src="https://picsum.photos/50" 
                  alt="User 1"
                  className="object-cover w-full h-full border-2 border-[#FFFFFF] rounded-full"
                />
              </div>
              <div className="absolute w-[35px] h-[35px]">
                <img 
                  src="https://picsum.photos/51" 
                  alt="User 2"
                  className="object-cover w-full h-full border-2 border-[#FFFFFF] rounded-full"
                />
              </div>
              <div className="relative w-[35px] h-[35px]">
                <img 
                  src="https://picsum.photos/52" 
                  alt="User 3"
                  className="object-cover w-full h-full border-2 border-[#FFFFFF] rounded-full"
                />
                <span className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center text-lg font-extrabold bg-opacity-25 rounded-full bg-slate-100">
                  <h1 className="text-black">+</h1>
                </span>
              </div>
            </div>
            <p className="mb-4 text-sm font-normal h-[50px] text-gray-500">
              Discover the ideal match for both job roles and company culture to ensure a perfect fit.
            </p>
            <div className="w-full my-2 border-t-2 border-gray-300"></div>
            <div className="flex justify-center w-full gap-2">
              <button onClick={handleClick} className="px-2 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 w-[50%] h-[40px] flex justify-center items-center" >
                
                Job Fit
              </button>
              <button className="px-2 py-3 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 w-[50%] h-[40px] flex justify-center items-center">
                Culture Fit
              </button>
            </div>
          </div>

          {/* Matching By Person */}
          <div className="p-4 shadow-md rounded-xl w-full xl:w-[50%] text-white flex flex-col justify-start items-center text-center h-[320px]"
            style={{
                background: `linear-gradient(to right, #536CE3, #001FB2)`,  // Gradasi biru
                position: 'relative',
              }}>
            <div
              style={{
                backgroundImage: `url(${BgTextureCard2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.15,
                zIndex: 1, 
              }}
            ></div>
            <h3 className="mb-4 text-xl font-semibold">Matching By Person</h3>
            <div className="w-[80px] mb-4 flex justify-center items-center h-[60px]">
              <img 
                src={logoMBP}
                alt="Logo Matching By Person"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Foto User */}
            <div className="relative flex items-center justify-center mb-2">
              <div className="relative w-[35px] h-[35px]">
                <img 
                  src="https://picsum.photos/50" 
                  alt="User 1"
                  className="object-cover w-full h-full border-2 rounded-full border-[#3D56CE]"
                />
              </div>
              <div className="absolute w-[35px] h-[35px]">
                <img 
                  src="https://picsum.photos/51" 
                  alt="User 2"
                  className="object-cover w-full h-full border-2 rounded-full border-[#3D56CE]"
                />
              </div>
              <div className="relative w-[35px] h-[35px]">
                <img 
                  src="https://picsum.photos/52" 
                  alt="User 3"
                  className="object-cover w-full h-full border-2 rounded-full border-[#3D56CE]"
                />
                <span className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center text-lg font-extrabold bg-opacity-25 rounded-full bg-slate-100">
                  <h1 className="text-black">+</h1>
                </span>
              </div>
            </div>
            <p className="mb-4 text-sm font-normal h-[50px]">
              Discover the ideal match for both job roles and company culture to ensure a perfect fit.
            </p>
            <div className="w-full my-2 border-t-2 border-gray-300"></div>
            <div className="flex justify-center w-full gap-2">
              <button className="px-2 py-3 text-sm font-medium text-blue-600 bg-[#FFFFFF] rounded-lg hover:bg-blue-700 w-[50%] h-[40px] flex justify-center items-center">
                TalentDNA
              </button>
              <button className="px-2 py-3 text-sm font-medium text-white border border-[#FFFFFF] rounded-lg hover:bg-blue-50 w-[50%] h-[40px] flex justify-center items-center">
                Person Name
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4 lg:flex-row">
        {/*Out Talent*/}
        <div className="w-full h-full">
          <div className="px-6 py-2 bg-white shadow-md rounded-xl">
            <div className="mb-4 text-xl font-semibold">
              <h1>Our Talent</h1>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center gap-2 text-sm leading-tight text-center lg:gap-5 lg:text-base bg-[#EDF2FF] p-4 rounded-xl">
                  <div className="w-10">
                    <img 
                      src="https://static.wikitide.net/hoyodexwiki/9/92/Elysia_%28B3-MU-0%29.png" 
                      alt=""
                      className="object-cover w-full h-auto rounded-full" 
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start w-full">
                    <h1 className="font-semibold">Jimmy Maulana</h1>
                    <p className="text-sm text-gray-500">Frontend</p>
                  </div>
                  <button className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm leading-tight text-center lg:gap-5 lg:text-base bg-[#EDF2FF] p-4 rounded-xl">
                  <div className="w-10">
                    <img 
                      src="https://static.wikitide.net/hoyodexwiki/9/92/Elysia_%28B3-MU-0%29.png" 
                      alt=""
                      className="object-cover w-full h-auto rounded-full" 
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start w-full">
                    <h1 className="font-semibold">Jimmy Maulana</h1>
                    <p className="text-sm text-gray-500">Frontend</p>
                  </div>
                  <button className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-sm leading-tight text-center lg:gap-5 lg:text-base bg-[#EDF2FF] p-4 rounded-xl">
                  <div className="w-10">
                    <img 
                      src="https://static.wikitide.net/hoyodexwiki/9/92/Elysia_%28B3-MU-0%29.png" 
                      alt=""
                      className="object-cover w-full h-auto rounded-full" 
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start w-full">
                    <h1 className="font-semibold">Jimmy Maulana</h1>
                    <p className="text-sm text-gray-500">Frontend</p>
                  </div>
                  <button className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center gap-2 text-sm leading-tight text-center lg:gap-5 lg:text-base bg-[#EDF2FF] p-4 rounded-xl">
                  <div className="w-10">
                    <img 
                      src="https://static.wikitide.net/hoyodexwiki/9/92/Elysia_%28B3-MU-0%29.png" 
                      alt=""
                      className="object-cover w-full h-auto rounded-full" 
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start w-full">
                    <h1 className="font-semibold">Jimmy Maulana</h1>
                    <p className="text-sm text-gray-500">Frontend</p>
                  </div>
                  <button className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm leading-tight text-center lg:gap-5 lg:text-base bg-[#EDF2FF] p-4 rounded-xl">
                  <div className="w-10">
                    <img 
                      src="https://static.wikitide.net/hoyodexwiki/9/92/Elysia_%28B3-MU-0%29.png" 
                      alt=""
                      className="object-cover w-full h-auto rounded-full" 
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start w-full">
                    <h1 className="font-semibold">Jimmy Maulana</h1>
                    <p className="text-sm text-gray-500">Frontend</p>
                  </div>
                  <button className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm leading-tight text-center lg:gap-5 lg:text-base bg-[#EDF2FF] p-4 rounded-xl">
                  <div className="w-10">
                    <img 
                      src="https://static.wikitide.net/hoyodexwiki/9/92/Elysia_%28B3-MU-0%29.png" 
                      alt=""
                      className="object-cover w-full h-auto rounded-full" 
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start w-full">
                    <h1 className="font-semibold">Jimmy Maulana</h1>
                    <p className="text-sm text-gray-500">Frontend</p>
                  </div>
                  <button className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full mt-2 border-t-2 border-gray-300"></div>
            <div className="flex justify-center w-full gap-2 py-3">
              <button className="flex items-center justify-center px-2 text-sm font-medium text-blue-600 rounded-lg hover:text-gray-500">
                See All Talent
              </button>
            </div>
          </div>
        </div>
        {/*Insight and Status*/}
        <div className="flex gap-4 flex-col md:flex-row lg:flex-col w-full lg:w-[500px]">
          {/*Insight*/}
          <div className="px-6 py-2 bg-white shadow-md rounded-xl xl:h-[62%]">
            <div className="mb-4 text-xl font-semibold">
              <h1>Insight</h1>
            </div>
            <div className="text-sm">
              <p className="mb-2">Discover your organization’s Top 10 strengths and Bottom 5 development areas. Gain insights to support strategic decisions.</p>
              <div className="p-2 rounded-[5px]" style={{
                background: `url(${BgtextureP})`,  
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
                <p className="text-white">Use this information to guide your people strategy and align talent with company goals</p>
              </div>
              <div className="w-full mt-2 border-t-2 border-gray-300"></div>
            <div className="flex justify-end w-full gap-2 py-3">
              <button className="flex items-end justify-end px-2 text-sm font-medium text-blue-600 rounded-lg hover:text-gray-500">
                See All Talent
              </button>
            </div>
            </div>
          </div>
          {/*Status*/}
          <div className="px-6 py-2 bg-white shadow-md rounded-xl xl:h-[38%]">
            <div className="mb-4 text-xl font-semibold">
              <h1>Status</h1>
            </div>
            <div className="flex items-center justify-between gap-6">
              <div className="text-sm">
                <h1 className="font-medium">Kuota Talent DNA</h1>
                <p>Jumlah Kuota</p>
                <h1 className="font-medium">0 Kuota</h1>
              </div>
              <div className="text-sm">
                <h1 className="font-medium">Kuota Talent DNA</h1>
                <p>Jumlah Kuota</p>
                <h1 className="font-medium">0 Kuota</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}