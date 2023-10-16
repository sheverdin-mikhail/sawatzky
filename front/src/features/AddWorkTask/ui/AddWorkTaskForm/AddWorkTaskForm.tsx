import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddWorkTaskForm.module.scss';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getAddWorkTaskFormData } from '../../model/selectors/addWorkTaskFormSelectors';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { addWorkTaskFormActions } from '../../model/slice/addWorkTaskFormSlice';
import { createWorkTask } from '../../model/services/createWorkTask';

interface AddWorkTaskFormProps {
	className?: string;
	onClose?: () => void;
}

export const AddWorkTaskForm: React.FC<AddWorkTaskFormProps> = (props) => {
	const { className } = props;

	const formData = useSelector(getAddWorkTaskFormData)
	const dispatch = useAppDispatch()

	const onNameChangeHandler = useCallback((value: string) => {
		dispatch(addWorkTaskFormActions.setFormData({
			name: value
		}))
	},[dispatch])

	const onSaveHandler = useCallback(()=>{
		if(formData){
			dispatch(createWorkTask(formData))
		}
	},[formData, dispatch])

	return (
		<div className={classNames(cls.AddWorkTaskForm, {}, [className])}>
			<Text title='Создать услугу' textAlign={TextAlign.CENTER} className={cls.title} />
			<Input placeholder='Название услуги' className={cls.input} value={formData?.name} onChange={onNameChangeHandler} />
			<Input 
				placeholder='500 ₽' 
				label='Стоимость часа' 
				id="price"
				className={cls.inputWithLabel} 
				value={formData?.name} 
				onChange={onNameChangeHandler} 
			/>
			<Input 
				placeholder='1 час 20 мин' 
				label='Рекомендованный срок выполнения работ' 
				id="price"
				className={cls.inputWithLabel} 
				value={formData?.name} 
				onChange={onNameChangeHandler} 
			/>
			<div className={cls.buttons}>
				<Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} onClick={onSaveHandler} >Сохранить</Button>
			</div>
		</div>
	);
}