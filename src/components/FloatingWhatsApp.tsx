import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { BUSINESS_INFO } from "../data/workshopData";
import { EASE_OUT_EXPO } from "./MotionPrimitives";

export const FloatingWhatsApp: React.FC = () => {
  const quickSupportUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hello MW Auto Painting, I would like to ask about auto painting or denting service.",
  )}`;

  return (
    <motion.a
      initial={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
      href={quickSupportUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MW Auto Painting on WhatsApp"
      className="fixed bottom-6 right-6 z-[9999] inline-flex items-center gap-2.5 h-12 px-5 rounded-full bg-[#D90F1D] hover:bg-[#B30B17] text-white text-sm font-semibold shadow-2xl shadow-black/30 ring-2 ring-white/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D90F1D]"
      style={{
        /* Mobile ke bottom home bar / notch se bachne ke liye safe area padding */
        bottom: "max(1.5rem, env(safe-area-inset-bottom))",
        right: "max(1.5rem, env(safe-area-inset-right))",
      }}
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="whitespace-nowrap">WhatsApp Chat</span>
    </motion.a>
  );
};
