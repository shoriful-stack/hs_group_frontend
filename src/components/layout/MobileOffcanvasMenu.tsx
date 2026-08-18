"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronDown,
  ChevronRight,
  Search,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Twitter,
  Link2,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { navLinks, products, services } from "@/data/site";
import { useSiteSettings } from "@/providers/SiteSettingsProvider";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const SOCIAL_ICONS = {
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
  twitter: Twitter,
  link: Link2,
} as const;

/** Simple links shown after Products/Services accordions (excludes Home/About/Products/Services) */
const mobileAfterAccordions = navLinks.filter(
  (link) =>
    !["/", "/about", "/products", "/services"].includes(link.href) &&
    !("children" in link && link.children),
);

function checkActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface MobileOffcanvasMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export default function MobileOffcanvasMenu({
  isOpen,
  onClose,
  triggerRef,
}: MobileOffcanvasMenuProps) {
  const pathname = usePathname();
  const settings = useSiteSettings();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => setMounted(true), []);

  const lockScroll = useCallback((lock: boolean) => {
    document.body.style.overflow = lock ? "hidden" : "";
    document.documentElement.classList.toggle("mobile-menu-open", lock);
    document.documentElement.classList.toggle("lenis-stopped", lock);
  }, []);

  useEffect(() => {
    lockScroll(isOpen);
    return () => lockScroll(false);
  }, [isOpen, lockScroll]);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setExpanded(null);
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    window.location.href = searchQuery.trim()
      ? `/products?search=${encodeURIComponent(searchQuery.trim())}`
      : "/products";
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[200] bg-[rgba(0,0,0,0.45)] backdrop-blur-[6px] lg:hidden"
            onClick={onClose}
          />

          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: EASE }}
            drag="x"
            dragConstraints={{ left: -400, right: 0 }}
            dragElastic={0.05}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -400) onClose();
            }}
            className="fixed top-0 left-0 z-[201] flex h-[100dvh] w-[320px] max-w-[88vw] flex-col border-r border-[#E9EEF5] bg-white shadow-[8px_0_40px_rgba(15,23,42,0.12)] sm:w-[380px] lg:hidden"
            style={{ padding: 28 }}
          >
            {/* Header */}
            <div className="relative mb-6 shrink-0">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="absolute top-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-[#E9EEF5] bg-white text-[#1a2b4a] transition-all duration-300 hover:border-engineering hover:text-engineering hover:rotate-90"
              >
                <X className="h-5 w-5" />
              </button>
              {settings.logoHeader || settings.title ? (
                <Logo size="sm" src={settings.logoHeader} alt={settings.title} />
              ) : null}
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative mb-5 shrink-0">
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Products & Services..."
                className="h-12 w-full rounded-2xl border border-[#E9EEF5] bg-[#f8fafc] pr-4 pl-11 text-sm text-[#1a2b4a] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-engineering focus:bg-white"
                aria-label="Search products and services"
              />
            </form>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto overscroll-contain pr-1" data-lenis-prevent>
              <ul className="space-y-1">
                <MobileNavLink
                  link={{ label: "Home", href: "/" }}
                  index={0}
                  pathname={pathname}
                  onClose={onClose}
                />
                <MobileNavLink
                  link={{ label: "About", href: "/about" }}
                  index={1}
                  pathname={pathname}
                  onClose={onClose}
                />

                <MobileAccordion
                  label="Products"
                  href="/products"
                  isExpanded={expanded === "Products"}
                  onToggle={() =>
                    setExpanded(expanded === "Products" ? null : "Products")
                  }
                  isActive={checkActive("/products", pathname)}
                  index={2}
                  items={products.map((p) => ({
                    label: p.title,
                    href: `/products#${p.id}`,
                  }))}
                  pathname={pathname}
                  onClose={onClose}
                />

                <MobileAccordion
                  label="Services"
                  href="/services"
                  isExpanded={expanded === "Services"}
                  onToggle={() =>
                    setExpanded(expanded === "Services" ? null : "Services")
                  }
                  isActive={checkActive("/services", pathname)}
                  index={3}
                  items={services.map((s) => ({
                    label: s.title,
                    href: `/services#${s.id}`,
                  }))}
                  pathname={pathname}
                  onClose={onClose}
                />

                {mobileAfterAccordions.map((link, i) => (
                  <MobileNavLink
                    key={link.href}
                    link={{ label: link.label, href: link.href }}
                    index={i + 4}
                    pathname={pathname}
                    onClose={onClose}
                  />
                ))}
              </ul>
            </nav>

            {/* Footer CTA */}
            <div className="mt-4 shrink-0 border-t border-[#E9EEF5] pt-5">
              {(settings.phone || settings.email || settings.address) ? (
                <div className="mb-4 space-y-2.5 text-sm text-[#5a6478]">
                  {settings.phone ? (
                    <a
                      href={`tel:${settings.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2.5 transition-colors hover:text-engineering"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-engineering" />
                      {settings.phone}
                    </a>
                  ) : null}
                  {settings.email ? (
                    <a
                      href={`mailto:${settings.email}`}
                      className="flex items-center gap-2.5 transition-colors hover:text-engineering"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-engineering" />
                      {settings.email}
                    </a>
                  ) : null}
                  {settings.address ? (
                    <p className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 shrink-0 text-engineering" />
                      {settings.address}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <div className="flex flex-col gap-2.5">
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex h-12 items-center justify-center rounded-2xl bg-engineering text-sm font-semibold text-white shadow-[0_8px_20px_rgba(33,140,206,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1a7ab8]"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex h-11 items-center justify-center rounded-2xl border border-[#E9EEF5] text-sm font-semibold text-[#1a2b4a] transition-all duration-300 hover:border-engineering hover:text-engineering"
                >
                  Contact
                </Link>
              </div>

              {settings.social.length > 0 ? (
                <div className="mt-4 flex justify-center gap-3">
                  {settings.social.map(({ icon, href, label }) => {
                    const Icon = SOCIAL_ICONS[icon as keyof typeof SOCIAL_ICONS] ?? Link2;

                    return (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E9EEF5] text-[#1a2b4a] transition-all duration-300 hover:-translate-y-0.5 hover:border-engineering hover:text-engineering"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

function MobileNavLink({
  link,
  index,
  pathname,
  onClose,
}: {
  link: { label: string; href: string };
  index: number;
  pathname: string;
  onClose: () => void;
}) {
  const active = checkActive(link.href, pathname);

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * index, duration: 0.35, ease: EASE }}
    >
      <Link
        href={link.href}
        onClick={onClose}
        className={`group relative flex h-14 items-center justify-between rounded-[14px] border-l-[3px] px-4 text-[18px] font-semibold transition-all duration-300 ${
          active
            ? "border-engineering bg-[#eef6fc] pl-[13px] text-engineering"
            : "border-transparent text-[#1a2b4a] hover:border-engineering hover:bg-[#f8fafc]"
        }`}
      >
        <span className="transition-transform duration-300 group-hover:translate-x-2">
          {link.label}
        </span>
        <ChevronRight
          className={`h-4 w-4 shrink-0 transition-all duration-300 ${
            active
              ? "translate-x-0 text-engineering opacity-100"
              : "translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
          }`}
        />
      </Link>
    </motion.li>
  );
}

function MobileAccordion({
  label,
  href,
  items,
  isExpanded,
  onToggle,
  isActive,
  index,
  pathname,
  onClose,
}: {
  label: string;
  href: string;
  items: { label: string; href: string }[];
  isExpanded: boolean;
  onToggle: () => void;
  isActive: boolean;
  index: number;
  pathname: string;
  onClose: () => void;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * index, duration: 0.35, ease: EASE }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className={`group flex h-14 w-full items-center justify-between rounded-[14px] border-l-[3px] px-4 text-[18px] font-semibold transition-all duration-300 ${
          isActive
            ? "border-engineering bg-[#eef6fc] pl-[13px] text-engineering"
            : "border-transparent text-[#1a2b4a] hover:border-engineering hover:bg-[#f8fafc]"
        }`}
      >
        <span className="transition-transform duration-300 group-hover:translate-x-2">
          {label}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
            isExpanded ? "rotate-180 text-engineering" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <ul className="space-y-0.5 py-2 pl-3">
              {items.map((item) => {
                const itemActive = checkActive(item.href.split("#")[0], pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                        itemActive
                          ? "bg-engineering/10 text-engineering"
                          : "text-[#5a6478] hover:translate-x-1 hover:text-engineering"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-1 px-3 py-2.5 text-sm font-semibold text-engineering"
                >
                  View All {label}
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
