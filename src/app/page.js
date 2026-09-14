import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import TripCategories from "@/components/TripCategories/TripCategories";
import PopularDestinations from "@/components/PopularDestinations/PopularDestinations";
import Flyer from "@/components/Flyer/Flyer";
import DestinationsShowcase from "@/components/DestinationsShowcase/DestinationsShowcase";
import GlobalBottomSections from "@/components/GlobalBottomSections/GlobalBottomSections";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TripCategories />
        <PopularDestinations />
        <Flyer />
        <DestinationsShowcase />
        <GlobalBottomSections />
      </main>
      <Footer />
    </>
  );
}
