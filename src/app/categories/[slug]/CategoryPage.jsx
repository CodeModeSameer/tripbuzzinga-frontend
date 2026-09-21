"use client";

import { useSiteData } from "@/context/SiteDataContext";
import SharedDestinationLayout from "@/components/SharedDestinationLayout/SharedDestinationLayout";

export default function CategoryPage({ slug }) {
  const { headerCategories, tripCategories } = useSiteData();
  const allCategories = [...(headerCategories || []), ...(tripCategories || [])];
  const category = allCategories.find(
    (c) => c.slug?.toLowerCase() === slug?.toLowerCase()
  );

  return <SharedDestinationLayout destination={category} basePath="/categories" />;
}
