import { PostgrestError } from '@supabase/supabase-js';
import { addUserToDB, getUserIdByName, getUserPasswordHash } from '../db/userQueries'
import { getAllStopsDB, getStopByIdDB, addStopDB} from '../db/stopsQueries';
import { er } from 'vue-router/dist/index-D7ja2BKs.js';

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

// returns the http status code

export async function addStop(name: string): Promise<number>{
    try{
        const response : PostgrestError | void =  await addStopDB(name);
        
        if(response == undefined){
            return 201;
        }else{
            console.log("ERROR database:" + response.hint)
            console.log("ERROR database:" + response.cause)
            console.log("ERROR database:" + response.code)
            console.log("ERROR database:" + response.message)
            console.error("ERROR database: " + response);
            return 400
        }

    }catch(err){
        console.error("failed to get stop: ", err);        
        return 400;
    }
}



