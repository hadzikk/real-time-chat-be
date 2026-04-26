const mongoose = require('mongoose')
const config = require('../config')
const MONGO_URI = config.MONGO_URI

let cachedConnection = null

const mongodbConnect = async () => {
    if (cachedConnection) return cachedConnection
    const options = { bufferCommands: false, connectTimeoutMS: 10000 } 
    try {
        const connection = await mongoose.connect(MONGO_URI, options)
        console.log("Connected to MongoDB successfully")
        return connection
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message)
        process.exit(1)
    }
}

module.exports = mongodbConnect