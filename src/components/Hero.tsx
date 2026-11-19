import React, { useState } from "react";
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { BUSINESS_INFO } from "../data/workshopData";
import { EASE_OUT_EXPO } from "./MotionPrimitives";

interface HeroProps {
  onBookNow: () => void;
}

const PAINT_SWATCHES = [
  {
    name: "Midnight Navy",
    finish: "2K Pearl Metallic",
    gradient: "from-[#1D569E] via-[#0F315E] to-[#06152B]",
  },
  {
    name: "Heritage Green",
    finish: "Classic British Gloss",
    gradient: "from-[#439E4E] via-[#26612D] to-[#113015]",
  },
  {
    name: "Nardo Grey",
    finish: "Modern Solid Gloss",
    gradient: "from-[#9CA3AF] via-[#6B7280] to-[#4B5563]",
  },
  {
    name: "Soul Crystal Red",
    finish: "Deep Candy Metallic",
    gradient: "from-[#DC2626] via-[#991B1B] to-[#450A0A]",
  },
  {
    name: "Championship White",
    finish: "OEM Type-R Solid",
    gradient: "from-[#FFFFFF] via-[#F3F4F6] to-[#D1D5DB]",
  },
  {
    name: "Obsidian Black",
    finish: "Mirror Piano Clear",
    gradient: "from-[#374151] via-[#111827] to-[#030712]",
  },
  {
    name: "OEM Liquid Silver",
    finish: "Fine Aluminum Flake",
    gradient: "from-[#F1F5F9] via-[#CBD5E1] to-[#64748B]",
  },
  {
    name: "Bayside Blue",
    finish: "JDM Performance Pearl",
    gradient: "from-[#38BDF8] via-[#0284C7] to-[#0C4A6E]",
  },
  {
    name: "Champagne Bronze",
    finish: "Vintage Satin Metallic",
    gradient: "from-[#D6B88D] via-[#9C7A4C] to-[#543E21]",
  },
];

