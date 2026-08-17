import { careerJobs, type CareerJob } from "@/data/careers-page";

export type CareerDetail = CareerJob & {
  overview: string;
  applicationDeadline: string;
  vacancy: number;
  educationalQualifications: string[];
  experienceDetails: string[];
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  applyEmail: string;
  contactPhones: string[];
  applicationInstruction: string;
  image: string;
};

type CareerDetailExtras = Omit<CareerDetail, keyof CareerJob>;
type CareerDetailSource = Omit<
  CareerDetailExtras,
  | "applicationDeadline"
  | "vacancy"
  | "educationalQualifications"
  | "experienceDetails"
  | "contactPhones"
  | "applicationInstruction"
> &
  Partial<
    Pick<
      CareerDetailExtras,
      | "applicationDeadline"
      | "vacancy"
      | "educationalQualifications"
      | "experienceDetails"
      | "contactPhones"
      | "applicationInstruction"
    >
  >;

const detailExtras: Record<string, CareerDetailSource> = {
  "chief-financial-officer": {
    overview:
      "HS Group is seeking a strategic Chief Financial Officer to lead financial planning, reporting, treasury management, budgeting, taxation, compliance, internal controls, risk management, and investment decisions. The CFO will partner with the Managing Director and leadership team to maximize profitability, ensure financial sustainability, and support long-term business growth.",
    applicationDeadline: "2026-08-15",
    vacancy: 1,
    educationalQualifications: [
      "Master’s degree in Finance or Accounting.",
      "Professional qualification such as ACA, ACCA, or ACMA.",
    ],
    experienceDetails: [
      "15–20 years of progressive experience in finance and accounting.",
      "Minimum 7–10 years in senior financial leadership roles.",
      "Experience managing large finance teams.",
      "Proven experience in strategic financial planning, treasury, taxation, budgeting, and financial reporting.",
      "Experience working with Boards of Directors and executive leadership.",
      "Industry experience relevant to the organization is preferred.",
    ],
    responsibilities: [
      "Develop and implement the company’s financial strategy.",
      "Provide strategic financial advice to the Managing Director and Board.",
      "Prepare annual budgets and long-term financial plans.",
      "Monitor budget performance and recommend corrective actions.",
      "Evaluate investment opportunities and business expansion projects.",
      "Prepare monthly, quarterly, and annual financial statements.",
      "Analyze key financial indicators and business performance.",
      "Manage cash flow and working capital.",
      "Oversee funding requirements and capital structure.",
      "Ensure compliance with accounting standards, tax laws, VAT, customs, and regulatory reporting.",
      "Coordinate with external auditors and regulatory authorities.",
      "Establish strong internal control systems.",
      "Maintain relationships with banks, investors, auditors, regulators, and financial institutions.",
    ],
    requirements: [
      "Strong strategic, analytical, and commercial decision-making capability.",
      "Demonstrated leadership of finance and accounting teams.",
      "Thorough knowledge of IFRS/IAS or applicable GAAP.",
      "Excellent communication with executive and Board-level stakeholders.",
    ],
    niceToHave: [
      "Experience in EPC, telecommunication, construction, infrastructure, energy storage, renewable energy, or environmental projects.",
      "Track record supporting mergers, investments, or business expansion.",
    ],
    benefits: [
      "Executive compensation package",
      "Performance-based incentives",
      "Leadership role across diversified businesses",
      "Long-term growth opportunity",
    ],
    applyEmail: "hr@hsengineering-bd.com",
    contactPhones: ["01886-775605", "01325-081300"],
    applicationInstruction: "Write “Chief Financial Officer (CFO)” in the email subject line.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=85&auto=format&fit=crop",
  },
  "electrical-engineer": {
    overview:
      "You will contribute to electrical design, technical review, and project support for industrial and infrastructure programs delivered by HS Group.",
    responsibilities: [
      "Prepare and review electrical drawings, load calculations, and technical specifications.",
      "Support equipment selection for power distribution, backup, and control systems.",
      "Coordinate with project, procurement, and site teams for design clarity.",
      "Participate in site assessments, inspections, and commissioning support.",
      "Ensure documentation quality aligned with standards and client requirements.",
    ],
    requirements: [
      "B.Sc. in Electrical / EEE or equivalent.",
      "3–6 years of relevant engineering experience.",
      "Strong knowledge of LV/MV systems and industrial power applications.",
      "Proficiency with AutoCAD and engineering documentation workflows.",
      "Clear communication and field coordination capability.",
    ],
    niceToHave: [
      "Experience with utility, telecom, or industrial projects.",
      "Familiarity with IEC / BSTI referenced practices.",
      "Exposure to solar, generator, or UPS ecosystems.",
    ],
    benefits: [
      "Competitive salary with performance review",
      "Health coverage",
      "Project exposure across Bangladesh",
      "Mentorship from senior engineers",
    ],
    applyEmail: "careers@hsgroup.com",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&q=85&auto=format&fit=crop",
  },
  "project-coordinator": {
    overview:
      "Own coordination across schedules, documentation, and stakeholder communication so engineering programs stay on track.",
    responsibilities: [
      "Maintain project schedules, trackers, and status reports.",
      "Coordinate meetings, minutes, and follow-ups across teams.",
      "Support documentation control for drawings, RFIs, and submissions.",
      "Monitor risks, delays, and action items with project managers.",
      "Liaise with clients and internal departments for clarity and progress.",
    ],
    requirements: [
      "Bachelor’s degree in Engineering, Business, or related field.",
      "2–4 years of project coordination experience.",
      "Strong Excel / planning tool proficiency.",
      "Excellent written and verbal communication.",
      "Ability to manage multiple workstreams under deadlines.",
    ],
    niceToHave: [
      "PMP / CAPM foundation knowledge.",
      "Experience in EPC or infrastructure environments.",
      "Familiarity with MS Project or equivalent.",
    ],
    benefits: [
      "Structured career pathway in project delivery",
      "Cross-functional exposure",
      "Performance incentives",
      "Learning & development support",
    ],
    applyEmail: "careers@hsgroup.com",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=85&auto=format&fit=crop",
  },
  "business-development-executive": {
    overview:
      "Drive growth by identifying opportunities and supporting enterprise clients across HS Group solutions.",
    responsibilities: [
      "Generate and qualify leads across target industries.",
      "Prepare proposals, presentations, and commercial follow-ups.",
      "Build relationships with enterprise and institutional clients.",
      "Coordinate with technical teams for solution fit.",
      "Maintain CRM notes and pipeline forecasts.",
    ],
    requirements: [
      "Bachelor’s degree in Business, Engineering, or related discipline.",
      "2–5 years of B2B sales or business development experience.",
      "Strong presentation and negotiation skills.",
      "Willingness to travel for client meetings.",
    ],
    niceToHave: [
      "Infrastructure / industrial sales background.",
      "Existing network in power, telecom, or construction sectors.",
    ],
    benefits: [
      "Attractive incentive structure",
      "Client-facing career growth",
      "Product & solution training",
      "Travel allowance as applicable",
    ],
    applyEmail: "careers@hsgroup.com",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=85&auto=format&fit=crop",
  },
  "site-supervisor": {
    overview:
      "Lead day-to-day site execution with focus on quality, safety, and coordinated field delivery.",
    responsibilities: [
      "Supervise site teams and subcontractors during execution.",
      "Enforce HSE practices and quality checkpoints.",
      "Coordinate materials, tools, and daily work plans.",
      "Report progress, issues, and site constraints promptly.",
      "Support handover documentation and punch-list closure.",
    ],
    requirements: [
      "Diploma / Bachelor’s in Civil, Electrical, or related field.",
      "4–8 years of site supervision experience.",
      "Strong knowledge of field safety and quality practices.",
      "Ability to lead teams in challenging site conditions.",
    ],
    niceToHave: [
      "Experience on multi-disciplinary infrastructure sites.",
      "Valid safety certifications.",
    ],
    benefits: [
      "Site allowances as applicable",
      "Safety training & PPE",
      "Career progression in operations",
      "Performance recognition",
    ],
    applyEmail: "careers@hsgroup.com",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85&auto=format&fit=crop",
  },
  "iot-systems-engineer": {
    overview:
      "Design and support IoT monitoring solutions that connect infrastructure assets to actionable insight.",
    responsibilities: [
      "Configure sensors, gateways, and monitoring dashboards.",
      "Integrate systems with client networks and platforms.",
      "Troubleshoot connectivity and data integrity issues.",
      "Document deployment architectures and SOPs.",
      "Support pilots and production rollouts.",
    ],
    requirements: [
      "B.Sc. in CSE, EEE, or related discipline.",
      "3–5 years in IoT, networking, or industrial monitoring.",
      "Familiarity with MQTT, APIs, and dashboard tools.",
      "Hands-on deployment and troubleshooting experience.",
    ],
    niceToHave: [
      "Experience with industrial protocols.",
      "Cloud IoT platform exposure.",
    ],
    benefits: [
      "Modern technology stack exposure",
      "Training & certifications support",
      "Hybrid collaboration culture",
      "Competitive compensation",
    ],
    applyEmail: "careers@hsgroup.com",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=85&auto=format&fit=crop",
  },
  "engineering-intern": {
    overview:
      "A structured internship for graduates ready to learn engineering discipline through real project exposure.",
    responsibilities: [
      "Assist with drawings, checklists, and technical documentation.",
      "Support site visits and observation reports.",
      "Help coordinate internal follow-ups under mentorship.",
      "Learn HS Group quality and safety practices.",
    ],
    requirements: [
      "Recent graduate in Engineering or final-year student.",
      "Strong learning attitude and attention to detail.",
      "Basic AutoCAD / MS Office familiarity.",
      "Willingness to travel for site exposure when required.",
    ],
    niceToHave: [
      "University project experience in power or infrastructure.",
      "Interest in field engineering careers.",
    ],
    benefits: [
      "Mentorship from senior engineers",
      "Certificate upon completion",
      "Potential conversion to full-time",
      "Real project exposure",
    ],
    applyEmail: "careers@hsgroup.com",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=85&auto=format&fit=crop",
  },
};

