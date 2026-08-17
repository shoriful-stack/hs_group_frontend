import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSkipLink from "@/components/sections/about/AboutSkipLink";
import ProductsPageSchema from "@/components/sections/products/ProductsPageSchema";
import ProductsHeroSection from "@/components/sections/products/ProductsHeroSection";
import ProductsFinderSection from "@/components/sections/products/ProductsFinderSection";
import ProductsFilterGridSection from "@/components/sections/products/ProductsFilterGridSection";
import {
  ProductsCTASection,
  ProductsRelatedServicesSection,
} from "@/components/sections/products/ProductsRelatedCta";
import { siteConfig } from "@/data/site";

const description = `Discover enterprise-grade engineering products from ${siteConfig.name} for power, telecom, renewable energy, industrial automation, infrastructure, and smart technology applications.`;

export const metadata: Metadata = {
  title: "Products",
  description,
  alternates: { canonical: "/products" },
  openGraph: {
    title: `Products | ${siteConfig.name}`,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Products | ${siteConfig.name}`,
    description,
  },
};

export default function ProductsPage() {
  return (
    <>
      <ProductsPageSchema />
      <AboutSkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="about-scroll-padding overflow-x-clip outline-none"
      >
        <ProductsHeroSection />
        <ProductsFinderSection />
        <ProductsFilterGridSection />
        <ProductsRelatedServicesSection />
        <ProductsCTASection />
      </main>
      <Footer />
    </>
  );
}
