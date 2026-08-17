"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactOffice } from "@/data/contact";
import { useAboutReveal } from "@/components/sections/about/useAboutReveal";
import {
  CINEMATIC_IMAGE,
  CONTACT_BG_SURFACE,
  CONTACT_CARD,
  CONTACT_FOCUS_RING,
  CONTACT_IMAGE_FRAME,
  CONTACT_INNER,
  CONTACT_SECTION_PAD,
} from "./constants";

export default function ContactOfficeSection() {
  const [active, setActive] = useState(0);
  const contentRef = useAboutReveal<HTMLDivElement>({
    childSelector: "[data-office-reveal]",
    stagger: 0.08,
  });
  const loc = contactOffice.locations[active];

  return (
    <section
      className={`relative overflow-hidden ${CONTACT_BG_SURFACE} ${CONTACT_SECTION_PAD}`}
      aria-label="Corporate office information"
    >
      <div className={CONTACT_INNER}>
        <SectionHeading
          label={contactOffice.label}
          title={contactOffice.title}
          description={contactOffice.subtitle}
          align="center"
        />

        <div className="grid items-stretch gap-8 lg:grid-cols-[45fr_55fr] lg:gap-10">
          <div ref={contentRef} className="flex flex-col">
            <div
              data-office-reveal
              className="mb-6 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Office locations"
            >
              {contactOffice.locations.map((item, i) => (
                <button
                  key={item.type}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={`rounded-full px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-[400ms] ${CONTACT_FOCUS_RING} ${
                    active === i
                      ? "bg-engineering text-white shadow-[0_4px_16px_rgba(33,140,206,0.35)]"
                      : "border border-[#e8edf2] bg-white text-[#5a6478] hover:border-engineering/40 hover:text-engineering dark:border-border dark:bg-card"
                  }`}
                >
                  {item.type}
                </button>
              ))}
            </div>

            <div
              data-office-reveal
              className={`flex flex-1 flex-col p-6 sm:p-8 ${CONTACT_CARD}`}
              role="tabpanel"
            >
              <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-engineering uppercase">
                {loc.type}
              </p>
              <h3 className="mb-6 text-xl font-bold text-[#1a2b4a] sm:text-2xl dark:text-foreground">
                {loc.name}
              </h3>
              <ul className="space-y-4 text-sm text-[#5a6478] dark:text-foreground-muted">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-engineering" aria-hidden />
                  {loc.address}
                </li>
                <li>
                  <a
                    href={`tel:${loc.phone.replace(/\s/g, "")}`}
                    className={`inline-flex items-center gap-3 transition-colors hover:text-engineering ${CONTACT_FOCUS_RING}`}
                  >
                    <Phone className="h-4 w-4 shrink-0 text-engineering" aria-hidden />
                    {loc.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${loc.email}`}
                    className={`inline-flex items-center gap-3 transition-colors hover:text-engineering ${CONTACT_FOCUS_RING}`}
                  >
                    <Mail className="h-4 w-4 shrink-0 text-engineering" aria-hidden />
                    {loc.email}
                  </a>
                </li>
              </ul>
              <a
                href={loc.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-secondary group mt-8 inline-flex w-full items-center justify-center sm:w-auto ${CONTACT_FOCUS_RING}`}
              >
                Open in Google Maps
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] ${CONTACT_IMAGE_FRAME}`}>
            <Image
              src={contactOffice.image}
              alt="HS Group corporate office and engineering facilities"
              fill
              className={CINEMATIC_IMAGE}
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/35 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
