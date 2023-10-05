import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { className, children, ...otherProps } = props;

    return (
        <Button className={classNames(cls.button, {}, [className ?? ''])} {...otherProps}>
            {children}
        </Button>
    );
}