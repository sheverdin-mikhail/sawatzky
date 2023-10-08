import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentsPage.module.scss';
import { AppointmentsPageContent } from '../AppointmentsPageContent/AppointmentsPageContent';


interface AppointmentsPageProps {
    className?: string;
}



const AppointmentsPage: React.FC<AppointmentsPageProps> = (props) => {
    const { className } = props;
   

    return (
        <div className={classNames(cls.appointmentsPage, {}, [className ?? ''])}>
            <AppointmentsPageContent />
        </div>
    );
}

export default AppointmentsPage;