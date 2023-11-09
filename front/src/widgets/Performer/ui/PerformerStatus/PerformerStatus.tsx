import { classNames } from 'shared/lib/classNames/classNames';

interface PerformerStatusProps {
  className?: string;
  classNameSec?: string;
  status: string;
}

export const PerformerStatus: React.FC<PerformerStatusProps> = (props) => {
  const { className, classNameSec, status } = props;

  return (
    <p className={classNames('', {}, [className])}>
      Статус:
      <span className={classNames('', {}, [classNameSec])}> {status}</span>
    </p>
  );
};
