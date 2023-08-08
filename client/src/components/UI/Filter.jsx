import React from 'react';
import '../../css/style.css'

function Filter(props) {
    return(
        <li className={props.css}>
            <a href={props.href} className='app__filter-link'>{props.name}</a>
        </li>
    )
}

export default Filter