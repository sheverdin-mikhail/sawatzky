import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import cls from './NotificationItem.module.scss';
import { NotificationItemType } from '../../models/type/notification';
import { notificationsActions } from '../../models/slice/notificationsSlice';

interface NotificationItemProps {
    className?: string;
    isCollapsed: boolean;
    notification: NotificationItemType;
    totalNotifications: number;
}

export const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const { isCollapsed, notification, totalNotifications } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickMoreHandler = useCallback(() => {
    dispatch(notificationsActions.checkNotification(notification.id));
    navigate(`/application/${notification?.id}`);
  }, [notification, dispatch, navigate]);

  return (
    <div className={classNames(cls.notificationItem, { [cls.collapsed]: isCollapsed }, [])}>
      <p className={cls.count}>1 <span className={cls.text}>/ { totalNotifications }</span></p>
      <p className={cls.body}>{notification?.name}</p>
      <Button theme={ButtonThemes.BLUE_BORDER} onClick={onClickMoreHandler} className={cls.moreBtn}>Подробнее</Button>
      {/* <div className={cls.btns}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.btn}>Принять</Button>
        <Button theme={ButtonThemes.BLUE_BORDER} className={cls.btn}>Отказаться</Button>
      </div> */}
    </div>
  );
};
