"use client";

import { useEffect, useRef, useState } from "react";
import {
  ClipboardCheck, HardHat, Monitor, Package, PenTool, Settings, Workflow,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { capabilities, capabilitiesSection } from "@/data/about";
import { ABOUT_BG_WHITE, ABOUT_INNER, ABOUT_SECTION_PAD } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const iconMap = { PenTool, Package, Workflow, Crane: HardHat, ClipboardCheck, Settings, Monitor };

function CapabilitiesBlueprint() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-[#1a2b4a]/[0.02] dark:text-foreground/[0.025]"
      viewBox="0 0 1440 900"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M0 200H1440M0 400H1440M0 600H1440" stroke="currentColor" strokeWidth="0.75" />
      <path d="M360 0V900M720 0V900M1080 0V900" stroke="currentColor" strokeWidth="0.75" />
      <path
        data-cap-line-bg
        d="M120 450 Q360 380 720 450 T1320 450"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
    </svg>
  );
}

type Capability = (typeof capabilities)[number];

function CapabilityNode({
  cap,
  index,
  layout,
  isActive,
  onHover,
  onLeave,
}: {
  cap: Capability;
  index: number;
  layout: "horizontal" | "grid" | "vertical";
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const Icon = iconMap[cap.icon as keyof typeof iconMap] ?? Settings;

  return (
    <div
      data-capability
      data-cap-index={index}
      className={`group relative ${layout === "vertical" ? "flex gap-5 pl-10" : ""}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
    >
      {layout === "vertical" && index < capabilities.length - 1 && (
        <div className="absolute top-10 bottom-[-24px] left-[15px] w-px bg-gradient-to-b from-engineering/50 to-[#e2e8f0] dark:to-border" />
      )}

      {layout === "vertical" && (
        <div
          className={`absolute top-2 left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-500 ${
            isActive ? "border-engineering bg-engineering shadow-[0_0_16px_rgba(33,140,206,0.4)]" : "border-engineering/30 bg-white dark:bg-card"
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${isActive ? "bg-white" : "bg-engineering"}`} />
        </div>
      )}

      <div
        tabIndex={0}
        role="button"
        aria-label={`${cap.title}: ${cap.description}`}
        className={`relative flex flex-col rounded-[28px] border border-[#e8edf2] bg-white p-5 shadow-[0_8px_32px_rgba(15,23,42,0.06)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-engineering hover:shadow-[0_20px_48px_rgba(33,140,206,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering/40 dark:border-border dark:bg-card ${
          isActive ? "border-engineering shadow-[0_0_24px_rgba(33,140,206,0.14)]" : ""
        } ${layout === "horizontal" ? "min-w-[148px] flex-1 lg:min-w-0" : "w-full"}`}
      >
        <span className="mb-3 text-[10px] font-bold tracking-[0.2em] text-engineering">{cap.step}</span>
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-engineering/20 bg-engineering/5 text-engineering transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(33,140,206,0.25)] ${
            isActive ? "scale-105 shadow-[0_0_20px_rgba(33,140,206,0.25)]" : ""
          }`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <h3 className="mb-2 text-sm font-bold leading-snug text-[#1a2b4a] dark:text-foreground">{cap.title}</h3>
        <p
          className={`text-xs leading-[1.85] text-[#5a6478] transition-all duration-500 dark:text-foreground-muted ${
            layout === "horizontal" ? "max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100" : "opacity-80"
          }`}
        >
          {cap.description}
        </p>

        {cap.tooltip && (
          <div
            className={`pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-48 -translate-x-1/2 rounded-[16px] border border-[#e8edf2] bg-white p-3 opacity-0 shadow-[0_12px_32px_rgba(15,23,42,0.12)] transition-all duration-500 group-hover:opacity-100 dark:border-border dark:bg-card ${
              layout === "horizontal" ? "hidden lg:block" : ""
            }`}
          >
            <p className="mb-2 text-[10px] font-bold tracking-[0.12em] text-engineering uppercase">{cap.title}</p>
            <ul className="space-y-1">
              {cap.tooltip.map((item) => (
                <li key={item} className="text-[11px] text-[#5a6478] dark:text-foreground-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AboutCapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const flow = flowRef.current;
    const line = lineRef.current;
    if (!section || !flow) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const nodes = flow.querySelectorAll("[data-capability]");
      gsap.from(nodes, {
        opacity: 0,
        y: 32,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: flow, start: "top 85%", toggleActions: "play none none none" },
      });

      if (line) {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: flow, start: "top 82%", toggleActions: "play none none none" },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${ABOUT_BG_WHITE} ${ABOUT_SECTION_PAD}`}>
      <CapabilitiesBlueprint />
      <div className={ABOUT_INNER}>
        <SectionHeading
          label={capabilitiesSection.label}
          title={capabilitiesSection.title}
          description={capabilitiesSection.subtitle}
          align="center"
        />

        <div ref={flowRef} className="relative">
          {/* Desktop — horizontal workflow */}
          <div className="relative hidden lg:block">
            <svg className="pointer-events-none absolute top-[52px] right-0 left-0 h-8 w-full" aria-hidden>
              <path
                ref={lineRef}
                d="M 4% 16 Q 50% 0 96% 16"
                fill="none"
                stroke="rgba(33,140,206,0.45)"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="flex items-start gap-3 pt-4">
              {capabilities.map((cap, i) => (
                <CapabilityNode
                  key={cap.title}
                  cap={cap}
                  index={i}
                  layout="horizontal"
                  isActive={activeIndex === i}
                  onHover={() => setActiveIndex(i)}
                  onLeave={() => setActiveIndex(null)}
                />
              ))}
            </div>
          </div>

          {/* Tablet — 2 columns */}
          <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:hidden">
            {capabilities.map((cap, i) => (
              <CapabilityNode
                key={cap.title}
                cap={cap}
                index={i}
                layout="grid"
                isActive={activeIndex === i}
                onHover={() => setActiveIndex(i)}
                onLeave={() => setActiveIndex(null)}
              />
            ))}
          </div>

          {/* Mobile — vertical timeline */}
          <div className="space-y-6 sm:hidden">
            {capabilities.map((cap, i) => (
              <CapabilityNode
                key={cap.title}
                cap={cap}
                index={i}
                layout="vertical"
                isActive={activeIndex === i}
                onHover={() => setActiveIndex(i)}
                onLeave={() => setActiveIndex(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
