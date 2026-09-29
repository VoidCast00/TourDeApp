import { Elysia, t } from 'elysia';
import { type User } from '@shared/types'
import argon2 from 'argon2';

const users: User[] = [];

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

new Elysia()
  .get("/api/v1/users", () =>{
    return  users.map(users => users.name);
  })
  .get("/api/v1/health", () => ({ status: 'ok' }))

 //====================== ADD a user
  .post('/api/v1/users', async ({ body, set }) => {
    const newUser = await addUser(body.name, body.password);

    set.status = 201;
    return { user: newUser };
  }, {
    body: t.Object({
      password: t.String({minLength:3}),
      name: t.String(),
    })
  })

//=======================REMOVE user
  .listen(Number(process.env.PORT) || 3000)


  