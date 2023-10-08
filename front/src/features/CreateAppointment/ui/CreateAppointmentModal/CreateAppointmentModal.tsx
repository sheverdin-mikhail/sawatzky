import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CreateAppointmentModal.module.scss';
import { CreateAppointmentForm } from '../CreateAppointmentForm/CreateAppointmentForm';
import { Modal } from 'shared/ui/Modal/Modal';

interface CreateAppointmentModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = (props) => {
	const { className, isOpen, onClose } = props;

	return (
		<Modal className={classNames(cls.createAppointmentModal, {}, [className])} isOpen={isOpen} onClose={onClose}>
			<CreateAppointmentForm  />
		</Modal>
	);
}