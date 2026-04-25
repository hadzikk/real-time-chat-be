const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    full_name: { type: String, required: true },
    password: { type: String, required: true },
    avatar_url: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)