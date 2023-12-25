import { StateSchema } from 'app/providers';

export const getNotifications = (state: StateSchema) => state.notifications.notifications;
export const getNotificationsIsEmpty = (state: StateSchema) => state.notifications.notifications.length === 0;
export const getNotificationsIsCollapsed = (state: StateSchema) => state.notifications.isCollapsed;
