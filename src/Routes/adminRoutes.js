const express=require('express')
const tryCatchMiddleware = require('../Middleware/tryCatch')
const router=express.Router()
const verifyToken=require('../Utils/jwtToken')
const admin=require('../Controller/adminController')

router
// .post("/createAdmin",tryCatchMiddleware(admin.createAdmin))
.post('/adminLogin',tryCatchMiddleware(admin.adminLogin) )
.post('/forgotpassword',tryCatchMiddleware(admin.forgotPassword))

module.exports=router