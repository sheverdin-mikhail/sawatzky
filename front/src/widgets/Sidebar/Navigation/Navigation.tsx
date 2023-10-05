import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navigation.module.scss';
import { AppLink } from 'shared/ui/AppLink/AppLink';

import { ReactComponent as InfoIcon} from 'shared/assets/icons/info-icon.svg'
import { ReactComponent as AppointmentIcon} from 'shared/assets/icons/appointment-icon.svg'
import { ReactComponent as ReportIcon} from 'shared/assets/icons/report-icon.svg'
import { ReactComponent as DirectoryIcon} from 'shared/assets/icons/directory-icon.svg'
import { ReactComponent as ArchiveIcon} from 'shared/assets/icons/archive-icon.svg'
import { ReactComponent as DocIcon} from 'shared/assets/icons/doc-icon.svg'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/RouteConfig/appRouteConfig';

interface NavigationProps {
    className?: string;
}

export const Navigation: React.FC<NavigationProps> = (props) => {
    const { className } = props;

    const [ isCollapsed, setIsCollapsed ] = useState<boolean>(true)
    const { pathname } = useLocation()

    return (
        <div className={classNames(cls.navigation, {
            [cls.collapsed]: isCollapsed
        }, [className ?? ''])}
        onMouseEnter={()=>setIsCollapsed(false)}
        onMouseLeave={()=>setIsCollapsed(true)}
        >
            <AppLink className={cls.link} to={'/'}>
                <div className={cls.iconContainer}>
                    <InfoIcon className={cls.icon} />
                </div>
                <span className={cls.text} >
                    Информация
                </span>
            </AppLink>
            <AppLink className={classNames(cls.link, {
                [cls.active]: pathname === RoutePath.appointment
            }, [])} to={'/'}>
                <div className={cls.iconContainer}>
                    <AppointmentIcon className={cls.icon} />
                </div>
                <span className={cls.text} >
                    Заявки
                </span>
            </AppLink>
            <AppLink className={cls.link} to={'/'}>
                <div className={cls.iconContainer}>
                    <ReportIcon className={cls.icon} />
                </div>
                <span className={cls.text} >
                    Отчеты
                </span>
            </AppLink>
            <AppLink className={cls.link} to={'/'}>
                <div className={cls.iconContainer}>
                    <DirectoryIcon className={cls.icon} />
                </div>
                <span className={cls.text} >
                    Справочники
                </span>
            </AppLink>
            <AppLink className={cls.link} to={'/'}>
                <div className={cls.iconContainer}>
                    <ArchiveIcon className={cls.icon} />
                </div>
                <span className={cls.text} >
                    Архив
                </span>
            </AppLink>
            <AppLink className={cls.link} to={'/'}>
                <div className={cls.iconContainer}>
                    <DocIcon className={cls.icon} />
                </div>
                <span className={cls.text} >
                    Документы
                </span>
            </AppLink>
        </div>
    );
}