const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const TokenSchema = sequelize.define("tokenSchema", {
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    });
  
    return TokenSchema;
  };