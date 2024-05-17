const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        unique: true
    }
});

const FeedbackModel = mongoose.model('Feedback', FeedbackSchema);
module.exports = FeedbackModel;