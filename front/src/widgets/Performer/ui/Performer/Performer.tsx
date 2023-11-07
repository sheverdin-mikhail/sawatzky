import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Performer.module.scss';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { performer } from 'widgets/Performer/model/type/Performer';
import { ReactComponent as ArrowIcon } from 'shared/assets/icons/arrow-icon-right.svg';
import { ReactComponent as CancelIcon } from 'shared/assets/icons/cancel-icon.svg';
import { ReactComponent as ClockIcon } from 'shared/assets/icons/clock-icon.svg';
import { PerformerCheck } from '../PerformerCheck/PerformerCheck';
import { PerformerPriority } from '../PerformerPriority/PerformerPriority';
import { PerformerStatus } from '../PerformerStatus/PerformerStatus';

interface PerformerProps {
  className?: string;
  item: performer;
}

export const Performer: React.FC<PerformerProps> = (props) => {
  const { className, item } = props;

  return (
    <div className={classNames(cls.performer, {}, [className])}>
      <div className={cls.nameCol}>
        <Button theme={ButtonThemes.CLEAR_BLUE} className={cls.addBtn}>+ Добавить </Button>
        <p className={cls.name}>{item.name} <Button theme={ButtonThemes.CLEAR} className={cls.nameBtn}><ArrowIcon /></Button></p>
      </div>
      <PerformerPriority priority={item.priority} className={cls.bold} classNameSec={cls.text} />
      <PerformerStatus status={item.status} className={cls.bold} classNameSec={cls.text} />
      <PerformerCheck check={item.done} />
      <div className={cls.btns}>
        <Button theme={ButtonThemes.WHITE_ROUND}><CancelIcon /></Button>
        <Button theme={ButtonThemes.WHITE_ROUND}><ClockIcon /></Button>
      </div>
      <div className={cls.dates}>
        <p className={cls.datesText}>Заявка отправлена: {item.date} и {item.time}</p>
        <p className={cls.datesText}>Заявка отправлена: {item.date} и {item.time}</p>
        <p className={cls.datesText}>Заявка отправлена: {item.date} и {item.time}</p>
      </div>
    </div>
  );
}