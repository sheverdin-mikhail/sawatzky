import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as ArrowIcon } from 'shared/assets/icons/arrow-icon-right.svg';
import { ReactComponent as CancelIcon } from 'shared/assets/icons/cancel-icon.svg';
import { ReactComponent as ClockIcon } from 'shared/assets/icons/clock-icon.svg';
import { ApplicationPerformer } from 'entities/Performer';
import cls from './Performer.module.scss';
import { PerformerCheck } from '../PerformerCheck/PerformerCheck';
import { PerformerPriority } from '../PerformerPriority/PerformerPriority';
import { PerformerStatus } from '../PerformerStatus/PerformerStatus';

interface PerformerProps {
  className?: string;
  item: ApplicationPerformer;
}

export const Performer: React.FC<PerformerProps> = (props) => {
  const { className, item } = props;

  return (
    <div className={classNames(cls.performer, {}, [className])}>
      <div className={cls.nameCol}>
        <p className={cls.name}>{item.performer.user.fio} <Button theme={ButtonThemes.CLEAR} className={cls.nameBtn}><ArrowIcon /></Button></p>
      </div>
      <PerformerPriority priority={item.priority} className={cls.bold} classNameSec={cls.text} />
      <PerformerStatus status={item.status} className={cls.bold} classNameSec={cls.text} />
      <PerformerCheck check={item.status} />
      <div className={cls.btns}>
        <Button theme={ButtonThemes.WHITE_ROUND}><CancelIcon /></Button>
        <Button theme={ButtonThemes.WHITE_ROUND}><ClockIcon /></Button>
      </div>
      {/* <div className={cls.dates}>
        <p className={cls.datesText}>Заявка отправлена: {item.date} и {item.time}</p>
        <p className={cls.datesText}>Заявка отправлена: {item.date} и {item.time}</p>
        <p className={cls.datesText}>Заявка отправлена: {item.date} и {item.time}</p>
      </div> */}
    </div>
  );
};
