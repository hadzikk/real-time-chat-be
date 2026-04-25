const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const config = require('../config')
const JWT_SECRET = config.JWT_SECRET

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided.', credentials: token })
        
        const decoded = jwt.verify(token, JWT_SECRET)
        if (!decoded) return res.status(401).json({ message: 'Unauthorized: Invalid token.' })
        
        const user = await User.findById(decoded.userId).select('-password')
        if (!user) return res.status(404).json({ message: 'Unauthorized: User not found.' })

        req.user = user
        next()
    } catch (error) {
        console.error('Error in protected route middleware:', error.message)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = {
    protectedRoute
}