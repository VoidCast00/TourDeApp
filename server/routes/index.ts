// this puts all the route files together under /api/v1
import { Elysia } from 'elysia'
import { healthRoutes } from './health'
import { authRoutes } from './auth'
import { stopsRoutes } from './stops'

export const routes = new Elysia({ prefix: '/api/v1' })
  .use(healthRoutes)
  .use(authRoutes)
  .use(stopsRoutes)
