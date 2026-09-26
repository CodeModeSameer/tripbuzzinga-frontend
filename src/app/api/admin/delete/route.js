import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// DELETE: Remove an item from its specific Supabase table
export async function POST(request) {
  try {
    const { table, id } = await request.json();

    if (!table || !id) {
      return NextResponse.json({ error: 'Missing table or id' }, { status: 400 });
    }

    // Map frontend table names to DB table names
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

    const { error } = await supabase.from(dbTable).delete().eq('id', id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Admin delete error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
