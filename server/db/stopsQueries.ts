import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from './client'



export async function getAllStops() {
  const { data, error } = await supabase
    .from("stops")
    .select("*")
    .order("id")

  if (error) { throw error }
  return data;
}