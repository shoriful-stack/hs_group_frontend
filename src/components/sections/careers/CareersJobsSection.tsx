"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, Clock, MapPin } from "lucide-react";
import {
  careerDepartments,
  careerJobs,
  type CareerDepartment,
} from "@/data/careers-page";
import {
  CAREERS_BG_SURFACE,
  CAREERS_BLOCK_SPACING,
  CAREERS_BODY_SM,
  CAREERS_CARD,
  CAREERS_CARD_GAP,
  CAREERS_CARD_HOVER,
  CAREERS_FOCUS_RING,
  CAREERS_INNER,
  CAREERS_SECTION_PAD,
} from "./constants";

export default function CareersJobsSection() {
  const [department, setDepartment] = useState<CareerDepartment>("All");

  const filtered = useMemo(() => {
    if (department === "All") return careerJobs;
    return careerJobs.filter((j) => j.department === department);
  }, [department]);

  return (
    <section
      id="open-roles"
      className={`scroll-mt-28 ${CAREERS_BG_SURFACE} ${CAREERS_SECTION_PAD}`}
      aria-labelledby="open-roles-heading"
    >
      <div className={CAREERS_INNER}>
        <div className={`${CAREERS_BLOCK_SPACING} flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              Open Positions
            </p>
            <h2
              id="open-roles-heading"
              className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground"
            >
              Current Opportunities
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
            Filter by department and explore roles across engineering, projects, sales, and operations.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 lg:mb-10" role="group" aria-label="Filter by department">
          {careerDepartments.map((d) => {
            const active = department === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDepartment(d)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${CAREERS_FOCUS_RING} ${
                  active
                    ? "border-engineering bg-engineering text-white"
                    : "border-[#e8edf2] bg-white text-[#5a6478] hover:border-engineering hover:text-engineering dark:border-border dark:bg-card"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>

        <p className="mb-5 text-sm text-[#94a3b8]" aria-live="polite">
          Showing {filtered.length} role{filtered.length === 1 ? "" : "s"}
          {department !== "All" ? ` in ${department}` : ""}
        </p>

        {filtered.length === 0 ? (
          <div className={`px-6 py-16 text-center ${CAREERS_CARD}`}>
            <p className="font-semibold text-[#1a2b4a] dark:text-foreground">No roles in this department right now.</p>
            <button
              type="button"
              onClick={() => setDepartment("All")}
              className={`mt-4 text-sm font-semibold text-engineering ${CAREERS_FOCUS_RING}`}
            >
              View all roles
            </button>
          </div>
        ) : (
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${CAREERS_CARD_GAP}`}>
            {filtered.map((job) => (
              <article
                key={job.id}
                className={`group flex h-full flex-col overflow-hidden ${CAREERS_CARD} ${CAREERS_CARD_HOVER}`}
              >
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-engineering/25 bg-engineering/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-engineering uppercase">
                      {job.department}
                    </span>
                    {job.featured && (
                      <span className="rounded-full border border-[#e8edf2] px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-[#5a6478] uppercase dark:border-border">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                    {job.title}
                  </h3>
                  <p className={`mb-5 line-clamp-3 flex-1 ${CAREERS_BODY_SM}`}>{job.summary}</p>
                  <ul className="mb-5 space-y-2 text-xs font-medium text-[#5a6478] dark:text-foreground-muted">
                    <li className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-engineering" aria-hidden />
                      {job.location}
                    </li>
                    <li className="flex items-center gap-2">
                      <Briefcase className="h-3.5 w-3.5 text-engineering" aria-hidden />
                      {job.type} · {job.experience}
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-engineering" aria-hidden />
                      Posted {new Date(job.posted).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </li>
                  </ul>
                  <Link
                    href={`/careers/${job.slug}`}
                    className={`btn-primary inline-flex items-center justify-center gap-2 text-sm ${CAREERS_FOCUS_RING}`}
                  >
                    View Role
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
