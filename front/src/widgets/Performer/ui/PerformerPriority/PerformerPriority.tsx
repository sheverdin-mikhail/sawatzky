import { classNames } from 'shared/lib/classNames/classNames';

interface PerformerPriorityProps {
  className?: string;
  classNameSec?: string;
  priority: string;
}

export const PerformerPriority: React.FC<PerformerPriorityProps> = (props) => {
    const { className, classNameSec, priority } = props;

<<<<<<< HEAD
  return (
    <p className={classNames('', {}, [className])}>
      Приоритет:
      <span className={classNames('', {}, [classNameSec])}>
        {priority}
      </span>
    </p>
  );
=======
    return (
        <p className={classNames('', {}, [className])}>
            Приоритет:
            <span className={classNames('', {}, [classNameSec])}>
                {priority}
            </span>
        </p>
    );
>>>>>>> main
};
