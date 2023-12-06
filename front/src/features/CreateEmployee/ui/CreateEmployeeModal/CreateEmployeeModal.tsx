import { Modal } from 'shared/ui/Modal/Modal';
import cls from './CreateEmployeeModal.module.scss';
import { CreateSawatzkyEmployeeForm } from '../CreateSawatzkyEmployeeForm/CreateSawatzkyEmployeeForm';
import { CreateEmployeeForm } from '../CreateEmployeeForm/CreateEmployeeForm';

interface CreateEmployeeModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  isSawatzky?: boolean;
}

export const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = (props) => {
  const { isOpen, onClose, isSawatzky = false } = props;

  return (
    <Modal className={cls.createEmployeeModal} isOpen={isOpen} onClose={onClose}>
      {
        isSawatzky
          ? <CreateSawatzkyEmployeeForm />
          : <CreateEmployeeForm />
      }
    </Modal>
  );
};
