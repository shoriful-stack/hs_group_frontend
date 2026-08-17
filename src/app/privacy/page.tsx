import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects personal information.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="section-padding">
        <div className="container-wide max-w-3xl">
          <p className="section-label mb-3">Legal</p>
          <h1 className="section-title mb-6">Privacy Policy</h1>
          <div className="space-y-5 text-sm leading-[1.85] text-[#5a6478] dark:text-foreground-muted">
            <p>
              {siteConfig.name} respects your privacy. This policy describes how we handle
              information submitted through our website, contact forms, and career applications.
            </p>
            <p>
              We may collect name, email, phone, company, and message details you provide
              voluntarily. This data is used only to respond to inquiries, process applications,
              and improve our services.
            </p>
            <p>
              We do not sell personal data. Access is limited to authorized HS Group teams and
              trusted processors required to operate this site (for example hosting and analytics).
            </p>
            <p>
              For privacy requests, contact{" "}
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
