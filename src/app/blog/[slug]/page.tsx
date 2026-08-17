import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSkipLink from "@/components/sections/about/AboutSkipLink";
import NewsDetailSchema from "@/components/sections/news/detail/NewsDetailSchema";
import NewsDetailView from "@/components/sections/news/detail/NewsDetailView";
import { newsArticles } from "@/data/news";
import {
  getAdjacentArticles,
  getArticleDetailBySlug,
  getPopularArticles,
  getRecentArticles,
  getRelatedArticles,
} from "@/data/news-article-detail";
import { siteConfig } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleDetailBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: `${article.title} | ${siteConfig.name}`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updatedDate,
      authors: [article.authorProfile.name],
      images: [{ url: article.image, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | ${siteConfig.name}`,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleDetailBySlug(slug);
  if (!article) notFound();

  const { prev, next } = getAdjacentArticles(slug);
  const relatedArticles = getRelatedArticles(slug, 3);
  const recent = getRecentArticles(5);
  const popular = getPopularArticles(5);

  return (
    <>
      <NewsDetailSchema article={article} />
      <AboutSkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="about-scroll-padding overflow-x-clip outline-none"
      >
        <NewsDetailView
          article={article}
          prev={prev}
          next={next}
          relatedArticles={relatedArticles}
          recent={recent}
          popular={popular}
        />
      </main>
      <Footer />
    </>
  );
}
