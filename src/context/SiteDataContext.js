"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   INITIAL DATA — single source of truth for the entire site
   ═══════════════════════════════════════════════════════════════ */

const initialHeroData = {
  destinations: ["Tawang", "Ladakh", "Spiti", "Kerala"],
  backgroundImage:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400&auto=format&fit=crop",
  stats: [
    // { label: "Reviews", value: "10000+" },
    { label: "Satisfied Travelers", value: "80000+" },
    { label: "Destinations", value: "50+" },
    { label: "Experience", value: "9 Years+" },
  ],
  reviews: [
    {
      id: 1,
      name: "Traveler One",
      images: ["https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100"],
      text: "Travelled with Justwravel on their Winter Spiti expedition. One of the best trip i have had.",
    },
    {
      id: 2,
      name: "Traveler Two",
      images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"],
      text: "It was good experience with Justwravel. I have done spiti 4x4 expedition and enjoyed a lot.",
    },
    {
      id: 3,
      name: "Traveler Three",
      images: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"],
      text: "Awesome experience with JustWravel Tawang Bike trip. Awesome well planned 9/10 days.",
    },
    {
      id: 4,
      name: "Traveler Four",
      images: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"],
      text: "The best travel company I've ever traveled with. Highly recommended for solo travelers.",
    },
    {
      id: 5,
      name: "Traveler Five",
      images: ["https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100"],
      text: "Incredible management and beautiful locations. Will definitely travel again next year.",
    },
  ],
};

const initialPopularData = [
  {
    id: 1,
    type: "international",
    country: "UAE",
    city: "Dubai",
    flag: "🇦🇪",
    duration: "5D / 4N",
    title: "Discover Dubai Essentials",
    slug: "dubai-essentials",
    tagline: "The City of Gold",
    desc: "Experience the ultimate mix of modern luxury, desert adventure, and cultural heritage in Dubai.",
    bannerGradient: "linear-gradient(160deg, #fdfbfb 0%, #ebedee 100%)",
    highlights: [
      "Desert Safari with BBQ Dinner",
      "Burj Khalifa 124th Floor Entry",
      "Abu Dhabi Sheikh Zayed Mosque",
    ],
    price: "₹42,999",
    images: ["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800"],
    itineraries: []
  },
  {
    id: 2,
    type: "international",
    country: "Thailand",
    city: "Bangkok",
    flag: "🇹🇭",
    duration: "6D / 5N",
    title: "Thailand Tropical Escape",
    slug: "thailand-tropical-escape",
    tagline: "Land of Smiles",
    desc: "A perfect blend of vibrant city life in Bangkok and relaxing island vibes in Phuket.",
    bannerGradient: "linear-gradient(160deg, #ffecd2 0%, #fcb69f 100%)",
    highlights: [
      "Grand Palace & Emerald Buddha",
      "Phuket Island Hopping Tour",
      "Floating Market Experience",
    ],
    price: "₹38,499",
    images: ["https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&q=80&w=800"],
    itineraries: []
  },
  {
    id: 3,
    type: "international",
    country: "Indonesia",
    city: "Bali",
    flag: "🇮🇩",
    duration: "7D / 6N",
    title: "Bali Paradise Adventure",
    slug: "bali-paradise-adventure",
    tagline: "Island of the Gods",
    desc: "Immerse yourself in lush landscapes, ancient temples, and beautiful beaches in Bali.",
    bannerGradient: "linear-gradient(160deg, #84fab0 0%, #8fd3f4 100%)",
    highlights: [
      "Ubud Monkey Forest & Rice Terraces",
      "Tanah Lot Temple Sunset Tour",
      "Nusa Penida Snorkeling Trip",
    ],
    price: "₹49,999",
    images: ["https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800"],
    itineraries: []
  },
  {
    id: 4,
    type: "international",
    country: "Maldives",
    city: "Malé",
    flag: "🇲🇻",
    duration: "4D / 3N",
    title: "Maldives Luxury Retreat",
    slug: "maldives-luxury-retreat",
    tagline: "Tropical Haven",
    desc: "Escape to the luxurious overwater villas and pristine waters of the Maldives.",
    bannerGradient: "linear-gradient(160deg, #a1c4fd 0%, #c2e9fb 100%)",
    highlights: [
      "Overwater Villa Stay",
      "Sunset Dolphin Cruise",
      "Coral Reef Snorkeling",
    ],
    price: "₹74,999",
    images: ["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800"],
    itineraries: []
  },
  {
    id: 5,
    type: "international",
    country: "Singapore",
    city: "Singapore",
    flag: "🇸🇬",
    duration: "5D / 4N",
    title: "Singapore City Wonders",
    slug: "singapore-city-wonders",
    tagline: "The Lion City",
    desc: "Discover the spectacular futuristic gardens and world-class entertainment in Singapore.",
    bannerGradient: "linear-gradient(160deg, #ff9a9e 0%, #fecfef 100%)",
    highlights: [
      "Marina Bay Sands SkyPark",
      "Universal Studios Full Day",
      "Sentosa Island Adventure",
    ],
    price: "₹55,999",
    images: ["https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800"],
    itineraries: []
  },
  {
    id: 6,
    type: "domestic",
    country: "India",
    city: "Goa",
    flag: "🇮🇳",
    duration: "4D / 3N",
    title: "Goa Beach Bliss",
    slug: "goa-beach-bliss",
    tagline: "Sunshine State",
    desc: "Relax on golden sands and experience the rich Portuguese heritage of Goa.",
    bannerGradient: "linear-gradient(160deg, #f6d365 0%, #fda085 100%)",
    highlights: [
      "North Goa Beach Hopping",
      "Dudhsagar Waterfalls Trek",
      "Cruise in Mandovi River",
    ],
    price: "₹14,999",
    images: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800"],
    itineraries: []
  },
  {
    id: 7,
    type: "domestic",
    country: "India",
    city: "Kerala",
    flag: "🇮🇳",
    duration: "5D / 4N",
    title: "Kerala Backwaters & Hills",
    slug: "kerala-backwaters",
    tagline: "God's Own Country",
    desc: "Glide through serene backwaters and breathe in the fresh air of Munnar's tea gardens.",
    bannerGradient: "linear-gradient(160deg, #d4fc79 0%, #96e6a1 100%)",
    highlights: [
      "Munnar Tea Gardens Tour",
      "Alleppey Houseboat Stay",
      "Periyar Wildlife Sanctuary",
    ],
    price: "₹18,999",
    images: ["https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800"],
    itineraries: []
  },
];

