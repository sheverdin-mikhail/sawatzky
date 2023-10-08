import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentDetailContent.module.scss';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { appointmentDetailReducer } from '../../model/slice/appointmentDetailSlice';
import { AppointmentDetailInfoComponent } from '../AppointmentDetailInfoComponent/AppointmentDetailInfoComponent';

interface AppointmentDetailContentProps {
	className?: string;
	appointmentId: string;
}

const initialReducers: ReducersList = {
	appointmentDetail: appointmentDetailReducer
}

export const AppointmentDetailContent: React.FC<AppointmentDetailContentProps> = (props) => {
	const { className, appointmentId } = props;
	
	

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
			<div className={classNames(cls.appointmentDetailContent, {}, [className])}>
				{appointmentId}
				<AppointmentDetailInfoComponent  />
			</div>
		</DynamicModuleLoader>
	);
}