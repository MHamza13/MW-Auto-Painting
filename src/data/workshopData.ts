import sedanResprayImg from "../assets/images/work_sedan_respray_1794744171450.jpg";

export type ServiceId =
  | "Auto Denting & Painting"
  | "Pakar Kereta Antik"
  | "Pakar Mengetuk Dan Mengecat Kereta";

export interface ServiceItem {
  id: ServiceId;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  turnaround: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export interface GalleryProject {
  id: string;
  title: string;
  vehicle: string;
  category: ServiceId;
  finishSpec: string;
  beforeNote: string;
  afterNote: string;
  image: string;
  alt: string;
  beforeImage?: string;
  beforeAlt?: string;
  isUserUploaded?: boolean;
}

const workshopImages = import.meta.glob<string>(
  [
    "../assets/mwautoimages/*.webp",
    "!../assets/mwautoimages/auto-painting-service-promotion-graphic-01.webp",
  ],
  { eager: true, import: "default", query: "?url" },
);

const getWorkshopImage = (fileName: string) => {
  const image = workshopImages[`../assets/mwautoimages/${fileName}`];
  if (!image) {
    throw new Error(`Workshop image not found: ${fileName}`);
  }
  return image;
};

const getWorkshopImageTitle = (fileName: string) =>
  fileName
    .replace(/\.webp$/i, "")
    .split("-")
    .map((word) =>
      word.match(/^\d+$/) ? word : word[0].toUpperCase() + word.slice(1),
    )
    .join(" ");

export const WORKSHOP_GALLERY_PROJECTS: GalleryProject[] = Object.entries(
  workshopImages,
).map(([path, image]) => {
  const fileName = path.split("/").pop() ?? "workshop-photo.webp";
  const title = getWorkshopImageTitle(fileName);
  const isClassicRestoration = /classic|restoration|antique/i.test(fileName);
  const isPanelRepair = /repair|panel|bodywork|preparation|primer/i.test(
    fileName,
  );
  const isPromotion = /promotion-graphic/i.test(fileName);

  return {
    id: `workshop-${fileName.replace(/\.webp$/i, "")}`,
    title,
    vehicle: isPromotion
      ? "Workshop Services · Shah Alam"
      : isClassicRestoration
        ? "Classic Vehicle · Shah Alam"
        : "Customer Vehicle · Shah Alam",
    category: isClassicRestoration
      ? "Pakar Kereta Antik"
      : isPanelRepair
        ? "Pakar Mengetuk Dan Mengecat Kereta"
        : "Auto Denting & Painting",
    finishSpec: "MW Auto Painting · Workshop Photo",
    beforeNote: `Actual workshop photo of ${title.toLowerCase()}.`,
    afterNote: `Shared from the MW Auto Painting workshop in Shah Alam.`,
    image,
    alt: `${title} at the MW Auto Painting workshop`,
  };
});

const workshopExteriorImg = getWorkshopImage("workshop-yard-overview-01.webp");
const classicCarImg = getWorkshopImage(
  "green-classic-car-restoration-booth-01.webp",
);
const panelRepairImg = getWorkshopImage("car-repair.webp");
const freshResprayImg = getWorkshopImage("burgundy-sedan-spray-booth-02.webp");

export const BUSINESS_INFO = {
  brandName: "MW Auto Painting",
  companyName: "PAKMAL ENTERPRISE",
  registrationNo: "SA0190513-D",
  phoneDisplay: "014-3611136",
  phoneTel: "+60143611136",
  whatsappNumber: "60143611136",
  address: "Lot 2793, Jalan Klinik, Kg Bukit Naga, 40460 Shah Alam, Selangor",
  tiktokHandle: "@mw auto painting",
  tiktokUrl: "https://www.tiktok.com/search?q=mw%20auto%20painting",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.3409140638237!2d101.5065277771822!3d3.0026052891695048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdad6c1e28d281%3A0xa59f2cf1c9423de!2sMW%20AUTO%20PAINTING!5e0!3m2!1sen!2s!4v1794975842720!5m2!1sen!2s",
  mapsDirectUrl:
    "https://www.google.com/maps/search/?api=1&query=Lot+2793+Jalan+Klinik+Kg+Bukit+Naga+40460+Shah+Alam+Selangor",
  heroImage: workshopExteriorImg,
  prepImage: panelRepairImg,
};

export const SERVICES: ServiceItem[] = [
  {
    id: "Auto Denting & Painting",
    number: "01",
    title: "Auto Denting & Painting",
    subtitle: "Full Respray, Spot Panel Blending & Collision Finish",
    summary:
      "Complete surface preparation, dent extraction, epoxy priming, and precision color-matched basecoat with high-solid 2K clearcoat for daily drivers and fleet sedans.",
    highlights: [
      "Digital paint code matching & seamless panel blending",
      "Dust-controlled spray booth application & multi-stage wet sanding",
      "Bumper, fender, door & full-body colour change packages",
    ],
    turnaround: "3–7 Working Days",
    image: freshResprayImg,
    imageAlt:
      "Burgundy sedan being refinished inside the MW Auto Painting spray booth",
    featured: true,
  },
  {
    id: "Pakar Kereta Antik",
    number: "02",
    title: "Pakar Kereta Antik",
    subtitle: "Classic & Heritage Vehicle Body Restoration",
    summary:
      "Dedicated craftsmanship for vintage and collector automobiles. We strip corroded layers carefully, treat bare steel against Malaysia’s humidity, and restore period-accurate gloss.",
    highlights: [
      "Bare-metal rust remediation & anti-corrosion sealing",
      "Trim, chrome beading & classic bodyline preservation",
      "Show-grade deep clearcoat finishing & detailing",
    ],
    turnaround: "Custom Schedule",
    image: classicCarImg,
    imageAlt:
      "Green classic car undergoing restoration in the MW Auto Painting spray booth",
  },
  {
    id: "Pakar Mengetuk Dan Mengecat Kereta",
    number: "03",
    title: "Pakar Mengetuk Dan Mengecat Kereta",
    subtitle: "Expert Body Hammering, Panel Beating & Repainting",
    summary:
      "Traditional and modern panel beating to bring creased doors, dented quarter panels, and misaligned body gaps back to original factory geometry before painting.",
    highlights: [
      "Precision dolly-and-hammer metal reshaping with minimal filler",
      "Panel gap alignment for bonnet, doors & boot lid",
      "Smooth feather-edged primer & durable OEM-grade topcoat",
    ],
    turnaround: "2–5 Working Days",
    image: panelRepairImg,
    imageAlt:
      "Car undergoing bodywork preparation at the MW Auto Painting workshop",
  },
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: "sedan-respray",
    title: "Full-Body Midnight Navy Respray",
    vehicle: "Japanese Executive Sedan · 2019",
    category: "Auto Denting & Painting",
    finishSpec: "2K High-Gloss Clearcoat · 3-Stage Polish",
    beforeNote:
      "Sun-oxidised clearcoat, stone chips across hood, and rear bumper scuffs.",
    afterNote:
      "Full booth respray in deep metallic navy with mirror optical clarity.",
    image: sedanResprayImg,
    alt: "Freshly painted deep navy blue sedan inside the MW Auto Painting spray booth",
  },
  {
    id: "classic-coupe",
    title: "Green Classic Car Restoration",
    vehicle: "Classic Vehicle · Shah Alam",
    category: "Pakar Kereta Antik",
    finishSpec: "MW Auto Painting · Workshop Photo",
    beforeNote: "Before photo not yet provided.",
    afterNote:
      "Green classic car photographed inside the workshop spray booth.",
    image: classicCarImg,
    alt: "Green classic car undergoing restoration in the MW Auto Painting spray booth",
  },
];
