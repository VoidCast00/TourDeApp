import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from './client'
import type { StopInput } from '@shared/types';


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
export async function addStopDB(stop:StopInput){
  const { data, error } = await supabase
    .from("stops")
    .insert(stop)
    .select()
    .single() //insert always makes exactly one row

  if (error) { throw error }
  return data;
}

export async function updateStopDB(id:number, stop:StopInput){
  const {data, error} = await supabase
  .from("stops")
  .update(stop)
  .eq("id",id)
  .select()
  .maybeSingle() //null when no row has this id

  if (error){throw error}
  return data;
}


export async function deleteStopDB(id :number){
  const{data, error} = await supabase
  .from("stops")
  .delete()
  .eq("id", id)
  .select()
  .maybeSingle()

  if (error) {throw error}
  return data;
}