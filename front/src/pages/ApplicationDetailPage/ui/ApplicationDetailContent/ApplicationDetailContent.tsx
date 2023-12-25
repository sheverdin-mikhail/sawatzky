import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers';
import { Title } from 'shared/ui/Title/Title';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Progressbar } from 'widgets/Progressbar';
import { AddWorkTaskApplicationModal, getAddWorkTaskApplicationFormIsOpen } from 'features/AddWorkTaskToApplication';
import { AddWorkMaterialApplicationModal, getAddWorkMaterialApplicationFormIsOpen } from 'features/AddWorkMaterialToApplication';
import {
  DocEntity,
  addDocumentFormActions,
  AddDocumentModal,
  getAddDocumentFormIsOpen,
} from 'features/AddDocument';
import { getWorkTaskGroup } from 'entities/WorkTaskGroup/';
import { getWorkMaterialGroup } from 'entities/WorkMaterialGroup';
import { getApplicationDetail } from 'pages/ApplicationDetailPage/model/slice/applicationDetailSlice';
import { AddPerformerToApplicationModal, getAddPerformerToApplicationFormIsOpen } from 'features/AddPerformerToApplication';
import { getPerformer } from 'entities/Performer';
import { useUserData } from 'shared/lib/hooks/useUserData/useUserData';
import { fetchApplicationDetail } from '../../model/services/fetchApplicationDetail/fetchApplicationDetail';
import { ApplicationDetailWorkPrice } from '../ApplicationDetailWorkPrice/ApplicationDetailWorkPrice';
import { getApplicationDetailTitle } from '../../model/selectors/getApplicationDetailTitle';
import { getApplicationDetailInfo } from '../../model/selectors/getApplicationDetailInfo';
import { ApplicationDetailInfoComponent } from '../ApplicationDetailInfoComponent/ApplicationDetailInfoComponent';
import { getApplicationDetailWorkMaterials, getApplicationDetailWorkTasks } from '../../model/selectors/getApplicationDetailWorkTasks';
import { ApplicationDetailActs } from '../ApplicationDetailActs/ApplicationDetailActs';
import { ApplicationDetailPerformer } from '../ApplicationDetailPerformer/ApplicationDetailPerformer';
import { getApplicationDetailPerformers } from '../../model/selectors/getApplicatioinDetailPerformer';
import { nextApplicationStep } from '../../model/services/nextApplicationStep/nextApplicationStep';
import cls from './ApplicationDetailContent.module.scss';

interface ApplicationDetailContentProps {
  className?: string;
  applicationId: string;
}

export const ApplicationDetailContent: React.FC<ApplicationDetailContentProps> = (props) => {
  const { className, applicationId } = props;
  const dispatch = useAppDispatch();
  const { isSawatzky } = useUserData();

  useEffect(() => {
    dispatch(fetchApplicationDetail(applicationId));
  }, [dispatch, applicationId]);

  const detail = useSelector((state: StateSchema) => getApplicationDetail.selectById(state, applicationId));
  const info = useSelector((state: StateSchema) => getApplicationDetailInfo(state, applicationId));
  const title = useSelector((state: StateSchema) => getApplicationDetailTitle(state, applicationId));
  const workTasks = useSelector((state: StateSchema) => getApplicationDetailWorkTasks(state, applicationId));
  const workMaterials = useSelector((state: StateSchema) => getApplicationDetailWorkMaterials(state, applicationId));
  const addWorkTaskApplicationModalIsOpen = useSelector(getAddWorkTaskApplicationFormIsOpen);
  const addWorkMaterialApplicationModalIsOpen = useSelector(getAddWorkMaterialApplicationFormIsOpen);
  const addPerformerToApplicationFormIsOpen = useSelector(getAddPerformerToApplicationFormIsOpen);
  const addDocumentModalIsOpen = useSelector(getAddDocumentFormIsOpen);
  const workTaskGroups = useSelector(getWorkTaskGroup.selectAll);
  const workMaterialGroups = useSelector(getWorkMaterialGroup.selectAll);
  const applicationPerformers = useSelector((state: StateSchema) => getApplicationDetailPerformers(state, applicationId));
  const performers = useSelector(getPerformer.selectAll);
  const { isDispatcher } = useUserData();

  useEffect(() => {
    if (info.step === 1 && isDispatcher) {
      dispatch(nextApplicationStep({ applicationId, step: info.step - 1 }));
    }
  }, [info.step, isDispatcher, dispatch, applicationId]);

  return (
    <div className={classNames(cls.applicationDetailContent, {}, [className])}>
      <Title className={cls.title}>{title}</Title>
      <ApplicationDetailInfoComponent className={cls.infoComponent} info={info} />
      <Progressbar step={info.step} />
      <ApplicationDetailWorkPrice workTasks={workTasks} workMaterials={workMaterials} applicationId={applicationId} />
      { (info.step >= 4 && isSawatzky)
      && <ApplicationDetailPerformer applicationId={applicationId} performers={applicationPerformers} />}
      <ApplicationDetailActs applicationId={applicationId} acts={detail?.acts} />

      {/* Modals */}
      <AddDocumentModal
        docEntity={DocEntity.APPLICATION}
        onClose={() => dispatch(addDocumentFormActions.closeModal())}
        isOpen={addDocumentModalIsOpen}
      />

      <AddWorkTaskApplicationModal
        isOpen={addWorkTaskApplicationModalIsOpen}
        workTaskGroups={workTaskGroups}
        applicationId={applicationId}
        prevWorkTasks={workTasks}
      />
      <AddWorkMaterialApplicationModal
        isOpen={addWorkMaterialApplicationModalIsOpen}
        workMaterialGroups={workMaterialGroups}
        applicationId={applicationId}
        prevWorkMaterials={workMaterials}
      />
      <AddPerformerToApplicationModal
        applicationId={applicationId}
        performers={performers}
        prevPerformers={applicationPerformers}
        isOpen={addPerformerToApplicationFormIsOpen}
      />
    </div>

  );
};
