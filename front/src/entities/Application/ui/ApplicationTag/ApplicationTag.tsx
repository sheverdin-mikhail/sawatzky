import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './ApplicationTag.module.scss';
import { ApplicationStatus } from '../../models/types/application';
import { memo, useCallback } from 'react';

interface ApplicationTagProps {
    className?: string;
    status: ApplicationStatus;
}


export const ApplicationTag: React.FC<ApplicationTagProps> = memo((props) => {
    const { className, status=ApplicationStatus.NEW } = props;


    const  ApplicationTagMods: Mods = {
        [cls.new]: status === ApplicationStatus.NEW,
        [cls.coordination]: status === ApplicationStatus.COORDINATION,
        [cls.paymentCoordination]: status === ApplicationStatus.PAYMENT_COORDINATION,
        [cls.inWork]: status === ApplicationStatus.IN_WORK,
        [cls.processed]: status === ApplicationStatus.PROCESSED,
        [cls.finished]: status === ApplicationStatus.FINISHED,
    }

    const statusMessage = useCallback(()=>{
        switch(status){
            case ApplicationStatus.NEW:
                return 'Заявка создана'
            case ApplicationStatus.COORDINATION:
                return 'На согласовании у заказчика'
            case ApplicationStatus.PAYMENT_COORDINATION:
                return 'Ожидается оплата'
            case ApplicationStatus.IN_WORK:
                return 'Отправлено исполнителю'
            case ApplicationStatus.PROCESSED:
                return 'Частично выполнена'
            case ApplicationStatus.FINISHED:
                return 'Заявка выполнена'
           
        }
    },[status])

    return (
        <div className={classNames(cls.ApplicationTag, ApplicationTagMods, [className])}>
            {statusMessage()}
        </div>
    );
})