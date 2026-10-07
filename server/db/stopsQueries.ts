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
//====add later !!! position and so on!~!!!!
export async function addStopDB(name:string): Promise<PostgrestError|void> {
  const { error } = await supabase
    .from("stops")
    .insert({name: name, x: 10, y:10})

  if (error) { return error }
}

export async function updateStopDB(id:number, name:String){
  const {data, error} = await supabase
  .from("stops")
  .update({name: name})
  .eq("id",id)
  .select()
  .maybeSingle()

  if (error){throw error}
  return data
}
