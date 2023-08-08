import React, { useEffect, useState } from 'react';
import '../css/style.css';

import Filter from '../components/UI/Filter';
import Table from '../components/UI/Table/Table';
import Svg from '../components/UI/Svg';
import ApplicationService from '../services/ApplicationService';
import { observer } from 'mobx-react-lite';
import Breadcrumbs from '../components/Breadcrumbs';

function MyCourses() {
    const [applications, setApplications] = useState([]);
    const [tableConclusion, setTableConclusion] = useState([])
    const [tableHeader] = useState([
        {id:1,
            type: 'text',
            name: 'Курс',
            icon: <Svg name='arrow' />
        },
        {id:2,
            type: 'text',
            name: 'Дата начала курса',
            icon: <Svg name='arrow' />
        },
        {id:3,
            type: 'text',
            name: 'Дата окончания курса',
            icon: <Svg name='arrow' />
        },
        {id:4,
            type: 'text',
            name: 'Статус заявки',
            icon: <Svg name='arrow' />
        },
        {id:5,
            type: 'text',
            name: 'Статус курса',
            icon: <Svg name='arrow' />
        },
        {id:6,
            type: 'empty'
        }
    ])

    useEffect(() => {
        getApplications();
    }, []);

    async function getApplications()
    {
        try {
            const response = await ApplicationService.fetchUserApplications();
            const updatedTableConclusion = response.data.map((app) => {
                    function datetime(date)
                    {
                        const datetime = new Date(date);
                        const formattedDate = datetime.toLocaleDateString({
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        });
                        return formattedDate;
                    }

                    const applicationStatus = app.application_statuses;
                    return {
                        id: app.id,
                        course: app.course.name,
                        date_start_course: datetime(app.course.startDate),
                        date_end_course: datetime(app.course.endDate),
                        status: applicationStatus.length > 0 && applicationStatus[applicationStatus.length - 1].status.status,
                        status_course: app.course.status,
                        btn: '',
                    }
            })
            setApplications(response.data);
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
                        <h1>Мои курсы</h1>
                        <Breadcrumbs />
                    </div>
                    <div className='app__filter'>
                        <nav className='app__filter-box'>
                            <Filter name='Все' href='all' css='app__filter-item active' />
                            <Filter name='Доступные' href='allow' css='app__filter-item' />
                            <Filter name='Закрытые' href='deny' css='app__filter-item' />
                        </nav>                        
                    </div>
                    <div className='app__search'>
                        <input type='text' name='text' className='app__search-item' placeholder='Поиск' />
                    </div>
                </section>
                <section className='app__content'>
                    <div className='app__table'>
                        <Table css='app__table-box table__my-courses' tableHeader={tableHeader} tableContent={tableConclusion} />
                    </div>
                </section>
            </div>
        </main>
    )
}

export default observer(MyCourses);