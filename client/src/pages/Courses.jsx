import React, { useEffect, useState } from 'react';
import '../css/style.css';

import Breadcrumbs from '../components/Breadcrumbs';
import { observer } from 'mobx-react-lite';
import Checkbox from '../components/UI/Checkbox';
import Svg from '../components/UI/Svg';
import Table from '../components/UI/Table/Table';
import CoursesService from '../services/CoursesService';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [tableConclusion, setTableConclusion] = useState([])
    const [tableHeader, setTableHeader] = useState([
        {id: 1,
            type: 'text',
            name: '№',
            icon: <Svg name='arrow' />
        },
        {id: 2,
            type: 'text',
            name: 'Курс',
            icon: <Svg name='arrow' />
        },
        {id: 3,
            type: 'text',
            name: 'Форма заявки',
            icon: <Svg name='arrow' />
        },
        {id: 4,
            type: 'text',
            name: 'Форма письма',
            icon: <Svg name='arrow' />
        },
        {id: 5,
            type: 'text',
            name: 'Платный',
            icon: <Svg name='arrow' />
        },
        {id: 6,
            type: 'text',
            name: 'Статус',
            icon: <Svg name='arrow' />
        },
        {id: 7,
            type: 'empty'
        },
        {id: 8,
            type: 'input',
            name: <Checkbox id='checkbox-custom' type='custom' />
        }
    ])

    useEffect(() => {
        getCourses();
    }, []);

    async function getCourses()
    {
        try {
            const response = await CoursesService.getCourses();
            const updatedTableConclusion = response.data.map((course, index) => {

                return {
                    id: course.id,
                    number: index+1,
                    name: course.name,
                    application_form_id: course.application_form_id,
                    letter_form_id: course.letter_form_id,
                    paid: course.paid === false?'Нет':'Да',
                    status: course.status === 'close'?'close-course':'open-course',
                    cap: '',
                    checkbox: ''
                }
            })
            setCourses(response.data);
            setTableConclusion(updatedTableConclusion);
        } catch (error) {
            console.log(error)
        }
    } 

    return(
        <main className='container'>
            <div className='app__main'>
                <section className='app__header'>
                    <div className='app__header-name'>
                        <h1>Курсы</h1>
                        <Breadcrumbs />
                    </div>
                    <div className='app__search'>
                        <input type='text' name='text' className='app__search-item' placeholder='Поиск' />
                    </div>
                </section>
                <section className='app__content'>
                    <div className='app__table'>
                        <Table css='app__table-box table__courses' tableHeader={tableHeader} tableContent={tableConclusion} />
                    </div>
                </section>
                <section className='app__content-btn'>
                    <button type='btn' className='app__auth-button btn active'>Создать курс</button>
                </section>                                
            </div>
        </main>
    )
}

export default observer(Courses);