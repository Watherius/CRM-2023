import React, { useState } from 'react';
import '../../css/style.css'

import Svg from './Svg';

function Notification(props) {
    let name = '';
    if (props.style === 'notification_successfully') {
        name = 'Успешно';
    } else if (props.style === 'notification_error') {
        name = 'Ошибка';
    } else if (props.style === 'notification_warning') {
        name = 'Внимание';
    }

    const notificationClose = () => {
        const notification = document.querySelector('.app__notification');

        if (notification) {
          notification.remove();
        }
    }

    return(
        <div className={`app__notification ${props.state}`}>
            <div className={`app__notification-block ${props.style}`}>
                <div className='notification-head'>
                    <Svg name={props.style} />
                    <span className='notification-name'>
                        {name}
                    </span>
                    <div onClick={notificationClose} className='notification-close'>
                        <Svg name='close' />
                    </div>
                </div>
                <div className='notification-content'>
                    <div className='notification-content-text'>
                        Ошибка ввода email или пароль.
                    </div>                    
                    <div className='notification-time'>
                        {new Date().toLocaleTimeString([], {hour: 'numeric', minute:'numeric'})} PM
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification;

/*
                    <div className='notification-content-text'>
                        <span className='notification-content-type'>{props.type}</span> для <span className='notification-content-fio'>{props.fio}</span> успешно создана
                    </div>   
*/