"use client";

import { useSiteData } from "@/context/SiteDataContext";
import SharedItineraryLayout from "@/components/SharedItineraryLayout/SharedItineraryLayout";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function PopularItineraryPage({ slug, itineraryId }) {
  const { popularDestinations } = useSiteData();
  const destination = popularDestinations?.find(d => d.slug?.toLowerCase() === slug.toLowerCase());
  const itinerary = destination?.itineraries?.find(i => i.id === itineraryId);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!itinerary) {
    if (!mounted) {
      return (
        <div style={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}>
          Loading itinerary...
        </div>
      );
    }
    return (
      <div style={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px" }}>
        <h2>Itinerary not found</h2>
        <p>This itinerary may have been removed or the link is incorrect.</p>
      </div>
    );
  }

  return <SharedItineraryLayout itinerary={itinerary} basePath={`/popular/${slug}`} />;
}
