import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSkipLink from "@/components/sections/about/AboutSkipLink";
import ProjectsPageSchema from "@/components/sections/projects/ProjectsPageSchema";
import ProjectsHeroSection from "@/components/sections/projects/ProjectsHeroSection";
import ProjectsFilterGridSection from "@/components/sections/projects/ProjectsFilterGridSection";
import ProjectsIndustriesSection, {
  ProjectsAwardsSection,
} from "@/components/sections/projects/ProjectsIndustriesSection";
import ProjectsClientSuccessSection from "@/components/sections/projects/ProjectsClientSuccessSection";
import CTASection from "@/components/sections/CTASection";
import { siteConfig } from "@/data/site";
import { getPartnerLogos } from "@/services/homeService";

const description = `Explore ${siteConfig.name}'s portfolio of engineering, telecom, power, renewable energy, industrial automation and infrastructure projects delivered with excellence.`;

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${siteConfig.name}`,
    description,
  },
};

export default async function ProjectsPage() {
  let partnerLogos: Awaited<ReturnType<typeof getPartnerLogos>> = [];
  try {
    partnerLogos = await getPartnerLogos();
  } catch {
    partnerLogos = [];
  }

  return (
    <>
      <ProjectsPageSchema />
      <AboutSkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="about-scroll-padding overflow-x-clip outline-none"
      >
        <ProjectsHeroSection />
        <ProjectsFilterGridSection />
        <ProjectsIndustriesSection />
        <ProjectsClientSuccessSection logos={partnerLogos} />
        <ProjectsAwardsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
