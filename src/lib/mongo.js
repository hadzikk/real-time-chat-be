const mongoose = require('mongoose')
const config = require('../config')
const MONGO_URI = config.MONGO_URI

const mongodbConnect = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected to MongoDB successfully")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message)
        process.exit(1)
    }
}

module.exports = mongodbConnect