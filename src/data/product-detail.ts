import { portfolioProducts, type PortfolioProduct } from "@/data/products-page";
import { portfolioServices } from "@/data/services-page";
import { portfolioProjects } from "@/data/projects-page";

export type ProductSpecGroup = {
  group: string;
  rows: { label: string; value: string }[];
};

export type ProductVariant = {
  id: string;
  name: string;
  capacity: string;
  voltage: string;
  dimensions: string;
  applications: string;
  href: string;
};

export type ProductDetail = PortfolioProduct & {
  modelNumber: string;
  countryOfOrigin: string;
  warranty: string;
  availability: string;
  support: string;
  overview: string;
  businessValue: string;
  engineeringAdvantages: string[];
  quickInfo: { label: string; value: string }[];
  kpiCards: { label: string; value: string; suffix?: string }[];
  gallery: { src: string; alt: string; type: "image" | "video" | "360" }[];
  keyFeatures: { title: string; description: string; icon: string }[];
  businessApplications: { title: string; description: string }[];
  specGroups: ProductSpecGroup[];
  variants: ProductVariant[];
  compatibility: { title: string; description: string; icon: string }[];
  technologies: { title: string; description: string; icon: string }[];
  certifications: { title: string; description: string }[];
  industriesServed: { title: string; description: string }[];
  downloads: { id: string; title: string; fileType: string; size: string; href: string }[];
  supportSteps: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  contacts: {
    name: string;
    role: string;
    email: string;
    phone: string;
    photo: string;
  }[];
  cta: {
    label: string;
    headline: string;
    description: string;
    backgroundImage: string;
  };
  /** Interactive configurator options */
  configurator: {
    industries: string[];
    applications: string[];
    capacities: string[];
    environments: string[];
  };
  /** 360° viewer hotspots */
  viewer360: {
    frames: string[];
    hotspots: { id: string; x: number; y: number; title: string; description: string }[];
  };
  /** Compatibility matrix rows */
  compatibilityMatrix: {
    systems: string[];
    rows: { component: string; values: ("full" | "partial" | "none")[] }[];
  };
  /** Product lifecycle stages */
  lifecycle: { step: string; title: string; description: string }[];
};

function modelFromSlug(slug: string) {
  return `HS-${slug
    .split("-")
    .map((p) => p.slice(0, 3).toUpperCase())
    .join("-")
    .slice(0, 18)}`;
}

