const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRoutes = require('./src/routes/auth.route')
const userRoute = require('./src/routes/user.route')
const messageRoute = require('./src/routes/message.route')
const mongodbMiddleware = require('./src/middleware/mongo.middleware')
const mongodbConnect = require('./src/lib/mongo')
const config = require('./src/config')
const NODE_ENV = config.NODE_ENV

const app = express()

app.use(cors({
    origin: NODE_ENV === 'production' ? 'https://real-time-chat.hadzikk.workers.dev' : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cookieParser())

if (NODE_ENV === 'production') {
    app.use(mongodbMiddleware)
} else {
    mongodbConnect()
}

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoute)
app.use('/api/message', messageRoute)

module.exports = app