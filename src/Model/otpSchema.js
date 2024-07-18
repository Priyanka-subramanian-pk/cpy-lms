const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const otpData = sequelize.define('otpData', {
    otp: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    expireAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    timestamps: true,
});

module.exports = otpData;
