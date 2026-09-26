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
  destinations: [],
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
   CONTEXT
   ═══════════════════════════════════════════════════════════════ */

const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [hero, setHero] = useState(initialHeroData);
  const [popularDestinations, setPopularDestinations] = useState(initialPopularData);
  const [flyer, setFlyer] = useState(initialFlyerData);
  const [exploreInternational, setExploreInternational] = useState(initialExploreIntl);
  const [exploreDomestic, setExploreDomestic] = useState(initialExploreDom);
  const [reviews, setReviews] = useState(initialReviewsData);
  const [faq, setFaq] = useState(initialFaqData);
  const [blogs, setBlogs] = useState(initialBlogsData);
  const [headerCategories, setHeaderCategories] = useState(initialHeaderCategories);
  const [tripCategories, setTripCategories] = useState(initialTripCategories);
  const [itineraries, setItineraries] = useState(initialItinerariesData);
  const [gallery, setGallery] = useState(initialGalleryData);

  // Track whether data fetch has completed
  const [isReady, setIsReady] = useState(false);

  // ─── LIVE SITE: Fetch published data from site_data snapshot ───
  useEffect(() => {
    async function fetchPublishedData() {
      try {
        const res = await fetch(`/api/site-data?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const { data } = await res.json();
          if (data && Object.keys(data).length > 0) {
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

  // ─── ADMIN: Load all data from individual tables ───
  const loadAdminData = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/load?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load admin data');
      const data = await res.json();
      
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
      
      return true;
    } catch (err) {
      console.error('Error loading admin data:', err);
      return false;
    }
  }, []);

  // ─── ADMIN: Save a single item to its individual table ───
  const saveItemToDb = useCallback(async (table, data, isNew = false) => {
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, data, isNew }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Save failed');
      }
      const result = await res.json();
      return result; // { success: true, id: "uuid" }
    } catch (err) {
      console.error('Save error:', err);
      return { success: false, error: err.message };
    }
  }, []);

  // ─── ADMIN: Delete an item from its individual table ───
  const deleteItemFromDb = useCallback(async (table, id) => {
    try {
      const res = await fetch('/api/admin/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, id }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Delete failed');
      }
      return { success: true };
    } catch (err) {
      console.error('Delete error:', err);
      return { success: false, error: err.message };
    }
  }, []);

  // ─── ADMIN: Publish all data to site_data snapshot ───
  const publishSiteData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Publish failed');
      }
      return true;
    } catch (err) {
      console.error('Publish error:', err);
      return false;
    }
  }, []);

  const contextValue = {
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
    // Admin functions
    loadAdminData,
    saveItemToDb,
    deleteItemFromDb,
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
