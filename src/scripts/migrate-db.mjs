// Migration script - creates tables and migrates existing data
// Run with: node src/scripts/migrate-db.mjs

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://irqxmiztewmdykmwuref.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycXhtaXp0ZXdtZHlrbXd1cmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MTQ2NTQsImV4cCI6MjEwNTM5MDY1NH0.rccEm880sU0dRci-6ckkALrv8VhjyUMfR9A7JUJYCPk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrate() {
  console.log('Starting migration...');
  
  // Step 1: Read existing site_data
  const { data: siteRow, error: fetchError } = await supabase
    .from('site_data')
    .select('data')
    .eq('id', 1)
    .single();

  if (fetchError) {
    console.error('Failed to read site_data:', fetchError.message);
    return;
  }

  const siteData = siteRow?.data || {};
  console.log('Got site_data. Keys:', Object.keys(siteData).join(', '));

  // Hero settings
  if (siteData.hero) {
    const { error } = await supabase
      .from('hero_settings')
      .upsert({ id: 1, data: siteData.hero, updated_at: new Date().toISOString() });
    console.log(error ? `hero_settings ERROR: ${error.message}` : 'hero_settings OK');
  }

  // Blogs
  if (Array.isArray(siteData.blogs) && siteData.blogs.length > 0) {
    const rows = siteData.blogs.map((b, i) => ({
      title: b.title || '',
      slug: b.slug || '',
      image: b.image || (Array.isArray(b.images) && b.images[0]) || '',
      images: b.images || [],
      author: b.author || '',
      published_at: b.publishedAt || '',
      reading_time: b.readingTime || '',
      category: b.category || '',
      description: b.description || '',
      content: b.content || '',
      is_featured: b.isFeatured || false,
      status: 'published',
      sort_order: i,
    }));
    const { error } = await supabase.from('blogs').insert(rows);
    console.log(error ? `blogs ERROR: ${error.message}` : `${rows.length} blogs OK`);
  }

  // Popular destinations
  if (Array.isArray(siteData.popularDestinations) && siteData.popularDestinations.length > 0) {
    const rows = siteData.popularDestinations.map((d, i) => ({
      name: d.title || d.name || '',
      label: d.label || '',
      slug: d.slug || '',
      tagline: d.tagline || '',
      description: d.desc || d.description || '',
      dest_type: 'popular',
      images: d.images || (d.image ? [d.image] : []),
      itineraries: d.itineraries || [],
      city: d.city || '',
      flag: d.flag || '',
      duration: d.duration || '',
      title: d.title || '',
      price: d.price || '',
      highlights: d.highlights || [],
      type: d.type || '',
      status: 'published',
      sort_order: i,
    }));
    const { error } = await supabase.from('destinations').insert(rows);
    console.log(error ? `popular ERROR: ${error.message}` : `${rows.length} popular OK`);
  }

  // International destinations
  if (Array.isArray(siteData.exploreInternational) && siteData.exploreInternational.length > 0) {
    const rows = siteData.exploreInternational.map((d, i) => ({
      name: d.name || '',
      slug: d.slug || '',
      tagline: d.tagline || '',
      description: d.desc || d.description || '',
      dest_type: 'international',
      images: d.images || (d.image ? [d.image] : []),
      itineraries: d.itineraries || [],
      status: 'published',
      sort_order: i,
    }));
    const { error } = await supabase.from('destinations').insert(rows);
    console.log(error ? `international ERROR: ${error.message}` : `${rows.length} international OK`);
  }

  // Domestic destinations
  if (Array.isArray(siteData.exploreDomestic) && siteData.exploreDomestic.length > 0) {
    const rows = siteData.exploreDomestic.map((d, i) => ({
      name: d.name || '',
      slug: d.slug || '',
      tagline: d.tagline || '',
      description: d.desc || d.description || '',
      dest_type: 'domestic',
      images: d.images || (d.image ? [d.image] : []),
      itineraries: d.itineraries || [],
      status: 'published',
      sort_order: i,
    }));
    const { error } = await supabase.from('destinations').insert(rows);
    console.log(error ? `domestic ERROR: ${error.message}` : `${rows.length} domestic OK`);
  }

  // Reviews
  if (Array.isArray(siteData.reviews) && siteData.reviews.length > 0) {
    const rows = siteData.reviews.map((r, i) => ({
      name: r.name || '',
      text: r.text || '',
      rating: r.rating || 5,
      avatar_initial: r.avatarInitial || '',
      avatar_bg: r.avatarBg || '',
      trip_name: r.tripName || '',
      trip_image: r.tripImage || '',
      review_link: r.reviewLink || '',
      status: 'published',
      sort_order: i,
    }));
    const { error } = await supabase.from('reviews').insert(rows);
    console.log(error ? `reviews ERROR: ${error.message}` : `${rows.length} reviews OK`);
  }

  // FAQs
  if (Array.isArray(siteData.faq) && siteData.faq.length > 0) {
    const rows = siteData.faq.map((f, i) => ({
      question: f.question || '',
      answer: f.answer || '',
      category: f.category || '',
      status: 'published',
      sort_order: i,
    }));
    const { error } = await supabase.from('faqs').insert(rows);
    console.log(error ? `faqs ERROR: ${error.message}` : `${rows.length} faqs OK`);
  }

  // Gallery
  if (Array.isArray(siteData.gallery) && siteData.gallery.length > 0) {
    const rows = siteData.gallery.map((g, i) => ({
      url: g.url || '',
      caption: g.caption || '',
      location: g.location || '',
      status: 'published',
      sort_order: i,
    }));
    const { error } = await supabase.from('gallery').insert(rows);
    console.log(error ? `gallery ERROR: ${error.message}` : `${rows.length} gallery OK`);
  }

  // Flyers
  if (Array.isArray(siteData.flyer) && siteData.flyer.length > 0) {
    const rows = siteData.flyer.map((f, i) => ({
      title: f.title || '',
      subtitle: f.subtitle || '',
      badge: f.badge || '',
      discount_label: f.discountLabel || '',
      discount_amount: f.discountAmount || '',
      images: f.images || [],
      link_url: f.linkUrl || '',
      status: 'published',
      sort_order: i,
    }));
    const { error } = await supabase.from('flyers').insert(rows);
    console.log(error ? `flyers ERROR: ${error.message}` : `${rows.length} flyers OK`);
  }

  // Header categories
  if (Array.isArray(siteData.headerCategories) && siteData.headerCategories.length > 0) {
    const rows = siteData.headerCategories.map((c, i) => ({
      label: c.label || '',
      slug: c.slug || '',
      cat_type: 'header',
      tagline: c.tagline || '',
      description: c.desc || c.description || '',
      images: c.images || [],
      itineraries: c.itineraries || [],
      status: 'published',
      sort_order: i,
    }));
    const { error } = await supabase.from('categories').insert(rows);
    console.log(error ? `header categories ERROR: ${error.message}` : `${rows.length} header categories OK`);
  }

  // Trip categories
  if (Array.isArray(siteData.tripCategories) && siteData.tripCategories.length > 0) {
    const rows = siteData.tripCategories.map((c, i) => ({
      label: c.label || '',
      slug: c.slug || '',
      cat_type: 'trip',
      tagline: c.tagline || '',
      description: c.desc || c.description || '',
      images: c.images || [],
      itineraries: c.itineraries || [],
      status: 'published',
      sort_order: i,
    }));
    const { error } = await supabase.from('categories').insert(rows);
    console.log(error ? `trip categories ERROR: ${error.message}` : `${rows.length} trip categories OK`);
  }

  // Itineraries
  if (Array.isArray(siteData.itineraries) && siteData.itineraries.length > 0) {
    const rows = siteData.itineraries.map((it, i) => ({
      title: it.title || '',
      days: it.days || '',
      pickup: it.pickup || '',
      transfers: it.transfers || '',
      budget: it.budget || '',
      rating: it.rating || 5,
      images: it.images || [],
      type: it.type || 'domestic',
      locations: it.locations || [],
      categories: it.categories || [],
      overview: it.overview || '',
      description: it.description || '',
      detailed_days: it.detailedDays || [],
      inclusions: it.inclusions || [],
      exclusions: it.exclusions || [],
      status: 'published',
      sort_order: i,
    }));
    const { error } = await supabase.from('itineraries').insert(rows);
    console.log(error ? `itineraries ERROR: ${error.message}` : `${rows.length} itineraries OK`);
  }

  console.log('\nMigration complete! Verifying...');
  const tables = ['blogs', 'destinations', 'reviews', 'faqs', 'gallery', 'flyers', 'hero_settings', 'categories', 'itineraries'];
  for (const table of tables) {
    const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
    console.log(`  ${table}: ${count || 0} rows`);
  }
}

migrate().catch(console.error);
