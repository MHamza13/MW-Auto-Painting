import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Car,
  ImagePlus,
  Trash2,
  Upload,
  X,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  BUSINESS_INFO,
  GALLERY_PROJECTS,
  SERVICES,
  WORKSHOP_GALLERY_PROJECTS,
  type GalleryProject,
  type ServiceId,
} from "../data/workshopData";
import { EASE_OUT_EXPO, Reveal } from "./MotionPrimitives";

interface GallerySectionProps {
  onBookSimilar: (serviceId: ServiceId) => void;
}

type FilterOption = "All" | ServiceId;

const STORAGE_KEY = "mw_auto_painting_workshop_gallery_v1";
const GALLERY_PAGE_SIZE = 4;

const FILTER_OPTIONS: { label: string; value: FilterOption }[] = [
  { label: "All Work", value: "All" },
  { label: "Auto Denting & Painting", value: "Auto Denting & Painting" },
  { label: "Pakar Kereta Antik", value: "Pakar Kereta Antik" },
  {
    label: "Body Hammering & Paint",
    value: "Pakar Mengetuk Dan Mengecat Kereta",
  },
];

async function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Invalid image file."));
      img.onload = () => {
        const maxWidth = 1280;
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(String(reader.result));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.84));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

const ProjectCard: React.FC<{
  project: GalleryProject;
  onBookSimilar: (serviceId: ServiceId) => void;
  onInspect: (project: GalleryProject) => void;
  onDelete?: (id: string) => void;
}> = ({ project, onBookSimilar, onInspect, onDelete }) => {
  const [imgError, setImgError] = useState(false);
  const [viewMode, setViewMode] = useState<"after" | "before">("after");

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
      whileHover={{ y: -4 }}
      className="group bg-[#1A1A1A] rounded-2xl border border-white/10 hover:border-[#D90F1D]/30 hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
    >
      <div>
        <div className="relative aspect-[4/3] bg-[#191919] overflow-hidden">
          {!imgError ? (
            <img
              src={
                viewMode === "before" && project.beforeImage
                  ? project.beforeImage
                  : project.image
              }
              alt={
                viewMode === "before" && project.beforeImage
                  ? project.beforeAlt
                  : project.alt
              }
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-white bg-gradient-to-br from-[#191919] to-[#B30B17]">
              <Car className="w-9 h-9 mb-2 text-slate-200" aria-hidden="true" />
              <p className="text-sm font-semibold text-center">
                {project.title}
              </p>
            </div>
          )}

          {/* Hover Zoom Action */}
          <button
            type="button"
            onClick={() => onInspect(project)}
            aria-label={`View full size photo of ${project.title}`}
            className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A0A0A]/85 hover:bg-[#0A0A0A] backdrop-blur-sm text-white text-xs font-semibold transition-opacity opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ZoomIn className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Inspect</span>
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-[#D90F1D]">
              {project.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.vehicle}</span>
            {project.isUserUploaded && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-slate-100">
                  Workshop Upload
                </span>
              </>
            )}
          </div>

          <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-100">
            {project.title}
          </h3>

          <p className="mt-1 text-xs font-mono text-slate-400">
            {project.finishSpec}
          </p>

          {/* Interactive Before / After Scope Toggle */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#202020] border border-white/10">
              {project.beforeImage && (
                <button
                  type="button"
                  onClick={() => setViewMode("before")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    viewMode === "before"
                      ? "bg-[#D90F1D] text-white shadow-sm"
                      : "text-slate-300 hover:text-slate-100"
                  }`}
                >
                  Before Photo
                </button>
              )}
              {project.beforeImage && (
                <button
                  type="button"
                  onClick={() => setViewMode("after")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    viewMode === "after"
                      ? "bg-[#191919] text-white shadow-sm"
                      : "text-slate-300 hover:text-slate-100"
                  }`}
                >
                  After Photo
                </button>
              )}
              {!project.beforeImage && (
                <span className="px-3 py-1.5 text-xs font-semibold text-slate-300">
                  Workshop Photo
                </span>
              )}
            </div>

            <p className="mt-3 min-h-[44px] text-sm text-slate-300 leading-relaxed">
              {viewMode === "after" || !project.beforeImage
                ? project.afterNote
                : project.beforeNote}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onBookSimilar(project.category)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100 hover:text-[#D90F1D] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D90F1D] rounded"
        >
          <span>Request similar job</span>
          <ArrowRight
            className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>

        {project.isUserUploaded && onDelete && (
          <button
            type="button"
            onClick={() => onDelete(project.id)}
            aria-label={`Remove uploaded photo ${project.title}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Remove</span>
          </button>
        )}
      </div>
    </motion.article>
  );
};

export const GallerySection: React.FC<GallerySectionProps> = ({
  onBookSimilar,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [visibleCount, setVisibleCount] = useState(GALLERY_PAGE_SIZE);

  // User-uploaded workshop gallery state (persisted in localStorage)
  const [uploadedProjects, setUploadedProjects] = useState<GalleryProject[]>(
    () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // Ignore storage read errors
      }
      return [];
    },
  );

  const [uploadPanelOpen, setUploadPanelOpen] = useState(false);
  const [pendingPreviews, setPendingPreviews] = useState<
    { name: string; dataUrl: string }[]
  >([]);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadVehicle, setUploadVehicle] = useState("");
  const [uploadCategory, setUploadCategory] = useState<ServiceId>(
    "Auto Denting & Painting",
  );
  const [uploadBeforeNote, setUploadBeforeNote] = useState("");
  const [uploadAfterNote, setUploadAfterNote] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [lightboxProject, setLightboxProject] = useState<GalleryProject | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(uploadedProjects));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [uploadedProjects]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxProject(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const allProjects = [
    ...uploadedProjects,
    ...GALLERY_PROJECTS,
    ...WORKSHOP_GALLERY_PROJECTS,
  ];
  const filteredProjects =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter((project) => project.category === activeFilter);
  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);

    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (imageFiles.length === 0) {
      setUploadError("Please select valid image files (JPG, PNG, or WEBP).");
      return;
    }

    try {
      const processed = await Promise.all(
        imageFiles.slice(0, 6).map(async (file) => ({
          name: file.name.replace(/\.[^.]+$/, ""),
          dataUrl: await compressImageFile(file),
        })),
      );
      setPendingPreviews((prev) => [...prev, ...processed]);
    } catch {
      setUploadError(
        "Could not process one of the selected images. Please try another photo.",
      );
    }
  };

  const handlePublishWorkshopPhotos = (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingPreviews.length === 0) {
      setUploadError("Please select at least one workshop photo to share.");
      return;
    }

    const createdAt = Date.now();
    const newItems: GalleryProject[] = pendingPreviews.map((item, idx) => {
      const baseTitle =
        uploadTitle.trim() || item.name || "MW Auto Painting Workshop Project";
      const title =
        pendingPreviews.length > 1 && uploadTitle.trim()
          ? `${baseTitle} (${idx + 1})`
          : baseTitle;

      return {
        id: `user-${createdAt}-${idx}`,
        title,
        vehicle: uploadVehicle.trim() || "Workshop Project · Shah Alam",
        category: uploadCategory,
        finishSpec: "MW Auto Painting · Shared Workshop Photo",
        beforeNote:
          uploadBeforeNote.trim() ||
          "Vehicle brought to our Shah Alam workshop for inspection and surface preparation.",
        afterNote:
          uploadAfterNote.trim() ||
          "Completed workshop refinishing at MW Auto Painting (PAKMAL ENTERPRISE).",
        image: item.dataUrl,
        alt: `${title} — MW Auto Painting workshop gallery`,
        isUserUploaded: true,
      };
    });

    setUploadedProjects((prev) => [...newItems, ...prev]);
    setPendingPreviews([]);
    setUploadTitle("");
    setUploadVehicle("");
    setUploadBeforeNote("");
    setUploadAfterNote("");
    setUploadError(null);
    setUploadPanelOpen(false);
    setActiveFilter("All");
    setVisibleCount(GALLERY_PAGE_SIZE);
  };

  const handleDeleteUploaded = (id: string) => {
    setUploadedProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section
      id="gallery"
      className="py-16 sm:py-24 bg-[#1A1A1A] border-b border-white/10"
    >
      <div className="mx-auto px-4 md:px-24">
        {/* Section Header + Share Photos Action + Filter Bar */}
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#D90F1D] tracking-wide">
              Gallery &amp; Our Work
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 text-balance">
              Workshop Photos &amp; Vehicle Restorations
            </h2>
            <p className="mt-3 text-base text-slate-300 leading-relaxed">
              Browse real workshop photos, paintwork, and classic restorations,
              or share more photos from your workshop.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUploadPanelOpen((prev) => !prev)}
              className="clearcoat-sheen inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D90F1D] hover:bg-[#B30B17] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D90F1D]"
            >
              <ImagePlus className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                {uploadPanelOpen
                  ? "Close Photo Uploader"
                  : "Share Workshop Photos"}
              </span>
            </motion.button>
          </div>
        </Reveal>

        {/* Workshop Photo Share / Upload Studio Panel */}
        <AnimatePresence>
          {uploadPanelOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
              className="mt-8 rounded-2xl border border-[#D90F1D]/30 bg-[#202020] p-6 sm:p-8"
            >
              <form
                onSubmit={handlePublishWorkshopPhotos}
                className="space-y-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">
                      Share Your Workshop Images to the Gallery
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Select one or more photos from your phone or computer to
                      add them straight into the gallery showcase below.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadPanelOpen(false)}
                    aria-label="Close uploader"
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#1A1A1A] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Drag & Drop Image Picker */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingFile(true);
                  }}
                  onDragLeave={() => setIsDraggingFile(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingFile(false);
                    handleFilesSelected(e.dataTransfer.files);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  className={`rounded-xl border-2 border-dashed p-6 sm:p-8 text-center cursor-pointer transition-colors ${
                    isDraggingFile
                      ? "border-[#D90F1D] bg-[#D90F1D]/10"
                      : "border-white/20 bg-[#1A1A1A] hover:border-[#D90F1D]"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFilesSelected(e.target.files)}
                    className="hidden"
                  />
                  <Upload
                    className="w-8 h-8 mx-auto text-[#D90F1D] mb-2"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold text-slate-100">
                    Click to choose workshop photos or drag &amp; drop here
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports JPG, PNG, and WEBP (up to 6 images per upload)
                  </p>
                </div>

                {/* Selected Thumbnail Previews */}
                {pendingPreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {pendingPreviews.map((item, idx) => (
                      <div
                        key={`${item.name}-${idx}`}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10 bg-slate-900"
                      >
                        <img
                          src={item.dataUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setPendingPreviews((prev) =>
                              prev.filter((_, i) => i !== idx),
                            )
                          }
                          aria-label={`Remove ${item.name}`}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[#0A0A0A]/85 text-white flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Details Form */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="uploadTitle"
                      className="block text-xs font-semibold text-slate-100 mb-1.5"
                    >
                      Project Title
                    </label>
                    <input
                      id="uploadTitle"
                      type="text"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="e.g., Proton Saga Full Respray"
                      className="w-full rounded-lg border border-white/20 bg-[#1A1A1A] px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-[#D90F1D]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="uploadVehicle"
                      className="block text-xs font-semibold text-slate-100 mb-1.5"
                    >
                      Car Model / Year
                    </label>
                    <input
                      id="uploadVehicle"
                      type="text"
                      value={uploadVehicle}
                      onChange={(e) => setUploadVehicle(e.target.value)}
                      placeholder="e.g., Perodua Myvi · 2020"
                      className="w-full rounded-lg border border-white/20 bg-[#1A1A1A] px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-[#D90F1D]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="uploadCategory"
                      className="block text-xs font-semibold text-slate-100 mb-1.5"
                    >
                      Service Category
                    </label>
                    <select
                      id="uploadCategory"
                      value={uploadCategory}
                      onChange={(e) =>
                        setUploadCategory(e.target.value as ServiceId)
                      }
                      className="w-full rounded-lg border border-white/20 bg-[#1A1A1A] px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-[#D90F1D]"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.id}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="uploadAfterNote"
                      className="block text-xs font-semibold text-slate-100 mb-1.5"
                    >
                      Completed Work Description (After Finish)
                    </label>
                    <input
                      id="uploadAfterNote"
                      type="text"
                      value={uploadAfterNote}
                      onChange={(e) => setUploadAfterNote(e.target.value)}
                      placeholder="e.g., Full metallic clearcoat spray & buff polish"
                      className="w-full rounded-lg border border-white/20 bg-[#1A1A1A] px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-[#D90F1D]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="uploadBeforeNote"
                      className="block text-xs font-semibold text-slate-100 mb-1.5"
                    >
                      Initial Condition (Before Note, Optional)
                    </label>
                    <input
                      id="uploadBeforeNote"
                      type="text"
                      value={uploadBeforeNote}
                      onChange={(e) => setUploadBeforeNote(e.target.value)}
                      placeholder="e.g., Faded bonnet paint and rear door dent"
                      className="w-full rounded-lg border border-white/20 bg-[#1A1A1A] px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-[#D90F1D]"
                    />
                  </div>
                </div>

                {uploadError && (
                  <p className="text-xs font-medium text-red-600">
                    {uploadError}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPendingPreviews([]);
                      setUploadPanelOpen(false);
                    }}
                    className="px-4 py-2 rounded-lg border border-white/20 bg-[#1A1A1A] text-xs sm:text-sm font-semibold text-slate-300 hover:border-[#D90F1D] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#191919] hover:bg-[#363636] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    <ImagePlus
                      className="w-4 h-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>Add to Workshop Gallery</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter gallery projects by service"
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#202020] border border-white/10"
          >
            {FILTER_OPTIONS.map((option) => {
              const isActive = activeFilter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveFilter(option.value);
                    setVisibleCount(GALLERY_PAGE_SIZE);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D90F1D] ${
                    isActive
                      ? "bg-[#191919] text-white shadow-sm"
                      : "text-slate-300 hover:text-slate-100 hover:bg-[#1A1A1A]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <p className="text-xs font-mono text-slate-400 tabular-nums">
            Showing {Math.min(visibleCount, filteredProjects.length)} of{" "}
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "Photo" : "Photos"}
          </p>
        </div>

        {/* Animated Filtered Project Cards Grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onBookSimilar={onBookSimilar}
                onInspect={setLightboxProject}
                onDelete={
                  project.isUserUploaded ? handleDeleteUploaded : undefined
                }
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleCount < filteredProjects.length && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((count) =>
                  Math.min(count + GALLERY_PAGE_SIZE, filteredProjects.length),
                )
              }
              className="px-6 py-3 rounded-xl bg-[#191919] hover:bg-[#363636] text-white text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D90F1D]"
            >
              Show More Photos
            </button>
          </div>
        )}
      </div>

      {/* Full-Size Workshop Photo Lightbox Modal */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxProject(null)}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/88 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
                <div>
                  <p className="text-xs font-semibold text-[#D90F1D]">
                    {lightboxProject.category} · {lightboxProject.vehicle}
                  </p>
                  <h3 className="text-lg font-bold text-slate-100">
                    {lightboxProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxProject(null)}
                  aria-label="Close photo preview"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#292929] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-[#0A0A0A] max-h-[65vh] flex items-center justify-center overflow-hidden">
                <img
                  src={lightboxProject.image}
                  alt={lightboxProject.alt}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[65vh] object-contain"
                />
              </div>
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#202020]">
                <p className="text-sm text-slate-300">
                  {lightboxProject.afterNote}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const cat = lightboxProject.category;
                    setLightboxProject(null);
                    onBookSimilar(cat);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D90F1D] hover:bg-[#B30B17] text-white text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Book Similar Job</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
