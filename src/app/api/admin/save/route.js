import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST: Save an individual item to its specific Supabase table
export async function POST(request) {
  try {
    const { table, data, isNew } = await request.json();

    if (!table || !data) {
      return NextResponse.json({ error: 'Missing table or data' }, { status: 400 });
    }

    // Map frontend data to DB columns based on table type
    let dbRow;
    let dbTable;

    switch (table) {
      case 'hero': {
        dbTable = 'hero_settings';
        dbRow = { id: 1, data: data, updated_at: new Date().toISOString() };
        const { error } = await supabase.from(dbTable).upsert(dbRow);
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true, id: 1 });
      }

      case 'blogs': {
        dbTable = 'blogs';
        dbRow = {
          title: data.title || '',
          slug: data.slug || '',
          image: data.image || (Array.isArray(data.images) && data.images[0]) || '',
          images: data.images || [],
          author: data.author || '',
          published_at: data.publishedAt || '',
          reading_time: data.readingTime || '',
          category: data.category || '',
          description: data.description || '',
          content: data.content || '',
          is_featured: data.isFeatured || false,
          status: data.status || 'published',
          sort_order: data.sort_order ?? 0,
          updated_at: new Date().toISOString(),
        };
        break;
      }

      case 'popular':
      case 'explore': {
        dbTable = 'destinations';
        const destType = table === 'popular' ? 'popular' : (data._destType || 'international');
        dbRow = {
          name: data.name || data.title || '',
          label: data.label || '',
          slug: data.slug || '',
          tagline: data.tagline || '',
          description: data.desc || data.description || '',
          dest_type: destType,
          images: data.images || [],
          itineraries: data.itineraries || [],
          city: data.city || '',
          flag: data.flag || '',
          duration: data.duration || '',
          title: data.title || '',
          price: data.price || '',
          highlights: data.highlights || [],
          type: data.type || '',
          status: data.status || 'published',
          sort_order: data.sort_order ?? 0,
          updated_at: new Date().toISOString(),
        };
        break;
      }

      case 'reviews': {
        dbTable = 'reviews';
        dbRow = {
          name: data.name || '',
          text: data.text || '',
          rating: data.rating || 5,
          avatar_initial: data.avatarInitial || '',
          avatar_bg: data.avatarBg || '',
          trip_name: data.tripName || '',
          trip_image: data.tripImage || '',
          review_link: data.reviewLink || '',
          status: data.status || 'published',
          sort_order: data.sort_order ?? 0,
          updated_at: new Date().toISOString(),
        };
        break;
      }

      case 'faq': {
        dbTable = 'faqs';
        dbRow = {
          question: data.question || '',
          answer: data.answer || '',
          category: data.category || '',
          status: data.status || 'published',
          sort_order: data.sort_order ?? 0,
          updated_at: new Date().toISOString(),
        };
        break;
      }

      case 'gallery': {
        dbTable = 'gallery';
        dbRow = {
          url: data.url || '',
          caption: data.caption || '',
          location: data.location || '',
          status: data.status || 'published',
          sort_order: data.sort_order ?? 0,
          updated_at: new Date().toISOString(),
        };
        break;
      }

      case 'flyer': {
        dbTable = 'flyers';
        dbRow = {
          title: data.title || '',
          subtitle: data.subtitle || '',
          badge: data.badge || '',
          discount_label: data.discountLabel || '',
          discount_amount: data.discountAmount || '',
          images: data.images || [],
          link_url: data.linkUrl || '',
          status: data.status || 'published',
          sort_order: data.sort_order ?? 0,
          updated_at: new Date().toISOString(),
        };
        break;
      }

      case 'header-categories':
      case 'trip-categories': {
        dbTable = 'categories';
        dbRow = {
          label: data.label || '',
          slug: data.slug || '',
          cat_type: table === 'header-categories' ? 'header' : 'trip',
          tagline: data.tagline || '',
          description: data.desc || data.description || '',
          images: data.images || [],
          itineraries: data.itineraries || [],
          status: data.status || 'published',
          sort_order: data.sort_order ?? 0,
          updated_at: new Date().toISOString(),
        };
        break;
      }

      case 'itineraries': {
        dbTable = 'itineraries';
        dbRow = {
          title: data.title || '',
          days: data.days || '',
          pickup: data.pickup || '',
          transfers: data.transfers || '',
          budget: data.budget || '',
          rating: data.rating || 5,
          images: data.images || [],
          type: data.type || 'domestic',
          locations: data.locations || [],
          categories: data.categories || [],
          overview: data.overview || '',
          description: data.description || '',
          detailed_days: data.detailedDays || [],
          inclusions: data.inclusions || [],
          exclusions: data.exclusions || [],
          status: data.status || 'published',
          sort_order: data.sort_order ?? 0,
          updated_at: new Date().toISOString(),
        };
        break;
      }

      default:
        return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 400 });
    }

    // If editing existing item (has UUID id), update it. Otherwise insert new.
    if (data.id && !isNew) {
      dbRow.id = data.id;
      const { error } = await supabase.from(dbTable).upsert(dbRow);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true, id: data.id });
    } else {
      // Insert new row - let Supabase generate UUID
      const { data: inserted, error } = await supabase.from(dbTable).insert(dbRow).select('id').single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true, id: inserted.id });
    }
  } catch (err) {
    console.error('Admin save error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
