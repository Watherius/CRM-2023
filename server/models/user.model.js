const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstName:  {
            type: DataTypes.STRING(50),
            /*allowNull: false,
            validate: {
                notNull: {
                    msg: `Имя пользователя не может быть пустым`,
                },
                is: {
                  args: /^[a-zA-Zа-яА-я]+$/i,
                  msg: 'Некорректный ввод имени',
                },
            },*/
        },
        secondName:  {
            type: DataTypes.STRING(50),
            /*allowNull: false,
            validate: {
                notNull: {
                    msg: 'Фамилия пользователя не может быть пустым',
                },
                is: {
                  args: /^[a-zA-Zа-яА-я]+$/i,
                  msg: 'Некорректный ввод фамилии',
                },
            },*/
        },
        middleName:  {
            type: DataTypes.STRING(50),
            /*allowNull: false,
            validate: {
                notNull: {
                    msg: 'Отчество пользователя не может быть пустым',
                },
                is: {
                  args: /^[a-zA-Zа-яА-я]+$/i,
                  msg: 'Некорректный ввод отчества',
                },
            },*/
        },
        phone: {
            type: DataTypes.STRING(50),
            /*allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'Телефон пользователя не может быть пустым',
                },
                isPhoneNumber: function(value) {
                  if (!/^(\+?\d{1,3}[- ]?)?\d{10}$/.test(value)) {
                    throw new Error('Некорректный ввод телефона');
                  }
                },
            },*/
        },
        email: {
            type: DataTypes.STRING(50),
            /*allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notNull: {
                    msg: 'Email пользователя не может быть пустым',
                },
            }*/
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Пароль пользователя не может быть пустым',
                },
            },
            set(value) {
                const salt = bcrypt.genSaltSync(8);
                const hash = bcrypt.hashSync(value, salt)
                this.setDataValue('password', hash);
            }
        },
        role: {
            type: DataTypes.ENUM('student', 'manager', 'admin'),
            defaultValue: 'student',
        }
    },
    {
        freezeTableName: true,
    });
  
    return User;
  };