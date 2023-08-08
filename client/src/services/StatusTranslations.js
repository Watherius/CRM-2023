import '../css/style.css'

export function StatusTraslition(status)
{
    switch(status)
    {
        case 'FillInProgress':
        case 'VerificationInProgress':
            return <div className="status__app in-process">В процессе</div>;
        case 'VerificationUnderConsidiration':
        case 'PaymentUnderConsidiration':
            return <div className="status__app expectation">На рассмотрении</div>;
        case 'VerificationOnEditing':
            return <div className="status__app in-process">На редактировании</div>;
        case 'VerificationProcessed':
        case 'PaymentProcessed':
            return <div className="status__app accepted">Заявка обработана</div>;
        case 'VerificationRejected':
        case 'PaymentRejected':
            return <div className="status__app reject">Заявка отклонена</div>;
        case 'PaymentExpected':
            return <div className="status__app waiting">Ожидается оплата</div>;
        case 'close':
            return <div className="status__app deny">Доступ закрыт</div>;
        case 'open':
            return <div className="status__app allow">Доступ есть</div>;
        case 'used':
            return <div className="status__app used">Используется</div>;
        case 'no-used':
            return <div className="status__app no-used">В архиве</div>;
        case 'close-course':
            return <div className="status__app deny">Закрыт</div>;
        case 'open-course':
            return <div className="status__app allow">Открыт</div>;
        default:
            return '';
    }
}

export function stateStage(stage)
{
    switch(stage)
    {
        case 'FillInProgress':
        case 'VerificationInProgress':
            return ['current', 'default', 'default'];
        case 'VerificationUnderConsidiration':
            return ['done', 'current', 'default'];
        case 'VerificationOnEditing':
            return ['current', 'not-done', 'default'];
        case 'VerificationProcessed':
            return ['done', 'done', 'default'];
        case 'VerificationRejected':
            return ['not-done', 'not-done', 'default'];
        case 'PaymentExpected':
        case 'PaymentUnderConsidiration':
            return ['done', 'done', 'current'];
        case 'PaymentProcessed':
            return ['done', 'done', 'done'];
        case 'PaymentRejected':
            return ['done', 'done', 'not-done'];
        default:
            return 'default';
    }
}