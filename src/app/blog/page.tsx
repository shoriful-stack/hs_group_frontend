import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSkipLink from "@/components/sections/about/AboutSkipLink";
import NewsPageSchema from "@/components/sections/news/NewsPageSchema";
import NewsHeroSection from "@/components/sections/news/NewsHeroSection";
import NewsLatestSection from "@/components/sections/news/NewsLatestSection";
import NewsPressSection from "@/components/sections/news/NewsPressSection";
import NewsEventsSection from "@/components/sections/news/NewsEventsSection";
import CTASection from "@/components/sections/CTASection";
import { siteConfig } from "@/data/site";

const description = `Stay updated with ${siteConfig.name}'s latest engineering projects, company announcements, innovations, industry insights, and corporate activities.`;

export const metadata: Metadata = {
  title: "News & Media",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `News & Media | ${siteConfig.name}`,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `News & Media | ${siteConfig.name}`,
    description,
  },
};

export default function BlogPage() {
  return (
    <>
      <NewsPageSchema />
      <AboutSkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="about-scroll-padding overflow-x-clip outline-none"
      >
        <NewsHeroSection />
        <NewsLatestSection />
        <NewsPressSection />
        <NewsEventsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
