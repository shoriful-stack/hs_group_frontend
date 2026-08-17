import { portfolioServices, type PortfolioService } from "@/data/services-page";
import { portfolioProjects } from "@/data/projects-page";

export type ServiceBenefit = { title: string; description: string; icon: string };
export type ServiceChallenge = { title: string; description: string };
export type ServiceSolutionBlock = { title: string; text: string };
export type ServiceProcessStep = { step: string; title: string; description: string };
export type ServiceScopeItem = { title: string; description: string; icon: string };
export type ServiceTechItem = { title: string; description: string; icon: string };
export type ServiceSpecRow = { label: string; value: string };
export type ServiceStandard = { title: string; description: string };
export type ServiceFaq = { question: string; answer: string };
export type ServiceDownload = { id: string; title: string; fileType: string; size: string; href: string };
export type ServiceContact = {
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  photo: string;
};

export type ServiceDetail = PortfolioService & {
  overview: string;
  businessValue: string;
  quickFacts: { label: string; value: string }[];
  keyBenefits: ServiceBenefit[];
  challenges: ServiceChallenge[];
  solution: ServiceSolutionBlock[];
  process: ServiceProcessStep[];
  scope: ServiceScopeItem[];
  techCards: ServiceTechItem[];
  industryCards: { title: string; description: string }[];
  whyPoints: { value: number; suffix: string; label: string }[];
  whyItems: { title: string; description: string }[];
  specs: ServiceSpecRow[];
  standards: ServiceStandard[];
  faqs: ServiceFaq[];
  downloads: ServiceDownload[];
  contacts: ServiceContact[];
  relatedServiceSlugs: string[];
  relatedProjectSlugs: string[];
  testimonial: {
    quote: string;
    name: string;
    designation: string;
    company: string;
    rating: number;
  };
};

