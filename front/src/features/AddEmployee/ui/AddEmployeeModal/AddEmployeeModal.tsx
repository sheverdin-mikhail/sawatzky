import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './AddEmployeeModal.module.scss';
import { AddEmployeeForm } from '../AddEmployeeForm/AddEmployeeForm';

interface AddEmployeeModalProps {
  className?: string;
}

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = (props) => {
  const { className } = props;

  return (
    <Modal className={cls.addEmployeeModal}>
      <AddEmployeeForm />
    </Modal>
  );
};
