import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentDetailWorkPrice.module.scss';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as ArrowIcon } from 'shared/assets/icons/arrow-icon-right.svg'

interface AppointmentDetailWorkPriceProps {
	className?: string;
}

export const AppointmentDetailWorkPrice: React.FC<AppointmentDetailWorkPriceProps> = (props) => {
	const { className } = props;

	return (
		<div className={classNames(cls.appointmentDetailWorkPrice, {}, [className])}>
			<div className={cls.header}>
				<Text title={'Стоимость работ '} size={TextSize.M} />
				<div className={cls.iconContainer}><ArrowIcon className={cls.icon} /></div>
			</div>
			<div className={cls.controls}>
				<Button theme={ButtonThemes.CLEAR_BLUE} className={cls.controlBtn} >+ Добавить работы </Button>
				<Button theme={ButtonThemes.CLEAR_BLUE} className={cls.controlBtn} >+ Добавить расходный материал </Button>
				<Button theme={ButtonThemes.CLEAR_BLUE} className={cls.controlBtn} >+ Загрузить документ </Button>
			</div>
		</div>
	);
}