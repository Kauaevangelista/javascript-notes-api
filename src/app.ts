import express from 'express'
import cors from 'cors'
import path from 'path'
import connectToMongoDB from './db'

// import usersRouter from './routes/users'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users')

const PORT = process.env.PORT || 3000

connectToMongoDB()

app.listen(PORT, function () {
    console.log(`Server running on port: ${PORT}`)
})
