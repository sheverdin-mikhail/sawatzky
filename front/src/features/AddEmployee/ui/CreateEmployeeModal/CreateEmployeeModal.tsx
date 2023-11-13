import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './CreateEmployeeModal.module.scss';
import { CreateEmployeeForm } from '../CreateEmployeeForm/CreateEmployeeForm';

interface CreateEmployeeModalProps {
  className?: string;
}

export const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = (props) => {
  const { className } = props;

  return (
    <Modal className={cls.createEmployeeModal}>
      <CreateEmployeeForm />
    </Modal>
  );
};
