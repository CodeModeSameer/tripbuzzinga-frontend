import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET: Fetch published site data
export async function GET() {
  const { data, error } = await supabase
    .from('site_data')
    .select('data, updated_at')
    .eq('id', 1)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST: Publish (upsert) site data
export async function POST(request) {
  const body = await request.json();

  const { error } = await supabase
    .from('site_data')
    .upsert({
      id: 1,
      data: body,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
