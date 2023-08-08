import React, { useEffect } from 'react';
import '../../../css/style.css'

import TableTd from './TableTd';
import TableTh from './TableTh';

const Table = (props) => {    
    return (
        <>
        <table className={props.css}>
            <thead>
                <tr>
                    {props.tableHeader && props.tableHeader.map((head, index) => 
                        <TableTh head={head} key={head.id} counter={`c${index}`} />
                    )}
                </tr>
            </thead>
            <tbody>
                {props.tableContent && props.tableContent.map((item) => 
                {
                    const counter = 0;
                    return (
                        <TableTd 
                            item={item} 
                            key={item.id} 
                            counter={counter} 
                        />
                    )
                })}
            </tbody>
            
        </table>
        {props.tableContent?.length === 0 && <div style={{ width: '100%', fontSize: '24px', fontWeight: 600}}>Нет данных</div>}
        </>
        
    )
}

export default Table;