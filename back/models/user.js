const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pseudo: { type: String, unique: true },
    imageUrl: { type: String }

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
