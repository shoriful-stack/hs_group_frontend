import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSkipLink from "@/components/sections/about/AboutSkipLink";
import ServiceDetailSchema from "@/components/sections/services/detail/ServiceDetailSchema";
import ServiceDetailView from "@/components/sections/services/detail/ServiceDetailView";
import {
  getAllServiceSlugs,
  getRelatedServices,
  getServiceDetailBySlug,
} from "@/data/service-detail";
import { siteConfig } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.description,
      type: "website",
      images: [{ url: service.image, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ${siteConfig.name}`,
      description: service.description,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);
  if (!service) notFound();

  const relatedServices = getRelatedServices(slug, 4);

  return (
    <>
      <ServiceDetailSchema service={service} />
      <AboutSkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="about-scroll-padding overflow-x-clip outline-none"
      >
        <ServiceDetailView
          service={service}
          relatedServices={relatedServices}
        />
      </main>
      <Footer />
    </>
  );
}
