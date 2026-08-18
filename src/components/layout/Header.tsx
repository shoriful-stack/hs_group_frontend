"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileOffcanvasMenu from "@/components/layout/MobileOffcanvasMenu";
import { navLinks } from "@/data/site";
import { useSiteSettings } from "@/providers/SiteSettingsProvider";

type NavItem = (typeof navLinks)[number];

function isNavActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navItemColorClass(isScrolled: boolean, isActive: boolean) {
  if (isActive) return "text-engineering";
  if (isScrolled) {
    return "text-brand-dark/80 hover:text-engineering dark:text-white/90 dark:hover:text-engineering";
  }
  return "text-white/90 hover:text-engineering";
}

function NavUnderline({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-engineering transition-transform duration-300 ease-out xl:left-3 xl:right-3 ${
        isActive ? "scale-x-100" : "origin-left scale-x-0 group-hover:scale-x-100"
      }`}
      aria-hidden
    />
  );
}

export default function Header() {
  const pathname = usePathname();
  const settings = useSiteSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hash, setHash] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isChildNavActive = (childHref: string) => {
    const [path, childHash] = childHref.split("#");
    if (pathname !== path) return false;
    return childHash ? hash === `#${childHash}` : true;
  };

  const renderNavItem = (link: NavItem) => {
    const hasChildren = "children" in link && link.children;
    const isActive = isNavActive(link.href, pathname);
    const itemClass = `group relative flex items-center gap-1 px-2.5 py-2 text-[14px] font-medium transition-colors duration-300 xl:px-3.5 xl:text-[15px] ${navItemColorClass(isScrolled, isActive)} ${isActive ? "font-semibold" : ""}`;

    if (hasChildren) {
      const isDropdownOpen = openDropdown === link.label;

      return (
        <div
          key={link.label}
          className="relative"
          onMouseEnter={() => setOpenDropdown(link.label)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button className={itemClass}>
            {link.label}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-engineering" : ""}`}
            />
            <NavUnderline isActive={isActive || isDropdownOpen} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-border/80 bg-white/95 py-2 shadow-[0_20px_50px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:bg-card/95"
              >
                {link.children!.map((child) => {
                  const isChildLinkActive = isChildNavActive(child.href);

                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-5 py-2.5 text-sm transition-all duration-200 ${
                        isChildLinkActive
                          ? "bg-engineering/10 font-semibold text-engineering"
                          : "text-brand-dark/80 hover:translate-x-1 hover:bg-engineering/5 hover:text-engineering dark:text-foreground/80 dark:hover:text-engineering"
                      }`}
                    >
                      {child.label}
                    </Link>
                  );
                })}
                <div className="mt-1 border-t border-border px-5 pt-2">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 py-2 text-sm font-semibold text-engineering"
                  >
                    View All Products
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <Link key={link.href} href={link.href} className={itemClass}>
        {link.label}
        <NavUnderline isActive={isActive} />
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-[400ms] ease-out ${
        isScrolled
          ? "border-b border-border/60 bg-white/80 py-3 shadow-[0_8px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[rgba(10,15,26,0.82)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          : "border-b border-transparent bg-transparent py-4"
      }`}
    >
      <div className="container-wide flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo size="md" inverted={!isScrolled} src={settings.logoFooter} alt={settings.title} />

        <nav ref={dropdownRef} className="hidden items-center lg:flex">
          {navLinks.map((link) => renderNavItem(link))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link href="/products" className="btn-primary !px-5 !py-2.5">
            e store
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            ref={mobileTriggerRef}
            onClick={() => setIsMobileOpen(true)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
              isScrolled
                ? "border-border text-brand-dark dark:border-white/20 dark:text-white"
                : "border-white/30 text-white"
            }`}
            aria-label="Open menu"
            aria-expanded={isMobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileOffcanvasMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        triggerRef={mobileTriggerRef}
      />
    </header>
  );
}
