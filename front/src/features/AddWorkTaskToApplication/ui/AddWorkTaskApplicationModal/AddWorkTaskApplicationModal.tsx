import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { WorkTaskGroupItem } from 'entities/WorkTaskGroup';
import { useSelector } from 'react-redux';
import { getAddWorkTaskApplicationFormInit, getAddWorkTaskApplicationFormStep } from 'features/AddWorkTaskToApplication/model/selectors/addWorkTaskApplicationFormSelectors';
import { FormStep } from 'features/AddWorkTaskToApplication/model/type/addWorkTaskApplicationForm';
import { useEffect } from 'react';
import { ApplicationWorkTask } from 'entities/Application';
import { SetWorkTaskActualTimeForm } from '../SetWorkTaskActualTimeForm/SetWorkTaskActualTimeForm';
import { addWorkTaskApplicationFormActions } from '../../model/slice/addWorkTaskApplicationFormSlice';
import { AddWorkTaskApplicationForm } from '../AddWorkTaskApplicationForm/AddWorkTaskApplicationForm';
import cls from './AddWorkTaskApplicationModal.module.scss';

interface AddWorkTaskApplicationModalProps {
	className?: string;
	onClose?: () => void;
	isOpen?: boolean;
	workTaskGroups?: WorkTaskGroupItem[];
	prevWorkTasks?: ApplicationWorkTask[];
	applicationId: string;
}

export const AddWorkTaskApplicationModal: React.FC<AddWorkTaskApplicationModalProps> = (props) => {
  const {
    className,
    onClose,
    isOpen,
    workTaskGroups,
    applicationId,
    prevWorkTasks = [],
  } = props;

  const dispatch = useAppDispatch();
  const formStep = useSelector(getAddWorkTaskApplicationFormStep);
  const init = useSelector(getAddWorkTaskApplicationFormInit);

  useEffect(() => {
    dispatch(addWorkTaskApplicationFormActions.initForm({
      id: applicationId,
      prevWorkTasks: prevWorkTasks.map((task) => ({
        actualTime: task.actualTime,
        workTask: task.workTask.id,
      })),
    }));
  }, [init, applicationId, prevWorkTasks, dispatch]);

  const onCloseHandler = () => {
    onClose?.();
    dispatch(addWorkTaskApplicationFormActions.closeModal());
  };

  return (
    <Modal className={classNames(cls.addWorkTaskApplicationModal, {}, [className])} isOpen={isOpen} onClose={onCloseHandler}>
      {
        formStep === FormStep.CHOSE
          ? <AddWorkTaskApplicationForm onClose={onCloseHandler} workTaskGroups={workTaskGroups} />
          : <SetWorkTaskActualTimeForm onClose={onCloseHandler} />
      }

    </Modal>
  );
};
