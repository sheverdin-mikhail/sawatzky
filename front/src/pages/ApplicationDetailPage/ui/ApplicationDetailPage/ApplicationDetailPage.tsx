import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { applicationDetailReducer } from 'pages/ApplicationDetailPage/model/slice/applicationDetailSlice';
import { applicationReducer } from 'entities/Application';
import { DocEntity, addDocumentFormActions, addDocumentFormReducer } from 'features/AddDocument';
import { SuccessModal } from 'widgets/SuccessModal/SuccessModal';
import { useEffect, useState } from 'react';
import { AddDocumentForm } from 'features/AddDocument/ui/AddDocumentForm/AddDocumentForm';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchWorkMaterialGroupList, getWorkMaterialGroup, workMaterialGroupReducer } from 'entities/WorkMaterialGroup';
import { fetchWorkTaskGroupList, getWorkTaskGroup, workTaskGroupReducer } from 'entities/WorkTaskGroup';
import { AddWorkMaterialApplicationModal, addWorkMaterialApplicationFormReducer, getAddWorkMaterialApplicationFormIsOpen } from 'features/AddWorkMaterialToApplication';
import { AddWorkTaskApplicationModal, addWorkTaskApplicationFormReducer, getAddWorkTaskApplicationFormIsOpen } from 'features/AddWorkTaskToApplication';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers';
import { getApplicationDetailWorkMaterials, getApplicationDetailWorkTasks } from 'pages/ApplicationDetailPage/model/selectors/getApplicationDetailWorkTasks';
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
