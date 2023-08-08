import React, { useContext, useEffect, useState } from 'react';
import '../css/style.css';

import Filter from '../components/UI/Filter';
import Table from '../components/UI/Table/Table';

import ApplicationService from '../services/ApplicationService'
import { observer } from 'mobx-react-lite';
import Svg from '../components/UI/Svg';
import Checkbox from '../components/UI/Checkbox';
import Breadcrumbs from '../components/Breadcrumbs';

function Applications() {
    const [applications, setApplications] = useState([]);
    const [tableConclusion, setTableConclusion] = useState([])
    const [tableHeader] = useState([
        {id: 1,
            type: 'text',
            name: '№',
            icon: <Svg name='arrow' />
        },
        {id: 2,
            type: 'text',
            name: 'ФИО',
            icon: <Svg name='arrow' />
        },
        {id: 3,
            type: 'text',
            name: 'Курс',
            icon: <Svg name='arrow' />
        },
        {id: 4,
            type: 'text',
            name: 'Дата подачи заявки',
            icon: <Svg name='arrow' />
        },
        {id: 5,
            type: 'text',
            name: 'Номер телефона',
            icon: <Svg name='arrow' />
        },
        {id: 6,
            type: 'text',
            name: 'Оплата',
            icon: <Svg name='arrow' />
        },
        {id: 7,
            type: 'text',
            name: 'Статус',
            icon: <Svg name='arrow' />
        },
        {id: 8,
            type: 'input',
            name: <Checkbox id='checkbox-custom' type='custom' />
        }
    ])

    useEffect(() => {
        getApplications();
    }, []);

    async function getApplications()
    {
        try {
            const response = await ApplicationService.fetchApplications();
            const updatedTableConclusion = response.data.map((app, index) => {
                    const datetime = new Date(app.application_statuses[0].datetime);
                    const formattedDate = datetime.toLocaleDateString({
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    });
                    const applicationStatus = app.application_statuses;
                    return {
                        id: app.id,
                        number: index+1,
                        fio: {secondName: app.user.secondName, firstName: app.user.firstName, middleName: app.user.middleName},
                        course: app.course.name,
                        date: formattedDate,
                        phone: app.user.phone,
                        pay: app.course.paid === false? 'Нету':'Есть',
                        status: applicationStatus.length > 0 && applicationStatus[applicationStatus.length - 1].status.status,
                        checkbox: ''
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
                        <h1>Заявки</h1>
                        <Breadcrumbs />
                    </div>
                    <div className='app__filter'>
                        <nav className='app__filter-box'>
                            <Filter name='Все' href='all' css='app__filter-item' />
                            <Filter name='Новые' href='allow' css='app__filter-item active' />
                            <Filter name='Обучающиеся' href='deny' css='app__filter-item' />
                            <Filter name='Отказано' href='deny' css='app__filter-item' />
                        </nav>                        
                    </div>
                    <div className='app__search'>
                        <input type='text' name='text' className='app__search-item' placeholder='Поиск' />
                    </div>
                </section>
                <section className='app__content'>
                    <div className='app__table'>
                        <Table css='app__table-box table__applications' tableHeader={tableHeader} tableContent={tableConclusion} />
                    </div>
                    <div className='app__actions'>
                    </div>
                </section>
                <section className='app__content-btn'>
                    <button type='submit' className='app__auth-button btn active'>Создать заявление</button>                  
                </section>
            </div>
        </main>
    )
}

export default observer(Applications);

//<button className='btn' onClick={getApplications}>Получить заявки</button>
/*{applications.lenght === 0 
    ? 
        (
            <div>Заявок нет</div>
        )
    :   (
            <div>
                {applications && applications.map((app, index) => {
                    const datetime = new Date(app.application_statuses[0].datatime);
                    const formattedDate = datetime.toLocaleDateString({
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    });
                
                    return (
                        <div key={app.id}>
                            {index+1} {app.user.firstName} {app.user.secondName} {app.user.middleName} {app.course.name} {formattedDate} {app.user.phone} {app.course.paid === false? 'Нету':'Есть'} {app.application_statuses.length > 0 && app.application_statuses[app.application_statuses.length - 1].status.status}
                        </div>
                    )
                })}
            </div>
        )
    }*/