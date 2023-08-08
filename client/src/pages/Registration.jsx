import React, { useContext, useState } from 'react';
import '../css/style.css';

import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../index';

function Registration() {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {store} = useContext(StoreContext);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        store.registration(firstName, secondName, middleName, phone, email, password);
    };

    return(
        <div className='app__registration'>
            <form className='app__auth' onSubmit={handleFormSubmit}>
                <h1 className='app__auth-header'>Регистрация</h1>
                <div className='app__auth-input'>
                    <div className='app__input-box'>
                        <label className='login-input-label'>Имя*</label>
                        <input 
                            type='text'
                            name='text'
                            className='app__input-text'
                            placeholder='Имя'
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                    </div>
                    <div className='app__input-box'>
                        <label className='login-input-label'>Фамилия*</label>
                        <input 
                            type='text'
                            name='text'
                            className='app__input-text'
                            placeholder='Фамилия'
                            required
                            onChange={(e) => setSecondName(e.target.value)}
                            value={secondName}
                        />
                    </div>
                    <div className='app__input-box'>
                        <label className='login-input-label'>Отчество*</label>
                        <input 
                            type='text'
                            name='text'
                            className='app__input-text'
                            placeholder='Отчество'
                            required
                            onChange={(e) => setMiddleName(e.target.value)}
                            value={middleName}
                        />
                    </div>
                    <div className='app__input-box'>
                        <label className='login-input-label'>Номер телефона*</label>
                        <input 
                            type='text'
                            name='phone'
                            className='app__input-text'
                            placeholder='+7'
                            required
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                        />
                    </div>
                    <div className='app__input-box'>
                        <label className='login-input-label'>Введите свой Email*</label>
                        <input 
                            type='text'
                            name='email'
                            className='app__input-text'
                            placeholder='Email'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className='app__input-box'>
                        <label className='login-input-label'>Придумайте пароль*</label>
                        <div className='app__input-box-password'>
                            <input 
                                type='password'
                                name='password' 
                                className='app__input-text app__login-input' 
                                placeholder='Пароль'
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>                    
                    </div>
                </div>   
                <div className='app__auth-box-button'>
                    <button type='submit' className='app__auth-button btn active'>Зарегистрироваться</button>
                </div>      
                <div className='app__auth-box-link'>
                    <span className='app__auth-box-link-label'>
                        Уже есть аккаунт?
                        <NavLink className='app__auth-link' to='/login'>Войти</NavLink>
                    </span>
                </div>     
            </form>
        </div>
    )
}

export default observer(Registration);