const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const Field = sequelize.define("field", {
        name:  {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: `Название поля не может быть пустым`,
                },
                is: {
                  args: /^[a-zA-Zа-яА-я0-9\s+]+$/i,
                  msg: 'Некорректный ввод имени поля',
                },
            },
        },
        /*placeholder:  {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                is: {
                  args: /^[a-zA-Zа-яА-я0-9\s+]+$/i,
                  msg: 'Некорректный ввод имени поля',
                },
            },
        },*/
        type: {
            type: DataTypes.ENUM('text', 'date', 'phone', 'files'),
        },
        required: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false, 
    });
  
    return Field;
  };