import React, { useContext, useEffect, useState } from 'react';
import '../css/style.css';

import { observer } from 'mobx-react-lite';
import Breadcrumbs from '../components/Breadcrumbs';
import { StoreContext } from '..';
import { useParams } from 'react-router-dom';
import Svg from '../components/UI/Svg';
import FormFields from '../components/FormFields';

function FormCreate() {
    const { id } = useParams();
    const { store } = useContext(StoreContext);

    return(
        <main className='container'>
            <div className='app__main'>
                <section className='app__header'>
                    <div className='app__header-name'>
                        <h1>Создание формы</h1>
                        <Breadcrumbs />
                    </div> 
                </section>
                <section className='app__content'>
                    <div className='app__settings-content'>
                        <div className='app__setting-item'>
                            <div className='app__setting-name'>
                                Выбрать курс:
                            </div>
                            <div className='app__setting-input-box'>
                                <select className='app__setting-input'>
                                    <option defaultValue={''} hidden>Выберите курс</option>
                                    <option>Go в цифру</option>
                                    <option>Вперед в IT</option>
                                </select>
                            </div>
                        </div>
                        <div className='app__setting-item'>
                            <div className='app__setting-name'>
                                Тип формы:
                            </div>
                            <div className='app__setting-input-box'>
                            <select className='app__setting-input'>
                                <option defaultValue={''} hidden>Выберите тип формы</option>
                                <option value={'application'}>Заявка</option>
                                <option value={'letter'}>Письмо</option>
                            </select>
                            </div>
                        </div>
                        <div className='app__setting-item'>
                            <div className='app__setting-name'>
                                Название формы:
                            </div>
                            <div className='app__setting-input-box'>
                                <input type='text' name='text' className='app__setting-input' placeholder='Введите название формы' />
                            </div>
                        </div>
                    </div>
                    <FormFields />
                    <div className='app__content-btn'>
                        <button type='button' className='app__block-btn btn active'>Создать</button>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default observer(FormCreate);