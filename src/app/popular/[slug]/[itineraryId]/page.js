import PopularItineraryPage from "./PopularItineraryPage";

export default async function PopularItineraryPageWrapper({ params }) {
  const { slug, itineraryId } = await params;

  return <PopularItineraryPage slug={slug} itineraryId={itineraryId} />;
}
