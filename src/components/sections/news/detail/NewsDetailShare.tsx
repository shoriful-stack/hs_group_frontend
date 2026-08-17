"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Facebook,
  Linkedin,
  Link2,
  Mail,
  Printer,
} from "lucide-react";
import type { ArticleDetail } from "@/data/news-article-detail";
import { NEWS_FOCUS_RING, NEWS_TOUCH_TARGET } from "../constants";

type Props = { article: ArticleDetail };

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function NewsDetailShare({ article }: Props) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState(`/blog/${article.slug}`);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const title = encodeURIComponent(article.title);
  const encodedUrl = encodeURIComponent(url);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const btn =
    `inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white text-[#1a2b4a] transition-all duration-300 hover:border-engineering hover:text-engineering hover:shadow-[0_8px_20px_rgba(33,140,206,0.15)] dark:border-border dark:bg-card dark:text-foreground ${NEWS_TOUCH_TARGET} ${NEWS_FOCUS_RING}`;

  return (
    <aside
      className="xl:sticky xl:top-28 xl:flex xl:flex-col xl:gap-3"
      aria-label="Share article"
    >
      <p className="mb-1 text-[10px] font-bold tracking-[0.2em] text-[#94a3b8] uppercase">
        Share
      </p>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${title}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Share on X"
      >
        <XIcon className="h-4 w-4" />
      </a>
      <a
        href={`mailto:?subject=${title}&body=${encodedUrl}`}
        className={btn}
        aria-label="Share by email"
      >
        <Mail className="h-4 w-4" />
      </a>
      <button type="button" onClick={copyLink} className={btn} aria-label="Copy link">
        {copied ? <Check className="h-4 w-4 text-engineering" /> : <Link2 className="h-4 w-4" />}
      </button>
      <button type="button" onClick={() => window.print()} className={btn} aria-label="Print article">
        <Printer className="h-4 w-4" />
      </button>
    </aside>
  );
}
