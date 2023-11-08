import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { CreateApplicationForm } from '../CreateApplicationForm/CreateApplicationForm';

interface CreateApplicationModalProps {
	className?: string;
	isOpen?: boolean;
	onClose: () => void;
}

export const CreateApplicationModal: React.FC<CreateApplicationModalProps> = (props) => {
  const { className, onClose, isOpen } = props;

  return (
    <Modal className={classNames('', {}, [className])} isOpen={isOpen} onClose={onClose}>
      <CreateApplicationForm onClose={onClose} />
    </Modal>
  );
};
