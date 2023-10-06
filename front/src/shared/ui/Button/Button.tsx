import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonThemes;
}

export enum ButtonThemes {
    BLUE_SOLID = 'blueSolid'
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { className, children, theme=ButtonThemes.BLUE_SOLID, ...otherProps } = props;


    return (
        <button className={classNames(cls.button, {}, [className, cls[theme]])} {...otherProps}>
            {children}
        </button>
    );
}