const initialFlyerData = [
  {
    id: 1,
    title: "INDIA'S BEST WINTER",
    subtitle: "BACKPACKING TRIPS",
    badge: "EARLY BIRD OFFER",
    discountLabel: "DISCOUNT UP TO",
    discountAmount: "₹ 5,500*",
    images: ["https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"],
    linkUrl: "/offers",
  },
  {
    id: 2,
    title: "SUMMER GETAWAYS",
    subtitle: "BEACH HOLIDAYS",
    badge: "LIMITED TIME",
    discountLabel: "FLAT DISCOUNT",
    discountAmount: "₹ 3,000*",
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"],
    linkUrl: "/offers/summer",
  },
  {
    id: 3,
    title: "ADVENTURE AWAITS",
    subtitle: "HIMALAYAN TREKS",
    badge: "NEW SEASON",
    discountLabel: "CASHBACK",
    discountAmount: "₹ 2,000*",
    images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop"],
    linkUrl: "/offers/trekking",
  }
];

const initialExploreIntl = [
  {
    id: 1,
    name: "Maldives",
    tagline: "Paradise on Earth",
    bannerGradient: "linear-gradient(160deg, #87CEEB 0%, #48CAE4 30%, #0077B6 60%, #005F8A 100%)",
    desc: "Crystal-clear turquoise waters, pristine white-sand beaches, and luxurious overwater villas make the Maldives a paradise unlike any other.",
    images: ["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800"],
    itineraries: [
      { id: "mal-1", title: "Taj Coral Reef", days: "6 Days 5 Nights", pickup: "Air Port", transfers: "Included", budget: "₹50,000", rating: 5, imageGradient: "linear-gradient(135deg, #87CEEB, #48CAE4)" },
      { id: "mal-2", title: "Oblu Select Sangeli", days: "6 Days 5 Nights", pickup: "Air Port", transfers: "Included", budget: "₹50,000", rating: 5, imageGradient: "linear-gradient(135deg, #0077B6, #48CAE4)" },
    ],
  },
  {
    id: 2,
    name: "Switzerland",
    tagline: "The Land of Alps",
    bannerGradient: "linear-gradient(160deg, #B3E5FC 0%, #4FC3F7 30%, #29B6F6 60%, #0288D1 100%)",
    desc: "From the snow-capped peaks of the Alps to the serene lakeside towns, Switzerland offers a fairy-tale landscape at every turn.",
    images: ["https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800"],
    itineraries: [
      { id: "swi-1", title: "Swiss Alps Explorer", days: "8 Days 7 Nights", pickup: "Zurich Airport", transfers: "Included", budget: "₹1,20,000", rating: 5, imageGradient: "linear-gradient(135deg, #B3E5FC, #4FC3F7)" },
    ],
  },
  {
    id: 3,
    name: "Japan",
    tagline: "Where Tradition Meets Future",
    bannerGradient: "linear-gradient(160deg, #FFECB3 0%, #FFD54F 30%, #FF9800 60%, #F57C00 100%)",
    desc: "A mesmerizing blend of ancient traditions and cutting-edge modernity, Japan captivates with its stunning cherry blossoms.",
    images: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800"],
    itineraries: [
      { id: "jpn-1", title: "Tokyo & Kyoto Classic", days: "7 Days 6 Nights", pickup: "Narita Airport", transfers: "Bullet Train", budget: "₹1,10,000", rating: 5, imageGradient: "linear-gradient(135deg, #FFECB3, #FFD54F)" },
    ],
  },
  {
    id: 4,
    name: "Iceland",
    tagline: "Land of Fire & Ice",
    bannerGradient: "linear-gradient(160deg, #E8EAF6 0%, #9FA8DA 30%, #5C6BC0 60%, #3F51B5 100%)",
    desc: "Witness the Northern Lights dancing across volcanic landscapes, soak in natural geothermal hot springs, and explore dramatic waterfalls.",
    images: ["https://images.unsplash.com/photo-1476610287331-b711a628ea8e?auto=format&fit=crop&q=80&w=800"],
    itineraries: [
      { id: "ice-1", title: "Northern Lights Chase", days: "6 Days 5 Nights", pickup: "Keflavik Airport", transfers: "Included", budget: "₹1,30,000", rating: 5, imageGradient: "linear-gradient(135deg, #9FA8DA, #5C6BC0)" },
    ],
  },
  {
    id: 41,
    name: "France",
    tagline: "City of Love",
    bannerGradient: "linear-gradient(160deg, #FFCDD2 0%, #EF9A9A 30%, #E57373 60%, #C62828 100%)",
    desc: "Experience the romance of Paris, the lavender fields of Provence, and the sun-drenched French Riviera.",
    images: ["https://images.unsplash.com/photo-1502602898657-3e907614f010?auto=format&fit=crop&q=80&w=800"],
    itineraries: [],
  },
  {
    id: 42,
    name: "Italy",
    tagline: "Renaissance Beauty",
    bannerGradient: "linear-gradient(160deg, #C8E6C9 0%, #81C784 30%, #43A047 60%, #1B5E20 100%)",
    desc: "Wander through the ancient ruins of Rome, glide along the canals of Venice, and marvel at the Renaissance masterpieces in Florence.",
    images: ["https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800"],
    itineraries: [],
  },
];

