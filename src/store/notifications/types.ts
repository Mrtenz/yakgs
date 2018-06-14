import { Action } from 'redux';

export interface NotificationsState {
  isEnabled: boolean;
  triggers: Triggers;
  pending: PendingNotification[];
}

export interface Triggers {
  resources: string[];
}

export interface PendingNotification {
  notification: Notification;
  type: string;
}

export const ENABLE_NOTIFICATIONS = 'ENABLE_NOTIFICATIONS';
export const DISABLE_NOTIFICATIONS = 'DISABLE_NOTIFICATIONS';
export const NOTIFY = 'NOTIFY';

export const ADD_PENDING_NOTIFICATION = 'ADD_PENDING_NOTIFICATION';
export const CLEAR_PENDING_NOTIFICATIONS = 'CLEAR_PENDING_NOTIFICATIONS';

export const ADD_RESOURCE_TRIGGER = 'ADD_RESOURCE_TRIGGER';
export const REMOVE_RESOURCE_TRIGGER = 'REMOVE_RESOURCE_TRIGGER';

export interface EnableNotificationsAction extends Action {
  type: typeof ENABLE_NOTIFICATIONS;
}

export interface DisableNotificationsAction extends Action {
  type: typeof DISABLE_NOTIFICATIONS;
}

export interface AddPendingNotificationAction extends Action {
  type: typeof ADD_PENDING_NOTIFICATION;
  payload: PendingNotification;
}

export interface ClearPendingNotificationsAction extends Action {
  type: typeof CLEAR_PENDING_NOTIFICATIONS;
}

export interface AddResourceTriggerAction extends Action {
  type: typeof ADD_RESOURCE_TRIGGER;
  payload: string;
}

export interface RemoveResourceTriggerAction extends Action {
  type: typeof REMOVE_RESOURCE_TRIGGER;
  payload: string;
}

export type NotificationsActions =
  | EnableNotificationsAction
  | DisableNotificationsAction
  | AddPendingNotificationAction
  | ClearPendingNotificationsAction
  | AddResourceTriggerAction
  | RemoveResourceTriggerAction;
