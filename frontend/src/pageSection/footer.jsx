import React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import Logo from "../assets/logo.svg";
import TelegramIcon from "../assets/telegram.svg";
import TiktokIcon from "../assets/tiktok.svg";
import InstagramIcon from "../assets/instagram.svg";
import FacebookIcon from "../assets/facebook.svg";

export default function Footer() {
  const isLargeScreen = useMediaQuery("(max-width: 768px)");

  return (
    <footer className="w-full py-8 bg-blue-600 px-[12%] overflow-hidden">
      <div className="container max-w-screen-xl mx-auto">
        {/* Grid Layout for Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-2">
          {/* Company Info */}
          <div className="bg-[#F6FAFF] rounded-[12px] p-4 lg:p-6 flex flex-col lg:grid lg:grid-cols-3 gap-4 w-full">
            {/* Logo and Address Section */}
            <div className="flex flex-col items-center col-span-1 text-center lg:items-start lg:text-left">
              <img
                src={Logo}
                alt="Lintasarta"
                className="w-[80px] md:w-[100px] xl:w-[120px] mb-4 mx-auto lg:mx-0"
              />
              <p className="text-sm text-[#3A3A3A]">Jakarta Pusat Menara Thamrin</p>
              <p className="text-sm text-[#3A3A3A]">
                12th Floor Jl. M.H. Thamrin Kav.3
              </p>
              <p className="text-sm text-[#3A3A3A]">Jakarta 10250</p>
            </div>

            {/* Contact Information Section */}
            <div className="grid grid-cols-2 col-span-2 gap-4 text-center lg:text-left">
              <div>
                <p className="font-medium text-sm text-[#3A3A3A]">
                  Telepon (Hunting)
                </p>
                <p className="text-sm text-[#3A3A3A]">+6221 230 2345</p>
              </div>
              <div>
                <p className="font-medium text-sm text-[#3A3A3A]">
                  Informasi Produk
                </p>
                <p className="text-sm text-[#3A3A3A]">021 230 2347</p>
              </div>
              <div>
                <p className="font-medium text-sm text-[#3A3A3A]">Fax</p>
                <p className="text-sm text-[#3A3A3A]">+6221 230 3567</p>
              </div>
              <div>
                <p className="font-medium text-sm text-[#3A3A3A]">Email</p>
                <p className="text-sm text-[#3A3A3A]">info@lintasarta.co.id</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="bg-white rounded-[12px] p-4 lg:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 text-center lg:text-left">
            <div>
              <h3 className="font-medium">Pages</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Bantuan
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Information</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Help
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Documentation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    AI TalentDNa
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 bg-white rounded-[12px] p-4 flex flex-col lg:flex-row justify-between items-center">
          <p className="mb-4 text-sm lg:mb-0">
            ©Copyright 2024, All right Reserved
          </p>
          <div className="flex flex-col items-center gap-4 lg:flex-row">
            <div className="flex gap-4">
              <img
                src={TelegramIcon}
                alt="Telegram"
                className="w-5 h-5 cursor-pointer"
              />
              <img
                src={TiktokIcon}
                alt="TikTok"
                className="w-5 h-5 cursor-pointer"
              />
              <img
                src={InstagramIcon}
                alt="Instagram"
                className="w-5 h-5 cursor-pointer"
              />
              <img
                src={FacebookIcon}
                alt="Facebook"
                className="w-5 h-5 cursor-pointer"
              />
            </div>
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-blue-600">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-600">
                Terms Of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
