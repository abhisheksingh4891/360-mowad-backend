const express = require("express");
const cors = require("cors")
const jwt = require('jsonwebtoken');

const StepUserModel = require("./Models/Register/StepRegister")

const AdminUserRoutes = require("./Routes/AdminUserRoutes")
const NgoUserRoutes = require("./Routes/NgoUserRoutes")
const StepUserRoutes = require("./Routes/StepUserRoutes")
const FeedbackRoutes = require("./Routes/FeedbackRoutes")

require("./Conn/conn")

const app = express();
app.use(express.json())
app.use(cors());

app.use('/api', FeedbackRoutes);
app.use('/api/admin/user', AdminUserRoutes );
app.use('/api/ngo/user', NgoUserRoutes );
app.use('/api/step/user', StepUserRoutes );


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401); 
  
    jwt.verify(token, 'your_jwt_secret_key', (err, user) => {
      if (err) return res.sendStatus(403); 
      req.user = user;
      next();
    });
  };
  
  app.get('/profile', authenticateToken, async (req, res) => {
      try {
        const user = await StepUserModel.findById(req.email);
        if (!user) {
          return res.status(404).send('User not found');
        }
        res.json(user);
      } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).send('Internal Server Error');
      }
    });

app.listen(1000, ()=>{
    console.log("Server Started");
});