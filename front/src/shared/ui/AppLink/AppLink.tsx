import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';

interface AppLinkProps extends LinkProps {
    className?: string;
}


export const AppLink: React.FC<AppLinkProps> = (props) => {
    const { className, to, children } = props;

    return (
        <Link to={to} className={classNames(cls.appLink, {}, [className ?? ''])}>
            {children}
        </Link>
    );
}