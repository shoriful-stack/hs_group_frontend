import { portfolioProjects, type PortfolioProject } from "@/data/projects-page";
import { services } from "@/data/site";

export type CaseStudyStat = { value: number; suffix: string; label: string };
export type CaseStudyScope = { title: string; description: string; icon: string };
export type CaseStudyProcess = { step: string; title: string; description: string };
export type CaseStudyTech = { title: string; description: string; icon: string };
export type CaseStudyGalleryItem = {
  id: string;
  title: string;
  image: string;
  type: "photo" | "video" | "drone";
  caption: string;
};
export type CaseStudyMilestone = {
  date: string;
  title: string;
  description: string;
  image: string;
};
export type CaseStudyImpact = { value: number; suffix: string; label: string; detail: string };
export type CaseStudyFaq = { question: string; answer: string };
export type CaseStudyDownload = {
  id: string;
  title: string;
  fileType: string;
  size: string;
  href: string;
};
export type CaseStudyContact = {
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  photo: string;
};

export type ProjectCaseStudy = PortfolioProject & {
  leadEngineer: string;
  duration: string;
  projectValueDisplay: string;
  overview: string;
  executiveSummary: string;
  objectives: string[];
  challenge: {
    statement: string;
    painPoints: string[];
    constraints: string[];
    risks: string[];
  };
  solution: {
    strategy: string;
    design: string;
    execution: string;
    innovation: string;
    sustainability: string;
  };
  stats: CaseStudyStat[];
  scope: CaseStudyScope[];
  process: CaseStudyProcess[];
  techCards: CaseStudyTech[];
  gallery: CaseStudyGalleryItem[];
  beforeAfter: { before: string; after: string; caption: string } | null;
  milestones: CaseStudyMilestone[];
  impacts: CaseStudyImpact[];
  testimonial: {
    quote: string;
    name: string;
    designation: string;
    company: string;
    rating: number;
    photo?: string;
  };
  awards: { title: string; description: string; icon: string }[];
  faqs: CaseStudyFaq[];
  downloads: CaseStudyDownload[];
  contacts: CaseStudyContact[];
  relatedServiceIds: string[];
  relatedProjectSlugs: string[];
};

