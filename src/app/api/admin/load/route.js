import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET: Load all data from individual tables for the admin panel
export async function GET() {
  try {
    const [
      { data: heroRow },
      { data: blogs },
      { data: destinations },
      { data: reviews },
      { data: faqs },
      { data: galleryItems },
      { data: flyers },
      { data: categories },
      { data: itineraries },
    ] = await Promise.all([
      supabase.from('hero_settings').select('*').eq('id', 1).single(),
      supabase.from('blogs').select('*').order('sort_order', { ascending: true }),
      supabase.from('destinations').select('*').order('sort_order', { ascending: true }),
      supabase.from('reviews').select('*').order('sort_order', { ascending: true }),
      supabase.from('faqs').select('*').order('sort_order', { ascending: true }),
      supabase.from('gallery').select('*').order('sort_order', { ascending: true }),
      supabase.from('flyers').select('*').order('sort_order', { ascending: true }),
      supabase.from('categories').select('*').order('sort_order', { ascending: true }),
      supabase.from('itineraries').select('*').order('sort_order', { ascending: true }),
    ]);

    // Separate destinations by type
    const popularDestinations = (destinations || []).filter(d => d.dest_type === 'popular');
    const exploreInternational = (destinations || []).filter(d => d.dest_type === 'international');
    const exploreDomestic = (destinations || []).filter(d => d.dest_type === 'domestic');

    // Separate categories by type
    const headerCategories = (categories || []).filter(c => c.cat_type === 'header');
    const tripCategories = (categories || []).filter(c => c.cat_type === 'trip');

    // Convert DB column names back to the frontend camelCase format
    const convertBlog = (b) => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      image: b.image,
      images: b.images,
      author: b.author,
      publishedAt: b.published_at,
      readingTime: b.reading_time,
      category: b.category,
      description: b.description,
      content: b.content,
      isFeatured: b.is_featured,
      status: b.status,
      sort_order: b.sort_order,
    });

    const convertDestination = (d) => ({
      id: d.id,
      name: d.name,
      label: d.label,
      slug: d.slug,
      tagline: d.tagline,
      desc: d.description,
      images: d.images,
      itineraries: d.itineraries,
      city: d.city,
      flag: d.flag,
      duration: d.duration,
      title: d.title,
      price: d.price,
      highlights: d.highlights,
      type: d.type,
      status: d.status,
      sort_order: d.sort_order,
    });

    const convertReview = (r) => ({
      id: r.id,
      name: r.name,
      text: r.text,
      rating: r.rating,
      avatarInitial: r.avatar_initial,
      avatarBg: r.avatar_bg,
      tripName: r.trip_name,
      tripImage: r.trip_image,
      reviewLink: r.review_link,
      status: r.status,
      sort_order: r.sort_order,
    });

    const convertFaq = (f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category,
      status: f.status,
      sort_order: f.sort_order,
    });

    const convertGallery = (g) => ({
      id: g.id,
      url: g.url,
      caption: g.caption,
      location: g.location,
      status: g.status,
      sort_order: g.sort_order,
    });

    const convertFlyer = (f) => ({
      id: f.id,
      title: f.title,
      subtitle: f.subtitle,
      badge: f.badge,
      discountLabel: f.discount_label,
      discountAmount: f.discount_amount,
      images: f.images,
      linkUrl: f.link_url,
      status: f.status,
      sort_order: f.sort_order,
    });

    const convertCategory = (c) => ({
      id: c.id,
      label: c.label,
      slug: c.slug,
      tagline: c.tagline,
      desc: c.description,
      images: c.images,
      itineraries: c.itineraries,
      status: c.status,
      sort_order: c.sort_order,
    });

    const convertItinerary = (it) => ({
      id: it.id,
      title: it.title,
      days: it.days,
      pickup: it.pickup,
      transfers: it.transfers,
      budget: it.budget,
      rating: it.rating,
      images: it.images,
      type: it.type,
      locations: it.locations,
      categories: it.categories,
      overview: it.overview,
      description: it.description,
      detailedDays: it.detailed_days,
      inclusions: it.inclusions,
      exclusions: it.exclusions,
      status: it.status,
      sort_order: it.sort_order,
    });

    return NextResponse.json({
      hero: heroRow?.data || { backgroundImage: '', heading: '', subheading: '', stats: [], reviews: [], destinations: [] },
      blogs: (blogs || []).map(convertBlog),
      popularDestinations: popularDestinations.map(convertDestination),
      exploreInternational: exploreInternational.map(convertDestination),
      exploreDomestic: exploreDomestic.map(convertDestination),
      reviews: (reviews || []).map(convertReview),
      faq: (faqs || []).map(convertFaq),
      gallery: (galleryItems || []).map(convertGallery),
      flyer: (flyers || []).map(convertFlyer),
      headerCategories: headerCategories.map(convertCategory),
      tripCategories: tripCategories.map(convertCategory),
      itineraries: (itineraries || []).map(convertItinerary),
    });
  } catch (err) {
    console.error('Admin load error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
