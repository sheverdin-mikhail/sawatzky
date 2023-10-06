import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Checkbox.module.scss';
import { InputHTMLAttributes } from 'react';


type HTMLCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface CheckboxProps extends HTMLCheckboxProps {
    className?: string;
    label?: string 
    id: string;
    value?: string;
    onChange?: (value: string) => void
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
    const { className, label, id, onChange, value } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    return (
        <div className={classNames(cls.checkboxContainer, {}, [className])}>
            <input 
                type='checkbox' 
                id={id} 
                value={value} 
                onChange={onChangeHandler}
                className={classNames(cls.checkbox, {}, [className])}  
            />  
            <label htmlFor={id} className={cls.label} >{ label && label }</label>
        </div>          
    );
}