const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongodbConnect = require('./src/lib/mongo')
const authRoutes = require('./src/routes/auth.route')
const userRoute = require('./src/routes/user.route')
const messageRoute = require('./src/routes/message.route')

const app = express()

mongodbConnect()

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoute)
app.use('/api/message', messageRoute)

module.exports = app