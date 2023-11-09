import { Modal } from 'shared/ui/Modal/Modal';
import { AddObjectsGroupForm } from '../AddObjectsGroupForm/AddObjectsGroupForm';
import cls from './AddObjectsGroupModal.module.scss';

interface AddObjectsGroupModalProps {
	className?: string;
	isOpen?: boolean;
	onClose?: () => void;
}

export const AddObjectsGroupModal: React.FC<AddObjectsGroupModalProps> = (props) => {
  const { isOpen, onClose } = props;

  const onCloseHandler = () => {
    onClose?.();
  };

  return (
    <Modal className={cls.addObjectsGroupModal} onClose={onCloseHandler} isOpen={isOpen}>
      <AddObjectsGroupForm />
    </Modal>
  );
};
