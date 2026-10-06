// this is the user logic (hashing, checking passwords), routes call this and this calls db/
import argon2 from 'argon2';
import { PostgrestError } from '@supabase/supabase-js';
import { addUserToDB, getUserIdByName, getUserPasswordHash } from '../db/userQueries'


// returns the http status code
export async function addUser(name: string, password: string): Promise<number> {
  //DUCPLICATE CHEK NEEDED
  const passwordHash = await argon2.hash(password);
  const response: PostgrestError | void = await addUserToDB(name, passwordHash)
  if (response == undefined) {
    return 201;
  } else {
    console.log("ERROR database:" + response)
    return 400
  }
}



export async function loginUser(name: string, password: string): Promise<number> {
  const userID: string | void = await getUserIdByName(name);
  console.log(userID)
  if (userID === undefined) { return 401; }  //Invalid
  console.log(userID);
  const passwordHash: string | void = await getUserPasswordHash(userID);
  if (passwordHash == undefined) { return 401; } // invalid
  let passCorect: boolean = await argon2.verify(passwordHash, password);
  if (passCorect) {
    return 200
  } else {
    return 401 //invalid
  }
}
