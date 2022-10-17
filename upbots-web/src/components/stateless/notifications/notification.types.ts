type TNotificationTypes = null | 'info' | 'warning' | 'error' | 'success'
export interface IAppNotification {
  id?: number;
  type: TNotificationTypes;
  message: string;
  duration?: number | null;
  onClick?: () => void;
  destroyed?: () => void;
}
