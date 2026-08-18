"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CareerDetail } from "@/data/career-detail";
import type { CareerJob } from "@/data/careers-page";
import CTASection from "@/components/sections/CTASection";
import {
  CAREERS_BG_WHITE,
  CAREERS_BLOCK_SPACING,
  CAREERS_BODY_SM,
  CAREERS_CARD,
  CAREERS_CARD_GAP,
  CAREERS_CARD_HOVER,
  CAREERS_FOCUS_RING,
  CAREERS_INNER,
  CAREERS_SECTION_PAD,
} from "../constants";

export function CareerDetailRelated({ jobs }: { jobs: CareerJob[] }) {
  if (jobs.length === 0) return null;

  return (
    <section
      id="related-roles"
      className={`scroll-mt-28 ${CAREERS_BG_WHITE} ${CAREERS_SECTION_PAD}`}
      aria-labelledby="related-roles-heading"
    >
      <div className={CAREERS_INNER}>
        <div className={CAREERS_BLOCK_SPACING}>
          <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
            Related Roles
          </p>
          <h2
            id="related-roles-heading"
            className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground"
          >
            Other Opportunities
          </h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${CAREERS_CARD_GAP}`}>
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/careers/${job.slug}`}
              className={`group flex h-full flex-col p-6 ${CAREERS_CARD} ${CAREERS_CARD_HOVER} ${CAREERS_FOCUS_RING}`}
            >
              <span className="mb-3 text-[10px] font-bold tracking-wide text-engineering uppercase">
                {job.department}
              </span>
              <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                {job.title}
              </h3>
              <p className={`mb-4 line-clamp-2 flex-1 ${CAREERS_BODY_SM}`}>{job.summary}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-engineering">
                View Role
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CareerDetailCTA(_props: { job: CareerDetail }) {
  return <CTASection />;
}
