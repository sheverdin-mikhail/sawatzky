import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentDetailInfoComponent.module.scss';
import { Appointment } from 'entities/Appointment';
import { AppointmentTag } from 'entities/Appointment/ui/AppointmentTag/AppointmentTag';

interface AppointmentDetailInfoComponentProps {
	className?: string;
	info: Appointment;
}

export const AppointmentDetailInfoComponent: React.FC<AppointmentDetailInfoComponentProps> = (props) => {
	const { className, info } = props;
	

	return (
		<div className={classNames(cls.appointmentDetailInfoComponent, {}, [className])}>
			<div className={classNames(cls.firstColumn, {}, [cls.column])}>
				<h2 className={cls.title}>Информация по заявке</h2>
				<span className={classNames(cls.text, {}, [cls.name])}><b className={cls.textBold}>Название: </b>{ info.title }</span>
				<span className={cls.text}><b className={cls.textBold}>ID:</b> {info.id}</span>
				<span className={cls.text}><b className={cls.textBold}>Создал заявку:</b> { info.creator?.fio }</span>
				<AppointmentTag status={info.status} />
			</div>			
			<div className={classNames(cls.secondColumn, {}, [cls.column])}>
				<span className={cls.text}>
					<b className={cls.textBold}>Дата заявки: </b> 
					{info.createdAt}
				</span>
				<span className={cls.text}>
					<b className={cls.textBold}>Дата проведения работ: </b> 
					{info.startWorkDate} — {info.endWorkDate}
				</span>
			</div>		
			<div className={cls.verticalLine} ></div>	
			<div className={classNames(cls.thirdColumn, {}, [cls.column])} >
				<span className={cls.text} >
					{ info.description }
				</span>
			</div>
		</div>
	);
}