import { classNames } from 'shared/lib/classNames/classNames';
import { PerformerPriority as priority } from 'entities/Performer';

interface PerformerPriorityProps {
  className?: string;
  classNameSec?: string;
  priority: priority;
}

const priorityData = {
  [priority.URGENT]: 'Срочно',
  [priority.NOT_URGEN]: 'Не срочно',
};

export const PerformerPriority: React.FC<PerformerPriorityProps> = (props) => {
  const { className, classNameSec, priority } = props;

  return (
    <p className={classNames('', {}, [className])}>
      Приоритет:
      <span className={classNames('', {}, [classNameSec])}>
        {priorityData[priority]}
      </span>
    </p>
  );
};
