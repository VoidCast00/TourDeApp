import { Elysia } from 'elysia'
import { routes } from './routes'
import { PORT } from './config'

const app = new Elysia().use(routes)


app.listen(PORT)
