import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addWorkTaskGroupFormActions } from 'features/AddWorkTaskGroup/model/slice/addWorkTaskGroupFormSlice';
import { AddWorkTaskGroupForm } from '../AddWorkTaskGroupForm/AddWorkTaskGroupForm';
import cls from './AddWorkTaskGroupModal.module.scss';

interface AddWorkTaskGroupModalProps {
	className?: string;
	onClose?: () => void;
	isOpen?: boolean;
}

export const AddWorkTaskGroupModal: React.FC<AddWorkTaskGroupModalProps> = (props) => {
  const { className, onClose, isOpen } = props;

  const dispatch = useAppDispatch();

  const onCloseHandler = () => {
    onClose?.();
    dispatch(addWorkTaskGroupFormActions.closeModal());
  };

  return (
    <Modal className={classNames(cls.addWorkTaskGroupModal, {}, [className])} isOpen={isOpen} onClose={onCloseHandler}>
      <AddWorkTaskGroupForm onClose={onCloseHandler} />
    </Modal>
  );
};
