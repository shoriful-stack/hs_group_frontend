"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blogPosts, blogSection } from "@/data/site";

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function BlogSection() {
  const { label, title, subtitle } = blogSection;
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28 dark:bg-background">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center lg:mb-16"
        >
          <span className="section-label mb-4 block">{label}</span>
          <h2 className="section-title mb-5 text-[#1a2b4a] dark:text-foreground">{title}</h2>
          <p className="text-[15px] leading-[1.85] text-[#5a6478] sm:text-base dark:text-foreground-muted">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <Link
                href={post.href}
                className="flex h-full flex-col overflow-hidden rounded-[28px] border border-[#e8edf2] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-engineering hover:shadow-[0_20px_48px_rgba(33,140,206,0.12)] dark:border-border dark:bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-70" />
                  <div className="light-sweep" aria-hidden />
                  {"category" in post && post.category && (
                    <span className="absolute top-4 left-4 rounded-full bg-engineering/95 px-3 py-1 text-[11px] font-semibold text-white">
                      {post.category}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#5a6478] dark:text-foreground-muted">
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <h3 className="mb-4 text-base font-bold leading-snug text-[#1a2b4a] transition-colors duration-[400ms] group-hover:text-engineering sm:text-lg dark:text-foreground">
                    {post.title}
                  </h3>
                  {"excerpt" in post && post.excerpt && (
                    <p className="mb-5 line-clamp-2 flex-1 text-sm leading-relaxed text-[#5a6478] dark:text-foreground-muted">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-engineering opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center lg:mt-14"
        >
          <Link href="/blog" className="btn-primary group">
            Explore More Insights
            <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
