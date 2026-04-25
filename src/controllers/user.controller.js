const User = require('../models/user.model')
const cloudinary = require('../lib/cloudinary')

const updateAvatar = async (req, res) => {
    try {
        const userId = req.user._id;
        const { avatar } = req.body;

        if (!avatar) return res.status(400).json({ message: 'Avatar is required.' });
        const uploadResponse = await cloudinary.uploader.upload(avatar, {
            folder: "avatars",
            resource_type: "auto" 
        });

        const updateUser = await User.findByIdAndUpdate(
            userId,
            { avatar_url: uploadResponse.secure_url },
            {
                returnDocument: 'after'
            }
        ).select("-password");

        res.status(200).json(updateUser);
    } catch (error) {
        console.error('Error in update avatar controller:', error);
        
        if (error.http_code === 499) {
            return res.status(504).json({ message: 'Cloudinary upload timeout. Try a smaller image.' });
        }
        
        res.status(500).json({ message: 'Internal server error.'});
    }
}

module.exports = {
    updateAvatar,
}