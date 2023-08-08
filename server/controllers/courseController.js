const message = require("../config/message.config");
const db = require("../models");
const { Op } = require('sequelize');
require('dotenv').config();

const Course = db.course;
const Teacher = db.teacher;
const Form = db.form;

class courseController 
{
    async createCourse(req, res) //создание курса
    {
        try {
            const {name, link, startDate, endDate, description, paid, status, application_form_id, letter_form_id, teachers} = req.body;
            const duplicate = await Course.findOne({where: {name}});
            if (duplicate) {
                return res.status(400).json({message: message.courseExists});
            }
            if(!name) {
                return res.status(400).json({message: message.courseNameMatch});
            }
            let masNames = [];
            for (const teacher of teachers)
            {
                const verification = await Teacher.findOne({
                    where: {
                      firstName: {
                        [Op.like]: teacher.firstName
                      },
                      secondName: {
                        [Op.like]: teacher.secondName
                      },
                      middleName: {
                        [Op.like]: teacher.middleName
                      },
                    }
                  });

                if (!verification) {
                    masNames.push(teacher);
                }
            }

            const checkFrom = await Form.findAll({where: {id: [application_form_id, letter_form_id]}})
            if ((application_form_id != undefined && checkFrom[0] == undefined) || (letter_form_id != undefined && checkFrom[1] == undefined))
            {
                return res.status(400).json({message: message.noForms});
            }

            const course = await Course.create(
                {
                    name, link, startDate, endDate, description, paid, status, 
                    application_form_id,
                    letter_form_id,
                    teachers: masNames,
                    user_id: req.user.id
                },
                {
                    include: Teacher
                }
            );
            return res.status(201).json({
                course,
                message: message.createdCourse,
            })
            
        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorCreatedCourse});
        }
    }   
    async getCourses(req, res) { //выбать все курсы
        try {
            const courses = await Course.findAll();         
            res.json(courses)
        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorCoursesRequest});
        }
    } 
    async getCourseId(req, res) {
        try {
            const course = await Course.findByPk(req.params.id, {include: Teacher})
            if(!course) {
                return res.status(400).json({message: message.courseNoExists});
            }      
            res.json(course)
        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorCourseRequest});
        }
    }
    async patchCoursesClose(req, res) { //изменить состояние курсов на "закрытый" через checkbox
        try {
            const {courses} = req.body
            let closeCount = await Course.update({ status: "close" },
            {
                where: {
                    id: courses
                }
            })

            return res.status(201).json({
                closeCount,
                message: message.coursesClosed,
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorCoursesClosed});
        }
    }
    async patchCoursesOpen(req, res) { //изменить состояние курсов на "открытый" через checkbox
        try {
            const {courses} = req.body
            let openCount = await Course.update({ status: "open" },
            {
                where: {
                    id: courses
                }
            })

            return res.status(201).json({
                openCount,
                message: message.coursesOpend,
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorCoursesClosed});
        }
    }
    async deleteCourse(req, res) { //удаление курса на странице курсов через checkbox
        try {
            const {courses} = req.body
            let deletedCount = await Course.destroy({
                where: {id: courses}
            })

            return res.status(201).json({
                deletedCount,
                message: message.coursesDeleted,
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorCoursesDeleted});
        }
    }
    async deleteCourseId(req, res) { //удаление курса в самом курсе
        try {
            const deletedCourse = await Course.destroy({
                where: {id: req.params.id}
            })

            return res.status(201).json({
                deletedCourse,
                message: message.courseDeleted,
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorCourseDeleted});
        }
    }
    async patchEditCourse(req, res) { //редактировать курс
        try {
            const {name, link, startDate, endDate, description, paid, status, application_form_id, letter_form_id, teachers} = req.body;
            const course = await Course.findByPk(req.params.id);
            if(!course) {
                return res.status(400).json({message: message.editCourseNoExists});
            }   
            if(!name) {
                return res.status(400).json({message: message.editCourseNameMatch});
            }

            const checkFrom = await Form.findAll({where: {id: [application_form_id, letter_form_id], archieve: false}})
            if ((application_form_id != undefined && checkFrom[0] == undefined) || (letter_form_id != undefined && checkFrom[1] == undefined))
            {
                return res.status(400).json({message: message.editNoForms});
            }

            await course.setTeachers([]); // Удаляем все существующие связи с преподавателями

            const teachersToCreate = [];
            for (const teacher of teachers)
            {
                const existingTeacher  = await Teacher.findOne({
                    where: {
                      firstName: {
                        [Op.like]: teacher.firstName
                      },
                      secondName: {
                        [Op.like]: teacher.secondName
                      },
                      middleName: {
                        [Op.like]: teacher.middleName
                      },
                    }
                  });

                if (existingTeacher) {
                    await course.addTeacher(existingTeacher); // Связываем существующего преподавателя с курсом
                } else {
                    teachersToCreate.push(teacher); // Добавляем нового преподавателя в массив для последующего создания
                }
            }

            // Создаем новых преподавателей и связываем их с курсом
            const createdTeachers = await Teacher.bulkCreate(teachersToCreate);
            await course.addTeachers(createdTeachers);

            const courseEdit = await course.update(
                {  name, link, startDate, endDate, description, paid, status, application_form_id, letter_form_id })

            return res.status(201).json({
                courseEdit,
                message: message.changedFields,
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({message: message.errorEditCourse});
        }
    }
}

module.exports = new courseController();