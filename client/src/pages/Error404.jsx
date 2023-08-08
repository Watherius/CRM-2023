import React from 'react';
import '../css/style.css';

function Error404() {
    return(
        <main className='container'>
            <div className='app__main'>
                <section className='app__content'>
                    <div className='app__error404'>
                        <span>Ошибка 404</span>
                        <span>Страница не найдена</span>
                    </div>
                </section>                             
            </div>
        </main>
    )
}

export default Error404;