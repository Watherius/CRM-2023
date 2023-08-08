const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const Teacher = sequelize.define("teacher", {
        firstName:  {
            type: DataTypes.STRING(100),
            validate: {
                is: {
                  args: /^[a-zA-Zа-яА-я0-9\s+]+$/i,
                  msg: 'Некорректный ввод имени преподавателя',
                },
            },
        },
        secondName:  {
            type: DataTypes.STRING(100),
            validate: {
                is: {
                  args: /^[a-zA-Zа-яА-я0-9\s+]+$/i,
                  msg: 'Некорректный ввод фамилии преподавателя',
                },
            },
        },
        middleName:  {
            type: DataTypes.STRING(100),
            validate: {
                is: {
                  args: /^[a-zA-Zа-яА-я0-9\s+]+$/i,
                  msg: 'Некорректный ввод отчества преподавателя',
                },
            },
        },
    },
    {
        freezeTableName: true,
        timestamps: false, 
    });
  
    return Teacher;
  };