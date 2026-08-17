export const serviceFilterCategories = [
  "All Services",
  "Power",
  "Telecom",
  "Civil",
  "Solar",
  "Smart Infrastructure",
  "Security",
  "IoT",
] as const;

export type ServiceFilterCategory = (typeof serviceFilterCategories)[number];

export type PortfolioService = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  category: ServiceFilterCategory;
  features: string[];
  benefits: string[];
  industries: string[];
  technologies: string[];
  featured?: boolean;
};

export const servicesHero = {
  label: "CAPABILITIES",
  headline: "Engineering Services",
  subtitle:
    "Delivering reliable engineering, power, telecom, renewable energy, industrial automation and smart infrastructure solutions.",
  image:
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=85&auto=format&fit=crop",
  primaryCta: { label: "Explore Services", href: "#services-grid" },
  secondaryCta: { label: "Request Consultation", href: "/contact" },
};

export const portfolioServices: PortfolioService[] = [
  {
    id: "power-utility",
    slug: "power-utility-systems",
    title: "Power & Utility Systems",
    description:
      "Substation, transmission, distribution, transformer, switchgear, and utility infrastructure for dependable power delivery.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=85&auto=format&fit=crop",
    icon: "Power",
    category: "Power",
    features: ["Substations", "Transmission", "Distribution", "SCADA Ready"],
    benefits: ["Grid reliability", "Reduced outage risk", "Lifecycle support"],
    industries: ["Power Utilities", "Government", "Industrial Plants"],
    technologies: ["IEC", "SCADA", "Switchgear", "IEEE"],
    featured: true,
  },
  {
    id: "telecom",
    slug: "telecom-infrastructure",
    title: "Telecom Infrastructure",
    description:
      "BTS sites, towers, rooftop structures, passive/active installation, and network infrastructure support nationwide.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=85&auto=format&fit=crop",
    icon: "Radio",
    category: "Telecom",
    features: ["Tower Rollout", "BTS Sites", "Fiber Support", "Rooftop"],
    benefits: ["Faster network readiness", "Multi-site coordination", "Field discipline"],
    industries: ["Telecom Operators", "Government", "Enterprise"],
    technologies: ["Fiber", "Passive Infra", "OSP", "ISO"],
    featured: true,
  },
  {
    id: "solar",
    slug: "solar-energy-solutions",
    title: "Solar Energy Solutions",
    description:
      "On-grid, off-grid, industrial solar, and renewable EPC delivery with interconnection and O&M readiness.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=85&auto=format&fit=crop",
    icon: "Sun",
    category: "Solar",
    features: ["Utility Solar", "Industrial PV", "Grid Tie", "Monitoring"],
    benefits: ["Clean energy capacity", "Lower operating cost", "Sustainable growth"],
    industries: ["Industrial Plants", "Commercial Buildings", "Government"],
    technologies: ["Solar Monitoring", "Inverters", "IEC", "ISO"],
    featured: true,
  },
  {
    id: "civil-design",
    slug: "civil-design-construction",
    title: "Civil Design & Construction",
    description:
      "Civil engineering, structural design, land development, buildings, roads, and infrastructure execution.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=85&auto=format&fit=crop",
    icon: "Building2",
    category: "Civil",
    features: ["Structural Design", "Site Development", "Buildings", "Roads"],
    benefits: ["Constructability focus", "Quality gates", "On-time packages"],
    industries: ["Government", "Industrial Plants", "Commercial Buildings"],
    technologies: ["ISO", "QA/QC", "BIM Ready"],
    featured: true,
  },
  {
    id: "electrical-mechanical",
    slug: "electrical-mechanical-works",
    title: "Electrical & Mechanical Works",
    description:
      "Electrical, mechanical, HVAC, fire safety, grounding, lighting, and industrial installation solutions.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1400&q=85&auto=format&fit=crop",
    icon: "Zap",
    category: "Power",
    features: ["MEP", "HVAC", "Fire Safety", "Industrial Fit-Out"],
    benefits: ["Integrated packages", "Safety compliance", "Reliable commissioning"],
    industries: ["Healthcare", "Manufacturing", "Commercial Buildings"],
    technologies: ["PLC", "IEC", "ISO"],
    featured: true,
  },
  {
    id: "smart-city",
    slug: "smart-city-iot",
    title: "Smart City & IoT Solutions",
    description:
      "Digital monitoring, access control, energy monitoring, security systems, and smart infrastructure platforms.",
    image:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1400&q=85&auto=format&fit=crop",
    icon: "Cpu",
    category: "IoT",
    features: ["IoT Sensing", "Command Centers", "Access Control", "Asset Monitoring"],
    benefits: ["Operational visibility", "Faster decisions", "Scalable platforms"],
    industries: ["Government", "Education", "Commercial Buildings"],
    technologies: ["IoT", "Cloud Monitoring", "AI Monitoring", "Industrial Networking"],
    featured: true,
  },
  {
    id: "operations",
    slug: "operations-maintenance",
    title: "Operations & Maintenance",
    description:
      "Nationwide O&M for civil, power, telecom, generators, fire safety, and technical infrastructure assets.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1400&q=85&auto=format&fit=crop",
    icon: "Wrench",
    category: "Smart Infrastructure",
    features: ["Preventive O&M", "Emergency Response", "Asset Care", "Reporting"],
    benefits: ["Uptime protection", "24/7 readiness", "Lifecycle value"],
    industries: ["Power Utilities", "Telecom Operators", "Industrial Plants"],
    technologies: ["SCADA", "Cloud Monitoring", "ISO"],
  },
  {
    id: "security-systems",
    slug: "security-systems",
    title: "Security Systems",
    description:
      "Enterprise security, CCTV, access control, and integrated monitoring for critical facilities and campuses.",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1400&q=85&auto=format&fit=crop",
    icon: "Shield",
    category: "Security",
    features: ["CCTV", "Access Control", "Intrusion", "Integration"],
    benefits: ["Facility protection", "Centralized visibility", "Compliance support"],
    industries: ["Healthcare", "Education", "Government", "Oil & Gas"],
    technologies: ["IoT", "Industrial Networking", "Cloud Monitoring"],
  },
  {
    id: "industrial-automation",
    slug: "industrial-automation",
    title: "Industrial Automation",
    description:
      "Plant automation, PLC/SCADA controls, MCCs, and modernization for continuous manufacturing operations.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=85&auto=format&fit=crop",
    icon: "Bot",
    category: "Smart Infrastructure",
    features: ["PLC", "SCADA", "MCC", "Plant Upgrades"],
    benefits: ["Process reliability", "Reduced downtime", "Data-driven control"],
    industries: ["Manufacturing", "Oil & Gas", "Industrial Plants"],
    technologies: ["PLC", "SCADA", "IEC", "Industrial Networking"],
  },
];

