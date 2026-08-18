"use client";

import type { ArticleDetail } from "@/data/news-article-detail";
import type { NewsArticle } from "@/data/news";
import NewsDetailProgress from "./NewsDetailProgress";
import NewsDetailHero from "./NewsDetailHero";
import NewsDetailHeader from "./NewsDetailHeader";
import NewsDetailShare from "./NewsDetailShare";
import NewsDetailToc from "./NewsDetailToc";
import NewsDetailContent from "./NewsDetailContent";
import {
  NewsDetailAuthor,
  NewsDetailFeedback,
  NewsDetailMobileShare,
  NewsDetailPrevNext,
  NewsDetailTags,
} from "./NewsDetailAuthorNav";
import NewsDetailSidebar from "./NewsDetailSidebar";
import { NewsDetailRelatedArticles } from "./NewsDetailRelated";
import CTASection from "@/components/sections/CTASection";
import { NEWS_BG_WHITE, NEWS_INNER, NEWS_SECTION_PAD } from "../constants";

type Props = {
  article: ArticleDetail;
  prev: NewsArticle | null;
  next: NewsArticle | null;
  relatedArticles: NewsArticle[];
  recent: NewsArticle[];
  popular: NewsArticle[];
};

export default function NewsDetailView({
  article,
  prev,
  next,
  relatedArticles,
  recent,
  popular,
}: Props) {
  const readingMinutes = Number.parseInt(article.readingTime, 10) || 4;

  return (
    <>
      <NewsDetailProgress readingMinutes={readingMinutes} />
      <NewsDetailHero article={article} />

      <article className={`${NEWS_BG_WHITE} ${NEWS_SECTION_PAD}`}>
        <div className={NEWS_INNER}>
          <div className="grid gap-10 xl:grid-cols-[56px_minmax(0,1fr)_300px] xl:gap-10">
            <div className="hidden xl:block">
              <NewsDetailShare article={article} />
            </div>

            <div className="min-w-0">
              <NewsDetailHeader article={article} />
              <NewsDetailMobileShare article={article} />

              <div className="mb-10 xl:hidden">
                <details className="rounded-[20px] border border-[#e8edf2] p-4 dark:border-border">
                  <summary className="cursor-pointer text-sm font-bold text-[#1a2b4a] dark:text-foreground">
                    Table of contents
                  </summary>
                  <div className="mt-4">
                    <NewsDetailToc content={article.content} forceShow />
                  </div>
                </details>
              </div>

              <NewsDetailContent article={article} />
              <NewsDetailTags tags={article.tags} />
              <NewsDetailAuthor author={article.authorProfile} />
              <NewsDetailFeedback />
              <NewsDetailPrevNext prev={prev} next={next} />
            </div>

            <div className="hidden xl:block">
              <div className="sticky top-28 space-y-8">
                <NewsDetailToc content={article.content} forceShow />
                <NewsDetailSidebar
                  recent={recent}
                  popular={popular}
                  currentSlug={article.slug}
                />
              </div>
            </div>
          </div>
        </div>
      </article>

      <NewsDetailRelatedArticles items={relatedArticles} />
      <CTASection />
    </>
  );
}
