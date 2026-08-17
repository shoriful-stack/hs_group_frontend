"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactQuick } from "@/data/contact";
import { useAboutReveal } from "@/components/sections/about/useAboutReveal";
import {
  CONTACT_BG_WHITE,
  CONTACT_CARD,
  CONTACT_CARD_HOVER,
  CONTACT_FOCUS_RING,
  CONTACT_GRID_GAP,
  CONTACT_ICON_BOX,
  CONTACT_INNER,
  CONTACT_SECTION_PAD,
} from "./constants";

const iconMap = { Phone, Mail, MapPin, Clock };

export default function ContactQuickSection() {
  const gridRef = useAboutReveal<HTMLDivElement>({
    childSelector: "[data-quick-card]",
    stagger: 0.08,
  });

  return (
    <section
      className={`relative overflow-hidden ${CONTACT_BG_WHITE} ${CONTACT_SECTION_PAD}`}
      aria-label="Quick contact options"
    >
      <div className={CONTACT_INNER}>
        <SectionHeading
          label={contactQuick.label}
          title={contactQuick.title}
          description={contactQuick.subtitle}
          align="center"
        />
        <div
          ref={gridRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${CONTACT_GRID_GAP}`}
        >
          {contactQuick.cards.map((card) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap] ?? Phone;
            const inner = (
              <>
                <div className="light-sweep pointer-events-none" aria-hidden />
                <div className={`mb-5 ${CONTACT_ICON_BOX}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                  {card.title}
                </h3>
                <p className="text-sm leading-[1.85] text-[#5a6478] dark:text-foreground-muted">
                  {card.info}
                </p>
                <span className="mt-4 inline-block text-xs font-semibold tracking-wide text-engineering">
                  {card.action} →
                </span>
              </>
            );

            const className = `group relative flex h-full flex-col overflow-hidden p-6 sm:p-7 ${CONTACT_CARD} ${CONTACT_CARD_HOVER} ${CONTACT_FOCUS_RING}`;

            if (card.href) {
              return (
                <a
                  key={card.id}
                  data-quick-card
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={className}
                  aria-label={`${card.title}: ${card.info}`}
                >
                  {inner}
                </a>
              );
            }

            return (
              <div key={card.id} data-quick-card className={className}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
