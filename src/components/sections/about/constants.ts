export const ABOUT_SECTION_PAD = "py-[72px] sm:py-[100px] lg:py-[140px]";

export const ABOUT_BG_WHITE = "bg-white dark:bg-background";
export const ABOUT_BG_SURFACE = "bg-[#fafbfd] dark:bg-surface";

export const ABOUT_INNER = "container-wide px-4 sm:px-6 lg:px-8";

/** Shared page-hero layout — vertical middle, left-aligned with navbar container */
export const ABOUT_HERO_SHELL =
  "relative flex h-[90vh] min-h-[480px] w-full items-center overflow-hidden sm:min-h-[520px] lg:min-h-[560px]";
export const ABOUT_HERO_SHELL_COMPACT =
  "relative flex h-[70vh] min-h-[440px] w-full items-center overflow-hidden sm:min-h-[500px] lg:min-h-[520px]";
export const ABOUT_HERO_CONTENT =
  "relative z-10 w-full pt-24 pb-12 sm:pt-28 sm:pb-16";
export const ABOUT_HERO_BREADCRUMB = "mb-5 sm:mb-6";
export const ABOUT_HERO_BREADCRUMB_LIST =
  "flex items-center gap-1.5 text-xs font-medium text-white/60 sm:text-sm";

export const ABOUT_BLOCK_SPACING = "mb-12 lg:mb-16";
export const ABOUT_GRID_GAP = "gap-6 lg:gap-8";
export const ABOUT_CARD_GAP = "gap-5 lg:gap-6";

export const ABOUT_PROSE = "max-w-[700px]";
export const ABOUT_PROSE_CENTER = "mx-auto max-w-[700px]";

export const ABOUT_HEADING_HERO =
  "text-[34px] font-bold leading-[1.1] tracking-tight text-white sm:text-[40px] md:text-[44px] lg:text-[56px]";
export const ABOUT_HEADING_SECTION =
  "text-[32px] font-bold leading-[1.15] tracking-tight text-[#1a2b4a] sm:text-[40px] lg:text-[48px] dark:text-foreground";
export const ABOUT_HEADING_BLOCK =
  "text-2xl font-bold leading-tight text-[#1a2b4a] sm:text-3xl dark:text-foreground";
export const ABOUT_BODY = "text-base leading-[1.9] text-[#5a6478] dark:text-foreground-muted";
export const ABOUT_BODY_SM = "text-sm leading-[1.9] text-[#5a6478] dark:text-foreground-muted";

export const ABOUT_CARD =
  "rounded-[28px] border border-[#e8edf2] bg-white shadow-[0_8px_32px_rgba(15,23,42,0.06)] transition-all duration-500 ease-out dark:border-border dark:bg-card";

export const ABOUT_CARD_HOVER =
  "hover:-translate-y-1.5 hover:border-engineering hover:shadow-[0_20px_48px_rgba(33,140,206,0.12)]";

export const ABOUT_IMAGE_FRAME =
  "overflow-hidden rounded-[32px] shadow-[0_20px_56px_rgba(15,23,42,0.12)] ring-1 ring-[#e8edf2] dark:ring-border";

export const CINEMATIC_IMAGE =
  "object-cover object-center brightness-[1.03] contrast-[1.05] saturate-[1.04]";

export const ABOUT_PORTRAIT = `${CINEMATIC_IMAGE} object-[center_18%]`;

export const ABOUT_BTN_ARROW = "h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1";

export const ABOUT_BTN_MOBILE = "w-full sm:w-auto";

export const ABOUT_FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering focus-visible:ring-offset-2";

export const ABOUT_FOCUS_RING_LIGHT =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1729]";

export const ABOUT_TOUCH_TARGET = "touch-manipulation min-h-12 min-w-12";

export const ABOUT_ICON_BOX =
  "flex h-12 w-12 items-center justify-center rounded-2xl border border-engineering/20 bg-engineering/5 text-engineering transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(33,140,206,0.25)]";

export const ABOUT_ICON_STROKE = 1.75;

export const ABOUT_NAV_BTN =
  `inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white text-[#1a2b4a] shadow-[0_4px_16px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-engineering hover:text-engineering dark:border-border dark:bg-card dark:text-foreground ${ABOUT_TOUCH_TARGET} ${ABOUT_FOCUS_RING}`;

export const ABOUT_TAB_PILL =
  `shrink-0 rounded-full px-5 py-3 text-xs font-bold tracking-wider transition-all duration-500 sm:text-sm ${ABOUT_TOUCH_TARGET} ${ABOUT_FOCUS_RING}`;
