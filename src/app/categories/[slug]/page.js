import CategoryPage from "./CategoryPage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Trip Categories — Trip Buzzinga`,
    description: `Explore curated ${slug} itineraries and travel packages by category.`,
  };
}

export default async function CategoryPageWrapper({ params }) {
  const { slug } = await params;
  return <CategoryPage slug={slug} />;
}