function buildDetail(product: PortfolioProduct): ProductDetail {
  const modelNumber = modelFromSlug(product.slug);
  return {
    ...product,
    modelNumber,
    countryOfOrigin: "Bangladesh / Global Supply",
    warranty: "12–36 Months (model dependent)",
    availability: "Project Supply Ready",
    support: "24/7 Technical Assistance",
    overview: `${product.title} is an enterprise-grade engineering product designed for ${product.application.toLowerCase()} environments. Built for reliability and standards alignment, it supports ${product.industry.toLowerCase()} programs with documented performance, certification readiness, and lifecycle support from HS Group.`,
    businessValue: `Enterprise buyers select ${product.title} to reduce procurement risk, accelerate deployment readiness, and ensure technical fit across ${product.applications.slice(0, 2).join(" and ")} use cases — with HS Group engineering assistance from selection through after-sales support.`,
    engineeringAdvantages: [
      `Standards-aligned ${product.certification} design intent for enterprise procurement confidence.`,
      `Application-proven features including ${product.features.slice(0, 2).join(" and ").toLowerCase()}.`,
      "Documented datasheets, installation guidance, and specialist support for project delivery.",
      "Compatible with broader HS Group services, integration packages, and field execution models.",
    ],
    quickInfo: [
      { label: "Model Number", value: modelNumber },
      { label: "Product Category", value: product.category },
      { label: "Brand", value: product.brand },
      { label: "Country of Origin", value: "BD / Global Supply" },
      { label: "Warranty", value: "12–36 Months" },
      { label: "Availability", value: "Project Supply Ready" },
      { label: "Support", value: "24/7 Technical" },
    ],
    kpiCards: [
      { label: "Applications", value: String(product.applications.length), suffix: "+" },
      { label: "Primary Industry", value: product.industry.split(" ")[0] ?? "Enterprise" },
      { label: "Operating Focus", value: product.application.split(" ")[0] ?? "Industrial" },
      {
        label: product.compareSpecs[0]?.label ?? "Capacity",
        value: product.compareSpecs[0]?.value ?? "Configurable",
      },
      { label: "Protection", value: "IP-rated options" },
      { label: "Warranty", value: "12–36", suffix: " mo" },
    ],
    gallery: [
      { src: product.image, alt: `${product.title} primary view`, type: "image" },
      {
        src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1400&q=85&auto=format&fit=crop",
        alt: `${product.title} detail view`,
        type: "image",
      },
      {
        src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=85&auto=format&fit=crop",
        alt: `${product.title} installation context`,
        type: "image",
      },
      {
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop",
        alt: `${product.title} 360° viewer placeholder`,
        type: "360",
      },
      {
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=85&auto=format&fit=crop",
        alt: `${product.title} installation animation placeholder`,
        type: "video",
      },
    ],
    keyFeatures: [
      { title: "High Performance", description: "Engineered for demanding continuous-duty environments.", icon: "Gauge" },
      { title: "Energy Efficient", description: "Optimized consumption profiles for long-term operating cost control.", icon: "Leaf" },
      { title: "Reliable", description: "Field-oriented design for uptime-critical applications.", icon: "ShieldCheck" },
      { title: "Easy Maintenance", description: "Serviceable architecture for faster inspection and upkeep.", icon: "Wrench" },
      { title: "Scalable", description: "Modular options supporting growth and phased deployment.", icon: "Expand" },
      { title: "Industrial Grade", description: "Built for harsh industrial and infrastructure conditions.", icon: "Factory" },
      { title: "Smart Monitoring", description: "Ready for monitoring integrations where applicable.", icon: "Monitor" },
      { title: "Future Ready", description: "Upgrade paths aligned with evolving standards and platforms.", icon: "Rocket" },
    ],
    businessApplications: [
      { title: "Power Utilities", description: "Utility and substation-oriented product applications." },
      { title: "Telecommunication", description: "Telecom rooms, towers, and network facilities." },
      { title: "Industrial Plants", description: "Manufacturing and process plant deployments." },
      { title: "Commercial Buildings", description: "Enterprise campuses and commercial facilities." },
      { title: "Government", description: "Public infrastructure and civic projects." },
      { title: "Hospitals", description: "Healthcare reliability and critical facility support." },
      { title: "Educational Institutions", description: "Campus power, network, and facility systems." },
      { title: "Smart Cities", description: "Connected urban and municipal infrastructure." },
      { title: "Manufacturing", description: "Production lines and industrial automation environments." },
    ],
    specGroups: [
      {
        group: "Electrical Specifications",
        rows: [
          { label: "Technology", value: product.technology },
          { label: product.compareSpecs[0]?.label ?? "Class", value: product.compareSpecs[0]?.value ?? "—" },
          { label: product.compareSpecs[1]?.label ?? "Duty", value: product.compareSpecs[1]?.value ?? "—" },
          { label: "Standard Reference", value: product.certification },
        ],
      },
      {
        group: "Mechanical Specifications",
        rows: [
          { label: "Form Factor", value: product.compareSpecs.find((s) => /form|type|build/i.test(s.label))?.value ?? "Industrial" },
          { label: "Construction", value: "Enterprise / Industrial grade" },
          { label: "Mounting", value: "Project-configurable" },
        ],
      },
      {
        group: "Environmental Ratings",
        rows: [
          { label: "Operating Environment", value: product.application },
          { label: "Protection Options", value: "IP-rated configurations available" },
          { label: "Duty Cycle", value: "Continuous / Project defined" },
        ],
      },
      {
        group: "Performance",
        rows: product.features.map((f) => ({ label: "Capability", value: f })),
      },
      {
        group: "Dimensions & Materials",
        rows: [
          { label: "Dimensions", value: "Model dependent — see datasheet" },
          { label: "Weight", value: "Model dependent — see datasheet" },
          { label: "Materials", value: "Industrial-grade assemblies" },
        ],
      },
      {
        group: "Operating Conditions",
        rows: [
          { label: "Primary Application", value: product.application },
          { label: "Target Industry", value: product.industry },
          { label: "Integration Ready", value: "Yes — see compatibility" },
        ],
      },
    ],
    variants: [
      {
        id: `${product.id}-std`,
        name: `${product.title} — Standard`,
        capacity: product.compareSpecs[0]?.value ?? "Standard",
        voltage: product.compareSpecs[1]?.value ?? "Project defined",
        dimensions: "Standard footprint",
        applications: product.applications[0] ?? product.application,
        href: `/products/${product.slug}`,
      },
      {
        id: `${product.id}-pro`,
        name: `${product.title} — Pro`,
        capacity: "Extended",
        voltage: "Configurable",
        dimensions: "Extended footprint",
        applications: product.applications[1] ?? product.application,
        href: `/contact?intent=rfq&product=${product.slug}&variant=pro`,
      },
      {
        id: `${product.id}-ent`,
        name: `${product.title} — Enterprise`,
        capacity: "High capacity",
        voltage: "Program defined",
        dimensions: "Custom / project pack",
        applications: product.applications[2] ?? product.application,
        href: `/contact?intent=rfq&product=${product.slug}&variant=enterprise`,
      },
    ],
    compatibility: [
      { title: "SCADA", description: "Supervisory control interfaces for monitored deployments.", icon: "Monitor" },
      { title: "PLC", description: "Industrial control and automation environments.", icon: "Cpu" },
      { title: "IoT Platforms", description: "Connected sensing and telemetry pathways.", icon: "Wifi" },
      { title: "Fiber Networks", description: "High-capacity communication backbones.", icon: "Cable" },
      { title: "Cloud Monitoring", description: "Remote visibility and operational dashboards.", icon: "Cloud" },
      { title: "Third-party Integration", description: "Multi-vendor system and interface support.", icon: "Network" },
    ],
    technologies: [
      { title: "AI Monitoring", description: "Insight-ready monitoring patterns for critical assets.", icon: "Brain" },
      { title: "IoT", description: "Connected device and sensor enablement.", icon: "Cpu" },
      { title: "Automation", description: "Control and process automation readiness.", icon: "Bot" },
      { title: "Fiber Technology", description: "High-bandwidth communication pathways.", icon: "Cable" },
      { title: "Cloud", description: "Cloud-linked visibility and reporting options.", icon: "Cloud" },
      { title: "Remote Monitoring", description: "Distributed site and asset oversight.", icon: "Radio" },
      { title: "Energy Management", description: "Efficiency and consumption optimization support.", icon: "Gauge" },
      { title: "Cyber Security", description: "Secure operation considerations for connected systems.", icon: "Shield" },
    ],
    certifications: [
      { title: "ISO", description: "Quality management alignment." },
      { title: "IEC", description: "Electrotechnical standards reference." },
      { title: "IEEE", description: "Engineering practice alignment." },
      { title: "CE", description: "Conformity for regulated markets." },
      { title: "RoHS", description: "Hazardous substance restriction." },
      { title: product.certification, description: `Primary product certification focus: ${product.certification}.` },
      { title: "IP Ratings", description: "Protection rating options by model." },
      { title: "Quality Assurance", description: "QA gates across supply and documentation." },
      { title: "Environmental Compliance", description: "Responsible materials and lifecycle considerations." },
    ],
    industriesServed: [
      { title: "Power", description: "Utilities and power infrastructure programs." },
      { title: "Telecom", description: "Operator and network facility projects." },
      { title: "Infrastructure", description: "Civil and urban infrastructure packages." },
      { title: "Industrial", description: "Plants, factories, and process sites." },
      { title: "Commercial", description: "Enterprise and commercial facilities." },
      { title: "Healthcare", description: "Hospitals and critical care campuses." },
      { title: "Education", description: "Campus and institutional systems." },
      { title: "Oil & Gas", description: "Energy and process industry environments." },
      { title: "Renewable Energy", description: "Solar and clean-energy deployments." },
      { title: "Government", description: "Public sector and civic programs." },
    ],
    downloads: [
      { id: "ds", title: "Product Datasheet", fileType: "PDF", size: "1.2 MB", href: `#download-${product.slug}-datasheet` },
      { id: "cad", title: "CAD Drawing (DWG/DXF)", fileType: "DWG", size: "4.8 MB", href: `#download-${product.slug}-cad` },
      { id: "bim", title: "BIM / Revit File", fileType: "RVT", size: "12.4 MB", href: `#download-${product.slug}-bim` },
      { id: "inst", title: "Installation Manual", fileType: "PDF", size: "1.6 MB", href: `#download-${product.slug}-install` },
      { id: "usr", title: "User Manual", fileType: "PDF", size: "1.4 MB", href: `#download-${product.slug}-user` },
      { id: "comp", title: "Compliance Certificates", fileType: "PDF", size: "0.8 MB", href: `#download-${product.slug}-compliance` },
      { id: "cat", title: "Product Catalogue", fileType: "PDF", size: "2.4 MB", href: `#download-${product.slug}` },
      { id: "war", title: "Warranty Information", fileType: "PDF", size: "0.5 MB", href: `#download-${product.slug}-warranty` },
    ],
    configurator: {
      industries: [product.industry, "Industrial Plants", "Commercial Buildings", "Government"],
      applications: [product.application, ...product.applications.slice(0, 3)],
      capacities: [
        product.compareSpecs[0]?.value ?? "Standard",
        "Extended Capacity",
        "Enterprise / Custom",
      ],
      environments: ["Indoor Controlled", "Industrial", "Outdoor / Shelter", "Mission Critical"],
    },
    viewer360: {
      frames: [
        product.image,
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1400&q=85&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=85&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=85&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=85&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1400&q=85&auto=format&fit=crop&sat=-20",
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1400&q=85&auto=format&fit=crop&sat=-10",
      ],
      hotspots: [
        {
          id: "hs1",
          x: 28,
          y: 38,
          title: product.features[0] ?? "Core Assembly",
          description: "Primary engineering feature highlighted for technical review.",
        },
        {
          id: "hs2",
          x: 62,
          y: 48,
          title: product.features[1] ?? "Interface Zone",
          description: "Integration and service access area for field teams.",
        },
        {
          id: "hs3",
          x: 48,
          y: 68,
          title: product.features[2] ?? "Service Point",
          description: "Maintenance-friendly access for inspection and upkeep.",
        },
      ],
    },
    compatibilityMatrix: {
      systems: ["SCADA", "PLC", "Modbus / TCP", "IoT Gateway", "Fiber Network", "Cloud Monitor"],
      rows: [
        { component: "Controller Interface", values: ["full", "full", "full", "partial", "partial", "full"] },
        { component: "Protocol Gateway", values: ["full", "full", "full", "full", "partial", "full"] },
        { component: "Accessory Kits", values: ["full", "partial", "full", "full", "full", "partial"] },
        { component: "Remote Monitoring", values: ["full", "partial", "partial", "full", "full", "full"] },
        { component: "Third-party Devices", values: ["partial", "full", "full", "partial", "full", "partial"] },
      ],
    },
    lifecycle: [
      { step: "01", title: "Design", description: "Application engineering and model selection." },
      { step: "02", title: "Manufacturing", description: "Standards-aligned production and supply readiness." },
      { step: "03", title: "Quality Testing", description: "Inspection, verification, and documentation gates." },
      { step: "04", title: "Installation", description: "Site deployment with method-statement discipline." },
      { step: "05", title: "Maintenance", description: "Lifecycle service, spares, and performance care." },
      { step: "06", title: "Upgrade", description: "Capacity, monitoring, and system evolution paths." },
    ],
    supportSteps: [
      { step: "01", title: "Site Assessment", description: "Application review and site readiness evaluation." },
      { step: "02", title: "Installation", description: "Coordinated installation aligned to project method statements." },
      { step: "03", title: "Configuration", description: "Parameter setup and system interface configuration." },
      { step: "04", title: "Testing", description: "Functional checks and handover verification." },
      { step: "05", title: "Training", description: "Operator and maintenance orientation." },
      { step: "06", title: "Maintenance", description: "Lifecycle maintenance guidance and spare planning." },
      { step: "07", title: "After-sales Support", description: "Warranty handling and technical follow-up." },
      { step: "08", title: "24/7 Technical Assistance", description: "Escalation path for urgent engineering support." },
    ],
    faqs: [
      {
        question: `What applications is ${product.title} best suited for?`,
        answer: `${product.title} is commonly applied in ${product.applications.join(", ")} — particularly for ${product.industry.toLowerCase()} programs requiring ${product.application.toLowerCase()}.`,
      },
      {
        question: "Where can I find technical specifications and drawings?",
        answer:
          "Use the Downloads section for datasheets, installation manuals, technical drawings, and compliance documents. Product specialists can also provide package-specific documentation.",
      },
      {
        question: "How does warranty and after-sales support work?",
        answer:
          "Warranty terms depend on model and supply package (typically 12–36 months). HS Group provides technical assistance, documentation, and after-sales escalation support.",
      },
      {
        question: "Can this product integrate with existing systems?",
        answer:
          "Yes. Compatibility pathways include SCADA, PLC, IoT platforms, fiber networks, cloud monitoring, and selected third-party integrations depending on project scope.",
      },
      {
        question: "How do I request a quotation (RFQ)?",
        answer:
          "Use Request a Quote or Contact Product Specialist. Include application, capacity requirements, site conditions, and preferred documentation for faster response.",
      },
    ],
    contacts: [
      {
        name: "Karim Hassan",
        role: "Product Engineer",
        email: "products@hsgroup.com",
        phone: "+880 1234-567880",
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=85&auto=format&fit=crop",
      },
      {
        name: "Sara Islam",
        role: "Technical Consultant",
        email: "solutions@hsgroup.com",
        phone: "+880 1234-567881",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85&auto=format&fit=crop",
      },
      {
        name: "Imran Chowdhury",
        role: "Business Development Manager",
        email: "bd@hsgroup.com",
        phone: "+880 1234-567882",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85&auto=format&fit=crop",
      },
    ],
    cta: {
      label: "PRODUCT SUPPORT",
      headline: "Need the Right Engineering Product for Your Project?",
      description:
        "Talk to our experts and receive tailored recommendations, documentation packs, and quotation support for your application.",
      backgroundImage:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=85&auto=format&fit=crop",
    },
  };
}

