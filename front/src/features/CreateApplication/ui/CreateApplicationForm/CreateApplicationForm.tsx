import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CreateApplicationForm.module.scss';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { DateInput } from 'shared/ui/DateInput/DateInput';
import { Textarea } from 'shared/ui/Textarea/Textarea';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { createApplicationActions, createApplicationReducer } from '../../model/slice/createApplicationSlice';
import { useSelector } from 'react-redux';
import { 
	getFormApplication,
	getFormApplicationDescription, 
	getFormApplicationEndWorkDate, 
	getFormApplicationStartWorkDate, 
	getFormApplicationTitle,
	getFormApplicationError,
} from 'features/CreateApplication/model/selectors/createApplicationSelectors';
import { useCallback } from 'react';
import { RangePickerSelectedDays } from 'react-trip-date/dist/rangePicker/rangePicker.type';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveApplication } from 'features/CreateApplication/model/serivces/saveApplication/saveApplication';

interface CreateApplicationFormProps {
	className?: string;
	onClose?: () => void;
}

const reducers: ReducersList = {
	createApplication: createApplicationReducer
}

export const CreateApplicationForm: React.FC<CreateApplicationFormProps> = (props) => {
	const { className, onClose } = props;

	const dispatch = useAppDispatch()
	const title = useSelector(getFormApplicationTitle)
	const description = useSelector(getFormApplicationDescription)
	const startWorkDate = useSelector(getFormApplicationStartWorkDate)
	const endWorkDate = useSelector(getFormApplicationEndWorkDate)
	const form = useSelector(getFormApplication)
	const error = useSelector(getFormApplicationError)
		

	const changeSelectedDaysHandler = useCallback((dates: RangePickerSelectedDays) => {
		if(dates.from){
			dispatch(createApplicationActions.setStartWorkDate(dates.from))
		}
		if(dates.to){
			dispatch(createApplicationActions.setEndWorkDate(dates.to))
		}
	},[dispatch])


	const changeTitleHandler = useCallback((value: string)=>{
		dispatch(createApplicationActions.setTitle(value))
	},[dispatch])


	const changeDescriptionHandler = useCallback((value: string)=>{
		dispatch(createApplicationActions.setDescription(value))
	},[dispatch])


	const clearWorkDatesHandler = useCallback(()=>{
		dispatch(createApplicationActions.clearWorkDates())
	}, [dispatch])


	const onClearhandler = useCallback(()=>{
		dispatch(createApplicationActions.clearForm())
		onClose?.()
	},[dispatch, onClose])

	const onSaveHandler = useCallback(()=>{
		if(form){
			dispatch(saveApplication(form))
		}
	}, [form, dispatch])

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(cls.createApplicationForm, {}, [className])}>
				<Text title='Создание заявки' text='Информация по заявке' className={cls.title} textAlign={TextAlign.CENTER} />
				<Input className={cls.input} value={title} onChange={changeTitleHandler} placeholder='Название заявки' />
				<Textarea 
					placeholder='Описание заявки' 
					value={description} 
					onChange={changeDescriptionHandler}  
					className={cls.input} 
				/>
				<DateInput 
					className={cls.input} 
					onChange={changeSelectedDaysHandler} 
					selectedDays={{from: startWorkDate, to: endWorkDate}}
					onClear={clearWorkDatesHandler}
				/>
				<div className={cls.buttons}>
					<Button className={cls.button} onClick={onSaveHandler} >Сохранить</Button>
					<Button className={cls.button} onClick={onClearhandler} theme={ButtonThemes.BLUE_BORDER}>Отмена</Button>
				</div>
			</div>
			{ error && <Text className={cls.error} text={error} theme={TextTheme.ERROR} /> }
		</DynamicModuleLoader>
	);
}