export const serviceCategories = [
  { id: "power", title: "Power & Energy", description: "Utility and industrial power systems.", icon: "Zap", filter: "Power" as ServiceFilterCategory },
  { id: "telecom", title: "Telecommunication", description: "Towers, BTS, and network infrastructure.", icon: "Radio", filter: "Telecom" as ServiceFilterCategory },
  { id: "civil", title: "Civil Construction", description: "Structural and infrastructure execution.", icon: "Building2", filter: "Civil" as ServiceFilterCategory },
  { id: "renewable", title: "Renewable Energy", description: "Solar generation and interconnection.", icon: "Sun", filter: "Solar" as ServiceFilterCategory },
  { id: "automation", title: "Industrial Automation", description: "Controls, PLC, and plant systems.", icon: "Cpu", filter: "Smart Infrastructure" as ServiceFilterCategory },
  { id: "smart", title: "Smart City", description: "IoT and digital urban platforms.", icon: "Network", filter: "IoT" as ServiceFilterCategory },
  { id: "security", title: "Security Systems", description: "CCTV, access, and monitoring.", icon: "Shield", filter: "Security" as ServiceFilterCategory },
  { id: "digital", title: "Digital Solutions", description: "Cloud monitoring and smart ops.", icon: "Monitor", filter: "IoT" as ServiceFilterCategory },
];

export const serviceProcess = [
  { step: "01", title: "Consultation", description: "Align scope, priorities, and success criteria." },
  { step: "02", title: "Survey", description: "Site assessment and technical discovery." },
  { step: "03", title: "Design", description: "Engineering design and constructability reviews." },
  { step: "04", title: "Engineering", description: "Detailed packages and interface control." },
  { step: "05", title: "Execution", description: "Field implementation under quality gates." },
  { step: "06", title: "Testing", description: "Verification against performance criteria." },
  { step: "07", title: "Handover", description: "Commissioning support and documentation." },
  { step: "08", title: "Support", description: "O&M readiness and lifecycle assistance." },
];

