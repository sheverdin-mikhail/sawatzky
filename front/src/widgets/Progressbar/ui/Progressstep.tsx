import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Progressstep.module.scss';
import { ReactComponent as DoneIcon } from 'shared/assets/icons/done-status.svg';

interface ProgressstepProps {
  className?: string;
  id: string;
  step: number;
  title: string;
}

export const Progressstep: React.FC<ProgressstepProps> = (props) => {
  const { className, id, title, step } = props;

  return (
    <li className={cls.item} id={id}>
      <div className={classNames(cls.done_start, {}, [cls.done])}>
        {step =< +id ? <DoneIcon /> : id}
      </div>
      <p className={cls.title}>{title}</p>
    </li>
  );
}