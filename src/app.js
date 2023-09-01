import express from 'express'
import config from './config'

import serviceRoutes from './routes/service.routes'

const app = express()



app.set('port', config.port)

app.use(serviceRoutes)




export default app