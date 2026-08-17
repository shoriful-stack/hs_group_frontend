type AboutBlueprintProps = {
  className?: string;
};

export default function AboutBlueprint({ className = "" }: AboutBlueprintProps) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full text-[#1a2b4a]/[0.02] dark:text-foreground/[0.02] ${className}`}
      viewBox="0 0 1440 900"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M0 180H1440M0 360H1440M0 540H1440M0 720H1440" stroke="currentColor" strokeWidth="0.75" />
      <path d="M240 0V900M480 0V900M720 0V900M960 0V900M1200 0V900" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}
