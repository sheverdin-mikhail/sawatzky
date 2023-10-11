import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DateInput.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { RangePickerSelectedDays } from 'react-trip-date/dist/rangePicker/rangePicker.type';
import { Calendar } from 'shared/ui/Calendar/Calendar';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';

interface DateInputProps {
	className?: string;
	onChange?: (dates: RangePickerSelectedDays) => void;
	selectedDays?: RangePickerSelectedDays;
	onClear?: () => void;
}

const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

export const DateInput: React.FC<DateInputProps> = (props) => {
	const { className, onChange, onClear, selectedDays } = props;
	const [ isFocused, setIsFocused ] = useState(false)
	const [ value, setValue ] = useState('')


	const changeDateHandler = useCallback((days: RangePickerSelectedDays)=>{
		if(days.from && days.to){
			const dateFrom = new Date(days.from)
			const dateTo = new Date(days.to)
			onChange?.({from: days.from, to: days.to})
			setValue(`С  ${dateFrom.toLocaleDateString('ru-Ru', options)}  До  ${dateTo.toLocaleDateString('ru-Ru', options)}`)
		}else{
			setValue(``)
		}
	},[ onChange ])

	// const inputChangeHandler = useCallback(()=>{
	// 	if(selectedDays?.from && selectedDays?.to){
	// 		const dateFrom = new Date(selectedDays.from)
	// 		const dateTo = new Date(selectedDays.to)
	// 		setValue(`С  ${dateFrom.toLocaleDateString('ru-Ru', options)}  До  ${dateTo.toLocaleDateString('ru-Ru', options)}`)
	// 	}else{
	// 		setValue(``)
	// 	}
	// },[selectedDays])


	const onFocuseHandler = useCallback(() => {
		setIsFocused(true)
	},[])

	const onClearCalendar = useCallback(()=>{
		onClear?.()
		setValue('')
		setIsFocused(false)
	},[onClear])

	const onSaveCalendar = useCallback(()=>{
		setIsFocused(false)
	},[])



	return (
		<div className={classNames(cls.dateInput, {}, [className])}>
			<Input  placeholder={'Дата и время проведения работ'} value={value} onClick={onFocuseHandler}/>
			<div className={classNames(cls.calendarForm, {[cls.isFocused]: isFocused}, [])}>
				<Calendar selectedDays={selectedDays} className={cls.calendar} onChange={changeDateHandler} />
				<div className={cls.buttons} >
					<Button className={cls.button} theme={ButtonThemes.CLEAR} onClick={onClearCalendar} >Отмена</Button>
					<Button className={cls.button} theme={ButtonThemes.BLUE_SOLID} onClick={onSaveCalendar}>Сохранить</Button>

				</div>
			</div>
		</div>
	);
}