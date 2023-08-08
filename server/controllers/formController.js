const message = require("../config/message.config");
const db = require("../models");
const { Op } = require('sequelize');
require('dotenv').config();

const Form = db.form;
const Field = db.field;
const Course = db.course;

class formController {
    async createForm(req, res) {
        try {
            const {rewrite} = req.body
            const {name, type, archieve, courses, fields} = req.body.form;
            if (!fields)
            {
                return res.status(400).json({message: message.noFields});
            }

            if(!rewrite){
                const all_courses = await Course.findAll({ raw: true, where: { id: courses}})
                let result = []
                for(let course of all_courses){
                    if(type == "application"){
                        if(course.application_form_id != null){
                            result.push(course)
                        }
                    }else if(type == "letter"){
                        if(course.letter_form_id != null){
                            result.push(course)
                        }
                    }
                }
                if(result.length > 0){
                    return res.status(400).json({message: result});
                }
            }
            
            const createdForm = await Form.create(
                {
                    name, type, archieve,
                    user_id: req.user.id,
                    fields
                },
                {
                    include: Field
                }
            );
            
            if(type == "application"){
                await Course.update({ application_form_id:  createdForm.id }, {
                    where: {
                      id: courses
                    }
                });
            }else if(type == "letter"){
                await Course.update({  letter_form_id :  createdForm.id }, {
                    where: {
                      id: courses
                    }
                });
            }

            return res.status(201).json({
                createdForm,
                message: message.createdForm,
            })

        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorCreatedForm});
        }
    }
    async patchEditForm(req, res) {
        try {
            const {rewrite} = req.body
            const {name, type, archieve, courses, fields} = req.body.form;
            if (!fields)
            {
                return res.status(400).json({message: 'Нет ни одного поля'});
            }

            const form = await Form.findByPk(req.params.id);
            if(!form) {
                return res.status(400).json({message: 'Такой формы не существует'});
            }   
            if(!name) {
                return res.status(400).json({message: 'Поле с названием формы не может быть пустым'});
            }

            if(!rewrite){
                const all_courses = await Course.findAll({ raw: true, where: { id: courses}})
                let result = []
                for(let course of all_courses){
                    if(type == "application"){
                        if(course.application_form_id != null){
                            result.push(course)
                        }
                    }else if(type == "letter"){
                        if(course.letter_form_id != null){
                            result.push(course)
                        }
                    }
                }
                if(result.length > 0){
                    return res.status(400).json({message: result});
                }
            }
            
            const updateForm = await form.update(
                {
                    name, archieve, fields
                },
                {
                    include: Field
                }
            );
            
            if(type == "application"){
                await Course.update({ application_form_id:  updateForm.id }, {
                    where: {
                      id: courses
                    }
                });
            }else if(type == "letter"){
                await Course.update({  letter_form_id :  updateForm.id }, {
                    where: {
                      id: courses
                    }
                });
            }

            return res.status(201).json({
                updateForm,
                message: 'Форма успешно обнавлена',
            })

        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Ошибка обновления формы'});
        }
    }
    async getAllForms(req, res) { //Получить все активные формы
        try {
            const forms = await Form.findAll({ 
                include: [
                    {model:Course, as: 'applicationForms'}, 
                    {model:Course, as: 'letterForms'}
                ]});       
            res.json(forms)
        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorFormsRequest});
        }
    }
    async getFormsArchieve(req, res) { //Получить формы в архиве
        try {
            const forms = await Form.findAll({where:{archieve: true}});       
            res.json(forms)
        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorArchieveFormsRequest});
        }
    }
    async getFormId(req, res) {   //Получить форму по ID
        try {
            const form = await Form.findByPk(req.params.id, {include: Field})
            if(!form) {
                return res.status(400).json({message: message.formNoExists});
            }
            let courses = []
            if (form.type == "application")
            {
                courses = await Course.findAll({where: {application_form_id: form.id}})
            }
            else if (form.type == "letter")
            {
                courses = await Course.findAll({where: {letter_form_id: form.id}})
            }          
            
            res.json({form, courses})
        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorFormRequest});
        }
    }
    async archieveForm(req, res) { //перемещение в архив формы(у) через checkbox
        try {
            const {forms} = req.body

            const checkCourses = await Course.findAll({where: {
                [Op.or]: [
                    {
                        application_form_id: forms
                    },
                    {
                        letter_form_id: forms
                    },
                ]
            }})

            if (checkCourses.length > 0)
            {
                return res.status(400).json({message: message.attachedForms});
            }

            const archieveForm = await Form.update(
            {
                archieve: true
            },{
                where: {id: forms}
            })

            return res.status(201).json({
                archieveForm,
                message: message.archieveForms,
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorArchieveForms});
        }
    }
    async archieveFormId(req, res) { //перемещение форму в архив
        try {
            const checkCourses = await Course.findAll({where: {
                [Op.or]: [
                    {
                        application_form_id: req.params.id
                    },
                    {
                        letter_form_id: req.params.id
                    },
                ]
            }})

            if (checkCourses.length > 0)
            {
                return res.status(400).json({message: message.attachedForm});
            }

            const archieveForm = await Form.update(
            {
                archieve: true
            },{
                where: {id: req.params.id}
            })

            return res.status(201).json({
                archieveForm,
                message: message.archieveForm,
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorArchieveForm});
        }
    }
    async reArchieveFormId(req, res) { //перемещение формы из архива
        try {
            const checkCourses = await Course.findAll({where: {
                [Op.or]: [
                    {
                        application_form_id: req.params.id
                    },
                    {
                        letter_form_id: req.params.id
                    },
                ]
            }})

            if (checkCourses.length > 0)
            {
                return res.status(400).json({message: message.attachedForm});
            }

            const archieveForm = await Form.update(
            {
                archieve: false
            },{
                where: {id: req.params.id}
            })

            return res.status(201).json({
                archieveForm,
                message: message.rearchieveForm,
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorRearchieveForm});
        }
    }
    async getFormByCourseId(req, res) { //вывести поля формы по курсу при создании заявки Менеджером
        try {
            const courseId = req.query.courseId
            
            const course = await Course.findOne(
            {
                courseId, 
                include: 
                {
                    model: Form, 
                    as: 'applicationForms',
                    attributes: ['id', 'name'],
                    include: {
                        model: Field,
                        attributes: ['id', 'name', 'type', 'required']
                    }
                }
            })
            if(!course)
            {
                return res.status(400).json({message: 'Курс не найден'});
            }   

            res.json(course.applicationForms)
        } catch (error) {
            console.log(error);
            res.status(400).json({message:'Ошибка запроса списка полей формы'});
        }
    } 
}

module.exports = new formController();