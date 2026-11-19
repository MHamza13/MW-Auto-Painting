import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { BUSINESS_INFO, SERVICES, type ServiceId } from "../data/workshopData";
import { EASE_OUT_EXPO, Reveal } from "./MotionPrimitives";

interface BookingSectionProps {
  selectedService: ServiceId;
  onServiceChange: (service: ServiceId) => void;
}

interface BookingFormState {
  customerName: string;
  contactNumber: string;
  carBrand: string;
  carModel: string;
  carYear: string;
  service: ServiceId;
  problemDetails: string;
  additionalMessage: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedService,
  onServiceChange,
}) => {
  const [formData, setFormData] = useState<Omit<BookingFormState, "service">>({
    customerName: "",
    contactNumber: "",
    carBrand: "",
    carModel: "",
    carYear: "",
    problemDetails: "",
    additionalMessage: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingFormState, string>>
  >({});
  const [preparedWhatsAppUrl, setPreparedWhatsAppUrl] = useState<string | null>(
    null,
  );
  const [copied, setCopied] = useState(false);

  const formattedMessage = useMemo(() => {
    const lines = [
      "*BOOKING INQUIRY — MW AUTO PAINTING*",
      "",
      `*Customer Name:* ${formData.customerName.trim() || "-"}`,
      `*Contact Number:* ${formData.contactNumber.trim() || "-"}`,
      `*Car Details:* ${formData.carBrand.trim() || "-"} ${formData.carModel.trim() || ""} (${formData.carYear.trim() || "-"})`,
      `*Required Service:* ${selectedService}`,
      `*Car Problem / Service Details:* ${formData.problemDetails.trim() || "-"}`,
    ];

    if (formData.additionalMessage.trim()) {
      lines.push(`*Additional Message:* ${formData.additionalMessage.trim()}`);
    }

    lines.push("", "Sent via MW Auto Painting Online Booking Form.");
    return lines.join("\n");
  }, [formData, selectedService]);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof BookingFormState, string>> = {};
    if (!formData.customerName.trim()) {
      nextErrors.customerName = "Please enter your name.";
    }
    const digitsOnly = formData.contactNumber.replace(/[^0-9+]/g, "");
    if (digitsOnly.length < 8) {
      nextErrors.contactNumber =
        "Please enter a valid phone or WhatsApp number.";
    }
    if (!formData.carBrand.trim()) {
      nextErrors.carBrand =
        "Please enter your car brand (e.g., Perodua, Honda).";
    }
    if (!formData.carModel.trim()) {
      nextErrors.carModel = "Please enter your car model.";
    }
    const yearNum = Number(formData.carYear.trim());
    if (
      !formData.carYear.trim() ||
      Number.isNaN(yearNum) ||
      yearNum < 1940 ||
      yearNum > 2027
    ) {
      nextErrors.carYear = "Enter a valid manufacturing year (e.g., 2018).";
    }
    if (!formData.problemDetails.trim()) {
      nextErrors.problemDetails =
        "Briefly describe the dent, scratch, or paint request.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const waUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
      formattedMessage,
    )}`;
    setPreparedWhatsAppUrl(waUrl);

    const tempAnchor = document.createElement("a");
    tempAnchor.href = waUrl;
    tempAnchor.target = "_blank";
    tempAnchor.rel = "noopener noreferrer";
    document.body.appendChild(tempAnchor);
    tempAnchor.click();
    document.body.removeChild(tempAnchor);
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard fallback ignored if restricted
    }
  };

  const updateField = (
    field: keyof Omit<BookingFormState, "service">,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (preparedWhatsAppUrl) {
      setPreparedWhatsAppUrl(null);
    }
  };

  const inputClass = (hasError?: string) =>
    `w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-100 bg-[#1A1A1A] placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
      hasError
        ? "border-red-500 focus:ring-red-200"
        : "border-white/20 focus:border-[#D90F1D] focus:ring-[#D90F1D]/20"
    }`;

  return (
    <section
      id="booking"
      className="py-16 sm:py-24 bg-[#202020] bg-light-grid border-b border-white/10"
    >
      <div className="mx-auto px-4 md:px-24">
        <Reveal className="max-w-2xl">
          <p className="text-xs sm:text-sm font-semibold text-[#D90F1D] tracking-wide">
            Online Service Selection &amp; Booking
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 text-balance">
            Book Your Vehicle Inspection via WhatsApp
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Fill in your vehicle details below. Clicking{" "}
            <strong className="text-slate-100">Send via WhatsApp</strong>{" "}
            formats your inquiry cleanly and opens WhatsApp so you can review
            and send it directly to our workshop team.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <Reveal delay={0.05} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-[#1A1A1A] rounded-2xl border border-white/10 shadow-sm p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-xs font-semibold text-slate-100 mb-1.5"
                  >
                    Customer Name *
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) =>
                      updateField("customerName", e.target.value)
                    }
                    placeholder="e.g., Ahmad Faiz"
                    className={inputClass(errors.customerName)}
                  />
                  {errors.customerName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{errors.customerName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-xs font-semibold text-slate-100 mb-1.5"
                  >
                    Contact Number *
                  </label>
                  <input
                    id="contactNumber"
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={(e) =>
                      updateField("contactNumber", e.target.value)
                    }
                    placeholder="e.g., 012-3456789"
                    className={inputClass(errors.contactNumber)}
                  />
                  {errors.contactNumber && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{errors.contactNumber}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label
                    htmlFor="carBrand"
                    className="block text-xs font-semibold text-slate-100 mb-1.5"
                  >
                    Car Brand *
                  </label>
                  <input
                    id="carBrand"
                    type="text"
                    required
                    value={formData.carBrand}
                    onChange={(e) => updateField("carBrand", e.target.value)}
                    placeholder="e.g., Proton / Honda"
                    className={inputClass(errors.carBrand)}
                  />
                  {errors.carBrand && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{errors.carBrand}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="carModel"
                    className="block text-xs font-semibold text-slate-100 mb-1.5"
                  >
                    Car Model *
                  </label>
                  <input
                    id="carModel"
                    type="text"
                    required
                    value={formData.carModel}
                    onChange={(e) => updateField("carModel", e.target.value)}
                    placeholder="e.g., Civic / Myvi"
                    className={inputClass(errors.carModel)}
                  />
                  {errors.carModel && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{errors.carModel}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="carYear"
                    className="block text-xs font-semibold text-slate-100 mb-1.5"
                  >
                    Car Year *
                  </label>
                  <input
                    id="carYear"
                    type="number"
                    min={1940}
                    max={2027}
                    required
                    value={formData.carYear}
                    onChange={(e) => updateField("carYear", e.target.value)}
                    placeholder="e.g., 2019"
                    className={`${inputClass(errors.carYear)} font-mono tabular-nums`}
                  />
                  {errors.carYear && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{errors.carYear}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="requiredService"
                  className="block text-xs font-semibold text-slate-100 mb-1.5"
                >
                  Required Service *
                </label>
                <select
                  id="requiredService"
                  value={selectedService}
                  onChange={(e) => {
                    onServiceChange(e.target.value as ServiceId);
                    setPreparedWhatsAppUrl(null);
                  }}
                  className={inputClass()}
                >
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.id}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="problemDetails"
                  className="block text-xs font-semibold text-slate-100 mb-1.5"
                >
                  Car Problem / Service Details *
                </label>
                <textarea
                  id="problemDetails"
                  rows={3}
                  required
                  value={formData.problemDetails}
                  onChange={(e) =>
                    updateField("problemDetails", e.target.value)
                  }
                  placeholder="Describe affected panels, dents, rust spots, or whether you want a full-body respray / color change..."
                  className={inputClass(errors.problemDetails)}
                />
                {errors.problemDetails && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle
                      className="w-3.5 h-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{errors.problemDetails}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="additionalMessage"
                  className="block text-xs font-semibold text-slate-100 mb-1.5"
                >
                  Additional Message (Optional)
                </label>
                <textarea
                  id="additionalMessage"
                  rows={2}
                  value={formData.additionalMessage}
                  onChange={(e) =>
                    updateField("additionalMessage", e.target.value)
                  }
                  placeholder="Preferred drop-off day, paint color code if known, or any special requests..."
                  className={inputClass()}
                />
              </div>

              <div className="pt-2 space-y-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="clearcoat-sheen w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#D90F1D] hover:bg-[#B30B17] text-white text-sm sm:text-base font-semibold transition-colors cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D90F1D]"
                >
                  <MessageCircle
                    className="w-5 h-5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Send via WhatsApp</span>
                </motion.button>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Note: Submitting this form opens WhatsApp to discuss your
                  booking. Final confirmation depends on shop availability and
                  discussion with our support team.
                </p>
              </div>

              <AnimatePresence>
                {preparedWhatsAppUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                    role="status"
                    className="rounded-xl border border-[#D90F1D]/35 bg-[#D90F1D]/5 p-4 space-y-3"
                  >
                    <div className="flex items-start gap-2.5 text-sm font-semibold text-[#B30B17]">
                      <CheckCircle2
                        className="w-5 h-5 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>
                        Your WhatsApp booking message is ready! Review and hit
                        Send inside WhatsApp.
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={preparedWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D90F1D] hover:bg-[#B30B17] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Open WhatsApp Chat</span>
                        <ExternalLink
                          className="w-3.5 h-3.5 shrink-0"
                          aria-hidden="true"
                        />
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/20 bg-[#1A1A1A] hover:border-[#D90F1D] text-xs font-semibold text-slate-100 cursor-pointer"
                      >
                        <Copy
                          className="w-3.5 h-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{copied ? "Copied!" : "Copy Message"}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          {/* Live WhatsApp Message Preview Column (Number Removed) */}
          <Reveal delay={0.12} className="lg:col-span-5">
            <aside className="bg-[#191919] text-white rounded-2xl overflow-hidden border border-[#191919] shadow-lg shadow-[#191919]/10">
              <div className="bg-[#0A0A0A] px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#FF4B55]">
                    Live WhatsApp Preview
                  </p>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    MW Auto Painting · Booking Draft
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Copy className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div className="p-6 sm:p-7 space-y-5">
                <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-slate-100 bg-[#0A0A0A] rounded-xl p-4 border border-white/10">
                  {formattedMessage}
                </pre>

                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <p className="font-semibold text-white">
                    How WhatsApp Booking Works:
                  </p>
                  <p>
                    1. Complete the form with your car details and damage or
                    paint request.
                  </p>
                  <p>
                    2. Click &ldquo;Send via WhatsApp&rdquo; to open your
                    formatted draft in WhatsApp.
                  </p>
                  <p>
                    3. You can attach photos of your car inside WhatsApp before
                    pressing send.
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
