"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  CheckCircle2,
  Facebook,
  Linkedin,
  Loader2,
  MapPin,
  Share2,
} from "lucide-react";
import type { CareerDetail } from "@/data/career-detail";
import { siteConfig } from "@/data/site";
import { trackEvent } from "@/lib/track";
import {
  CAREERS_BG_WHITE,
  CAREERS_BODY,
  CAREERS_BODY_SM,
  CAREERS_FOCUS_RING,
  CAREERS_INNER,
  CAREERS_SECTION_PAD,
} from "../constants";

const softCard =
  "rounded-[28px] border border-[#e8edf2] bg-[#f0f7fb] shadow-[0_8px_32px_rgba(15,23,42,0.04)] dark:border-border dark:bg-surface";
const inputClass =
  "w-full rounded-2xl border border-[#e8edf2] bg-white px-4 py-3.5 text-sm text-[#1a2b4a] placeholder:text-[#94a3b8] transition-colors focus:border-engineering focus:outline-none focus:ring-2 focus:ring-engineering/20 dark:border-border dark:bg-card dark:text-foreground";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
};

function formatDeadline(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function CheckItem({ children }: { children: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-engineering text-white">
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
      </span>
      <span className={CAREERS_BODY_SM}>{children}</span>
    </li>
  );
}

export default function CareerDetailBoard({ job }: { job: CareerDetail }) {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [cv, setCv] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const tags = [job.department.split("&")[0].trim(), job.type, "Engineering"].filter(Boolean);

  const jobInfo: { label: string; value: ReactNode }[] = [
    { label: "Category", value: job.department },
    { label: "Number", value: job.id.toUpperCase() },
    { label: "Company", value: siteConfig.name },
    {
      label: "Website",
      value: (
        <a
          href={siteConfig.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-engineering hover:underline"
        >
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </a>
      ),
    },
    { label: "Experience", value: job.experience },
    { label: "Vacancy", value: String(job.vacancy).padStart(2, "0") },
    { label: "Apply on", value: formatDeadline(job.applicationDeadline) },
  ];

  const update = (key: keyof FormState, value: string) => {
    setForm((c) => ({ ...c, [key]: value }));
    if (errors[key]) setErrors((c) => ({ ...c, [key]: undefined }));
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFileError("");
    if (!file) {
      setCv(null);
      return;
    }
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      setFileError("Upload PDF, DOC, or DOCX.");
      setCv(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File must be under 5 MB.");
      setCv(null);
      return;
    }
    setCv(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Valid email required";
    if (!form.phone.trim()) next.phone = "Required";
    if (form.coverLetter.trim().length < 20) next.coverLetter = "Min 20 characters";
    if (!cv) setFileError("Resume is required.");
    setErrors(next);
    if (Object.keys(next).length > 0 || !cv) return;

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    void trackEvent("job_application", {
      form_name: "careers_apply",
      role: job.title,
      role_slug: job.slug,
    });
    setStatus("success");
  };

  const shareUrl = `${siteConfig.url}/careers/${job.slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      id="role-detail"
      className={`scroll-mt-28 ${CAREERS_BG_WHITE} ${CAREERS_SECTION_PAD}`}
      aria-labelledby="job-title"
    >
      <div className={CAREERS_INNER}>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-10">
          {/* —— Main column —— */}
          <div className="min-w-0 space-y-10 lg:space-y-12">
            <header className={`${softCard} p-5 sm:p-7`}>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-engineering text-white shadow-[0_10px_28px_rgba(33,140,206,0.28)] sm:h-[72px] sm:w-[72px]">
                  <Briefcase className="h-8 w-8" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#d9e1ea] bg-white px-3 py-1 text-[11px] font-semibold text-[#5a6478] dark:border-border dark:bg-card dark:text-foreground-muted">
                      {job.type} / On Site
                    </span>
                    {job.featured && (
                      <span className="rounded-full border border-engineering/25 bg-engineering/10 px-3 py-1 text-[11px] font-semibold text-engineering">
                        Urgent
                      </span>
                    )}
                  </div>
                  <h1
                    id="job-title"
                    className="text-2xl font-bold tracking-tight text-[#1a2b4a] sm:text-3xl lg:text-[34px] dark:text-foreground"
                  >
                    {job.title}
                  </h1>
                  <p className="mt-3 flex items-center gap-2 text-sm font-medium text-[#5a6478] dark:text-foreground-muted">
                    <MapPin className="h-4 w-4 shrink-0 text-engineering" aria-hidden />
                    {job.location}
                  </p>
                  <a
                    href="#apply"
                    className={`btn-primary mt-5 inline-flex items-center justify-center gap-2 lg:hidden ${CAREERS_FOCUS_RING}`}
                  >
                    Apply Now
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </div>
            </header>

            <div>
              <h2 className="mb-4 text-xl font-bold text-[#1a2b4a] sm:text-2xl dark:text-foreground">
                Job Description
              </h2>
              <p className={CAREERS_BODY}>{job.overview}</p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-[#1a2b4a] sm:text-2xl dark:text-foreground">
                Requirements
              </h2>
              <p className={`mb-5 ${CAREERS_BODY_SM}`}>
                Candidates should meet the core qualifications below to be considered for this role.
              </p>
              <ul className="grid gap-4 rounded-[24px] border border-[#e8edf2] bg-[#fafbfd] p-5 sm:grid-cols-2 sm:p-6 dark:border-border dark:bg-surface">
                {job.requirements.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
              {job.educationalQualifications.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-base font-bold text-[#1a2b4a] dark:text-foreground">
                    Educational Qualifications
                  </h3>
                  <ul className="space-y-3">
                    {job.educationalQualifications.map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </ul>
                </div>
              )}
              {job.niceToHave.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-base font-bold text-[#1a2b4a] dark:text-foreground">
                    Nice to Have
                  </h3>
                  <ul className="space-y-3">
                    {job.niceToHave.map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold text-[#1a2b4a] sm:text-2xl dark:text-foreground">
                Responsibilities
              </h2>
              <ul className="space-y-3.5">
                {job.responsibilities.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </div>

            {job.benefits.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-bold text-[#1a2b4a] sm:text-2xl dark:text-foreground">
                  Benefits
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {job.benefits.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-5 border-t border-[#e8edf2] pt-8 sm:flex-row sm:items-center sm:justify-between dark:border-border">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-[#1a2b4a] dark:text-foreground">
                  Tags:
                </span>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#e8edf2] bg-[#fafbfd] px-3 py-1.5 text-xs font-semibold text-[#5a6478] dark:border-border dark:bg-surface dark:text-foreground-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[#1a2b4a] dark:text-foreground">
                  Share:
                </span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8edf2] text-[#5a6478] transition-colors hover:border-engineering hover:text-engineering dark:border-border ${CAREERS_FOCUS_RING}`}
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8edf2] text-[#5a6478] transition-colors hover:border-engineering hover:text-engineering dark:border-border ${CAREERS_FOCUS_RING}`}
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={copyLink}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8edf2] text-[#5a6478] transition-colors hover:border-engineering hover:text-engineering dark:border-border ${CAREERS_FOCUS_RING}`}
                  aria-label={copied ? "Link copied" : "Copy link"}
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* —— Sidebar —— */}
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className={`${softCard} p-6 sm:p-7`}>
              <h2 className="mb-5 text-xl font-bold text-[#1a2b4a] dark:text-foreground">
                Job Information
              </h2>
              <dl>
                {jobInfo.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-start justify-between gap-4 py-3.5 text-sm ${
                      i === 0 ? "pt-0" : "border-t border-[#d9e8f0] dark:border-border"
                    }`}
                  >
                    <dt className="shrink-0 font-medium text-[#5a6478] dark:text-foreground-muted">
                      {row.label} :
                    </dt>
                    <dd className="text-right font-semibold text-[#1a2b4a] dark:text-foreground">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div id="apply" className={`scroll-mt-28 ${softCard} p-6 sm:p-7`}>
              <h2 className="mb-5 text-xl font-bold text-[#1a2b4a] dark:text-foreground">
                Apply Online
              </h2>

              {status === "success" ? (
                <div className="flex flex-col items-center py-8 text-center" role="status">
                  <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-engineering/10 text-engineering">
                    <CheckCircle2 className="h-7 w-7" aria-hidden />
                  </span>
                  <p className="text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                    Application Received
                  </p>
                  <p className={`mt-2 ${CAREERS_BODY_SM}`}>
                    Our talent team will contact shortlisted candidates.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <input
                      className={inputClass}
                      placeholder="Full name*"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      autoComplete="name"
                      aria-label="Full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="Enter email*"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      autoComplete="email"
                      aria-label="Email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="Phone number*"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      autoComplete="tel"
                      aria-label="Phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <textarea
                      rows={5}
                      className={`${inputClass} resize-y`}
                      placeholder="Cover letter*"
                      value={form.coverLetter}
                      onChange={(e) => update("coverLetter", e.target.value)}
                      aria-label="Cover letter"
                    />
                    {errors.coverLetter && (
                      <p className="mt-1 text-xs text-red-500">{errors.coverLetter}</p>
                    )}
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-semibold text-[#1a2b4a] dark:text-foreground">
                      Attach Resume*
                    </p>
                    <label
                      className={`flex cursor-pointer flex-wrap items-center gap-3 rounded-2xl border border-[#e8edf2] bg-white px-3 py-2.5 dark:border-border dark:bg-card ${CAREERS_FOCUS_RING}`}
                    >
                      <span className="rounded-lg bg-[#eef2f6] px-3 py-2 text-xs font-semibold text-[#1a2b4a] dark:bg-background dark:text-foreground">
                        Choose File
                      </span>
                      <span className="min-w-0 flex-1 truncate text-xs text-[#94a3b8]">
                        {cv ? cv.name : "No file chosen"}
                      </span>
                      <input
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={onFileChange}
                      />
                    </label>
                    {fileError && <p className="mt-1 text-xs text-red-500">{fileError}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={`group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full bg-engineering px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(33,140,206,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#1a7ab8] disabled:opacity-70 ${CAREERS_FOCUS_RING}`}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit Now
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </span>
                      </>
                    )}
                  </button>

                  <p className="pt-1 text-center text-[11px] leading-relaxed text-[#94a3b8]">
                    Or email{" "}
                    <a
                      href={`mailto:${job.applyEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                      className="font-semibold text-engineering hover:underline"
                    >
                      {job.applyEmail}
                    </a>
                  </p>
                </form>
              )}
            </div>

            <Link
              href="/careers#open-roles"
              className={`block text-center text-sm font-semibold text-engineering hover:underline ${CAREERS_FOCUS_RING}`}
            >
              ← Back to all roles
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
