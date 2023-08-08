const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Subscriber = sequelize.define("subscriber", {},
    {
        freezeTableName: true,
        autoIncrement: false,
        timestamps: false, 
    });
  
    return Subscriber;
  };