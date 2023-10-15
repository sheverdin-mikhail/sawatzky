import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';
import { useState } from 'react';

interface SelectProps {
	className?: string;
	options?: SelectOptionType[]; 
	placeholder?: string; 
	onChange?: (value: SelectOptionType) => void;
	value? : SelectOptionType;
}

export interface SelectOptionType {
	value: string;
	text: string;
}


export const Select: React.FC<SelectProps> = (props) => {
	const { className, placeholder, options, value, onChange,  } = props;
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState({value: null, text: placeholder ?? "Выберите опцию"})

	const toggleSelect = () => {
		setIsOpen(prev => !prev);
	}
	
	const handleOptionClick = (option: any) => {
		setSelectedOption(option)
		onChange?.(option)
	}

	return (
		<div className={classNames(cls.select, {
			[cls.open]: isOpen
		}, [className])} 
		onClick={toggleSelect}
		>
			<span className={cls.selectedItem}>{selectedOption.text}</span>
			<ul className={cls.optionsList}>
			{
				options?.map((option) => 
				<li 
					key={option.value}
					className={cls.option} 
					onClick={() => handleOptionClick(option)}
				>
					{option.text}
				</li>)
			}
			</ul>
		</div>
	);
}