import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SuccessModal.module.scss';
import { Modal } from 'shared/ui/Modal/Modal';
import { ReactComponent as CheckIcon } from 'shared/assets/icons/check-icon.svg'
import { Text, TextAlign } from 'shared/ui/Text/Text';

interface SuccessModalProps {
	className?: string;
	title?: string; 
	text?: string 
	isOpen?: boolean;
	onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = (props) => {
	const { className, isOpen, title, text, onClose  } = props;

	return (
		<Modal className={classNames(cls.successModal, {}, [className])} isOpen={isOpen} onClose={onClose}>
			<div className={cls.iconContainer}>
				<CheckIcon className={cls.icon} />
			</div>
			<Text className={cls.text} textAlign={TextAlign.CENTER} text={text} title={title} />
		</Modal>
	);
}