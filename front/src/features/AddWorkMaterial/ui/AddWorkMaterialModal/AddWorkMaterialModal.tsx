import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AddWorkMaterialModal.module.scss';
import { AddWorkMaterialForm } from '../AddWorkMaterialForm/AddWorkMaterialForm';
import { addWorkMaterialFormActions } from '../../model/slice/addWorkMaterialFormSlice';

interface AddWorkMaterialModalModalProps {
	className?: string;
	onClose?: () => void;
	isOpen?: boolean;
	groupId?: number;
}

export const AddWorkMaterialModal: React.FC<AddWorkMaterialModalModalProps> = (props) => {
  const {
    className, onClose, isOpen, groupId,
  } = props;

  const dispatch = useAppDispatch();

  const onCloseHandler = () => {
    onClose?.();
    dispatch(addWorkMaterialFormActions.closeModal());
  };

  return (
    <Modal className={classNames(cls.addWorkMaterialModal, {}, [className])} isOpen={isOpen} onClose={onCloseHandler}>
      <AddWorkMaterialForm groupId={groupId} onClose={onCloseHandler} />
    </Modal>
  );
};
