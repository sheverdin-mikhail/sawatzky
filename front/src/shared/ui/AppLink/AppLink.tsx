import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLInkTheme;
}

export const enum AppLInkTheme {
    NORMAL = 'normal',
    BLUE = 'blue'
}


export const AppLink: React.FC<AppLinkProps> = (props) => {
    const { className, to, children, theme=AppLInkTheme.NORMAL } = props;

    return (
        <Link to={to} className={classNames(cls.appLink, {}, [className, cls[theme]])}>
            {children}
        </Link>
    );
}