import { createClient, PostgrestError } from '@supabase/supabase-js';
import {onMounted} from "vue";
import { type User } from '@shared/types'
import { useToast } from 'vue-toast-notification'
import { randomUUID } from 'crypto';
import { Console } from 'console';
const toast = useToast()
// //@todo CHANGE BERFORE PUSH
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
}

const supabase = createClient(supabaseUrl, supabaseKey);



export async function getUserPasswordHash(id:string):Promise<string|void> {
    try{const{data,error} = await supabase
            .from("users")
            .select("password")
            .eq("id", id)
            .single()

        if (error) {throw error}
        console.log(data);
        return String(data.password);
      }catch (err) {
        console.error("failed to get password hash: ", err);

    }
}

export async function getUserNameById(id:string):Promise<string|void> {
    try{
    const{data,error} = await supabase
        .from("users")
        .select("name")
        .eq("id", id)
        .single()
    
    console.log(error)
    if (error) {throw new Error("error")}
    console.log("data", + data);
    return String(data.name);
    }catch (err) {
    console.error("failed to get username by id: ", err)
  }
}



export async function getUserIdByName( name:string):Promise<string> {
    const{data,error} = await supabase
        .from("users")
        .select("id")
        .eq("name", name)
        .single()

    if (error) {throw error}
    console.log(data);
    return String(data.id);
}




export async function addUserToDB(username: string, password: string): Promise<PostgrestError|void> {
    const { error } = await supabase
        .from("users")
        .insert({id: randomUUID(),name: username, password: password})

    if (error) {return error}

}




// export async function fetchUserById(videoType:string, id:number):Promise<User>  {
//     const { data, error } = await supabase
//             .from(videoType)
//             .select('*')
//             .eq('id', String(id)) //supabase can sometimes return int8 as string bz of its size
//             .single()

//     if (error){throw error;}
//     if (data) {return data;}
//     throw new Error("no data!!!");
// }

// export async function fetchAll(videoType: string): Promise<videoDB[]> {
//     const { data, error } = await supabase
//         .from(videoType)
//         .select('*')

//     if (error) {throw error;}
//     if (data) {return data;}
//     throw new Error('where is MY data????')




// export async function addCommentToDB(comments:Comment[], videoType: string,id:number ):Promise<void> {
//     const{error} = await supabase
//         .from(videoType)
//         .update({comments: comments})
//         .eq("id", id)

//     if (error) {throw error}
// }



