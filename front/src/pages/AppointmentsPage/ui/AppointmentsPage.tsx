import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentsPage.module.scss';
import { Title } from 'shared/ui/Title/Title';
import { AppointmentPreviewList, getAppointments } from 'entities/Appointment';
import { useSelector } from 'react-redux';

interface AppointmentsPageProps {
    className?: string;
}

const AppointmentsPage: React.FC<AppointmentsPageProps> = (props) => {
    const { className } = props;
    const appointments = useSelector(getAppointments)

    return (
        <div className={classNames(cls.appointmentsPage, {}, [className ?? ''])}>
            <Title className={cls.title}>
                Заявки
            </Title>
            <AppointmentPreviewList className={cls.list}  appointments={appointments} />
        </div>
    );
}

export default AppointmentsPage;