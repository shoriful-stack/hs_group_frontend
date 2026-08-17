"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  Compass,
  Factory,
  Gauge,
  GraduationCap,
  HeartPulse,
  Landmark,
  Layers,
  Network,
  Radio,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  getProductApplicationsList,
  productFinderRequirements,
  productIndustries,
  recommendProducts,
  type ProductFinderRequirement,
} from "@/data/products-page";
import {
  CINEMATIC_IMAGE,
  PRODUCTS_BG_SURFACE,
  PRODUCTS_BODY_SM,
  PRODUCTS_CARD,
  PRODUCTS_CARD_HOVER,
  PRODUCTS_FOCUS_RING,
  PRODUCTS_ICON_BOX,
  PRODUCTS_ICON_STROKE,
  PRODUCTS_INNER,
  PRODUCTS_SECTION_PAD,
} from "./constants";

type Step = 1 | 2 | 3 | 4;

const industryIcons: Record<string, LucideIcon> = {
  "Power Utilities": Zap,
  "Telecom Operators": Radio,
  "Industrial Plants": Factory,
  "Commercial Buildings": Building2,
  Government: Landmark,
  Healthcare: HeartPulse,
  Education: GraduationCap,
  Manufacturing: Layers,
  "Oil & Gas": Gauge,
  "Smart Cities": Network,
};

const requirementIcons: Record<ProductFinderRequirement, LucideIcon> = {
  "High Reliability": ShieldCheck,
  "Mission-Critical Backup": Zap,
  "Energy Efficiency": Sparkles,
  "Smart Monitoring": Network,
  "Standards Compliance": BadgeCheck,
  "Scalable Deployment": Layers,
};

