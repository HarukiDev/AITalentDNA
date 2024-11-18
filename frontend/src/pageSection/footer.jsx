import React from 'react';
import { useMediaQuery } from "@uidotdev/usehooks";
import Logo from "../assets/logo.svg";
import TelegramIcon from "../assets/telegram.svg";
import TiktokIcon from "../assets/tiktok.svg";
import InstagramIcon from "../assets/instagram.svg";
import FacebookIcon from "../assets/facebook.svg";

export default function Footer() {
  const isLargeScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div>
      {isLargeScreen ? (
        <footer className="bg-blue-600 w-full p-4">
          {/* Mobile content... */}
        </footer>
      ) : (
        <footer className="bg-blue-600 w-full p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-3">
              {/* Company Info Card */}
              <div className="bg-white rounded-[12px] p-6 w-full">
                <div className="flex gap-8">
                  {/* Logo and Address Section */}
                  <div className="w-1/2">
                    <div className="w-[150px] mb-6">
                      <img className="w-full h-full bg-cover" src={Logo} alt="Lintasarta" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">Jakarta Pusat Menara Thamrin</p>
                      <p className="text-sm">12th Floor Jl. M.H. Thamrin Kav.3</p>
                      <p className="text-sm">Jakarta 10250</p>
                    </div>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="w-1/2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <p className="text-sm font-medium w-32">Telepfffon (Hunting)</p>
                        <p className="text-sm">+6221 230 2345</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <p className="text-sm font-medium w-32">Informasi Produk</p>
                        <p className="text-sm">021 230 2347</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <p className="text-sm font-medium w-32">Fax</p>
                        <p className="text-sm">+6221 230 3567</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <p className="text-sm font-medium w-32">Email</p>
                        <p className="text-sm">info@lintasarta.co.id</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Links Card */}
              <div className="bg-white rounded-[12px] p-6 w-1/2">
                <div className="grid grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-medium">Pages</h3>
                    <div className="flex flex-col gap-2">
                      <a href="#" className="text-sm hover:text-blue-600">Home</a>
                      <a href="#" className="text-sm hover:text-blue-600">Contact</a>
                      <a href="#" className="text-sm hover:text-blue-600">Bantuan</a>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Information</h3>
                    <div className="flex flex-col gap-2">
                      <a href="#" className="text-sm hover:text-blue-600">Blog</a>
                      <a href="#" className="text-sm hover:text-blue-600">Contact</a>
                      <a href="#" className="text-sm hover:text-blue-600">Helppp</a>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Documentation</h3>
                    <div className="flex flex-col gap-2">
                      <a href="#" className="text-sm hover:text-blue-600">About us</a>
                      <a href="#" className="text-sm hover:text-blue-600">AI TalentDNa</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-4 bg-white rounded-[12px] p-4 flex justify-between items-center">
              <p className="text-sm">©Copyright 2024, All right Reserved</p>
              <div className="flex items-center gap-8">
                <div className="flex gap-4">
                  <img src={TelegramIcon} alt="Telegram" className="w-5 h-5 cursor-pointer" />
                  <img src={TiktokIcon} alt="TikTok" className="w-5 h-5 cursor-pointer" />
                  <img src={InstagramIcon} alt="Instagram" className="w-5 h-5 cursor-pointer" />
                  <img src={FacebookIcon} alt="Facebook" className="w-5 h-5 cursor-pointer" />
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-sm hover:text-blue-600">Privacy Policy</a>
                  <a href="#" className="text-sm hover:text-blue-600">Terms Of Service</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}