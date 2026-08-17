"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  year: string;
  client?: string;
  status?: string;
  summary?: string;
}

interface ProjectCardProps {
  project: ProjectItem;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  if (featured) {
    return (
      <article className="project-card group relative overflow-hidden rounded-[28px] border border-[#e2e8f0] bg-white shadow-[0_12px_48px_rgba(15,23,42,0.08)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-engineering hover:shadow-[0_28px_64px_rgba(33,140,206,0.14)] dark:border-border dark:bg-card">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[380px]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.08]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-[#0a1628]/20 to-transparent transition-all duration-500 group-hover:from-[#0a1628]/80" />
            <div className="light-sweep" aria-hidden />
            <span className="absolute top-5 left-5 rounded-full bg-engineering/95 px-3 py-1 text-xs font-semibold text-white">
              {project.category}
            </span>
            <span className="absolute top-5 right-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {project.year}
            </span>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-engineering uppercase">
              Featured Project
            </p>
            <h3 className="mb-3 text-2xl font-bold leading-[1.15] text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              {project.title}
            </h3>
            <div className="mb-4 flex items-center gap-1.5 text-sm text-[#5a6478] dark:text-foreground-muted">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-engineering" />
              {project.location}
            </div>
            {project.summary && (
              <p className="mb-6 text-sm leading-[1.8] text-[#5a6478] dark:text-foreground-muted">
                {project.summary}
              </p>
            )}
            <div className="mb-6 flex flex-wrap gap-2">
              {project.client && (
                <span className="rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1 text-[11px] font-medium text-[#5a6478] dark:border-border dark:bg-surface dark:text-foreground-muted">
                  {project.client}
                </span>
              )}
              {project.status && (
                <span className="rounded-full border border-engineering/20 bg-engineering/5 px-3 py-1 text-[11px] font-semibold text-engineering">
                  {project.status}
                </span>
              )}
            </div>
            <Link
              href={`/projects#${project.id}`}
              className="group/link inline-flex items-center gap-2 text-sm font-semibold text-engineering"
            >
              View Project
              <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover/link:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="project-card group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#e2e8f0] bg-white shadow-[0_8px_32px_rgba(15,23,42,0.06)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-engineering hover:shadow-[0_24px_56px_rgba(33,140,206,0.12)] dark:border-border dark:bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.08]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-[#0a1628]/25 to-transparent transition-all duration-500 ease-out group-hover:from-[#0a1628]/90 group-hover:via-[#0a1628]/45" />
        <div className="light-sweep" aria-hidden />

        <span className="absolute top-4 left-4 rounded-full bg-engineering/95 px-3 py-1 text-xs font-semibold text-white">
          {project.category}
        </span>
        <span className="absolute top-4 right-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {project.year}
        </span>

        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          {project.summary && (
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-white/90">
              {project.summary}
            </p>
          )}
          <Link
            href={`/projects#${project.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white"
          >
            View Project
            <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg font-semibold text-[#1a2b4a] transition-colors duration-500 group-hover:text-engineering dark:text-foreground">
          {project.title}
        </h3>
        <div className="mb-3 flex items-center gap-1.5 text-sm text-[#5a6478] dark:text-foreground-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-engineering" />
          {project.location}
        </div>
        {(project.client || project.status) && (
          <div className="mt-auto flex flex-wrap gap-2">
            {project.client && (
              <span className="rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1 text-[11px] font-medium text-[#5a6478] dark:border-border dark:bg-surface dark:text-foreground-muted">
                {project.client}
              </span>
            )}
            {project.status && (
              <span className="rounded-full border border-engineering/20 bg-engineering/5 px-2.5 py-1 text-[11px] font-semibold text-engineering">
                {project.status}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
