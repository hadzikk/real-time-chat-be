const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRoutes = require('./src/routes/auth.route')
const userRoute = require('./src/routes/user.route')
const messageRoute = require('./src/routes/message.route')
const mongodbMiddleware = require('./src/middleware/mongo.middleware')
const config = require('./src/config')

const app = express()

app.use(cors({
    origin: 'https://real-time-chat.hadzikk.workers.dev',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cookieParser())
app.use(mongodbMiddleware)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoute)
app.use('/api/message', messageRoute)

module.exports = app