
const FeedbackModel = require("../Models/Feedback")

exports.feedback = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const user = await FeedbackModel.create({
            name,
            email,
            message,
        });
        
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};