// this is for register and login routes
import { Elysia, t } from 'elysia'
import { PASSWORD_MIN_LENGTH } from '@shared/constants'
import { listStops } from '../logic/stopsLogic'

export const stopsRoutes = new Elysia()
  .get("/stops", async ({ set }) => {
    const stops = await listStops();
    if (!stops){
        set.status = 500
        return{error:"failed to get stops"}
    }
    return stops;
  })
