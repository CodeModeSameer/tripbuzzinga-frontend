import CategoryItineraryPage from "./CategoryItineraryPage";

export default async function CategoryItineraryPageWrapper({ params }) {
  const { slug, itineraryId } = await params;

  return <CategoryItineraryPage slug={slug} itineraryId={itineraryId} />;
}
