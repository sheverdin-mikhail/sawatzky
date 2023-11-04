import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddWorkTaskApplicationForm.module.scss';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { WorkTaskGroupItem } from 'entities/WorkTaskGroup';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { addWorkTaskApplicationFormActions } from 'features/AddWorkTaskToApplication/model/slice/addWorkTaskApplicationFormSlice';

interface AddWorkTaskApplicationFormProps {
	className?: string;
	onClose?: () => void;
	workTaskGroups?: WorkTaskGroupItem[];

}

export const AddWorkTaskApplicationForm: React.FC<AddWorkTaskApplicationFormProps> = (props) => {
	const { className, workTaskGroups} = props;

	
	const dispatch = useAppDispatch()

	const onChangeHandler = (value: SelectOptionType) => {
		workTaskGroups?.forEach(workTaskGroup=>{
			const workTask = workTaskGroup.tasks?.find(task => task.id === value.value)
			if(workTask){
				dispatch(addWorkTaskApplicationFormActions.selectItem(workTask))
			}
		})
	}


	const onSaveHandler = useCallback(()=>{
		dispatch(addWorkTaskApplicationFormActions.setActualStep())
	},[dispatch])

	return (
		<div className={classNames(cls.addWorkTaskToApplicationForm, {}, [className])}>
			<Text title='Выбор услуги' textAlign={TextAlign.CENTER} className={cls.title} />
			{
				workTaskGroups?.map((workTaskGroup)=>(
					<Select 
						className={cls.input} 
						placeholder={workTaskGroup.name} 
						onChange={onChangeHandler}
						key={`workTaskGroup_${workTaskGroup.id}`} 
						options={workTaskGroup.tasks?.map(task => ({
							text: task.name,
							value: task.id
						})) ?? []} 
					/>
				))
			}
			<div className={cls.buttons}>
				<Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} onClick={onSaveHandler} >Сохранить</Button>
			</div>
		</div>
	);
}