const { DataTypes } = require('sequelize')
const sequelize=require('../db')

const adminData=sequelize.define("adminData",{
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})
module.exports=adminData