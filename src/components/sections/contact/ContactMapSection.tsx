"use client";

import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactMap } from "@/data/contact";
import {
  CONTACT_BG_SURFACE,
  CONTACT_BTN_MOBILE,
  CONTACT_CARD,
  CONTACT_FOCUS_RING,
  CONTACT_INNER,
  CONTACT_SECTION_PAD,
} from "./constants";

export default function ContactMapSection() {
  return (
    <section
      className={`relative overflow-hidden ${CONTACT_BG_SURFACE} ${CONTACT_SECTION_PAD}`}
      aria-label="Office location map"
    >
      <div className={CONTACT_INNER}>
        <SectionHeading
          label={contactMap.label}
          title={contactMap.title}
          description={contactMap.subtitle}
          align="center"
        />

        <div className={`overflow-hidden ${CONTACT_CARD}`}>
          <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
            <iframe
              title="HS Group corporate office location map"
              src={contactMap.embedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-[#e8edf2] px-6 py-5 sm:flex-row dark:border-border">
            <p className="text-sm text-[#5a6478] dark:text-foreground-muted">
              Dhaka, Bangladesh — Corporate Headquarters
            </p>
            <a
              href={contactMap.openUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-secondary group inline-flex items-center justify-center ${CONTACT_BTN_MOBILE} ${CONTACT_FOCUS_RING}`}
            >
              {contactMap.openLabel}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
