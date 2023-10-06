import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Header.module.scss';
import { Logo } from 'shared/ui/Logo/Logo';

interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.header, {}, [className ?? ''])}>
            <Logo width={121} className={cls.logo} />
        </div>
    );
}