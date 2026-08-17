import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of the ${siteConfig.name} website.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="section-padding">
        <div className="container-wide max-w-3xl">
          <p className="section-label mb-3">Legal</p>
          <h1 className="section-title mb-6">Terms of Service</h1>
          <div className="space-y-5 text-sm leading-[1.85] text-[#5a6478] dark:text-foreground-muted">
            <p>
              By using {siteConfig.name}&apos;s website you agree to these terms. Content on this
              site is provided for general information about our engineering products, services,
              and projects.
            </p>
            <p>
              Product specifications, availability, and project references may change without
              notice. Formal quotations, contracts, and warranties are issued only through
              authorized HS Group channels.
            </p>
            <p>
              You may not misuse this site, attempt unauthorized access, or republish proprietary
              materials without permission.
            </p>
            <p>
              Questions:{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-semibold text-engineering">
                {siteConfig.email}
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