export const Hero: React.FC<HeroProps> = ({ onBookNow }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [selectedSwatch, setSelectedSwatch] = useState(PAINT_SWATCHES[0]);

  const directWhatsAppUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hello MW Auto Painting, I would like to inquire about auto painting / denting services.",
  )}`;

  return (
    <section id="home" className="bg-[#0A0A0A] text-white overflow-hidden">
      <div className="relative">
        {/* Background Workshop Photography with Subtle Cinematic Settling Zoom */}
        {!imageFailed ? (
          <motion.img
            src={BUSINESS_INFO.heroImage}
            alt="MW Auto Painting workshop yard with customer vehicles in Shah Alam"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            initial={{ scale: 1.06, opacity: 0.35 }}
            animate={{ scale: 1, opacity: 0.52 }}
            transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#191919] to-[#8F0D15]" />
        )}

        {/* Charcoal and red architectural scrim with a subtle workshop grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/88 to-[#0A0A0A]/50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-workshop-grid opacity-70"
        />

        {/* Subtle ambient red spotlight glow behind hero content */}
        <div
          aria-hidden="true"
          className="absolute -bottom-24 right-1/4 w-[420px] h-[420px] rounded-full bg-[#D90F1D]/20 blur-[110px] pointer-events-none"
        />

        <div className="relative mx-auto px-4 md:px-24 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                className="text-xs sm:text-sm font-medium tracking-wide text-slate-300 mb-4 flex flex-wrap items-center gap-x-2 gap-y-1"
              >
                <span className="text-white font-semibold">
                  {BUSINESS_INFO.brandName}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  SSM {BUSINESS_INFO.registrationNo}
                </span>
                <span aria-hidden="true">·</span>
                <span>Kg Bukit Naga, Shah Alam</span>
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08,
                  ease: EASE_OUT_EXPO,
                }}
                className="text-[clamp(2.25rem,4.5vw,3.85rem)] font-bold tracking-tight leading-[1.06] text-white text-balance"
              >
                Precision Auto Painting, Denting &amp; Classic Restoration
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.16,
                  ease: EASE_OUT_EXPO,
                }}
                className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl"
              >
                From daily collision panel repair and factory-matched full
                resprays to{" "}
                <span className="text-white font-semibold">
                  Pakar Kereta Antik
                </span>{" "}
                and{" "}
                <span className="text-white font-semibold">
                  Pakar Mengetuk Dan Mengecat Kereta
                </span>
                , we restore every bodyline with workshop discipline.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.24,
                  ease: EASE_OUT_EXPO,
                }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBookNow}
                  className="clearcoat-sheen inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#D90F1D] hover:bg-[#F32936] text-white text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-lg shadow-[#D90F1D]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] focus-visible:ring-[#F32936]"
                >
                  <span>Book Service Now</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg border border-white/25 bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] focus-visible:ring-white"
                >
                  <MessageCircle
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Contact on WhatsApp</span>
                </motion.a>
              </motion.div>
            </div>

            {/* Right-Side Architectural 9-Color Automotive Paint Swatch Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: EASE_OUT_EXPO }}
              className="hidden lg:block lg:col-span-5"
            >
              <div className="rounded-2xl border border-white/15 bg-[#191919]/85 backdrop-blur-md p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Sparkles
                      className="w-3.5 h-3.5 text-[#FF4B55]"
                      aria-hidden="true"
                    />
                    <span>Popular Refinishing Palette</span>
                  </span>
                  <span className="font-mono text-[#FF4B55]">
                    2K High-Solid Clear
                  </span>
                </div>

                {/* 3x3 Interactive Automotive Paint Swatches */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {PAINT_SWATCHES.map((swatch) => {
                    const isSelected = selectedSwatch.name === swatch.name;
                    return (
                      <button
                        key={swatch.name}
                        type="button"
                        onClick={() => setSelectedSwatch(swatch)}
                        className={`group text-left rounded-xl p-1.5 transition-all cursor-pointer border ${
                          isSelected
                            ? "bg-white/15 border-[#FF4B55] shadow-md"
                            : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        <div
                          className={`h-9 w-full rounded-lg bg-gradient-to-br ${swatch.gradient} border border-white/25 shadow-inner relative overflow-hidden`}
                        >
                          {/* Subtle Clearcoat Gloss Reflection */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-white/30 opacity-80" />
                        </div>
                        <p className="mt-1.5 text-[11px] font-medium text-slate-200 truncate group-hover:text-white">
                          {swatch.name}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Color Preview Strip */}
                <div className="flex items-center justify-between rounded-lg bg-[#0A0A0A]/70 border border-white/10 px-3 py-2 text-xs">
                  <span className="text-slate-300">
                    Selected:{" "}
                    <strong className="text-white">
                      {selectedSwatch.name}
                    </strong>
                  </span>
                  <span className="font-mono text-[11px] text-[#FF4B55]">
                    {selectedSwatch.finish}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-white/10">
                  Color-matched basecoat, bare-metal rust protection, and
                  multi-stage wet sanding inside our Shah Alam facility.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Workshop Credentials Bar */}
      <div className="border-t border-white/10 bg-[#191919]">
        <div className="mx-auto px-4 md:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25, ease: EASE_OUT_EXPO }}
              className="py-5 sm:pr-6"
            >
              <p className="text-xs font-medium text-slate-300">Managed By</p>
              <p className="mt-1 text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck
                  className="w-4 h-4 text-[#FF4B55] shrink-0"
                  aria-hidden="true"
                />
                <span>{BUSINESS_INFO.companyName}</span>
              </p>
              <p className="mt-0.5 text-xs font-mono tabular-nums text-slate-300">
                Reg: {BUSINESS_INFO.registrationNo}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3, ease: EASE_OUT_EXPO }}
              className="py-5 sm:px-6"
            >
              <p className="text-xs font-medium text-slate-300">
                Core Craftsmanship
              </p>
              <p className="mt-1 text-base font-bold text-white">
                Denting, Respray &amp; Antik
              </p>
              <p className="mt-0.5 text-xs text-slate-300">
                Daily sedans to classic restorations
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35, ease: EASE_OUT_EXPO }}
              className="py-5 sm:px-6"
            >
              <p className="text-xs font-medium text-slate-300">
                Shah Alam Workshop
              </p>
              <p className="mt-1 text-base font-bold text-white">
                Kg Bukit Naga, 40460
              </p>
              <p className="mt-0.5 text-xs text-slate-300">
                Lot 2793, Jalan Klinik
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4, ease: EASE_OUT_EXPO }}
              className="py-5 sm:pl-6"
            >
              <p className="text-xs font-medium text-slate-300">
                Direct Booking Line
              </p>
              <p className="mt-1 text-base font-bold font-mono tabular-nums text-white">
                {BUSINESS_INFO.phoneDisplay}
              </p>
              <p className="mt-0.5 text-xs text-slate-300">
                Fast estimate via WhatsApp
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
