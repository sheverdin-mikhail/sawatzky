import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentsPage.module.scss';

interface AppointmentsPageProps {
    className?: string;
}

const AppointmentsPage: React.FC<AppointmentsPageProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.appointmentsPage, {}, [className ?? ''])}>
            <h1 className={cls.title} >
                Название заявки
            </h1>
            
        </div>
    );
}

export default AppointmentsPage;