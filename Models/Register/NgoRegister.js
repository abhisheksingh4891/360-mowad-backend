const mongoose = require("mongoose");

const NgoUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const NgoUserModel = mongoose.model('NgoUser', NgoUserSchema);
module.exports = NgoUserModel;