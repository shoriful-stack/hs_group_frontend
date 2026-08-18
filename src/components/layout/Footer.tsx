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
import { navLinks } from "@/data/site";
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
    settings = { ...EMPTY_SITE_SETTINGS, ...(await getSiteSettings()) };
  } catch {
    settings = EMPTY_SITE_SETTINGS;
  }
  const phone = (settings.phone ?? "").trim();
  const email = (settings.email ?? "").trim();
  const address = (settings.address ?? "").trim();
  const social = Array.isArray(settings.social) ? settings.social : [];
  const serviceCategories = Array.isArray(settings.serviceCategories) ? settings.serviceCategories : [];
  const productCategories = Array.isArray(settings.productCategories) ? settings.productCategories : [];
  const hasContact = Boolean(phone || email || address);

  return (
    <footer className="relative border-t border-border bg-surface transition-colors duration-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-engineering/40 to-transparent" />
      <div className="container-wide section-padding !pb-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            {(settings.logoFooter || settings.logoHeader || settings.title) ? (
              <div className="mb-6">
                <Logo size="lg" src={settings.logoFooter || settings.logoHeader} alt={settings.title || ""} />
              </div>
            ) : null}
            {settings.description ? (
              <p className="mb-6 max-w-sm text-sm leading-[1.8] text-foreground-muted">
                {settings.description}
              </p>
            ) : null}
            {social.length > 0 ? (
              <div className="flex gap-3">
                {social.map(({ icon, href, label }) => {
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

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
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
            {serviceCategories.length > 0 ? (
              <div>
                <h4 className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
                  Services
                </h4>
                <ul className="space-y-3">
                  {serviceCategories.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className="text-sm text-foreground-muted transition-colors duration-[400ms] hover:text-engineering"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {productCategories.length > 0 ? (
              <div>
                <h4 className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
                  Products
                </h4>
                <ul className="space-y-3">
                  {productCategories.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className="text-sm text-foreground-muted transition-colors duration-[400ms] hover:text-engineering"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
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
