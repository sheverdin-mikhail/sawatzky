import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AddWorkTaskModal.module.scss';
import { AddWorkTaskForm } from '../AddWorkTaskForm/AddWorkTaskForm';
import { addWorkTaskFormActions } from '../../model/slice/addWorkTaskFormSlice';

interface AddWorkTaskModalModalProps {
	className?: string;
	onClose?: () => void;
	isOpen?: boolean;
	groupId?: number;
}

export const AddWorkTaskModal: React.FC<AddWorkTaskModalModalProps> = (props) => {
    const {
        className, onClose, isOpen, groupId,
    } = props;

    const dispatch = useAppDispatch();

    const onCloseHandler = () => {
        onClose?.();
        dispatch(addWorkTaskFormActions.closeModal());
    };

    return (
        <Modal className={classNames(cls.addWorkTaskModal, {}, [className])} isOpen={isOpen} onClose={onCloseHandler}>
            <AddWorkTaskForm groupId={groupId} onClose={onCloseHandler} />
        </Modal>
    );
};
