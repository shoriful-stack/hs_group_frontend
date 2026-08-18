import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSkipLink from "@/components/sections/about/AboutSkipLink";
import AboutPageSchema from "@/components/sections/about/AboutPageSchema";
import CTASection from "@/components/sections/CTASection";
import AboutTrustNetworkSection from "@/components/sections/about/AboutTrustNetworkSection";
import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import AboutOverviewSection from "@/components/sections/about/AboutOverviewSection";
import AboutStatsSection from "@/components/sections/about/AboutStatsSection";
import AboutTimelineSection from "@/components/sections/about/AboutTimelineSection";
import AboutChairmanSection from "@/components/sections/about/AboutChairmanSection";
import AboutVisionSection from "@/components/sections/about/AboutVisionSection";
import AboutCapabilitiesSection from "@/components/sections/about/AboutCapabilitiesSection";
import AboutIndustriesSection from "@/components/sections/about/AboutIndustriesSection";
import AboutCSRSection from "@/components/sections/about/AboutCSRSection";
import { siteConfig } from "@/data/site";
import { getHomeStaticData, mapAboutCollageImages, mapPartnerLogos } from "@/services/homeService";

const aboutDescription = `Learn about ${siteConfig.name} — engineering excellence in power, telecom, infrastructure, and smart technology since 2010.`;

export const metadata: Metadata = {
  title: "About Us",
  description: aboutDescription,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About Us | ${siteConfig.name}`,
    description: aboutDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us | ${siteConfig.name}`,
    description: aboutDescription,
  },
};

export default async function AboutPage() {
  let collageImages: string[] = [];
  let partnerLogos: Awaited<ReturnType<typeof mapPartnerLogos>> = [];
  try {
    const data = await getHomeStaticData();
    collageImages = mapAboutCollageImages(data.about_stats);
    partnerLogos = mapPartnerLogos(data.partners);
  } catch {
    collageImages = [];
    partnerLogos = [];
  }

  return (
    <>
      <AboutPageSchema />
      <AboutSkipLink />
      <Header />
      <main id="main-content" tabIndex={-1} className="about-scroll-padding overflow-x-clip outline-none">
        <AboutHeroSection />
        <AboutOverviewSection images={collageImages} />
        <AboutStatsSection />
        <AboutTimelineSection />
        <AboutChairmanSection />
        <AboutVisionSection />
        <AboutCapabilitiesSection />
        <AboutIndustriesSection />
        <AboutTrustNetworkSection logos={partnerLogos} />
        <AboutCSRSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
