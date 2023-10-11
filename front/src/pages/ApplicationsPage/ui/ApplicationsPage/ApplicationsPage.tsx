import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ApplicationsPage.module.scss';
import { ApplicationsPageContent } from '../ApplicationsPageContent/ApplicationsPageContent';


interface ApplicationsPageProps {
    className?: string;
}



const ApplicationsPage: React.FC<ApplicationsPageProps> = (props) => {
    const { className } = props;
   

    return (
        <div className={classNames(cls.applicationsPage, {}, [className ?? ''])}>
            <ApplicationsPageContent />
        </div>
    );
}

export default ApplicationsPage;