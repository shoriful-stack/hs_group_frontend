export const siteConfig = {
  name: "HS Group",
  tagline: "Engineering Excellence. Powering Tomorrow.",
  description:
    "HS Group is a leading engineering conglomerate delivering power systems, telecom infrastructure, solar energy, and smart city solutions across Bangladesh and beyond.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.hsgroup.com",
  email: "info@hsgroup.com",
  phone: "+880 1234-567890",
  address: "Dhaka, Bangladesh",
  social: {
    linkedin: "https://www.linkedin.com/company/hs-group",
    facebook: "https://www.facebook.com/hsgroup",
    youtube: "https://www.youtube.com/@hsgroup",
  },
};

export const products = [
  {
    id: "cabinet-server-rack",
    title: "Cabinet & Server Rack",
    description:
      "Industrial-grade server racks and cabinets engineered for data centers, telecom rooms, and enterprise infrastructure.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=85&auto=format&fit=crop",
    imagePosition: "center center",
    category: "Infrastructure",
  },
  {
    id: "battery-rectifier",
    title: "Battery & Rectifier",
    description:
      "High-performance battery systems and rectifiers ensuring uninterrupted power supply for critical operations.",
    image: "https://images.unsplash.com/photo-1599305445873-6a00a533015e?w=1200&q=85&auto=format&fit=crop",
    imagePosition: "center center",
    category: "Power Systems",
  },
  {
    id: "ac-power-systems",
    title: "AC Power Systems",
    description:
      "Advanced AC power distribution systems designed for industrial, commercial, and utility-scale applications.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=85&auto=format&fit=crop",
    imagePosition: "center 40%",
    category: "Power Systems",
  },
  {
    id: "srf-db-breakers",
    title: "SRF, DB Box & Breakers",
    description:
      "Precision-engineered switchgear, distribution boards, and circuit breakers for safe electrical distribution.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=85&auto=format&fit=crop",
    imagePosition: "center center",
    category: "Electrical",
  },
  {
    id: "cable-connectors",
    title: "Cable Connectors",
    description:
      "Premium cable connectors and accessories meeting international standards for reliable connectivity.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop",
    imagePosition: "center center",
    category: "Connectivity",
  },
  {
    id: "ac-generators",
    title: "AC Generator",
    description:
      "Robust AC generators delivering dependable backup and primary power for diverse industrial needs.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=85&auto=format&fit=crop",
    imagePosition: "center center",
    category: "Power Generation",
  },
  {
    id: "fan-cooling",
    title: "Fan Cooling Unit",
    description:
      "Efficient thermal management solutions with industrial fan cooling units for equipment protection.",
    image: "https://images.unsplash.com/photo-1585776245991-fadf935c2a43?w=1200&q=85&auto=format&fit=crop",
    imagePosition: "center center",
    category: "Thermal",
  },
  {
    id: "street-lighting",
    title: "Street Lighting",
    description:
      "Energy-efficient LED street lighting systems with smart controls for urban and highway illumination.",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=85&auto=format&fit=crop",
    imagePosition: "center 35%",
    category: "Lighting",
  },
  {
    id: "solar-equipment",
    title: "Solar Equipment",
    description:
      "Advanced solar panels, inverters, and mounting systems for reliable renewable energy infrastructure.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=85&auto=format&fit=crop",
    imagePosition: "center center",
    category: "Renewable Energy",
  },
  {
    id: "iot-products",
    title: "IoT Solutions",
    description:
      "Smart IoT devices and sensors enabling real-time monitoring, automation, and data-driven decisions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&auto=format&fit=crop",
    imagePosition: "center center",
    category: "Smart Tech",
  },
];