function buildDetail(service: PortfolioService): ServiceDetail {
  return {
    ...service,
    overview: `${service.title} from HS Group delivers enterprise-grade engineering capability for ${service.category.toLowerCase()} programs — combining design discipline, field execution excellence, and lifecycle support.`,
    businessValue: `Clients engage this service to improve operational reliability, reduce delivery risk, and accelerate infrastructure readiness across ${service.industries.slice(0, 2).join(" and ")} environments.`,
    quickFacts: [
      { label: "Experience", value: "15+ Years" },
      { label: "Projects", value: "390+" },
      { label: "Industries", value: `${service.industries.length}+ Sectors` },
      { label: "Response", value: "Fast Track" },
      { label: "Support", value: "24/7 Ready" },
    ],
    keyBenefits: [
      { title: "Improved Efficiency", description: "Streamlined engineering and delivery workflows.", icon: "Gauge" },
      { title: "Reduced Cost", description: "Controlled packages and lifecycle-focused planning.", icon: "CircleDollarSign" },
      { title: "Higher Safety", description: "Field protocols and quality gates at every stage.", icon: "ShieldCheck" },
      { title: "Scalable Infrastructure", description: "Solutions designed for growth and expansion.", icon: "Expand" },
      { title: "Energy Savings", description: "Performance-minded systems and operations.", icon: "Leaf" },
      { title: "Future Ready", description: "Standards-aligned, upgrade-ready platforms.", icon: "Rocket" },
    ],
    challenges: [
      { title: "Operational Issues", description: "Aging systems and fragmented delivery interfaces reduce reliability." },
      { title: "Downtime Risk", description: "Live-site constraints and outage windows demand precise sequencing." },
      { title: "Energy & Performance Loss", description: "Inefficient assets increase cost and reduce service quality." },
      { title: "Network Complexity", description: "Multi-vendor environments create coordination and interface risk." },
      { title: "Maintenance Cost", description: "Reactive maintenance models inflate long-term operating expense." },
      { title: "Security Risks", description: "Critical facilities require stronger monitoring and access control." },
    ],
    solution: [
      {
        title: "Approach",
        text: `HS Group structures ${service.title} around clear scope baselining, technical readiness, and accountable milestone control.`,
      },
      {
        title: "Engineering Methodology",
        text: "Design, interface reviews, and constructability checks precede mobilization to protect quality and schedule.",
      },
      {
        title: "Implementation",
        text: "Field packages are executed under safety and QA/QC gates with transparent progress reporting.",
      },
      {
        title: "Innovation",
        text: `Digital visibility and proven ${service.technologies.slice(0, 2).join(" / ")} platforms improve decision speed and operational readiness.`,
      },
      {
        title: "Risk Management",
        text: "Interface mapping, contingency planning, and staged verification reduce delivery uncertainty.",
      },
      {
        title: "Long-term Support",
        text: "Handover documentation and optional O&M readiness protect asset performance after commissioning.",
      },
    ],
    process: [
      { step: "01", title: "Consultation", description: "Align objectives, constraints, and success criteria." },
      { step: "02", title: "Site Survey", description: "Assess site conditions and technical interfaces." },
      { step: "03", title: "Engineering Design", description: "Develop constructible, standards-aligned designs." },
      { step: "04", title: "Proposal", description: "Define scope, timeline, and commercial framework." },
      { step: "05", title: "Procurement", description: "Sequence materials and equipment readiness." },
      { step: "06", title: "Installation", description: "Execute field packages under controlled work plans." },
      { step: "07", title: "Testing", description: "Verify performance against acceptance criteria." },
      { step: "08", title: "Commissioning", description: "Energize, validate, and prepare for operations." },
      { step: "09", title: "Training", description: "Transfer knowledge to client operating teams." },
      { step: "10", title: "Maintenance", description: "Support lifecycle care and continuous reliability." },
    ],
    scope: [
      { title: "Consulting", description: "Technical advisory and scope definition.", icon: "MessagesSquare" },
      { title: "Design", description: "Engineering design and documentation.", icon: "PenTool" },
      { title: "Engineering", description: "Detailed packages and interface control.", icon: "DraftingCompass" },
      { title: "Supply", description: "Equipment and materials coordination.", icon: "Package" },
      { title: "Installation", description: "Field installation and integration.", icon: "Wrench" },
      { title: "Testing", description: "Inspection and performance verification.", icon: "ClipboardCheck" },
      { title: "Commissioning", description: "System readiness and energization support.", icon: "Power" },
      { title: "Maintenance", description: "Lifecycle and preventive care options.", icon: "Settings" },
      { title: "24/7 Support", description: "Responsive operational assistance.", icon: "Headset" },
    ],
    techCards: [
      { title: "SCADA", description: "Supervisory visibility and control readiness.", icon: "Monitor" },
      { title: "PLC", description: "Industrial control and automation logic.", icon: "Cpu" },
      { title: "Fiber", description: "High-capacity connectivity infrastructure.", icon: "Cable" },
      { title: "IoT", description: "Connected sensing and asset monitoring.", icon: "Network" },
      { title: "AI Monitoring", description: "Insight-driven operational oversight.", icon: "Brain" },
      { title: "Solar", description: "Renewable generation and monitoring.", icon: "Sun" },
      { title: "Automation", description: "Plant and process control systems.", icon: "Bot" },
      { title: "Cloud Monitoring", description: "Remote dashboards and reporting.", icon: "Cloud" },
      { title: "Security", description: "Access, CCTV, and critical facility protection.", icon: "Shield" },
    ],
    industryCards: service.industries.map((title) => ({
      title,
      description: `${service.title} tailored for ${title.toLowerCase()} operational requirements.`,
    })).concat(
      ["Smart City", "Oil & Gas", "Healthcare", "Education", "Manufacturing"]
        .filter((t) => !service.industries.includes(t))
        .slice(0, Math.max(0, 6 - service.industries.length))
        .map((title) => ({
          title,
          description: `Applicable engineering support for ${title.toLowerCase()} environments.`,
        })),
    ),
    whyPoints: [
      { value: 15, suffix: "+", label: "Years" },
      { value: 390, suffix: "+", label: "Projects" },
      { value: 98, suffix: "%", label: "Satisfaction" },
      { value: 24, suffix: "/7", label: "Support" },
    ],
    whyItems: [
      { title: "ISO Certified Delivery", description: "Quality systems across design and execution." },
      { title: "Expert Engineers", description: "Multidisciplinary teams with field-proven experience." },
      { title: "Fast Delivery", description: "Milestone discipline and coordinated mobilization." },
      { title: "Enterprise Trust", description: "Long-term partnerships with utilities and operators." },
    ],
    specs: [
      { label: "Primary Focus", value: service.category },
      { label: "Core Capabilities", value: service.features.join(", ") },
      { label: "Key Technologies", value: service.technologies.join(", ") },
      { label: "Delivery Model", value: "Design · Supply · Install · Commission" },
      { label: "Performance Goal", value: "Reliable operations with documented handover" },
      { label: "Compatibility", value: "Standards-aligned, multi-vendor interface ready" },
    ],
    standards: [
      { title: "IEC", description: "International electrotechnical standards alignment." },
      { title: "IEEE", description: "Engineering practice for power and systems work." },
      { title: "ISO", description: "Quality management across delivery packages." },
      { title: "BS", description: "British standards referenced where applicable." },
      { title: "NFPA", description: "Fire and life-safety considerations for facilities." },
      { title: "Environmental", description: "Responsible execution and compliance awareness." },
      { title: "Safety", description: "Field safety protocols and observation loops." },
      { title: "QA/QC", description: "Inspection gates and verification documentation." },
    ],
    faqs: [
      {
        question: `What is included in HS Group’s ${service.title}?`,
        answer: `Typical scope covers consulting, design coordination, engineering packages, installation support, testing, commissioning readiness, and optional maintenance.`,
      },
      {
        question: "How do commercial engagements usually start?",
        answer:
          "Most programs begin with consultation and site survey, followed by a scoped proposal / RFP response aligned to technical and commercial requirements.",
      },
      {
        question: "Which industries benefit most from this service?",
        answer: `${service.industries.join(", ")} are primary beneficiaries, with additional applicability across related infrastructure environments.`,
      },
      {
        question: "Do you provide post-commissioning support?",
        answer:
          "Yes. Training, documentation handover, and O&M options are available to protect long-term operational performance.",
      },
    ],
    downloads: [
      { id: "d1", title: "Service Brochure", fileType: "PDF", size: "3.2 MB", href: "#" },
      { id: "d2", title: "Capability Statement", fileType: "PDF", size: "1.9 MB", href: "#" },
      { id: "d3", title: "Company Profile", fileType: "PDF", size: "2.4 MB", href: "#" },
      { id: "d4", title: "Technical Datasheet", fileType: "PDF", size: "2.1 MB", href: "#" },
      { id: "d5", title: "Presentation", fileType: "PPTX", size: "8.6 MB", href: "#" },
      { id: "d6", title: "Whitepaper", fileType: "PDF", size: "1.4 MB", href: "#" },
    ],
    contacts: [
      {
        name: "Rafiq Ahmed",
        role: "Engineering Consultant",
        department: "Technical Solutions",
        email: "solutions@hsgroup.com",
        phone: "+880 1234-567890",
        photo:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=85&auto=format&fit=crop",
      },
      {
        name: "Nadia Rahman",
        role: "Business Development",
        department: "Enterprise Sales",
        email: "bd@hsgroup.com",
        phone: "+880 1234-567891",
        photo:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85&auto=format&fit=crop",
      },
      {
        name: "Imran Chowdhury",
        role: "Technical Support",
        department: "Customer Engineering",
        email: "support@hsgroup.com",
        phone: "+880 1234-567892",
        photo:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85&auto=format&fit=crop",
      },
    ],
    relatedServiceSlugs: portfolioServices
      .filter((s) => s.slug !== service.slug && (s.category === service.category || s.featured))
      .slice(0, 4)
      .map((s) => s.slug),
    relatedProjectSlugs: portfolioProjects
      .filter((p) =>
        p.industry.toLowerCase().includes(service.category.toLowerCase().split(" ")[0] ?? "") ||
        service.technologies.some((t) => p.title.toLowerCase().includes(t.toLowerCase())),
      )
      .slice(0, 4)
      .map((p) => p.slug),
    testimonial: {
      quote: `HS Group delivered ${service.title} with clear engineering discipline, strong coordination, and reliable field execution.`,
      name: "Program Director",
      designation: "Client Leadership",
      company: service.industries[0] ?? "Enterprise Partner",
      rating: 5,
    },
  };
}

