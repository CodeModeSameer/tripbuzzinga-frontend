"use client";

import { useSiteData } from "@/context/SiteDataContext";
import SharedDestinationLayout from "@/components/SharedDestinationLayout/SharedDestinationLayout";

export default function DestinationPage({ slug }) {
  const { exploreDomestic, exploreInternational } = useSiteData();
  const allDestinations = [...(exploreDomestic || []), ...(exploreInternational || [])];
  const destination = allDestinations.find(
    (d) => d.slug?.toLowerCase() === slug?.toLowerCase() || d.name?.toLowerCase() === slug?.toLowerCase()
  );

  return <SharedDestinationLayout destination={destination} basePath="/destinations" />;
}
