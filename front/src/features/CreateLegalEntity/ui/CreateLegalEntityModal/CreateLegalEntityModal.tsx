import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback } from 'react';
import { CreateLegalEntitySawatzkyForm } from '../CreateLegalEntitySawatzkyForm/CreateLegalEntitySawatzkyForm';
import { CreateLegalEntityForm } from '../CreateLegalEntityForm/CreateLegalEntityForm';

interface CreateLegalEntityModalProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  isSawatzky?: boolean;
}

export const CreateLegalEntityModal: React.FC<CreateLegalEntityModalProps> = (props) => {
  const {
    className,
    isOpen,
    onClose,
    isSawatzky = false,
  } = props;

  const onCloseHandler = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <Modal className={classNames('', {}, [className])} isOpen={isOpen} onClose={onCloseHandler}>
      {
        isSawatzky
          ? <CreateLegalEntitySawatzkyForm />
          : <CreateLegalEntityForm />
      }
    </Modal>
  );
};
