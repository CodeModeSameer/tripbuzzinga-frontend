import { getItineraryById, getAllItineraryIds } from "@/data/itineraryDetails";
import ItineraryDetailPage from "./ItineraryDetailPage";
import { notFound } from "next/navigation";

/**
 * Generate static params for all itinerary detail pages.
 */
export async function generateStaticParams() {
  const allIds = getAllItineraryIds();
  return allIds.map((id) => {
    const data = getItineraryById(id);
    return {
      slug: data.destination,
      itineraryId: id,
    };
  });
}

/**
 * Generate metadata for SEO.
 */
export async function generateMetadata({ params }) {
  const { itineraryId } = await params;
  const itin = getItineraryById(itineraryId);
  if (!itin) return { title: "Itinerary Not Found" };

  return {
    title: `${itin.title} — ${itin.destinationName} | Trip Buzzinga`,
    description: `${itin.title}: ${itin.days} trip to ${itin.destinationName}. ${itin.overview.slice(0, 150)}...`,
  };
}

export default async function ItineraryPageWrapper({ params }) {
  const { slug, itineraryId } = await params;
  const itin = getItineraryById(itineraryId);
  if (!itin) notFound();

  return <ItineraryDetailPage itinerary={itin} slug={slug} itineraryId={itineraryId} />;
}
