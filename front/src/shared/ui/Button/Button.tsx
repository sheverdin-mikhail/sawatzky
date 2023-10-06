import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonThemes;
    disabled?: boolean; 
}

export enum ButtonThemes {
    BLUE_SOLID = 'blueSolid'
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { className, children, disabled=false, theme=ButtonThemes.BLUE_SOLID, ...otherProps } = props;


    return (
        <button 
            disabled={disabled} 
            className={classNames(cls.button, {
                [cls.disabled]: disabled
            }, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </button>
    );
}