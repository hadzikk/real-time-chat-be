const express = require('express')
const { getContactList, getMessageByUserId, sendMessage } = require('../controllers/message.controller')
const { protectedRoute } = require('../middleware/auth.middleware')

const router = express.Router()

router.get('/get-contact-list', protectedRoute, getContactList)
router.get('/:id', protectedRoute, getMessageByUserId)
router.post('/send/:id'. protectedRoute, sendMessage)

module.exports = router