"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted
    ? (theme === "system" ? resolvedTheme : theme) === "dark"
    : true;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-all hover:border-engineering hover:bg-foreground/5"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      suppressHydrationWarning
    >
      <Sun
        className={`h-4 w-4 text-accent ${isDark ? "block" : "hidden"}`}
        aria-hidden={!isDark}
      />
      <Moon
        className={`h-4 w-4 text-engineering ${isDark ? "hidden" : "block"}`}
        aria-hidden={isDark}
      />
    </button>
  );
}