export const productsSection = {
  label: "OUR PRODUCTS",
  title: "Industrial Products & Smart Infrastructure Solutions",
  subtitle:
    "Delivering reliable engineering products for telecom, power, renewable energy, industrial infrastructure, smart city, and digital technology projects.",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "News & Media", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export const servicesSection = {
  label: "OUR SERVICES",
  title: "Integrated Engineering & Infrastructure Services",
  subtitle:
    "Delivering world-class engineering, telecom, power, renewable energy, infrastructure and digital technology services for governments, enterprises and industrial clients.",
};

export const services = [
  {
    id: "civil-design",
    title: "Civil Design & Construction",
    description:
      "End-to-end civil engineering, structural design, land development, building construction, road works, and infrastructure execution.",
    icon: "Building2",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=85&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "electrical-mechanical",
    title: "Electrical & Mechanical Works",
    description:
      "Reliable electrical, mechanical, wiring, grounding, lighting, fire safety, HVAC, and industrial installation solutions.",
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "power-utility",
    title: "Power & Utility Systems",
    description:
      "Substation, transmission, distribution, transformer, switchgear, and utility infrastructure solutions for dependable power delivery.",
    icon: "Power",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "telecom",
    title: "Telecom Infrastructure",
    description:
      "BTS sites, telecom towers, rooftop structures, camouflage solutions, active/passive equipment installation, and network infrastructure support.",
    icon: "Radio",
    image: "https://images.unsplash.com/photo-1565008576549-75ff593a5df6?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "solar",
    title: "Solar Energy Solutions",
    description:
      "On-grid, off-grid, net metering, solar irrigation, industrial solar, and renewable energy project implementation.",
    icon: "Sun",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "operations",
    title: "Operations & Maintenance",
    description:
      "Nationwide O&M support for civil, power, telecom, AC, generator, fire safety, and technical infrastructure assets.",
    icon: "Wrench",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "smart-city",
    title: "Smart City & IoT Solutions",
    description:
      "Digital monitoring, access control, energy monitoring, security systems, asset monitoring, and smart infrastructure solutions through TOI Connect.",
    icon: "Cpu",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&auto=format&fit=crop",
  },
];

export const whyChooseUsSection = {
  label: "Why Choose HS Group",
  title: "Why Industry Leaders Trust HS Group",
  subtitle:
    "Delivering innovative engineering, power, telecom, infrastructure, and smart technology solutions with proven expertise, uncompromising quality, and nationwide project execution since 2010.",
  cards: [
    {
      type: "text" as const,
      title: "Engineering Excellence",
      description:
        "Professional engineering solutions backed by experienced teams, modern technologies, and industry best practices.",
    },
    {
      type: "image" as const,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      alt: "Telecom and network infrastructure",
    },
    {
      type: "text" as const,
      title: "Integrated Power Solutions",
      description:
        "Reliable transmission, substation, renewable energy, and electrical infrastructure solutions.",
    },
    {
      type: "image" as const,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
      alt: "Solar farm and renewable energy infrastructure",
    },
    {
      type: "text" as const,
      title: "Nationwide Project Delivery",
      description:
        "Efficient execution with highly skilled engineers, technicians, project managers, and quality control.",
    },
    {
      type: "image" as const,
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
      alt: "IoT and smart monitoring systems",
    },
  ],
};

/** @deprecated Use whyChooseUsSection */
export const whyChooseUs = whyChooseUsSection.cards.filter((c) => c.type === "text");

export const projects = [
  {
    id: 1,
    title: "National Grid Substation",
    category: "Power Systems",
    location: "Dhaka, Bangladesh",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=85&auto=format&fit=crop",
    year: "2024",
    client: "PGCB",
    status: "Completed",
    summary:
      "High-capacity transmission substation delivering stable national grid power for industrial and urban demand.",
  },
  {
    id: 2,
    title: "50MW Solar Power Plant",
    category: "Solar Energy",
    location: "Cox's Bazar, Bangladesh",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=85&auto=format&fit=crop",
    year: "2023",
    client: "SREDA Partner",
    status: "Operational",
    summary:
      "Utility-scale solar farm generating clean energy with grid interconnection and long-term O&M support.",
  },
  {
    id: 3,
    title: "Smart City IoT Network",
    category: "Smart Infrastructure",
    location: "Chittagong, Bangladesh",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200&q=85&auto=format&fit=crop",
    year: "2024",
    client: "City Authority",
    status: "Completed",
    summary:
      "Connected monitoring, access control, and digital infrastructure for smarter urban operations.",
  },
  {
    id: 4,
    title: "Telecom Tower Deployment",
    category: "Telecom",
    location: "Nationwide, Bangladesh",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85&auto=format&fit=crop",
    year: "2023",
    client: "National Operator",
    status: "Completed",
    summary:
      "Multi-site BTS and tower rollout supporting network expansion across urban and rural corridors.",
  },
  {
    id: 5,
    title: "Industrial Data Center",
    category: "Infrastructure",
    location: "Gazipur, Bangladesh",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=85&auto=format&fit=crop",
    year: "2024",
    client: "Enterprise Client",
    status: "Completed",
    summary:
      "Mission-critical data center with power, cooling, and rack infrastructure for industrial IT loads.",
  },
  {
    id: 6,
    title: "Highway LED Lighting",
    category: "Street Lighting",
    location: "Dhaka-Chittagong Highway",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=85&auto=format&fit=crop",
    year: "2023",
    client: "RHD",
    status: "Operational",
    summary:
      "Energy-efficient LED corridor lighting improving highway safety and operational visibility.",
  },
];

export const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "500+", label: "Projects Completed" },
  { value: "50+", label: "Global Partners" },
  { value: "500+", label: "Expert Engineers" },
];

export const blogSection = {
  label: "News & Insights",
  title: "Latest Updates & Industry Insights",
  subtitle:
    "Explore HS Group's latest project updates, engineering insights, infrastructure news, technology innovations, and industry achievements.",
};

export const blogPosts = [
  {
    id: 1,
    title: "HS Group Expands Engineering Solutions Across Power and Telecom Infrastructure",
    excerpt:
      "Strengthening nationwide delivery of integrated power and telecom infrastructure for public and private sector clients.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85&auto=format&fit=crop",
    date: "Mar 15, 2026",
    category: "Infrastructure",
    href: "/blog/hs-group-expands-power-telecom-infrastructure",
  },
  {
    id: 2,
    title: "Smart Infrastructure and IoT Solutions Transforming Modern Project Operations",
    excerpt:
      "How connected monitoring, automation, and data-driven systems are reshaping engineering project delivery.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200&q=85&auto=format&fit=crop",
    date: "Feb 28, 2026",
    category: "Technology",
    href: "/blog/smart-infrastructure-iot-project-operations",
  },
  {
    id: 3,
    title: "Solar Energy and Substation Projects Driving Sustainable Industrial Growth",
    excerpt:
      "Renewable energy and substation deployments supporting long-term industrial and utility-scale expansion.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=85&auto=format&fit=crop",
    date: "Jan 10, 2026",
    category: "Energy",
    href: "/blog/solar-substation-sustainable-industrial-growth",
  },
];
