import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as ClockIcon } from 'shared/assets/icons/clock-icon.svg';
import { ApplicationPerformer, PerformerStatus as status } from 'entities/Performer';
<<<<<<< HEAD
import { useState } from 'react';
=======
import { useCallback, useState } from 'react';
>>>>>>> dev
import { getDateString } from 'shared/lib/getDateString/getDateString';
import { useUserData } from 'shared/lib/hooks/useUserData/useUserData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { performerChangeStatus } from 'pages/ApplicationDetailPage/model/services/performerChangeStatus/performerChangeStatus';
import { useSelector } from 'react-redux';
import { getApplicationDetail } from 'pages/ApplicationDetailPage/model/slice/applicationDetailSlice';
import { StateSchema } from 'app/providers';
import cls from './Performer.module.scss';
import { PerformerCheck } from '../PerformerCheck/PerformerCheck';
import { PerformerPriority } from '../PerformerPriority/PerformerPriority';
import { PerformerStatus } from '../PerformerStatus/PerformerStatus';

interface PerformerProps {
  className?: string;
  item: ApplicationPerformer;
  onDelete?: (performer: ApplicationPerformer) => void;
  applicationId: string;
<<<<<<< HEAD
}

export const Performer: React.FC<PerformerProps> = (props) => {
  const { className, item, applicationId } = props;
=======
  step?: number;
}

export const Performer: React.FC<PerformerProps> = (props) => {
  const {
    className, item, applicationId, step = 5,
  } = props;
>>>>>>> dev

  const [datesIsHidden, setDatesIsHidden] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { id } = useUserData();
  const acts = useSelector((state: StateSchema) => getApplicationDetail.selectById(state, applicationId))?.acts;

  // const onDeleteHandler = useCallback((performer: ApplicationPerformer) => {
  //   onDelete?.(performer);
  // }, [onDelete]);
<<<<<<< HEAD
=======

  const completeApplicationHandler = useCallback(() => {
    dispatch(performerChangeStatus({
      applicationId,
      performer: item.performer.id,
      status: status.COMPLETED,
    }));
  }, [dispatch, applicationId, item.performer.id]);
>>>>>>> dev

  return (
    <>
      <div className={classNames(cls.performer, {}, [className])}>
        <p className={cls.name}>{item.performer.user.fio}</p>
        <PerformerPriority priority={item.priority} className={cls.bold} classNameSec={cls.text} />
        <PerformerStatus status={item.status} className={cls.bold} classNameSec={cls.text} />
        <PerformerCheck check={item.status} />
        <div className={cls.btns}>
          {/* <Button theme={ButtonThemes.WHITE_ROUND} onClick={() => onDeleteHandler(item)}><CancelIcon /></Button> */}
          <Button theme={ButtonThemes.WHITE_ROUND} onClick={() => setDatesIsHidden((prev) => !prev)}><ClockIcon /></Button>
        </div>
        {
          datesIsHidden && (
            <div className={cls.dates}>
              { item.dateSent && <p className={cls.datesText}>Заявка отправлена: {getDateString(new Date(item.dateSent))}</p> }
              { item.dateAccepted && <p className={cls.datesText}>Заявка принята: {getDateString(new Date(item.dateAccepted))}</p> }
              { item.dateDeclined && <p className={cls.datesText}>Заявка отказан: {getDateString(new Date(item.dateDeclined))}</p> }
            </div>
          )
        }
      </div>
      {
<<<<<<< HEAD
        item.performer.user.id === id && (
=======
        Boolean(item.performer.user.id === id && item.status !== status.COMPLETED) && (
>>>>>>> dev
          <div className={cls.buttons}>
            {
              item.status === status.NOT_ACCEPTED ? (
                <Button
                  theme={ButtonThemes.GREEN_SOLID}
                  onClick={() => dispatch(performerChangeStatus({
                    applicationId,
                    performer: item.performer.id,
                    status: status.ACCEPTED,
                  }))}
                >начать выполнение
                </Button>
              ) : (
<<<<<<< HEAD
                <Button
                  theme={ButtonThemes.RED_BORDER}
                > завершить
                </Button>
=======
                acts && acts.length > 0 && (
                  <Button
                    theme={ButtonThemes.RED_BORDER}
                    onClick={completeApplicationHandler}
                  > завершить
                  </Button>
                )
>>>>>>> dev
              )
            }
          </div>
        )
      }
    </>
  );
};
