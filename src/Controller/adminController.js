const Admin = require('../Model/adminModel');
const { sendOtpAndSave } = require('../Utils/senOtp');
const sequelize = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports={
   createAdmin  :async (email, password) => {
  try {
    await sequelize.authenticate();
    console.log("Connection established");

    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({
      email,
      password: hashedPassword
    });

    console.log("Admin created successfully");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
},




// Admin login
adminLogin : async (req, res) => {
const { email, password } = req.body;
try {
  const admin = await Admin.findOne({ where: { email } });

  if (!admin) {
    return res.status(400).json({
      message: "Invalid user",
      error: true,
      status: "failure"
    });
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid password",
      error: true,
      status: "failure"
    });
  }

  const secret = process.env.JWT_SECRETKEY;
  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    secret,
    { expiresIn: "24h" }
  );

  return res.status(200).json({
    message: "Login success",
    error: false,
    status: "success",
    token: token,
    
  });
} catch (error) {
  console.error("Error during admin login:", error);
  res.status(500).json({ message: "Internal server error" });
}
},

forgotPassword:async(req,res)=>{
  console.log("req.body",req.body);
  const{email}=req.body
const findUser=await Admin.findOne({ where: { email } })
// console.log(findUser);
if(!findUser){
  return res.status(400).json({
    message :"User not found",
    status:"failure"
  })
}
const {otpMessage,otpCode}=await sendOtpAndSave(email)

return res.status(200).json({
  message:otpMessage,
  status:"success",
  otp:otpCode
})
}}



// module.exports = { createAdmin, adminLogin,forgotPassword };
