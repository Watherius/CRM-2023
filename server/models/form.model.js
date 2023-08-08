const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const Form = sequelize.define("form", {
        name:  {
            type: DataTypes.STRING(300),
            allowNull: false,
            //unique: true,
            validate: {
                notNull: {
                    msg: `Название формы не может быть пустым`,
                },
                is: {
                  args: /^[a-zA-Zа-яА-я0-9\#\№\s+]+$/i,
                  msg: 'Некорректный ввод имени формы',
                },
            },
        },
        type: {
            type: DataTypes.ENUM('application', 'letter'),
        },
        archieve: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        freezeTableName: true,
    });
  
    return Form;
  };