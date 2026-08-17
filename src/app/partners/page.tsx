import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import PartnersSection from "@/components/sections/PartnersSection";
import CTASection from "@/components/sections/CTASection";
import SectionHeading from "@/components/ui/SectionHeading";
import { partners } from "@/data/site";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "HS Group partners with world-leading manufacturers and technology providers for power, telecom, solar, and smart infrastructure.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Partners | HS Group",
    description:
      "Strategic alliances with global manufacturers and technology providers.",
    url: "/partners",
  },
};

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Our Partners"
          subtitle="Global Alliances"
          image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
        />

        <section className="section-padding">
          <div className="container-wide">
            <SectionHeading
              label="Strategic Partnerships"
              title="Collaborating with Industry Leaders"
              description="Our partnerships with global manufacturers ensure access to cutting-edge technology and world-class products for every project."
              align="center"
            />
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="group card-surface flex flex-col items-center justify-center p-8 transition-all hover:border-accent/30 hover:shadow-lg"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={200}
                    height={80}
                    className="mb-4 h-12 w-auto object-contain opacity-70 transition-opacity group-hover:opacity-100"
                  />
                  <span className="text-sm font-medium text-foreground-muted group-hover:text-foreground">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
