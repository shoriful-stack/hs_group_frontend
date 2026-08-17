"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 lg:mb-16 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`}
    >
      {label && <span className="section-label mb-4 inline-block">{label}</span>}
      <h2 className="section-title">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-[1.85] text-foreground-muted sm:text-lg">
          {description}
        </p>
      )}
      <div
        className={`mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-engineering ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
