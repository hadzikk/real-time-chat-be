const jwt = require('jsonwebtoken')
const config = require('../config')
const JWT_SECRET = config.JWT_SECRET
const NODE_ENV = config.NODE_ENV

const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: '7d'
    })

    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, 
        sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
        secure: NODE_ENV === 'production',
    })

    return token
}

module.exports = {
    generateToken
}