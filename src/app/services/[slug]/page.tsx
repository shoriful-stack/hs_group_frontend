import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSkipLink from "@/components/sections/about/AboutSkipLink";
import ServiceDetailSchema from "@/components/sections/services/detail/ServiceDetailSchema";
import ServiceDetailView from "@/components/sections/services/detail/ServiceDetailView";
import {
  getServiceDetailPageData,
  getServiceSlugs,
} from "@/services/serviceService";
import { siteConfig } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const slugs = await getServiceSlugs();
    return (Array.isArray(slugs) ? slugs : [])
      .filter((slug) => typeof slug === "string" && slug.trim())
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { service } = await getServiceDetailPageData(slug);
    if (!service) return { title: "Service Not Found" };

    const title = service.seoTitle || service.title;
    const description = service.seoDescription || service.description;
    const images = service.image ? [{ url: service.image, alt: service.title }] : undefined;

    return {
      title,
      description,
      alternates: { canonical: `/services/${service.slug}` },
      openGraph: {
        title: `${title} | ${siteConfig.name}`,
        description,
        type: "website",
        ...(images ? { images } : {}),
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | ${siteConfig.name}`,
        description,
        ...(service.image ? { images: [service.image] } : {}),
      },
    };
  } catch {
    return { title: "Service Not Found" };
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  let slug = "";
  try {
    slug = (await params)?.slug?.trim() ?? "";
  } catch {
    notFound();
  }
  if (!slug) notFound();

  let service = null;
  let related: Awaited<ReturnType<typeof getServiceDetailPageData>>["related"] = [];
  try {
    const data = await getServiceDetailPageData(slug);
    service = data?.service ?? null;
    related = Array.isArray(data?.related) ? data.related : [];
  } catch {
    notFound();
  }

  if (!service) notFound();

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
        <ServiceDetailView service={service} relatedServices={related} />
      </main>
      <Footer />
    </>
  );
}
