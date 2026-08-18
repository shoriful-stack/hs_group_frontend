import { portfolioProjects } from "@/data/projects-page";
import { portfolioServices, type PortfolioService } from "@/data/services-page";

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

export function getServiceDetailBySlug(_slug: string): ServiceDetail | undefined {
  return undefined;
}

export function getAllServiceSlugs(): string[] {
  return [];
}

export function getRelatedServices(_slug: string, _limit = 4): PortfolioService[] {
  return [];
}

export function getRelatedProjectsForService(_slug: string, limit = 4) {
  return Array.isArray(portfolioProjects) ? portfolioProjects.slice(0, limit) : [];
}

export { portfolioServices };
