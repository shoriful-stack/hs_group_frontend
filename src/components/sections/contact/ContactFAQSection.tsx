"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactFaq } from "@/data/contact";
import {
  CONTACT_BG_WHITE,
  CONTACT_CARD,
  CONTACT_FOCUS_RING,
  CONTACT_INNER,
  CONTACT_SECTION_PAD,
} from "./constants";

export default function ContactFAQSection() {
  const [openId, setOpenId] = useState(0);

  return (
    <section
      className={`relative overflow-hidden ${CONTACT_BG_WHITE} ${CONTACT_SECTION_PAD}`}
      aria-label="Frequently asked questions"
    >
      <div className={CONTACT_INNER}>
        <SectionHeading
          label={contactFaq.label}
          title={contactFaq.title}
          description={contactFaq.subtitle}
          align="center"
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {contactFaq.items.map((item, i) => {
            const isOpen = openId === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={item.question} className={`overflow-hidden ${CONTACT_CARD}`}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? -1 : i)}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors sm:px-6 ${CONTACT_FOCUS_RING}`}
                  >
                    <span className="text-sm font-bold text-[#1a2b4a] sm:text-base dark:text-foreground">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-engineering transition-transform duration-[400ms] ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={isOpen ? "block" : "hidden"}
                >
                  <p className="border-t border-[#e8edf2] px-5 pb-5 pt-4 text-sm leading-[1.9] text-[#5a6478] sm:px-6 dark:border-border dark:text-foreground-muted">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
