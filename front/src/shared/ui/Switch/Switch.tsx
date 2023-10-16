import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Switch.module.scss';
import { useCallback } from 'react';

interface SwitchProps{
	className?: string;
	label?: string;
	id?: string;
	checked?: boolean;
	onChange?: (value: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = (props) => {
	const { 
		className,
		checked,
		id,
		label,
		onChange,
		...otherProps 
	} = props;

	const changeHandler = useCallback((value: boolean)=>{
		onChange?.(value)
	},[onChange])

	return (
		<div className={classNames(cls.switch, {}, [className])}>
			<input 
				type="checkbox" 
				id={id} 
				checked={checked} 
				className={cls.input}
				onChange={e => changeHandler(e.target.checked)}
				{...otherProps} 
			/>
			<label 
				htmlFor={id}
				className={cls.label}
			>
				{label}
			</label>
		</div>
	);
}