import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddWorkTaskGroupForm.module.scss';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';

interface AddWorkTaskGroupFormProps {
	className?: string;
	onClose?: () => void;
}

export const AddWorkTaskGroupForm: React.FC<AddWorkTaskGroupFormProps> = (props) => {
	const { className } = props;

	return (
		<div className={classNames(cls.addWorkTaskGroupForm, {}, [className])}>
			<Text title='Создать группу услуг' textAlign={TextAlign.CENTER} className={cls.title} />
			<Input placeholder='Наименование группы' className={cls.input} />
			<div className={cls.buttons}>
				<Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} >Сохранить</Button>
			</div>
		</div>
	);
}