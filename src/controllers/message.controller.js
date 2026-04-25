const User = require('../models/user.model')
const Message = require('../models/message.model')

const getContactList = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUser = await User.find({ _id: { $ne: loggedInUserId }}).select('password')
        res.status(200).json(filteredUser)
    } catch (error) {
        console.error('Error in get contact list:', error)
        res.status(500).json({ message: 'An error occurred while fetching the contact list.' })
    }
}

const getMessageByUserId = async (req, res) => {
    try {
        const { id: otherUserId } = req.params
        const loggedInUserId = req.user._id

        const messages = await Message.find({
            $or: [
                { sender_id: loggendInUserId, receiver_id: otherUserId },
                { sender_id: otherUserId, receiver_id: loggedInUserId }
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.error('Error in get message by id controller:', error.message)
        res.status(500).json({ message: 'An error occured while getting message by id' })
    }
}

const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imageUrl
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save()

        res.status(201).json(newMessage)
    } catch (error) {
        console.error('Error in send message controller:', error.message)
        res.status(500).json({ message: 'An error occured while sending the message.' })
    }
}

module.exports = {
    getContactList,
    getMessageByUserId,
    sendMessage
}