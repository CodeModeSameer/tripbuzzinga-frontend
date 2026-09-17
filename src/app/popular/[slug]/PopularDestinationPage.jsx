"use client";

import { useSiteData } from "@/context/SiteDataContext";
import SharedDestinationLayout from "@/components/SharedDestinationLayout/SharedDestinationLayout";

export default function PopularDestinationPage({ params }) {
  const { popularDestinations } = useSiteData();
  const destination = popularDestinations?.find(
    (d) => d.slug?.toLowerCase() === params.slug?.toLowerCase()
  );

  return <SharedDestinationLayout destination={destination} basePath="/popular" />;
}