export function getProductDetailBySlug(slug: string): ProductDetail | undefined {
  const base = portfolioProducts.find((p) => p.slug === slug || p.id === slug);
  if (!base) return undefined;
  return buildDetail(base);
}

export function getAllProductSlugs() {
  return portfolioProducts.map((p) => p.slug);
}

export function getCategoryCompareProducts(slug: string, limit = 4) {
  const current = getProductDetailBySlug(slug);
  if (!current) return portfolioProducts.slice(0, limit);
  return portfolioProducts
    .filter((p) => p.category === current.category)
    .slice(0, Math.max(limit, 2));
}

export function suggestConfiguredModel(
  slug: string,
  input: { industry: string; application: string; capacity: string; environment: string },
) {
  const current = getProductDetailBySlug(slug);
  if (!current) return null;
  const sameCategory = portfolioProducts.filter((p) => p.category === current.category);
  const scored = sameCategory.map((p) => {
    let score = p.slug === slug ? 1 : 0;
    if (p.industry === input.industry) score += 3;
    if (p.application === input.application || p.applications.includes(input.application)) score += 3;
    if (p.compareSpecs.some((s) => s.value === input.capacity)) score += 2;
    if (/outdoor|shelter/i.test(input.environment) && /outdoor|led|fiber|solar/i.test(p.title + p.application)) score += 1;
    if (/mission|critical/i.test(input.environment) && /backup|dc|critical|security/i.test(p.application + p.features.join(" "))) score += 2;
    return { product: p, score };
  });
  scored.sort((a, b) => b.score - a.score || b.product.popular - a.product.popular);
  return scored[0]?.product ?? current;
}

