import heroBoothImg from "../assets/images/hero_auto_paint_booth_1794744172564.jpg";
import sedanResprayImg from "../assets/images/work_sedan_respray_1794744171450.jpg";
import classicRestorationImg from "../assets/images/work_classic_restoration_1794744172616.jpg";
import dentPanelRepairImg from "../assets/images/work_dent_panel_repair_1794744172575.jpg";
import ceramicClearcoatImg from "../assets/images/work_ceramic_clearcoat_1794744172476.jpg";

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
  isUserUploaded?: boolean;
}

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
    "https://maps.google.com/maps?q=Lot%202793%2C%20Jalan%20Klinik%2C%20Kg%20Bukit%20Naga%2C%2040460%20Shah%20Alam%2C%20Selangor&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapsDirectUrl:
    "https://www.google.com/maps/search/?api=1&query=Lot+2793+Jalan+Klinik+Kg+Bukit+Naga+40460+Shah+Alam+Selangor",
  heroImage: heroBoothImg,
  prepImage: dentPanelRepairImg,
  resprayImage: sedanResprayImg,
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
    image: sedanResprayImg,
    imageAlt:
      "Freshly painted deep navy sedan inside the MW Auto Painting spray booth",
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
    image: classicRestorationImg,
    imageAlt:
      "Restored classic vintage coupe finished in glossy heritage green",
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
    image: dentPanelRepairImg,
    imageAlt: "Technician shaping and block-sanding a repaired fender panel",
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
    title: "Heritage Coupe Bare-Metal Restoration",
    vehicle: "Classic European Coupe · 1974",
    category: "Pakar Kereta Antik",
    finishSpec: "British Racing / Forest Green · Chromework Preserved",
    beforeNote:
      "Aged lacquer cracking, lower sill rust pockets, and uneven door gaps.",
    afterNote:
      "Rust-treated steel, re-aligned trim, and deep heritage green gloss finish.",
    image: classicRestorationImg,
    alt: "Restored classic 1970s vintage coupe finished in glossy deep green paint",
  },
  {
    id: "fender-beating",
    title: "Front Fender Hammering & Primer Prep",
    vehicle: "Modern Touring Sedan · 2021",
    category: "Pakar Mengetuk Dan Mengecat Kereta",
    finishSpec: "Precision Metal Straightening · 2K Epoxy Primer",
    beforeNote:
      "Deep side-impact crease along wheel arch lip and distorted body line.",
    afterNote:
      "Hammered back to factory contour and block-sanded smooth for paint.",
    image: dentPanelRepairImg,
    alt: "Automotive body specialist block-sanding a repaired car fender in primer",
  },
  {
    id: "clearcoat-detail",
    title: "Mirror Clearcoat & Quarter Panel Blend",
    vehicle: "Sport Hatchback · 2022",
    category: "Auto Denting & Painting",
    finishSpec: "Zero Orange-Peel Refinish · Inspection Lit",
    beforeNote:
      "Deep key scratch and clearcoat peel along driver side quarter panel.",
    afterNote:
      "Seamless colour blend and glass-smooth clearcoat inspected under linear LED.",
    image: ceramicClearcoatImg,
    alt: "Close-up reflection on freshly painted dark navy car quarter panel and mirror",
  },
];