const initialExploreDom = [
  {
    id: 5,
    name: "Goa",
    tagline: "Sun, Sand & Soul",
    bannerGradient: "linear-gradient(160deg, #FFE0B2 0%, #FFCC80 30%, #FF9800 60%, #E65100 100%)",
    desc: "Sun-kissed beaches, vibrant nightlife, and Portuguese heritage create an irresistible coastal charm.",
    images: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800"],
    itineraries: [
      { id: "goa-1", title: "North Goa Beach Bliss", days: "4 Days 3 Nights", pickup: "Goa Airport", transfers: "Included", budget: "₹15,000", rating: 4, imageGradient: "linear-gradient(135deg, #FFE0B2, #FFCC80)" },
    ],
  },
  {
    id: 6,
    name: "Rajasthan",
    tagline: "The Land of Kings",
    bannerGradient: "linear-gradient(160deg, #FFCDD2 0%, #EF9A9A 30%, #E57373 60%, #C62828 100%)",
    desc: "Step into a world of grand palaces, majestic forts, and golden deserts. Rajasthan's royal heritage comes alive through its colorful bazaars.",
    images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800"],
    itineraries: [
      { id: "raj-1", title: "Royal Rajasthan Circuit", days: "8 Days 7 Nights", pickup: "Jaipur Airport", transfers: "Included", budget: "₹32,000", rating: 5, imageGradient: "linear-gradient(135deg, #FFCDD2, #EF9A9A)" },
    ],
  },
  {
    id: 7,
    name: "Kerala",
    tagline: "God's Own Country",
    bannerGradient: "linear-gradient(160deg, #C8E6C9 0%, #81C784 30%, #43A047 60%, #1B5E20 100%)",
    desc: "Known as God's Own Country, Kerala enchants with its tranquil backwaters, lush tea plantations of Munnar, pristine hill stations.",
    images: ["https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800"],
    itineraries: [
      { id: "ker-1", title: "Alleppey Houseboat Stay", days: "5 Days 4 Nights", pickup: "Kochi Airport", transfers: "Included", budget: "₹22,000", rating: 5, imageGradient: "linear-gradient(135deg, #C8E6C9, #81C784)" },
    ],
  },
  {
    id: 8,
    name: "Ladakh",
    tagline: "The Roof of the World",
    bannerGradient: "linear-gradient(160deg, #CFD8DC 0%, #90A4AE 30%, #546E7A 60%, #37474F 100%)",
    desc: "A high-altitude wonderland of dramatic mountain passes, crystal-clear lakes, and ancient monasteries perched on clifftops.",
    images: ["https://images.unsplash.com/photo-1581793746485-04698e79a4e8?auto=format&fit=crop&q=80&w=800"],
    itineraries: [
      { id: "lad-1", title: "Leh Pangong Lake Tour", days: "6 Days 5 Nights", pickup: "Leh Airport", transfers: "4x4 Included", budget: "₹28,000", rating: 5, imageGradient: "linear-gradient(135deg, #CFD8DC, #90A4AE)" },
    ],
  },
  {
    id: 81,
    name: "Andaman Islands",
    tagline: "Tropical Paradise",
    bannerGradient: "linear-gradient(160deg, #B3E5FC 0%, #4FC3F7 30%, #29B6F6 60%, #0288D1 100%)",
    desc: "Immerse yourself in a tropical paradise with pristine beaches, vibrant coral reefs, and dense rainforests.",
    images: ["https://images.unsplash.com/photo-1582650517303-b42616d56781?auto=format&fit=crop&q=80&w=800"],
    itineraries: [],
  },
  {
    id: 82,
    name: "Himachal Pradesh",
    tagline: "Mountain Escape",
    bannerGradient: "linear-gradient(160deg, #C8E6C9 0%, #81C784 30%, #43A047 60%, #1B5E20 100%)",
    desc: "Nestled in the Himalayas, Himachal Pradesh boasts picturesque hill stations, apple orchards, and thrilling adventure sports.",
    images: ["https://images.unsplash.com/photo-1626714486259-7090b8f62fa2?auto=format&fit=crop&q=80&w=800"],
    itineraries: [],
  },
];

