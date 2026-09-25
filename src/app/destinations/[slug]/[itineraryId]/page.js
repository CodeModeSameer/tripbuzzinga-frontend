import DestinationItineraryPage from "./DestinationItineraryPage";

export default async function DestinationItineraryPageWrapper({ params }) {
  const { slug, itineraryId } = await params;

  return <DestinationItineraryPage slug={slug} itineraryId={itineraryId} />;
}
