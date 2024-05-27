const UserModel = require("../Models/User")

exports.UserRegister = async (req, res) => {
    try {
        const {name, gender, phone, email, state, aadhar, instituteName, year, study, pincode} = req.body;

        const user = await UserModel.create({
            name, 
            gender, 
            phone, 
            email, 
            state, 
            aadhar, 
            instituteName, 
            year, 
            study,
            pincode
        })
        
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
   