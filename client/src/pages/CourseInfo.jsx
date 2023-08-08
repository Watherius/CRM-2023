import React, { useEffect, useState } from 'react';
import '../css/style.css';

import ApplicationService from '../services/ApplicationService';
import { observer } from 'mobx-react-lite';
import { NavLink, useParams } from 'react-router-dom';
import { StatusTraslition } from '../services/StatusTranslations';
import Breadcrumbs from '../components/Breadcrumbs';

function CourseInfo() {
    const { id } = useParams();
    
    const [courseInfo, setCourseInfo] = useState({})
    
    useEffect(() => {
        getData();
    });

    async function getData()
    {
        try {
            const response = await ApplicationService.applicationId(id);
            const data = response.data;
            const applicationStatus = data.application_statuses;

            const course = data.course;
            const teachers = course.teachers.map(teacher => ({
              firstName: teacher.firstName,
              secondName: teacher.secondName,
              middleName: teacher.middleName
            }));

            const updatedcourseInfo = 
            {
                id: data.id,
                course: data.course.name,
                teachers: teachers,
                description: data.course.description,
                status_course: StatusTraslition(data.course.status),
                status: StatusTraslition(applicationStatus.length > 0 && applicationStatus[applicationStatus.length - 1].status.status),
                link_input: data.course.link,
            }
            setCourseInfo(updatedcourseInfo);
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <main className='container'>
            <div className='app__main'>
                <section className='app__header'>
                    <div className='app__header-name'>
                        <h1>О курсе</h1>
                        <Breadcrumbs />
                    </div>
                    <div className='app__conclusion-history'>
                        <nav className='app__filter-box'>
                            <li className='app__filter-item active'>
                                <NavLink className='app__filter-link' to={`/applications/${id}/info`}>О курсе</NavLink>
                            </li>
                            <li className='app__filter-item'>
                                <NavLink className='app__filter-link' to={`/applications/${id}/statement`}>Заявка</NavLink>
                            </li>
                        </nav>                        
                    </div>
                </section>
                <section className='app__content'>
                    <div className='app__course-info'>
                        <h2>{courseInfo.course || 'Название курса'}</h2>
                        <div className='app__course-state-info'>
                            <div className='app__course-state-box'>
                                Курс сейчас
                                <span className='app__course-state deny'>{courseInfo.status_course?'недоступен':'Статус курса'}</span>
                            </div>
                            <div className='app__conclusion-state-box'>
                                Статус заявки:
                                <span className='app__conclusion-state'>{courseInfo.status}</span>
                            </div>
                        </div>
                        <div className='app__course-text'>
                            <p>{courseInfo.description}</p>
                        </div>
                        <div className='app__course-author'>
                            <h2>Преподаватели</h2>
                            {courseInfo.teachers && courseInfo.teachers.map((teacher, index) => (
                                <div key={index} className='app__course-author-name'>
                                    {teacher.firstName} {teacher.secondName} {teacher.middleName}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className='app__content-btn'>
                    <div className='app__content-btn-box'>
                        <button type='btn' className='btn'>Перейти в курс</button>  
                        <span className='app__content-btn-signature'>
                            Кнопка станет активной когда статус курса будет доступен
                        </span>
                    </div>
                                     
                </section>
            </div>
        </main>
    )
}

export default observer(CourseInfo);