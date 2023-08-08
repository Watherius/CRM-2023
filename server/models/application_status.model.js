const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const applicationStatus = sequelize.define("application_status", {
        datetime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        freezeTableName: true,
        timestamps: false, 
    });
  
    return applicationStatus;
  };