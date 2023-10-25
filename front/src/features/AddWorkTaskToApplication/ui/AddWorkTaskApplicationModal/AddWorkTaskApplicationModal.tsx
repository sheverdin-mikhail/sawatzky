import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddWorkTaskApplicationModal.module.scss';
import { Modal } from 'shared/ui/Modal/Modal';
import { AddWorkTaskApplicationForm } from '../AddWorkTaskApplicationForm/AddWorkTaskApplicationForm';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addWorkTaskApplicationFormActions } from '../../model/slice/addWorkTaskApplicationFormSlice';
import { WorkTaskGroupItem } from 'entities/WorkTaskGroup';

interface AddWorkTaskApplicationModalProps {
	className?: string;
	onClose?: () => void;
	isOpen?: boolean;
	workTaskGroups?: WorkTaskGroupItem[];
}

export const AddWorkTaskApplicationModal: React.FC<AddWorkTaskApplicationModalProps> = (props) => {
	const { className, onClose, isOpen, workTaskGroups } = props;

	const dispatch = useAppDispatch()

	const onCloseHandler = () => {
		onClose?.()
		dispatch(addWorkTaskApplicationFormActions.closeModal())
	}

	return (
		<Modal className={classNames(cls.addWorkTaskApplicationModal, {}, [className])} isOpen={isOpen} onClose={onCloseHandler}>
			<AddWorkTaskApplicationForm onClose={onCloseHandler} workTaskGroups={workTaskGroups} />
		</Modal>
	);
}