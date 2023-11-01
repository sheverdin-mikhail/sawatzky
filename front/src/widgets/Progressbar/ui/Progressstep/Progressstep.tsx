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
  const { id, title, step } = props;

  return (
    <li className={cls.item} id={id}>
      <div className={classNames(cls.done_start, {}, [cls.done])}>
        {+id > step ? id : <DoneIcon />}
      </div>
      <p className={cls.title}>{title}</p>
    </li>
  );
}