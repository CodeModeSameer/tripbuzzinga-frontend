import DestinationPage from "./DestinationPage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Travel Packages — Trip Buzzinga`,
    description: `Explore curated ${slug} itineraries and travel packages. Book your dream vacation with Trip Buzzinga.`,
  };
}

export default async function DestinationPageWrapper({ params }) {
  const { slug } = await params;
  return <DestinationPage slug={slug} />;
}
