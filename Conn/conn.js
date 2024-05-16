const mongoose = require("mongoose");

const conn = async (req, res) => {
    try {
        await mongoose.connect("mongodb+srv://2811asingh:abhishek00@cluster0.ypdz7jv.mongodb.net/360project?retryWrites=true&w=majority&appName=Cluster0")
        .then(()=>{
            console.log("Database Connected");
        })
    } catch (error) {
        res.status(400).json({
            message: "Database Not Connected",
        });
    }
};

conn();