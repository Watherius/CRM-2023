import React, { useEffect, useState } from 'react';
import '../css/style.css';

import Breadcrumbs from '../components/Breadcrumbs';
import { observer } from 'mobx-react-lite';
import Checkbox from '../components/UI/Checkbox';
import Svg from '../components/UI/Svg';
import Table from '../components/UI/Table/Table';
import Filter from '../components/UI/Filter';
import FormsService from '../services/FormsService';
import { useNavigate } from 'react-router-dom';

function Forms() {
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);
    const [tableConclusion, setTableConclusion] = useState([])
    const [tableHeader, setTableHeader] = useState([
        {id: 1,
            type: 'text',
            name: '№',
            icon: <Svg name='arrow' />
        },
        {id: 2,
            type: 'text',
            name: 'Название',
            icon: <Svg name='arrow' />
        },
        {id: 3,
            type: 'text',
            name: 'Тип',
            icon: <Svg name='arrow' />
        },
        {id: 4,
            type: 'text',
            name: 'Кол-во курсов',
            icon: <Svg name='arrow' />
        },
        {id: 5,
            type: 'text',
            name: 'Статус',
            icon: <Svg name='arrow' />
        },
        {id: 6,
            type: 'empty'
        },
        {id: 7,
            type: 'input',
            name: <Checkbox id='checkbox-custom' type='custom' />
        }
    ])

    useEffect(() => {
        getForms();
    }, []);

    async function getForms()
    {
        try {
            const response = await FormsService.getForms();
            const updatedTableConclusion = response.data.map((form, index) => {

                return {
                    id: form.id,
                    number: index+1,
                    name: form.name,
                    type: form.type,
                    course_count: form.id,
                    status: form.archieve === false?'used':'no-used',
                    cap: '',
                    checkbox: ''
                }
            })
            setForms(response.data);
            setTableConclusion(updatedTableConclusion);
        } catch (error) {
            console.log(error)
        }
    } 

    function handleClick (event) {
        //event.preventDefault();
        navigate('/forms/create');
    }

    return(
        <main className='container'>
            <div className='app__main'>
                <section className='app__header'>
                    <div className='app__header-name'>
                        <h1>Формы</h1>
                        <Breadcrumbs />
                    </div>
                    <div className='app__filter'>
                        <nav className='app__filter-box'>
                            <Filter name='Все' href='all' css='app__filter-item active' />
                            <Filter name='Заявления' href='applications' css='app__filter-item' />
                            <Filter name='Письма' href='letters' css='app__filter-item' />
                        </nav>                        
                    </div>
                    <div className='app__search'>
                        <input type='text' name='text' className='app__search-item' placeholder='Поиск' />
                    </div>
                </section>
                <section className='app__content'>
                    <div className='app__table'>
                        <Table css='app__table-box table__forms' tableHeader={tableHeader} tableContent={tableConclusion} />
                    </div>
                </section>
                <section className='app__content-btn'>
                    <button onClick={handleClick} type='btn' className='app__auth-button btn active'>Создать форму</button>
                </section>                                
            </div>
        </main>
    )
}

export default observer(Forms);

/*
                    <div className='app__actions'>
                        {selected && selected.map((item) => 
                            <Button item={item} type='btnAction' class='btn__action' key={item.id} />
                        )}
                    </div>
*/