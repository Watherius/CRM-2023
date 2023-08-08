import React from 'react';
import '../css/style.css'
import Svg from './UI/Svg';


function HistoryItem(props) {
    const applicationData = JSON.parse(localStorage.getItem('application'))

    function datetime(date)
    {
        const datetime = new Date(date);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(datetime);
        return formattedDate;
    }

    function time(date)
    {
        const datetime = new Date(date);
        const time = datetime.toTimeString().slice(0, 8);
        return time;
    }

    function statementDate(date)
    {
        const datetime = new Date(date);
        const formattedDate = datetime.toLocaleDateString({
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        return formattedDate;
    }

    return(
        <div className='app__conclusion-history-list'>
            {props.name === 'VerificationUnderConsidiration' &&
                <div key={props.index+1} className='app__conclusion-history-item'>
                    <div className='app__item-time'>
                        <span className='app__time-date'>{datetime(props.datetime)}</span>
                        <span className='app__time-clock'>{time(props.datetime)}</span>
                    </div>
                    <div className='app__item-content waiting'>
                        <div className='app__item-name'>
                            <div className='app__item-icon'>
                                <Svg name='wait' />
                            </div>
                            Заявка в обработке
                        </div>
                    </div>
                </div>
            }
            {props.name === 'VerificationUnderConsidiration' &&
                <div key={props.index} className='app__conclusion-history-item'>
                    <div className='app__item-time'>
                        <span className='app__time-date'>{datetime(props.datetime)}</span>
                        <span className='app__time-clock'>{time(props.datetime)}</span>
                    </div>
                    <div className='app__item-content correct'>
                        <div className='app__item-name'>
                            <div className='app__item-icon'>
                                <Svg name='yes' />
                            </div>
                            Заявка создана
                        </div>
                        <div className='app__item-text'>
                            <div className='app__category-list '>
                            {applicationData && applicationData.fields && applicationData.fields.map((field, index) => (
                                <div key={index} className='app__category-item'>
                                    <div className='app__category-item-text'>
                                        <span className='app__category-item-header'>{field.name}</span>
                                        {field.type === 'date'?statementDate(applicationData && applicationData.fields_value[field.id]):applicationData.fields_value[field.id]}
                                    </div>
                                </div>
                            ))}                                
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default HistoryItem;

/*
<HistoryItem 
    css='app__item-content incorrect' 
    date='13.03.2023г' 
    time='18:00' 
    icon={<Svg name='no' />} 
    name='Доступ закрыт'
    item={components}
/>
<HistoryItem 
    css='app__item-content warning' 
    date='13.03.2023г' 
    time='18:00' 
    icon={<Svg name='warning' />} 
    name='Заявка оклонена'
    item={components}
/>
<HistoryItem 
    css='app__item-content waiting' 
    date='13.03.2023г' 
    time='13:00' 
    icon={<Svg name='wait' />} 
    name='Заявка в обработке'
    item={components}
/>
<HistoryItem 
    css='app__item-content correct' 
    date='13.03.2023г' 
    time='13:00' 
    icon={<Svg name='yes' />} 
    name='Заявка создана'
    item={components}
/>
*/

    /*const [components, setComponents] = useState([
        { id: 1, type: 'text', title: 'ФИО:', body: 'Орлов Илья Игоревич' },
        {
          id: 2,
          type: 'file',
          title: 'Документы:',
          body: [
            {
              id: 1,
              element: <StatusApp css='status__app file' text='Файл 1' />
            },
            {
              id: 2,
              element: <StatusApp css='status__app file' text='Файл 2' />
            }
          ]
        }
    ]);*/