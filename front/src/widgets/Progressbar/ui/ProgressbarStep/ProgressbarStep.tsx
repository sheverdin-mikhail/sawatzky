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

  const mods: Mods = {
    [cls.done]: +id <= step,
    [cls.step]: +id > step,
  }

  const modsItem: Mods = {
    [cls.done_start]: (+id <= step && +id === 1) || +id < step,
    [cls.done_end]: (+id === step && step !== 7) && +id !== 1,
    [cls.done_cancel]: (+id <= step || step === 7) && +id !== 1,
    [cls.step_start]: +id >= step && +id === 1,
    [cls.step_end]: +id > step && +id !== 7,
    [cls.step_cancel]: +id > step && +id !== 1,
  }

  return (
    <li className={classNames(cls.item, modsItem, [])} id={id}>
      <div className={classNames('', mods, [])}>
        {+id > step ? id : <DoneIcon />}
      </div>
      <p className={cls.title}>{title}</p>
    </li>
  );
}