import { PostgrestError } from '@supabase/supabase-js';
import { addUserToDB, getUserIdByName, getUserPasswordHash } from '../db/userQueries'
import { getAllStops } from '../db/stopsQueries';

export async function listStops(){
    try{
        return await getAllStops();
    }catch(err){
        console.error("failed to get stops: ", err);
        return null;
    }
}

