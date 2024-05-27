const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema ({
    name : {
        type: String,
        required: true
    },
    gender : {
        type: String,
        required: true
    },
    phone : {
        type: Number,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    state : {
        type: String,
        required: true
    },
    pincode : {
        type: Number,
        required: true
    },
    aadhar : {
        type: Number,
        required: true,
        unique: true
    },
    year : {
        type: Number,
        required: true
    },
    study : {
        type: String,
        required: true
    },
    instituteName : {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;