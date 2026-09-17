"use client";

import { useSiteData } from "@/context/SiteDataContext";
import SharedDestinationLayout from "@/components/SharedDestinationLayout/SharedDestinationLayout";

export default function CategoryPage({ params }) {
  const { headerCategories } = useSiteData();
  const category = headerCategories?.find(
    (c) => c.slug?.toLowerCase() === params.slug?.toLowerCase()
  );

  return <SharedDestinationLayout destination={category} basePath="/categories" />;
}
