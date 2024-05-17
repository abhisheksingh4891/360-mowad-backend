const express = require("express");
const cors = require("cors")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const StepUserModel = require("./Models/Register/StepRegister")
const NgoUserModel = require("./Models/Register/NgoRegister")
const AdminUserModel = require("./Models/Register/AdminRegister")
require("./Conn/conn")

const app = express();
app.use(express.json())
app.use(cors());


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

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401); // No token provided
  
    jwt.verify(token, 'your_jwt_secret_key', (err, user) => {
      if (err) return res.sendStatus(403); // Token is not valid
      req.user = user;
      next();
    });
  };

app.post("/stepuserlogin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await StepUserModel.findOne({ email });

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
});

app.get('/profile', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).send('Internal Server Error');
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
});

app.post("/adminlogin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await AdminUserModel.findOne({ email });

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
});


app.listen(1000, ()=>{
    console.log("Server Started");
});