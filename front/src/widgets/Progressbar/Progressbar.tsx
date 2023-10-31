import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Progressbar.module.scss';
import { Progressstep } from './ui/Progressstep';
import { title } from 'process';

interface ProgressbarProps {
  className?: string;
  step: number;
  id: string;
  title: string;
}

// сделать объект с 7 шагами. id, title. и мапить его в Progressstep.
//написать логику подстановки свг и классов.

export const Progressbar: React.FC<ProgressbarProps> = (props) => {
  const { step } = props;

  return (
    <div className={cls.progressbar}>
      <ul className={cls.list}>
        <Progressstep step={step} id={id} title={title} />
      </ul>
    </div>
  );
}