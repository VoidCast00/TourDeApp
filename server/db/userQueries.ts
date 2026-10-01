import { PostgrestError } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { supabase } from './client'

export async function getUserPasswordHash(id: string): Promise<string|void> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("password")
      .eq("id", id)
      .single()

    if (error) { throw error }
    return String(data.password);
  } catch (err) {
    console.error("failed to get password hash: ", err);
  }
}

export async function getUserNameById(id: string): Promise<string|void> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("name")
      .eq("id", id)
      .single()

    if (error) { throw new Error("error") }
    return String(data.name);
  } catch (err) {
    console.error("failed to get username by id: ", err)
  }
}

export async function getUserIdByName(name: string): Promise<string> {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("name", name)
    .single()

  if (error) { throw error }
  return String(data.id);
}

export async function addUserToDB(username: string, password: string): Promise<PostgrestError|void> {
  const { error } = await supabase
    .from("users")
    .insert({ id: randomUUID(), name: username, password: password })

  if (error) { return error }
}