export default function ProductsFinderSection() {
  const [step, setStep] = useState<Step>(1);
  const [industry, setIndustry] = useState("");
  const [application, setApplication] = useState("");
  const [requirement, setRequirement] = useState<ProductFinderRequirement | "">("");
  const applications = useMemo(() => getProductApplicationsList(), []);

  const results = useMemo(() => {
    if (!industry || !application || !requirement) return [];
    return recommendProducts({ industry, application, requirement });
  }, [industry, application, requirement]);

  const reset = () => {
    setStep(1);
    setIndustry("");
    setApplication("");
    setRequirement("");
  };

  const steps = [
    { n: 1 as const, label: "Industry", hint: "Where you operate" },
    { n: 2 as const, label: "Application", hint: "What you need" },
    { n: 3 as const, label: "Requirement", hint: "Priority outcome" },
    { n: 4 as const, label: "Results", hint: "Matched products" },
  ];

  return (
    <section
      id="product-finder"
      className={`scroll-mt-24 ${PRODUCTS_BG_SURFACE} ${PRODUCTS_SECTION_PAD}`}
      aria-labelledby="product-finder-heading"
    >
      <div className={PRODUCTS_INNER}>
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionHeading
              label="PRODUCT FINDER"
              title="Guided Product Selection"
              description="Three quick choices — industry, application, and requirement — then we surface the best-fit engineering products."
              align="left"
            />
          </div>
          {(industry || application || requirement) && step < 4 && (
            <button
              type="button"
              onClick={reset}
              className={`inline-flex items-center gap-2 self-start text-sm font-semibold text-[#5a6478] hover:text-engineering lg:self-auto ${PRODUCTS_FOCUS_RING}`}
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              Reset
            </button>
          )}
        </div>

        <div className={`overflow-hidden ${PRODUCTS_CARD}`}>
          {/* Progress rail */}
          <div className="border-b border-[#e8edf2] bg-[#fafbfd] px-5 py-5 sm:px-8 sm:py-6 dark:border-border dark:bg-surface">
            <ol className="relative grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-2" aria-label="Finder steps">
              <div
                className="absolute top-5 right-[12.5%] left-[12.5%] hidden h-px bg-[#e8edf2] sm:block dark:bg-border"
                aria-hidden
              />
              {steps.map((s) => {
                const done = step > s.n;
                const active = step === s.n;
                return (
                  <li key={s.n} className="relative z-[1] flex flex-col items-center text-center sm:items-center">
                    <span
                      className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                        active
                          ? "bg-engineering text-white shadow-[0_8px_20px_rgba(33,140,206,0.32)]"
                          : done
                            ? "border-2 border-engineering bg-white text-engineering dark:bg-card"
                            : "border-2 border-[#e8edf2] bg-white text-[#94a3b8] dark:border-border dark:bg-card"
                      }`}
                    >
                      {done ? <Check className="h-4 w-4" strokeWidth={PRODUCTS_ICON_STROKE} aria-hidden /> : s.n}
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        active || done ? "text-[#1a2b4a] dark:text-foreground" : "text-[#94a3b8]"
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="mt-0.5 hidden text-[11px] text-[#94a3b8] sm:block">{s.hint}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="p-5 sm:p-8">
            {step === 1 && (
              <div>
                <div className="mb-6 flex items-start gap-3">
                  <div className={PRODUCTS_ICON_BOX}>
                    <Compass className="h-5 w-5" strokeWidth={PRODUCTS_ICON_STROKE} aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                      Select your industry
                    </h3>
                    <p className={`mt-1 ${PRODUCTS_BODY_SM}`}>
                      Choose the sector that best matches your project context.
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {productIndustries.map((ind) => {
                    const Icon = industryIcons[ind] ?? Building2;
                    const active = industry === ind;
                    return (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => {
                          setIndustry(ind);
                          setStep(2);
                        }}
                        className={`group flex flex-col items-start gap-3 rounded-[20px] border p-4 text-left transition-all duration-400 ${PRODUCTS_FOCUS_RING} ${
                          active
                            ? "border-engineering bg-engineering/[0.06] shadow-[0_12px_28px_rgba(33,140,206,0.12)]"
                            : "border-[#e8edf2] bg-white hover:-translate-y-0.5 hover:border-engineering hover:shadow-[0_12px_28px_rgba(33,140,206,0.1)] dark:border-border dark:bg-card"
                        }`}
                      >
                        <span
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border transition-colors ${
                            active
                              ? "border-engineering/30 bg-engineering text-white"
                              : "border-engineering/20 bg-engineering/5 text-engineering group-hover:border-engineering/40"
                          }`}
                        >
                          <Icon className="h-4 w-4" strokeWidth={PRODUCTS_ICON_STROKE} aria-hidden />
                        </span>
                        <span className="text-sm leading-snug font-semibold text-[#1a2b4a] dark:text-foreground">
                          {ind}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="mb-6 flex items-start gap-3">
                  <div className={PRODUCTS_ICON_BOX}>
                    <Target className="h-5 w-5" strokeWidth={PRODUCTS_ICON_STROKE} aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                      Select application focus
                    </h3>
                    <p className={`mt-1 ${PRODUCTS_BODY_SM}`}>
                      Industry: <span className="font-semibold text-engineering">{industry}</span>
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {applications.map((app) => {
                    const active = application === app;
                    return (
                      <button
                        key={app}
                        type="button"
                        onClick={() => {
                          setApplication(app);
                          setStep(3);
                        }}
                        className={`rounded-[20px] border p-5 text-left text-sm font-semibold transition-all duration-400 ${PRODUCTS_FOCUS_RING} ${
                          active
                            ? "border-engineering bg-engineering/[0.06] text-engineering shadow-[0_12px_28px_rgba(33,140,206,0.12)]"
                            : "border-[#e8edf2] bg-white text-[#1a2b4a] hover:-translate-y-0.5 hover:border-engineering dark:border-border dark:bg-card dark:text-foreground"
                        }`}
                      >
                        {app}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold text-engineering ${PRODUCTS_FOCUS_RING}`}
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Back
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="mb-6 flex items-start gap-3">
                  <div className={PRODUCTS_ICON_BOX}>
                    <ShieldCheck className="h-5 w-5" strokeWidth={PRODUCTS_ICON_STROKE} aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                      Select primary requirement
                    </h3>
                    <p className={`mt-1 ${PRODUCTS_BODY_SM}`}>
                      {industry} · {application}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {productFinderRequirements.map((req) => {
                    const Icon = requirementIcons[req];
                    const active = requirement === req;
                    return (
                      <button
                        key={req}
                        type="button"
                        onClick={() => {
                          setRequirement(req);
                          setStep(4);
                        }}
                        className={`group flex items-start gap-3 rounded-[20px] border p-5 text-left transition-all duration-400 ${PRODUCTS_FOCUS_RING} ${
                          active
                            ? "border-engineering bg-engineering/[0.06] shadow-[0_12px_28px_rgba(33,140,206,0.12)]"
                            : "border-[#e8edf2] bg-white hover:-translate-y-0.5 hover:border-engineering dark:border-border dark:bg-card"
                        }`}
                      >
                        <span
                          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${
                            active
                              ? "border-engineering/30 bg-engineering text-white"
                              : "border-engineering/20 bg-engineering/5 text-engineering"
                          }`}
                        >
                          <Icon className="h-4 w-4" strokeWidth={PRODUCTS_ICON_STROKE} aria-hidden />
                        </span>
                        <span className="pt-2 text-sm font-semibold text-[#1a2b4a] dark:text-foreground">
                          {req}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold text-engineering ${PRODUCTS_FOCUS_RING}`}
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Back
                </button>
              </div>
            )}

            {step === 4 && (
              <div>
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-bold tracking-[0.2em] text-engineering uppercase">
                      Recommended for you
                    </p>
                    <h3 className="text-xl font-bold text-[#1a2b4a] sm:text-2xl dark:text-foreground">
                      Matching products
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[industry, application, requirement].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-engineering/20 bg-engineering/5 px-3 py-1 text-[11px] font-bold text-engineering"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className={`inline-flex items-center gap-2 text-sm font-semibold text-[#5a6478] hover:text-engineering ${PRODUCTS_FOCUS_RING}`}
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden />
                    Start over
                  </button>
                </div>

                {results.length === 0 ? (
                  <div className="rounded-[24px] border border-[#e8edf2] bg-[#fafbfd] px-6 py-12 text-center dark:border-border dark:bg-surface">
                    <div className={`mx-auto mb-4 ${PRODUCTS_ICON_BOX}`}>
                      <Compass className="h-5 w-5" strokeWidth={PRODUCTS_ICON_STROKE} aria-hidden />
                    </div>
                    <p className="font-semibold text-[#1a2b4a] dark:text-foreground">No close matches found.</p>
                    <p className={`mx-auto mt-2 max-w-md ${PRODUCTS_BODY_SM}`}>
                      Talk to a product specialist for custom selection support.
                    </p>
                    <Link
                      href="/contact?intent=consultation"
                      className={`btn-primary mt-6 inline-flex items-center gap-2 ${PRODUCTS_FOCUS_RING}`}
                    >
                      Request Product Consultation
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {results.map((p) => (
                      <article
                        key={p.id}
                        className={`group flex h-full flex-col overflow-hidden ${PRODUCTS_CARD} ${PRODUCTS_CARD_HOVER}`}
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`}
                            sizes="33vw"
                            loading="lazy"
                          />
                          <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-[#0f1729]/55 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                            {p.category}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h4 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                            {p.title}
                          </h4>
                          <p className={`mb-5 line-clamp-2 flex-1 ${PRODUCTS_BODY_SM}`}>{p.description}</p>
                          <Link
                            href={`/products/${p.slug}`}
                            className={`btn-primary inline-flex w-full items-center justify-center gap-2 text-sm ${PRODUCTS_FOCUS_RING}`}
                          >
                            View Product
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold text-engineering ${PRODUCTS_FOCUS_RING}`}
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Change requirement
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
