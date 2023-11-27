import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addDocumentFormActions } from '../../model/slice/addDocumentFormSlice';
import { DocEntity } from '../../model/type/addDocument';
import { AddDocumentForm } from '../AddDocumentForm/AddDocumentForm';
import cls from './AddDocumentModal.module.scss';

interface AddDocumentModalProps {
	className?: string;
	onClose?: () => void;
	isOpen?: boolean;
	docEntity?: DocEntity;
}

export const AddDocumentModal: React.FC<AddDocumentModalProps> = (props) => {
  const {
    className, onClose, isOpen, docEntity,
  } = props;

  const dispatch = useAppDispatch();

  const onCloseHandler = () => {
    onClose?.();
    dispatch(addDocumentFormActions.closeModal());
  };

  return (
    <Modal className={classNames(cls.addDocumentModal, {}, [className])} isOpen={isOpen} onClose={onCloseHandler}>
      <AddDocumentForm docEntity={docEntity} onClose={onCloseHandler} />
    </Modal>
  );
};
