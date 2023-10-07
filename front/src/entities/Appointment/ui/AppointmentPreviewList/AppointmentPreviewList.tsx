import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentPreviewList.module.scss';
import { Appointement } from 'entities/Appointment/models/types/appointment';
import { AppointmentPreviewItem } from '../AppointmentPreviewItem/AppointmentPreviewItem';

interface AppointmentPreviewListProps {
    className?: string;
    appointments: Appointement[];
}

export const AppointmentPreviewList: React.FC<AppointmentPreviewListProps> = (props) => {
    const { className, appointments } = props;

    return (
        <div className={classNames(cls.appointmentPreviewList, {}, [className])}>
            {
                appointments.map((appointment) => (
                    <AppointmentPreviewItem item={appointment} key={appointment.id} className={cls.item} /> 
                ))
            }
        </div>
    );
}