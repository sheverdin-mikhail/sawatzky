import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Header.module.scss';
import { ReactComponent as Logo } from 'shared/assets/icons/logo-icon.svg'

interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.header, {}, [className ?? ''])}>
            <Logo className={cls.logo} />
        </div>
    );
}