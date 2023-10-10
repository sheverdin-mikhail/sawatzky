import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CreateApplicationForm.module.scss';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { DateInput } from 'shared/ui/DateInput/DateInput';
import { Textarea } from 'shared/ui/Textarea/Textarea';

interface CreateApplicationFormProps {
	className?: string;
}

export const CreateApplicationForm: React.FC<CreateApplicationFormProps> = (props) => {
	const { className } = props;
	

	return (
		<div className={classNames(cls.createApplicationForm, {}, [className])}>
			<Text title='Создание заявки' text='Информация по заявке' className={cls.title} textAlign={TextAlign.CENTER} />
			<Input className={cls.input} placeholder='Название заявки' />
			<Textarea placeholder='Описание заявки' className={cls.input} ></Textarea>
			<DateInput className={cls.input} />
			<div className={cls.buttons}>
				<Button className={cls.button}>Сохранить</Button>
				<Button className={cls.button} theme={ButtonThemes.BLUE_BORDER}>Отмена</Button>
			</div>
		</div>
	);
}