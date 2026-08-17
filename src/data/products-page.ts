export const productFilterCategories = [
  "All",
  "Power Equipment",
  "Telecom",
  "Fiber",
  "Automation",
  "Renewable",
  "Security",
  "IoT",
  "Electrical",
  "Networking",
] as const;

export type ProductFilterCategory = (typeof productFilterCategories)[number];

export type ProductDownloadDoc = {
  id: string;
  title: string;
  fileType: "PDF";
  size: string;
  href: string;
};

export type PortfolioProduct = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: ProductFilterCategory;
  industry: string;
  brand: string;
  technology: string;
  application: string;
  certification: string;
  features: string[];
  applications: string[];
  popular: number;
  featured?: boolean;
  compareSpecs: { label: string; value: string }[];
  relatedServices: string[];
  relatedProjects: string[];
  relatedNews: string[];
};

const DOC_SIZES = {
  catalogue: "2.4 MB",
  datasheet: "1.2 MB",
  install: "1.6 MB",
  compliance: "0.8 MB",
  warranty: "0.5 MB",
} as const;

/** Per-product document pack (enterprise catalogue — not e-commerce). */
export function getProductDownloads(product: PortfolioProduct): ProductDownloadDoc[] {
  const base = `#download-${product.slug}`;
  return [
    { id: `${product.id}-cat`, title: "PDF Catalogue", fileType: "PDF", size: DOC_SIZES.catalogue, href: base },
    { id: `${product.id}-ds`, title: "Technical Datasheet", fileType: "PDF", size: DOC_SIZES.datasheet, href: `${base}-datasheet` },
    { id: `${product.id}-ig`, title: "Installation Guide", fileType: "PDF", size: DOC_SIZES.install, href: `${base}-install` },
    { id: `${product.id}-cc`, title: "Compliance Certificate", fileType: "PDF", size: DOC_SIZES.compliance, href: `${base}-compliance` },
    { id: `${product.id}-wr`, title: "Warranty Information", fileType: "PDF", size: DOC_SIZES.warranty, href: `${base}-warranty` },
  ];
}

export function getProductDatasheetHref(product: PortfolioProduct) {
  return getProductDownloads(product)[1].href;
}

export const productFinderRequirements = [
  "High Reliability",
  "Mission-Critical Backup",
  "Energy Efficiency",
  "Smart Monitoring",
  "Standards Compliance",
  "Scalable Deployment",
] as const;

export type ProductFinderRequirement = (typeof productFinderRequirements)[number];

const requirementMatchers: Record<ProductFinderRequirement, (p: PortfolioProduct) => boolean> = {
  "High Reliability": (p) =>
    /reliab|utility|industrial|continuous|duty/i.test([...p.features, ...p.compareSpecs.map((s) => s.value)].join(" ")),
  "Mission-Critical Backup": (p) =>
    /backup|dc|uninterrupt|critical|standby/i.test([p.application, ...p.features, p.technology].join(" ")),
  "Energy Efficiency": (p) =>
    /energy|led|solar|pv|efficient/i.test([p.certification, p.technology, ...p.features].join(" ")),
  "Smart Monitoring": (p) =>
    /monitor|iot|smart|cloud|control/i.test([p.technology, ...p.features, p.application].join(" ")),
  "Standards Compliance": (p) =>
    ["IEC", "IEEE", "ISO", "CE", "RoHS"].includes(p.certification),
  "Scalable Deployment": (p) =>
    /modular|scalable|utility|enterprise|field/i.test([...p.features, p.description].join(" ")),
};