function buildCaseStudy(project: PortfolioProject): ProjectCaseStudy {
  return {
    ...project,
    leadEngineer: "Engr. Rahman Ahmed",
    duration: "18–24 months",
    projectValueDisplay: project.value,
    overview: `${project.title} demonstrates HS Group’s capability to deliver complex ${project.industry.toLowerCase()} infrastructure with disciplined engineering, field excellence, and measurable operational outcomes for ${project.client}.`,
    executiveSummary: `This program was designed to strengthen ${project.industry.toLowerCase()} performance for ${project.client} in ${project.location}. HS Group aligned design, procurement, installation, and commissioning under a unified quality framework to reduce delivery risk and accelerate reliable handover.`,
    objectives: [
      "Deliver reliable engineering performance under defined quality gates",
      "Reduce operational risk through disciplined site execution",
      "Improve long-term asset readiness and maintainability",
      "Provide transparent progress reporting for stakeholder confidence",
    ],
    challenge: {
      statement: `${project.client} required a dependable ${project.industry.toLowerCase()} solution capable of meeting demanding site conditions, schedule pressure, and operational continuity requirements in ${project.location}.`,
      painPoints: [
        "Complex coordination across multidisciplinary engineering scopes",
        "Limited tolerance for downtime during critical interfaces",
        "Strict safety and quality compliance expectations",
        "Need for clear milestone visibility across stakeholders",
      ],
      constraints: [
        "Live-site interfaces and access limitations",
        "Utility and regulatory compliance requirements",
        "Equipment lead times and logistics sequencing",
      ],
      risks: [
        "Schedule compression during peak execution windows",
        "Interface conflicts between civil, electrical, and systems packages",
        "Weather and site readiness variability",
      ],
    },
    solution: {
      strategy:
        "HS Group applied an integrated engineering delivery model connecting design readiness, procurement sequencing, and field execution under one accountable program structure.",
      design:
        "Technical design prioritized reliability, maintainability, and constructability, with quality checkpoints before mobilization.",
      execution:
        "Installation and testing were staged to protect operational continuity while accelerating commissioning readiness.",
      innovation:
        "Digital progress tracking and structured QA/QC documentation improved decision speed and transparency.",
      sustainability:
        "Execution planning emphasized safety, energy-efficient systems where applicable, and long-term lifecycle performance.",
    },
    stats: [
      { value: 24, suffix: "+", label: "Engineers" },
      { value: 120, suffix: "k+", label: "Man-hours" },
      { value: 98, suffix: "%", label: "Completion" },
      { value: 3, suffix: "×", label: "Quality Gates" },
      { value: 12, suffix: "+", label: "Systems" },
      { value: 100, suffix: "%", label: "Handover Docs" },
    ],
    scope: [
      { title: "Design", description: "Engineering design and constructability reviews.", icon: "PenTool" },
      { title: "Engineering", description: "Technical coordination and package integration.", icon: "DraftingCompass" },
      { title: "Supply", description: "Equipment and materials logistics readiness.", icon: "Package" },
      { title: "Installation", description: "Field installation under controlled work packages.", icon: "Wrench" },
      { title: "Testing", description: "Inspection, verification, and performance checks.", icon: "ClipboardCheck" },
      { title: "Commissioning", description: "System energization and readiness validation.", icon: "Power" },
      { title: "Maintenance", description: "Handover support and lifecycle readiness guidance.", icon: "Settings" },
    ],
    process: [
      { step: "01", title: "Planning", description: "Scope alignment, risk planning, and delivery roadmap." },
      { step: "02", title: "Design", description: "Engineering development and technical approvals." },
      { step: "03", title: "Procurement", description: "Sourcing, logistics, and readiness sequencing." },
      { step: "04", title: "Execution", description: "Field installation with safety and quality controls." },
      { step: "05", title: "Testing", description: "Verification against performance criteria." },
      { step: "06", title: "Handover", description: "Commissioning support and documentation close-out." },
    ],
    techCards: [
      { title: "Equipment", description: project.technologies[0] ?? "Core engineered systems", icon: "Cpu" },
      { title: "Software", description: "Progress tracking and engineering documentation", icon: "Monitor" },
      { title: "Standards", description: "International QA/QC and safety practice", icon: "BookCheck" },
      { title: "Methods", description: "Stage-gate delivery and interface control", icon: "Workflow" },
      { title: "Automation", description: "Controls and monitoring where applicable", icon: "Bot" },
      { title: "Digital", description: "IoT / SCADA readiness for operational visibility", icon: "Network" },
    ],
    gallery: [
      {
        id: `${project.slug}-g1`,
        title: "Site Progress",
        image: project.image,
        type: "photo",
        caption: "Primary project environment and field delivery context.",
      },
      {
        id: `${project.slug}-g2`,
        title: "Construction Works",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85&auto=format&fit=crop",
        type: "photo",
        caption: "Active construction and installation coordination.",
      },
      {
        id: `${project.slug}-g3`,
        title: "Aerial Progress",
        image:
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=85&auto=format&fit=crop",
        type: "drone",
        caption: "Drone perspective of site development progress.",
      },
      {
        id: `${project.slug}-g4`,
        title: "Commissioning Focus",
        image:
          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=85&auto=format&fit=crop",
        type: "video",
        caption: "Technical teams validating readiness before handover.",
      },
    ],
    beforeAfter: {
      before:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85&auto=format&fit=crop",
      after: project.image,
      caption: "Progress from early mobilization to advanced delivery readiness.",
    },
    milestones: [
      {
        date: `Q1 ${Number(project.year) - 1}`,
        title: "Planning Kickoff",
        description: "Scope baselining, interface mapping, and delivery planning.",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&q=85&auto=format&fit=crop",
      },
      {
        date: `Q3 ${Number(project.year) - 1}`,
        title: "Execution Peak",
        description: "Major installation packages progressing under controlled quality gates.",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=85&auto=format&fit=crop",
      },
      {
        date: `Q2 ${project.year}`,
        title: "Commissioning",
        description: "System verification, testing, and readiness for operational use.",
        image:
          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1000&q=85&auto=format&fit=crop",
      },
      {
        date: `Q4 ${project.year}`,
        title: "Handover",
        description: "Documentation close-out and transition to client operations.",
        image: project.image,
      },
    ],
    impacts: [
      { value: 28, suffix: "%", label: "Efficiency Increase", detail: "Improved operational readiness" },
      { value: 18, suffix: "%", label: "Energy Saving", detail: "Optimized system performance" },
      { value: 15, suffix: "%", label: "Cost Reduction", detail: "Controlled delivery waste" },
      { value: 22, suffix: "%", label: "Carbon Reduction", detail: "Lower lifecycle intensity" },
      { value: 99, suffix: "%", label: "Reliability", detail: "Stable post-handover performance" },
      { value: 98, suffix: "%", label: "Satisfaction", detail: "Client stakeholder feedback" },
    ],
    testimonial: {
      quote: `HS Group delivered ${project.title} with clear milestone control, strong field discipline, and reliable engineering coordination throughout the program.`,
      name: "Project Director",
      designation: "Client Program Leadership",
      company: project.client,
      rating: 5,
      photo:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=85&auto=format&fit=crop",
    },
    awards: [
      { title: "ISO Aligned Delivery", description: "Quality systems applied across work packages.", icon: "BadgeCheck" },
      { title: "Safety Excellence", description: "Structured field safety protocols and reporting.", icon: "ShieldCheck" },
      { title: "Quality Assurance", description: "Documented inspection and verification gates.", icon: "ClipboardCheck" },
      { title: "Project Recognition", description: "Recognized for dependable engineering delivery.", icon: "Trophy" },
    ],
    faqs: [
      {
        question: "What was HS Group’s primary scope on this project?",
        answer:
          "HS Group provided multidisciplinary engineering delivery across design coordination, installation support, testing, and commissioning readiness.",
      },
      {
        question: "How was quality controlled during execution?",
        answer:
          "The program used stage-gate QA/QC checkpoints, inspection documentation, and interface reviews before critical milestones.",
      },
      {
        question: "Can similar delivery models be applied to other sites?",
        answer:
          "Yes. The same integrated delivery framework scales across power, telecom, renewable, and industrial infrastructure programs.",
      },
      {
        question: "How do clients engage HS Group for a similar project?",
        answer:
          "Start with a consultation through the Contact page. Our project and business development teams will align scope, timeline, and delivery approach.",
      },
    ],
    downloads: [
      { id: "d1", title: "Project Brochure", fileType: "PDF", size: "3.2 MB", href: "#" },
      { id: "d2", title: "Case Study PDF", fileType: "PDF", size: "2.8 MB", href: "#" },
      { id: "d3", title: "Technical Datasheet", fileType: "PDF", size: "1.9 MB", href: "#" },
      { id: "d4", title: "Project Presentation", fileType: "PPTX", size: "8.4 MB", href: "#" },
      { id: "d5", title: "Completion Certificate", fileType: "PDF", size: "0.8 MB", href: "#" },
    ],
    contacts: [
      {
        name: "Karim Hasan",
        role: "Project Manager",
        department: "Project Delivery",
        email: "projects@hsgroup.com",
        phone: "+880 1234-567890",
        photo:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85&auto=format&fit=crop",
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
        role: "Technical Sales",
        department: "Engineering Solutions",
        email: "solutions@hsgroup.com",
        phone: "+880 1234-567892",
        photo:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=85&auto=format&fit=crop",
      },
    ],
    relatedServiceIds: ["power-utility", "telecom", "civil-design", "electrical-mechanical"].filter((id) =>
      services.some((s) => s.id === id),
    ),
    relatedProjectSlugs: portfolioProjects
      .filter((p) => p.slug !== project.slug && (p.industry === project.industry || p.featured))
      .slice(0, 4)
      .map((p) => p.slug),
  };
}

