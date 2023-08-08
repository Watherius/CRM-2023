import React from 'react';
import '../../../css/style.css'

const TableTh = ({ head, counter }) => {
    return (
        <th className={counter}>
            {head.name}
            {head.icon}
        </th>
    )
}

export default TableTh;