import { PostgrestError } from '@supabase/supabase-js';
import { addUserToDB, getUserIdByName, getUserPasswordHash } from '../db/userQueries'
import { getAllStopsDB, getStopByIdDB, addStopDB, updateStopDB, deleteStopDB} from '../db/stopsQueries';
import type { NewStop } from '../schema/stops'

export async function getAllStops(){
    try{
        return await getAllStopsDB();
    }catch(err){
        console.error("failed to get stops: ", err);
        return null;
    }
}

// returns the stop, null if it doesn't exist or undefined if the db call failed
export async function getStopById(id: number){
    try{
        return await getStopByIdDB(id);
    }catch(err){
        console.error("failed to get stop: ", err);
        return undefined;
    }
}

// returns the new stop or undefined if the db call failed
export async function addStop(stop:NewStop){
    try{
        return await addStopDB(stop);
    }catch(err){
        console.error("failed to add stop: ", err);
        return undefined;
    }
}

// returns the updated stop, null if it doesn't exist or undefined if the db call failed
export async function updateStop(id:number, stop:NewStop){
    try{
        return await updateStopDB(id, stop);
    }catch(err){
        console.error("failed to update stop: ", err);
        return undefined;
    }
}


export async function deleteStop(id:number){
    try{
        return await deleteStopDB(id);
    }catch(err){
        console.error("failed to delete stop: ", err);
        return undefined;
    }
}
