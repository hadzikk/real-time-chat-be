const express = require('express')
const { signUp, signIn, signOut, checkAuth } = require('../controllers/auth.controller')
const { protectedRoute } = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/signout', signOut)
router.get('/check', protectedRoute, checkAuth)

module.exports = router