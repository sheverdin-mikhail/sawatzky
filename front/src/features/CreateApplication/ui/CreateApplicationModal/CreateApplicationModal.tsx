import { classNames } from 'shared/lib/classNames/classNames';
import { CreateApplicationForm } from '../CreateApplicationForm/CreateApplicationForm';
import { Modal } from 'shared/ui/Modal/Modal';

interface CreateApplicationModalProps {
	className?: string;
	isOpen?: boolean;
	onClose: () => void;
}

export const CreateApplicationModal: React.FC<CreateApplicationModalProps> = (props) => {
	const { className, onClose, isOpen} = props;
	

	return (
		<Modal className={classNames('', {}, [className])} isOpen={isOpen} onClose={onClose}>
			<CreateApplicationForm onClose={onClose}  />
		</Modal>
	);
}