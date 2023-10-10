import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ApplicationDetailContent.module.scss';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { applicationDetailReducer } from '../../model/slice/applicationDetailSlice';
import { ApplicationDetailInfoComponent } from '../ApplicationDetailInfoComponent/ApplicationDetailInfoComponent';
import { useSelector } from 'react-redux';
import { applicationReducer } from 'entities/Application';
import { StateSchema } from 'app/providers';
import { getApplicationDetailInfo } from '../../model/selectors/getApplicationDetailInfo';
import { getApplicationDetailTitle } from 'pages/ApplicationDetailPage/model/selectors/getApplicationDetailTitle';
import { Title } from 'shared/ui/Title/Title';
import { ApplicationDetailWorkPrice } from '../ApplicationDetailWorkPrice/ApplicationDetailWorkPrice';
import { useState } from 'react';
import { SuccessModal } from 'widgets/SuccessModal/SuccessModal';
import { Button } from 'shared/ui/Button/Button';

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

	// const application = useSelector((state: StateSchema) => getApplication.selectById(state, applicationId))
	const info = useSelector((state: StateSchema) => getApplicationDetailInfo(state, applicationId))
	const title = useSelector((state: StateSchema)=>getApplicationDetailTitle(state, applicationId))
	

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
			<div className={classNames(cls.applicationDetailContent, {}, [className])}>
				<Title className={cls.title}>{title}</Title>
				<ApplicationDetailInfoComponent className={cls.infoComponent} info={info} />
				<ApplicationDetailWorkPrice />
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