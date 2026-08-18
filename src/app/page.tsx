import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServicesSection from "@/components/sections/ServicesSection";
import ProductCarouselSection from "@/components/sections/ProductCarouselSection";
import BlogSection from "@/components/sections/BlogSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CTASection from "@/components/sections/CTASection";
import {
  AboutSkeleton,
  FeaturesSkeleton,
  HeroSkeleton,
  HomeStaticAbout,
  HomeStaticFeatures,
  HomeStaticHero,
  HomeStaticPartners,
  PartnersSkeleton,
} from "@/components/sections/home/HomeStaticSections";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | ${siteConfig.tagline}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<HeroSkeleton />}>
          <HomeStaticHero />
        </Suspense>
        {/* <Suspense fallback={<AboutSkeleton />}>
          <HomeStaticAbout />
        </Suspense> */}
        <Suspense fallback={<FeaturesSkeleton />}>
          <HomeStaticFeatures />
        </Suspense>
        {/* <ServicesSection /> */}
        {/* <ProductCarouselSection /> */}
        {/* <ProjectsSection /> */}
        {/* <Suspense fallback={<PartnersSkeleton />}>
          <HomeStaticPartners />
        </Suspense> */}
        {/* <BlogSection /> */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