/** Stronger storytelling for the flagship substation case study */
const flagshipOverride: Partial<ProjectCaseStudy> = {
  leadEngineer: "Engr. Farhana Islam",
  duration: "22 months",
  projectValueDisplay: "Strategic Utility Capex",
  overview:
    "The National Grid Substation Upgrade strengthened transmission reliability for industrial and urban load centers. HS Group delivered an integrated EPC-aligned engineering program covering design coordination, installation packages, testing, and commissioning support.",
  executiveSummary:
    "Facing rising demand and aging interface constraints, the client needed a dependable substation upgrade with minimal operational disruption. HS Group structured delivery around rigorous interface control, staged energization readiness, and transparent milestone reporting — producing a reliable handover with documented quality and safety performance.",
  challenge: {
    statement:
      "The utility required a high-capacity substation upgrade capable of supporting growing industrial and urban demand while protecting live network continuity.",
    painPoints: [
      "Aging assets limiting reliability under peak demand",
      "Complex outage windows and live-site interfaces",
      "Strict compliance, safety, and documentation requirements",
      "Need for predictable commissioning and stakeholder visibility",
    ],
    constraints: [
      "Restricted outage windows",
      "Multi-contractor interface coordination",
      "Equipment logistics and testing dependencies",
    ],
    risks: [
      "Energization delays from incomplete interface readiness",
      "Weather impact on outdoor package sequencing",
      "Quality variance without stage-gate discipline",
    ],
  },
  solution: {
    strategy:
      "An integrated engineering control model synchronized design freeze, procurement readiness, and staged field packages under one accountable delivery structure.",
    design:
      "Design prioritized GIS/switchgear reliability, SCADA visibility, and constructability reviews before major mobilization.",
    execution:
      "Installation packages were sequenced around approved outage windows with continuous QA/QC and safety observation loops.",
    innovation:
      "Digital progress dashboards and structured punch-list governance accelerated decision-making and reduced close-out friction.",
    sustainability:
      "Delivery emphasized safer field practices, efficient system performance, and documentation that supports long-term asset lifecycle management.",
  },
  stats: [
    { value: 48, suffix: "+", label: "Engineers" },
    { value: 210, suffix: "k+", label: "Man-hours" },
    { value: 100, suffix: "%", label: "Completion" },
    { value: 6, suffix: "", label: "Major Packages" },
    { value: 14, suffix: "+", label: "Systems" },
    { value: 0, suffix: "", label: "Lost-Time Focus" },
  ],
};

