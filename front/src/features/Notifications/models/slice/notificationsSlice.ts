import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NotificationItemType, NotificationsSchema } from '../type/notification';

const initialState: NotificationsSchema = {
  isCollapsed: true,
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {

    openNotifications: (state) => {
      state.isCollapsed = false;
    },
    closeNotifications: (state) => {
      state.isCollapsed = true;
    },
    addNewNotification: (state, action: PayloadAction<NotificationItemType>) => {
      state.notifications?.unshift(action.payload);
    },
    checkNotification: (state, action: PayloadAction<string>) => {
      state.notifications.shift();
      state.isCollapsed = true;
    },
  },
});

export const { actions: notificationsActions } = notificationsSlice;
export const { reducer: notificationsReducer } = notificationsSlice;
