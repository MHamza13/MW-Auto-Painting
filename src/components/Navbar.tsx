import React, { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { EASE_OUT_EXPO } from "./MotionPrimitives";
import logo from "../assets/images/logo.png";

interface NavbarProps {
  onBookClick: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  const handleNavAction = () => {
    setMobileMenuOpen(false);
    onBookClick();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/92 backdrop-blur-md border-b border-slate-200/80">
      <div className="mx-auto px-4 md:px-24">
        <div className="h-24 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Logo */}
          <a
            href="#home"
            className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6E35] rounded-md transition-transform duration-150 hover:scale-[1.01]"
            aria-label="MW Auto Painting — PAKMAL ENTERPRISE Home"
          >
            <img
              src={logo}
              alt="MW Auto Painting"
              referrerPolicy="no-referrer"
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </a>

          {/* Zone 2: Single-line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#0D2D58]"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 whitespace-nowrap shrink-0 text-[#0D2D58]/80 hover:text-[#2D6E35] transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#2D6E35] hover:after:w-full after:transition-all after:duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6E35] rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNavAction}
              className="clearcoat-sheen hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2D6E35] hover:bg-[#23572A] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2D6E35]"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Book via WhatsApp</span>
            </motion.button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-200 text-[#0D2D58] hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6E35]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Progress Hairline */}
      <motion.div
        aria-hidden="true"
        className="h-[2px] bg-gradient-to-r from-[#0D2D58] via-[#2D6E35] to-[#5AC266] origin-left"
        style={{ scaleX }}
      />

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-lg"
          >
            <nav
              aria-label="Mobile Navigation"
              className="flex flex-col space-y-1"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#0D2D58] hover:bg-[#F5F7FA] hover:text-[#2D6E35] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleNavAction}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#2D6E35] hover:bg-[#23572A] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <MessageCircle
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                />
                <span>Book via WhatsApp</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
