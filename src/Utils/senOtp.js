otpModel=require('../Model/otpSchema')
const {sendMail} =require('../Utils/nodeMailer')

module.exports={
    sendOtpAndSave:async(email)=>{

        //----Generate otp-----
        const otpCode=Math.floor(1000+Math.random()*9000).toString()
        let otpSent=false;
        let otpMessage;


        try {
            otpSent = await sendMail(email, otpCode);
            otpMessage = "A verification code has been sent to your email address";
          } catch (error) {
            console.error("Failed to send OTP:", error);
            throw new Error("Failed to send verification code");
          }
        // otpSent=await sendEmail(email,otpCode)
        // otpMessage="A verification code has been sent to your email address"

if(otpSent){
    
return {otpCode,otpMessage}
}
else {throw new Error("failed to send verification code ");

}
    }
}