import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import PartnersSection from "@/components/sections/PartnersSection";
import CTASection from "@/components/sections/CTASection";
import { siteConfig } from "@/data/site";
import { getPartnerLogos } from "@/services/homeService";

export const metadata: Metadata = {
  title: "Partners",
  description: `Strategic alliances and technology partners working with ${siteConfig.name}.`,
  alternates: { canonical: "/partners" },
  openGraph: {
    title: `Partners | ${siteConfig.name}`,
    description: `Strategic alliances and technology partners working with ${siteConfig.name}.`,
    url: "/partners",
  },
};

export default async function PartnersPage() {
  let logos: Awaited<ReturnType<typeof getPartnerLogos>> = [];
  try {
    logos = await getPartnerLogos();
  } catch {
    logos = [];
  }

  const cards = logos.filter((item) => item.name?.trim());

  return (
    <>
      <Header />
      <main>
        <PageHero title="Our Partners" subtitle="Global Alliances" />

        {cards.length > 0 ? (
          <section className="section-padding">
            <div className="container-wide">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {cards.map((partner) => (
                  <div
                    key={partner.name}
                    className="group card-surface flex flex-col items-center justify-center p-8 transition-all hover:border-accent/30 hover:shadow-lg"
                  >
                    {partner.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        width={200}
                        height={80}
                        className="mb-4 h-12 w-auto object-contain opacity-70 transition-opacity group-hover:opacity-100"
                      />
                    ) : null}
                    <span className="text-sm font-medium text-foreground-muted group-hover:text-foreground">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <PartnersSection logos={logos} />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
