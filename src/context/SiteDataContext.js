"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

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

/**
 * Helper: read localStorage synchronously (safe for SSR — returns null on server).
 */
function readLocalStorage(key) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Custom hook that reads localStorage **synchronously on first render**
 * so the very first paint already contains real data (no flash).
 */
function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const stored = readLocalStorage(key);
    return stored !== null ? stored : defaultValue;
  });

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

  // Track whether the Supabase fetch has completed
  const [isReady, setIsReady] = useState(() => {
    // If localStorage already has data, we can show immediately
    return readLocalStorage('tripbuzzinga_hero') !== null;
  });

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
    isReady,
  };

  // Fetch published data from Supabase on mount
  useEffect(() => {
    async function fetchPublishedData() {
      try {
        const res = await fetch(`/api/site-data?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const { data } = await res.json();
          if (data && Object.keys(data).length > 0) {
            // Check if user is in admin mode (has unsaved drafts)
            const isAdminMode = typeof window !== 'undefined' && window.localStorage.getItem("tripbuzzinga_admin_mode") === "true";
            
            if (isAdminMode) {
              console.log("Admin mode active: preserving local drafts instead of overwriting with live data.");
              setIsReady(true);
              return;
            }

            // Overwrite local state with published data if it exists
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
      } finally {
        setIsReady(true);
      }
    }
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
