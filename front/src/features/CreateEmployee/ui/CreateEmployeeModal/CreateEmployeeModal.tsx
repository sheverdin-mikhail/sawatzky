import { Modal } from 'shared/ui/Modal/Modal';
import cls from './CreateEmployeeModal.module.scss';
import { CreateEmployeeForm } from '../CreateEmployeeForm/CreateEmployeeForm';

interface CreateEmployeeModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <Modal className={cls.createEmployeeModal} isOpen={isOpen} onClose={onClose}>
      <CreateEmployeeForm />
    </Modal>
  );
};
