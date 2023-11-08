import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { Navigation } from '../Navigation/Navigation';
import { Alerts } from '../Alerts/Alerts';

interface SidebarProps {
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.sidebar, {}, [className ?? ''])}>
            <Navigation />
            <Alerts />
        </div>
    );
};
