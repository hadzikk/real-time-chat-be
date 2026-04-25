const dotEnv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
    const configFile = './.env.' + process.env.NODE_ENV
    dotEnv.config({ path: configFile })
} else {
    dotEnv.config()
}

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}