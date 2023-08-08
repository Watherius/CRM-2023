const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define("status", {
        status: {
            type: DataTypes.STRING(30),
        }
    },
    {
        freezeTableName: true,
        timestamps: false, 
    });
  
    return Status;
  };