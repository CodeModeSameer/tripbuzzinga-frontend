"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   INITIAL DATA — single source of truth for the entire site
   ═══════════════════════════════════════════════════════════════ */

const initialHeroData = {
  backgroundImage: "",
  heading: "",
  subheading: "",
  stats: [],
  reviews: [],
};

const initialPopularData = [];

const initialFlyerData = [];

const initialExploreIntl = [];

const initialExploreDom = [];

const initialReviewsData = [];

const initialBlogsData = [];

const initialFaqData = [];

const initialHeaderCategories = [];

const initialTripCategories = [];

const initialItinerariesData = [];

const initialGalleryData = [];

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
  const [hero, setHero] = useStickyState(initialHeroData, 'tripbuzzinga_hero_v2');
  const [popularDestinations, setPopularDestinations] = useStickyState(initialPopularData, 'tripbuzzinga_popular_v2');
  const [flyer, setFlyer] = useStickyState(initialFlyerData, 'tripbuzzinga_flyers_list_v2');
  const [exploreInternational, setExploreInternational] = useStickyState(initialExploreIntl, 'tripbuzzinga_exploreIntl_v2');
  const [exploreDomestic, setExploreDomestic] = useStickyState(initialExploreDom, 'tripbuzzinga_exploreDom_v2');
  const [reviews, setReviews] = useStickyState(initialReviewsData, 'tripbuzzinga_reviews_v2');
  const [faq, setFaq] = useStickyState(initialFaqData, 'tripbuzzinga_faq_v2');
  const [blogs, setBlogs] = useStickyState(initialBlogsData, 'tripbuzzinga_blogs_v2');
  const [headerCategories, setHeaderCategories] = useStickyState(initialHeaderCategories, 'tripbuzzinga_headerCategories_v2');
  const [tripCategories, setTripCategories] = useStickyState(initialTripCategories, 'tripbuzzinga_categories_v2');

  const [itineraries, setItineraries] = useStickyState(initialItinerariesData, 'tripbuzzinga_itineraries_v2');
  const [gallery, setGallery] = useStickyState(initialGalleryData, 'tripbuzzinga_gallery_v2');

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