export function getAllCareerSlugs(): string[] {
  return careerJobs.map((j) => j.slug);
}

export function getCareerDetailBySlug(slug: string): CareerDetail | undefined {
  const job = careerJobs.find((j) => j.slug === slug);
  if (!job) return undefined;
  const extras = detailExtras[slug];
  if (!extras) return undefined;
  return {
    ...job,
    ...extras,
    applicationDeadline: extras.applicationDeadline ?? "2026-08-15",
    vacancy: extras.vacancy ?? 1,
    educationalQualifications:
      extras.educationalQualifications ?? [extras.requirements[0] ?? "Relevant academic qualification."],
    experienceDetails: extras.experienceDetails ?? [
      `${job.experience} of relevant professional experience.`,
      ...extras.requirements.slice(1, 3),
    ],
    contactPhones: extras.contactPhones ?? ["01886-775605", "01325-081300"],
    applicationInstruction:
      extras.applicationInstruction ?? `Write “${job.title}” in the email subject line.`,
  };
}

export function getRelatedCareers(slug: string, limit = 3): CareerJob[] {
  const current = careerJobs.find((j) => j.slug === slug);
  if (!current) return careerJobs.slice(0, limit);
  const sameDept = careerJobs.filter(
    (j) => j.slug !== slug && j.department === current.department,
  );
  const rest = careerJobs.filter(
    (j) => j.slug !== slug && j.department !== current.department,
  );
  return [...sameDept, ...rest].slice(0, limit);
}

export function getAdjacentCareers(slug: string): {
  prev: CareerJob | null;
  next: CareerJob | null;
} {
  const index = careerJobs.findIndex((j) => j.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? careerJobs[index - 1] : null,
    next: index < careerJobs.length - 1 ? careerJobs[index + 1] : null,
  };
}
