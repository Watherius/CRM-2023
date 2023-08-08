import React, { useState } from 'react';
import '../css/style.css'
import Svg from './UI/Svg';

function FormFields() {
    const [fields, setFields] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [editIndex, setEditIndex] = useState(-1);

    function createField() {
        const field = {
            name: '',
            type: '',
        }
        setFields(prevFields => [...prevFields, field]);
        setEditIndex(fields.length);
    }

    function saveFieldSettings(index) {
        if (selectedType === '' || fieldName === '') {
            console.log('Не все поля заполнены');
            return;
        }

        const updatedFields = [...fields];
        updatedFields[index].type = selectedType;
        updatedFields[index].name = fieldName;
        setFields(updatedFields);
        setSelectedType('');
        setFieldName('');
        setEditIndex(-1);
    }

    function deleteField(index) {
        setFields(prevFields => prevFields.filter((_, i) => i !== index));
    }

    function editField(index) {
        setEditIndex(index);
        setSelectedType(fields[index].type)
        setFieldName(fields[index].name);
    }

    console.log('fields: ', fields)

    return(
        <div className='app__create-content'>
            {fields.map((field, index) => (
                <div key={index} className='app__input-box'>
                    <div className='app_input-actions'>
                        <div className='app_setting-edit' onClick={() => editField(index)}>
                            <Svg  name='input_edit'/>
                        </div>
                        <div className='app_setting-edit' onClick={() => deleteField(index)}>
                            <Svg  name='input_close'/>
                        </div>
                    </div>
                    <label className='login-input-label'>
                        {fields[index].name === ''?'Название поля':fields[index].name}
                    </label>
                    <input 
                        className='app__input-text'  
                        type='text' 
                        name=''
                        required={false}
                        disabled
                    />
                    {index === editIndex && (
                        <div className='app__input-settings'>
                            <div className='app__setting-item'>
                                <div className='app__setting-name'>
                                    Тип поля:
                                </div>
                                <div className='app__setting-input-box'>
                                    <select 
                                        className='app__setting-input'
                                        value={selectedType}
                                        //value={fields[index].type===''?selectedType:fields[index].type}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                    >
                                        <option defaultValue={''} hidden>Выберите тип поля</option>
                                        <option value={'text'}>Текст</option>
                                        <option value={'phone'}>Телефон</option>
                                        <option value={'date'}>Дата</option>
                                        <option value={'file'}>Файлы</option>
                                    </select>
                                </div>
                            </div>
                            <div className='app__setting-item'>
                                <div className='app__setting-name'>
                                    Название:
                                </div>
                                <div className='app__setting-input-box'>
                                    <input 
                                        type='text' 
                                        name='text' 
                                        className='app__setting-input' 
                                        placeholder='Введите название поля' 
                                        value={fieldName}
                                        //value={fields[index].name===''?fieldName:fields[index].name}
                                        onChange={(e) => setFieldName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button type='button' className='app__block-btn btn active' onClick={() => saveFieldSettings(index)}>Применить</button>
                        </div>
                    )}
                </div>
            ))}
            <div onClick={createField} className='app_create-btn'>
                Создать поле
            </div>
        </div>
    )
}


export default FormFields;