import { Elysia, status, t } from 'elysia'
import { getAllStops, getStopById, addStop, updateStop, deleteStop } from '../logic/stopsLogic'
import { stopBody, stopIdParams } from '../schemas/stopsSchema'
import { bearer } from '@elysia/bearer'
import { AUTH_KEY } from '../config'
import { error } from 'console'

export const stopsRoutes = new Elysia()
  .use(bearer())
  //400 instead of 422
  .onError(({code ,set}) =>{
    if (code === "VALIDATION"){
      set.status = 400;
      return {error: "invalid input"}
    }
  })
  .get("/stops", async ({ set }) => {
    const stops = await getAllStops();
    if (!stops){
        set.status = 500
        return{error:"failed to get stops"}
    }
    return stops;
  })
  .get("/stops/:id", async ({ params, set }) => {
    const stop = await getStopById(params.id);
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
    params: stopIdParams
  })
  
  .delete("/stops/:id", async ({bearer,params, set }) => {
    if (bearer != AUTH_KEY){
      throw status(401, {error : "bad autentification"})
    }
      const stop = await deleteStop(params.id);
      if (stop === undefined){
        set.status = 500;
        return {error: "failed to delete stop"}
      }
      if (stop ===null){
        set.status = 404
        return{error:"no stop found by that id "}
      }
      set.status = 204
  },{
    params:stopIdParams
  })

  
  .post('/stops', async ({bearer, body, set }) => {
    if (bearer != AUTH_KEY){
      throw status(401, {error : "bad autentification"})
    }
    const stop = await addStop(body);
    if (stop === undefined){
        set.status = 500
        return{error:"failed to add stop"}
    }
    set.status = 201
    return stop;
  }, {
    body: stopBody,
  })

  .put("/stops/:id", async ({bearer, params, body, set }) => {
    if (bearer != AUTH_KEY){
      throw status(401, {error : "bad autentification"})
    }
    const stop = await updateStop(params.id, body);
    if (stop === undefined){
        set.status = 500
        return{error:"failed to update stop"}
    }
    if (stop === null){
        set.status = 404
        return{error:"stop not found"}
    }
    return stop;
    }, {
      params:stopIdParams,
      body: stopBody,
    })

