import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddWorkMaterialForm.module.scss';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getAddWorkMaterialName, getAddWorkMaterialPrice, getAddWorkMaterialStatus, getAddWorkMaterialTime } from '../../model/selectors/addWorkMaterialFormSelectors';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { addWorkMaterialFormActions } from '../../model/slice/addWorkMaterialFormSlice';
import { createWorkMaterial } from '../../model/services/createWorkMaterial';
import { Switch } from 'shared/ui/Switch/Switch';

interface AddWorkMaterialFormProps {
	className?: string;
	groupId?: number;
	onClose?: () => void;
}

export const AddWorkMaterialForm: React.FC<AddWorkMaterialFormProps> = (props) => {
	const { className, groupId } = props;

	const name = useSelector(getAddWorkMaterialName)
	const price = useSelector(getAddWorkMaterialPrice)
	const time = useSelector(getAddWorkMaterialTime)
	const status = useSelector(getAddWorkMaterialStatus)

	const dispatch = useAppDispatch()

	const onNameChangeHandler = useCallback((value: string) => {
		dispatch(addWorkMaterialFormActions.setName(value))
	},[dispatch])

	const onPriceChangeHandler = useCallback((value: string) => {
		dispatch(addWorkMaterialFormActions.setPrice(value))
	},[dispatch])

	const onTimeChangeHandler = useCallback((value: string) => {
		dispatch(addWorkMaterialFormActions.setTime(value))
	},[dispatch])

	const onStatusChangeHandler = useCallback((value: boolean) => {
		dispatch(addWorkMaterialFormActions.setStatus(value))
	},[dispatch])



	const onSaveHandler = useCallback(()=>{
		
		dispatch(createWorkMaterial({
			name: name,
			price: price,
			workMaterialGroup: groupId,
			status: status,
			time: time
		}))
		
	},[dispatch, name, price, groupId, status, time])

	return (
		<div className={classNames(cls.AddWorkMaterialForm, {}, [className])}>
			<Text title='Создать услугу' textAlign={TextAlign.CENTER} className={cls.title} />
			<Input placeholder='Название услуги' className={cls.input} value={name} onChange={onNameChangeHandler} />
			<Input 
				placeholder='500 ₽' 
				label='Стоимость часа' 
				id="price"
				className={cls.inputWithLabel} 
				value={price} 
				onChange={onPriceChangeHandler} 
			/>
			<Input 
				placeholder='1 час 20 мин' 
				label='Рекомендованный срок выполнения работ' 
				id="tiem"
				className={cls.inputWithLabel} 
				value={time} 
				onChange={onTimeChangeHandler} 
			/>
			<Switch className={cls.switch} label='Статус услуги' id='status' onChange={onStatusChangeHandler} />
			<div className={cls.buttons}>
				<Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} onClick={onSaveHandler} >Сохранить</Button>
			</div>
		</div>
	);
}