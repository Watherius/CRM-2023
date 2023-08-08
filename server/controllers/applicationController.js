const message = require("../config/message.config");
const db = require("../models");
const { Op } = require('sequelize');
require('dotenv').config();

const Course = db.course;
const Form = db.form;
const User = db.user;
const Application = db.application;
const Field = db.field;
const filedValue = db.field_value;

const Stage = db.stage; 
const Teacher = db.teacher;
const Status = db.status;
const applicationStatus = db.application_status;
const courseTeacher = db.course_teacher;

async function findStatusInApplcation(endStatus,appId) // поиск статуса в связи
{
    const appStatus = await applicationStatus.findAll({
        where: {application_id: appId},
        include: Status,
        order: [['id', 'DESC']],
        limit: 1
    })
    return appStatus[endStatus].status_id;
}

class applicationController 
{
    async getApplication(req, res) //получение заявки для регистрации формы
    {
        try {
            const id = req.query.courseId;

            const course = await Course.findByPk(id, {
                include: [
                  { model: Form, as: 'letterForms' },
                  { model: Form, as: 'applicationForms', include: Field},
                ],
              });
            
            if(!course)
            {
                return res.status(400).json({message: 'Курс не найден'});
            }

            const app = await Application.create({
                course_id: id,
                user_id: req.user.id
            })

            const firstStatus = await Status.findOne(
                {
                    where:{status: 'FillInProgress'}
                }
            )
            if(!firstStatus)
            {
                return res.status(400).json({message: 'Нет такого статуса'});
            }

            const app_status = await applicationStatus.create({
                status_id: firstStatus.id,
                application_id: app.id,
            })

            return res.status(201).json({
                app_status,
                app,
                course,
                message: 'Заявка получена',
            })
            
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Ошибка запроса заявки'});
        }
    }  
    async postApplicationSave(req, res) //получение заявки для регистрации формы
    {
        try {
            console.log(req.files)
            const { course_id, application_id, fields}  = req.body;

            const course = await Course.findByPk(course_id);
            if(!course)
            {
                return res.status(400).json({message: 'Курс не найден'});
            }

            const application = await Application.findByPk(application_id);
            if(!application)
            {
                return res.status(400).json({message: 'Заявка не найдена'});
            }

            await filedValue.destroy({where: {application_id:application.id}})

            for(let field of fields){
                const findField = await Field.findByPk(field.id)
                if(findField)
                {
                    let type = findField.type
                    let result = {}
                    switch(type) {
                        case 'text':
                        case 'phone':
                            result = {text_value: field.value}
                            break
                        case 'date':
                            result = {date: field.value}
                            break
                        /*case 'files':
                            result = {date: field.value, application_id: application_id}
                            break*/
                        default:
                            break
                    }
                    result.application_id = application.id
                    result.field_id = findField.id

                    await filedValue.create( result )
                }
            }

            const newStatus = await Status.findOne({where: {status: 'VerificationInProgress'}});
            if(!newStatus)
            {
                return res.status(400).json({message: 'Такого статуса не существует'});
            }

            if(await findStatusInApplcation(0, application_id) === newStatus.id)
            {
                await applicationStatus.destroy({where: {application_id:application_id, status_id:newStatus.id}})
            }

            await applicationStatus.create({
                status_id: newStatus.id,
                application_id: application.id
            })

            return res.status(201).json({
                message: 'Данные отправлены',
            })
            
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Ошибка отправки данных'});
        }
    }    
    async getAllApplication(req, res) { //вывести список заявок Менеджером
        try {
            const applications = await Application.findAll({
                include: [
                    {
                        model: applicationStatus, 
                        include: Status,
                        attributes: ['datetime'],
                        where: {
                            status_id: { [Op.gt]: 2 }
                        }
                    },
                    {
                        model: User,
                        attributes: ['id', 'firstName', 'secondName', 'middleName', 'phone']
                    },
                    {
                        model: Course,
                        attributes: ['id', 'name', 'paid']
                    },
                ],
                attributes: ['id']
            })    

            res.json(applications)
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Ошибка запроса списка заявок'});
        }
    } 
    async getAllApplicationByUser(req, res) { //вывести список заявок Слушатель
        try {
            const userId = req.user.id;
            //const application = await Application.findAll({where: {user_id: userId}, include: [{model: Course}, {model:applicationStatus}]});   
            
            const applications = await Application.findAll({
                where: {user_id: userId},
                include: [
                    {
                        model: applicationStatus, 
                        include: {model: Status, attributes: ['status']},
                        attributes: ['id'],
                    },
                    {
                        model: User,
                        attributes: ['id']
                    },
                    {
                        model: Course,
                        attributes: ['id', 'name', 'startDate', 'endDate', 'status']
                    },
                ],
                attributes: ['id']
            })    

            res.json(/*[{userId, applications}]*/ applications)
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Ошибка запроса списка заявок для текущего пользователя'});
        }
    } 
    async getApplicationId(req, res) { //вывести заявку + история
        const { id } = req.params;

        try {
            const application = await Application.findByPk(id,
                {
                    include:[ 
                    {
                        model: applicationStatus, 
                        include: {model: Status, attributes: ['status']},
                        attributes: ['id', 'datetime'],
                    },
                    {
                        model: Course, 
                        include: [
                            {
                                model: Teacher, 
                                attributes:['firstName', 'secondName', 'middleName']
                            },
                            {
                                model: Form, 
                                as:'applicationForms',
                                attributes: ['id'],
                                include: {model: Field, attributes: {exclude: ['form_id']}}
                            },
                        ],
                        attributes: ['id', 'name', 'description', 'status', 'link', 'paid'],
                    },
                ],
                    attributes: ['id']
                })
            
            
            if(!application) {
                return res.status(400).json({message: 'Такой заявки не существует'});
            } 

            res.json(application)
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Ошибка запроса заявки'});
        }
    }
    async getApplicationSubmit(req, res) { //
        try {
            const id = req.params.id

            const newStatus = await Status.findOne({where: {status: 'VerificationUnderConsidiration'}});
            if(!newStatus)
            {
                return res.status(400).json({message: 'Такого статуса не существует'});
            }

            if(await findStatusInApplcation(0, id) === newStatus.id)
            {
                return res.status(400).json({message: 'Статус уже изменен'});
            }

            const secondStatus = await applicationStatus.create({
                status_id: newStatus.id,
                application_id: id,
            })

            res.json({ newStatus, secondStatus })
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Ошибка отправки заявки'});
        }
    }
    async getManagerApplicationCreate(req, res) { //возвращает список пользователей и курсов
        try {
            const allUser = await User.findAll({where: {role: 'student'}, attributes: ['id', 'firstName', 'secondName', 'middleName', 'email']})
            if(!allUser)
            {
                return res.status(400).json({message: 'Пользователи не найдены'});
            }

            const activeCourse = await Course.findAll(
            {
                attributes: ['id', 'name']
            })   
            if(!activeCourse)
            {
                return res.status(400).json({message: 'Курсы не найдены'});
            }         

            res.json({allUser, activeCourse})
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Ошибка запроса списка заявок'});
        }
    } 
}

module.exports = new applicationController();