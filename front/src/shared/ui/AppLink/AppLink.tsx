import { classNames } from 'shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import cls from './AppLink.module.scss';

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLInkTheme;
    isActive?: boolean;
}

export const enum AppLInkTheme {
    NORMAL = 'normal',
    BLUE = 'blue',
    BUTTON = 'button'
}

export const AppLink: React.FC<AppLinkProps> = (props) => {
  const {
    className, to, children, isActive, theme = AppLInkTheme.NORMAL,
  } = props;

  return (
    <Link
      to={to}
      className={classNames(cls.appLink, {
        [cls.active]: isActive,
      }, [className, cls[theme]])}
    >
      {children}
    </Link>
  );
};
