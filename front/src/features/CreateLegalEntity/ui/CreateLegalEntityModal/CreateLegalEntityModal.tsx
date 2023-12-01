import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback } from 'react';
import { CreateLegalEntitySawatzkyForm } from '../CreateLegalEntitySawatzkyForm/CreateLegalEntitySawatzkyForm';

interface CreateLegalEntityModalProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const CreateLegalEntityModal: React.FC<CreateLegalEntityModalProps> = (props) => {
  const {
    className,
    isOpen,
    onClose,
  } = props;

  const onCloseHandler = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <Modal className={classNames('', {}, [className])} isOpen={isOpen} onClose={onCloseHandler}>
      <CreateLegalEntitySawatzkyForm />
    </Modal>
  );
};
