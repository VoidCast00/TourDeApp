// this is for register and login routes
import { Elysia, t } from 'elysia'
import { PASSWORD_MIN_LENGTH } from '@shared/constants'
import { addUser, loginUser } from '../logic/userLogic'

export const authRoutes = new Elysia()
  //================================================ REGISTER a user
  .post("/register", async ({ body, set }) => {
    set.status = await addUser(body.name, body.password);
    return
  }, {
    body: t.Object({
      password: t.String({ minLength: PASSWORD_MIN_LENGTH }),
      name: t.String(),
    })
  })
  //===============================================LOGIN user
  .post('/login', async ({ body, set }) => {
    set.status = await loginUser(body.name, body.password)
    return
  }, {
    body: t.Object({
      password: t.String(),
      name: t.String(),
    })
  })
