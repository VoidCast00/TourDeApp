import { Elysia, status, t } from 'elysia';
import { type User } from '@shared/types'
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';



const users: User[] = [];
const PASSWORD_MIN_LENGTH = 8;
const JWT_SECRET = process.env.JWT_SECRET



async function addUser(name: string, password: string): Promise<User> {
  const passwordHash = await argon2.hash(password);
  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    passwordHash: passwordHash,
  };

  users.push(newUser);

  return newUser;
}
async function loginUser(name: string, password: string): Promise<boolean> {
  const user  = users.find((user) => user.name.match(name))
  if(user === undefined){return false;}

  let passCorect : boolean = await argon2.verify(user.passwordHash, password)
  return passCorect;
}


new Elysia()
  .get("/api/v1/users", () =>{
    return  users.map(users => users.name);
  })
  .get("/api/v1/health", () => ({ status: 'ok' }))

 //====================== REGISTER a user
  .post("/api/v1/register", async ({ body, set }) => {
    const newUser = await addUser(body.name, body.password);

    set.status = 201;
    return { user: newUser };
  }, {
    body: t.Object({
      password: t.String({minLength:PASSWORD_MIN_LENGTH}),
      name: t.String(),
    })
  })
//=======================REMOVE user




//=======================LOGIN user
  .post('/api/v1/login', async ({ body, set }) => {
    const correctCredential : boolean  = await loginUser(body.name, body.password)

    if(correctCredential == true){set.status = 200;}
    else{ set.status = 401}
    
    return {correctCredential}
  }, {
    body: t.Object({
      password: t.String(),
      name: t.String(),
    })
  })




  .listen(Number(process.env.PORT) || 3000)


  