export function getCaseStudyBySlug(slug: string): ProjectCaseStudy | undefined {
  const base = portfolioProjects.find((p) => p.slug === slug);
  if (!base) return undefined;
  const study = buildCaseStudy(base);
  if (base.slug === "national-grid-substation") {
    return {
      ...study,
      ...flagshipOverride,
      challenge: flagshipOverride.challenge ?? study.challenge,
      solution: flagshipOverride.solution ?? study.solution,
      stats: flagshipOverride.stats ?? study.stats,
    };
  }
  return study;
}

export function getAllCaseStudySlugs() {
  return portfolioProjects.map((p) => p.slug);
}

export function getRelatedCaseStudies(slug: string, limit = 4) {
  const current = getCaseStudyBySlug(slug);
  if (!current) return portfolioProjects.slice(0, limit);
  const related = current.relatedProjectSlugs
    .map((s) => portfolioProjects.find((p) => p.slug === s))
    .filter(Boolean) as PortfolioProject[];
  if (related.length >= limit) return related.slice(0, limit);
  const extras = portfolioProjects.filter(
    (p) => p.slug !== slug && !related.some((r) => r.slug === p.slug),
  );
  return [...related, ...extras].slice(0, limit);
}

export function getRelatedServicesForCase(ids: string[]) {
  if (!Array.isArray(ids) || !Array.isArray(services)) return [];
  return services.filter((s) => s?.id && ids.includes(s.id)).slice(0, 6);
}
