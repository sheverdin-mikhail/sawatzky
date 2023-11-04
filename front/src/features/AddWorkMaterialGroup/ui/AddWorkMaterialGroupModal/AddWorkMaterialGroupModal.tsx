import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddWorkMaterialGroupModal.module.scss';
import { Modal } from 'shared/ui/Modal/Modal';
import { AddWorkMaterialGroupForm } from '../AddWorkMaterialGroupForm/AddWorkMaterialGroupForm';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addWorkMaterialGroupFormActions } from '../../model/slice/addWorkMaterialGroupFormSlice';

interface AddWorkMaterialGroupModalProps {
	className?: string;
	onClose?: () => void;
	isOpen?: boolean;
}

export const AddWorkMaterialGroupModal: React.FC<AddWorkMaterialGroupModalProps> = (props) => {
	const { className, onClose, isOpen } = props;

	const dispatch = useAppDispatch()

	const onCloseHandler = () => {
		onClose?.()
		dispatch(addWorkMaterialGroupFormActions.closeModal())
	}

	return (
		<Modal className={classNames(cls.addWorkMaterialGroupModal, {}, [className])} isOpen={isOpen} onClose={onCloseHandler}>
			<AddWorkMaterialGroupForm onClose={onCloseHandler} />
		</Modal>
	);
}