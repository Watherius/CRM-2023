import React, { useContext, useEffect, useState } from 'react';
import '../css/style.css';

import { observer } from 'mobx-react-lite';
import { NavLink, useParams } from 'react-router-dom';
import ApplicationService from '../services/ApplicationService';
import HistoryItem from '../components/HistoryItem';
import Breadcrumbs from '../components/Breadcrumbs';
import { StoreContext } from '..';

function StatementHistory() {
    const { id } = useParams();
    const { store } = useContext(StoreContext)
    const [role, setRole] = useState('');
    const [history, sethistory] = useState([]);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setRole(JSON.parse(savedUser).role);
        }
    }, [store.user]);

    useEffect(() => {
        getFields()
    }, [])

    async function getFields()
    {
        try {
            const response = await ApplicationService.applicationId(id);
            const data = response.data;

            const statuses = data.application_statuses.map((stat) => ({
                id: stat.id,
                datetime: stat.datetime,
                name: stat.status.status
            }))
            sethistory(statuses)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <main className='container'>
            <div className='app__main'>
                <section className='app__header'>
                    <div className='app__header-name'>
                        <h1>История заявки</h1>
                        <Breadcrumbs />
                    </div>
                    <div className='app__conclusion-history'>
                        {role === 'student' &&
                        <li className='app__filter-item'>
                            <NavLink className='app__filter-link' to={`/applications/${id}/info`}>О курсе</NavLink>
                        </li>
                        }
                        <li className='app__filter-item'>
                            <NavLink className='app__filter-link' to={`/applications/${id}/statement`}>Заявка</NavLink>
                        </li>
                        <li className='app__filter-item active'>
                            <NavLink className='app__filter-link' to={`/applications/${id}/history`}>История заявки</NavLink>
                        </li>
                    </div>   
                </section>
                <section className='app__content'>
                    <div className='app__conclusion-history'>
                        {history.length > 0 && history.map((item, index) => {
                            return <HistoryItem index={index} datetime={item.datetime} name={item.name} />;
                        })}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default observer(StatementHistory);