export function getServiceDetailBySlug(slug: string): ServiceDetail | undefined {
  const base = portfolioServices.find((s) => s.slug === slug);
  if (!base) return undefined;
  return buildDetail(base);
}

export function getAllServiceSlugs() {
  return portfolioServices.map((s) => s.slug);
}

export function getRelatedServices(slug: string, limit = 4) {
  const current = getServiceDetailBySlug(slug);
  if (!current) return portfolioServices.slice(0, limit);
  const related = current.relatedServiceSlugs
    .map((s) => portfolioServices.find((p) => p.slug === s))
    .filter(Boolean) as PortfolioService[];
  if (related.length >= limit) return related.slice(0, limit);
  return [
    ...related,
    ...portfolioServices.filter((s) => s.slug !== slug && !related.some((r) => r.slug === s.slug)),
  ].slice(0, limit);
}

export function getRelatedProjectsForService(slug: string, limit = 4) {
  const current = getServiceDetailBySlug(slug);
  if (!current) return portfolioProjects.slice(0, limit);
  const related = current.relatedProjectSlugs
    .map((s) => portfolioProjects.find((p) => p.slug === s))
    .filter(Boolean);
  if (related.length >= limit) return related.slice(0, limit) as typeof portfolioProjects;
  return [
    ...related,
    ...portfolioProjects.filter((p) => !related.some((r) => r?.slug === p.slug)),
  ].slice(0, limit) as typeof portfolioProjects;
}
