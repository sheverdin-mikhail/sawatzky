import { classNames } from 'shared/lib/classNames/classNames';
import { ReactComponent as BlackIcon } from 'shared/assets/icons/alert-icon.svg';
import { ReactComponent as BlueIcon } from 'shared/assets/icons/alert-blue-icon.svg';
import cls from './NotificationIcon.module.scss';

interface NotificationIconProps {
  className?: string;
  length: number;
  isCollapsed: boolean;
}

export const NotificationIcon: React.FC<NotificationIconProps> = (props) => {
  const { length, isCollapsed } = props;

  return (
    <div className={classNames(cls.notificationIcon, { [cls.active]: !isCollapsed }, [])}>
      {length === 0 ? <BlackIcon /> : <BlueIcon className={classNames(cls.blueIcon, { [cls.onAnimate]: isCollapsed }, [])} />}
    </div>
  );
};
