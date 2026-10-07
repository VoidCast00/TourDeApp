// this is for register and login routes
import { Elysia, t } from 'elysia'
import { PASSWORD_MIN_LENGTH } from '@shared/constants'
import { getAllStops, getStopById, addStop, updateStop, deleteStop } from '../logic/stopsLogic'



export const stopsRoutes = new Elysia()
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
    params: t.Object({ id: t.Numeric() }) 
  })
  
  .delete("/stops/:id", async ({params, set }) => {
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
    params:t.Object({id: t.Numeric()})
  })

  
  .post('/stops', async ({ body, set }) => {
    const stop = await addStop(body);
    if (stop === undefined){
        set.status = 500
        return{error:"failed to add stop"}
    }
    set.status = 201
    return stop;
  }, {
    body: t.Object({
      name: t.String(),
      lines: t.String(),
      is_transfer: t.Boolean(),
      transfer_lines: t.Nullable(t.String()),
      x: t.Number(),
      y: t.Number(),
      wheelchair_accessible: t.Boolean(),
      has_shelter: t.Boolean(),
      has_bench: t.Boolean(),
      has_ticket_machine: t.Boolean(),
      has_display: t.Boolean(),
      image_url: t.Nullable(t.String()),
    })
  })

  .put("/stops/:id", async ({ params, body, set }) => {
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
    params: t.Object({ id: t.Numeric() }),
    body: t.Object({
      name: t.String(),
      lines: t.String(),
      is_transfer: t.Boolean(),
      transfer_lines: t.Nullable(t.String()),
      x: t.Number(),
      y: t.Number(),
      wheelchair_accessible: t.Boolean(),
      has_shelter: t.Boolean(),
      has_bench: t.Boolean(),
      has_ticket_machine: t.Boolean(),
      has_display: t.Boolean(),
      image_url: t.Nullable(t.String()),
    })
  })
