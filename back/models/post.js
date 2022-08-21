const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    pseudo: { type: String, required: true },
    userImg: { type: String },
    imageUrl: { type: String, },
    content: { type: String, required: true },
    likers: {
        type: [String],

    },


});

module.exports = mongoose.model('post', postSchema);