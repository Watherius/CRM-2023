import React, { useContext, useEffect, useState } from 'react';
import '../css/style.css';

import { observer } from 'mobx-react-lite';
import { NavLink, useParams } from 'react-router-dom';
import ApplicationService from '../services/ApplicationService';
import { stateStage } from '../services/StatusTranslations';
import StatementVerification from './StatementVerification';
import { ShowStatementStage } from '../hooks/useContext';
import Breadcrumbs from '../components/Breadcrumbs';
import { StoreContext } from '..';

function Statement() {
    const { id } = useParams();
    const { store } = useContext(StoreContext);
    const { showStatementStage, setShowStatementStage } = useContext(ShowStatementStage);
    const [role, setRole] = useState('');
    const [statement, setStatement] = useState({});
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setRole(JSON.parse(savedUser).role);
        }
    }, [store.user]);

    useEffect(() => {
        localStorage.setItem('StatementStage', showStatementStage.toString());
        getFields();

        const applicationStorage = JSON.parse(localStorage.getItem('application'));
        
        if (applicationStorage) {
            setFormData(applicationStorage.fields_value);
        }
        //console.log('app: ', applicationStorage)
    }, [showStatementStage]);    

    useEffect(() => {
        const applicationStorage = JSON.parse(localStorage.getItem('application'));
        
        /*if (applicationStorage) {
            setFormData(applicationStorage.fields_value);
        }*/
        //console.log('app_statuses: ',applicationStorage?.statuses)
    }, [])

    const handleChange = (event, id) => {
        setFormData({ ...formData, [id]: event.target.value });
    };

    async function handleClick() {
        try {
            const filteredObj = Object.entries(formData).reduce((acc, [key, value]) => {
            if (value !== '') {
              acc[key] = value;
            }
            return acc;
            }, {});
      
            if (statement.fields.length !== Object.keys(filteredObj).length) {
                console.log('Не все поля заполнены');
                return;
            }
      
            const fieldsData = statement.fields.map((field) => ({
                id: field.id,
                value: filteredObj[field.id]
            }));
      
            const requestData = {
                course_id: statement.course_id,
                application_id: statement.id,
                fields: fieldsData
            };
            
            const response = await ApplicationService.applicationIdSave(requestData.course_id, requestData.application_id, requestData.fields);
            //console.log('response', response);
            
            const applicationData = {
                statuses: statement.status,
                fields: statement.fields,
                fields_value: formData
            };
            localStorage.setItem('application', JSON.stringify(applicationData));
              
            if(response.status === 201)
            {
                setShowStatementStage('true');
            }
            
        } catch (error) {
          console.log(error);
        }
    }

    //отобразить поля для ввода
    async function getFields()
    {
        try {
            const response = await ApplicationService.applicationId(id);
            const data = response.data;
            const course = data.course;
            const applicationForms = course.applicationForms;
            const fields = applicationForms.fields.map((field) => ({
                id: field.id,
                name: field.name,
                type: field.type,
                required: field.required
            }));

            const statuses = data.application_statuses.map((stat) => ({
                id: stat.id,
                name: stat.status.status
            }))

            const updatedStatement = 
            {
                id: data.id,
                course_id: course.id,
                course: course.name,
                paid: course.paid,
                status: statuses,
                fields: fields,
            }
            setStatement(updatedStatement);

            const applicationData = {
                statuses: updatedStatement.status,
                fields: updatedStatement.fields,
                fields_value: formData
            };
            if (Object.values(applicationData.fields_value).length > 0){
                localStorage.setItem('application', JSON.stringify(applicationData));
            } 
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <main className='container'>
            <div className='app__main'>
                <section className='app__header'>
                    <div className='app__header-name'>
                    {role === 'student'
                        ?
                        <h1>Заявка на курс [{statement.course}]</h1>
                        :
                        <h1>Заявка #{statement.id}</h1>
                    }
                        <Breadcrumbs />
                    </div>
                    <div className='app__conclusion-history'>
                        {role === 'student' &&
                        <li className='app__filter-item'>
                            <NavLink className='app__filter-link' to={`/applications/${id}/info`}>О курсе</NavLink>
                        </li>
                        }
                        <li className='app__filter-item active'>
                            <NavLink className='app__filter-link' to={`/applications/${id}/statement`}>Заявка</NavLink>
                        </li>
                        <li className='app__filter-item'>
                            <NavLink className='app__filter-link' to={`/applications/${id}/history`}>История заявки</NavLink>
                        </li>
                    </div>   
                </section>
                <section className='app__content flex-display'>
                    {showStatementStage === 'true' ? (
                        <StatementVerification />
                    ):(
                        <div className='app__conclusion'>
                            <div className='app__category'>
                                <h2 className='app__category-header'>Данные пользователя:</h2>
                                <div className='app__category-input'>
                                    {statement.fields && statement.fields.map((field, index) => (
                                        <div key={index} className='app__input-box'>
                                            <label className='login-input-label'>{field.name}</label>
                                            <input 
                                                className='app__input-text' 
                                                type={field.type} 
                                                name={field.name} 
                                                required={field.required} 
                                                value={formData[field.id] || ''}
                                                onChange={(event) => handleChange(event, field.id)} 
                                                readOnly={statement?.status && !statement?.status[statement.status.length-1].name === 'FillInProgress'||'VerificationInProgress'||'VerificationOnEditing'}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='app__category'>
                                <h2 className='app__category-header'>Документы:</h2>
                                <div className='app__category-input'>
                                    
                                </div>
                            </div>
                            {statement?.status && statement?.status[statement.status.length-1].name != 'VerificationUnderConsidiration' &&
                                <div className='app__content-btn'>
                                    <button type='button' className='app__block-btn btn active' onClick={handleClick}>Далее</button>
                                </div>
                            }
                        </div>
                    )}
                    <div className='app__conclusion-stage'>
                        <div className='app__stage-state'>
                            <span>Этапы заявки:</span>
                            {statement.status && Array.isArray([statement.status[statement.status.length-1]]) && [statement.status[statement.status.length-1]].map((stat, index) => (
                                <div key={index} className='app__stage-list'>
                                    <div className={'app__stage '+stateStage(stat.name)[0]} >
                                        <div className='app__stage-indicator'>
                                            1. Заполнение
                                        </div>
                                    </div>
                                    <div className={'app__stage '+stateStage(stat.name)[1]} >
                                        <div className='app__stage-indicator'>
                                            2. Проверка
                                        </div>
                                    </div>
                                    {statement.paid === true &&
                                        <div className={'app__stage '+stateStage(stat.name)[2]} >
                                            <div className='app__stage-indicator'>
                                                3. Оплата
                                            </div>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default observer(Statement);