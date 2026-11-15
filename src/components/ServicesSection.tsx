import React, { useState } from "react";
import { ArrowRight, Check, Clock, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { SERVICES, type ServiceId } from "../data/workshopData";
import { EASE_OUT_EXPO, Reveal } from "./MotionPrimitives";

interface ServicesSectionProps {
  onSelectService: (serviceId: ServiceId) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [pointerPos, setPointerPos] = useState({ x: 50, y: 50 });
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleCardMove = (id: string, e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHoveredCard(id);
    setPointerPos({ x, y });
  };

  return (
    <section
      id="services"
      className="py-16 sm:py-24 bg-[#F5F7FA] border-b border-slate-200"
    >
      <div className="mx-auto px-4 md:px-24">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#2D6E35] tracking-wide">
              Our Services
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#0D2D58] text-balance">
              Specialized Automotive Bodywork &amp; Refinishing
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Every service is engineered for clean panel alignment and durable
              2K clearcoat gloss. Choose a service card below to pre-fill your
              booking inquiry.
            </p>
          </div>
          <p className="text-xs font-mono text-slate-500 whitespace-nowrap">
            3 Core Workshop Specialties
          </p>
        </Reveal>

        {/* Rich 3-Column Visual Service Cards */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          {SERVICES.map((service, index) => {
            const isSpotlight = hoveredCard === service.id;
            const hasImgError = imgErrors[service.id];

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.09,
                  ease: EASE_OUT_EXPO,
                }}
                whileHover={{ y: -6 }}
                onMouseMove={(e) => handleCardMove(service.id, e)}
                onMouseLeave={() => setHoveredCard(null)}
                style={
                  isSpotlight
                    ? {
                        backgroundImage: `radial-gradient(420px circle at ${pointerPos.x}% ${pointerPos.y}%, rgba(45, 110, 53, 0.08), transparent 60%)`,
                      }
                    : undefined
                }
                className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200 hover:border-[#0D2D58]/35 shadow-sm hover:shadow-xl hover:shadow-[#0D2D58]/8 transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Service Visual Header */}
                  <div className="relative aspect-[16/10] bg-[#081C38] overflow-hidden">
                    {!hasImgError ? (
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setImgErrors((prev) => ({
                            ...prev,
                            [service.id]: true,
                          }))
                        }
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-white bg-gradient-to-br from-[#0D2D58] to-[#23572A]">
                        <Wrench
                          className="w-8 h-8 mb-2 text-[#5AC266]"
                          aria-hidden="true"
                        />
                        <p className="text-sm font-semibold">{service.title}</p>
                      </div>
                    )}

                    {/* Measured Gradient Scrim */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#081C38]/95 via-[#081C38]/35 to-transparent"
                    />

                    {/* Bottom Card Title Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-xs font-mono font-semibold text-[#5AC266] tabular-nums">
                        {service.number}. {service.subtitle}
                      </p>
                      <h3 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body & Highlights */}
                  <div className="p-6 space-y-5">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.summary}
                    </p>

                    <div className="pt-4 border-t border-slate-100 space-y-2.5">
                      <p className="text-xs font-semibold text-[#0D2D58]">
                        What Is Included
                      </p>
                      <ul className="space-y-2">
                        {service.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-slate-700"
                          >
                            <Check
                              className="w-4 h-4 mt-0.5 text-[#2D6E35] shrink-0"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 pb-6 pt-3 mt-auto space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Clock
                        className="w-3.5 h-3.5 text-[#2D6E35]"
                        aria-hidden="true"
                      />
                      <span>Est. Turnaround</span>
                    </span>
                    <span className="font-mono font-semibold text-[#0D2D58] tabular-nums">
                      {service.turnaround}
                    </span>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectService(service.id)}
                    className="clearcoat-sheen w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0D2D58] group-hover:bg-[#2D6E35] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2D6E35]"
                  >
                    <span>Book This Service</span>
                    <ArrowRight
                      className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </motion.button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
