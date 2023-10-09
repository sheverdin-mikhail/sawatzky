import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentDetailContent.module.scss';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { appointmentDetailReducer } from '../../model/slice/appointmentDetailSlice';
import { AppointmentDetailInfoComponent } from '../AppointmentDetailInfoComponent/AppointmentDetailInfoComponent';
import { useSelector } from 'react-redux';
import { appointmentReducer } from 'entities/Appointment';
import { StateSchema } from 'app/providers';
import { getAppointmentDetailInfo } from '../../model/selectors/getAppointmentDetailInfo';
import { getAppointmentDetailTitle } from 'pages/AppointmentDetailPage/model/selectors/getAppointmentDetailTitle';
import { Title } from 'shared/ui/Title/Title';
import { AppointmentDetailWorkPrice } from '../AppointmentDetailWorkPrice/AppointmentDetailWorkPrice';
import { useState } from 'react';
import { SuccessModal } from 'widgets/SuccessModal/SuccessModal';
import { Button } from 'shared/ui/Button/Button';

interface AppointmentDetailContentProps {
	className?: string;
	appointmentId: string;
}

const initialReducers: ReducersList = {
	appointmentDetail: appointmentDetailReducer,
	appointment: appointmentReducer
}

export const AppointmentDetailContent: React.FC<AppointmentDetailContentProps> = (props) => {
	const { className, appointmentId } = props;
	const [isOpen, setIsOpen] = useState(false)

	// const appointment = useSelector((state: StateSchema) => getAppointment.selectById(state, appointmentId))
	const info = useSelector((state: StateSchema) => getAppointmentDetailInfo(state, appointmentId))
	const title = useSelector((state: StateSchema)=>getAppointmentDetailTitle(state, appointmentId))
	

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
			<div className={classNames(cls.appointmentDetailContent, {}, [className])}>
				<Title className={cls.title}>{title}</Title>
				<AppointmentDetailInfoComponent className={cls.infoComponent} info={info} />
				<AppointmentDetailWorkPrice />
			</div>
			<SuccessModal 
				onClose={()=>setIsOpen(false)} 
				isOpen={isOpen} 
				title='Успешно' 
				text='Подтверждение платежа' 
			/>
		</DynamicModuleLoader>
	);
}