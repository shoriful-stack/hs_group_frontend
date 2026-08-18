import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Facebook,
  Youtube,
  Instagram,
  Twitter,
  Link2,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { navLinks, services } from "@/data/site";
import { EMPTY_SITE_SETTINGS, getSiteSettings } from "@/services/homeService";

const SOCIAL_ICONS = {
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
  twitter: Twitter,
  link: Link2,
} as const;

export default async function Footer() {
  let settings = EMPTY_SITE_SETTINGS;
  try {
    settings = await getSiteSettings();
  } catch {
    settings = EMPTY_SITE_SETTINGS;
  }
  const phone = settings.phone.trim();
  const email = settings.email.trim();
  const address = settings.address.trim();
  const hasContact = Boolean(phone || email || address);

  return (
    <footer className="relative border-t border-border bg-surface transition-colors duration-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-engineering/40 to-transparent" />
      <div className="container-wide section-padding !pb-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            {(settings.logoFooter || settings.title) && (
              <div className="mb-6">
                <Logo size="lg" src={settings.logoFooter} alt={settings.title} />
              </div>
            )}
            {settings.description ? (
              <p className="mb-6 max-w-sm text-sm leading-[1.8] text-foreground-muted">
                {settings.description}
              </p>
            ) : null}
            {settings.social.length > 0 ? (
              <div className="flex gap-3">
                {settings.social.map(({ icon, href, label }) => {
                  const Icon = SOCIAL_ICONS[icon as keyof typeof SOCIAL_ICONS] ?? Link2;

                  return (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:border-engineering hover:text-engineering hover:shadow-[0_8px_20px_rgba(33,140,206,0.2)]"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            ) : null}
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

          {hasContact ? (
            <div className="lg:col-span-3">
              <h4 className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
                Contact Us
              </h4>
              <ul className="space-y-4">
                {phone ? (
                  <li>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="flex items-start gap-3 text-sm text-foreground-muted transition-colors duration-[400ms] hover:text-foreground"
                    >
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-engineering" />
                      {phone}
                    </a>
                  </li>
                ) : null}
                {email ? (
                  <li>
                    <a
                      href={`mailto:${email}`}
                      className="flex items-start gap-3 text-sm text-foreground-muted transition-colors duration-[400ms] hover:text-foreground"
                    >
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-engineering" />
                      {email}
                    </a>
                  </li>
                ) : null}
                {address ? (
                  <li className="flex items-start gap-3 text-sm text-foreground-muted">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-engineering" />
                    {address}
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-foreground-muted">
            &copy; {new Date().getFullYear()}
            {settings.title ? ` ${settings.title}.` : ""} All rights reserved.
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
