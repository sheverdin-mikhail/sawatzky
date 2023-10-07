import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DateInput.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { RangePickerSelectedDays } from 'react-trip-date/dist/rangePicker/rangePicker.type';
import { Calendar } from 'shared/ui/Calendar/Calendar';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';

interface DateInputProps {
	className?: string;
}

const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

export const DateInput: React.FC<DateInputProps> = (props) => {
	const { className } = props;
    const [ selectedDays, setSelectedDays ] = useState<RangePickerSelectedDays>({from: '', to: ''})
	const [ isFocused, setIsFocused ] = useState(false)
	const [ value, setValue ] = useState('')

	

	useEffect(()=>{
		
		if(selectedDays.from && selectedDays.to){
			const dateFrom = new Date(selectedDays.from)
			const dateTo = new Date(selectedDays.to)
			setValue(`С  ${dateFrom.toLocaleDateString('ru-Ru', options)}  До  ${dateTo.toLocaleDateString('ru-Ru', options)}`)
		}
	},[selectedDays])

	const onFocuseHandler = useCallback(() => {
		setIsFocused(true)
	},[])

	const onCancelCalendar = useCallback(()=>{
		setValue('')
		setIsFocused(false)
		setSelectedDays({from:'', to:''})
	},[])

	const onSaveCalendar = useCallback(()=>{
		setIsFocused(false)
	},[])



	return (
		<div className={classNames(cls.dateInput, {}, [className])}>
			<Input placeholder={'Дата и время проведения работ'} value={value} onClick={onFocuseHandler}/>
			<div className={classNames(cls.calendarForm, {[cls.isFocused]: isFocused}, [])}>
				<Calendar className={cls.calendar} onChange={setSelectedDays} />
				<div className={cls.buttons} >
					<Button className={cls.button} theme={ButtonThemes.CLEAR} onClick={onCancelCalendar} >Отмена</Button>
					<Button className={cls.button} theme={ButtonThemes.BLUE_SOLID} onClick={onSaveCalendar}>Сохранить</Button>

				</div>
			</div>
		</div>
	);
}