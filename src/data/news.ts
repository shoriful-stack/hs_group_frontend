export const newsCategories = [
  "All",
  "Company News",
  "Projects",
  "Press Release",
  "CSR",
  "Awards",
  "Events",
  "Media",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

export const newsHero = {
  label: "NEWSROOM",
  headline: "News & Media",
  subtitle:
    "Stay updated with HS Group's latest engineering projects, company announcements, innovations, industry insights, and corporate activities.",
  image:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=85&auto=format&fit=crop",
  primaryCta: { label: "Latest News", href: "#latest-news" },
  secondaryCta: { label: "Media Kit", href: "#downloads" },
};

export const newsArticles = [
  {
    id: 1,
    slug: "hs-group-expands-power-telecom-infrastructure",
    title: "HS Group Expands Engineering Solutions Across Power and Telecom Infrastructure",
    excerpt:
      "Strengthening nationwide delivery of integrated power and telecom infrastructure for public and private sector clients.",
    summary:
      "HS Group announces expanded capacity across power systems and telecom infrastructure, reinforcing its commitment to reliable engineering delivery for government and enterprise clients.",
    body: [
      "HS Group continues to expand its multidisciplinary engineering capabilities across Bangladesh and regional markets, with a renewed focus on power transmission, distribution, and telecom infrastructure programs.",
      "The initiative strengthens project delivery capacity, technical workforce development, and long-term partnerships with utilities, operators, and industrial clients.",
      "Through standardized quality systems and field-proven execution models, HS Group aims to accelerate infrastructure readiness while maintaining safety and operational excellence.",
    ],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=85&auto=format&fit=crop",
    date: "2026-03-15",
    dateLabel: "Mar 15, 2026",
    category: "Company News" as NewsCategory,
    readingTime: "4 min read",
    author: "HS Group Communications",
    popular: 96,
    featured: true,
  },
  {
    id: 2,
    slug: "smart-infrastructure-iot-project-operations",
    title: "Smart Infrastructure and IoT Solutions Transforming Modern Project Operations",
    excerpt:
      "How connected monitoring, automation, and data-driven systems are reshaping engineering project delivery.",
    summary:
      "Digital monitoring and IoT-enabled infrastructure are improving visibility, safety, and performance across live engineering projects.",
    body: [
      "Smart infrastructure platforms are enabling real-time visibility across sites, assets, and operational workflows.",
      "HS Group integrates IoT sensing, remote monitoring, and digital reporting into project delivery to support faster decisions and safer field operations.",
    ],
    image:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1400&q=85&auto=format&fit=crop",
    date: "2026-02-28",
    dateLabel: "Feb 28, 2026",
    category: "Projects" as NewsCategory,
    readingTime: "5 min read",
    author: "Engineering Desk",
    popular: 88,
    featured: false,
  },
  {
    id: 3,
    slug: "solar-substation-sustainable-industrial-growth",
    title: "Solar Energy and Substation Projects Driving Sustainable Industrial Growth",
    excerpt:
      "Renewable energy and substation deployments supporting long-term industrial and utility-scale expansion.",
    summary:
      "HS Group’s renewable and substation portfolio continues to support industrial clients transitioning toward cleaner, more resilient power infrastructure.",
    body: [
      "Utility-scale solar and modern substation systems are becoming essential pillars of industrial growth strategies.",
      "HS Group delivers integrated renewable and grid interconnection solutions with a focus on reliability, compliance, and lifecycle performance.",
    ],
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=85&auto=format&fit=crop",
    date: "2026-01-10",
    dateLabel: "Jan 10, 2026",
    category: "Projects" as NewsCategory,
    readingTime: "3 min read",
    author: "Energy Desk",
    popular: 81,
    featured: false,
  },
  {
    id: 4,
    slug: "hs-group-announces-fy2025-engineering-milestones",
    title: "HS Group Announces FY2025 Engineering Delivery Milestones",
    excerpt:
      "A year of progress across telecom, power, civil infrastructure, and digital transformation programs.",
    summary:
      "Official press release summarizing major project completions, regional expansion, and quality achievements for FY2025.",
    body: [
      "In FY2025, HS Group completed major engagements across telecom tower programs, power infrastructure, and industrial civil works.",
      "The company continues to invest in people, process excellence, and technology partnerships that support long-term client value.",
    ],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=85&auto=format&fit=crop",
    date: "2025-12-18",
    dateLabel: "Dec 18, 2025",
    category: "Press Release" as NewsCategory,
    readingTime: "3 min read",
    author: "Corporate Affairs",
    popular: 74,
    featured: false,
  },
  {
    id: 5,
    slug: "community-skills-program-engineering-futures",
    title: "Community Skills Program Builds Engineering Futures",
    excerpt:
      "HS Group supports local technical training initiatives to develop next-generation engineering talent.",
    summary:
      "Through CSR partnerships, HS Group is helping expand access to practical engineering skills and workplace readiness.",
    body: [
      "HS Group’s community development programs focus on employability, technical skills, and responsible engineering practice.",
      "These initiatives reflect the company’s belief that infrastructure progress must create lasting social value.",
    ],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=85&auto=format&fit=crop",
    date: "2025-11-05",
    dateLabel: "Nov 5, 2025",
    category: "CSR" as NewsCategory,
    readingTime: "4 min read",
    author: "CSR Office",
    popular: 69,
    featured: false,
  },
  {
    id: 6,
    slug: "industry-recognition-engineering-excellence-award",
    title: "Industry Recognition for Engineering Excellence",
    excerpt:
      "HS Group receives recognition for project quality, safety culture, and infrastructure delivery standards.",
    summary:
      "Recent industry awards highlight HS Group’s commitment to quality systems, workplace safety, and reliable project execution.",
    body: [
      "Recognition from industry bodies reinforces HS Group’s long-standing focus on engineering quality and operational integrity.",
      "The company continues to benchmark its processes against international standards across all major business verticals.",
    ],
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=85&auto=format&fit=crop",
    date: "2025-10-22",
    dateLabel: "Oct 22, 2025",
    category: "Awards" as NewsCategory,
    readingTime: "2 min read",
    author: "HS Group Communications",
    popular: 77,
    featured: false,
  },
  {
    id: 7,
    slug: "hs-group-at-south-asia-infra-summit",
    title: "HS Group Participates in South Asia Infrastructure Summit",
    excerpt:
      "Leadership and technical teams join regional discussions on power, telecom, and smart infrastructure.",
    summary:
      "HS Group shared insights on integrated engineering delivery and digital infrastructure at a major regional industry forum.",
    body: [
      "Industry forums remain important platforms for collaboration, standards alignment, and technology exchange.",
      "HS Group’s participation reflects its role as a regional engineering partner committed to long-term infrastructure development.",
    ],
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=85&auto=format&fit=crop",
    date: "2025-09-14",
    dateLabel: "Sep 14, 2025",
    category: "Events" as NewsCategory,
    readingTime: "3 min read",
    author: "Media Desk",
    popular: 63,
    featured: false,
  },
  {
    id: 8,
    slug: "behind-the-scenes-substation-commissioning",
    title: "Behind the Scenes: Substation Commissioning in Focus",
    excerpt:
      "A media feature documenting precision, safety protocols, and team coordination during commissioning.",
    summary:
      "New media coverage highlights the complexity and discipline behind critical power infrastructure commissioning.",
    body: [
      "Commissioning is where engineering design, field execution, and quality assurance converge.",
      "This feature presents the people and processes that enable safe energization and reliable operations.",
    ],
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1400&q=85&auto=format&fit=crop",
    date: "2025-08-08",
    dateLabel: "Aug 8, 2025",
    category: "Media" as NewsCategory,
    readingTime: "4 min read",
    author: "Media Desk",
    popular: 71,
    featured: false,
  },
];

export type NewsArticle = (typeof newsArticles)[number];

export const newsPressReleases = [
  {
    id: "pr-1",
    title: "HS Group Announces FY2025 Engineering Delivery Milestones",
    date: "Dec 18, 2025",
    slug: "hs-group-announces-fy2025-engineering-milestones",
    pdfUrl: "#",
  },
  {
    id: "pr-2",
    title: "HS Group Strengthens Regional Partnerships for Telecom Infrastructure",
    date: "Oct 02, 2025",
    slug: "hs-group-expands-power-telecom-infrastructure",
    pdfUrl: "#",
  },
  {
    id: "pr-3",
    title: "New Capability Statement Released for Power & Renewable Energy Clients",
    date: "Jul 21, 2025",
    slug: "solar-substation-sustainable-industrial-growth",
    pdfUrl: "#",
  },
];

export const newsProjectUpdates = [
  {
    id: "pu-1",
    title: "National Grid Substation Upgrade",
    location: "Dhaka, Bangladesh",
    industry: "Power Systems",
    summary: "High-capacity transmission works progressing through staged commissioning and quality assurance.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=85&auto=format&fit=crop",
    progress: 82,
    href: "/projects",
  },
  {
    id: "pu-2",
    title: "50MW Solar Power Plant",
    location: "Cox's Bazar, Bangladesh",
    industry: "Solar Energy",
    summary: "Utility-scale solar installation advancing toward grid interconnection and operational handover.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=85&auto=format&fit=crop",
    progress: 68,
    href: "/projects",
  },
  {
    id: "pu-3",
    title: "Telecom Tower Nationwide Rollout",
    location: "Nationwide, Bangladesh",
    industry: "Telecom",
    summary: "Multi-site tower deployment supporting network expansion across urban and rural corridors.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85&auto=format&fit=crop",
    progress: 74,
    href: "/projects",
  },
  {
    id: "pu-4",
    title: "Industrial Data Center Fit-Out",
    location: "Chittagong, Bangladesh",
    industry: "Smart Infrastructure",
    summary: "Critical facility engineering and MEP coordination underway for industrial digital operations.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=85&auto=format&fit=crop",
    progress: 55,
    href: "/projects",
  },
];

export const newsEvents = [
  {
    id: "ev-1",
    title: "South Asia Infrastructure Summit",
    date: "Sep 18, 2026",
    location: "Dhaka, Bangladesh",
    status: "upcoming" as const,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85&auto=format&fit=crop",
    cta: { label: "Register Interest", href: "/contact" },
  },
  {
    id: "ev-2",
    title: "Renewable Energy & Grid Forum",
    date: "Nov 04, 2026",
    location: "Singapore",
    status: "upcoming" as const,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=85&auto=format&fit=crop",
    cta: { label: "Register Interest", href: "/contact" },
  },
  {
    id: "ev-3",
    title: "Engineering Excellence Showcase 2025",
    date: "May 12, 2025",
    location: "Dhaka, Bangladesh",
    status: "past" as const,
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=85&auto=format&fit=crop",
    cta: { label: "View Coverage", href: "/blog" },
  },
  {
    id: "ev-4",
    title: "Telecom Infrastructure Roundtable",
    date: "Feb 20, 2025",
    location: "Colombo, Sri Lanka",
    status: "past" as const,
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=85&auto=format&fit=crop",
    cta: { label: "View Coverage", href: "/blog" },
  },
];

export const newsGallery = [
  {
    id: "g1",
    title: "Transmission Line Corridor",
    category: "Projects",
    type: "photo" as const,
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "g2",
    title: "Solar Farm Aerial",
    category: "Drone",
    type: "photo" as const,
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "g3",
    title: "Control Room Operations",
    category: "Factory",
    type: "photo" as const,
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "g4",
    title: "Engineering Site Briefing",
    category: "Photos",
    type: "photo" as const,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "g5",
    title: "Project Progress Film",
    category: "Videos",
    type: "video" as const,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "g6",
    title: "Community Engagement",
    category: "CSR",
    type: "photo" as const,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "g7",
    title: "Industrial Facility",
    category: "Factory",
    type: "photo" as const,
    image:
      "https://images.unsplash.com/photo-1581094794329-adc7f4a0d0c0?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "g8",
    title: "Smart City Infrastructure",
    category: "Projects",
    type: "photo" as const,
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=85&auto=format&fit=crop",
  },
];

export const newsGalleryFilters = ["All", "Photos", "Videos", "Drone", "Factory", "Projects", "CSR"];

export const newsDownloads = [
  { id: "d1", title: "Company Profile", size: "2.4 MB", icon: "Building2", href: "#" },
  { id: "d2", title: "Corporate Brochure", size: "3.1 MB", icon: "BookOpen", href: "#" },
  { id: "d3", title: "Annual Report", size: "5.8 MB", icon: "FileText", href: "#" },
  { id: "d4", title: "Capability Statement", size: "1.9 MB", icon: "ClipboardList", href: "#" },
  { id: "d5", title: "Certificates Pack", size: "4.2 MB", icon: "BadgeCheck", href: "#" },
  { id: "d6", title: "Corporate Presentation", size: "8.6 MB", icon: "Presentation", href: "#" },
  { id: "d7", title: "Media Kit", size: "12.0 MB", icon: "FolderOpen", href: "#" },
];

export const newsNewsletter = {
  label: "STAY CONNECTED",
  title: "Subscribe to HS Group Insights",
  description:
    "Receive selected project updates, press releases, and engineering insights from HS Group.",
  privacy: "By subscribing, you agree to receive occasional updates. You can unsubscribe at any time.",
};

export const newsCta = {
  label: "LET'S BUILD THE FUTURE",
  headline: "Let's Build Tomorrow Together",
  description:
    "Partner with HS Group for engineering, power, telecom, renewable energy, infrastructure, and smart technology solutions.",
  backgroundImage:
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=85&auto=format&fit=crop",
  primaryCta: { label: "Contact HS Group", href: "/contact" },
  secondaryCta: { label: "Explore Projects", href: "/projects" },
};

export function getArticleBySlug(slug: string) {
  return newsArticles.find((a) => a.slug === slug);
}

export function getFeaturedArticle() {
  return newsArticles.find((a) => a.featured) ?? newsArticles[0];
}
