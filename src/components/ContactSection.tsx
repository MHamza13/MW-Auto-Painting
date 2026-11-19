import React from "react";
import { Phone, MessageCircle, MapPin, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { BUSINESS_INFO } from "../data/workshopData";
import { EASE_OUT_EXPO, Reveal } from "./MotionPrimitives";

export const ContactSection: React.FC = () => {
  const supportWhatsAppUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hello MW Auto Painting, I need workshop support / location details.",
  )}`;

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-[#1A1A1A] border-b border-white/10"
    >
      <div className="mx-auto px-4 md:px-24">
        <Reveal className="max-w-2xl">
          <p className="text-xs sm:text-sm font-semibold text-[#D90F1D] tracking-wide">
            Location, Contact &amp; Support
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 text-balance">
            Visit Our Shah Alam Workshop or Reach Us Directly
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Drop by for an on-site paint and bodywork assessment, or call and
            WhatsApp our team directly.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Column */}
          <Reveal
            delay={0.05}
            className="lg:col-span-5 flex flex-col justify-between space-y-6 rounded-2xl border border-white/10 bg-[#202020] p-6 sm:p-8"
          >
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Direct Phone Contact
                </p>
                <a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="mt-1.5 inline-flex items-center gap-2.5 text-xl font-bold font-mono tabular-nums text-slate-100 hover:text-[#D90F1D] transition-colors"
                >
                  <Phone
                    className="w-5 h-5 text-[#D90F1D] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              <div className="pt-5 border-t border-white/10">
                <p className="text-xs font-semibold text-slate-400">
                  Workshop Address
                </p>
                <div className="mt-1.5 flex items-start gap-2.5">
                  <MapPin
                    className="w-5 h-5 text-[#D90F1D] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10">
                <p className="text-xs font-semibold text-slate-400">
                  Social Showcase
                </p>
                <a
                  href={BUSINESS_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-100 hover:text-[#D90F1D] transition-colors"
                >
                  <span>TikTok: {BUSINESS_INFO.tiktokHandle}</span>
                  <ExternalLink
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                href={supportWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="clearcoat-sheen flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#D90F1D] hover:bg-[#B30B17] text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <MessageCircle
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                />
                <span>WhatsApp Support</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/20 bg-[#1A1A1A] hover:border-[#D90F1D] text-slate-100 text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Call Workshop</span>
              </motion.a>
            </div>
          </Reveal>

          {/* Google Maps Embed Container */}
          <Reveal
            delay={0.12}
            className="lg:col-span-7 flex flex-col rounded-2xl border border-white/10 overflow-hidden bg-[#292929] min-h-[340px] shadow-sm"
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-[#191919] text-white">
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">
                  MW Auto Painting · Kg Bukit Naga, Shah Alam
                </p>
                <p className="text-xs text-slate-300 truncate">
                  Lot 2793, Jalan Klinik, 40460 Shah Alam
                </p>
              </div>
              <a
                href={BUSINESS_INFO.mapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D90F1D] hover:bg-[#F32936] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <span>Open Maps</span>
                <ExternalLink
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
              </a>
            </div>

            <div className="relative flex-1 min-h-[290px]">
              <iframe
                title="MW Auto Painting Workshop Location — Lot 2793, Jalan Klinik, Kg Bukit Naga, Shah Alam"
                src={BUSINESS_INFO.mapsEmbedUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full min-h-[290px] border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
