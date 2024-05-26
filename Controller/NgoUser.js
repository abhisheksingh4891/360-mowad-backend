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
        
        const token = jwt.sign({ userId: user._id }, 'your_secret_key');
        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.ngoUserProfile = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
       const decoded = jwt.verify(token, 'your_secret_key');
       const user = await NgoUserModel.findById(decoded.userId); 
       if (!user) {
           return res.status(404).send({ message: 'User not found' });
       }
       res.json(user);
    } catch (err) {
       console.error('Token validation error', err);
       res.status(401).send({ message: 'Invalid token' });
    }
   }
