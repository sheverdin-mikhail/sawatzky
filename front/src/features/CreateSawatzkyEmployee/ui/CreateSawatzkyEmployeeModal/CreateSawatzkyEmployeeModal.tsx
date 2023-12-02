import { Modal } from 'shared/ui/Modal/Modal';
import cls from './CreateSawatzkyEmployeeModal.module.scss';
import { CreateSawatzkyEmployeeForm } from '../CreateSawatzkyEmployeeForm/CreateSawatzkyEmployeeForm';

interface CreateSawatzkyEmployeeModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateSawatzkyEmployeeModal: React.FC<CreateSawatzkyEmployeeModalProps> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <Modal className={cls.CreateSawatzkyEmployeeModal} isOpen={isOpen} onClose={onClose}>
      <CreateSawatzkyEmployeeForm />
    </Modal>
  );
};
