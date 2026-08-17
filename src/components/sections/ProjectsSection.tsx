"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/site";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProjectsSection() {
  const [mounted, setMounted] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [featured, ...carouselProjects] = projects;

  useEffect(() => setMounted(true), []);

  const initSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
    if (
      swiper.params.navigation &&
      typeof swiper.params.navigation !== "boolean"
    ) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, []);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-wide relative">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
          <SectionHeading
            label="Our Projects"
            title="Engineering Excellence in Action"
            description="Showcasing our portfolio of landmark projects across power, solar, telecom, and smart infrastructure."
          />
          <Link
            href="/projects"
            className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mb-8 lg:mb-10">
          <ProjectCard project={featured} featured />
        </div>

        <div className="relative">
          <div className="mb-6 flex items-center justify-end gap-3">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#1a2b4a] shadow-sm transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:border-engineering hover:text-engineering disabled:opacity-40 dark:border-border dark:bg-card dark:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#1a2b4a] shadow-sm transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:border-engineering hover:text-engineering disabled:opacity-40 dark:border-border dark:bg-card dark:text-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {mounted && (
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={20}
              slidesPerView={1}
              grabCursor
              speed={700}
              loop={false}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              pagination={{
                clickable: true,
                el: ".project-swiper-pagination",
                bulletClass: "project-dot",
                bulletActiveClass: "project-dot-active",
              }}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 2.5, spaceBetween: 24 },
                1280: { slidesPerView: 3, spaceBetween: 28 },
              }}
              onBeforeInit={initSwiper}
              onSwiper={initSwiper}
              className="project-swiper !overflow-visible"
            >
              {carouselProjects.map((project) => (
                <SwiperSlide key={project.id} className="!h-auto">
                  <ProjectCard project={project} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="project-swiper-pagination mt-8 flex justify-center gap-2" />
        </div>
      </div>
    </section>
  );
}
