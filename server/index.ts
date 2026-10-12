import { Elysia } from 'elysia'
import { routes } from './routes'
import { PORT } from './config'



const app = new Elysia({normalize : false}).use(routes)


app.listen(PORT)
