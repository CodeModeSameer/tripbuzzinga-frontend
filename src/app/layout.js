import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Trip Buzzinga — Buzz Your Vacation | Travel Packages & Destinations",
  description:
    "Discover breathtaking international and national travel destinations with Trip Buzzinga. Curated travel packages, itineraries, and unforgettable vacation experiences at the best prices.",
  keywords:
    "travel, vacation, trip, destinations, international travel, national travel, travel packages, itineraries, Trip Buzzinga",
  openGraph: {
    title: "Trip Buzzinga — Buzz Your Vacation",
    description:
      "Curated travel packages and destinations for unforgettable vacations.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
