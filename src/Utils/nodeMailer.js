const nodemailer = require("nodemailer");
require('dotenv').config()

module.exports={
    sendMail:async(email,otp)=>{
      // console.log("email:",process.env.APP_EMAIL, "password",process.env.APP_PASSWORD);
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
              
              user: process.env.APP_EMAIL,
              pass: process.env.APP_PASSWORD,
            },
            requireTLS:true,
            logger:true
          });
          const info = await transporter.sendMail({
            from:process.env.APP_EMAIL, 
            to: email, 
            subject: "Otp for LMS", // Subject line
            text: `Hello, your OTP is ${otp}`, // plain text body
            html:`<b>Dear user, your OTP is ${otp}</b>`, // html body
          });
          if(info.accepted.includes(email)) return true
        



    }
}


