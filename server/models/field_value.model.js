const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const fieldValue = sequelize.define("field_value", {
        text_value:  {
            type: DataTypes.TEXT,
            /*allowNull: false,
            validate: {
                notNull: {
                    msg: `Поле не может быть пустым`,
                },
                is: {
                  args: /^[a-zA-Zа-яА-я0-9\s+]+$/i,
                  msg: 'Некорректный ввод в поле',
                },
            },*/
        },
        date:  {
            type: DataTypes.DATEONLY,
            /*allowNull: false,
            validate: {
                notNull: {
                    msg: `Дата не может быть пустым`,
                },
            },*/
        },
    },
    {
        freezeTableName: true,
    });
  
    return fieldValue;
  };