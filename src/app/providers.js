"use client";

import { SiteDataProvider } from "@/context/SiteDataContext";

export function Providers({ children }) {
  return <SiteDataProvider>{children}</SiteDataProvider>;
}
