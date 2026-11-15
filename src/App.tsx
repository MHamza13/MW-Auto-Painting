import React, { useState } from "react";
import { MotionConfig } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { GallerySection } from "./components/GallerySection";
import { BookingSection } from "./components/BookingSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { type ServiceId } from "./data/workshopData";

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceId>(
    "Auto Denting & Painting",
  );

  const scrollToBooking = () => {
    const bookingEl = document.getElementById("booking");
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectService = (serviceId: ServiceId) => {
    setSelectedService(serviceId);
    scrollToBooking();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#0D2D58]">
        <Navbar onBookClick={scrollToBooking} />

        <main className="flex-1">
          <Hero onBookNow={scrollToBooking} />
          <AboutSection />
          <ServicesSection onSelectService={handleSelectService} />
          <GallerySection onBookSimilar={handleSelectService} />
          <BookingSection
            selectedService={selectedService}
            onServiceChange={setSelectedService}
          />
          <ContactSection />
        </main>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </MotionConfig>
  );
}
