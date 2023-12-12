import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './ChangePasswordModal.module.scss';
import { ChangePasswordForm } from '../ChangePasswordForm/ChangePasswordForm';

interface ChangePasswordModalProps {
  className?: string;
  isOpen: boolean;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = (props) => {
  const { className, isOpen } = props;

  return (
    <Modal className={classNames(cls.changePasswordModal, {}, [className])} isOpen={isOpen}>
      <ChangePasswordForm />
    </Modal>
  );
};
