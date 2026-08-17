export const projectFilterCategories = [
  "All",
  "Power",
  "Telecom",
  "Solar",
  "Civil",
  "Industrial",
  "ICT",
  "Water",
  "Infrastructure",
  "Smart City",
] as const;

export type ProjectFilterCategory = (typeof projectFilterCategories)[number];

export type PortfolioProject = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  industry: ProjectFilterCategory;
  location: string;
  country: string;
  client: string;
  value: string;
  year: string;
  completion: string;
  technologies: string[];
  status: "Completed" | "Operational" | "In Progress";
  featured?: boolean;
  mapX: number;
  mapY: number;
};

export const projectsHero = {
  label: "PORTFOLIO",
  headline: "Engineering Projects",
  subtitle:
    "Explore HS Group's portfolio of engineering, telecom, power, renewable energy, industrial automation and infrastructure projects delivered with excellence.",
  image:
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=85&auto=format&fit=crop",
  primaryCta: { label: "View Projects", href: "#projects-grid" },
  secondaryCta: { label: "Contact Team", href: "/contact" },
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    slug: "national-grid-substation",
    title: "National Grid Substation Upgrade",
    description:
      "High-capacity transmission substation delivering stable national grid power for industrial and urban demand.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=85&auto=format&fit=crop",
    industry: "Power",
    location: "Dhaka, Bangladesh",
    country: "Bangladesh",
    client: "PGCB",
    value: "Multi-phase EPC",
    year: "2024",
    completion: "2024",
    technologies: ["GIS", "Switchgear", "SCADA"],
    status: "Completed",
    featured: true,
    mapX: 52,
    mapY: 42,
  },
  {
    id: 2,
    slug: "50mw-solar-power-plant",
    title: "50MW Solar Power Plant",
    description:
      "Utility-scale solar farm generating clean energy with grid interconnection and long-term O&M support.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=85&auto=format&fit=crop",
    industry: "Solar",
    location: "Cox's Bazar, Bangladesh",
    country: "Bangladesh",
    client: "SREDA Partner",
    value: "Utility Scale",
    year: "2023",
    completion: "2023",
    technologies: ["PV Arrays", "Inverters", "Grid Tie"],
    status: "Operational",
    featured: true,
    mapX: 68,
    mapY: 72,
  },
  {
    id: 3,
    slug: "telecom-tower-nationwide",
    title: "Telecom Tower Nationwide Rollout",
    description:
      "Multi-site BTS and tower rollout supporting network expansion across urban and rural corridors.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=85&auto=format&fit=crop",
    industry: "Telecom",
    location: "Nationwide, Bangladesh",
    country: "Bangladesh",
    client: "National Operator",
    value: "Multi-site Program",
    year: "2023",
    completion: "2023",
    technologies: ["BTS", "Passive Infra", "Fiber"],
    status: "Completed",
    featured: true,
    mapX: 48,
    mapY: 48,
  },
  {
    id: 4,
    slug: "smart-city-iot-network",
    title: "Smart City IoT Network",
    description:
      "Connected monitoring, access control, and digital infrastructure for smarter urban operations.",
    image:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1400&q=85&auto=format&fit=crop",
    industry: "Smart City",
    location: "Chittagong, Bangladesh",
    country: "Bangladesh",
    client: "City Authority",
    value: "Digital Infra",
    year: "2024",
    completion: "2024",
    technologies: ["IoT", "Sensors", "Command Center"],
    status: "Completed",
    featured: true,
    mapX: 62,
    mapY: 58,
  },
  {
    id: 5,
    slug: "industrial-data-center",
    title: "Industrial Data Center Fit-Out",
    description:
      "Mission-critical data center with power, cooling, and rack infrastructure for industrial IT loads.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop",
    industry: "ICT",
    location: "Gazipur, Bangladesh",
    country: "Bangladesh",
    client: "Enterprise Client",
    value: "Critical Facility",
    year: "2024",
    completion: "2024",
    technologies: ["UPS", "HVAC", "Structured Cabling"],
    status: "Completed",
    mapX: 50,
    mapY: 38,
  },
  {
    id: 6,
    slug: "highway-led-lighting",
    title: "Highway LED Lighting Corridor",
    description:
      "Energy-efficient LED corridor lighting improving highway safety and operational visibility.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1400&q=85&auto=format&fit=crop",
    industry: "Infrastructure",
    location: "Dhaka–Chittagong Highway",
    country: "Bangladesh",
    client: "RHD",
    value: "Corridor Program",
    year: "2023",
    completion: "2023",
    technologies: ["LED", "Controls", "Poles"],
    status: "Operational",
    mapX: 55,
    mapY: 50,
  },
  {
    id: 7,
    slug: "industrial-automation-plant",
    title: "Industrial Automation Upgrade",
    description:
      "Plant automation, control systems, and electrical modernization for continuous manufacturing operations.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=85&auto=format&fit=crop",
    industry: "Industrial",
    location: "Narayanganj, Bangladesh",
    country: "Bangladesh",
    client: "Manufacturing Group",
    value: "Plant Modernization",
    year: "2022",
    completion: "2022",
    technologies: ["PLC", "SCADA", "MCCs"],
    status: "Operational",
    mapX: 54,
    mapY: 44,
  },
  {
    id: 8,
    slug: "water-treatment-facility",
    title: "Municipal Water Treatment Facility",
    description:
      "Water infrastructure works supporting treatment, pumping, and distribution reliability for urban demand.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1400&q=85&auto=format&fit=crop",
    industry: "Water",
    location: "Khulna, Bangladesh",
    country: "Bangladesh",
    client: "WASA Partner",
    value: "Municipal Capex",
    year: "2022",
    completion: "2022",
    technologies: ["Pumping", "Filtration", "Controls"],
    status: "Operational",
    mapX: 38,
    mapY: 62,
  },
  {
    id: 9,
    slug: "civil-industrial-complex",
    title: "Industrial Complex Civil Works",
    description:
      "Structural and civil execution for industrial buildings, yards, and supporting infrastructure packages.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=85&auto=format&fit=crop",
    industry: "Civil",
    location: "Savar, Bangladesh",
    country: "Bangladesh",
    client: "Industrial Developer",
    value: "Civil Package",
    year: "2021",
    completion: "2021",
    technologies: ["RCC", "Steel", "Site Development"],
    status: "Completed",
    mapX: 46,
    mapY: 40,
  },
  {
    id: 10,
    slug: "fiber-backbone-expansion",
    title: "Fiber Backbone Expansion",
    description:
      "High-capacity fiber routes enabling resilient connectivity for enterprise and telecom network growth.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop",
    industry: "Telecom",
    location: "Dhaka Metro, Bangladesh",
    country: "Bangladesh",
    client: "ISP Consortium",
    value: "Network Capex",
    year: "2025",
    completion: "2025",
    technologies: ["Fiber", "OSP", "Splicing"],
    status: "In Progress",
    mapX: 51,
    mapY: 41,
  },
  {
    id: 11,
    slug: "hospital-power-reliability",
    title: "Hospital Power Reliability Program",
    description:
      "Critical power systems, backup generation, and electrical distribution for healthcare continuity.",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=85&auto=format&fit=crop",
    industry: "Power",
    location: "Sylhet, Bangladesh",
    country: "Bangladesh",
    client: "Healthcare Authority",
    value: "Critical Power",
    year: "2021",
    completion: "2021",
    technologies: ["Generators", "ATS", "Distribution"],
    status: "Operational",
    mapX: 72,
    mapY: 28,
  },
  {
    id: 12,
    slug: "transmission-line-corridor",
    title: "Transmission Line Corridor",
    description:
      "High-voltage corridor works supporting transmission reliability and regional power transfer capacity.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=85&auto=format&fit=crop",
    industry: "Power",
    location: "Rajshahi, Bangladesh",
    country: "Bangladesh",
    client: "Utility Partner",
    value: "HV Corridor",
    year: "2020",
    completion: "2020",
    technologies: ["Towers", "Conductors", "Stringing"],
    status: "Completed",
    mapX: 32,
    mapY: 36,
  },
];

