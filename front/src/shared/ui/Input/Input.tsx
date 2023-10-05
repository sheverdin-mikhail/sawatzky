import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { InputHTMLAttributes, memo } from 'react';


type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps{
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const Input: React.FC<InputProps> = memo((props) => {
    const { className, value, onChange, placeholder, type='text', ...otherProps } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value)
    }

    return (
        <input 
            className={classNames(cls.input, {}, [className])}  
            type='text'
            value={value}
            onChange={onChangeHandler}
            placeholder={placeholder}

            {...otherProps} 
        />
            
    );
})