const initialReviewsData = [
  {
    id: 1,
    name: "Anamika Gupta",
    avatarInitial: "a",
    avatarBg: "#0ea5e9",
    rating: 5,
    text: "\u201CI had made a last minute decision for the trip to Bali and was kind of hesitant but JustWravel were really good at planning out the complete trip from hotels to the visits. They were patient and went forward and backward to complete our requirements. A special thanks to our tea...",
    tripName: "Bhutan Bike and Backpacking | 8 Days Bhutan Bike Tour",
    tripImage:
      "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=200&auto=format&fit=crop",
    reviewLink: "https://google.com/search?q=justwravel",
  },
  {
    id: 2,
    name: "Ravi Teja",
    avatarImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    text: "\u201CTravelled to Bhutan with Justwravel for a biking trip. It has been a memorable experience for me. It was a well organized trip. Prajwal was our tour guide and he made sure that the trip went on smooth. As I was relatively new to biking and was a slow rider h...",
    tripName: "Bhutan Bike and Backpacking | 8 Days Bhutan Bike Tour",
    tripImage:
      "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=200&auto=format&fit=crop",
    reviewLink: "https://google.com/search?q=justwravel",
  },
  {
    id: 3,
    name: "Ravi Wankhede",
    avatarInitial: "R",
    avatarBg: "#a855f7",
    rating: 5,
    text: "\u201CHad an amazing trip of Bhutan with Justwravel. Enjoyed a lot and got to know about the culture and historical stories. Special thanks to captain- PRAJWAL Good bikes, Great memories \ud83e\udee6\ud83c\udffc\u201D",
    tripName: "Bhutan Bike and Backpacking | 8 Days Bhutan Bike Tour",
    tripImage:
      "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=200&auto=format&fit=crop",
    reviewLink: "https://google.com/search?q=justwravel",
  },
];

