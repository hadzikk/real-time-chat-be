const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/jwt')

const signUp = async (req, res) => {
    const { username, full_name, password, avatar_url } = req.body

    try {
        if (password.length <= 8) return res.status(402).json({ message: 'Password must be at least 8 characters long.' })
        
        const user = await User.findOne({ username })
        if (user) return res.status(401).json({ message: 'Username already exists.' })
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            full_name,
            password: hashedPassword,
            avatar_url: avatar_url || ''
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                message: 'User created successfully!',
                _id: newUser._id,
                username: newUser.username,
                full_name: newUser.full_name,
            })
        } else {
            res.status(403).json({ message: 'Failed to create new user.' })
        }
    } catch (error) {
        // internal message
        console.error('Error in sign up controller:', error.message)
        res.status(500).json({ message: 'An error occurred while signing up.' })
    }
}

const signIn = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })

        if (!user) return res.status(400).json({ message: 'Invalid credentials' })

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' })
            
        generateToken(user._id, res)
   
        res.status(200).json({
            message: 'Sign in successful!',
            _id: user._id,
            username: user.username,
            full_name: user.full_name,
            avatar_url: user.avatar_url,
        })
    } catch (error) {
        console.error('Error in sign in controller:', error.message)
        res.status(500).json({ message: 'An error occurred while signing in.' })
    }     
}

const signOut = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 })
        res.status(200).json({ message: 'Sign out successful!' })
    } catch (error) {
        console.error('Error in sign out controller:', error.message)
        res.status(500).json({ message: 'An error occurred while signing out.' })
    }
}

const checkAuth = async (req, res) => {
    console.log(res.jwt)
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.error('Error in check auth controller:', error.message)
        res.status(500).json({ message: 'An error occurred while checking authentication.' })
    }
}

module.exports = {
    signUp,
    signIn,
    signOut,
    checkAuth
}