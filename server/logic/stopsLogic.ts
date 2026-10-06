import { PostgrestError } from '@supabase/supabase-js';
import { addUserToDB, getUserIdByName, getUserPasswordHash } from '../db/userQueries'
import { getAllStops, getStopById } from '../db/stopsQueries';

export async function listStops(){
    try{
        return await getAllStops();
    }catch(err){
        console.error("failed to get stops: ", err);
        return null;
    }
}

// returns the stop, null if it doesn't exist, or undefined if the db call failed
export async function getStop(id: number){
    try{
        return await getStopById(id);
    }catch(err){
        console.error("failed to get stop: ", err);
        return undefined;
    }
}
