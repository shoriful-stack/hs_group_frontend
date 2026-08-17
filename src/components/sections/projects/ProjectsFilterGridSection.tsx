"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { gsap } from "gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  getProjectClients,
  getProjectStatuses,
  portfolioProjects,
  projectFilterCategories,
  projectSearchHints,
  type PortfolioProject,
  type ProjectFilterCategory,
} from "@/data/projects-page";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  CINEMATIC_IMAGE,
  PROJECTS_BG_WHITE,
  PROJECTS_BODY_SM,
  PROJECTS_CARD,
  PROJECTS_CARD_HOVER,
  PROJECTS_FOCUS_RING,
  PROJECTS_INNER,
  PROJECTS_SECTION_PAD,
} from "./constants";

type SortKey = "newest" | "oldest" | "industry" | "year";

type DropdownOption = { value: string; label: string };

function FilterDropdown({
  label,
  value,
  options,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value);
  const isActive = value !== "All" && value !== "newest";

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative min-w-0">
      <span className="mb-1.5 block text-[11px] font-bold tracking-[0.16em] text-[#94a3b8] uppercase">
        {label}
      </span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={`group flex w-full items-center justify-between gap-3 rounded-[16px] border bg-white px-4 py-3 text-left text-sm font-medium shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-[400ms] dark:bg-card ${
          open
            ? "border-engineering ring-2 ring-engineering/20"
            : isActive
              ? "border-engineering/40 text-[#1a2b4a] dark:text-foreground"
              : "border-[#e8edf2] text-[#1a2b4a] hover:border-engineering/50 dark:border-border dark:text-foreground"
        } ${PROJECTS_FOCUS_RING}`}
      >
        <span className="truncate">
          {selected?.label ?? placeholder ?? "Select"}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-engineering transition-transform duration-[400ms] ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="absolute z-40 mt-2 max-h-64 w-full min-w-[200px] overflow-auto rounded-[20px] border border-[#e8edf2] bg-white p-1.5 shadow-[0_20px_50px_rgba(15,23,42,0.14)] dark:border-border dark:bg-card"
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-[14px] px-3.5 py-2.5 text-left text-sm transition-colors duration-200 ${
                    active
                      ? "bg-engineering/10 font-semibold text-engineering"
                      : "font-medium text-[#1a2b4a] hover:bg-[#fafbfd] dark:text-foreground dark:hover:bg-surface"
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {active && <Check className="h-4 w-4 shrink-0 text-engineering" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function EnterpriseProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article
      id={`project-${project.slug}`}
      className={`group relative flex h-full scroll-mt-28 flex-col overflow-hidden ${PROJECTS_CARD} ${PROJECTS_CARD_HOVER}`}
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={`${CINEMATIC_IMAGE} transition-transform duration-700 group-hover:scale-[1.06]`}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729]/75 via-[#0f1729]/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
        <span className="absolute top-4 right-4 rounded-full border border-engineering/40 bg-engineering/20 px-3 py-1 text-[11px] font-semibold text-white">
          {project.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-2 inline-flex items-center gap-1.5 text-xs text-[#94a3b8]">
          <MapPin className="h-3.5 w-3.5 text-engineering" aria-hidden />
          {project.location}
        </p>
        <h3 className="mb-2 text-lg font-bold leading-snug text-[#1a2b4a] dark:text-foreground">
          {project.title}
        </h3>
        <p className={`mb-4 line-clamp-2 ${PROJECTS_BODY_SM}`}>{project.description}</p>

        <dl className="mb-4 grid grid-cols-2 gap-3 text-xs">
          <div>
            <dt className="mb-0.5 font-bold tracking-wide text-engineering uppercase">Client</dt>
            <dd className="font-semibold text-[#1a2b4a] dark:text-foreground">{project.client}</dd>
          </div>
          <div>
            <dt className="mb-0.5 font-bold tracking-wide text-engineering uppercase">Status</dt>
            <dd className="font-semibold text-[#1a2b4a] dark:text-foreground">{project.status}</dd>
          </div>
        </dl>

        <Link
          href={`/projects/${project.slug}`}
          className={`mt-auto inline-flex items-center gap-2 text-sm font-semibold text-engineering transition-all group-hover:gap-3 ${PROJECTS_FOCUS_RING}`}
        >
          View Case Study
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default function ProjectsFilterGridSection() {
  const [category, setCategory] = useState<ProjectFilterCategory>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [client, setClient] = useState("All");
  const [status, setStatus] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useAboutReducedMotion();

  const clients = getProjectClients();
  const statuses = getProjectStatuses();

  const categoryOptions: DropdownOption[] = projectFilterCategories.map((c) => ({
    value: c,
    label: c === "All" ? "All Categories" : c,
  }));

  const clientOptions: DropdownOption[] = [
    { value: "All", label: "All Clients" },
    ...clients.map((c) => ({ value: c, label: c })),
  ];

  const statusOptions: DropdownOption[] = [
    { value: "All", label: "All Status" },
    ...statuses.map((s) => ({ value: s, label: s })),
  ];

  const sortOptions: DropdownOption[] = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "industry", label: "By Category" },
    { value: "year", label: "By Year" },
  ];

  const searchSuggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projectSearchHints.slice(0, 6);
    return projectSearchHints.filter((h) => h.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const filtered = useMemo(() => {
    let list = [...portfolioProjects];

    if (category !== "All") list = list.filter((p) => p.industry === category);
    if (client !== "All") list = list.filter((p) => p.client === client);
    if (status !== "All") list = list.filter((p) => p.status === status);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.title, p.description, p.client, p.industry, p.location, ...p.technologies]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }

    list.sort((a, b) => {
      if (sort === "oldest") return Number(a.year) - Number(b.year);
      if (sort === "industry") return a.industry.localeCompare(b.industry);
      if (sort === "year") return Number(b.year) - Number(a.year);
      return Number(b.year) - Number(a.year);
    });

    return list;
  }, [category, query, sort, client, status]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || reducedMotion) return;
    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" },
    );
  }, [filtered, reducedMotion]);

  useEffect(() => {
    if (!searchOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (!searchRef.current?.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [searchOpen]);

  const clearFilters = () => {
    setCategory("All");
    setQuery("");
    setClient("All");
    setStatus("All");
    setSort("newest");
  };

  const hasActiveFilters =
    category !== "All" || client !== "All" || status !== "All" || query.trim() !== "" || sort !== "newest";

  return (
    <section
      id="projects-grid"
      className={`scroll-mt-24 ${PROJECTS_BG_WHITE} ${PROJECTS_SECTION_PAD}`}
      aria-label="Projects portfolio"
    >
      <div className={PROJECTS_INNER}>
        <div className="mb-8 max-w-2xl">
          <SectionHeading
            label="PROJECT PORTFOLIO"
            title="Explore Delivered Engineering Programs"
            description="Search and filter by category, client, and status — or sort by delivery timeline."
            align="left"
          />
        </div>

        <div className="mb-8 rounded-[28px] border border-[#e8edf2] bg-[#fafbfd]/80 p-4 shadow-[0_8px_32px_rgba(15,23,42,0.04)] sm:p-5 dark:border-border dark:bg-surface/60">
          <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#5a6478] uppercase dark:text-foreground-muted">
            <SlidersHorizontal className="h-3.5 w-3.5 text-engineering" aria-hidden />
            Filters
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.35fr_repeat(4,minmax(0,1fr))]">
            <div ref={searchRef} className="relative min-w-0">
              <span className="mb-1.5 block text-[11px] font-bold tracking-[0.16em] text-[#94a3b8] uppercase">
                Search
              </span>
              <div
                className={`flex items-center gap-3 rounded-[16px] border bg-white px-4 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-[400ms] dark:bg-card ${
                  searchOpen
                    ? "border-engineering ring-2 ring-engineering/20"
                    : "border-[#e8edf2] dark:border-border"
                }`}
              >
                <Search className="h-4 w-4 shrink-0 text-engineering" aria-hidden />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Solar, substation, fiber…"
                  className="w-full bg-transparent text-sm font-medium text-[#1a2b4a] outline-none placeholder:text-[#94a3b8] dark:text-foreground"
                  aria-label="Search projects"
                  aria-autocomplete="list"
                  aria-controls="project-search-suggestions"
                />
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-[#94a3b8] transition-transform duration-[400ms] ${
                    searchOpen ? "rotate-180 text-engineering" : ""
                  }`}
                  aria-hidden
                />
              </div>

              {searchOpen && searchSuggestions.length > 0 && (
                <ul
                  id="project-search-suggestions"
                  role="listbox"
                  aria-label="Search suggestions"
                  className="absolute z-40 mt-2 w-full overflow-hidden rounded-[20px] border border-[#e8edf2] bg-white p-1.5 shadow-[0_20px_50px_rgba(15,23,42,0.14)] dark:border-border dark:bg-card"
                >
                  {searchSuggestions.map((hint) => (
                    <li key={hint} role="option" aria-selected={query === hint}>
                      <button
                        type="button"
                        onClick={() => {
                          setQuery(hint);
                          setSearchOpen(false);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-[14px] px-3.5 py-2.5 text-left text-sm font-medium text-[#1a2b4a] transition-colors hover:bg-engineering/10 hover:text-engineering dark:text-foreground"
                      >
                        <Search className="h-3.5 w-3.5 text-[#94a3b8]" aria-hidden />
                        {hint}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <FilterDropdown
              label="Category"
              value={category}
              options={categoryOptions}
              onChange={(v) => setCategory(v as ProjectFilterCategory)}
            />
            <FilterDropdown
              label="Clients"
              value={client}
              options={clientOptions}
              onChange={setClient}
            />
            <FilterDropdown
              label="Status"
              value={status}
              options={statusOptions}
              onChange={setStatus}
            />
            <FilterDropdown
              label="Sort"
              value={sort}
              options={sortOptions}
              onChange={(v) => setSort(v as SortKey)}
            />
          </div>

          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={clearFilters}
                className={`text-sm font-semibold text-engineering transition-opacity hover:opacity-80 ${PROJECTS_FOCUS_RING}`}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <p className="mb-6 text-sm text-[#94a3b8]" aria-live="polite">
          Showing {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-[28px] border border-[#e8edf2] bg-[#fafbfd] px-6 py-16 text-center dark:border-border dark:bg-surface">
            <p className="font-semibold text-[#1a2b4a] dark:text-foreground">No projects match your filters.</p>
            <p className="mt-2 text-sm text-[#5a6478] dark:text-foreground-muted">
              Try clearing search or selecting All filters.
            </p>
          </div>
        ) : (
          <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project) => (
              <EnterpriseProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
