const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("course", {
        name:  {
            type: DataTypes.STRING,
            allowNull: false,
            //unique: true,
            validate: {
                notNull: {
                    msg: `Название курса не может быть пустым`,
                },
                is: {
                  args: /^[a-zA-Zа-яА-я0-9\s+]+$/i,
                  msg: 'Некорректный ввод названия курса',
                },
            },
        },
        link:  {
            type: DataTypes.STRING,
            validate: {
                is: {
                  args: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
                  msg: 'Некорректная ссылка',
                },
            },
        },
        startDate:  {
            type: DataTypes.DATEONLY,
            /*allowNull: false,
            validate: {
                notNull: {
                    msg: `Дата начала курса не может быть пустым`,
                },
            },*/
        },
        endDate:  {
            type: DataTypes.DATEONLY,
           /* allowNull: false,
            validate: {
                notNull: {
                    msg: `Дата окнчания курса не может быть пустым`,
                },
            },*/
        },
        paid:  {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        //ПРЕПОДОВАТЕЛИ
        description: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM('close', 'open'),
            defaultValue: 'close',
        }
    },
    {
        freezeTableName: true,
    });
  
    return Course;
  };