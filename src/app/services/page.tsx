import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSkipLink from "@/components/sections/about/AboutSkipLink";
import ServicesPageSchema from "@/components/sections/services/ServicesPageSchema";
import ServicesHeroSection from "@/components/sections/services/ServicesHeroSection";
import ServicesCategoriesSection from "@/components/sections/services/ServicesCategoriesSection";
import ServicesFilterGridSection from "@/components/sections/services/ServicesFilterGridSection";
import { ServicesRelatedProjectsSection } from "@/components/sections/services/ServicesProjectsSuccessCta";
import CTASection from "@/components/sections/CTASection";
import { siteConfig } from "@/data/site";

const description = `Delivering reliable engineering, power, telecom, renewable energy, industrial automation and smart infrastructure solutions from ${siteConfig.name}.`;

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services | ${siteConfig.name}`,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Services | ${siteConfig.name}`,
    description,
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesPageSchema />
      <AboutSkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="about-scroll-padding overflow-x-clip outline-none"
      >
        <ServicesHeroSection />
        <ServicesCategoriesSection />
        <ServicesFilterGridSection />
        <ServicesRelatedProjectsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
