import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentDetailInfoComponent.module.scss';
import { useEffect } from 'react';
import { Appointment } from 'entities/Appointment';

interface AppointmentDetailInfoComponentProps {
	className?: string;
	info?: Appointment;
}

export const AppointmentDetailInfoComponent: React.FC<AppointmentDetailInfoComponentProps> = (props) => {
	const { className, info } = props;

	useEffect(()=>{
	},[info])

	return (
		<div className={classNames(cls.appointmentDetailInfoComponent, {}, [className])}>
		</div>
	);
}