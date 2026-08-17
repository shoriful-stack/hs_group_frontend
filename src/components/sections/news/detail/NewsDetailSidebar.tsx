import Image from "next/image";
import Link from "next/link";
import { Download, Mail, Phone } from "lucide-react";
import type { NewsArticle } from "@/data/news";
import { articleTagOptions, sidebarCategories } from "@/data/news-article-detail";
import { siteConfig } from "@/data/site";
import {
  CINEMATIC_IMAGE,
  NEWS_CARD,
  NEWS_FOCUS_RING,
} from "../constants";

type Props = {
  recent: NewsArticle[];
  popular: NewsArticle[];
  currentSlug: string;
};

export default function NewsDetailSidebar({ recent, popular, currentSlug }: Props) {
  return (
    <aside className="space-y-6" aria-label="Article sidebar">
      <div className={`${NEWS_CARD} p-5`}>
        <h2 className="mb-4 text-[11px] font-bold tracking-[0.2em] text-[#94a3b8] uppercase">
          Recent Articles
        </h2>
        <ul className="space-y-4">
          {recent
            .filter((a) => a.slug !== currentSlug)
            .slice(0, 4)
            .map((a) => (
              <li key={a.id}>
                <Link href={`/blog/${a.slug}`} className={`group flex gap-3 ${NEWS_FOCUS_RING} rounded-lg`}>
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <Image src={a.image} alt="" fill className={CINEMATIC_IMAGE} sizes="56px" />
                  </div>
                  <div>
                    <p className="line-clamp-2 text-sm font-semibold text-[#1a2b4a] transition-colors group-hover:text-engineering dark:text-foreground">
                      {a.title}
                    </p>
                    <time className="text-[11px] text-[#94a3b8]" dateTime={a.date}>
                      {a.dateLabel}
                    </time>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <div className={`${NEWS_CARD} p-5`}>
        <h2 className="mb-4 text-[11px] font-bold tracking-[0.2em] text-[#94a3b8] uppercase">
          Popular Articles
        </h2>
        <ul className="space-y-3">
          {popular
            .filter((a) => a.slug !== currentSlug)
            .slice(0, 4)
            .map((a, i) => (
              <li key={a.id}>
                <Link
                  href={`/blog/${a.slug}`}
                  className={`flex gap-3 text-sm font-semibold text-[#1a2b4a] transition-colors hover:text-engineering dark:text-foreground ${NEWS_FOCUS_RING} rounded`}
                >
                  <span className="text-engineering">{String(i + 1).padStart(2, "0")}</span>
                  <span className="line-clamp-2">{a.title}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <div className={`${NEWS_CARD} p-5`}>
        <h2 className="mb-4 text-[11px] font-bold tracking-[0.2em] text-[#94a3b8] uppercase">
          Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {sidebarCategories.map((c) => (
            <Link
              key={c}
              href="/blog#latest-news"
              className={`rounded-full border border-[#e8edf2] px-3 py-1.5 text-[11px] font-semibold text-[#5a6478] transition-colors hover:border-engineering hover:text-engineering dark:border-border dark:text-foreground-muted ${NEWS_FOCUS_RING}`}
            >
              {c}
            </Link>
          ))}
        </div>
      </div>

      <div className={`${NEWS_CARD} p-5`}>
        <h2 className="mb-4 text-[11px] font-bold tracking-[0.2em] text-[#94a3b8] uppercase">
          Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          {articleTagOptions.map((t) => (
            <Link
              key={t}
              href="/blog"
              className={`rounded-full bg-[#fafbfd] px-3 py-1.5 text-[11px] font-semibold text-[#5a6478] transition-colors hover:bg-engineering/10 hover:text-engineering dark:bg-surface dark:text-foreground-muted ${NEWS_FOCUS_RING}`}
            >
              {t}
            </Link>
          ))}
        </div>
      </div>

      <div className={`${NEWS_CARD} p-5`}>
        <h2 className="mb-3 text-sm font-bold text-[#1a2b4a] dark:text-foreground">
          Company Profile
        </h2>
        <p className="mb-4 text-xs leading-relaxed text-[#5a6478] dark:text-foreground-muted">
          Download HS Group’s corporate profile for capability overview and credentials.
        </p>
        <a
          href="/contact?intent=company-profile"
          className={`btn-secondary inline-flex w-full items-center justify-center gap-2 ${NEWS_FOCUS_RING}`}
          aria-label="Request company profile"
        >
          <Download className="h-4 w-4" aria-hidden />
          Request Profile
        </a>
      </div>

      <div className={`${NEWS_CARD} border-engineering/20 bg-engineering/[0.03] p-5`}>
        <h2 className="mb-3 text-sm font-bold text-[#1a2b4a] dark:text-foreground">
          Contact Engineering Team
        </h2>
        <p className="mb-4 text-xs leading-relaxed text-[#5a6478] dark:text-foreground-muted">
          Discuss your next power, telecom, or infrastructure project with HS Group.
        </p>
        <div className="mb-4 space-y-2 text-sm">
          <a
            href={`mailto:${siteConfig.email}`}
            className={`flex items-center gap-2 text-engineering ${NEWS_FOCUS_RING} rounded`}
          >
            <Mail className="h-4 w-4" aria-hidden />
            {siteConfig.email}
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className={`flex items-center gap-2 text-engineering ${NEWS_FOCUS_RING} rounded`}
          >
            <Phone className="h-4 w-4" aria-hidden />
            {siteConfig.phone}
          </a>
        </div>
        <Link
          href="/contact"
          className={`btn-primary inline-flex w-full items-center justify-center ${NEWS_FOCUS_RING}`}
        >
          Quick Contact
        </Link>
      </div>
    </aside>
  );
}
