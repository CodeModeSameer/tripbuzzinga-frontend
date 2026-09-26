import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST: Aggregate all data from individual tables and publish to site_data
export async function POST() {
  try {
    // Load everything from individual tables
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

    // Convert DB rows back to the frontend format expected by site_data
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
    });

    const convertFaq = (f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category,
    });

    const convertGallery = (g) => ({
      id: g.id,
      url: g.url,
      caption: g.caption,
      location: g.location,
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
    });

    const convertCategory = (c) => ({
      id: c.id,
      label: c.label,
      slug: c.slug,
      tagline: c.tagline,
      desc: c.description,
      images: c.images,
      itineraries: c.itineraries,
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
    });

    // Build the aggregated payload (same structure as old site_data)
    const payload = {
      hero: heroRow?.data || {},
      blogs: (blogs || []).map(convertBlog),
      popularDestinations: (destinations || []).filter(d => d.dest_type === 'popular').map(convertDestination),
      exploreInternational: (destinations || []).filter(d => d.dest_type === 'international').map(convertDestination),
      exploreDomestic: (destinations || []).filter(d => d.dest_type === 'domestic').map(convertDestination),
      reviews: (reviews || []).map(convertReview),
      faq: (faqs || []).map(convertFaq),
      gallery: (galleryItems || []).map(convertGallery),
      flyer: (flyers || []).map(convertFlyer),
      headerCategories: (categories || []).filter(c => c.cat_type === 'header').map(convertCategory),
      tripCategories: (categories || []).filter(c => c.cat_type === 'trip').map(convertCategory),
      itineraries: (itineraries || []).map(convertItinerary),
    };

    // Upsert to site_data (the live snapshot)
    const { error } = await supabase
      .from('site_data')
      .upsert({
        id: 1,
        data: payload,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Published to live site!' });
  } catch (err) {
    console.error('Publish error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
