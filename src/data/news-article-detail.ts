import { newsArticles, newsCategories, type NewsArticle, type NewsCategory } from "@/data/news";
import { projects, services } from "@/data/site";

export type ContentBlock =
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export type ArticleAuthor = {
  name: string;
  designation: string;
  department: string;
  bio: string;
  photo: string;
  linkedin: string;
  email: string;
  articlesCount: number;
};

export type ArticleGalleryItem = {
  id: string;
  title: string;
  image: string;
  type: "photo" | "video";
  caption: string;
};

export type ArticleDownload = {
  id: string;
  title: string;
  fileType: string;
  size: string;
  href: string;
};

export type ProjectInfo = {
  client: string;
  location: string;
  industry: string;
  duration: string;
  completion: string;
  scope: string;
  technologies: string[];
  status: string;
};

export type EngineeringHighlight = {
  label: string;
  value: string;
};

export type BeforeAfter = {
  before: string;
  after: string;
  caption: string;
};

export type ArticleDetail = NewsArticle & {
  updatedDate: string;
  updatedLabel: string;
  wordCount: number;
  views: number;
  authorProfile: ArticleAuthor;
  tags: string[];
  content: ContentBlock[];
  pullQuote: { text: string; attribution: string; role: string };
  highlights: EngineeringHighlight[];
  gallery: ArticleGalleryItem[];
  projectInfo: ProjectInfo | null;
  beforeAfter: BeforeAfter | null;
  downloads: ArticleDownload[];
  relatedServiceIds: string[];
  relatedProjectIds: number[];
};

const authors: Record<string, ArticleAuthor> = {
  communications: {
    name: "HS Group Communications",
    designation: "Corporate Communications Lead",
    department: "Corporate Affairs",
    bio: "Responsible for enterprise communications, press relations, and editorial storytelling across HS Group’s engineering portfolio.",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=85&auto=format&fit=crop",
    linkedin: "#",
    email: "media@hsgroup.com",
    articlesCount: 24,
  },
  engineering: {
    name: "Engineering Desk",
    designation: "Senior Engineering Editor",
    department: "Technical Communications",
    bio: "Covers project delivery, digital infrastructure, and field engineering practices across power, telecom, and industrial programs.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85&auto=format&fit=crop",
    linkedin: "#",
    email: "engineering@hsgroup.com",
    articlesCount: 18,
  },
  energy: {
    name: "Energy Desk",
    designation: "Renewable Energy Correspondent",
    department: "Power & Utilities",
    bio: "Reports on solar, substation, and grid modernization programs supporting industrial and utility clients.",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=85&auto=format&fit=crop",
    linkedin: "#",
    email: "energy@hsgroup.com",
    articlesCount: 15,
  },
  corporate: {
    name: "Corporate Affairs",
    designation: "Press & Public Affairs Manager",
    department: "Corporate Affairs",
    bio: "Leads official announcements, milestone communications, and stakeholder engagement for HS Group.",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85&auto=format&fit=crop",
    linkedin: "#",
    email: "corporate@hsgroup.com",
    articlesCount: 21,
  },
  csr: {
    name: "CSR Office",
    designation: "Community Impact Lead",
    department: "CSR & Sustainability",
    bio: "Develops community skills programs and social value initiatives aligned with responsible engineering growth.",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=85&auto=format&fit=crop",
    linkedin: "#",
    email: "csr@hsgroup.com",
    articlesCount: 9,
  },
  media: {
    name: "Media Desk",
    designation: "Media Relations Specialist",
    department: "Corporate Communications",
    bio: "Produces media features, event coverage, and visual storytelling from HS Group project sites and forums.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85&auto=format&fit=crop",
    linkedin: "#",
    email: "press@hsgroup.com",
    articlesCount: 12,
  },
};

function authorFor(article: NewsArticle): ArticleAuthor {
  if (article.author.includes("Engineering")) return authors.engineering;
  if (article.author.includes("Energy")) return authors.energy;
  if (article.author.includes("Corporate")) return authors.corporate;
  if (article.author.includes("CSR")) return authors.csr;
  if (article.author.includes("Media")) return authors.media;
  return authors.communications;
}

const defaultDownloads: ArticleDownload[] = [
  { id: "dd1", title: "Company Profile", fileType: "PDF", size: "2.4 MB", href: "#" },
  { id: "dd2", title: "Technical Datasheet", fileType: "PDF", size: "1.8 MB", href: "#" },
  { id: "dd3", title: "Project Presentation", fileType: "PPTX", size: "8.2 MB", href: "#" },
  { id: "dd4", title: "Press Kit", fileType: "ZIP", size: "14.5 MB", href: "#" },
  { id: "dd5", title: "Media Images", fileType: "ZIP", size: "22.0 MB", href: "#" },
];

