import cls from './Progressbar.module.scss';
import { Progressstep } from '../Progressstep/Progressstep';
import { ProgressSteps } from '../../model/type/progressbar';

interface ProgressbarProps {
  className?: string;
  step: number;
  id: string;
  title: string;
}

export const Progressbar: React.FC<ProgressbarProps> = (props) => {
  const { step } = props;

  return (
    <div className={cls.progressbar}>
      <ul className={cls.list}>
        {ProgressSteps.map((item) =>
          <Progressstep step={step} id={item.id} title={item.title} />
        )}
      </ul>
    </div>
  );
}