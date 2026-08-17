import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSkipLink from "@/components/sections/about/AboutSkipLink";
import CareerDetailSchema from "@/components/sections/careers/detail/CareerDetailSchema";
import CareerDetailView from "@/components/sections/careers/detail/CareerDetailView";
import {
  getAdjacentCareers,
  getAllCareerSlugs,
  getCareerDetailBySlug,
  getRelatedCareers,
} from "@/data/career-detail";
import { siteConfig } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCareerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getCareerDetailBySlug(slug);
  if (!job) return { title: "Role Not Found" };

  return {
    title: job.title,
    description: job.summary,
    alternates: { canonical: `/careers/${job.slug}` },
    openGraph: {
      title: `${job.title} | Careers | ${siteConfig.name}`,
      description: job.summary,
      type: "website",
      images: [{ url: job.image, alt: job.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} | ${siteConfig.name}`,
      description: job.summary,
      images: [job.image],
    },
  };
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = getCareerDetailBySlug(slug);
  if (!job) notFound();

  const related = getRelatedCareers(slug, 3);
  const { prev, next } = getAdjacentCareers(slug);

  return (
    <>
      <CareerDetailSchema job={job} />
      <AboutSkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="about-scroll-padding overflow-x-clip outline-none"
      >
        <CareerDetailView job={job} related={related} prev={prev} next={next} />
      </main>
      <Footer />
    </>
  );
}
