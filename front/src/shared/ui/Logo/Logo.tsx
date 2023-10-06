import { classNames } from 'shared/lib/classNames/classNames';
import {ReactComponent as LogoIcon } from 'shared/assets/icons/logo-icon.svg'

interface LogoProps {
    className?: string;
    width?: number;
}

export const Logo: React.FC<LogoProps> = (props) => {
    const { className, width=121 } = props;

    return (
        <LogoIcon style={{width: `${width}px`}}  className={classNames('', {}, [className])} />
    );
}