export const serviceFilterCategories = ["All Services"] as const;

export type ServiceFilterCategory = (typeof serviceFilterCategories)[number];

export type PortfolioService = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  category: ServiceFilterCategory;
  features: string[];
  benefits: string[];
  industries: string[];
  technologies: string[];
  featured?: boolean;
};

export const servicesHero = {
  label: "CAPABILITIES",
  headline: "Engineering Services",
  subtitle:
    "Delivering reliable engineering, power, telecom, renewable energy, industrial automation and smart infrastructure solutions.",
  image:
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=85&auto=format&fit=crop",
  primaryCta: { label: "Explore Services", href: "#services-grid" },
  secondaryCta: { label: "Request Consultation", href: "/contact" },
};

export const portfolioServices: PortfolioService[] = [];

export const serviceCategories: Array<{
  id: string;
  title: string;
  description: string;
  icon: string;
  filter: ServiceFilterCategory;
}> = [];

export const serviceDownloads: Array<{
  id: string;
  title: string;
  fileType: string;
  size: string;
  href: string;
}> = [];

export const serviceTestimonials: Array<{
  id: string;
  quote: string;
  name: string;
  role: string;
  image: string;
}> = [];

export function getFeaturedServices() {
  return portfolioServices.filter((s) => s.featured);
}
