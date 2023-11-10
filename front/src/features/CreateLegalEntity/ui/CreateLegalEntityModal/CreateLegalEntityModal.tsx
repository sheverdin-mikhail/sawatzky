import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback } from 'react';
import cls from './CreateLegalEntityModal.module.scss';
import { CreateLegalEntityForm } from '../CreateLegalEntityForm/CreateLegalEntityForm';

interface CreateLegalEntityModalProps {
	className?: string;
	isOpen?: boolean;
	onClose?: () => void;
}

export const CreateLegalEntityModal: React.FC<CreateLegalEntityModalProps> = (props) => {
  const { className, onClose, isOpen } = props;

  const onCloseHandler = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler} className={classNames(cls.createLegalEntityModal, {}, [className])}>
      <CreateLegalEntityForm />
    </Modal>
  );
};
