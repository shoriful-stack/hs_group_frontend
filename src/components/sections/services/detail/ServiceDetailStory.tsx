"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Award,
  Briefcase,
  Building2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Clock,
  Compass,
  Expand,
  Factory,
  Gauge,
  Headset,
  Layers,
  Leaf,
  Lightbulb,
  Map,
  MessagesSquare,
  Package,
  Power,
  Rocket,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ServiceDetailData } from "@/types/home";
import {
  SERVICES_BG_SURFACE,
  SERVICES_BG_WHITE,
  SERVICES_BLOCK_SPACING,
  SERVICES_BODY,
  SERVICES_BODY_SM,
  SERVICES_CARD,
  SERVICES_CARD_GAP,
  SERVICES_CARD_HOVER,
  SERVICES_GRID_GAP,
  SERVICES_ICON_BOX,
  SERVICES_ICON_STROKE,
  SERVICES_INNER,
  SERVICES_SECTION_PAD,
} from "../constants";

const benefitIcons: Record<string, LucideIcon> = {
  Gauge,
  CircleDollarSign,
  ShieldCheck,
  Expand,
  Leaf,
  Rocket,
};

const factIcons: Record<string, LucideIcon> = {
  Experience: Award,
  Projects: Briefcase,
  Industries: Factory,
  Response: Clock,
  Support: Headset,
};

const challengeIcons: LucideIcon[] = [
  AlertTriangle,
  Clock,
  Gauge,
  Layers,
  CircleDollarSign,
  ShieldAlert,
];

const solutionIcons: LucideIcon[] = [
  Map,
  Compass,
  Wrench,
  Lightbulb,
  ShieldCheck,
  Headset,
];

const processIcons: LucideIcon[] = [
  MessagesSquare,
  Building2,
  Compass,
  ClipboardCheck,
  Package,
  Wrench,
  Settings,
  Power,
  Award,
  Headset,
];

