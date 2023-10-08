import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentPreviewList.module.scss';
import { Appointment } from 'entities/Appointment/models/types/appointment';
import { AppointmentPreviewItem } from '../AppointmentPreviewItem/AppointmentPreviewItem';

interface AppointmentPreviewListProps {
    className?: string;
    appointments?: Appointment[];
}

export const AppointmentPreviewList: React.FC<AppointmentPreviewListProps> = (props) => {
    const { className, appointments } = props;

    return (
        <div className={classNames(cls.appointmentPreviewList, {}, [className])}>
            {
                appointments && appointments.length > 0
                ?
                    appointments.map((appointment) => (
                        <AppointmentPreviewItem item={appointment} key={appointment.id} className={cls.item} /> 
                    ))
                :
                    <div>Заявки не найдены</div>
            }
        </div>
    );
}