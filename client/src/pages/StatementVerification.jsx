import React, { useContext, useEffect, useState } from 'react';
import '../css/style.css';

import { observer } from 'mobx-react-lite';
import { ShowStatementStage } from '../hooks/useContext';
import { useNavigate, useParams } from 'react-router-dom';
import ApplicationService from '../services/ApplicationService';

function StatementVerification() {
    const { id } = useParams();
    const history = useNavigate ();
    const { showStatementStage, setShowStatementStage } = useContext(ShowStatementStage);

    const applicationData = JSON.parse(localStorage.getItem('application'))
    async function getApplicationSubmit()
    {
        try {
            const response = await ApplicationService.applicationIdSubmit(id);
            const data = response.data;

            const applicationStageData = JSON.parse(localStorage.getItem('application'))
            applicationStageData.statuses.push({ id: data.secondStatus.id, name: data.newStatus.status });
            localStorage.setItem('application', JSON.stringify(applicationStageData));
            if (response.status === 200)
            {
                setShowStatementStage('false')
                history(`/applications`);
            }
        } catch (error) {
            console.log(error)
        }
    }

    function backClick()
    {
        setShowStatementStage('false')
    }

    function nextClick()
    {
        getApplicationSubmit();
    }

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

    return(
        <div className='app__registration-verification-stage'>
            <span className='app__registration-end-text-1'>Ваша заявка находятся на этапе проверки!</span>
            <span className='app__registration-end-text-2'>Проверьте свои данные перед отправлением и ожидайте ответа от менеджера.</span>
            <div className='app__category'>
                <h2 className='app__category-header'>Данные завяки:</h2>
                <div className='app__category-list'>
                    {applicationData && applicationData.fields && applicationData.fields.map((field, index) => (
                        <div key={index} className='app__category-item-text'>
                            <span className='app__category-item-header'>{field.name}:</span>
                            {field.type === 'date'?datetime(applicationData && applicationData.fields_value[field.id]):applicationData.fields_value[field.id]}
                        </div>
                    ))}
                    <div className='app__category-item-files'>
                        <span className='app__category-item-header'>Документы:</span>
                        <div className='app__category-item-box'>
                        </div>                        
                    </div>
                </div>
            </div>
            <div className='app__content-btn'>
                <button type='button' className='app__block-btn btn' onClick={backClick}>Назад</button>
                <button type='button' className='app__block-btn btn active' onClick={nextClick}>Далее</button>
            </div> 
        </div>
    )
}

export default observer(StatementVerification);