const message = {
    //Регистрация пользователя
        userExists: 'Пользователь с таким [Email] или [Телефоном] уже существует',
        userRegistered: 'Пользователь успешно зарегистрирован',
        errorRegistration: 'Ошибка регистрации',

    //Авторизация пользователя
        userNoExists: 'Пользователь не найден',
        incorrectPassword: 'Введен неверный пароль',
        successfulAuthorization: 'Авторизация прошла успешно',
        errorAuthorization: 'Ошибка авторизации',
    
    //Создание курса
        courseExists: 'Курс с таким именем уже есть',
        courseNameMatch: 'Поле с названием курса не может быть пустым',
        noForms: 'Одна из выбранных форм не существует',
        createdCourse: 'Курс успешно создан',
        errorCreatedCourse: 'Ошибка создания курса',

    //Вывести все курсы
        errorCoursesRequest: 'Ошибка вывода курсов',
    
    //Вывести курс
        courseNoExists: 'Такого курса не существует',
        errorCourseRequest: 'Ошибка вывода курса',

    //Закрыть курсы
        coursesClosed: 'Курс(ы) закрыт(ы)',
        errorCoursesClosed: 'Ошибка закрытия курса(ов)',

    //Открыть курсы
        coursesOpend: 'Курс(ы) открыт(ы)',
        errorCoursesClosed: 'Ошибка открытия курса(ов)',

    //Удаление курсов на странице Курсов
        coursesDeleted: 'Курс(ы) удален(ы)',
        errorCoursesDeleted: 'Ошибка удаления курсов(а)',

    //Удаление курса
        courseDeleted: 'Курс удален',
        errorCourseDeleted: 'Ошибка удаления курса',

    //Редактирование курса
        editCourseNoExists: 'Такого курса не существует',
        editCourseNameMatch: 'Поле с названием курса не может быть пустым',
        editNoForms: 'Одна из выбранных форм не существует',
        changedFields: 'Поля курса изменены',
        errorEditCourse: 'Ошибка имзенения курса',

    //Создание формы заявления
        noFields: 'Нет ни одного поля',
        createdForm: 'Форма успешно создана',
        errorCreatedForm: 'Ошибка создания формы',
    
    //Редактирование формы
    
    //Вывести все формы
        errorFormsRequest: 'Ошибка запроса списка форм',

    //Вывести все архивированные формы 
        errorArchieveFormsRequest: 'Ошибка запроса списка форм',
    
    //Вывести форму
        formNoExists: 'Такой формы не существует',
        errorFormRequest: 'Ошибка запроса формы',

    //Архивировать формы
        attachedForms: 'Форма(ы) привязана(ы) к курсу(ам)',
        archieveForms: 'Форма(ы) помещена(ы) в архив',
        errorArchieveForms: 'Ошибка при помещении форм(ы) в архив',
        
    //Архивировать форму
        attachedForm: 'Форма привязана к курсу(ам)',
        archieveForm: 'Форма помещена в архив',
        errorArchieveForm: 'Ошибка при помещении формы в архив',

    //Реархивировать форму
        rearchieveForm: 'Форма помещена из архива',
        errorRearchieveForm: 'Ошибка при помещении формы из архива'
}

module.exports = message;