"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Facebook,
  Linkedin,
  Link2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import type { ProjectCaseStudy } from "@/data/project-case-study";
import type { PortfolioProject } from "@/data/projects-page";
import { siteConfig } from "@/data/site";
import {
  CINEMATIC_IMAGE,
  PROJECTS_CARD,
  PROJECTS_FOCUS_RING,
  PROJECTS_ICON_STROKE,
} from "../constants";

type Props = {
  study: ProjectCaseStudy;
  related: PortfolioProject[];
};

export default function CaseStudySidebar({ study, related }: Props) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState(`/projects/${study.slug}`);
  const milestones = study.milestones.slice(0, 4);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

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
    <aside className="space-y-6 lg:space-y-8" aria-label="Case study sidebar">
      <div className={`${PROJECTS_CARD} overflow-hidden`}>
        <div className="border-b border-[#e8edf2] px-5 py-4 dark:border-border">
          <p className="text-[11px] font-bold tracking-[0.2em] text-engineering uppercase">
            Program Path
          </p>
          <h2 className="mt-1 text-base font-bold text-[#1a2b4a] dark:text-foreground">
            Timeline
          </h2>
        </div>
        <ol className="relative space-y-0 px-5 py-5">
          <div
            className="absolute top-8 bottom-8 left-[2.15rem] w-px bg-engineering/20"
            aria-hidden
          />
          {milestones.map((m, i) => (
            <li key={m.title} className="relative flex gap-3.5 pb-5 last:pb-0">
              <span className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-engineering bg-white text-[11px] font-bold text-engineering shadow-[0_4px_12px_rgba(33,140,206,0.18)] dark:bg-card">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-[11px] font-bold tracking-[0.12em] text-engineering uppercase">
                  {m.date}
                </p>
                <p className="mt-1 text-sm leading-snug font-semibold text-[#1a2b4a] dark:text-foreground">
                  {m.title}
                </p>
                {m.description && (
                  <p className="mt-1.5 text-xs leading-[1.7] text-[#5a6478] dark:text-foreground-muted">
                    {m.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className={`${PROJECTS_CARD} p-5`}>
        <h2 className="mb-3 text-[11px] font-bold tracking-[0.2em] text-[#94a3b8] uppercase">Share</h2>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8edf2] dark:border-border ${PROJECTS_FOCUS_RING}`}
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8edf2] dark:border-border ${PROJECTS_FOCUS_RING}`}
            aria-label="Share on Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={copy}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8edf2] dark:border-border ${PROJECTS_FOCUS_RING}`}
            aria-label="Copy link"
          >
            {copied ? <Check className="h-4 w-4 text-engineering" /> : <Link2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className={`${PROJECTS_CARD} overflow-hidden`}>
        <div className="border-b border-[#e8edf2] px-5 py-4 dark:border-border">
          <p className="text-[11px] font-bold tracking-[0.2em] text-engineering uppercase">
            Explore More
          </p>
          <h2 className="mt-1 text-base font-bold text-[#1a2b4a] dark:text-foreground">
            Related Projects
          </h2>
        </div>
        <ul className="space-y-3 p-4">
          {related.slice(0, 3).map((p) => (
            <li key={p.id}>
              <Link
                href={`/projects/${p.slug}`}
                className={`group flex gap-3 rounded-[18px] border border-[#e8edf2] bg-[#fafbfd] p-2.5 transition-all duration-400 hover:-translate-y-0.5 hover:border-engineering hover:bg-white hover:shadow-[0_12px_28px_rgba(33,140,206,0.1)] dark:border-border dark:bg-surface ${PROJECTS_FOCUS_RING}`}
              >
                <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[14px]">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.06]`}
                    sizes="72px"
                  />
                </div>
                <div className="min-w-0 flex-1 py-0.5">
                  <span className="mb-1 inline-block text-[10px] font-bold tracking-[0.14em] text-engineering uppercase">
                    {p.industry}
                  </span>
                  <p className="line-clamp-2 text-sm leading-snug font-semibold text-[#1a2b4a] transition-colors group-hover:text-engineering dark:text-foreground">
                    {p.title}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] text-[#94a3b8]">
                    <MapPin className="h-3 w-3 shrink-0" strokeWidth={PROJECTS_ICON_STROKE} aria-hidden />
                    <span className="truncate">{p.location}</span>
                  </p>
                </div>
                <ArrowUpRight
                  className="mt-1 h-4 w-4 shrink-0 text-[#94a3b8] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-engineering"
                  strokeWidth={PROJECTS_ICON_STROKE}
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-t border-[#e8edf2] px-5 py-3.5 dark:border-border">
          <Link
            href="/projects"
            className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] text-engineering uppercase transition-colors hover:text-[#1a7ab8] ${PROJECTS_FOCUS_RING} rounded`}
          >
            View all projects
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>

      <div className={`${PROJECTS_CARD} border-engineering/20 bg-engineering/[0.03] p-5`}>
        <h2 className="mb-3 text-sm font-bold text-[#1a2b4a] dark:text-foreground">Quick Contact</h2>
        <a href={`mailto:${siteConfig.email}`} className={`mb-2 flex items-center gap-2 text-sm text-engineering ${PROJECTS_FOCUS_RING} rounded`}>
          <Mail className="h-4 w-4" aria-hidden />
          {siteConfig.email}
        </a>
        <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className={`mb-4 flex items-center gap-2 text-sm text-engineering ${PROJECTS_FOCUS_RING} rounded`}>
          <Phone className="h-4 w-4" aria-hidden />
          {siteConfig.phone}
        </a>
        <Link href="/contact" className={`btn-primary inline-flex w-full items-center justify-center ${PROJECTS_FOCUS_RING}`}>
          Contact Team
        </Link>
      </div>
    </aside>
  );
}
