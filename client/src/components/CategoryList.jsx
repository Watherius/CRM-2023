import React from 'react';
import '../css/style.css'

function CategoryList(props) {
    return(
        <div className='app__category-item'>
            {props.item.type === 'text' && 
            <div className='app__category-item-text'>
                <span className='app__category-item-header'>{props.item.title}</span>
                {props.item.body}
            </div>}
            {props.item.type === 'file' && (
            <div className='app__category-item-text'>
                <span className='app__category-item-header'>{props.item.title}</span>
                <div className='app__category-item-files'>
                    {props.item.body.map((file) => (
                        <div key={file.id}>{file.element}</div>
                    ))}
                </div>
            </div>
            )}
        </div>
    )
}

export default CategoryList;