import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { CreateLegalEntitySawatzkyForm } from '../CreateLegalEntitySawatzkyForm/CreateLegalEntitySawatzkyForm';

interface CreateLegalEntitySawatzkyModalProps {
	className?: string;
	isOpen?: boolean;
}

export const CreateLegalEntitySawatzkyModal: React.FC<CreateLegalEntitySawatzkyModalProps> = (props) => {
    const {
        className,
        isOpen = false,
    } = props;

    return (
        <Modal className={classNames('', {}, [className])} isOpen={isOpen}>
            <CreateLegalEntitySawatzkyForm />
        </Modal>
    );
};
