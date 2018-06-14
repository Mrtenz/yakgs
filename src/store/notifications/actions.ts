import { ActionCreator } from 'redux';
import {
  ADD_PENDING_NOTIFICATION,
  ADD_RESOURCE_TRIGGER,
  AddPendingNotificationAction,
  AddResourceTriggerAction,
  CLEAR_PENDING_NOTIFICATIONS,
  ClearPendingNotificationsAction,
  DISABLE_NOTIFICATIONS,
  DisableNotificationsAction,
  ENABLE_NOTIFICATIONS,
  EnableNotificationsAction,
  PendingNotification,
  REMOVE_RESOURCE_TRIGGER,
  RemoveResourceTriggerAction
} from './types';

export const enableNotifications: ActionCreator<EnableNotificationsAction> = () => ({
  type: ENABLE_NOTIFICATIONS
});

export const disableNotifications: ActionCreator<DisableNotificationsAction> = () => ({
  type: DISABLE_NOTIFICATIONS
});

export const addPendingNotification: ActionCreator<AddPendingNotificationAction> = (
  pendingNotification: PendingNotification
) => ({
  type: ADD_PENDING_NOTIFICATION,
  payload: pendingNotification
});

export const clearPendingNotifications: ActionCreator<ClearPendingNotificationsAction> = () => ({
  type: CLEAR_PENDING_NOTIFICATIONS
});

export const addResourceTrigger: ActionCreator<AddResourceTriggerAction> = (item: string) => ({
  type: ADD_RESOURCE_TRIGGER,
  payload: item
});

export const removeResourceTrigger: ActionCreator<RemoveResourceTriggerAction> = (
  item: string
) => ({
  type: REMOVE_RESOURCE_TRIGGER,
  payload: item
});
