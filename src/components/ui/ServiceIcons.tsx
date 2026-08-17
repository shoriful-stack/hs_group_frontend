import type { ComponentType } from "react";

interface IconProps {
  className?: string;
}

export function CivilIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 13h6" strokeLinecap="round" />
    </svg>
  );
}

export function ElectricalIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PowerIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v4M8 7h8M6 11h12v10H6V11z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 15h4M10 18h4" strokeLinecap="round" />
    </svg>
  );
}

export function TelecomIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v4M8 6h8M5 10h14v12H5V10z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="16" r="2" />
      <path d="M12 18v2" strokeLinecap="round" />
    </svg>
  );
}

export function SolarIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
    </svg>
  );
}

export function MaintenanceIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-3.3-3.3 2.1-2.1z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SmartCityIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M6.5 6.5h.01M17.5 6.5h.01M6.5 17.5h.01M17.5 17.5h.01" strokeLinecap="round" />
    </svg>
  );
}

const iconById: Record<string, ComponentType<IconProps>> = {
  "civil-design": CivilIcon,
  "electrical-mechanical": ElectricalIcon,
  "power-utility": PowerIcon,
  telecom: TelecomIcon,
  solar: SolarIcon,
  operations: MaintenanceIcon,
  "smart-city": SmartCityIcon,
};

export function ServiceIcon({ id, className }: { id: string; className?: string }) {
  const Icon = iconById[id] ?? ElectricalIcon;
  return <Icon className={className} />;
}
