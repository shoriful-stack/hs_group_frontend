"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export default function PageHero({
  title,
  subtitle,
  image = "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80",
}: PageHeroProps) {
  return (
    <section className="relative flex h-[50vh] min-h-[400px] items-center overflow-hidden">
      <Image src={image} alt={title} fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/60" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="container-wide relative z-10 px-4 pt-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {subtitle && (
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {subtitle}
            </span>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-engineering" />
        </motion.div>
      </div>
    </section>
  );
}
