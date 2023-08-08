import React, { useState } from 'react';
import '../../css/style.css'

function Checkbox(props) {
    const [id] = useState(`${props.id}-${Math.floor(Math.random() * 10000)}`);

    return(
        <div className='app__checkbox'>
            {props.type === 'standart' && 
                <div className='line-checkbox'>            
                        <input className='login-checkbox' type="checkbox" id={props.id} />
                        <label className='login-checkbox-label' htmlFor={props.id}>{props.text}</label>
                </div>
            }
            {props.type === 'custom'&& 
                <label htmlFor={id}>
                    <div className='app__checkbox-custom'>
                        <input type="checkbox" id={id} />
                        <div className="checkmark"></div>
                    </div>
                </label>
            }
        </div>
    )
}

export default Checkbox