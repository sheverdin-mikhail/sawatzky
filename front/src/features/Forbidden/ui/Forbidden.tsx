import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { ReactComponent as ForbiddenIcon } from 'shared/assets/icons/forbidden-icon.svg';

import cls from './Forbidden.module.scss';

interface ForbiddenProps {
  className?: string;
  isOpen: boolean;
}

export const Forbidden: React.FC<ForbiddenProps> = (props) => {
  const { className, isOpen } = props;

  return (
    <Modal className={classNames(cls.forbidden, {}, [className])} isOpen={isOpen}>
      <div className={cls.form}>
        <ForbiddenIcon />
        <p className={cls.text}>Недостаточно прав доступа!</p>
      </div>
    </Modal>
  );
};
