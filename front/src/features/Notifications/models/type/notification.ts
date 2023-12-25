export interface NotificationItemType {
    id: string,
    name: string,
}

export interface NotificationsSchema {
    notifications: NotificationItemType[];
    error?: string;
    isCollapsed: boolean;
}
