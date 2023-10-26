import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ApplicationDetailContent.module.scss';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { applicationDetailReducer } from '../../model/slice/applicationDetailSlice';
import { ApplicationDetailInfoComponent } from '../ApplicationDetailInfoComponent/ApplicationDetailInfoComponent';
import { useSelector } from 'react-redux';
import { applicationReducer } from 'entities/Application';
import { StateSchema } from 'app/providers';
import { getApplicationDetailInfo } from '../../model/selectors/getApplicationDetailInfo';
import { getApplicationDetailTitle } from '../../model/selectors/getApplicationDetailTitle';
import { Title } from 'shared/ui/Title/Title';
import { ApplicationDetailWorkPrice } from '../ApplicationDetailWorkPrice/ApplicationDetailWorkPrice';
import { useEffect, useState } from 'react';
import { SuccessModal } from 'widgets/SuccessModal/SuccessModal';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchApplicationDetail } from '../../model/services/fetchApplicationDetail/fetchApplicationDetail';
import { getApplicationDetailWorkTasks } from '../../model/selectors/getApplicationDetailWorkTasks';

interface ApplicationDetailContentProps {
	className?: string;
	applicationId: string;
}

const initialReducers: ReducersList = {
	applicationDetail: applicationDetailReducer,
	application: applicationReducer
}

export const ApplicationDetailContent: React.FC<ApplicationDetailContentProps> = (props) => {
	const { className, applicationId } = props;
	const [isOpen, setIsOpen] = useState(false)
	const dispatch = useAppDispatch()
	

	useEffect(()=>{
		dispatch(fetchApplicationDetail(applicationId))
	},[dispatch, applicationId])

	const info = useSelector((state: StateSchema) => getApplicationDetailInfo(state, applicationId))
	const title = useSelector((state: StateSchema)=>getApplicationDetailTitle(state, applicationId))
	const workTasks = useSelector((state: StateSchema) => getApplicationDetailWorkTasks(state, applicationId))

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
			<div className={classNames(cls.applicationDetailContent, {}, [className])}>
				<Title className={cls.title}>{title}</Title>
				<ApplicationDetailInfoComponent className={cls.infoComponent} info={info} />
				<ApplicationDetailWorkPrice workTasks={workTasks} applicationId={applicationId} />
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