const projectDownloads: ArticleDownload[] = [
  { id: "pd1", title: "Project Brochure", fileType: "PDF", size: "3.6 MB", href: "#" },
  { id: "pd2", title: "Technical Datasheet", fileType: "PDF", size: "2.1 MB", href: "#" },
  { id: "pd3", title: "Engineering Presentation", fileType: "PPTX", size: "9.4 MB", href: "#" },
  { id: "pd4", title: "Media Kit", fileType: "ZIP", size: "18.0 MB", href: "#" },
  { id: "pd5", title: "High-Resolution Images", fileType: "ZIP", size: "36.0 MB", href: "#" },
];

function buildContent(article: NewsArticle): ContentBlock[] {
  return [
    {
      type: "h2",
      id: "executive-overview",
      text: "Executive Overview",
    },
    { type: "p", text: article.summary },
    { type: "p", text: article.body[0] ?? article.excerpt },
    {
      type: "callout",
      title: "Engineering Insight",
      text: "HS Group combines disciplined project controls, field-proven execution, and digital monitoring to deliver infrastructure programs with measurable reliability.",
    },
    {
      type: "h2",
      id: "delivery-approach",
      text: "Delivery Approach",
    },
    {
      type: "p",
      text:
        article.body[1] ??
        "Our multidisciplinary teams align design, procurement, construction, and commissioning under a unified quality framework.",
    },
    {
      type: "ul",
      items: [
        "Integrated engineering planning across civil, electrical, and telecom scopes",
        "Safety-first site execution with documented quality gates",
        "Digital progress tracking and stakeholder reporting",
        "Lifecycle support from mobilization through handover",
      ],
    },
    {
      type: "h3",
      id: "capability-focus",
      text: "Capability Focus",
    },
    {
      type: "p",
      text:
        article.body[2] ??
        "From power transmission and renewable interconnection to telecom rollout and smart infrastructure, HS Group builds solutions designed for long-term operational performance.",
    },
    {
      type: "image",
      src: article.image,
      alt: article.title,
      caption: "Field engineering teams coordinating delivery milestones on an active infrastructure program.",
    },
    {
      type: "h2",
      id: "program-impact",
      text: "Program Impact",
    },
    {
      type: "p",
      text: "The program strengthens national infrastructure readiness while reinforcing HS Group’s role as a trusted engineering partner for public and private sector clients.",
    },
    {
      type: "table",
      headers: ["Focus Area", "Outcome"],
      rows: [
        ["Reliability", "Improved operational continuity"],
        ["Safety", "Structured field protocols"],
        ["Delivery", "Milestone-driven execution"],
        ["Partnership", "Long-term client collaboration"],
      ],
    },
    {
      type: "h2",
      id: "looking-ahead",
      text: "Looking Ahead",
    },
    {
      type: "p",
      text: "HS Group continues to invest in people, process excellence, and technology partnerships that support durable infrastructure outcomes across Bangladesh and regional markets.",
    },
  ];
}

function tagsFor(category: NewsCategory): string[] {
  const map: Record<string, string[]> = {
    "Company News": ["Power", "Telecom", "Infrastructure"],
    Projects: ["Infrastructure", "Power", "Smart City"],
    "Press Release": ["Infrastructure", "Power", "Telecom"],
    CSR: ["Infrastructure", "Civil"],
    Awards: ["Infrastructure", "Engineering"],
    Events: ["Infrastructure", "Telecom", "Smart City"],
    Media: ["Power", "Infrastructure"],
    All: ["Infrastructure"],
  };
  return map[category] ?? ["Infrastructure", "Power", "Telecom"];
}

function isProjectArticle(article: NewsArticle) {
  return article.category === "Projects" || article.category === "Media";
}

