"use client";

import { useSiteData } from "@/context/SiteDataContext";
import SharedDestinationLayout from "@/components/SharedDestinationLayout/SharedDestinationLayout";

export default function PopularDestinationPage({ slug }) {
  const { popularDestinations } = useSiteData();
  const destination = popularDestinations?.find(
    (d) => d.slug?.toLowerCase() === slug?.toLowerCase() || (d.city || d.name || '').toLowerCase().replace(/\s+/g, '-') === slug?.toLowerCase()
  );

  return <SharedDestinationLayout destination={destination} basePath="/popular" />;
}
