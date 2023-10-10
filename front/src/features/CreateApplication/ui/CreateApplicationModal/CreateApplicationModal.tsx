import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CreateApplicationModal.module.scss';
import { CreateApplicationForm } from '../CreateApplicationForm/CreateApplicationForm';
import { Modal } from 'shared/ui/Modal/Modal';

interface CreateApplicationModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const CreateApplicationModal: React.FC<CreateApplicationModalProps> = (props) => {
	const { className, isOpen, onClose } = props;

	return (
		<Modal className={classNames(cls.createApplicationModal, {}, [className])} isOpen={isOpen} onClose={onClose}>
			<CreateApplicationForm  />
		</Modal>
	);
}