function enrich(article: NewsArticle): ArticleDetail {
  const projectBased = isProjectArticle(article);
  const wordCount = Math.max(
    680,
    article.body.join(" ").split(/\s+/).length * 45 + article.summary.split(/\s+/).length * 12,
  );

  return {
    ...article,
    updatedDate: article.date,
    updatedLabel: article.dateLabel,
    wordCount,
    views: 1200 + article.popular * 37,
    authorProfile: authorFor(article),
    tags: tagsFor(article.category),
    content: buildContent(article),
    pullQuote: {
      text: "Reliable infrastructure is built through disciplined engineering, accountable delivery, and long-term partnership.",
      attribution: "Managing Director",
      role: "HS Group Leadership",
    },
    highlights: [
      { label: "Project Type", value: projectBased ? "Engineering Delivery" : "Corporate Program" },
      { label: "Industry", value: article.category === "Projects" ? "Infrastructure" : "Engineering" },
      { label: "Technology", value: "Integrated Systems" },
      { label: "Project Value", value: projectBased ? "Multi-phase" : "Enterprise" },
      { label: "Completion", value: article.dateLabel },
      { label: "Client", value: "Public & Private Sector" },
      { label: "Country", value: "Bangladesh" },
    ],
    gallery: [
      {
        id: `${article.slug}-g1`,
        title: "Site Operations",
        image: article.image,
        type: "photo",
        caption: "Active engineering operations supporting program delivery.",
      },
      {
        id: `${article.slug}-g2`,
        title: "Infrastructure Progress",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85&auto=format&fit=crop",
        type: "photo",
        caption: "Construction progress across critical infrastructure scopes.",
      },
      {
        id: `${article.slug}-g3`,
        title: "Technical Coordination",
        image:
          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=85&auto=format&fit=crop",
        type: "photo",
        caption: "Technical teams aligning quality and commissioning readiness.",
      },
      {
        id: `${article.slug}-g4`,
        title: "Project Film",
        image:
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=85&auto=format&fit=crop",
        type: "video",
        caption: "Video overview of field execution and coordination.",
      },
    ],
    projectInfo: projectBased
      ? {
          client: "Utility & Enterprise Partners",
          location: "Bangladesh",
          industry: article.category === "Projects" ? "Power & Infrastructure" : "Engineering Services",
          duration: "18–24 months",
          completion: article.dateLabel,
          scope: "Multidisciplinary engineering, construction support, and commissioning coordination.",
          technologies: ["Power Systems", "Telecom", "Digital Monitoring", "Quality Assurance"],
          status: "Active / Completed Phases",
        }
      : null,
    beforeAfter: projectBased
      ? {
          before:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85&auto=format&fit=crop",
          after: article.image,
          caption: "Before and after progress across a key project corridor.",
        }
      : null,
    downloads: projectBased ? projectDownloads : defaultDownloads,
    relatedServiceIds: ["power-utility", "telecom", "civil-design", "electrical-mechanical"].filter((id) =>
      services.some((s) => s.id === id),
    ),
    relatedProjectIds: projects.slice(0, 4).map((p) => p.id),
  };
}

/** Rich overrides for hero featured story */
const featuredOverride: Partial<ArticleDetail> = {
  pullQuote: {
    text: "Expanding power and telecom capability is essential to national growth — and HS Group is committed to delivering that infrastructure with precision.",
    attribution: "Chairman",
    role: "HS Group",
  },
  highlights: [
    { label: "Project Type", value: "Nationwide Expansion" },
    { label: "Industry", value: "Power & Telecom" },
    { label: "Technology", value: "Integrated Infrastructure" },
    { label: "Project Value", value: "Multi-program" },
    { label: "Completion", value: "Phased 2026" },
    { label: "Client", value: "Government & Enterprise" },
    { label: "Country", value: "Bangladesh" },
  ],
  tags: ["Power", "Telecom", "Infrastructure", "Smart City"],
  projectInfo: {
    client: "Public & Private Sector Clients",
    location: "Nationwide, Bangladesh",
    industry: "Power Systems & Telecom",
    duration: "Ongoing multi-year program",
    completion: "Phased delivery through 2026",
    scope: "Power transmission support, telecom tower rollout, and integrated infrastructure readiness.",
    technologies: ["Substation Systems", "BTS Infrastructure", "Network Support", "QA/QC"],
    status: "In Progress",
  },
  beforeAfter: {
    before:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85&auto=format&fit=crop",
    caption: "Infrastructure corridor development from early mobilization to advanced delivery.",
  },
  downloads: projectDownloads,
};

export function getArticleDetailBySlug(slug: string): ArticleDetail | undefined {
  const base = newsArticles.find((a) => a.slug === slug);
  if (!base) return undefined;
  const detail = enrich(base);
  if (base.featured) return { ...detail, ...featuredOverride, content: detail.content };
  return detail;
}

export function getAdjacentArticles(slug: string) {
  const index = newsArticles.findIndex((a) => a.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? newsArticles[index - 1] : null,
    next: index < newsArticles.length - 1 ? newsArticles[index + 1] : null,
  };
}

export function getRelatedArticles(slug: string, limit = 3) {
  const current = newsArticles.find((a) => a.slug === slug);
  if (!current) return newsArticles.slice(0, limit);
  const same = newsArticles.filter((a) => a.slug !== slug && a.category === current.category);
  const rest = newsArticles.filter((a) => a.slug !== slug && a.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

export function getRelatedServices(ids: string[]) {
  if (!Array.isArray(ids) || !Array.isArray(services)) return [];
  return services.filter((s) => s?.id && ids.includes(s.id)).slice(0, 6);
}

export function getRelatedProjects(ids: number[]) {
  return projects.filter((p) => ids.includes(p.id)).slice(0, 4);
}

export function getRecentArticles(limit = 5) {
  return [...newsArticles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export function getPopularArticles(limit = 5) {
  return [...newsArticles].sort((a, b) => b.popular - a.popular).slice(0, limit);
}

export const articleTagOptions = [
  "Power",
  "Telecom",
  "Solar",
  "Infrastructure",
  "Civil",
  "Smart City",
] as const;

export const sidebarCategories = newsCategories.filter((c) => c !== "All");
