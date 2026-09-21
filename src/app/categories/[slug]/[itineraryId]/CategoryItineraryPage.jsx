"use client";

import { useSiteData } from "@/context/SiteDataContext";
import SharedItineraryLayout from "@/components/SharedItineraryLayout/SharedItineraryLayout";

import { notFound } from "next/navigation";

export default function CategoryItineraryPage({ slug, itineraryId }) {
  const { headerCategories, tripCategories } = useSiteData();
  const allCategories = [...(headerCategories || []), ...(tripCategories || [])];
  const category = allCategories.find(c => c.slug?.toLowerCase() === slug.toLowerCase());
  const itinerary = category?.itineraries?.find(i => i.id === itineraryId);

  if (!itinerary) {
    notFound();
  }

  return <SharedItineraryLayout itinerary={itinerary} basePath={`/categories/${slug}`} />;
}
