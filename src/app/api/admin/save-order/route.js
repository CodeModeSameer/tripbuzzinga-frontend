import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { table, items } = await request.json();

    if (!table || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Missing table or items array' }, { status: 400 });
    }

    const tableMap = {
      'blogs': 'blogs',
      'popular': 'destinations',
      'explore': 'destinations',
      'reviews': 'reviews',
      'faq': 'faqs',
      'gallery': 'gallery',
      'flyer': 'flyers',
      'header-categories': 'categories',
      'trip-categories': 'categories',
      'itineraries': 'itineraries',
    };

    const dbTable = tableMap[table];
    if (!dbTable) {
      return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 400 });
    }

    // We only want to update the sort_order of these items, but upsert requires the primary key.
    // Ensure all items have an id.
    const validItems = items.filter(item => item.id);
    if (validItems.length === 0) return NextResponse.json({ success: true });

    // Build promises to update sort_order for each item.
    // Instead of upserting (which might overwrite other fields with nulls if we don't fetch them first), 
    // it's safer to run individual updates for sort_order.
    const updatePromises = validItems.map(item => 
      supabase.from(dbTable).update({ sort_order: item.sort_order }).eq('id', item.id)
    );

    const results = await Promise.all(updatePromises);
    const errors = results.filter(r => r.error).map(r => r.error.message);

    if (errors.length > 0) {
      return NextResponse.json({ error: 'Failed to update some orders', details: errors }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Admin save-order error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
