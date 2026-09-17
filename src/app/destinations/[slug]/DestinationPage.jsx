"use client";

import { useSiteData } from "@/context/SiteDataContext";
import SharedDestinationLayout from "@/components/SharedDestinationLayout/SharedDestinationLayout";

export default function DestinationPage({ params }) {
  const { exploreInternational, exploreDomestic } = useSiteData();
  const allDestinations = [...(exploreInternational || []), ...(exploreDomestic || [])];
  const destination = allDestinations.find(
    (d) => d.slug?.toLowerCase() === params.slug?.toLowerCase()
  );

  return <SharedDestinationLayout destination={destination} basePath="/destinations" />;
}
