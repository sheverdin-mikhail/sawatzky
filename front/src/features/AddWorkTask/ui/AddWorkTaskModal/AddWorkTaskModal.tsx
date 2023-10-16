import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddWorkTaskModal.module.scss';
import { Modal } from 'shared/ui/Modal/Modal';
import { AddWorkTaskForm } from '../AddWorkTaskForm/AddWorkTaskForm';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addWorkTaskFormActions } from '../../model/slice/addWorkTaskFormSlice';

interface AddWorkTaskModalModalProps {
	className?: string;
	onClose?: () => void;
	isOpen?: boolean;
}

export const AddWorkTaskModal: React.FC<AddWorkTaskModalModalProps> = (props) => {
	const { className, onClose, isOpen } = props;

	const dispatch = useAppDispatch()

	const onCloseHandler = () => {
		onClose?.()
		dispatch(addWorkTaskFormActions.closeModal())
	}

	return (
		<Modal className={classNames(cls.addWorkTaskModal, {}, [className])} isOpen={isOpen} onClose={onCloseHandler}>
			<AddWorkTaskForm onClose={onCloseHandler} />
		</Modal>
	);
}