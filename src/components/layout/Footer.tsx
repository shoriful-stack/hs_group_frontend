import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Facebook,
  Youtube,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { navLinks, siteConfig, services } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface transition-colors duration-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-engineering/40 to-transparent" />
      <div className="container-wide section-padding !pb-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Logo size="lg" />
            </div>
            <p className="mb-6 max-w-sm text-sm leading-[1.8] text-foreground-muted">
              {siteConfig.description}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
                { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
                { icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:border-engineering hover:text-engineering hover:shadow-[0_8px_20px_rgba(33,140,206,0.2)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-muted transition-colors duration-[400ms] hover:text-engineering"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
                Services
              </h4>
              <ul className="space-y-3">
                {services.slice(0, 5).map((item) => (
                  <li key={item.id}>
                    <Link
                      href="/services"
                      className="text-sm text-foreground-muted transition-colors duration-[400ms] hover:text-engineering"
                    >
                      {item.title.split("&")[0].trim()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
                Products
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Server Racks", href: "/products#cabinet-server-rack" },
                  { label: "Power Systems", href: "/products#ac-power-systems" },
                  { label: "Generators", href: "/products#ac-generators" },
                  { label: "IoT Products", href: "/products#iot-products" },
                  { label: "Street Lighting", href: "/products#street-lighting" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground-muted transition-colors duration-[400ms] hover:text-engineering"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-start gap-3 text-sm text-foreground-muted transition-colors duration-[400ms] hover:text-foreground"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-engineering" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 text-sm text-foreground-muted transition-colors duration-[400ms] hover:text-foreground"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-engineering" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-engineering" />
                {siteConfig.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-foreground-muted">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
