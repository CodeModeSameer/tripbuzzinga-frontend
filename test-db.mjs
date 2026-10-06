import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  const { data: destinations } = await supabase.from('destinations').select('id, name, sort_order').order('sort_order', { ascending: true });
  console.log('--- Draft Destinations (First 5) ---');
  console.log(destinations.slice(0, 5));

  const { data: siteData } = await supabase.from('site_data').select('data, updated_at').eq('id', 1).single();
  console.log('\n--- Live Site Data (Updated at: ' + siteData.updated_at + ') ---');
  console.log('Popular Destinations count:', siteData.data.popularDestinations?.length);
  if (siteData.data.popularDestinations?.length > 0) {
    console.log('First popular destination:', siteData.data.popularDestinations[0].name);
  }
}

checkData();
