import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AlertIcon.module.scss';
import { ReactComponent as BlackIcon } from 'shared/assets/icons/alert-icon.svg';
import { ReactComponent as BlueIcon } from 'shared/assets/icons/alert-blue-icon.svg';

interface AlertIconProps {
  className?: string;
  length: number;
  isCollapsed: boolean;
}

export const AlertIcon: React.FC<AlertIconProps> = (props) => {
  const { length, isCollapsed } = props;

  return (
    <div className={classNames(cls.alertIcon, { [cls.active]: !isCollapsed }, [])}>
      {length === 0 ? <BlackIcon /> : <BlueIcon />}
    </div>
  );
}