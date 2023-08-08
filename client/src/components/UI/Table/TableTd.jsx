import React from 'react';
import '../../../css/style.css'
import { StatusTraslition } from '../../../services/StatusTranslations';
import Checkbox from '../Checkbox';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const TableTd = ({ item, counter }) => {
  const history = useNavigate ();
  const location = useLocation();
  const handleClick = (e) => {
    const globalLocation = location.pathname.split('/').filter(local => local !== '').join('');
    if (globalLocation === 'applications') {
      history(item.status==='FillInProgress'||'VerificationInProgress'||'VerificationOnEditing'||'PaymentExpected'||'VerificationUnderConsidiration'||'PaymentUnderConsidiration'?`/applications/${item.id}/statement`:`/applications/${item.id}/info`);
    } else if (globalLocation === 'forms') {
      history(`/forms/${item.id}`);
    }
  };

  const cells = Object.entries(item)
    .filter(([key, value]) => value != null && key !== 'id')
    .map(([key, value], index) => {
      if (typeof value === 'object') 
      {
        const nestedValues = Object.values(value).join(' ');
        return (
          <td key={index} className={`c${counter++}`}>
            {nestedValues}
          </td>
        );
      } else if (key === 'status' || key === 'status_course') {
      return (
        <td key={index} className={`c${counter++}`}>
          {StatusTraslition(value)}
        </td>
      );
      } else if (key === 'checkbox') {
        return (
          <td key={index} className={`c${counter++}`}>
            {<div className='app__table-checkbox'><Checkbox id='checkbox-custom' type='custom' /></div>}
          </td>
        );
      } else if (key === 'btn') {
        return (
          <td key={index} className={`c${counter++}`}>
            {<a href='input-sdo' className='app__table-link'>Вход</a>}
          </td>
        );
      } else if (key === 'application_form_id' || key === 'letter_form_id') {
        return (
          <td key={index} className={`c${counter++}`}>
            {<Link to={`/forms/${value}`}>Посмотреть</Link>}
          </td>
        );
      }

      return (
        <td key={index} className={`c${counter++}`}>
          {value}
        </td>
      );
    });    
  
    return (
        <>
            {item.length == 0 ? (
                <div>Заявок нет</div>
            ) : (
              //<NavLink to={`/application/${item.id}`}>
                <tr onClick={handleClick}>{cells}</tr>
              //</NavLink>                
            )}
        </>
    );
  };

export default TableTd;