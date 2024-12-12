import React from "react";
import BgTextureCard2 from "../../assets/bg-textureCard2.svg";
import logoMBF from "../../assets/logoMBF.svg";
import logoMBP from "../../assets/logoMBP.svg";
import BgtextureP from "../../assets/bgtextureP.svg";
import { motion } from "framer-motion";
import OurTalent from "./ourTalent";
import AdindaSection from "./adindaSection";
import InsightModal from "./insightModal";

export default function DashboardContent() {
  return (
    <div className="px-[12%] h-full py-32">
      <div className="flex flex-col gap-4 xl:flex-row">
        {/* Adinda Section */}
        <AdindaSection />

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
              <a 
                href="/jobfit?section=jobfit" 
                className="px-2 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 w-[50%] h-[40px] flex justify-center items-center"
              >
                Job Fit
              </a>
              <a
                href="/jobfit?section=culturefit" 
                className="px-2 py-3 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 w-[50%] h-[40px] flex justify-center items-center"
              >
                Culture Fit
              </a>
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
              <a 
                href="/MatchingByPerson?section=findByTalentDNA" 
                className="z-10 px-2 py-3 text-sm font-medium text-blue-600 bg-[#FFFFFF] rounded-lg hover:bg-blue-50 w-[50%] h-[40px] flex justify-center items-center"
              >
                TalentDNA
              </a>
              <a 
                href="/MatchingByPerson?section=findByName" 
                className="z-10 px-2 py-3 text-sm font-medium text-white border border-[#FFFFFF] rounded-lg hover:bg-[#3e58da] w-[50%] h-[40px] flex justify-center items-center"
              >
                Person Name
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 pt-4 lg:flex-row">
        {/*Our Talent*/}
        <OurTalent />
        
        <div className="flex gap-4 flex-col md:flex-row lg:flex-col w-full lg:w-[500px] h-[70%]"> 
          {/*Insight and Status*/}
          <InsightModal />
            
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