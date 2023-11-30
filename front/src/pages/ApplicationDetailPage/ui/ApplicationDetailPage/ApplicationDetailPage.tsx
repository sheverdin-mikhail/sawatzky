import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { applicationDetailReducer } from 'pages/ApplicationDetailPage/model/slice/applicationDetailSlice';
import { applicationReducer } from 'entities/Application';
import { addDocumentFormReducer } from 'features/AddDocument';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchWorkMaterialGroupList, workMaterialGroupReducer } from 'entities/WorkMaterialGroup';
import { fetchWorkTaskGroupList, workTaskGroupReducer } from 'entities/WorkTaskGroup';
import { addWorkMaterialApplicationFormReducer } from 'features/AddWorkMaterialToApplication';
import { addWorkTaskApplicationFormReducer } from 'features/AddWorkTaskToApplication';
import { ApplicationDetailContent } from '../ApplicationDetailContent/ApplicationDetailContent';

interface ApplicationDetailPageProps {
    className?: string;
}

const initialReducers: ReducersList = {
  applicationDetail: applicationDetailReducer,
  application: applicationReducer,
  addDocumentForm: addDocumentFormReducer,
  addWorkTaskApplicationForm: addWorkTaskApplicationFormReducer,
  addWorkMaterialApplicationForm: addWorkMaterialApplicationFormReducer,
  workTaskGroup: workTaskGroupReducer,
  workMaterialGroup: workMaterialGroupReducer,
};

const ApplicationDetailPage: React.FC<ApplicationDetailPageProps> = (props) => {
  const { className } = props;
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWorkTaskGroupList());
    dispatch(fetchWorkMaterialGroupList());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>

      <div className={classNames('', {}, [className])}>
        <ApplicationDetailContent applicationId={id || ''} />
      </div>

    </DynamicModuleLoader>

  );
};

export default ApplicationDetailPage;
