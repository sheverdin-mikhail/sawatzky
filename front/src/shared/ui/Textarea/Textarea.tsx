import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Textarea.module.scss';
import { ChangeEvent, TextareaHTMLAttributes, useCallback } from 'react';

type HTMLTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>

interface TextareaProps extends HTMLTextAreaProps {
	className?: string;
	value?: string;
	onChange?: (value: string)=>void
	rows?: number;
}

export const Textarea: React.FC<TextareaProps> = (props) => {
	const { 
		className, 
		value, 
		onChange, 
		placeholder, 
		rows=10,
		...otherProps 
	} = props;

	const onChangeHandler = useCallback((e: ChangeEvent)=>{
		if(onChange){
			onChange(e.target.ariaValueText || '')
		}
	},[onChange])

	return (
		<textarea 
			placeholder={placeholder}
			className={classNames(cls.textarea, {}, [className])}
			onChange={onChangeHandler}
			rows={rows}
			{...otherProps}
		>
			{value}
		</textarea>
	);
}