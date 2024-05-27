const express = require("express");
const cors = require("cors")

const AdminUserRoutes = require("./Routes/AdminUserRoutes")
const NgoUserRoutes = require("./Routes/NgoUserRoutes")
const StepUserRoutes = require("./Routes/StepUserRoutes")
const FeedbackRoutes = require("./Routes/FeedbackRoutes")
const UserRoutes = require("./Routes/UserRoutes")

require("./Conn/conn")

const app = express();
app.use(express.json())
app.use(cors());

app.use('/api', FeedbackRoutes);
app.use('/api/admin/user', AdminUserRoutes );
app.use('/api/ngo/user', NgoUserRoutes );
app.use('/api/step/user', StepUserRoutes );
app.use('/api', UserRoutes);
  

app.listen(1000, ()=>{
    console.log("Server Started");
});