export function ServiceDetailOverview({ service }: { service: ServiceDetailData }) {
  const facts = Array.isArray(service.quickFacts) ? service.quickFacts : [];
  if (!service.overview && !service.businessValue && facts.length === 0) return null;

  return (
    <section className={`${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`} aria-labelledby="executive-overview">
      <div className={SERVICES_INNER}>
        <div className={`grid lg:grid-cols-[1.15fr_0.85fr] ${SERVICES_GRID_GAP}`}>
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              Executive Overview
            </p>
            <h2
              id="executive-overview"
              className="mb-5 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground"
            >
              Engineering Solution Overview
            </h2>
            {service.overview ? (
              <p className="mb-5 text-lg font-medium leading-[1.75] text-[#1a2b4a] dark:text-foreground">
                {service.overview}
              </p>
            ) : null}
            {service.businessValue ? <p className={SERVICES_BODY}>{service.businessValue}</p> : null}
          </div>

          {facts.length > 0 ? (
          <aside
            className={`${SERVICES_CARD} h-fit overflow-hidden`}
            aria-label="Quick facts"
          >
            <div className="border-b border-[#e8edf2] bg-[#fafbfd] px-5 py-5 sm:px-6 dark:border-border dark:bg-surface">
              <p className="text-[11px] font-bold tracking-[0.2em] text-engineering uppercase">
                At a Glance
              </p>
              <h3 className="mt-1 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                Quick Facts
              </h3>
            </div>
            <dl className="grid sm:grid-cols-2 sm:divide-x sm:divide-[#e8edf2] dark:sm:divide-border">
              {facts.map((f, i) => {
                const Icon = factIcons[f.label] ?? Building2;
                const total = facts.length;
                const lastRowCount = total % 2 === 0 ? 2 : 1;
                const inLastRow = i >= total - lastRowCount;

                return (
                  <div
                    key={f.label}
                    className={`group flex gap-3 border-b border-[#e8edf2] px-5 py-4 transition-colors duration-300 hover:bg-engineering/[0.03] dark:border-border ${
                      i === total - 1 ? "border-b-0" : ""
                    } ${inLastRow ? "sm:border-b-0" : ""}`}
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-engineering/20 bg-engineering/5 text-engineering transition-all duration-400 group-hover:scale-105">
                      <Icon className="h-4 w-4" strokeWidth={SERVICES_ICON_STROKE} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[10px] font-bold tracking-[0.16em] text-[#94a3b8] uppercase">
                        {f.label}
                      </dt>
                      <dd className="mt-1 text-sm leading-snug font-semibold text-[#1a2b4a] dark:text-foreground">
                        {f.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function ServiceDetailBenefits({ service }: { service: ServiceDetailData }) {
  const items = Array.isArray(service.keyBenefits) ? service.keyBenefits : [];
  if (items.length === 0) return null;

  return (
    <section className={`${SERVICES_BG_SURFACE} ${SERVICES_SECTION_PAD}`} aria-labelledby="key-benefits">
      <div className={SERVICES_INNER}>
        <div className={`${SERVICES_BLOCK_SPACING} flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Value</p>
            <h2 id="key-benefits" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              Key Benefits
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
            Measurable outcomes clients expect from disciplined engineering delivery.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${SERVICES_CARD_GAP}`}>
          {items.map((b, i) => {
            const Icon = benefitIcons[b.icon] ?? Gauge;
            return (
              <article
                key={b.title}
                className={`group ${SERVICES_CARD} ${SERVICES_CARD_HOVER} flex h-full flex-col overflow-hidden`}
              >
                <div className="h-1 w-full bg-engineering" aria-hidden />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className={SERVICES_ICON_BOX}>
                      <Icon strokeWidth={SERVICES_ICON_STROKE} className="h-5 w-5" aria-hidden />
                    </div>
                    <span className="text-[11px] font-bold tracking-[0.18em] text-engineering/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                    {b.title}
                  </h3>
                  <p className={SERVICES_BODY_SM}>{b.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ServiceDetailCapabilities({ service }: { service: ServiceDetailData }) {
  const items = Array.isArray(service.capabilities) ? service.capabilities : [];
  if (items.length === 0) return null;

  return (
    <section className={`${SERVICES_BG_WHITE} py-16 sm:py-20 lg:py-24`} aria-labelledby="service-capabilities">
      <div className={SERVICES_INNER}>
        <div className="mb-6 flex flex-col gap-1 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              Capabilities
            </p>
            <h2
              id="service-capabilities"
              className="text-2xl font-bold text-[#1a2b4a] sm:text-[28px] dark:text-foreground"
            >
              Technical Capabilities
            </h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <article
              key={`${item.title}-${i}`}
              className={`group ${SERVICES_CARD} ${SERVICES_CARD_HOVER} flex items-start gap-3 p-4 sm:p-5`}
            >
              <div className={`${SERVICES_ICON_BOX} !h-10 !w-10 shrink-0`}>
                <Layers strokeWidth={SERVICES_ICON_STROKE} className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="text-[15px] font-bold leading-snug text-[#1a2b4a] dark:text-foreground">
                    {item.title}
                  </h3>
                  <span className="shrink-0 text-[10px] font-bold tracking-[0.16em] text-engineering/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {item.description ? (
                  <p className="text-sm font-semibold text-engineering">{item.description}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceDetailChallengeSolution({
  service,
  embedded = false,
}: {
  service: ServiceDetailData;
  embedded?: boolean;
}) {
  const challenges = Array.isArray(service.challenges) ? service.challenges : [];
  const solutions = Array.isArray(service.solution) ? service.solution : [];
  if (challenges.length === 0 && solutions.length === 0) return null;

  const challengesBlock = challenges.length === 0 ? null : (
    <section
      id="challenges"
      className={embedded ? `${SERVICES_BLOCK_SPACING} scroll-mt-28` : `scroll-mt-28 ${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`}
    >
      <div className={embedded ? "" : SERVICES_INNER}>
        <div className={`${SERVICES_BLOCK_SPACING} flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              Business Challenges
            </p>
            <h2 className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              Problems We Solve
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
            Typical pressures that drive demand for structured engineering support.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 ${SERVICES_CARD_GAP}`}>
          {challenges.map((c, i) => {
            const Icon = challengeIcons[i % challengeIcons.length];
            return (
              <article
                key={c.title}
                className={`group ${SERVICES_CARD} ${SERVICES_CARD_HOVER} flex gap-4 p-5 sm:p-6`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-engineering/20 bg-engineering/5 text-engineering transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(33,140,206,0.25)]">
                  <Icon className="h-5 w-5" strokeWidth={SERVICES_ICON_STROKE} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="mb-1.5 block text-[11px] font-bold tracking-[0.16em] text-engineering uppercase">
                    Challenge {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-1.5 font-bold text-[#1a2b4a] dark:text-foreground">{c.title}</h3>
                  <p className={SERVICES_BODY_SM}>{c.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );

  const solutionBlock = solutions.length === 0 ? null : (
    <section
      id="solution"
      className={embedded ? "scroll-mt-28" : `scroll-mt-28 ${SERVICES_BG_SURFACE} ${SERVICES_SECTION_PAD}`}
    >
      <div className={embedded ? "" : SERVICES_INNER}>
        <div className={`${SERVICES_BLOCK_SPACING} flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              HS Group Solution
            </p>
            <h2 className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              How We Deliver
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
            From approach through long-term support — a clear delivery framework.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${SERVICES_CARD_GAP}`}>
          {solutions.map((block, i) => {
            const Icon = solutionIcons[i % solutionIcons.length];
            return (
              <article
                key={block.title}
                className={`group ${SERVICES_CARD} ${SERVICES_CARD_HOVER} flex h-full flex-col overflow-hidden`}
              >
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className={SERVICES_ICON_BOX}>
                      <Icon className="h-5 w-5" strokeWidth={SERVICES_ICON_STROKE} aria-hidden />
                    </div>
                    <span className="text-[11px] font-bold tracking-[0.18em] text-engineering/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                    {block.title}
                  </h3>
                  <p className="text-sm leading-[1.8] text-[#5a6478] dark:text-foreground-muted">
                    {block.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );

  return (
    <>
      {challengesBlock}
      {solutionBlock}
    </>
  );
}

export function ServiceDetailProcess({ service }: { service: ServiceDetailData }) {
  const steps = Array.isArray(service.process) ? service.process : [];
  if (steps.length === 0) return null;

  return (
    <section className={`${SERVICES_BG_SURFACE} ${SERVICES_SECTION_PAD}`} aria-labelledby="engineering-process">
      <div className={SERVICES_INNER}>
        <div className={`${SERVICES_BLOCK_SPACING} flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Process</p>
            <h2
              id="engineering-process"
              className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground"
            >
              Engineering Process
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
            A stage-gated path from consultation through lifecycle support.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute top-10 right-0 left-0 hidden h-px bg-engineering/20 xl:block"
            aria-hidden
          />
          <ol className={`grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ${SERVICES_CARD_GAP}`}>
            {steps.map((step, i) => {
              const Icon = processIcons[i % processIcons.length];
              return (
                <li
                  key={step.step}
                  className={`group relative ${SERVICES_CARD} ${SERVICES_CARD_HOVER} flex h-full flex-col p-5 sm:p-6`}
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="relative z-[1] inline-flex h-10 w-10 items-center justify-center rounded-full bg-engineering text-sm font-bold text-white shadow-[0_8px_20px_rgba(33,140,206,0.28)]">
                      {step.step}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-engineering/20 bg-engineering/5 text-engineering transition-all duration-500 group-hover:scale-105">
                      <Icon className="h-4 w-4" strokeWidth={SERVICES_ICON_STROKE} aria-hidden />
                    </span>
                  </div>
                  <h3 className="mb-2 font-bold text-[#1a2b4a] dark:text-foreground">{step.title}</h3>
                  <p className={SERVICES_BODY_SM}>{step.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function ServiceDetailScope({ service }: { service: ServiceDetailData }) {
  const items = Array.isArray(service.scope) ? service.scope : [];
  if (items.length === 0) return null;

  return (
    <section className={`${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`} aria-labelledby="service-scope">
      <div className={SERVICES_INNER}>
        <div className={`${SERVICES_BLOCK_SPACING} flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Scope</p>
            <h2 id="service-scope" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              Service Scope
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
            Work packages delivered from survey through handover.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${SERVICES_CARD_GAP}`}>
          {items.map((item, i) => (
            <article
              key={`${item.title}-${i}`}
              className={`group ${SERVICES_CARD} ${SERVICES_CARD_HOVER} flex h-full flex-col overflow-hidden`}
            >
              <div className="h-1 w-full bg-engineering" aria-hidden />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className={SERVICES_ICON_BOX}>
                    <ClipboardCheck strokeWidth={SERVICES_ICON_STROKE} className="h-5 w-5" aria-hidden />
                  </div>
                  <span className="text-[11px] font-bold tracking-[0.18em] text-engineering/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                  {item.title}
                </h3>
                {item.description ? <p className={SERVICES_BODY_SM}>{item.description}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceDetailEquipment({ service }: { service: ServiceDetailData }) {
  const groups = Array.isArray(service.equipmentGroups) ? service.equipmentGroups : [];
  if (groups.length === 0) return null;

  return (
    <section className={`${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`} aria-labelledby="service-equipment">
      <div className={SERVICES_INNER}>
        <div className={`${SERVICES_BLOCK_SPACING} flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Equipment</p>
            <h2 id="service-equipment" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              Equipment & Infrastructure
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
            Typical systems and assets deployed under this service.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${SERVICES_CARD_GAP}`}>
          {groups.map((group) => (
            <article
              key={group.category}
              className={`group ${SERVICES_CARD} ${SERVICES_CARD_HOVER} flex h-full flex-col p-6 sm:p-7`}
            >
              <h3 className="mb-4 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item.name}
                    className="rounded-full border border-engineering/25 bg-engineering/10 px-3 py-1.5 text-xs font-semibold text-engineering"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceDetailFaqs({ service }: { service: ServiceDetailData }) {
  const items = Array.isArray(service.faqs) ? service.faqs : [];
  const [open, setOpen] = useState(0);
  if (items.length === 0) return null;

  return (
    <section className={`${SERVICES_BG_SURFACE} ${SERVICES_SECTION_PAD}`} aria-labelledby="service-faq">
      <div className={`${SERVICES_INNER} max-w-3xl`}>
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">FAQ</p>
        <h2 id="service-faq" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {items.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={`${faq.question}-${i}`} className={SERVICES_CARD}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 rounded-[28px] px-5 py-4 text-left"
                >
                  <span className="font-semibold text-[#1a2b4a] dark:text-foreground">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-engineering transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <div className="border-t border-[#e8edf2] px-5 py-4 dark:border-border">
                    <p className={SERVICES_BODY_SM}>{faq.answer}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
