import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// GET: Fetch all leads (for admin panel)
export async function GET() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST: Save a new lead (from visitor popup form)
export async function POST(request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from('leads')
    .insert([{
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      country_code: body.countryCode,
      phone: body.phone,
      details: body.details,
      source: body.source || 'popup',
    }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, lead: data?.[0] });
}