const initialBlogsData = [
  {
    id: 1,
    title: "Why JustWravel Is the Perfect Choice for Your All-Girls Trip | Safe...",
    publishedAt: "30 Jul",
    readingTime: "6 minutes read",
    author: "Jane Doe",
    category: "Tips",
    content: "When it comes to planning an all-girls trip, safety and reliability are paramount. JustWravel provides the perfect blend of adventure and security, ensuring that you and your friends can focus purely on making memories. From curated itineraries to trusted local guides, we handle all the logistics. Whether it's exploring the mountains or relaxing by the beach, our group tours are designed to empower female travelers.",
    images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"],
    isFeatured: false,
  },
  {
    id: 2,
    title: "Book Now Pay Later with JustWravel | Travel Now, Pay in EMIs",
    publishedAt: "25 Jun",
    readingTime: "5 minutes read",
    author: "John Smith",
    category: "Guides",
    content: "Travel should be accessible to everyone. That's why JustWravel has introduced the Book Now, Pay Later feature. With easy EMI options, you no longer need to empty your savings for that dream trip. Simply choose your destination, select the EMI option at checkout, and get ready to pack your bags. We have partnered with leading financial institutions to offer zero or low-interest plans, ensuring your travel dreams don't come with a heavy financial burden.",
    images: ["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop"],
    isFeatured: false,
  },
  {
    id: 3,
    title: "Why School Trips Are More Than Just Fun Days Out: How JustWrav...",
    publishedAt: "18 Sep",
    readingTime: "9 minutes read",
    author: "Alice Johnson",
    category: "Family",
    content: "School trips are crucial for experiential learning. Beyond the textbooks, students gain real-world exposure, build teamwork skills, and develop independence. JustWravel's educational tours are meticulously crafted to align with curriculum goals while ensuring a fun, engaging experience. We incorporate cultural immersions, nature trails, and historical explorations into our school packages, guaranteeing a holistic educational journey.",
    images: ["https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop"],
    isFeatured: false,
  },
  {
    id: 4,
    title: "25 Best Places to Visit in India in September",
    description: "25 best places to visit in India in September, and you still haven't planned your trip? September is...",
    publishedAt: "20 Jul",
    readingTime: "16 minutes read",
    author: "Travel Desk",
    category: "Adventure",
    content: "September in India marks the beautiful transition from monsoon to autumn. The landscapes are lush green, the rivers are full, and the weather starts to cool down. If you haven't planned your trip yet, you're in for a treat. From the blooming Valley of Flowers in Uttarakhand to the serene backwaters of Kerala, India offers diverse experiences. In this comprehensive guide, we explore the top 25 destinations that are perfect for a September getaway. Discover hidden gems, adventure hubs, and tranquil retreats that will make your trip unforgettable.",
    images: ["https://images.unsplash.com/photo-1590118361008-6fb23d242cb6?q=80&w=800&auto=format&fit=crop"],
    isFeatured: true,
  }
];

const initialFaqData = [
  {
    id: 1,
    question: "Do I need a visa to travel to Bali?",
    answer:
      "For many nationalities, Indonesia offers a Visa on Arrival (VoA) or visa exemption for short stays. Please check the latest regulations for your specific passport before traveling.",
    category: "Bali"
  },
  {
    id: 2,
    question: "When is the BEST time for your Bali trip?",
    answer:
      "The best time to visit Bali is during the dry season, from April to October. You'll experience less rain, lower humidity, and plenty of sunshine.",
    category: "Bali"
  },
  {
    id: 3,
    question: "What are some must-visit attractions in Bali?",
    answer:
      "Some must-visit places include Uluwatu Temple, Tanah Lot, the Tegalalang Rice Terrace in Ubud, and the beautiful beaches of Seminyak and Nusa Dua.",
    category: "Bali"
  },
  {
    id: 4,
    question: "Is it safe to drink tap water in Bali?",
    answer:
      "No, it is not recommended to drink tap water in Bali. Always use bottled or filtered water for drinking and brushing your teeth.",
    category: "Bali"
  },
  {
    id: 5,
    question: "What is the best time to visit Maldives?",
    answer:
      "The best time to visit the Maldives is between November and April, outside of the monsoon season. During this time, the weather is warm and dry.",
    category: "Maldives"
  },
  {
    id: 6,
    question: "What is the cancellation policy?",
    answer:
      "Our cancellation policy depends on the specific package and timing. Generally, cancellations made 30 days prior to departure receive a full refund minus processing fees.",
    category: "Cancellations & Refunds"
  },
  {
    id: 7,
    question: "How to use our booking portal?",
    answer:
      "Simply browse through our destinations, select a package that fits your needs, and use our secure booking portal to complete your payment.",
    category: "General"
  },
];

