import { Elysia, status, t } from 'elysia';
import { type User } from '@shared/types'
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import {addUserToDB, getUserIdByName, getUserNameById, getUserPasswordHash} from './supabase'
import { PostgrestError } from '@supabase/supabase-js';



const users: User[] = []
const PASSWORD_MIN_LENGTH = 8;
const JWT_SECRET = process.env.JWT_SECRET




async function addUser(name: string, password: string): Promise<number> {
  //DUCPLICATE CHEK NEEDED
  const passwordHash = await argon2.hash(password);
  const response: PostgrestError|void = await addUserToDB(name, passwordHash)
  if (response == undefined){
    return 201;
  }else{
    console.log("ERROR database:" + response)
    return 400
  }
}

async function loginUser(name: string, password: string): Promise<number> {
  const userID : string|void  = await getUserIdByName(name);
  console.log(userID)
  if(userID === undefined){return 401;}  //Invalid 
  console.log(userID);
  const passwordHash :string|void = await getUserPasswordHash(userID);
  if(passwordHash == undefined){return 401;} // invalid
  let passCorect : boolean = await argon2.verify(passwordHash, password);
  if (passCorect){
    return 200
  }else{
    return 401 //invalid
  }
}


new Elysia()
  .get("/api/v1/users", () =>{
    return  users.map(users => users.name);
  })
  .get("/api/v1/health", () => ({ status: 'ok' }))

 //================================================ REGISTER a user
  .post("/api/v1/register", async ({ body, set }) => {
    set.status =  await addUser(body.name, body.password);
    return
    
  }, {
    body: t.Object({
      password: t.String({minLength:PASSWORD_MIN_LENGTH}),
      name: t.String(),
    })
  })
//=============================================REMOVE user




//===============================================LOGIN user
  .post('/api/v1/login', async ({ body, set }) => {
    set.status  = await loginUser(body.name, body.password)
    return
  }, {
    body: t.Object({
      password: t.String(),
      name: t.String(),
    })
  })




  .listen(Number(process.env.PORT) || 3000)


  