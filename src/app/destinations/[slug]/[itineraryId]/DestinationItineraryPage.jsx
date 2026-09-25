"use client";

import { useSiteData } from "@/context/SiteDataContext";
import SharedItineraryLayout from "@/components/SharedItineraryLayout/SharedItineraryLayout";
import { useEffect, useState } from "react";

export default function DestinationItineraryPage({ slug, itineraryId }) {
  const { exploreDomestic, exploreInternational } = useSiteData();
  const allDestinations = [...(exploreDomestic || []), ...(exploreInternational || [])];
  const destination = allDestinations.find(
    (d) => d.slug?.toLowerCase() === slug.toLowerCase() || d.name?.toLowerCase() === slug.toLowerCase()
  );
  const itinerary = destination?.itineraries?.find(i => String(i.id) === String(itineraryId));

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

  return <SharedItineraryLayout itinerary={itinerary} basePath={`/destinations/${slug}`} />;
}
