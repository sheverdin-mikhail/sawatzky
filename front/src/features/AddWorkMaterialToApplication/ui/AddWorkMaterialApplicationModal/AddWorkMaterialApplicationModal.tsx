import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { WorkMaterialGroupItem } from 'entities/WorkMaterialGroup';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ApplicationWorkMaterial } from 'entities/Application';
import {
  getAddWorkMaterialApplicationFormInit,
  getAddWorkMaterialApplicationFormStep,
} from '../../model/selectors/addWorkMaterialApplicationFormSelectors';
import { FormStep } from '../../model/type/addWorkMaterialApplicationForm';
import { SetWorkMaterialActualCountForm } from '../SetWorkMaterialActualCountForm/SetWorkMaterialActualCountForm';
import { addWorkMaterialApplicationFormActions } from '../../model/slice/addWorkMaterialApplicationFormSlice';
import { AddWorkMaterialApplicationForm } from '../AddWorkMaterialApplicationForm/AddWorkMaterialApplicationForm';
import cls from './AddWorkMaterialApplicationModal.module.scss';

interface AddWorkMaterialApplicationModalProps {
	className?: string;
	onClose?: () => void;
	isOpen?: boolean;
	workMaterialGroups?: WorkMaterialGroupItem[];
	prevWorkMaterials?: ApplicationWorkMaterial[];
	applicationId: string;
}

export const AddWorkMaterialApplicationModal: React.FC<AddWorkMaterialApplicationModalProps> = (props) => {
  const {
    className,
    onClose,
    isOpen,
    workMaterialGroups,
    applicationId,
    prevWorkMaterials = [],
  } = props;

  const dispatch = useAppDispatch();
  const formStep = useSelector(getAddWorkMaterialApplicationFormStep);
  const init = useSelector(getAddWorkMaterialApplicationFormInit);

  useEffect(() => {
    dispatch(addWorkMaterialApplicationFormActions.initForm({
      id: applicationId,
      prevWorkMaterials: prevWorkMaterials.map((task) => ({
        actualCount: task.actualCount,
        workMaterial: task.workMaterial.id,
      })),
    }));
  }, [init, applicationId, prevWorkMaterials, dispatch]);

  const onCloseHandler = () => {
    onClose?.();
    dispatch(addWorkMaterialApplicationFormActions.closeModal());
  };

  return (
    <Modal className={classNames(cls.addWorkMaterialApplicationModal, {}, [className])} isOpen={isOpen} onClose={onCloseHandler}>
      {
        formStep === FormStep.CHOSE
          ? <AddWorkMaterialApplicationForm onClose={onCloseHandler} workMaterialGroups={workMaterialGroups} />
          : <SetWorkMaterialActualCountForm onClose={onCloseHandler} />
      }

    </Modal>
  );
};
