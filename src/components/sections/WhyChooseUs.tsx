"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { whyChooseUsSection } from "@/data/site";
import type { FeatureCardView } from "@/types/home";

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function WhyChooseUs({ cards }: { cards?: FeatureCardView[] }) {
  const { label, title, subtitle } = whyChooseUsSection;
  const items = cards ?? [];
  const reduceMotion = useReducedMotion();

  if (items.length === 0) return null;

  return (
    <section className="bg-white py-20 transition-colors duration-300 sm:py-24 lg:py-28 dark:bg-background">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center lg:mb-16"
        >
          <span className="section-label mb-4 block">{label}</span>
          <h2 className="section-title mb-5 text-[#1a2b4a] dark:text-foreground">{title}</h2>
          <p className="text-[15px] leading-[1.85] text-[#5a6478] sm:text-base dark:text-foreground-muted">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((card, i) => (
            card.type === "text" ? (
              <motion.article
                key={card.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="group flex min-h-[300px] flex-col rounded-[20px] border border-[#e8edf2] bg-white p-8 shadow-[0_8px_32px_rgba(15,23,42,0.06)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-engineering hover:shadow-[0_20px_48px_rgba(33,140,206,0.12)] sm:min-h-[320px] lg:min-h-[340px] dark:border-border dark:bg-card dark:shadow-none dark:hover:shadow-lg"
              >
                <h3 className="mb-4 text-xl font-bold leading-snug text-[#1a2b4a] sm:text-[22px] dark:text-foreground">
                  {card.title}
                </h3>
                <p className="flex-1 text-[15px] leading-[1.8] text-[#5a6478] dark:text-foreground-muted">
                  {card.description}
                </p>
                <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent dark:via-border" />
              </motion.article>
            ) : (
              <motion.div
                key={card.alt}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="group relative min-h-[300px] overflow-hidden rounded-[20px] border border-transparent shadow-[0_8px_32px_rgba(15,23,42,0.08)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-engineering hover:shadow-[0_20px_48px_rgba(33,140,206,0.14)] sm:min-h-[320px] lg:min-h-[340px]"
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/35 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="light-sweep" aria-hidden />
              </motion.div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
