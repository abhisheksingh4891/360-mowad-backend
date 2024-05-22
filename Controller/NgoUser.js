const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const NgoUserModel = require("../Models/Register/NgoRegister")

exports.ngoUserRegister = async (req, res) => {
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
};

exports.ngoUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await NgoUserModel.findOne({ email });

        if (!user) {
            
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const accessToken = jwt.sign({ _id: user._id, email: user.email }, 'your_jwt_secret_key');
        res.json({ accessToken, message: "Login successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