export const serviceWhyChoose = [
  { value: 15, suffix: "+", label: "Years" },
  { value: 390, suffix: "+", label: "Projects" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Support" },
];

export const serviceWhyPoints = [
  { title: "Certified Engineers", description: "Experienced multidisciplinary teams delivering to international practice." },
  { title: "ISO Standards", description: "Quality systems applied across design, execution, and handover." },
  { title: "Fast Response", description: "Responsive coordination for enterprise and government programs." },
  { title: "Nationwide Delivery", description: "Proven multi-site execution across Bangladesh." },
];

export const serviceIndustries = [
  { title: "Power Utilities", services: ["Power", "Solar", "Smart Infrastructure"] },
  { title: "Government", services: ["Civil", "Power", "IoT", "Security"] },
  { title: "Telecom Operators", services: ["Telecom", "IoT"] },
  { title: "Industrial Plants", services: ["Power", "Smart Infrastructure", "Solar"] },
  { title: "Commercial Buildings", services: ["Civil", "Power", "Security", "IoT"] },
  { title: "Healthcare", services: ["Power", "Security", "Smart Infrastructure"] },
  { title: "Education", services: ["Civil", "IoT", "Security"] },
  { title: "Manufacturing", services: ["Smart Infrastructure", "Power", "Solar"] },
  { title: "Oil & Gas", services: ["Power", "Security", "Smart Infrastructure"] },
];

export const serviceTechnologies = [
  { title: "IoT", description: "Connected sensing and asset visibility.", icon: "Network" },
  { title: "AI Monitoring", description: "Smarter operational insights.", icon: "Brain" },
  { title: "SCADA", description: "Control and supervisory systems.", icon: "Monitor" },
  { title: "Fiber Network", description: "High-capacity connectivity.", icon: "Cable" },
  { title: "Solar", description: "Renewable generation platforms.", icon: "Sun" },
  { title: "Automation", description: "PLC and industrial controls.", icon: "Bot" },
  { title: "Cloud Monitoring", description: "Remote performance dashboards.", icon: "Cloud" },
  { title: "Industrial Networking", description: "Reliable plant connectivity.", icon: "Share2" },
];

export const serviceStandards = ["IEC", "ISO", "IEEE"];

export const serviceFaqs = [
  {
    question: "How does HS Group scope a new engineering service engagement?",
    answer:
      "We begin with consultation and site survey, then align design, delivery packages, timeline, and quality gates before execution.",
  },
  {
    question: "Which industries do you typically support?",
    answer:
      "Power utilities, telecom operators, government, industrial plants, commercial facilities, healthcare, education, manufacturing, and oil & gas.",
  },
  {
    question: "Can services be delivered as integrated multidisciplinary packages?",
    answer:
      "Yes. HS Group commonly integrates civil, electrical, power, telecom, renewable, and smart infrastructure scopes under one accountable delivery model.",
  },
  {
    question: "Do you provide post-handover operations support?",
    answer:
      "We offer O&M and lifecycle support options for power, telecom, civil, and smart infrastructure assets across nationwide locations.",
  },
  {
    question: "How can we request a proposal or site survey?",
    answer:
      "Use the Contact page to request consultation, schedule a site survey, or submit an RFP. Our business development and technical teams will respond promptly.",
  },
];

export const serviceDownloads = [
  { id: "d1", title: "Service Brochure", fileType: "PDF", size: "3.4 MB", href: "#" },
  { id: "d2", title: "Company Profile", fileType: "PDF", size: "2.4 MB", href: "#" },
  { id: "d3", title: "Capability Statement", fileType: "PDF", size: "1.9 MB", href: "#" },
  { id: "d4", title: "Technical Datasheet", fileType: "PDF", size: "2.1 MB", href: "#" },
];

export const serviceTestimonials = [
  {
    id: "t1",
    quote:
      "HS Group brought disciplined engineering coordination and reliable field execution across our infrastructure program.",
    name: "Program Lead",
    role: "Utility Partner",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: "t2",
    quote:
      "Their telecom and power teams worked as one delivery organization — clear milestones, strong safety culture, and dependable handover.",
    name: "Network Director",
    role: "Telecom Operator",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: "t3",
    quote:
      "From consultation to commissioning support, HS Group demonstrated the capability we expect from an enterprise engineering partner.",
    name: "Facilities Head",
    role: "Industrial Client",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=85&auto=format&fit=crop",
  },
];

export const servicesCta = {
  label: "PARTNER WITH US",
  headline: "Let's Build the Future Together",
  description:
    "Request a consultation, schedule a site survey, or submit your RFP — HS Group is ready to support your next engineering program.",
  backgroundImage:
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85&auto=format&fit=crop",
  actions: [
    { label: "Request Consultation", href: "/contact", primary: true },
    { label: "Schedule Site Survey", href: "/contact", primary: false },
    { label: "Request Proposal (RFP)", href: "/contact", primary: false },
    { label: "Download Capability Statement", href: "#downloads", primary: false },
  ],
};

export function getFeaturedServices() {
  return portfolioServices.filter((s) => s.featured);
}
