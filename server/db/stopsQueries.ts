import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from './client'



export async function getAllStopsDB() {
  const { data, error } = await supabase
    .from("stops")
    .select("*")
    .order("id")

  if (error) { throw error }
  return data;
}

export async function getStopByIdDB(id: number) {
  const { data, error } = await supabase
    .from("stops")
    .select("*")
    .eq("id", id)
    .maybeSingle() //null instead of error when no row matches

  if (error) { throw error }
  return data;
}
//====add later !!! ID position and so on!~!!!!
export async function addStopDB(name:string): Promise<PostgrestError|void> {
  const { error } = await supabase
    .from("stops")
    .insert({name: name})

  if (error) { return error }
}
