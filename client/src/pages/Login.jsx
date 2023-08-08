import React, { useContext, useState } from 'react';
import '../css/style.css';

import { NavLink } from 'react-router-dom';
import Checkbox from '../components/UI/Checkbox';
import { StoreContext } from '../index';
import { observer } from 'mobx-react-lite';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {store} = useContext(StoreContext);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        store.login(email, password);        
    };
    
    return(
        <div className='app__login'>
            <form className='app__auth' onSubmit={handleFormSubmit}>
                <h1 className='app__auth-header'>Вход</h1>
                <div className='app__auth-input'>
                    <div className='app__input-box'>
                        <label className='login-input-label'>Email</label>
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
                        <label className='login-input-label'>Пароль</label>
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
                <div className='app__auth-checkbox'>
                    <Checkbox type='standart' id={'checkbox-rem'} text={'Запомнить меня'} />
                    <a href='reset-password' className='app__auth-reset-password'>Забыли пароль?</a> 
                </div>      
                <div className='app__auth-box-button'>
                    <button type='submit' className='app__auth-button btn active'>Войти</button>
                </div>      
                <div className='app__auth-box-link'>
                    <span className='app__auth-box-link-label'>
                        Нет аккаунта?
                        <NavLink className='app__auth-link' to='/registration'>Зарегистрироваться</NavLink>
                    </span>
                </div>     
            </form>
        </div>
    )
}

//удалить если собираюсь отказаться от mobx и mobx-react-lite
export default observer(Login);

/*

                    <div className='app__input-box'>
                        <label className='login-input-label'>Email</label>
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

*/