import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentPage.module.scss';

interface AppointmentPageProps {
    className?: string;
}

const AppointmentPage: React.FC<AppointmentPageProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.appointmentPage, {}, [className ?? ''])}>
            
        </div>
    );
}

export default AppointmentPage;