const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const courseTeacher = sequelize.define("course_teacher", {},
    {
        freezeTableName: true,
        autoIncrement: false,
        timestamps: false, 
    });
  
    return courseTeacher;
  };