import { ReactComponent as DoneIcon } from 'shared/assets/icons/check-done-icon.svg';
import { ReactComponent as FailIcon } from 'shared/assets/icons/check-fail-icon.svg';
import cls from './PerformerCheck.module.scss';

interface PerformerCheckProps {
  className?: string;
  check: boolean;
}

export const PerformerCheck: React.FC<PerformerCheckProps> = (props) => {
  const { check } = props;

  return (
    <div className={cls.performerCheck}>
      {check
        ? <p className={cls.check}><DoneIcon />принял</p>
        : <p className={cls.check}><FailIcon />не принял</p>}
    </div>
  );
};
