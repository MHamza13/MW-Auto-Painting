import React from "react";
import logo from "../assets/images/logo.png";
import { BUSINESS_INFO } from "../data/workshopData";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#081C38] text-slate-300">
      <div className="mx-auto px-4 md:px-24 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="inline-flex bg-white rounded-lg px-3 py-1.5 w-fit">
              <img
                src={logo}
                alt="MW Auto Painting"
                referrerPolicy="no-referrer"
                className="h-16 w-auto object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {BUSINESS_INFO.companyName}
              </p>
              <p className="text-xs text-slate-300 font-mono tabular-nums">
                Registration: {BUSINESS_INFO.registrationNo}
              </p>
            </div>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-300"
          >
            <a href="#home" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About Us
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#gallery" className="hover:text-white transition-colors">
              Our Work
            </a>
            <a href="#booking" className="hover:text-white transition-colors">
              Book via WhatsApp
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            Copyright &copy; 2026 {BUSINESS_INFO.companyName} (
            {BUSINESS_INFO.brandName}). All rights reserved. Registration:{" "}
            {BUSINESS_INFO.registrationNo}.
          </p>
          <p>{BUSINESS_INFO.address}</p>
        </div>
      </div>
    </footer>
  );
};
