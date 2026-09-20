"use client";

import { useSiteData } from "@/context/SiteDataContext";
import SharedDestinationLayout from "@/components/SharedDestinationLayout/SharedDestinationLayout";

export default function CategoryPage({ slug }) {
  const { headerCategories } = useSiteData();
  const category = headerCategories?.find(
    (c) => c.slug?.toLowerCase() === slug?.toLowerCase()
  );

  return <SharedDestinationLayout destination={category} basePath="/categories" />;
}