const initialHeaderCategories = [
  { 
    id: 101, 
    label: "Group Trips", 
    slug: "group-trips",
    tagline: "Travel Together",
    desc: "Join an exciting group trip and explore the best destinations with amazing people. Make new friends and create unforgettable memories.",
    images: ["https://images.unsplash.com/photo-1529156069898-49953eb1b5b4?auto=format&fit=crop&q=80&w=800"],
    itineraries: []
  },
  { 
    id: 102, 
    label: "Customized Trips", 
    slug: "customized-trips",
    tagline: "Tailor-made Journeys",
    desc: "Design your own itinerary and travel exactly the way you want to. We craft personalized experiences based on your preferences.",
    images: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800"],
    itineraries: []
  },
  { 
    id: 103, 
    label: "Corporate Trips", 
    slug: "corporate-trips",
    tagline: "Team Building Escapes",
    desc: "Plan the perfect corporate retreat to foster teamwork and productivity. We handle everything from flights to team-building activities.",
    images: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"],
    itineraries: []
  },
];

const initialTripCategories = [
  { 
    id: 1, 
    label: "Honeymoon", 
    slug: "honeymoon",
    tagline: "Romantic Getaways",
    desc: "Experience the most romantic and unforgettable honeymoon destinations tailored just for you and your partner.",
    images: ["https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=200"],
    itineraries: []
  },
  { 
    id: 2, 
    label: "Solo Travel", 
    slug: "solo-travel",
    tagline: "Discover Yourself",
    desc: "Embark on a journey of self-discovery with our carefully curated solo travel packages designed for safety and adventure.",
    bannerGradient: "linear-gradient(160deg, #a18cd1 0%, #fbc2eb 100%)",
    images: ["https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=200"],
    itineraries: []
  },
  { 
    id: 3, 
    label: "Family Group", 
    slug: "family-group",
    tagline: "Memories Together",
    desc: "Create lasting memories with your loved ones. Family-friendly resorts, activities, and hassle-free travel arrangements.",
    bannerGradient: "linear-gradient(160deg, #84fab0 0%, #8fd3f4 100%)",
    images: ["https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=200"],
    itineraries: []
  },
  { 
    id: 4, 
    label: "Global Group", 
    slug: "global-group",
    tagline: "Explore the World",
    desc: "Join global group tours and travel with like-minded explorers to the most iconic destinations around the globe.",
    bannerGradient: "linear-gradient(160deg, #fccb90 0%, #d57eeb 100%)",
    images: ["https://images.unsplash.com/photo-1529156069898-49953eb1b5b4?auto=format&fit=crop&q=80&w=200"],
    itineraries: []
  },
  { 
    id: 5, 
    label: "Iconic International", 
    slug: "iconic-international",
    tagline: "World Wonders",
    desc: "Visit the most famous and sought-after international landmarks and cities for an iconic travel experience.",
    bannerGradient: "linear-gradient(160deg, #e0c3fc 0%, #8ec5fc 100%)",
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=200"],
    itineraries: []
  },
  { 
    id: 6, 
    label: "Discover Domestic", 
    slug: "discover-domestic",
    tagline: "Incredible India",
    desc: "Uncover the hidden gems and rich cultural heritage of domestic destinations right in your backyard.",
    bannerGradient: "linear-gradient(160deg, #f6d365 0%, #fda085 100%)",
    images: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=200"],
    itineraries: []
  },
];

