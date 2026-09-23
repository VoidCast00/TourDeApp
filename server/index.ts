import { Elysia } from 'elysia';

new Elysia()
  .get('/api/v1/health', () => ({ status: 'ok' }))
  .listen(Number(process.env.PORT) || 3000)


  