export type CareerDepartment =
  | "All"
  | "Engineering"
  | "Project Management"
  | "Sales & Business"
  | "Finance & Accounts"
  | "Operations"
  | "IT & Digital";

export type CareerJob = {
  id: string;
  slug: string;
  title: string;
  department: Exclude<CareerDepartment, "All">;
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  experience: string;
  posted: string;
  summary: string;
  featured?: boolean;
};

export const careersHero = {
  label: "CAREERS AT HS GROUP",
  headline: "Build the Infrastructure of Tomorrow",
  subtitle:
    "Join an engineering-led team delivering power, telecom, renewable energy, and smart infrastructure across Bangladesh and beyond.",
  image:
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=85&auto=format&fit=crop",
  primaryCta: { label: "View Open Roles", href: "#open-roles" },
  secondaryCta: { label: "Life at HS Group", href: "#why-join" },
};

export const careersWhy = {
  label: "WHY JOIN US",
  title: "A Place for Engineering Talent to Grow",
  description:
    "We combine project discipline, technical excellence, and long-term career pathways across infrastructure programs.",
  items: [
    {
      title: "Meaningful Projects",
      description: "Work on power, telecom, solar, and smart infrastructure programs that shape communities.",
      icon: "Briefcase",
    },
    {
      title: "Technical Growth",
      description: "Learn from senior engineers with mentorship, field exposure, and continuous upskilling.",
      icon: "GraduationCap",
    },
    {
      title: "Enterprise Standards",
      description: "Operate with quality systems, safety culture, and delivery frameworks used on major programs.",
      icon: "ShieldCheck",
    },
    {
      title: "Career Mobility",
      description: "Progress across departments — engineering, projects, operations, sales, and digital teams.",
      icon: "Rocket",
    },
    {
      title: "Collaborative Culture",
      description: "Cross-functional teams that value clear communication, ownership, and shared outcomes.",
      icon: "Users",
    },
    {
      title: "Competitive Benefits",
      description: "Market-aligned compensation, health coverage, and performance recognition.",
      icon: "HeartHandshake",
    },
  ],
};

export const careerDepartments: CareerDepartment[] = [
  "All",
  "Engineering",
  "Project Management",
  "Sales & Business",
  "Finance & Accounts",
  "Operations",
  "IT & Digital",
];

export const careerJobs: CareerJob[] = [
  {
    id: "job-chief-financial-officer",
    slug: "chief-financial-officer",
    title: "Chief Financial Officer (CFO)",
    department: "Finance & Accounts",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "15–20 years",
    posted: "2026-07-18",
    summary:
      "Lead financial strategy, planning, treasury, compliance, controls, and investment decisions across HS Group.",
    featured: true,
  },
  {
    id: "job-electrical-engineer",
    slug: "electrical-engineer",
    title: "Electrical Engineer",
    department: "Engineering",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "3–6 years",
    posted: "2026-06-12",
    summary:
      "Design, review, and support electrical systems for industrial, commercial, and utility infrastructure projects.",
    featured: true,
  },
  {
    id: "job-project-coordinator",
    slug: "project-coordinator",
    title: "Project Coordinator",
    department: "Project Management",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "2–4 years",
    posted: "2026-06-08",
    summary:
      "Coordinate schedules, documentation, and stakeholder communication across multi-disciplinary engineering programs.",
    featured: true,
  },
  {
    id: "job-business-development",
    slug: "business-development-executive",
    title: "Business Development Executive",
    department: "Sales & Business",
    location: "Dhaka / Field",
    type: "Full-time",
    experience: "2–5 years",
    posted: "2026-05-28",
    summary:
      "Identify opportunities, prepare proposals, and support enterprise clients across power and infrastructure solutions.",
  },
  {
    id: "job-site-supervisor",
    slug: "site-supervisor",
    title: "Site Supervisor",
    department: "Operations",
    location: "Project Sites, Bangladesh",
    type: "Full-time",
    experience: "4–8 years",
    posted: "2026-05-20",
    summary:
      "Supervise field execution, quality checks, and site safety for civil, electrical, and infrastructure works.",
  },
  {
    id: "job-iot-engineer",
    slug: "iot-systems-engineer",
    title: "IoT Systems Engineer",
    department: "IT & Digital",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "3–5 years",
    posted: "2026-05-15",
    summary:
      "Configure, integrate, and support IoT monitoring platforms for smart infrastructure and industrial clients.",
  },
  {
    id: "job-intern-engineering",
    slug: "engineering-intern",
    title: "Engineering Intern",
    department: "Engineering",
    location: "Dhaka, Bangladesh",
    type: "Internship",
    experience: "Fresh graduate",
    posted: "2026-06-01",
    summary:
      "Support design documentation, site visits, and engineering coordination under senior mentorship.",
  },
];

export const careersCta = {
  label: "JOIN THE TEAM",
  headline: "Ready to Build With HS Group?",
  description:
    "Explore open roles or send your profile for future opportunities across engineering and operations.",
  backgroundImage:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&auto=format&fit=crop",
  primaryCta: { label: "Browse Open Roles", href: "#open-roles" },
  secondaryCta: { label: "Send Your CV", href: "/contact?intent=career" },
};
