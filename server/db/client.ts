// this is the one supabase client everybody in db/ shares
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '../config'

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
