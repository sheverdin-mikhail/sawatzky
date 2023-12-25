import { classNames } from 'shared/lib/classNames/classNames';
import {
  useState, useCallback,
} from 'react';
import { ReactComponent as ArrowIcon } from 'shared/assets/icons/arrow-icon-right.svg';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getNotifications, getNotificationsIsCollapsed, getNotificationsIsEmpty } from '../../models/selectors/notificationSelectors';
import cls from './Notifications.module.scss';
import { NotificationIcon } from '../NotificationIcon/NotificationIcon';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { notificationsActions } from '../../models/slice/notificationsSlice';

interface NotificationsProps {
    className?: string;
}

export const Notifications: React.FC<NotificationsProps> = (props) => {
//   const { } = props;

  const notificationsList = useSelector(getNotifications) ?? [];
  const isEmpty = useSelector(getNotificationsIsEmpty);
  const isCollapsed = useSelector(getNotificationsIsCollapsed);
  const dispatch = useAppDispatch();

  const onToggleCollapsed = useCallback(() => {
    console.log(isEmpty);
    if (isCollapsed) {
      dispatch(notificationsActions.openNotifications());
    } else {
      dispatch(notificationsActions.closeNotifications());
    }
  }, [dispatch, isCollapsed, isEmpty]);

  return (
    <div className={classNames(cls.notifications, { [cls.collapsed]: isCollapsed }, [])}>
      <NotificationIcon
        isCollapsed={isCollapsed}
        length={notificationsList.length}
      />
      <Button
        theme={ButtonThemes.WHITE_ROUND}
        className={classNames(cls.alertBtn, { [cls.active]: !isCollapsed }, [])}
        onClick={onToggleCollapsed}
        disabled={isEmpty}
      >
        <ArrowIcon className={classNames(cls.arrow, { [cls.active]: !isCollapsed }, [])} />
      </Button>
      {
        !isEmpty && (
          <NotificationItem
            totalNotifications={notificationsList.length}
            isCollapsed={isCollapsed}
            notification={notificationsList[0]}
          />
        )
      }
    </div>
  );
};
