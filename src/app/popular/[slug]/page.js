import PopularDestinationPage from "./PopularDestinationPage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Popular Destinations — Trip Buzzinga`,
    description: `Explore curated ${slug} itineraries and travel packages for popular destinations.`,
  };
}

export default async function PopularPageWrapper({ params }) {
  const { slug } = await params;
  return <PopularDestinationPage slug={slug} />;
}
