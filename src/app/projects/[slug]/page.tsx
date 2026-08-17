import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSkipLink from "@/components/sections/about/AboutSkipLink";
import CaseStudySchema from "@/components/sections/projects/detail/CaseStudySchema";
import CaseStudyView from "@/components/sections/projects/detail/CaseStudyView";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
} from "@/data/project-case-study";
import { siteConfig } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Project Not Found" };

  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: `/projects/${study.slug}` },
    openGraph: {
      title: `${study.title} | ${siteConfig.name}`,
      description: study.description,
      type: "article",
      images: [{ url: study.image, alt: study.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} | ${siteConfig.name}`,
      description: study.description,
      images: [study.image],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const relatedProjects = getRelatedCaseStudies(slug, 4);

  return (
    <>
      <CaseStudySchema study={study} />
      <AboutSkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="about-scroll-padding overflow-x-clip outline-none"
      >
        <CaseStudyView
          study={study}
          relatedProjects={relatedProjects}
        />
      </main>
      <Footer />
    </>
  );
}
