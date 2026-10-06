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

export async function getStopById(id: number) {
  const { data, error } = await supabase
    .from("stops")
    .select("*")
    .eq("id", id)
    .maybeSingle() //null instead of error when no row matches

  if (error) { throw error }
  return data;
}
