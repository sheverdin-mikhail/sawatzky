import { classNames } from 'shared/lib/classNames/classNames';
import { PerformerStatus as status } from 'entities/Performer';

interface PerformerStatusProps {
  className?: string;
  classNameSec?: string;
  status: status;
}

const statuses = {
  [status.ACCEPTED]: 'Принята',
  [status.NOT_ACCEPTED]: 'Отправлено исполнителю',
  [status.COMPLETED]: 'Выполнена',
  [status.DECLINED]: 'Отклонена',
};

export const PerformerStatus: React.FC<PerformerStatusProps> = (props) => {
  const { className, classNameSec, status } = props;

  return (
    <p className={classNames('', {}, [className])}>
      Статус:
      <span className={classNames('', {}, [classNameSec])}> {statuses[status]}</span>
    </p>
  );
};