const initialItinerariesData = [
  {
    id: "itin-1",
    title: "Taj Coral Reef",
    days: "6 Days 5 Nights",
    pickup: "Airport",
    transfers: "Included",
    budget: "₹50,000",
    rating: 5,
    images: ["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600"],
    type: "international",
    locations: ["Maldives"],
    categories: ["Honeymoon", "International"],
    description: "Luxury coral reef resort experience with all-inclusive dining, water sports, and a private beach villa.",
  },
  {
    id: "itin-2",
    title: "Oblu Select Sangeli",
    days: "6 Days 5 Nights",
    pickup: "Airport",
    transfers: "Included",
    budget: "₹50,000",
    rating: 5,
    images: ["https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=600"],
    type: "international",
    locations: ["Maldives"],
    categories: ["Honeymoon"],
    description: "All-inclusive Maldivian getaway with overwater villas, snorkeling excursions, and sunset cruises.",
  },
  {
    id: "itin-3",
    title: "Swiss Alps Explorer",
    days: "8 Days 7 Nights",
    pickup: "Zurich Airport",
    transfers: "Included",
    budget: "₹1,20,000",
    rating: 5,
    images: ["https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=600"],
    type: "international",
    locations: ["Switzerland"],
    categories: ["Solo Travel", "International"],
    description: "Scenic train journeys through the Alps, visits to Lucerne, Interlaken, and Jungfraujoch.",
  },
  {
    id: "itin-4",
    title: "North Goa Beach Bliss",
    days: "4 Days 3 Nights",
    pickup: "Goa Airport",
    transfers: "Included",
    budget: "₹15,000",
    rating: 4,
    images: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600"],
    type: "domestic",
    locations: ["Goa"],
    categories: ["Family Group", "Solo Travel"],
    description: "Explore the vibrant beaches of North Goa with water sports, beach shacks, and nightlife.",
  },
  {
    id: "itin-5",
    title: "Royal Rajasthan Circuit",
    days: "8 Days 7 Nights",
    pickup: "Jaipur Airport",
    transfers: "Included",
    budget: "₹32,000",
    rating: 5,
    images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=600"],
    type: "domestic",
    locations: ["Rajasthan"],
    categories: ["Family Group", "Global Group"],
    description: "Journey through the royal cities of Jaipur, Jodhpur, Udaipur, and the Thar Desert.",
  },
  {
    id: "itin-6",
    title: "Leh Pangong Lake Tour",
    days: "6 Days 5 Nights",
    pickup: "Leh Airport",
    transfers: "4x4 Included",
    budget: "₹28,000",
    rating: 5,
    images: ["https://images.unsplash.com/photo-1581793746485-04698e79a4e8?auto=format&fit=crop&q=80&w=600"],
    type: "domestic",
    locations: ["Ladakh"],
    categories: ["Solo Travel", "Global Group"],
    description: "High-altitude adventure through Khardung La, Nubra Valley, and the iconic Pangong Lake.",
  },
];

