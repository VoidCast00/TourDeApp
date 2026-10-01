// this is the health check route
import { Elysia } from 'elysia'

export const healthRoutes = new Elysia()
  .get("/health", () => ({ status: 'ok' }))
