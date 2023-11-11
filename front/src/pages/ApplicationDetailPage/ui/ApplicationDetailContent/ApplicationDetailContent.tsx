import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { applicationReducer } from 'entities/Application';
import { StateSchema } from 'app/providers';
import { Title } from 'shared/ui/Title/Title';
import { useEffect, useState } from 'react';
import { SuccessModal } from 'widgets/SuccessModal/SuccessModal';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Progressbar } from 'widgets/Progressbar';
import { fetchApplicationDetail } from '../../model/services/fetchApplicationDetail/fetchApplicationDetail';
import { ApplicationDetailWorkPrice } from '../ApplicationDetailWorkPrice/ApplicationDetailWorkPrice';
import { getApplicationDetailTitle } from '../../model/selectors/getApplicationDetailTitle';
import { getApplicationDetailInfo } from '../../model/selectors/getApplicationDetailInfo';
import { ApplicationDetailInfoComponent } from '../ApplicationDetailInfoComponent/ApplicationDetailInfoComponent';
import { applicationDetailReducer } from '../../model/slice/applicationDetailSlice';
import cls from './ApplicationDetailContent.module.scss';
import { getApplicationDetailWorkMaterials, getApplicationDetailWorkTasks } from '../../model/selectors/getApplicationDetailWorkTasks';
import { ApplicationDetailActs } from '../ApplicationDetailActs/ApplicationDetailActs';
import { ApplicationDetailPerformer } from '../ApplicationDetailPerformer/ApplicationDetailPerformer';

interface ApplicationDetailContentProps {
	className?: string;
	applicationId: string;
}

const initialReducers: ReducersList = {
  applicationDetail: applicationDetailReducer,
  application: applicationReducer,
};

export const ApplicationDetailContent: React.FC<ApplicationDetailContentProps> = (props) => {
  const { className, applicationId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchApplicationDetail(applicationId));
  }, [dispatch, applicationId]);

  const info = useSelector((state: StateSchema) => getApplicationDetailInfo(state, applicationId));
  const title = useSelector((state: StateSchema) => getApplicationDetailTitle(state, applicationId));
  const workTasks = useSelector((state: StateSchema) => getApplicationDetailWorkTasks(state, applicationId));
  const workMaterials = useSelector((state: StateSchema) => getApplicationDetailWorkMaterials(state, applicationId));

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames(cls.applicationDetailContent, {}, [className])}>
        <Title className={cls.title}>{title}</Title>
        <ApplicationDetailInfoComponent className={cls.infoComponent} info={info} />
        <Progressbar step={info.step} />
        <ApplicationDetailWorkPrice workTasks={workTasks} workMaterials={workMaterials} applicationId={applicationId} />
        <ApplicationDetailPerformer />
        <ApplicationDetailActs />
      </div>
      <SuccessModal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        title="Успешно"
        text="Подтверждение платежа"
      />
    </DynamicModuleLoader>
  );
};
