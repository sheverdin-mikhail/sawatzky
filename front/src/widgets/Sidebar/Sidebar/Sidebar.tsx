import { classNames } from 'shared/lib/classNames/classNames';
import { Notifications } from 'features/Notifications';
import cls from './Sidebar.module.scss';
import { Navigation } from '../Navigation/Navigation';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.sidebar, {}, [className ?? ''])}>
      <Navigation />
      <Notifications />
    </div>
  );
};
