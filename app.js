import express, { json } from 'express'
import { moviesRouter } from './routes/movies-routes.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.use(corsMiddleware())
app.disable('x-powered-by') // deshabilitar el header X-Powered-By de Express
app.use(json())

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
