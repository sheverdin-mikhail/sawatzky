import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './ProgressbarStep.module.scss';
import { ReactComponent as DoneIcon } from 'shared/assets/icons/done-status.svg';

interface ProgressStepProps {
  className?: string;
  id: string;
  step: number;
  title: string;
}

export const ProgressbarStep: React.FC<ProgressStepProps> = (props) => {
  const { id, title, step } = props;

  const modsItem: Mods = {
    [cls.left]: +id > 1,
    [cls.right]: +id < 7,
    [cls.done]: +id < step,
    [cls.step]: +id > step,
    [cls.current]: +id === step,
  }

  const modsIcon: Mods = {
    [cls.done]: +id <= step,
    [cls.step]: +id > step
  }

  return (
    <li className={classNames(cls.item, modsItem, [])} id={id}>
      <div className={classNames(cls.icon, modsIcon, [])}>
        {+id > step ? id : <DoneIcon />}
      </div>
      <p className={cls.title}>{title}</p>
    </li>
  );
}