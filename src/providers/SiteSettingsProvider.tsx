"use client";

import { createContext, useContext } from "react";
import type { SiteSettingsView } from "@/types/home";

const EMPTY_SETTINGS: SiteSettingsView = {
  title: "",
  description: "",
  keywords: [],
  favicon: null,
  logoHeader: null,
  logoFooter: null,
  phone: "",
  email: "",
  address: "",
  social: [],
};

const SiteSettingsContext = createContext<SiteSettingsView>(EMPTY_SETTINGS);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettingsView;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={settings ?? EMPTY_SETTINGS}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext) ?? EMPTY_SETTINGS;
}
