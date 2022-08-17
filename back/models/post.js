const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    imageUrl: { type: String, },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: {
        type: [
            {
                commenterId: String,
                commenterPseudo: String,
                text: String,
            },
        ],
    },
    usersLiked: [{ type: String }],
    usersDisliked: [{ type: String }],

});

module.exports = mongoose.model('post', postSchema);