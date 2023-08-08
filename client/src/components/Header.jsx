import React, { useContext, useEffect, useState } from 'react';
import '../css/style.css';

import imgStudent from '../images/student.png';
import imgManager from '../images/manager.png';
import { StoreContext } from '../index';
import Svg from './UI/Svg';

function Header() {
    const {store} = useContext(StoreContext)
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : [];
    });

    useEffect(() => {
        if (store.user) {
            const newUser = {
                id: store.user.id,
                role: store.user.role,
                firstName: store.user.firstName,
                secondName: store.user.secondName,
                avatar: store.user.role === 'student' ? imgStudent : imgManager
            };
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
        }
    }, [store.user]);

    function changeRole(originRole)
    {
        switch(originRole)
        {
            case 'manager':
                return 'Менеджер';
            case 'admin':
                return 'Администратор';
            default:
                return 'Слушатель';
        }
    }

    return(
        <div className='header'>
            <div className='global_search'>
                <Svg name='search' />
                <input type='text' name='text' placeholder='Поиск' />
            </div>
                <div className='usermenu'>
                    <div className='usermenu__content'>
                        <div className='usermenu__avatar'>
                            <img src={user.avatar} alt='Аватар пользователя' />
                        </div>
                        <div className='usermenu__info'>
                            <div className='usermenu__user'>
                            {changeRole(user.role)}
                            </div>
                            <div className='usermenu__name'>
                                {user.firstName} {user.secondName}
                            </div>
                        </div>
                        <div className='usermenu__btn'>
                            <button className='usermenu__exit' onClick={() => store.logout()}>
                                <Svg name='exit' />
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Header;