import express from 'express'
import cors from 'cors'
import env from 'dotenv'
import database from './database'
import router from './routes'

env.config()

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)

const PORT = process.env.port || 3000

app.listen(PORT, async () => {
  await database()

  console.log(`Server started successfuly at port ${PORT}.`)
})