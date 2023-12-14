import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ApplicationPerformer, Performer } from 'entities/Performer';
import cls from './AddPerformerToApplicationModal.module.scss';
import { AddPerformerToApplicationForm } from '../AddPerformerToApplicationForm/AddPerformerToApplicationForm';
import { addPerformerToApplicationFormActions } from '../../model/slice/addPerformerToApplicationFormSlice';

interface AddWorkTaskModalModalProps {
	className?: string;
	onClose?: () => void;
	isOpen?: boolean;
	performers?: Performer[];
  applicationId: string;
  prevPerformers?: ApplicationPerformer[];
}

export const AddPerformerToApplicationModal: React.FC<AddWorkTaskModalModalProps> = (props) => {
  const {
    className, onClose, isOpen, performers, applicationId, prevPerformers,
  } = props;

  const dispatch = useAppDispatch();

  const onCloseHandler = () => {
    onClose?.();
    dispatch(addPerformerToApplicationFormActions.closeModal());
  };

  return (
    <Modal className={classNames(cls.addPerformerToApplicationModal, {}, [className])} isOpen={isOpen} onClose={onCloseHandler}>
      <AddPerformerToApplicationForm
        applicationId={applicationId}
        prevPerformers={prevPerformers}
        performers={performers}
        onClose={onCloseHandler}
      />
    </Modal>
  );
};
