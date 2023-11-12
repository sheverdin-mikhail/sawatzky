import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddEmployeeForm.module.scss';

interface AddEmployeeFormProps {
  className?: string;
}

export const AddEmployeeForm: React.FC<AddEmployeeFormProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.addEmployeeForm, {}, [className])}>
      heg
    </div>
  );
};
