import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentTag.module.scss';
import { AppointmentStatus } from '../../models/types/appointment';
import { memo, useCallback } from 'react';

interface AppointmentTagProps {
    className?: string;
    status: AppointmentStatus;
}


export const AppointmentTag: React.FC<AppointmentTagProps> = memo((props) => {
    const { className, status=AppointmentStatus.NEW } = props;


    const  AppointmentTagMods: Mods = {
        [cls.new]: status === AppointmentStatus.NEW,
        [cls.coordination]: status === AppointmentStatus.COORDINATION,
        [cls.paymentCoordination]: status === AppointmentStatus.PAYMENT_COORDINATION,
        [cls.inWork]: status === AppointmentStatus.IN_WORK,
        [cls.processed]: status === AppointmentStatus.PROCESSED,
        [cls.finished]: status === AppointmentStatus.FINISHED,
    }

    const statusMessage = useCallback(()=>{
        switch(status){
            case AppointmentStatus.NEW:
                return 'Заявка создана'
            case AppointmentStatus.COORDINATION:
                return 'На согласовании у заказчика'
            case AppointmentStatus.PAYMENT_COORDINATION:
                return 'Ожидается оплата'
            case AppointmentStatus.IN_WORK:
                return 'Отправлено исполнителю'
            case AppointmentStatus.PROCESSED:
                return 'Частично выполнена'
            case AppointmentStatus.FINISHED:
                return 'Заявка выполнена'
           
        }
    },[status])

    return (
        <div className={classNames(cls.appointmentTag, AppointmentTagMods, [className])}>
            {statusMessage()}
        </div>
    );
})