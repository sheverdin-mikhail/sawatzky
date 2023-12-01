import { Modal } from 'shared/ui/Modal/Modal';
import { CreateCustomerForm } from '../CreateCustomerForm/CreateCustomerForm';
import cls from './CreateCustomerModal.module.scss';

interface CreateCustomerModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCustomerModal: React.FC<CreateCustomerModalProps> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <Modal className={cls.createCustomerModal} isOpen={isOpen} onClose={onClose}>
      <CreateCustomerForm />
    </Modal>
  );
};
