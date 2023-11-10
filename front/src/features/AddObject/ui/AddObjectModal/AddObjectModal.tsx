import { Modal } from 'shared/ui/Modal/Modal';
import { AddObjectForm } from '../AddObjectForm/AddObjectForm';
import cls from './AddObjectModal.module.scss';

interface AddObjectModalProps {
	className?: string;
	isOpen?: boolean;
	onClose?: () => void;
}

export const AddObjectModal: React.FC<AddObjectModalProps> = (props) => {
  const { isOpen, onClose } = props;

  const onCloseHandler = () => {
    onClose?.();
  };

  return (
    <Modal className={cls.addObjectModal} onClose={onCloseHandler} isOpen={isOpen}>
      <AddObjectForm />
    </Modal>
  );
};
