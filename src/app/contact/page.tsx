import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSkipLink from "@/components/sections/about/AboutSkipLink";
import ContactPageSchema from "@/components/sections/contact/ContactPageSchema";
import ContactHeroSection from "@/components/sections/contact/ContactHeroSection";
import ContactQuickSection from "@/components/sections/contact/ContactQuickSection";
import ContactOfficeSection from "@/components/sections/contact/ContactOfficeSection";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";
import ContactDepartmentsSection from "@/components/sections/contact/ContactDepartmentsSection";
import ContactMapSection from "@/components/sections/contact/ContactMapSection";
import ContactFAQSection from "@/components/sections/contact/ContactFAQSection";
import CTASection from "@/components/sections/CTASection";
import { siteConfig } from "@/data/site";

const contactDescription = `Contact ${siteConfig.name} for engineering consultations, project inquiries, quotations, and technical support across power, telecom, renewable energy, and infrastructure.`;

export const metadata: Metadata = {
  title: "Contact Us",
  description: contactDescription,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact Us | ${siteConfig.name}`,
    description: contactDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${siteConfig.name}`,
    description: contactDescription,
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactPageSchema />
      <AboutSkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="about-scroll-padding overflow-x-clip outline-none"
      >
        <ContactHeroSection />
        <ContactQuickSection />
        <ContactOfficeSection />
        <ContactFormSection />
        <ContactDepartmentsSection />
        <ContactMapSection />
        <ContactFAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
