"use client";

import SharedItineraryLayout from "@/components/SharedItineraryLayout/SharedItineraryLayout";

export default function ItineraryDetailPage({ itinerary, slug, itineraryId }) {
  return <SharedItineraryLayout itinerary={itinerary} basePath={`/destinations/${slug}`} />;
}
