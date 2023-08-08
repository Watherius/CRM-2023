import React, { useContext, useEffect, useState } from 'react';
import '../css/style.css';

import Logo from '../images/logo.png';
import Svg from '../components/UI/Svg';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../index';

function LeftMenu() {
    const [role, setRole] = useState('');
    const {store} = useContext(StoreContext)

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setRole(JSON.parse(savedUser).role);
        }
    }, [store.user]);

    return(
        <div className='left_menu'>
            <div className='logo'>
                <img src={Logo} alt='Логотип' />
            </div>
            <div>
                {role === 'manager' || role === 'admin'
                ?
                <ul className='page_navigator'>
                    <li className='page_navigator-btn'>
                        <NavLink className='page_navigator-link' to='/applications'>
                            <Svg name='applications' />
                            Заявки
                        </NavLink>
                    </li>
                    <li className='page_navigator-btn'>
                        <NavLink className='page_navigator-link' to='/courses'>
                            <Svg name='course' />
                            Курсы
                        </NavLink>
                    </li>
                    <li className='page_navigator-btn'>
                        <NavLink className='page_navigator-link' to='/forms'>
                            <Svg name='form' />
                            Формы
                        </NavLink>
                    </li>
                </ul> 
                : 
                <ul className='page_navigator'>
                    <li className='page_navigator-btn'>
                        <NavLink className='page_navigator-link active' to='/applications'>
                            <Svg name='course' />
                            Мои курсы
                        </NavLink>
                    </li>
                </ul>
                }              
            </div>
        </div>
    )
}

export default observer(LeftMenu);