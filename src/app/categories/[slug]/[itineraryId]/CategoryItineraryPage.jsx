"use client";

import { useSiteData } from "@/context/SiteDataContext";
import SharedItineraryLayout from "@/components/SharedItineraryLayout/SharedItineraryLayout";

export default function CategoryItineraryPage({ slug, itineraryId }) {
  const { tripCategories } = useSiteData();
  const category = tripCategories?.find(c => c.slug?.toLowerCase() === slug.toLowerCase());
  const itinerary = category?.itineraries?.find(i => i.id === itineraryId);

  if (!itinerary) return null;

  return <SharedItineraryLayout itinerary={itinerary} basePath={`/categories/${slug}`} />;
}
