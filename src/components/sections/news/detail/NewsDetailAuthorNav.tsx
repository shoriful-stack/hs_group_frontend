"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Linkedin,
  Mail,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import type { ArticleAuthor, ArticleDetail } from "@/data/news-article-detail";
import type { NewsArticle } from "@/data/news";
import {
  CINEMATIC_IMAGE,
  NEWS_BODY_SM,
  NEWS_CARD,
  NEWS_CARD_HOVER,
  NEWS_FOCUS_RING,
  NEWS_IMAGE_FRAME,
} from "../constants";

export function NewsDetailTags({ tags }: { tags: string[] }) {
  return (
    <section className="mt-14" aria-labelledby="article-tags">
      <h2
        id="article-tags"
        className="mb-4 text-sm font-bold tracking-[0.16em] text-[#94a3b8] uppercase"
      >
        Tags
      </h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href="/blog"
            className={`rounded-full border border-[#e8edf2] bg-white px-4 py-2 text-xs font-semibold text-[#5a6478] transition-all duration-300 hover:-translate-y-0.5 hover:border-engineering hover:text-engineering dark:border-border dark:bg-card dark:text-foreground-muted ${NEWS_FOCUS_RING}`}
          >
            {tag}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function NewsDetailAuthor({ author }: { author: ArticleAuthor }) {
  return (
    <section className="mt-14" aria-labelledby="author-profile">
      <div className={`flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:p-8 ${NEWS_CARD}`}>
        <div className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-full ${NEWS_IMAGE_FRAME} !rounded-full`}>
          <Image
            src={author.photo}
            alt={author.name}
            fill
            className={`${CINEMATIC_IMAGE} object-top`}
            sizes="96px"
          />
        </div>
        <div className="flex-1">
          <h2 id="author-profile" className="text-xl font-bold text-[#1a2b4a] dark:text-foreground">
            {author.name}
          </h2>
          <p className="mt-1 text-sm font-semibold text-engineering">{author.designation}</p>
          <p className="text-xs text-[#94a3b8]">{author.department}</p>
          <p className={`mt-3 ${NEWS_BODY_SM}`}>{author.bio}</p>
          <p className="mt-3 text-xs font-semibold text-[#5a6478] dark:text-foreground-muted">
            {author.articlesCount} published articles
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={author.linkedin}
              className={`inline-flex items-center gap-2 text-sm font-semibold text-engineering ${NEWS_FOCUS_RING}`}
            >
              <Linkedin className="h-4 w-4" aria-hidden />
              LinkedIn
            </a>
            <a
              href={`mailto:${author.email}`}
              className={`inline-flex items-center gap-2 text-sm font-semibold text-engineering ${NEWS_FOCUS_RING}`}
            >
              <Mail className="h-4 w-4" aria-hidden />
              Email
            </a>
            <Link
              href="/blog"
              className={`inline-flex items-center gap-2 text-sm font-semibold text-[#1a2b4a] dark:text-foreground ${NEWS_FOCUS_RING}`}
            >
              View Profile
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsDetailFeedback() {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);

  return (
    <div className={`mt-10 flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between ${NEWS_CARD}`}>
      <p className="text-sm font-semibold text-[#1a2b4a] dark:text-foreground">
        Was this article helpful?
      </p>
      {vote ? (
        <p className="inline-flex items-center gap-2 text-sm text-engineering" role="status">
          <CheckCircle2 className="h-4 w-4" aria-hidden />
          Thank you for your feedback.
        </p>
      ) : (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setVote("yes")}
            className={`inline-flex items-center gap-2 rounded-full border border-[#e8edf2] px-4 py-2 text-sm font-semibold text-[#1a2b4a] transition-all hover:border-engineering hover:text-engineering dark:border-border dark:text-foreground ${NEWS_FOCUS_RING}`}
          >
            <ThumbsUp className="h-4 w-4" aria-hidden />
            Yes
          </button>
          <button
            type="button"
            onClick={() => setVote("no")}
            className={`inline-flex items-center gap-2 rounded-full border border-[#e8edf2] px-4 py-2 text-sm font-semibold text-[#1a2b4a] transition-all hover:border-engineering hover:text-engineering dark:border-border dark:text-foreground ${NEWS_FOCUS_RING}`}
          >
            <ThumbsDown className="h-4 w-4" aria-hidden />
            No
          </button>
        </div>
      )}
    </div>
  );
}

export function NewsDetailPrevNext({
  prev,
  next,
}: {
  prev: NewsArticle | null;
  next: NewsArticle | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-14 grid gap-4 md:grid-cols-2" aria-label="Previous and next articles">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className={`group relative overflow-hidden p-0 ${NEWS_CARD} ${NEWS_CARD_HOVER} ${NEWS_FOCUS_RING}`}
        >
          <div className="relative aspect-[16/8]">
            <Image
              src={prev.image}
              alt=""
              fill
              className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#0f1729]/55" />
            <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
              <span className="mb-2 inline-flex items-center gap-1 text-xs font-semibold tracking-wider uppercase opacity-80">
                <ArrowLeft className="h-3.5 w-3.5" />
                Previous
              </span>
              <span className="line-clamp-2 text-base font-bold sm:text-lg">{prev.title}</span>
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link
          href={`/blog/${next.slug}`}
          className={`group relative overflow-hidden p-0 ${NEWS_CARD} ${NEWS_CARD_HOVER} ${NEWS_FOCUS_RING}`}
        >
          <div className="relative aspect-[16/8]">
            <Image
              src={next.image}
              alt=""
              fill
              className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#0f1729]/55" />
            <div className="absolute inset-0 flex flex-col items-end justify-end p-5 text-right text-white">
              <span className="mb-2 inline-flex items-center gap-1 text-xs font-semibold tracking-wider uppercase opacity-80">
                Next
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="line-clamp-2 text-base font-bold sm:text-lg">{next.title}</span>
            </div>
          </div>
        </Link>
      )}
    </nav>
  );
}

export function NewsDetailMobileShare({ article }: { article: ArticleDetail }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mb-8 flex flex-wrap gap-2 xl:hidden">
      <button
        type="button"
        onClick={copy}
        className={`rounded-full border border-[#e8edf2] px-4 py-2 text-xs font-semibold text-[#1a2b4a] dark:border-border dark:text-foreground ${NEWS_FOCUS_RING}`}
      >
        {copied ? "Link copied" : "Copy link"}
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className={`rounded-full border border-[#e8edf2] px-4 py-2 text-xs font-semibold text-[#1a2b4a] dark:border-border dark:text-foreground ${NEWS_FOCUS_RING}`}
      >
        Print
      </button>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`/blog/${article.slug}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`rounded-full border border-[#e8edf2] px-4 py-2 text-xs font-semibold text-[#1a2b4a] dark:border-border dark:text-foreground ${NEWS_FOCUS_RING}`}
      >
        LinkedIn
      </a>
    </div>
  );
}
