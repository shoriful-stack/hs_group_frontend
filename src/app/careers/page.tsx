import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSkipLink from "@/components/sections/about/AboutSkipLink";
import CareersPageSchema from "@/components/sections/careers/CareersPageSchema";
import CareersHeroSection from "@/components/sections/careers/CareersHeroSection";
import CareersWhySection from "@/components/sections/careers/CareersWhySection";
import CareersJobsSection from "@/components/sections/careers/CareersJobsSection";
import CareersCTASection from "@/components/sections/careers/CareersCTASection";
import { siteConfig } from "@/data/site";

const description = `Explore career opportunities at ${siteConfig.name}. Join our engineering teams delivering power, telecom, renewable energy, and smart infrastructure solutions.`;

export const metadata: Metadata = {
  title: "Careers",
  description,
  alternates: { canonical: "/careers" },
  openGraph: {
    title: `Careers | ${siteConfig.name}`,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Careers | ${siteConfig.name}`,
    description,
  },
};

export default function CareersPage() {
  return (
    <>
      <CareersPageSchema />
      <AboutSkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="about-scroll-padding overflow-x-clip outline-none"
      >
        <CareersHeroSection />
        <CareersWhySection />
        <CareersJobsSection />
        <CareersCTASection />
      </main>
      <Footer />
    </>
  );
}