export function getRelatedProducts(slug: string, limit = 4) {
  const current = getProductDetailBySlug(slug);
  if (!current) return portfolioProducts.slice(0, limit);
  const related = portfolioProducts.filter(
    (p) => p.slug !== slug && (p.category === current.category || p.industry === current.industry),
  );
  if (related.length >= limit) return related.slice(0, limit);
  return [
    ...related,
    ...portfolioProducts.filter((p) => p.slug !== slug && !related.some((r) => r.slug === p.slug)),
  ].slice(0, limit);
}

export function getRelatedServicesForProduct(slug: string, limit = 4) {
  const current = getProductDetailBySlug(slug);
  if (!current) return portfolioServices.slice(0, limit);
  const related = current.relatedServices
    .map((s) => portfolioServices.find((p) => p.slug === s))
    .filter(Boolean);
  if (related.length >= limit) return related.slice(0, limit) as typeof portfolioServices;
  return [
    ...related,
    ...portfolioServices.filter((s) => !related.some((r) => r?.slug === s.slug)),
  ].slice(0, limit) as typeof portfolioServices;
}

export function getRelatedProjectsForProduct(slug: string, limit = 4) {
  const current = getProductDetailBySlug(slug);
  if (!current) return portfolioProjects.slice(0, limit);
  const related = current.relatedProjects
    .map((s) => portfolioProjects.find((p) => p.slug === s))
    .filter(Boolean);
  if (related.length >= limit) return related.slice(0, limit) as typeof portfolioProjects;
  return [
    ...related,
    ...portfolioProjects.filter((p) => !related.some((r) => r?.slug === p.slug)),
  ].slice(0, limit) as typeof portfolioProjects;
}
