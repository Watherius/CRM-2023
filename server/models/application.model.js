const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const Application = sequelize.define("application", {},
    {
        freezeTableName: true,
        timestamps: false, 
    });
  
    return Application;
  };