export const projectStats = [
  { value: 390, suffix: "+", label: "Projects" },
  { value: 18, suffix: "+", label: "Industries" },
  { value: 15, suffix: "+", label: "Years" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export const projectTimeline = [
  {
    year: "2010",
    title: "Foundation Projects",
    summary: "Early civil and electrical programs establishing HS Group’s delivery reputation.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&q=85&auto=format&fit=crop",
  },
  {
    year: "2012",
    title: "Power Systems Growth",
    summary: "Expanded substation and distribution capability for utility and industrial clients.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1000&q=85&auto=format&fit=crop",
  },
  {
    year: "2015",
    title: "Telecom Infrastructure Scale",
    summary: "Nationwide tower and network infrastructure programs supporting operator expansion.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=85&auto=format&fit=crop",
  },
  {
    year: "2018",
    title: "Industrial & ICT Delivery",
    summary: "Critical facilities, automation, and industrial electrical modernization programs.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&q=85&auto=format&fit=crop",
  },
  {
    year: "2022",
    title: "Renewable Acceleration",
    summary: "Solar and grid interconnection projects supporting sustainable industrial growth.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1000&q=85&auto=format&fit=crop",
  },
  {
    year: "2026",
    title: "Smart Infrastructure Era",
    summary: "Digital monitoring, smart city systems, and integrated engineering platforms.",
    image:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1000&q=85&auto=format&fit=crop",
  },
];

export const projectIndustries = [
  { id: "power", title: "Power", description: "Substations, transmission, and utility systems.", icon: "Zap" },
  { id: "telecom", title: "Telecom", description: "Towers, BTS, fiber, and network infrastructure.", icon: "Radio" },
  { id: "oil-gas", title: "Oil & Gas", description: "Industrial electrical and facility support works.", icon: "Fuel" },
  { id: "infra", title: "Infrastructure", description: "Civil corridors, lighting, and public works.", icon: "Building2" },
  { id: "renewable", title: "Renewable Energy", description: "Solar generation and grid interconnection.", icon: "Sun" },
  { id: "automation", title: "Industrial Automation", description: "Controls, SCADA, and plant modernization.", icon: "Cpu" },
  { id: "government", title: "Government", description: "Public-sector engineering and national programs.", icon: "Landmark" },
  { id: "smart-city", title: "Smart City", description: "IoT, digital monitoring, and urban systems.", icon: "Network" },
];

export const projectTestimonials = [
  {
    id: "t1",
    quote:
      "HS Group delivered our substation package with disciplined quality control and clear milestone reporting throughout the program.",
    name: "Project Director",
    role: "National Utility Partner",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: "t2",
    quote:
      "Their telecom rollout capability and field coordination helped us accelerate network readiness across multiple districts.",
    name: "Network Lead",
    role: "Telecom Operator",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: "t3",
    quote:
      "From engineering coordination to commissioning support, HS Group performed as a reliable long-term infrastructure partner.",
    name: "Facilities Manager",
    role: "Industrial Enterprise",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=85&auto=format&fit=crop",
  },
];

export const projectAwards = [
  {
    id: "a1",
    title: "Project Excellence",
    description: "Recognized for disciplined delivery on complex engineering programs.",
    icon: "Trophy",
  },
  {
    id: "a2",
    title: "Safety Leadership",
    description: "Strong field safety culture across multi-site infrastructure works.",
    icon: "ShieldCheck",
  },
  {
    id: "a3",
    title: "Quality Systems",
    description: "Consistent QA/QC standards aligned with international engineering practice.",
    icon: "BadgeCheck",
  },
  {
    id: "a4",
    title: "Innovation in Delivery",
    description: "Digital monitoring and process innovation improving project visibility.",
    icon: "Sparkles",
  },
];

export const projectsCta = {
  label: "NEXT PROJECT",
  headline: "Ready to Build Your Next Project?",
  description:
    "Partner with HS Group for engineering excellence across power, telecom, renewable energy, and infrastructure programs.",
  backgroundImage:
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85&auto=format&fit=crop",
  primaryCta: { label: "Request Consultation", href: "/contact" },
  secondaryCta: { label: "Explore Services", href: "/services" },
};

export const projectSearchHints = [
  "Solar",
  "Transmission",
  "Substation",
  "Fiber",
  "Government",
  "Hospital",
];

export function getFeaturedProjects() {
  return portfolioProjects.filter((p) => p.featured);
}

export function getProjectCountries() {
  return Array.from(new Set(portfolioProjects.map((p) => p.country))).sort();
}

export function getProjectYears() {
  return Array.from(new Set(portfolioProjects.map((p) => p.year))).sort((a, b) => Number(b) - Number(a));
}

export function getProjectClients() {
  return Array.from(new Set(portfolioProjects.map((p) => p.client))).sort();
}

export function getProjectStatuses() {
  return Array.from(new Set(portfolioProjects.map((p) => p.status)));
}