export function recommendProducts(input: {
  industry: string;
  application: string;
  requirement: ProductFinderRequirement;
}) {
  const scored = portfolioProducts.map((p) => {
    let score = 0;
    if (p.industry === input.industry) score += 3;
    if (p.application === input.application || p.applications.includes(input.application)) score += 3;
    if (p.applications.some((a) => a.toLowerCase().includes(input.application.toLowerCase().slice(0, 6)))) score += 1;
    if (requirementMatchers[input.requirement](p)) score += 2;
    return { product: p, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.product.popular - a.product.popular)
    .slice(0, 6)
    .map((s) => s.product);
}

export function getProductApplicationsList() {
  return Array.from(new Set(portfolioProducts.map((p) => p.application))).sort();
}

export const productsHero = {
  label: "PORTFOLIO",
  headline: "Engineering Products",
  subtitle:
    "Discover enterprise-grade engineering products designed for power, telecom, renewable energy, industrial automation, infrastructure, and smart technology applications.",
  image:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=85&auto=format&fit=crop",
  primaryCta: { label: "Explore Products", href: "#products-grid" },
  secondaryCta: { label: "Download Catalogue", href: "#downloads" },
};

export const portfolioProducts: PortfolioProduct[] = [
  {
    id: "ac-power-systems",
    slug: "ac-power-systems",
    title: "AC Power Systems",
    description:
      "Advanced AC power distribution systems designed for industrial, commercial, and utility-scale applications.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=85&auto=format&fit=crop",
    category: "Power Equipment",
    industry: "Power Utilities",
    brand: "HS Power",
    technology: "Distribution",
    application: "Utility & Industrial",
    certification: "IEC",
    features: ["High reliability", "Modular design", "Utility ready"],
    applications: ["Substations", "Industrial plants", "Commercial facilities"],
    popular: 96,
    featured: true,
    compareSpecs: [
      { label: "Voltage Class", value: "LV / MV" },
      { label: "Duty", value: "Continuous" },
      { label: "Standard", value: "IEC" },
    ],
    relatedServices: ["power-utility-systems", "electrical-mechanical-works"],
    relatedProjects: ["national-grid-substation", "hospital-power-reliability"],
    relatedNews: ["hs-group-expands-power-telecom-infrastructure"],
  },
  {
    id: "battery-rectifier",
    slug: "battery-rectifier",
    title: "Battery & Rectifier Systems",
    description:
      "High-performance battery systems and rectifiers ensuring uninterrupted power for critical operations.",
    image:
      "https://images.unsplash.com/photo-1599305445873-6a00a533015e?w=1400&q=85&auto=format&fit=crop",
    category: "Power Equipment",
    industry: "Telecom Operators",
    brand: "HS Power",
    technology: "DC Power",
    application: "Critical Backup",
    certification: "ISO",
    features: ["Uninterrupted supply", "Telecom grade", "Monitoring ready"],
    applications: ["Telecom rooms", "Data centers", "Control rooms"],
    popular: 92,
    featured: true,
    compareSpecs: [
      { label: "Output", value: "DC Critical" },
      { label: "Runtime", value: "Configurable" },
      { label: "Standard", value: "ISO" },
    ],
    relatedServices: ["telecom-infrastructure", "power-utility-systems"],
    relatedProjects: ["telecom-tower-nationwide", "industrial-data-center"],
    relatedNews: ["hs-group-expands-power-telecom-infrastructure"],
  },
  {
    id: "ac-generators",
    slug: "ac-generators",
    title: "AC Generators",
    description:
      "Robust AC generators delivering dependable backup and primary power for diverse industrial needs.",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=85&auto=format&fit=crop",
    category: "Power Equipment",
    industry: "Industrial Plants",
    brand: "HS Power",
    technology: "Generation",
    application: "Backup Power",
    certification: "CE",
    features: ["Industrial duty", "Fast start", "Serviceable design"],
    applications: ["Factories", "Healthcare", "Commercial campuses"],
    popular: 88,
    featured: true,
    compareSpecs: [
      { label: "Duty", value: "Standby / Prime" },
      { label: "Fuel", value: "Diesel" },
      { label: "Standard", value: "CE" },
    ],
    relatedServices: ["power-utility-systems", "operations-maintenance"],
    relatedProjects: ["hospital-power-reliability", "industrial-data-center"],
    relatedNews: ["hs-group-expands-power-telecom-infrastructure"],
  },
  {
    id: "solar-equipment",
    slug: "solar-equipment",
    title: "Solar Equipment",
    description:
      "Advanced solar panels, inverters, and mounting systems for reliable renewable energy infrastructure.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=85&auto=format&fit=crop",
    category: "Renewable",
    industry: "Manufacturing",
    brand: "HS Energy",
    technology: "PV",
    application: "Renewable Generation",
    certification: "IEC",
    features: ["Utility scalable", "Grid-ready", "Monitoring options"],
    applications: ["Industrial rooftops", "Utility solar", "Hybrid plants"],
    popular: 94,
    featured: true,
    compareSpecs: [
      { label: "Type", value: "PV + Inverter" },
      { label: "Grid", value: "On-grid ready" },
      { label: "Standard", value: "IEC" },
    ],
    relatedServices: ["solar-energy-solutions", "power-utility-systems"],
    relatedProjects: ["50mw-solar-power-plant"],
    relatedNews: ["smart-infrastructure-iot-project-operations"],
  },
  {
    id: "cabinet-server-rack",
    slug: "cabinet-server-rack",
    title: "Cabinet & Server Rack",
    description:
      "Industrial-grade server racks and cabinets engineered for data centers, telecom rooms, and enterprise infrastructure.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop",
    category: "Networking",
    industry: "Commercial Buildings",
    brand: "HS Infra",
    technology: "Enclosure",
    application: "IT / Telecom Rooms",
    certification: "ISO",
    features: ["Enterprise build", "Cable management", "Thermal ready"],
    applications: ["Data centers", "Telecom rooms", "Enterprise hubs"],
    popular: 90,
    featured: true,
    compareSpecs: [
      { label: "Form Factor", value: "19\" Rack" },
      { label: "Build", value: "Industrial" },
      { label: "Standard", value: "ISO" },
    ],
    relatedServices: ["telecom-infrastructure", "smart-city-iot"],
    relatedProjects: ["industrial-data-center", "telecom-tower-nationwide"],
    relatedNews: ["smart-infrastructure-iot-project-operations"],
  },
  {
    id: "iot-products",
    slug: "iot-products",
    title: "IoT Solutions",
    description:
      "Smart IoT devices and sensors enabling real-time monitoring, automation, and data-driven decisions.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&auto=format&fit=crop",
    category: "IoT",
    industry: "Smart Cities",
    brand: "TOI Connect",
    technology: "IoT",
    application: "Monitoring & Automation",
    certification: "CE",
    features: ["Real-time data", "Cloud ready", "Scalable nodes"],
    applications: ["Smart cities", "Facilities", "Industrial assets"],
    popular: 91,
    featured: true,
    compareSpecs: [
      { label: "Connectivity", value: "IoT / Cloud" },
      { label: "Use Case", value: "Monitoring" },
      { label: "Standard", value: "CE" },
    ],
    relatedServices: ["smart-city-iot", "industrial-automation"],
    relatedProjects: ["smart-city-iot-network"],
    relatedNews: ["smart-infrastructure-iot-project-operations"],
  },
  {
    id: "street-lighting",
    slug: "street-lighting",
    title: "Street Lighting",
    description:
      "Energy-efficient LED street lighting systems with smart controls for urban and highway illumination.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1400&q=85&auto=format&fit=crop",
    category: "Electrical",
    industry: "Government",
    brand: "HS Light",
    technology: "LED",
    application: "Public Lighting",
    certification: "Energy Efficient",
    features: ["LED efficiency", "Smart controls", "Corridor ready"],
    applications: ["Highways", "Urban roads", "Campuses"],
    popular: 85,
    compareSpecs: [
      { label: "Light Source", value: "LED" },
      { label: "Controls", value: "Smart optional" },
      { label: "Standard", value: "Energy Eff." },
    ],
    relatedServices: ["civil-design-construction", "smart-city-iot"],
    relatedProjects: ["highway-led-lighting"],
    relatedNews: ["smart-infrastructure-iot-project-operations"],
  },
  {
    id: "srf-db-breakers",
    slug: "srf-db-breakers",
    title: "SRF, DB Box & Breakers",
    description:
      "Precision-engineered switchgear, distribution boards, and circuit breakers for safe electrical distribution.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1400&q=85&auto=format&fit=crop",
    category: "Electrical",
    industry: "Industrial Plants",
    brand: "HS Power",
    technology: "Switchgear",
    application: "Power Distribution",
    certification: "IEC",
    features: ["Safe distribution", "Industrial grade", "Standards aligned"],
    applications: ["Factories", "Buildings", "Utility rooms"],
    popular: 87,
    compareSpecs: [
      { label: "Type", value: "DB / Breakers" },
      { label: "Duty", value: "Industrial" },
      { label: "Standard", value: "IEC" },
    ],
    relatedServices: ["electrical-mechanical-works", "power-utility-systems"],
    relatedProjects: ["industrial-automation-plant", "national-grid-substation"],
    relatedNews: ["hs-group-expands-power-telecom-infrastructure"],
  },
  {
    id: "cable-connectors",
    slug: "cable-connectors",
    title: "Cable Connectors",
    description:
      "Premium cable connectors and accessories meeting international standards for reliable connectivity.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85&auto=format&fit=crop",
    category: "Fiber",
    industry: "Telecom Operators",
    brand: "HS Connect",
    technology: "Connectivity",
    application: "Network Cabling",
    certification: "RoHS",
    features: ["Standards compliant", "Durable contacts", "Field proven"],
    applications: ["Telecom", "Industrial wiring", "Data rooms"],
    popular: 80,
    compareSpecs: [
      { label: "Type", value: "Connectors" },
      { label: "Use", value: "Power / Signal" },
      { label: "Standard", value: "RoHS" },
    ],
    relatedServices: ["telecom-infrastructure", "electrical-mechanical-works"],
    relatedProjects: ["fiber-backbone-expansion", "telecom-tower-nationwide"],
    relatedNews: ["hs-group-expands-power-telecom-infrastructure"],
  },
  {
    id: "fan-cooling",
    slug: "fan-cooling",
    title: "Fan Cooling Unit",
    description:
      "Efficient thermal management solutions with industrial fan cooling units for equipment protection.",
    image:
      "https://images.unsplash.com/photo-1585776245991-fadf935c2a43?w=1400&q=85&auto=format&fit=crop",
    category: "Automation",
    industry: "Industrial Plants",
    brand: "HS Cool",
    technology: "Thermal",
    application: "Equipment Cooling",
    certification: "ISO",
    features: ["Thermal protection", "Industrial airflow", "Serviceable"],
    applications: ["Enclosures", "Equipment rooms", "Shelters"],
    popular: 78,
    compareSpecs: [
      { label: "Type", value: "Cooling Unit" },
      { label: "Duty", value: "Continuous" },
      { label: "Standard", value: "ISO" },
    ],
    relatedServices: ["industrial-automation", "operations-maintenance"],
    relatedProjects: ["industrial-automation-plant", "industrial-data-center"],
    relatedNews: ["smart-infrastructure-iot-project-operations"],
  },
  {
    id: "fiber-optic-kit",
    slug: "fiber-optic-kit",
    title: "Fiber Optic Solutions",
    description:
      "Fiber connectivity products supporting high-capacity backbone and last-mile network deployment.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=85&auto=format&fit=crop",
    category: "Fiber",
    industry: "Telecom Operators",
    brand: "HS Connect",
    technology: "Fiber",
    application: "Network Backbone",
    certification: "IEEE",
    features: ["High capacity", "Low loss", "Field deployable"],
    applications: ["Backbone", "Campus fiber", "OSP"],
    popular: 89,
    featured: true,
    compareSpecs: [
      { label: "Medium", value: "Fiber" },
      { label: "Capacity", value: "High" },
      { label: "Standard", value: "IEEE" },
    ],
    relatedServices: ["telecom-infrastructure"],
    relatedProjects: ["fiber-backbone-expansion", "telecom-tower-nationwide"],
    relatedNews: ["hs-group-expands-power-telecom-infrastructure"],
  },
  {
    id: "security-systems",
    slug: "security-systems-kit",
    title: "Security Systems",
    description:
      "CCTV, access control, and integrated security products for critical facility protection.",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1400&q=85&auto=format&fit=crop",
    category: "Security",
    industry: "Healthcare",
    brand: "HS Secure",
    technology: "Security",
    application: "Facility Protection",
    certification: "CE",
    features: ["CCTV ready", "Access control", "Central monitoring"],
    applications: ["Campuses", "Hospitals", "Government sites"],
    popular: 83,
    compareSpecs: [
      { label: "Type", value: "Security Kit" },
      { label: "Integration", value: "Yes" },
      { label: "Standard", value: "CE" },
    ],
    relatedServices: ["security-systems", "smart-city-iot"],
    relatedProjects: ["smart-city-iot-network", "hospital-power-reliability"],
    relatedNews: ["smart-infrastructure-iot-project-operations"],
  },
];

export const productCategories = [
  { id: "power", title: "Power Equipment", description: "Distribution, backup, and utility power products.", icon: "Zap", filter: "Power Equipment" as ProductFilterCategory },
  { id: "telecom", title: "Telecommunication Products", description: "Telecom-ready infrastructure products.", icon: "Radio", filter: "Telecom" as ProductFilterCategory },
  { id: "fiber", title: "Fiber Optic Solutions", description: "High-capacity fiber connectivity products.", icon: "Cable", filter: "Fiber" as ProductFilterCategory },
  { id: "auto", title: "Industrial Automation", description: "Control, cooling, and automation products.", icon: "Bot", filter: "Automation" as ProductFilterCategory },
  { id: "renew", title: "Renewable Energy", description: "Solar and clean-energy product systems.", icon: "Sun", filter: "Renewable" as ProductFilterCategory },
  { id: "sec", title: "Security Systems", description: "CCTV, access, and protection products.", icon: "Shield", filter: "Security" as ProductFilterCategory },
  { id: "iot", title: "Smart IoT Devices", description: "Monitoring and connected devices.", icon: "Cpu", filter: "IoT" as ProductFilterCategory },
  { id: "elec", title: "Electrical Accessories", description: "Breakers, boards, and accessories.", icon: "CircuitBoard", filter: "Electrical" as ProductFilterCategory },
  { id: "net", title: "Networking Solutions", description: "Racks, cabinets, and network hardware.", icon: "Network", filter: "Networking" as ProductFilterCategory },
];

export const productIndustries = [
  "Power Utilities",
  "Telecom Operators",
  "Industrial Plants",
  "Commercial Buildings",
  "Government",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Oil & Gas",
  "Smart Cities",
];

export const productCertifications = [
  { title: "IEC", description: "International electrotechnical compliance.", icon: "BadgeCheck" },
  { title: "IEEE", description: "Engineering practice alignment.", icon: "Award" },
  { title: "ISO", description: "Quality management standards.", icon: "ShieldCheck" },
  { title: "CE", description: "Conformity for regulated markets.", icon: "CheckCircle2" },
  { title: "RoHS", description: "Hazardous substance restriction.", icon: "Leaf" },
  { title: "Energy Efficient", description: "Optimized energy performance.", icon: "Gauge" },
  { title: "Smart Monitoring", description: "Connected operational visibility.", icon: "Monitor" },
  { title: "Industrial Standards", description: "Field-ready industrial design.", icon: "Factory" },
];

export const productWhy = [
  { value: 15, suffix: "+", label: "Years Expertise" },
  { value: 390, suffix: "+", label: "Projects Supported" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Technical Support" },
];

export const productWhyPoints = [
  { title: "Certified Quality", description: "Products aligned with international standards and QA practice." },
  { title: "Reliable Performance", description: "Engineered for demanding power, telecom, and industrial environments." },
  { title: "Expert Support", description: "Technical assistance from HS Group engineering specialists." },
  { title: "Warranty Assurance", description: "Structured warranty and documentation support." },
  { title: "Fast Delivery", description: "Coordinated supply readiness for project timelines." },
  { title: "Engineering Assistance", description: "Selection guidance and application engineering support." },
];

export const productDownloads = [
  { id: "d1", title: "Full Product Catalogue", fileType: "PDF", size: "8.4 MB", href: "#downloads" },
  { id: "d2", title: "Technical Datasheet Pack", fileType: "PDF", size: "2.1 MB", href: "#downloads" },
  { id: "d3", title: "Installation Guide Pack", fileType: "PDF", size: "1.8 MB", href: "#downloads" },
  { id: "d4", title: "Compliance Certificate Pack", fileType: "PDF", size: "4.5 MB", href: "#downloads" },
  { id: "d5", title: "Warranty Information Pack", fileType: "PDF", size: "0.9 MB", href: "#downloads" },
];

export const productFaqs = [
  {
    question: "Are HS Group products available for project supply only or also for catalogue inquiry?",
    answer:
      "Both. Enterprise clients can inquire by product category for project supply, technical selection, and documentation support.",
  },
  {
    question: "Do products include technical documentation and certification references?",
    answer:
      "Yes. Datasheets, catalogues, and compliance references are available through the download center and product specialist team.",
  },
  {
    question: "Can HS Group help select products for a specific industry application?",
    answer:
      "Absolutely. Our product specialists and engineering team support selection for power, telecom, industrial, and smart infrastructure use cases.",
  },
  {
    question: "How do warranty and support work?",
    answer:
      "Warranty coverage depends on product category and supply package. Technical support and engineering assistance are available through HS Group.",
  },
];

export const productsCta = {
  label: "PRODUCT SUPPORT",
  headline: "Need Help Selecting the Right Product?",
  description:
    "Talk to an HS Group product specialist for application guidance, technical documentation, quotation support, and project supply coordination.",
  backgroundImage:
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=85&auto=format&fit=crop",
  actions: [
    { label: "Request Product Consultation", href: "/contact?intent=consultation", primary: true },
    { label: "Talk to a Product Specialist", href: "/contact?intent=specialist", primary: false },
    { label: "Request a Quotation (RFQ)", href: "/contact?intent=rfq", primary: false },
    { label: "Download Full Catalogue", href: "#downloads", primary: false },
  ],
};

export function getFeaturedProducts() {
  return portfolioProducts.filter((p) => p.featured);
}

export function getProductBrands() {
  return Array.from(new Set(portfolioProducts.map((p) => p.brand))).sort();
}

export function getProductTechnologies() {
  return Array.from(new Set(portfolioProducts.map((p) => p.technology))).sort();
}

export function getProductCertificationsList() {
  return Array.from(new Set(portfolioProducts.map((p) => p.certification))).sort();
}
