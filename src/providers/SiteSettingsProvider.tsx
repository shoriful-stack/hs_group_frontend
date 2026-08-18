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
  latestProducts: [],
  productCategories: [],
  serviceCategories: [],
};

const SiteSettingsContext = createContext<SiteSettingsView>(EMPTY_SETTINGS);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettingsView;
  children: React.ReactNode;
}) {
  const value: SiteSettingsView = {
    ...EMPTY_SETTINGS,
    ...settings,
    social: Array.isArray(settings?.social) ? settings.social : [],
    latestProducts: Array.isArray(settings?.latestProducts) ? settings.latestProducts : [],
    productCategories: Array.isArray(settings?.productCategories) ? settings.productCategories : [],
    serviceCategories: Array.isArray(settings?.serviceCategories) ? settings.serviceCategories : [],
    phone: settings?.phone ?? "",
    email: settings?.email ?? "",
    address: settings?.address ?? "",
    title: settings?.title ?? "",
    description: settings?.description ?? "",
    keywords: Array.isArray(settings?.keywords) ? settings.keywords : [],
  };

  return (
    <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext) ?? EMPTY_SETTINGS;
}
