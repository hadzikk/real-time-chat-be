const mongodbConnect = require('../lib/mongo')

const mongodbMiddleware = async (req, res, next) => {
    try {
        await mongodbConnect()
        next()
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

module.exports = mongodbMiddleware