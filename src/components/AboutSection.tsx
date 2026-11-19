import React, { useState } from "react";
import { MapPin, Building2, ExternalLink, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { BUSINESS_INFO } from "../data/workshopData";
import { EASE_OUT_EXPO, Reveal } from "./MotionPrimitives";

const PROCESS_STEPS = [
  {
    step: "01",
    label: "Metal Shaping",
    detail: "Precision dolly & hammer straightening",
  },
  {
    step: "02",
    label: "Epoxy & Block Sand",
    detail: "Anti-rust seal & laser-flat primer",
  },
  {
    step: "03",
    label: "2K Clearcoat Cure",
    detail: "Color-matched booth finish & polish",
  },
];

export const AboutSection: React.FC = () => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section
      id="about"
      className="py-16 sm:py-24 bg-[#1A1A1A] bg-light-grid border-b border-white/10"
    >
      <div className="mx-auto px-4 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Craftsmanship Story & Business Credentials */}
          <Reveal className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#D90F1D] tracking-wide">
                About Our Workshop
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 text-balance">
                Trusted Bodywork &amp; Paint Specialists in Shah Alam
              </h2>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                <strong className="text-slate-100 font-semibold">
                  MW Auto Painting
                </strong>{" "}
                (
                <span className="font-mono text-sm tabular-nums">
                  {BUSINESS_INFO.registrationNo}
                </span>
                ) brings experienced panel beaters and precision spray painters
                together under one roof in Kg Bukit Naga, delivering reliable
                collision repair and factory-grade finishes.
              </p>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                Every vehicle receives methodical surface preparation—proper
                metal hammering before filler, rust sealing, color-code
                verification, and clearcoat depth checks—so the finish holds up
                in Malaysia’s heat and rain, whether it is a daily commuter or a
                cherished classic car.
              </p>

              {/* 3-Step Craftsmanship Strip */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-white/10 py-5">
                {PROCESS_STEPS.map((item) => (
                  <div key={item.step} className="space-y-1">
                    <p className="text-xs font-mono font-semibold text-[#D90F1D] tabular-nums">
                      {item.step}. {item.label}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Clean Hairline Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-100">
                  <Building2
                    className="w-4 h-4 text-[#D90F1D] shrink-0"
                    aria-hidden="true"
                  />
                  <span>Registered Business</span>
                </div>
                <p className="mt-1.5 text-sm font-semibold text-slate-100">
                  {BUSINESS_INFO.brandName}
                </p>
                <p className="text-sm text-slate-300 font-mono tabular-nums">
                  SSM: {BUSINESS_INFO.registrationNo}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-100">
                  <MapPin
                    className="w-4 h-4 text-[#D90F1D] shrink-0"
                    aria-hidden="true"
                  />
                  <span>Workshop Location</span>
                </div>
                <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                  {BUSINESS_INFO.address}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <motion.a
                whileHover={{ y: -2 }}
                transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                href={BUSINESS_INFO.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 bg-[#1A1A1A] hover:border-[#D90F1D] text-sm font-semibold text-slate-100 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D90F1D]"
              >
                <span>Follow on TikTok: {BUSINESS_INFO.tiktokHandle}</span>
                <ExternalLink
                  className="w-4 h-4 text-[#D90F1D] shrink-0"
                  aria-hidden="true"
                />
              </motion.a>

              <a
                href={BUSINESS_INFO.mapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#D90F1D] hover:text-[#B30B17] transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D90F1D]"
              >
                <span>View Workshop Directions</span>
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          {/* Right Column: Full-height Balanced Craftsmanship Visual */}
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="group relative h-full min-h-[340px] rounded-2xl overflow-hidden border border-white/10 bg-[#191919] shadow-sm">
              {!imageFailed ? (
                <img
                  src={BUSINESS_INFO.prepImage}
                  alt="Customer vehicle undergoing bodywork at the MW Auto Painting workshop"
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed(true)}
                  className="w-full h-full object-cover object-center lg:h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full min-h-[340px] flex flex-col items-center justify-center p-8 text-white bg-gradient-to-br from-[#191919] to-[#4A4A4A]">
                  <Wrench
                    className="w-10 h-10 mb-3 text-[#FF4B55]"
                    aria-hidden="true"
                  />
                  <p className="font-semibold text-lg">
                    Precision Bodywork &amp; Surface Prep
                  </p>
                  <p className="text-sm text-slate-300 mt-1">
                    MW Auto Painting · Shah Alam
                  </p>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/70 to-transparent">
                <div className="rounded-xl bg-[#0A0A0A]/75 backdrop-blur-md border border-white/15 p-4">
                  <p className="text-xs font-medium text-[#FF4B55]">
                    Surface Preparation Standard · Kg Bukit Naga
                  </p>
                  <p className="mt-1 text-sm sm:text-base font-semibold text-white">
                    Metal-first panel shaping before primer and 2K clearcoat
                    application
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
