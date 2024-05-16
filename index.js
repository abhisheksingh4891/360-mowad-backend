const express = require("express");
const cors = require("cors")
const bcrypt = require('bcryptjs');
const StepUserModel = require("./Models/Register/StepRegister")
const NgoUserModel = require("./Models/Register/NgoRegister")
const AdminUserModel = require("./Models/Register/AdminRegister")
// const StepUserData = require("./Models/StepUser");
require("./Conn/conn")

const app = express();
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello")
})

app.post("/stepregister", async (req, res) => {
    try {
        const { name, gender, phone, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await StepUserModel.create({
            name,
            gender,
            phone,
            email,
            password: hashedPassword, 
        });

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.post("/stepuserlogin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await StepUserModel.findOne({ email });

        if (!user) {
            console.log("user not found");
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



app.post("/ngoregister", async (req, res) => {
    try {
        const { name, gender, phone, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await NgoUserModel.create({
            name,
            gender,
            phone,
            email,
            password: hashedPassword, 
        });

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/ngouserlogin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await NgoUserModel.findOne({ email });

        if (!user) {
            console.log("user not found");
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/adminlogin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await AdminUserModel.findOne({ email });

        if (!user) {
            console.log("user not found");
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.listen(1000, ()=>{
    console.log("Server Started");
});