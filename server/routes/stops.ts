// this is for register and login routes
import { Elysia, t } from 'elysia'
import { PASSWORD_MIN_LENGTH } from '@shared/constants'
import { listStops, getStop } from '../logic/stopsLogic'

export const stopsRoutes = new Elysia()
  .get("/stops", async ({ set }) => {
    const stops = await listStops();
    if (!stops){
        set.status = 500
        return{error:"failed to get stops"}
    }
    return stops;
  })
  .get("/stops/:id", async ({ params, set }) => {
    const stop = await getStop(params.id);
    if (stop === undefined){
        set.status = 500
        return{error:"failed to get stop"}
    }
    if (stop === null){
        set.status = 404
        return{error:"stop not found"}
    }
    return stop;
  }, {
    params: t.Object({ id: t.Numeric() }) 
  })
