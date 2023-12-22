import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './AddReportModal.module.scss';
import { AddReportForm } from '../AddReportForm/AddReportForm';

interface AddReportModalProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const AddReportModal: React.FC<AddReportModalProps> = (props) => {
  const { className, isOpen, onClose } = props;

  return (
    <Modal className={classNames(cls.addReportModal, {}, [className])} isOpen={isOpen} onClose={onClose}>
      <AddReportForm />
    </Modal>
  );
};
