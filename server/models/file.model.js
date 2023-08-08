const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("file", {
        filename:  {
            type: DataTypes.TEXT,
        },
    },
    {
        freezeTableName: true,
    });
  
    return File;
  };