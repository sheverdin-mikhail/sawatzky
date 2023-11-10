import { classNames } from 'shared/lib/classNames/classNames';
import { InputHTMLAttributes, memo } from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps{
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    id?: string;
}

export const Input: React.FC<InputProps> = memo((props) => {
  const {
    className, value, onChange, placeholder, type = 'text', label, id, ...otherProps
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classNames(cls.inputContainer, {}, [className])}>
      {
        label && <label className={cls.label} htmlFor={id}>{label}</label>
      }
      <input
        id={id}
        className={cls.input}
        type={type}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        {...otherProps}
      />
    </div>

  );
});
