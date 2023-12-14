import { ReactComponent as DoneIcon } from 'shared/assets/icons/check-done-icon.svg';
import { ReactComponent as FailIcon } from 'shared/assets/icons/check-fail-icon.svg';
import { PerformerStatus } from 'entities/Performer';
import { useMemo } from 'react';
import cls from './PerformerCheck.module.scss';

interface PerformerCheckProps {
  className?: string;
  check: PerformerStatus;
}

export const PerformerCheck: React.FC<PerformerCheckProps> = (props) => {
  const { check } = props;

  const status = useMemo(() => {
    switch (check) {
    case PerformerStatus.ACCEPTED:
      return <p className={cls.check}><DoneIcon />принял</p>;
    case PerformerStatus.NOT_ACCEPTED:
      return <p className={cls.check}><FailIcon />не принял</p>;
    default:
      return null;
    }
  }, [check]);

  return (
    <div className={cls.performerCheck}>
      {status}
    </div>
  );
};
