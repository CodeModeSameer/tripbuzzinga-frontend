"use client";

import { useSiteData } from "@/context/SiteDataContext";
import SharedItineraryLayout from "@/components/SharedItineraryLayout/SharedItineraryLayout";

export default function PopularItineraryPage({ slug, itineraryId }) {
  const { popularDestinations } = useSiteData();
  const destination = popularDestinations?.find(d => d.slug?.toLowerCase() === slug.toLowerCase());
  const itinerary = destination?.itineraries?.find(i => i.id === itineraryId);

  if (!itinerary) return null;

  return <SharedItineraryLayout itinerary={itinerary} basePath={`/popular/${slug}`} />;
}