const initialGalleryData = [
  { id: 1, url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800", location: "Maldives", caption: "Crystal clear waters" },
  { id: 2, url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800", location: "Switzerland", caption: "Snow-capped Alps" },
  { id: 3, url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800", location: "Japan", caption: "Cherry blossoms in Kyoto" },
  { id: 4, url: "https://images.unsplash.com/photo-1476610287331-b711a628ea8e?auto=format&fit=crop&q=80&w=800", location: "Iceland", caption: "Northern lights" },
  { id: 5, url: "https://images.unsplash.com/photo-1502602898657-3e907614f010?auto=format&fit=crop&q=80&w=800", location: "France", caption: "Eiffel Tower" },
  { id: 6, url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800", location: "Italy", caption: "Venice canals" },
  { id: 7, url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800", location: "Goa", caption: "Sunset at the beach" },
  { id: 8, url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800", location: "Rajasthan", caption: "Desert safari" },
];

/* ═══════════════════════════════════════════════════════════════
   CONTEXT WITH LOCALSTORAGE SYNC
   ═══════════════════════════════════════════════════════════════ */

const SiteDataContext = createContext(null);

// Custom hook to sync state with localStorage across tabs
function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(defaultValue);

  // Load from localStorage on mount
  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);
    if (stickyValue !== null) {
      try {
        // eslint-disable-next-line
        setValue(JSON.parse(stickyValue));
      } catch (e) {
        console.error(`Error parsing localStorage for ${key}`, e);
      }
    }
  }, [key]);

  // Save to localStorage when state changes
  const setStickyValue = useCallback((newValue) => {
    setValue((prev) => {
      const finalValue = typeof newValue === 'function' ? newValue(prev) : newValue;
      window.localStorage.setItem(key, JSON.stringify(finalValue));
      return finalValue;
    });
  }, [key]);

  // Listen for changes from OTHER tabs via the 'storage' event
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        try {
          setValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage for ${key}`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [value, setStickyValue];
}

// Migrate old `image` string fields to `images` arrays for backward compatibility
function migrateImages(item) {
  if (!item) return item;
  const migrated = { ...item };
  if (typeof migrated.image === 'string' && migrated.image && !migrated.images) {
    migrated.images = [migrated.image];
  }
  // Also migrate nested itineraries inside explore destinations
  if (Array.isArray(migrated.itineraries)) {
    migrated.itineraries = migrated.itineraries.map(itin => migrateImages(itin));
  }
  return migrated;
}

function migrateArray(arr) {
  if (!Array.isArray(arr)) return arr;
  return arr.map(item => migrateImages(item));
}

export function SiteDataProvider({ children }) {
  const [hero, setHero] = useStickyState(initialHeroData, 'tripbuzzinga_hero');
  const [popularDestinations, setPopularDestinations] = useStickyState(initialPopularData, 'tripbuzzinga_popular');
  const [flyer, setFlyer] = useStickyState(initialFlyerData, 'tripbuzzinga_flyers_list');
  const [exploreInternational, setExploreInternational] = useStickyState(initialExploreIntl, 'tripbuzzinga_exploreIntl');
  const [exploreDomestic, setExploreDomestic] = useStickyState(initialExploreDom, 'tripbuzzinga_exploreDom');
  const [reviews, setReviews] = useStickyState(initialReviewsData, 'tripbuzzinga_reviews');
  const [faq, setFaq] = useStickyState(initialFaqData, 'tripbuzzinga_faq');
  const [blogs, setBlogs] = useStickyState(initialBlogsData, 'tripbuzzinga_blogs');
  const [headerCategories, setHeaderCategories] = useStickyState(initialHeaderCategories, 'tripbuzzinga_headerCategories');
  const [tripCategories, setTripCategories] = useStickyState(initialTripCategories, 'tripbuzzinga_categories');

  // (Legacy migration removed as header categories are now independent)

  const [itineraries, setItineraries] = useStickyState(initialItinerariesData, 'tripbuzzinga_itineraries');
  const [gallery, setGallery] = useStickyState(initialGalleryData, 'tripbuzzinga_gallery');

  // Auto-migrate old `image` fields to `images` arrays on mount
  useEffect(() => {
    const needsMigration = (arr) => Array.isArray(arr) && arr.some(item => item.image && !item.images);
    if (needsMigration(popularDestinations)) setPopularDestinations(migrateArray(popularDestinations));
    if (needsMigration(exploreInternational)) setExploreInternational(migrateArray(exploreInternational));
    if (needsMigration(exploreDomestic)) setExploreDomestic(migrateArray(exploreDomestic));
    if (needsMigration(itineraries)) setItineraries(migrateArray(itineraries));
    if (needsMigration(blogs)) setBlogs(migrateArray(blogs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    hero, setHero,
    popularDestinations, setPopularDestinations,
    flyer, setFlyer,
    exploreInternational, setExploreInternational,
    exploreDomestic, setExploreDomestic,
    reviews, setReviews,
    faq, setFaq,
    blogs, setBlogs,
    headerCategories, setHeaderCategories,
    tripCategories, setTripCategories,
    itineraries, setItineraries,
    gallery, setGallery,
  };

  // Fetch published data from Supabase on mount
  useEffect(() => {
    async function fetchPublishedData() {
      try {
        const res = await fetch(`/api/site-data?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const { data } = await res.json();
          if (data && Object.keys(data).length > 0) {
            // Overwrite local state with published data if it exists
            // (In a more complex app we'd compare timestamps to keep local drafts)
            if (data.hero) setHero(data.hero);
            if (data.popularDestinations) setPopularDestinations(data.popularDestinations);
            if (data.flyer) setFlyer(data.flyer);
            if (data.exploreInternational) setExploreInternational(data.exploreInternational);
            if (data.exploreDomestic) setExploreDomestic(data.exploreDomestic);
            if (data.reviews) setReviews(data.reviews);
            if (data.faq) setFaq(data.faq);
            if (data.blogs) setBlogs(data.blogs);
            if (data.headerCategories) setHeaderCategories(data.headerCategories);
            if (data.tripCategories) setTripCategories(data.tripCategories);
            if (data.itineraries) setItineraries(data.itineraries);
            if (data.gallery) setGallery(data.gallery);
          }
        }
      } catch (err) {
        console.error('Error fetching published site data:', err);
      }
    }
    // Only fetch if we are not the admin (simple heuristic: no local draft logic here, 
    // we fetch it, but if they save, it overwrites local storage).
    fetchPublishedData();
  }, []);

  const publishSiteData = async () => {
    try {
      const payload = {
        hero,
        popularDestinations,
        flyer,
        exploreInternational,
        exploreDomestic,
        reviews,
        faq,
        blogs,
        headerCategories,
        tripCategories,
        itineraries,
        gallery,
      };
      const res = await fetch('/api/site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to publish');
      return true;
    } catch (err) {
      console.error('Publish error:', err);
      return false;
    }
  };

  const contextValue = {
    ...value,
    publishSiteData,
  };

  return (
    <SiteDataContext.Provider value={contextValue}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
}
