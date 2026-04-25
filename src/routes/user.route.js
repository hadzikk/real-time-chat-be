const express = require('express')
const { updateAvatar } = require('../controllers/user.controller')
const { protectedRoute } = require('../middleware/auth.middleware')

const router = express.Router()

router.put('/update-avatar', protectedRoute, updateAvatar)

module.exports = router